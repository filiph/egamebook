library egb_form;

/**
 * A container of a 'form' - a specialized type of choice when you need more
 * than simple choice ([Choice]).
 *
 * Forms materialize as something very similar to a standard HTML Form, with
 * input fields (such as text fields, sliders, multiple-choice, checkboxes),
 * labels, other arbitrary HTML elements (such as visualizations) and one or
 * more submit buttons.
 *
 * The whole structure is sent as JsonML, so everything can be nested, and
 * HTML(-like) interfaces have very easy ways to materialize the [Form].
 *
 * ## Live updates
 *
 * It is possible for the form's elements to be updated automatically after
 * user's input. For instance, when player has allocated all of his resources,
 * all resource sliders should be locked at their current maximum. If two
 * checkboxes are mutually exclusive and one of them has been checked, the other
 * one should be disabled.
 *
 * The logic of the updating can be quite complex and gamebook-dependent, so it
 * is executed in the Scripter.
 *
 * When presented to the user, and after each user input, the form is
 * temporarily disabled (no user input allowed) and a callback is fired. This
 * callback goes from [Presenter] to [Scripter] (therefore, sometimes it
 * has to go into another Isolate or even to a server).
 *
 * Each node of the Form structure is given a unique ID. This makes it easy
 * to identify the element to be updated.
 *
 * ## Example use
 *
 * All this happens in a `<script>` element, not in `<variables>` (of course,
 * the variables like `name` can be defined in `<variables>`, but the form
 * itself should not be persistent between sessions).
 *
 *     String name;
 *     int age;
 *     String sex;
 *     var form = new Form();
 *     form.add(new TextInput("Name", (value) => name = value,
 *                            validate: (value) => value != "");
 *     form.add(new RangeInput("Age", (value) => age = value,
 *                             min: 20, max: 100, value: 30, step: 1,
 *                             maxEnabled: 40));
 *     form.add(new RadioChoice("Sex",
 *                              {"m": "Male [+1 STR]", "f": "Female [+1 INT]"},
 *                              (value) => sex = m));
 *     showForm(form)
 *     .then((_) {});
 *
 * Another, more complex example:
 *
 *     int energyAvailable = 15;
 *     int energyReserve = 4;
 *     int energyToManeuvres = 0;
 *     int energyToShield = 0;
 *     int energyToRepair = 0;
 *     int energyToHyperdrive = 0;
 *     int energyToWeapons = 0;
 *
 *     var form = new Form();
 *     var energySection = new FormSection("Energy");
 *     var energyAvailableEl = new RangeOutput("Available", max: 15,
 *                                             value: energyAvailable);
 *     energySection.add(energyAvailableEl);
 *     var energyReserveEl = new RangeOutput("Reserves", max: 6,
 *                                           value: energyReserve);
 *     energySection.add(energyReserveEl);
 *     var energyToManeuvresEl = new RangeInput("Maneuvres", max: 6, value: 0);
 *     energySection.add(energyToManeuvresEl);
 *     form.add(energySection);
 *     form.onInputListener = (_) {
 *       energyAvailableEl.value = energyAvailable - energyToManeuvresEl.value;
 *       // ...
 *       form.update();  // Sends the new setup to presenter.
 *     };
 *
 *     showForm(form);
 *
 *
 * ## A bit about the classes.
 *
 * All form elements have a base class (e.g. [RangeInputBase]) which
 * has the methods and contructors shared by both [Scripter] and
 * [Presenter].
 *
 * On the [Scripter] side, we have [RangeInput], for example,
 * which is the class used by the author. These classes can have closures
 * attached to them. These elements also automatically receive unique
 * [FormElement.id] when they're attached to a [Form].
 *
 * On the [Presenter] side, we have [PresenterRangeInput], a "blueprint"
 * that can't have closures (no way to transport closure from [Scripter]
 * to [Presenter]) and whose [FormElement.id] is copied from [Scripter].
 * From these blueprints, the presenter creates and updates [UiElement].
 */

import "package:html/dom.dart" as html5lib;
import "package:jsonml/html5lib2jsonml.dart";
import 'dart:math' as math;

