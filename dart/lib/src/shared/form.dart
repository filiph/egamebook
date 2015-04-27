library egb_form;

/**
 * A container of a 'form' - a specialized type of choice when you need more
 * than simple choice ([EgbChoice]).
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
 * callback goes from [EgbInterface] to [EgbScripter] (therefore, sometimes it
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
 *       form.update();  // Sends the new setup to interface.
 *     };
 *
 *     showForm(form);
 *
 *
 * ## A bit about the classes.
 *
 * All form elements have a base class (e.g. [RangeInputBase]) which
 * has the methods and contructors shared by both [EgbScripter] and
 * [EgbInterface].
 *
 * On the [EgbScripter] side, we have [RangeInput], for example,
 * which is the class used by the author. These classes can have closures
 * attached to them. These elements also automatically receive unique
 * [FormElement.id] when they're attached to a [Form].
 *
 * On the [EgbInterface] side, we have [InterfaceRangeInput], a "blueprint"
 * that can't have closures (no way to transport closure from [EgbScripter]
 * to [EgbInterface]) and whose [FormElement.id] is copied from [EgbScripter].
 * From these blueprints, the interface creates and updates [UiElement].
 */

import "package:html5lib/dom.dart" as html5lib;
import "package:jsonml/html5lib2jsonml.dart";
import 'dart:math' as math;

class FormElement extends html5lib.Element implements UpdatableByMap {
  FormElement(String elementClass) : super.tag(elementClass);

  /// Every form element can have a help button that shows a text message.
  String get helpMessage => attributes["helpMessage"];
  set helpMessage(String value) => attributes["helpMessage"] = value;

  /// Sets the visibility of the element. This works like CSS [:display:],
  /// meaning that when set to [:false:], the element will not occupy its
  /// space (there will be no 'white rectange' in the place of a hidden element
  /// like with CSS [:visibility:]).
  bool get hidden => attributes["hidden"] == "true";
  set hidden(bool value) => attributes["hidden"] = value ? "true" : "false";

  /// Whether or not the element should be disabled. Disabled elements are still
  /// visible, but cannot be clicked or changed, and are clearly marked as such.
  bool get disabled => attributes["disabled"] == "true";
  set disabled(bool value) => attributes["disabled"] = value ? "true" : "false";

  /// Returns whether this element is disabled. It differs from [disabled] in
  /// that it also checks whether any parent in the hierarchy is disabled.
  bool get disabledOrInsideDisabledParent {
    if (parent != null &&
        (parent as FormElement).disabledOrInsideDisabledParent) {
      return true;
    }
    return disabled;
  }

  Map<String, Object> toMap() => {
    "hidden": hidden,
    "disabled": disabled
  };
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
    for (FormElement child in
        children.where((html5lib.Element child) => child is FormElement)) {
      result.add(child);
    }
    return result;
  }

  /**
   * Deep set of all elements that are of class [FormElement] and below this
   * element.
   */
  Set<FormElement> get allFormElementsBelowThisOne {
    Set<FormElement> set = new Set<FormElement>();
    _addFormChildrenToSet(this, set);
    return set;
  }
}

/**
 * Interface shared by all form elements that can be updated on the fly (i.e.
 * their content/state is not set in stone, but can be either changed by user
 * or by script).
 */
abstract class UpdatableByMap {
  Map<String, Object> toMap();
  void updateFromMap(Map<String, Object> map);
}

class FormBase extends FormElement {
  static const String elementClass = "Form";
  FormBase() : super(elementClass);

  /// The text to be on the submit button. Defaults to [:null:], in which case
  /// the button will just have a generic graphic (such as an arrow or a check
  /// mark).
  String get submitText => attributes["submitText"];
  set submitText(String value) => attributes["submitText"] = value;
}

/**
 * The top level element of a form, containing all other elements.
 * Author-facing.
 */
class Form extends FormBase implements _NewValueCallback {
  static math.Random _random = new math.Random();

  Form({String submitText}) {
    this.submitText = submitText;
    id = "${_random.nextInt((1<<16))}"; // Assuming this is enough.
  }

  SubmitCallback onSubmit;
  InputCallback onInput;

