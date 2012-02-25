#library('Scripter Implementation');

#import('../egb_library.dart');

class ScripterImpl extends Scripter {

  // TODO: Implement "library"

  ScripterImpl() : super() {
    pages = [
      // page 0
      [ 
        "First paragraph!",
        "Second paragraph!",
	"Still the first page.",
	() { 
	  echo("First script."); 
          vars["a"] = 1;
	},
	() {
	  if (vars["a"] == 1)
	    choice("Go to the next page.", goto:1);
	},
	"Another paragraph",
	() {
	  if (vars["a"] < 5) {
	    vars["a"]++;
	    echo("Repeat ${vars['a']}!");
	    echo("Isn't that great?");
	    repeatBlock(); 
	  } else
	    echo("Good.");//goto(1); 
	},
	() {
	  choice("Go elsewhere now!", goto:1, showNow:true);
	  echo("You have an option to leave.");
	  choice("Stay.", showNow:true);
	  choice("Let me think about it.", then:() { repeatBlock(); }, showNow:true);
	},
	"Last paragraph.",
	new Choice("Go to the next page and increase \"a\".", goto:1, then:() { vars["a"]++; })
      ],
      // page 1
      [ 
        "This is the second page!!",
	() {
          choice("Go to hell.", showNow:true, then:() { echo("Hell yeah"); });
          choice("Go to heaven.", showNow:true).then(() { echo("Yeah"); });
	},
        "Interesting!",
	() { echo("vars[\"a\"] is now ${vars['a']}."); } 
      ],
    ];
  }
}