/// Class FormElement wraps basic form element.
///
/// It is a base class of form's base classes (e.g. [FormBase],
/// [FormSection] etc.)
class FormElement extends html5lib.Element implements UpdatableByMap {
  /// Creates new FormElement of an [elementClass] class (tag).
  FormElement(String elementClass) : super.tag(elementClass);

  /// Getter returns a help message. Every form element can have a help button
  /// that shows a text message.
  String get helpMessage => attributes["helpMessage"];

  /// Setter for form's help message.
  set helpMessage(String value) => attributes["helpMessage"] = value;

  /// Getter for the visibility of the element. This works like CSS [:display:],
  /// meaning that when set to [:true:], the element will not occupy its
  /// space (there will be no 'white rectange' in the place of a hidden element
  /// like with CSS [:visibility:]).
  bool get hidden => attributes["hidden"] == "true";

  /// Setter for the visibility of the element.
  set hidden(bool value) => attributes["hidden"] = value ? "true" : "false";

  /// Getter for whether or not the element is disabled.
  /// Disabled elements are still visible, but cannot be clicked or changed,
  /// and are clearly marked as such.
  bool get disabled => attributes["disabled"] == "true";

  /// Setter for whether or not the element is disabled.
  set disabled(bool value) => attributes["disabled"] = value ? "true" : "false";

  /// Getter returns whether this element is disabled. It differs from [disabled]
  /// in that it also checks whether any [FormElement] parent in the hierarchy
  /// is disabled.
  bool get disabledOrInsideDisabledParent {
    if (parent != null &&
        (parent as FormElement).disabledOrInsideDisabledParent) {
      return true;
    }
    return disabled;
  }

  /// Returns attributes [hidden] and [disabled] as a map representation.
  Map<String, Object> toMap() => {"hidden": hidden, "disabled": disabled};

  /// Sets attributes [hidden] and [disabled] from a given [map].
  void updateFromMap(Map<String, Object> map) {
    hidden = map["hidden"];
    disabled = map["disabled"];
  }

  /// Utility function that walks through the whole structure recursively and
  /// adds all [FormElement] children to the [set].
  void _addFormChildrenToSet(FormElement element, Set<FormElement> set) {
    for (FormElement child in element.formElementChildren) {
      set.add(child);
      _addFormChildrenToSet(child, set);
    }
  }

  /// Returns all direct [children] of this element that are of type
  /// [FormElement] (skips things like [:<div>:]).
  Iterable<FormElement> get formElementChildren {
    // Normally, this should be possible through children.where, but this
    // fails with typecasting Iterable<Element> to Iterable<FormElement>.
    List<FormElement> result = new List<FormElement>();
    for (FormElement child
        in children.where((html5lib.Element child) => child is FormElement)) {
      result.add(child);
    }
    return result;
  }

  /**
   * Deep set of all elements that are of class [FormElement] and below this
   * element.
   *
   * Returns this set.
   */
  Set<FormElement> get allFormElementsBelowThisOne {
    Set<FormElement> set = new Set<FormElement>();
    _addFormChildrenToSet(this, set);
    return set;
  }
}

/**
 * Abstract class UpdatableByMap is an interface shared by all form elements
 * that can be updated on the fly (i.e. their content/state is not set in stone,
 * but can be either changed by user or by script).
 *
 * This class is implemented by [FormElement].
 */
abstract class UpdatableByMap {
  /// Returns a map representation.
  Map<String, Object> toMap();

  /// Updates from a map representation in a [map].
  void updateFromMap(Map<String, Object> map);
}

/// Class FormBase wraps base form element.
///
/// It is a base class of [Form] element.
class FormBase extends FormElement {
  /// Element class.
  static const String elementClass = "Form";

  /// Creates new FormBase element of [elementClass].
  FormBase() : super(elementClass);

  /// Getter for a text to be on the submit button.
  /// Defaults to [:null:], in which case the button will just have a generic
  /// graphic (such as an arrow or a check mark).
  String get submitText => attributes["submitText"];

  /// Setter for a text to be on the submit button.
  set submitText(String value) => attributes["submitText"] = value;
}

/**
 * Class Form is the top level element of a form, containing all other elements.
 * Author-facing.
 */
