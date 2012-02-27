#library('Scripter Implementation');

#import('../egb_library.dart');

class Actor {
  List<String> names;

  // current state
  int hitpoints;
  double stance;
  List<CombatMove> moves;
  List<Weapon> wieldedWeapons;
  // TODO: limbs

  // stats
  int speed;
  int armor;
  int dodging;
  int blocking;
}

class CombatMove {
  int duration;

  // modifiers to move's performer
  double dodgingMod;
  double blockingMod;
  double stanceMod;

  // effects when successful
  void applyEffects(Actor target) {
    target.hitpoints -= 1;
  }

  double computeChance(Actor attacker, Actor target) {
  }

  // used to sort attacks by effectiveness
  double computeSeverity(Actor attacker, Actor target) {
  }

  bool applicable(Actor attacker, Actor target) {
    return true; // TODO implement
  }
}

class Weapon {
}

class Combat {
}


class ScripterImpl extends Scripter {

  /* LIBRARY */

    
  Dynamic randomChoice(List choices) {
    num number = choices.length;
    double portionSize = 1.0 / number;
    double rand = Math.random();
    int which = (rand / portionSize).floor().toInt();
  
    return choices[which];
  }
  
  
  void combatStart(options) {
    // TODO: check for options
    // TODO: save options to persistent variables
  
    combatTurn();
  }
  void combatTurn() {
    combatTurnPlayer();
    combatTurnEnemy();
    if (vars["enemy"]!= null && vars["playerLives)"]) {
      combatGenerateOptions();
      nextScript(combatTurn);
    } else
      combatEnd();
  }
  
  void combatGenerateOptions() {
    
  }
  
  void combatTurnPlayer() {
    // resolve combat
  }
  
  void combatTurnEnemy() {
    // resolve combat
  }
  
  void combatEnd() {
    // TODO: zhodnotit fight
  }
    ScripterImpl() : super() {
      pages = [
        /* PAGES & BLOCKS */
              // welcome
      [
        "# Thin Ice",
        "A sci-fi thriller featuring a dynamic storyline, swords, and vaginas.",
        "Written by: Filip Hracek",
        () {
        for (int i = 0; i < 100; i++)
          echo(randomChoice(["You are standing.\n"]));
        }
      ]
        ];
    }
}
