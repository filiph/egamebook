#library('Scripter Implementation');

#import('../egb_library.dart');

class ScripterImpl extends Scripter {

  /* LIBRARY */

  void startCombat(name, [hp=3]) {
    echo("You have encountered $name!");
    vars["enemy"] = {
      "name": name,
      "hp": hp
    };
    combatTurn();
  }

  void combatTurn() {
    var enemy = vars["enemy"];
    echo("The ${enemy['name']} is trying to hit you!");
    if (Math.random() > 0.5)
      echo("And he succeeds! You took a hit!");
    else
      echo("And he misses!");

    choice("Do nothing.", showNow:true, then:() { combatTurn(); });
    choice("Attack!", showNow:true, then:() {
      echo("You are trying to hit the ${vars['enemy']['name']}!.");
      if (Math.random() > 0.33) {
	echo("You hit him!");
	vars["enemy"]["hp"]--;
	if (vars["enemy"]["hp"] <= 0) {
	  echo("The ${vars['enemy']['name']} is dead!");
	  vars["enemy"] = null;
	} else {
	  nextScript(combatTurn);
	}
      } else {
	echo("You miss like the pussy you are.");
	nextScript(combatTurn);
      }
    });
  }

  ScripterImpl() : super() {
    pages = [
      /* PAGES & BLOCKS */
      // page 0
      [ 
        "First paragraph!",
        "Second paragraph!",
	() {
          startCombat("ugly orc", hp:2);
	},
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