class Form extends FormBase implements _NewValueCallback {
  /// Random.
  static math.Random _random = new math.Random();

  /// Creates new Form with optional [submitText]. Form has also randomly
  /// generated [id].
  Form({String submitText}) {
    this.submitText = submitText;
    id = "${_random.nextInt((1<<16))}"; // Assuming this is enough.
  }

  /// Submit callback.
  SubmitCallback onSubmit;

  /// Input callback.
  InputCallback onInput;

  /**
   * Receives changed values, computes collaterals, and either returns all
   * values back, or -- in case [newValues.submitted] was [:true:] -- returns
   * [:null:] (because we're moving on).
   */
  FormConfiguration receiveUserInput(CurrentState newValues) {
    Set<_NewValueCallback> parentsOfUpdatedElements =
        new Set<_NewValueCallback>();
    for (FormElement element in allFormElementsBelowThisOne
        .where((element) => element is UpdatableByMap && element is Input)) {
      Object newCurrent = newValues.getById(element.id);
      if (newCurrent != null && newCurrent != (element as Input).current) {
        (element as Input).current = newCurrent;
        if (element is _NewValueCallback &&
            (element as _NewValueCallback).onInput != null) {
          (element as _NewValueCallback).onInput(newCurrent);
        }

        // Walk upwards to mark element's parent to be called with onInput.
        FormElement parent = element;
        do {
          parent = parent.parent;
          if (parent is _NewValueCallback &&
              (parent as _NewValueCallback).onInput != null) {
            parentsOfUpdatedElements.add(parent as _NewValueCallback);
          }
        } while (parent.parent != null);
      }
    }

    // Also fire onInput on all parent elements.
    parentsOfUpdatedElements.forEach((_NewValueCallback parent) {
      Object value;
      if (parent is Input) {
        value = (parent as Input).current;
      }
      parent.onInput(value);
    });

    allFormElementsBelowThisOne
        .where((element) => element is Input)
        .forEach((FormElement element) {
      (element as Input).sanitizeCurrent();
    });

    if (newValues.submitted) {
      assert(newValues.submitterId != null);
      SubmitCallback callback;
      if (newValues.submitterId == this.id) {
        callback = this.onSubmit;
      } else {
        // It wasn't a click on the main submit button.
        callback = (allFormElementsBelowThisOne.singleWhere((element) =>
                (element is SubmitButton) &&
                element.id == newValues.submitterId) as SubmitButton)
            .onSubmit;
      }
      if (callback != null) {
        callback();
      }
      return null;
    } else {
      return _createConfiguration();
    }
  }

  bool _uniqueIdsGiven = false;

  /// Gives form children unique id.
  void _giveChildrenUniqueIds() {
    int id = 0;
    allFormElementsBelowThisOne.forEach((FormElement element) {
      element.id = "form${this.id}-element${id++}";
    });
    _uniqueIdsGiven = true;
  }

  /// Returns a map representation of current [Form] object encoded into JsonML
  /// and its form configuration.
  @override
  Map<String, Object> toMap() {
    if (!_uniqueIdsGiven) {
      // Set all children with a unique ID here or before here.
      _giveChildrenUniqueIds();
    }
    Map<String, Object> map = super.toMap();
    map["jsonml"] = encodeToJsonML(this);
    map["values"] = _createConfiguration().toMap();
    return map;
  }

  /// Returns form configuration for current [Form] which contains
  /// information about all elements below this one ([:toMap:] representation
  /// together with its string representation).
  FormConfiguration _createConfiguration() {
    FormConfiguration values = new FormConfiguration();
    for (UpdatableByMap element in allFormElementsBelowThisOne
        .where((element) => element is UpdatableByMap)) {
      Map<String, Object> map = element.toMap();
      if (element is StringRepresentationCreator) {
        Object elementCurrent;
        if (element is Input) {
          elementCurrent = (element as Input).current;
        } else if (element is Output) {
          elementCurrent = (element as Output).current;
        } else {
          throw new StateError("Cannot create string representation of a "
              "StringRepresentationCreator when it doesn't have a current "
              "value. (Element: $element)");
        }
        map["__string__"] = (element as StringRepresentationCreator)
            .stringifyFunction(elementCurrent);
      }
      values.add((element as FormElement).id, map);
    }
    return values;
  }
}

