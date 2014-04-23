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
 * all resource sliders should be locked at their current maximum. 
 * 
 * When presented to the user, and after each user input, the form is 
 * temporarily disabled (no user input allowed) and a callback is fired. This
 * callback goes from [EgbInterface] to [EgbScripter] (therefore, sometimes it
 * has to go into another Isolate or even to a server).
 * 
 * Each node of the Form structure is given a unique ID. This makes it easy
 * for the     
 */
class Form {
  
}