  /**
   * Receives changed values, computes collaterals, and either returns all
   * values back, or -- in case [newValues.submitted] was [:true:] -- returns
   * [:null:] (because we're moving on).
   */
  FormConfiguration receiveUserInput(CurrentState newValues) {
    Set<_NewValueCallback> parentsOfUpdatedElements =
        new Set<_NewValueCallback>();
    for (FormElement element in allFormElementsBelowThisOne.where((element) =>
        element is UpdatableByMap && element is Input)) {
      Object newCurrent = newValues.getById(element.id);
      if (newCurrent != null && newCurrent != (element as Input).current) {
        (element as Input).current = newCurrent;
        if (element is _NewValueCallback && (element as
            _NewValueCallback).onInput != null) {
          (element as _NewValueCallback).onInput(newCurrent);
        }

        // Walk upwards to mark element's parent to be called with onInput.
        FormElement parent = element;
        do {
          parent = parent.parent;
          if (parent is _NewValueCallback && (parent as
              _NewValueCallback).onInput != null) {
            parentsOfUpdatedElements.add(parent as _NewValueCallback);
          }
        } while (parent.parent != null);
      }
    }

    // Also fire onInput on all parent elements.
    parentsOfUpdatedElements.forEach((_NewValueCallback parent) {
      Object value = null;
      if (parent is Input) {
        value = (parent as Input).current;
      }
      parent.onInput(value);
    });

    allFormElementsBelowThisOne.where((element) => element is Input).forEach(
        (FormElement element) {
      (element as Input).sanitizeCurrent();
    });

    if (newValues.submitted) {
      assert(newValues.submitterId != null);
      SubmitCallback callback;
      if (newValues.submitterId == this.id) {
        callback = this.onSubmit;
      } else {
        // It wasn't a click on the main submit button.
        callback = (allFormElementsBelowThisOne
            .singleWhere((element) =>
                (element is SubmitButton) &&
                (element as FormElement).id == newValues.submitterId)
                as SubmitButton).onSubmit;
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
  void _giveChildrenUniqueIds() {
    int id = 0;
    allFormElementsBelowThisOne.forEach((FormElement element) {
      element.id = "form${this.id}-element${id++}";
    });
    _uniqueIdsGiven = true;
  }

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

  FormConfiguration _createConfiguration() {
    FormConfiguration values = new FormConfiguration();
    for (UpdatableByMap element in allFormElementsBelowThisOne.where((element)
        => element is UpdatableByMap)) {
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
        map["__string__"] = (element as
            StringRepresentationCreator).stringifyFunction(elementCurrent);
      }
      values.add((element as FormElement).id, map);
    }
    return values;
  }
}

/**
 * The 'struct' that is being sent from [EgbScripter] to [EgbInterface] when
 * form is created and after it is updated.
 */
class FormConfiguration {
  Map<String, Map<String, Object>> _valuesMap;

  FormConfiguration() : _valuesMap = new Map<String, Map<String, Object>>();
  FormConfiguration.fromMap(Map<String, Map<String, Object>> map) : _valuesMap =
      map;

  void add(String id, Map<String, Object> attributesMap) {
    _valuesMap[id] = attributesMap;
  }

  Map<String, Object> getById(String id) => _valuesMap[id];

  Map<String, Map<String, Object>> toMap() => new Map.from(_valuesMap);
}

/**
 * The 'struct' that is send from [EgbInterface] to [EgbScripter] after each
 * user interaction.
 */
class CurrentState {
  Map<String, Object> _valuesMap;
  /**
   * Whether or not this form is being submitted. This information is stored
   * in a 'magic' key-value pair.
   */
  bool get submitted => _valuesMap["__submitted__"];
  set submitted(bool value) => _valuesMap["__submitted__"] = value;

  String get submitterId => _valuesMap["__submitterId__"];
  set submitterId(String value) => _valuesMap["__submitterId__"] = value;

  CurrentState() : _valuesMap = new Map<String, Object>() {
    submitted = false;
  }
  CurrentState.fromMap(Map<String, Object> map) : _valuesMap = map {
    if (!_valuesMap.containsKey("__submitted__")) {
      submitted = false;
    }
  }

  void add(String id, Object current) {
    _valuesMap[id] = current;
  }

  Object getById(String id) => _valuesMap[id];

  Map<String, Object> toMap() => new Map.from(_valuesMap);

  String toString() => "<CurrentState submitted=$submitted>";
}

class FormSection extends FormElement {
  String get name => attributes["name"];
  set name(String value) => attributes["name"] = value;

  static const String elementClass = "FormSection";
  FormSection(String name) : super(elementClass) {
    this.name = name;
  }
}

class _NewValueCallback<T> {
  /**
   * The function to be called when the element has a new value. The value is
   * given as the only argument to the callback.
   */
  InputCallback onInput;
}

typedef void InputCallback(Object value);

class StringRepresentationCreator {
  /// The function that takes the value of current and returns its [String]
  /// representation. Such as (42) => "42 %".
  StringifyFunction stringifyFunction = (Object value) => "$value";
}

typedef String StringifyFunction(Object current);

/**
 * This interface is for UI blueprints that need to show a value as a string.
 * That value is created via [StringRepresentationCreator.stringifyFunction]
 * in [EgbInterface] each time a value is updated.
 */
abstract class StringRepresentationHolder {
  String currentStringRepresentation;
}

/**
 * Interface shared by all inputs. All inputs have a [current] value and
 * they provide [sanitizeCurrent] method.
 */
abstract class Input<T> {
  T current;

  /// Called to ensure that the current value is valid. This method will
  /// normally set [current] below any maximum values etc.
  void sanitizeCurrent();
}

abstract class Output<T> {
  T current;
}

class SubmitButtonBase extends FormElement {
  String get name => attributes["name"];
  set name(String value) => attributes["name"] = value;

  static const String elementClass = "SubmitButton";

  SubmitButtonBase(String name, {String helpMessage}) : super(elementClass) {
    this.name = name;
    this.helpMessage = helpMessage;
  }

  SubmitButtonBase.noOptional(String name, String helpMessage) : this(name,
      helpMessage: helpMessage);

  @override
  Map<String, Object> toMap() {
    Map<String, Object> map = super.toMap();
    map.addAll({
      "name": name
    });
    return map;
  }

  @override
  void updateFromMap(Map<String, Object> map) {
    super.updateFromMap(map);
    name = map["name"];
  }
}

typedef void SubmitCallback();

class SubmitButton extends SubmitButtonBase  {
  SubmitCallback onSubmit;
  SubmitButton(String name, this.onSubmit, {String helpMessage}) :
    super.noOptional(name, helpMessage);
}

// TODO: SkillSubmitButton - allows player to have better results according
// to skill (acumen)


class CheckboxBase extends FormElement {
  String get name => attributes["name"];
  set name(String value) => attributes["name"] = value;

  CheckboxBase(String elementClass, String name)
      : super(elementClass) {
    this.name = name;
  }

  /// Checked or not.
  bool current;

  @override
  Map<String, Object> toMap() {
    Map<String, Object> map = super.toMap();
    map.addAll({
      "current": current
    });
    return map;
  }

  @override
  void updateFromMap(Map<String, Object> map) {
    super.updateFromMap(map);
    current = map["current"];
  }
}

class CheckboxInputBase extends CheckboxBase implements Input<bool> {
  static const String elementClass = "CheckboxInput";
  CheckboxInputBase(String name)
    : super(elementClass, name);

  @override
  void sanitizeCurrent() {
    if (current == null) {
      throw new StateError("CheckboxInput state must be either true or false.");
    }
  }
}

class CheckboxInput extends CheckboxInputBase with _NewValueCallback<bool> {
  CheckboxInput(String name, InputCallback onInput, {bool checked: false})
      : super(name) {
    this.onInput = onInput;
    this.current = checked;
  }
}

/**
 * Base class of [RangeInput] and [InterfaceRangeInput].
 */
class RangeBase extends FormElement {
  String get name => attributes["name"];
  set name(String value) => attributes["name"] = value;

  RangeBase(String elementClass, String name) : super(elementClass) {
    this.name = name;
  }
  RangeBase.withConstraints(String elementClass, String
      name, this.current, this.min, this.max, this.step, this.minEnabled, this.maxEnabled)
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

class RangeInputBase extends RangeBase implements Input<int> {
  static const String elementClass = "RangeInput";
  RangeInputBase.withConstraints(String name, int current, int min, int max, int
      step, int minEnabled, int maxEnabled)
      : super.withConstraints(elementClass, name, current, min, max, step,
          minEnabled, maxEnabled);

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
 * The author-facing class of the range input element. It works only with
 * integers
 */
class RangeInput extends RangeInputBase with _NewValueCallback<int>,
    StringRepresentationCreator {
  RangeInput(String name, InputCallback onInput, {int value:
      0, StringifyFunction stringifyFunction, int min: 0, int max: 10, int step:
      1, int minEnabled, int maxEnabled}) : super.withConstraints(name, value, min,
      max, step, minEnabled, maxEnabled) {
    this.onInput = onInput;
    if (stringifyFunction != null) {
      this.stringifyFunction = stringifyFunction;
    }
  }
}

/**
 * Base class of [RangeOutput] and [InterfaceRangeOutput].
 */
class RangeOutputBase extends RangeBase implements Output<int> {
  static const String elementClass = "RangeOutput";

  RangeOutputBase.withConstraints(String name, int current, int min, int
      max, int step, int minEnabled, int maxEnabled)
      : super.withConstraints(elementClass, name, current, min, max, step,
          minEnabled, maxEnabled);

  RangeOutputBase(String name) : super(elementClass, name);
}

/**
 * An element of the [Form] that looks almost identical to [RangeInput], but
 * isn't meant for input. It can show, for example, the remaining 'resources'
 * to distribute to RangeInputs.
 */
class RangeOutput extends RangeOutputBase with StringRepresentationCreator {
  RangeOutput(String name, {int value: 0, StringifyFunction
      stringifyFunction, int min: 0, int max: 10, int step: 1, int minEnabled, int
      maxEnabled}) : super.withConstraints(name, value, min, max, step, minEnabled,
      maxEnabled) {
    if (stringifyFunction != null) {
      this.stringifyFunction = stringifyFunction;
    }
  }
}

class TextBase extends FormElement {
  TextBase(String elementClass) : super(elementClass);

  String html;

  @override
  Map<String, Object> toMap() {
    Map<String, Object> map = super.toMap();
    map.addAll({
      "html": html
    });
    return map;
  }

  @override
  void updateFromMap(Map<String, Object> map) {
    super.updateFromMap(map);
    html = map["html"];
  }
}

class TextOutputBase extends TextBase with Output<String> {
  static const String elementClass = "TextOutput";
  TextOutputBase() : super(elementClass);

  @override
  String get current => html;
  @override
  set current(String value) {
    html = value;
  }
}

class TextOutput extends TextOutputBase {
  // No need to implement anything. This is here in case we need to attach
  // closures to the scripter-facing representation.
}

class MultipleChoiceInputBase extends FormElement {
  //    with UpdatableByMap
  String get name => attributes["name"];
  set name(String value) => attributes["name"] = value;

    //List<OptionBase> options = new List<OptionBase>();
    //void add(OptionBase option) => options.add(option);
    //void addAll(Iterable<OptionBase> options) => this.options.addAll(options);

  static const String elementClass = "MultipleChoiceInput";
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

class MultipleChoiceInput extends MultipleChoiceInputBase with
    _NewValueCallback<int> {
  MultipleChoiceInput(String name, InputCallback onInput) : super(name) {
    this.onInput = onInput;
  }
}

/// Base class for a single element to choose in a [MultipleChoiceInput].
class OptionBase extends FormElement implements Input<bool> {
  String get text => attributes["text"];
  set text(String value) => attributes["text"] = value;

  static const String elementClass = "Option";
  OptionBase(String text, {bool selected: false, String helpMessage}) :
      super(elementClass) {
    this.text = text;
    this.current = selected;
    this.helpMessage = helpMessage;
  }

  // This exists because of https://code.google.com/p/dart/issues/detail?id=15101
  OptionBase.noOptional(String text, bool selected, String helpMessage) :
    this(text, selected: selected, helpMessage: helpMessage);

  @override
  Map<String, Object> toMap() {
    Map<String, Object> map = super.toMap();
    map.addAll({
      "text": text,
      "current": current
    });
    return map;
  }

  @override
  void updateFromMap(Map<String, Object> map) {
    super.updateFromMap(map);
    text = map["text"];
    current = map["current"];
  }

  @override
  bool current = false;

  @override
  void sanitizeCurrent() {}
}

class Option extends OptionBase with _NewValueCallback<bool> {
  /// The [onSelect] callback is only triggered when the option has just been
  /// selected (not when it was deselected).
  Option(String text, InputCallback onSelect, {bool
      selected, String helpMessage}) : super.noOptional(text, selected,
      helpMessage) {
    this.onInput = (bool selected) {
      if (selected) {
        onSelect(selected);
      }
    };
  }
}