/**
 * FormConfiguration class wraps form configuration.
 *
 * It is the 'struct' that is being sent from [Scripter] to [Presenter]
 * when form is created and after it is updated.
 */
class FormConfiguration {
  /// Map of values.
  Map<String, Map<String, Object>> _valuesMap;

  /// Creates new FormConfiguration with empty map of values.
  FormConfiguration() : _valuesMap = new Map<String, Map<String, Object>>();

  /// Creates new FormConfiguration from already existing [map] of values.
  FormConfiguration.fromMap(Map<String, Map<String, Object>> map)
      : _valuesMap = map;

  /// Adds new value [attributesMap] on key [id] into map of values.
  void add(String id, Map<String, Object> attributesMap) {
    _valuesMap[id] = attributesMap;
  }

  /// Returns value by [id] from map of values.
  Map<String, Object> getById(String id) => _valuesMap[id];

  /// Returns new map representation of map of values.
  Map<String, Map<String, Object>> toMap() => new Map.from(_valuesMap);
}

/**
 * CurrentState class wraps current configuration.
 * The 'struct' that is send from [Presenter] to [Scripter] after each
 * user interaction.
 */
class CurrentState {
  /// Map of values.
  Map<String, Object> _valuesMap;
  /**
   * Getter for whether or not this form is being submitted.
   * This information is stored in a 'magic' key-value pair.
   */
  bool get submitted => _valuesMap["__submitted__"];

  /// Setter for whether or not this form is being submitted.
  set submitted(bool value) => _valuesMap["__submitted__"] = value;

  /// Getter for a submitter id stored in values map.
  String get submitterId => _valuesMap["__submitterId__"];

  /// Setter for a submitter id stored in values map.
  set submitterId(String value) => _valuesMap["__submitterId__"] = value;

  /// Creates new CurrentState with empty values map.
  /// The [submitted] attribute is set to [:false:] by default.
  CurrentState() : _valuesMap = new Map<String, Object>() {
    submitted = false;
  }

  /// Creates new CurrentState from existing values [map].
  /// If the given values map doesn't contain the [:__submitted__:] key,
  /// the [submitted] attribute is set to [:false:].
  CurrentState.fromMap(Map<String, Object> map) : _valuesMap = map {
    if (!_valuesMap.containsKey("__submitted__")) {
      submitted = false;
    }
  }

  /// Adds new value [current] on key [id] into map of values.
  void add(String id, Object current) {
    _valuesMap[id] = current;
  }

  /// Returns value by [id] from map of values.
  Object getById(String id) => _valuesMap[id];

  /// Returns new map representation of map of values.
  Map<String, Object> toMap() => new Map.from(_valuesMap);

  /// Returns string representation of CurrentState with [submitted] attribute.
  String toString() => "<CurrentState submitted=$submitted>";
}

/// FormSection wraps section of a form element.
class FormSection extends FormElement {
  /// Getter returns a name.
  String get name => attributes["name"];

  /// Setter for a name.
  set name(String value) => attributes["name"] = value;

  /// Element class.
  static const String elementClass = "FormSection";

  ///Creates new FormSection with [name] and of [elementClass].
  FormSection(String name) : super(elementClass) {
    this.name = name;
  }
}

/// Class _NewValueCallback wraps functionality which is called when
/// an element has a new value.
class _NewValueCallback<T> {
  /**
   * The function to be called when the element has a new value. The value is
   * given as the only argument to the callback.
   */
  InputCallback onInput;
}

/// InputCallback typedef.
typedef void InputCallback(Object value);

/// Class StringRepresentationCreator wraps functionality which turns [Object]
/// into its string representation.
class StringRepresentationCreator {
  /// The function that takes the value of current and returns its [String]
  /// representation. Such as (42) => "42 %".
  StringifyFunction stringifyFunction = (Object value) => "$value";
}

/// StringifyFunction typedef.
typedef String StringifyFunction(Object current);

/**
 * Abstract class StringRepresentationHolder is an interface for UI blueprints
 * that need to show a value as a string. That value is created
 * via [StringRepresentationCreator.stringifyFunction] in [Presenter]
 * each time a value is updated.
 */
