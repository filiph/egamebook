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
 *     ask(form)
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
 *     ask(form);
 *   
 */

class FormElement {
  final String elementClass = "OVERRIDE";

  /**
   * The [id] is unique in any form and is assigned by the top-level [Form]
   * element. (This allows for [Form.update] payloads to only carry the updated
   * data.
   */
  int id;

  /// The parent element. Should be [:null:] only when this element is the
  /// [Form].
  FormElement parent;

  /// Every form element can have a help button that shows a text message.
  String helpMessage;

  /// Sets the visibility of the element. This works like CSS [:display:],
  /// meaning that when set to [:false:], the element will not occupy its
  /// space (there will be no 'white rectange' in the place of a hidden element
  /// like with CSS [:visibility:]).
  bool hidden = false;
}

class _ElementContainer {
  List<FormElement> children = new List<FormElement>();

  void add(FormElement element) {
    assert(element.elementClass != "OVERRIDE");
    children.add(element);
    element.parent = (this as FormElement);
    FormElement topLevelForm = (this as FormElement);
    while (topLevelForm is! Form) {
      topLevelForm = topLevelForm.parent;
    }
    element.id = (topLevelForm as Form).lastId + 1;
    (topLevelForm as Form).lastId += 1;
  }
}

class _Form extends FormElement with _ElementContainer {
  @override
  String elementClass = "Form";
  
  /// The text to be on the submit button. Defaults to [:null:], in which case
  /// the button will just have a generic graphic (such as an arrow or a check
  /// mark).
  String submitText;

  /// The highest given [FormElement.id] yet.
  int lastId = 0;
}

/**
 * The top level element of a form, containing all other elements. 
 * Author-facing.
 */
class Form extends _Form {
  Form({String submitText}) {
    this.submitText = submitText;
  }

  receiveUserInput(Map newValues) {
    // TODO: go to each element, if element has onInputListener, then fire that,
    // otherwise, change value directly. Also, walk up the parent chain to
    // see if there are other onInputListeners to fire.
    // Returns Future?
  }
  
  Map<String,Object> toMap() {
    // TODO
  }
}

class InterfaceForm extends _Form {
  InterfaceForm(jsonml); // TODO: creates the interface-side of the form
  // Listens to user actions, sends for updates to scripter
}

class FormSection extends _ElementContainer {
  String elementClass = "FormSection";
  final String name;
  FormSection(this.name);
}

class _ValueCallback<T> {
  /**
   * The function to be called when the element has a new value. The value is
   * given as the only argument to the callback.
   */
  InputCallback onInput;
}

typedef void InputCallback(value);

/**
 * Base class of [RangeInput] and [InterfaceRangeInput].
 */
class _RangeInput extends FormElement {
  @override
  final String elementClass = "RangeInput";
  String name;

  _RangeInput();
  _RangeInput.withConstraints(this.name, this.value, this.min, this.max, this.step, this.minEnabled, this.maxEnabled);

  /// Current (or predefined) value selected on the range input. Defaults to
  /// [:0:].
  int value = 0;
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
  /// As with [minEnabled], but for values _above_ this number.
  int maxEnabled;
}

/**
 * The author-facing class of the range input element. It works only with
 * integers
 */
class RangeInput extends _RangeInput with _ValueCallback<int> {
  RangeInput(String name, InputCallback onInput, {int value: 0, int min: 0, int
      max: 10, int step: 1, int minEnabled, int maxEnabled}) : super.withConstraints(
      name, value, min, max, step, minEnabled, maxEnabled) {
    this.onInput = onInput;
  }
}

class InterfaceRangeInput extends _RangeInput {
  @override
  String name;
  InterfaceRangeInput(this.name);
}


