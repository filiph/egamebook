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
 *     String name;
 *     int age;
 *     String sex;
 *     var form = new Form();
 *     form.add(new TextInput("Name:", (value) => name = value,
 *                            validate: (value) => value != "");
 *     form.add(new RangeInput("Age:", (value) => age = value,
 *                             min: 20, max: 100, value: 30, step: 1,
 *                             maxEnabled: 40));
 *     form.add(new RadioChoice("Sex:", {"m": "Male", "f": "Female"}, 
 *                              (value) => sex = m));
 *     form.onChange.listen((element) {
 *     });
 *     
 *     ask(form)
 *     .then((_) {});
 *  
 */
class Form {
  
}