abstract class StringRepresentationHolder {
  /// Current string representation.
  String currentStringRepresentation;
}

/**
 * Abstract class Input is an interface shared by all inputs.
 * All inputs have a [current] value and they provide [sanitizeCurrent] method.
 */
abstract class Input<T> {
  /// Curent value of type [T].
  T current;

  /// Called to ensure that the current value is valid. This method will
  /// normally set [current] below any maximum values etc.
  void sanitizeCurrent();
}

/**
 * Abstract class Output is an interface shared by all output elements.
 * All output elements have a [current] value.
 */
abstract class Output<T> {
  /// Curent value of type [T].
  T get current;
  set current(T value);
}

/// Class SubmitButtonBase wraps base submit button element.
///
/// It is a base class of [SubmitButton] element.
class SubmitButtonBase extends FormElement {
  /// Getter returns a name.
  String get name => attributes["name"];

  /// Setter for a name.
  set name(String value) => attributes["name"] = value;

  /// Element class.
  static const String elementClass = "SubmitButton";

  /// Creates new SubmitButtonBase with [name], optional [helpMessage]
  /// and of [elementClass].
  SubmitButtonBase(String name, {String helpMessage}) : super(elementClass) {
    this.name = name;
    this.helpMessage = helpMessage;
  }

  /// Creates new SubmitButtonBase with [name] and mandatory [helpMessage].
  SubmitButtonBase.noOptional(String name, String helpMessage)
      : this(name, helpMessage: helpMessage);

  /// Returns a map representation of object which contains
  /// also the [name] attribute.
  @override
  Map<String, Object> toMap() {
    Map<String, Object> map = super.toMap();
    map.addAll({"name": name});
    return map;
  }

  /// Updates actual object from a map representation in a [map].
  /// The [name] attribute is also set.
  @override
  void updateFromMap(Map<String, Object> map) {
    super.updateFromMap(map);
    name = map["name"];
  }
}

/// SubmitCallback typedef.
typedef void SubmitCallback();

/// Class SubmitButton wraps submit button element.
class SubmitButton extends SubmitButtonBase {
  /// Callback called on submit.
  SubmitCallback onSubmit;

  /// Creates new SubmitButton with [name] and [onSubmit] callback.
  /// SubmitButton can also have optional [helpMessage].
  SubmitButton(String name, this.onSubmit, {String helpMessage})
      : super.noOptional(name, helpMessage);
}

// TODO: SkillSubmitButton - allows player to have better results according
// to skill (acumen)

/// Class CheckboxBase wraps base checkbox element.
///
/// It is a base class of [CheckboxInputBase].
class CheckboxBase extends FormElement {
  /// Getter returns a name.
  String get name => attributes["name"];

  /// Setter for a name.
  set name(String value) => attributes["name"] = value;

  /// Creates new CheckboxBase with [name] and of [elementClass].
  CheckboxBase(String elementClass, String name) : super(elementClass) {
    this.name = name;
  }

  /// Checked or not.
  bool current;

  /// Returns a map representation of object which contains
  /// also the [current] attribute.
  @override
  Map<String, Object> toMap() {
    Map<String, Object> map = super.toMap();
    map.addAll({"current": current});
    return map;
  }

  /// Updates actual object from a map representation in a [map].
  /// The [current] attribute is also set.
  @override
  void updateFromMap(Map<String, Object> map) {
    super.updateFromMap(map);
    current = map["current"];
  }
}

/// Class CheckboxInputBase wraps base checkbox input element.
///
/// It is a base class of [CheckboxInput].
class CheckboxInputBase extends CheckboxBase implements Input<bool> {
  /// Element class.
  static const String elementClass = "CheckboxInput";

  /// Creates new CheckboxInputBase with [name] and of [elementClass].
  CheckboxInputBase(String name) : super(elementClass, name);

  /// Sets sanitization on a [current] atribute. If is it [:null:],
  /// the [StateError] is thrown.
  @override
  void sanitizeCurrent() {
    if (current == null) {
      throw new StateError("CheckboxInput state must be either true or false.");
    }
  }
}

