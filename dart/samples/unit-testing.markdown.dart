#library('Scripter Implementation');

#import('../egb_library.dart');

Dynamic randomChoice(List choices) {
  num number = choices.length;
  if (number == 0)
    throw new Exception("Cannot randomly choose from an empty set.");
  double portionSize = 1.0 / number;
  double rand = Math.random();
  int which = (rand / portionSize).floor().toInt();

  return choices[which];
}

class Descriptable {  // describes what happens to actor (3rd person)
  StringBuffer _textBuffer;

  String get description() {
    String desc = _textBuffer.toString();
    _textBuffer.clear();
    return desc;
  }

  Descriptable() {
    _textBuffer = new StringBuffer();
  }

  void echo(String str) {
    _textBuffer.add(str);
  }
}

class Entity extends Descriptable {
  List <String> names;

  Entity() {
    names = new List();
  }

  String get randomName() => randomChoice(names);
}

class Actor extends Entity {
  // current state
  bool alive = true;
  int _hitpoints;
  double _stance;  // from 0.0 = lying on the ground to 5.0 = professional combat stance
  List<CombatMove> moves;
  List<Weapon> wieldedWeapons;
  List<Function> modifiers;  // functions to be run on each update (poison, specials)
  // TODO: limbs

  int get hitpoints() => _hitpoints;
  void set hitpoints(int value) {
    _hitpoints = value;
    if (_hitpoints <= 0) {
      die();
    }
  }

  int get stance() => _stance;
  void set stance(int value) {
    _stance = value;
    if (_stance <= 0) {
      alive = false;
      die();
    }
  }

  Actor() : super() {
    // init with defaults
    names = ["actor"];
    _hitpoints = 3;

    modifiers = new List();
  }

  void update() {
    echo("The $randomName just stands there.");

    modifiers.forEach((Function mod) { mod(this); });
  }

  void die() {
    alive = false;
    echo("The $randomName dies.");
  }

  // stats
  int speed;
  int armor;
  int dodging;
  int blocking;
}

class Player extends Actor {
}

class CombatMove extends Entity {
  int duration;

  // modifiers to move's performer
  double dodgingMod;
  double blockingMod;
  double stanceMod;

  Function applyEffects;
  Function computeChance;
  Function computeSeverity;
  Function applicable;

  CombatMove() : super() {
    // init with defaults
    names.add("Hit to the stomach");
    duration = "2";
    dodgingMod = 0.8;
    blockingMod = 0.8;
    stanceMod = 0.8;

    applicable = (Actor atacker, Actor enemy) {
      return true;
    };

    computeChance = (Actor atacker, Actor enemy) {
      return 0.6;
    };

    computeSeverity = (Actor atacker, Actor enemy) {
      return 1;
    };

    applyEffects = (Actor enemy) {
      enemy.hitpoints -= 1;
    };
  }
}

class Weapon extends Entity {
}

interface LoopedEvent {
  bool finished;
  bool interactionNeeded;
  void update();
  void updateUntilInteraction();
}

class Combat extends Descriptable implements LoopedEvent {
  bool finished = false;
  bool interactionNeeded = false;

  List<Actor> enemies;

  Combat() : super() {
    enemies = new List();
  }

  void update() {
    enemies.forEach((enemy) {
      enemy.update();
      echo(enemy.description);
    });

    if (enemies.every((e) => !e.alive)) {
      finished = true;
    }

    echo(" And that's the end of the combat turn.");
  }

  void updateUntilInteraction() {
    while (!finished && !interactionNeeded) {
      update();
    }
  }
}


class ScripterImpl extends Scripter {

  /* LIBRARY */

    
  void start(LoopedEvent event) {
    vars["_curLoopedEvent"] = event;
    updateLoopedEvent();
  }
  
  void updateLoopedEvent() {
    LoopedEvent event = vars["_curLoopedEvent"];
    event.updateUntilInteraction();
    echo(event.description);
    if (event.finished) {
      // ... ?
    } else {
      nextScript(updateLoopedEvent);
    }
  }
  
    ScripterImpl() : super() {
      pages = [
        /* PAGES & BLOCKS */
              // welcome
      [
        "# Thin Ice",
        () {
        vars["player"] = new Actor();
        vars["wolf"] = new Actor();
        vars["wolf"].names = ["wolf", "wolf", "gray wolf"];
        vars["wolf"].modifiers.add((wolf) {
            if (Math.random() < 0.3) {
              wolf.echo("The ${wolf.randomName} spits out blood.");
              wolf.hitpoints -= 1;
            }
        });
        vars["combat"] = new Combat();
        vars["combat"].enemies.add(vars["wolf"]);
        start(vars["combat"]);
        }
      ]
        ];
    }
}