/// Class CheckboxInput wraps element of checkbox input.
class CheckboxInput extends CheckboxInputBase with _NewValueCallback<bool> {
  /// Creates new CheckboxInput with [name], input callback [onInput] and
  /// optional [checked].
  CheckboxInput(String name, InputCallback onInput, {bool checked: false})
      : super(name) {
    this.onInput = onInput;
    this.current = checked;
  }
}

/**
 * RangeBase class wraps base range element.
 *
 * It is a base class of [RangeInputBase] and [RangeOutputBase].
 */
class RangeBase extends FormElement {
  /// Getter returns a name.
  String get name => attributes["name"];

  /// Setter for a name.
  set name(String value) => attributes["name"] = value;

  /// Creates new RangeBase of a given [elementClass] and with a [name].
  RangeBase(String elementClass, String name) : super(elementClass) {
    this.name = name;
  }

  /// Creates new RangeBase of a given [elementClass] and with a [name].
  /// and constraints. Constraints are [current] value selected on the range
  /// input, [min] value, [max] value, [step] size and [minEnabled] and
  /// [maxEnabled] values.
  RangeBase.withConstraints(String elementClass, String name, this.current,
      this.min, this.max, this.step, this.minEnabled, this.maxEnabled)
      : super(elementClass) {
    this.name = name;
    if ((max - min) % step != 0) {
      throw new ArgumentError("The value of max ($max) is not valid, given "
          "the step ($step) and min($min).");
    }
  }

  /// Current (or predefined) value selected on the range input. Defaults to
  /// [:0:]. We use `current` because `value` is the [String] value of any
  /// HTML5 element (although it's deprecated in html5lib).
  int current = 0;

  /// Minimal value on the range input. Defaults to [:0:].
  int min = 0;

  /// Maximal value on the range input. Defaults to [:10:].
  int max = 10;

  /// Allows for the range values to be in steps larger than [:1:] (the
  /// default).
  int step = 1;

  /// Numbers below this value will be visible to player, but disabled for
  /// choosing. This can communicate to the player that those values could be
  /// possible to choose in other circumstances. When set to [:null:] (default),
  /// all numbers are possible.
  int minEnabled;

  /// Same as [minEnabled], but for values _above_ this number.
  int maxEnabled;

  /// Returns a map representation of object with constraints included.
  @override
  Map<String, Object> toMap() {
    Map<String, Object> map = super.toMap();
    map.addAll({
      "min": min,
      "max": max,
      "step": step,
      "minEnabled": minEnabled,
      "maxEnabled": maxEnabled,
      "current": current
    });
    return map;
  }

  /// Updates actual object from a map representation in a [map].
  /// The constraints are also set.
  @override
  void updateFromMap(Map<String, Object> map) {
    super.updateFromMap(map);
    min = map["min"];
    max = map["max"];
    step = map["step"];
    minEnabled = map["minEnabled"];
    maxEnabled = map["maxEnabled"];
    current = map["current"];
  }
}

/// Class RangeInputBase wraps base range input element.
///
/// It is a base class of [RangeInput].
class RangeInputBase extends RangeBase implements Input<int> {
  /// Element class.
  static const String elementClass = "RangeInput";

  /// Creates new RangeInputBase with [name], of [elementClass] and constraints.
  /// Constraints are [current] value selected on the range
  /// input, [min] value, [max] value, [step] size and [minEnabled] and
  /// [maxEnabled] values.
  RangeInputBase.withConstraints(String name, int current, int min, int max,
      int step, int minEnabled, int maxEnabled)
      : super.withConstraints(elementClass, name, current, min, max, step,
            minEnabled, maxEnabled);

  /// Creates new RangeInputBase with [name] and of [elementClass].
  RangeInputBase(String name) : super(elementClass, name);

  /// Makes sure [current] is in range (not above [maxEnabled], [max] or below
  /// [minEnabled], [min], or outside [step]. In each case, moves [current] to
  /// the closest valid position.
  void sanitizeCurrent() {
    // Ensure current is min + step*n.
    int stepModulo = (current - min) % step;
    if (stepModulo != 0) {
      if (stepModulo > step / 2) {
        current = current - stepModulo + step;
      } else {
        current = current - stepModulo;
      }
    }

    // Ensure current is not more or less than constrains.
    current = math.min(current, max);
    if (maxEnabled != null) {
      current = math.min(current, maxEnabled);
    }
    current = math.max(current, min);
    if (minEnabled != null) {
      current = math.max(current, minEnabled);
    }
  }
}

/**
 * Class RangeInput wraps range input element.
 *
 * It is the author-facing class of the range input element. It works only with
 * integers.
 */
class RangeInput extends RangeInputBase
    with _NewValueCallback<int>, StringRepresentationCreator {
  /// Creates new RangeInput with [name], input callback [onInput] and optional
  /// constraints [value], stringify function [stringifyFunction], [min] and [max]
  /// values, [step] size and [minEnabled] and [maxEnabled] values.
  RangeInput(String name, InputCallback onInput,
      {int value: 0,
      StringifyFunction stringifyFunction,
      int min: 0,
      int max: 10,
      int step: 1,
      int minEnabled,
      int maxEnabled})
      : super.withConstraints(
            name, value, min, max, step, minEnabled, maxEnabled) {
    this.onInput = onInput;
    if (stringifyFunction != null) {
      this.stringifyFunction = stringifyFunction;
    }
  }
}

/**
 * Class RangeOutputBase wraps base range output element.
 *
 * It is a base class of [RangeOutput].
 */
class RangeOutputBase extends RangeBase implements Output<int> {
  /// Element class.
  static const String elementClass = "RangeOutput";

  /// Creates new RangeOutputBase with [name], of [elementClass] and given
  /// constraints. Constraints are [current] value, [min] and [max] value,
  /// [step] size and [minEnabled] and [maxEnabled] values.
  RangeOutputBase.withConstraints(String name, int current, int min, int max,
      int step, int minEnabled, int maxEnabled)
      : super.withConstraints(elementClass, name, current, min, max, step,
            minEnabled, maxEnabled);

  /// Creates new RangeOutputBase with [name] and of [elementClass].
  RangeOutputBase(String name) : super(elementClass, name);
}

/**
 * Class RangeOutput wraps range output element.
 *
 * It is an element of the [Form] that looks almost identical to [RangeInput],
 * but isn't meant for input. It can show, for example, the remaining 'resources'
 * to distribute to RangeInputs.
 */
class RangeOutput extends RangeOutputBase with StringRepresentationCreator {
  /// Creates new RangeOutput with [name] and constraints [value], stringify
  /// function [stringifyFunction], [min] and [max] values, [step] size and
  /// [minEnabled] and [maxEnabled] values.
  RangeOutput(String name,
      {int value: 0,
      StringifyFunction stringifyFunction,
      int min: 0,
      int max: 10,
      int step: 1,
      int minEnabled,
      int maxEnabled})
      : super.withConstraints(
            name, value, min, max, step, minEnabled, maxEnabled) {
    if (stringifyFunction != null) {
      this.stringifyFunction = stringifyFunction;
    }
  }
}

/// Class TextBase wraps base text element.
///
/// It is a base class of [TextOutputBase].
class TextBase extends FormElement {
  /// Creates new TextBase of a given [elementClass].
  TextBase(String elementClass) : super(elementClass);

  /// HTML text
  String html;

  /// Returns a map representation of object with [html] attribute included.
  @override
  Map<String, Object> toMap() {
    Map<String, Object> map = super.toMap();
    map.addAll({"html": html});
    return map;
  }

  /// Updates actual object from a map representation in a [map].
  /// The [html] attribute is also set.
  @override
  void updateFromMap(Map<String, Object> map) {
    super.updateFromMap(map);
    html = map["html"];
  }
}

/// Class TextOutputBase is a base text output element.
///
/// It is a base class of [TextOutput].
class TextOutputBase extends TextBase with Output<String> {
  /// Element class.
  static const String elementClass = "TextOutput";

  /// Creates new TextOutputBase of [elementClass].
  TextOutputBase() : super(elementClass);

  /// Returns current value in [html].
  @override
  String get current => html;

  /// Sets value to [html] attribute.
  @override
  set current(String value) {
    html = value;
  }
}

/// Class TextOutput wraps text output element.
class TextOutput extends TextOutputBase {
  // No need to implement anything. This is here in case we need to attach
  // closures to the scripter-facing representation.
}

/// Class MultipleChoiceInputBase wraps base multiple choice input element.
///
/// It is a base class of [MultipleChoiceInput].
class MultipleChoiceInputBase extends FormElement {
  //    with UpdatableByMap
  /// Getter returns a name.
  String get name => attributes["name"];

  /// Setter for a name.
  set name(String value) => attributes["name"] = value;

  //List<OptionBase> options = new List<OptionBase>();
  //void add(OptionBase option) => options.add(option);
  //void addAll(Iterable<OptionBase> options) => this.options.addAll(options);

  /// Element class.
  static const String elementClass = "MultipleChoiceInput";

  /// Creates new MultipleChoiceInputBase with [name] and of [elementClass].
  MultipleChoiceInputBase(String name) : super(elementClass) {
    this.name = name;
  }

  //  @override
  //  Map<String, Object> toMap() => {
  //    "name": name,
  //    "helpMessage": helpMessage
  //    "options": options.map((OptionBase option) => option.toMap())
  //  };
  //
  //  @override
  //  void updateFromMap(Map<String, Object> map) {
  //    name = map["name"];
  //    helpMessage = map["helpMessage"];
  //    List<Map> optionMaps = map["options"];
  //    options.forEach((OptionBase option) {
  //      Map optionMap = optionMaps.singleWhere((Map m) =>
  //          m["name"] == option.name);
  //      option.updateFromMap(optionMap);
  //    });
  //  }
}

/// Class MultipleChoiceInput wraps multiple choice input element.
class MultipleChoiceInput extends MultipleChoiceInputBase
    with _NewValueCallback<int> {
  /// Creates new MultipleChoiceInput with [name] and input callback [onInput].
  MultipleChoiceInput(String name, InputCallback onInput) : super(name) {
    this.onInput = onInput;
  }
}

/// Class OptionBase wraps base option element.
///
/// It is a base class for a single element to choose in a [MultipleChoiceInput]
/// and base class of [Option] element.
class OptionBase extends FormElement implements Input<bool> {
  /// Getter returns a text.
  String get text => attributes["text"];

  /// Setter for a text.
  set text(String value) => attributes["text"] = value;

  /// Element class.
  static const String elementClass = "Option";

  /// Creates new OptionBase with [text] and optional [selected] attribute
  /// and [helpMessage] text. The [selected] attribute is stored into [current].
  OptionBase(String text, {bool selected: false, String helpMessage})
      : super(elementClass) {
    this.text = text;
    this.current = selected;
    this.helpMessage = helpMessage;
  }

  // This exists because of https://code.google.com/p/dart/issues/detail?id=15101
  /// Creates new OptionBase with [text], [selected] attribute and [helpMessage]
  /// text. The [selected] attribute is stored into [current].
  OptionBase.noOptional(String text, bool selected, String helpMessage)
      : this(text, selected: selected, helpMessage: helpMessage);

  /// Returns a map representation of object which contains also [text]
  /// and [current] value which describes if an element is selected or not.
  @override
  Map<String, Object> toMap() {
    Map<String, Object> map = super.toMap();
    map.addAll({"text": text, "current": current});
    return map;
  }

  /// Updates actual object from a map representation in a [map].
  /// The [text] and [current] attributes are also set.
  @override
  void updateFromMap(Map<String, Object> map) {
    super.updateFromMap(map);
    text = map["text"];
    current = map["current"];
  }

  /// If element is currently selected.
  @override
  bool current = false;

  /// Called to ensure that the current value is valid.
  @override
  void sanitizeCurrent() {}
}

/// Class Option wraps option element.
class Option extends OptionBase with _NewValueCallback<bool> {
  /// Creates new Option with [text], [onSelect] input callback and optional
  /// [selected] value and [helpMessage] text.
  ///
  /// The [onSelect] callback is only triggered when the option has just been
  /// selected (not when it was deselected).
  Option(String text, InputCallback onSelect,
      {bool selected, String helpMessage})
      : super.noOptional(text, selected, helpMessage) {
    this.onInput = (bool selected) {
      if (selected) {
        onSelect(selected);
      }
    };
  }
}
