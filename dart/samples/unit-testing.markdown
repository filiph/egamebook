
--- 
welcome

# Thin Ice


<dart>

vars["moveLeftHook"] = new CombatMove();
vars["moveLeftHook"].choiceString = "Strike <object> with your left hook";
vars["moveLeftHook"].duration = 3;
vars["moveLeftHook"].recovery = 1;
vars["moveLeftHook"].dodgingMod = 0.6;
vars["moveLeftHook"].blockingMod = 0.8;

vars["moveLeftHook"].applicable = (Actor attacker, Actor target) {
  return true;
};

vars["moveLeftHook"].computeChance = (Actor attacker, Actor target) {
  return 0.6;
};

vars["moveLeftHook"].computeSuitability = (Actor attacker, Actor target) {
  return 1;
};

vars["moveLeftHook"].start = (Actor attacker, Actor target) {
  if (target.isPlayer) {
    attacker.combat.storyline.add("is moving to ${randomly(['hit','punch','bash'])} <object> in the face", subject:attacker, object:target);
  } else if (attacker.isPlayer) {
    attacker.combat.storyline.add("you prepare to punch <object> in the ${randomly(['face','head'])}", subject:attacker, object:target);
  }
};

vars["moveLeftHook"].applyEffects = (Actor attacker, Actor target) {
  if (target.isPlayer)
    attacker.combat.storyline.add("hits you to the face", subject:attacker, object:target);
  else
    attacker.combat.storyline.add("you hit <object> in the face", subject:attacker, object:target);
  target.hitpoints -= 2;
};



vars["player"] = new Player();
vars["player"].moves.add(vars["moveLeftHook"]);
vars["wolf"] = new Actor();
vars["wolf"].names = ["the wolf", "the wolf", "the gray wolf"];
vars["wolf"].pronoun = "it";
/*vars["wolf"].modifiers.add((wolf) {
    if (Math.random() < 0.01) {
      wolf.echo("The ${wolf.randomName} spits out blood.");
      wolf.hitpoints -= 1;
    }
});*/
vars["orc"] = new Actor();
vars["orc"].names = ["the orc", "the orc", "the ugly orc"];
vars["orc"].moves.add(vars["moveLeftHook"]);
/*vars["orc"].modifiers.add((orc) {
    if (Math.random() < 0.01) {
      orc.echo("The ${orc.randomName} grunts in pain from the poisoning.");
      orc.hitpoints -= 1;
    }
});*/
vars["combat"] = new Combat();
vars["combat"].actors.addAll([vars["wolf"],vars["orc"],vars["player"]]);
start(vars["combat"]);
</dart>

<dart>
if (!vars["player"].alive)
  goto(1);
</dart>

Congratulations! You beat your first enemies!

---
die

You died like the bitch you are.





<classes>

Dynamic randomly(List choices) {
  num number = choices.length;
  if (number == 0)
    throw new Exception("Cannot randomly choose from an empty set.");
  double portionSize = 1.0 / number;
  double rand = Math.random();
  int which = (rand / portionSize).floor().toInt();

  return choices[which];
}

String capitalize(String str) {
  String firstLetter = str[0].toUpperCase();
  if (str.length == 1)
    return firstLetter;
  else 
    return "$firstLetter${str.substring(1)}";
}

class Storyline {
  StringBuffer strBuf;
  List<Map<String,Dynamic>> reports;

  static final String SUBJECT = "<subject>";
  static final String OBJECT = "<object>";
  static final String SUBJECT_PRONOUN = "<subjectPronoun>";
  static final String OBJECT_PRONOUN = "<objectPronoun>";
  static final String ACTION = "<action>";

  Storyline add(String str, [Actor subject, Actor object]) {
    reports.add( {
        "string": str,
        "subject": subject,
        "object": object
    });
  }

  String string(int i) => reports[i]["string"];
  Actor subject(int i) => reports[i]["subject"];
  Actor object(int i) => reports[i]["object"];

  /// taking care of all the exceptions and rules when comparing different reports
  /// call: [: same('subject', i, i+1) ... :]
  bool same(String key, int i, int j) {
    if (i >= reports.length || j >= reports.length)
      return false;
    if (i < 0 || j < 0)
      return false;
    if (reports[i][key] == null || reports[j][key] == null)
      return false;
    if (reports[i][key] == reports[j][key])
      return true;
    else
      return false;
  }

  /// take care of the substitution
  String substitute(int i, String str) {
    String result = str;
    result = result.replaceAll(ACTION, string(i));
    if (subject(i) != null) {
      result = result.replaceAll(SUBJECT, subject(i).randomName);
      result = result.replaceAll(SUBJECT_PRONOUN, subject(i).pronoun);
    }
    if (object(i) != null) {
      result = result.replaceAll(OBJECT, object(i).randomName);
      result = result.replaceAll(OBJECT_PRONOUN, object(i).pronoun);
    }

    return result;
  }

  /// Takes care of substitution
  static String getString(String str, [Actor subject, Actor object]) {
    String result = str;
    if (subject != null) {
      result = result.replaceAll(SUBJECT, subject.randomName);
      result = result.replaceAll(SUBJECT_PRONOUN, subject.pronoun);
    }
    if (object != null) {
      result = result.replaceAll(OBJECT, object.randomName);
      result = result.replaceAll(OBJECT_PRONOUN, object.pronoun);
    }

    return result;
  }

  Storyline() {
    reports = new List<Map<String,Dynamic>>();
    strBuf = new StringBuffer();
  }

  void clear() {
    reports.clear();
    strBuf.clear();
  }

  String toString() {
    int length = reports.length;
    for (int i=0; i < length; i++) {
      if (subject(i) != null && !subject(i).isPlayer) {
        if (same('subject', i, i+1) && same('subject', i, i+2)) {
          // three reports about the same guy in a row
          strBuf.add(capitalize(substitute(i, "<subject> <action>, ")));
          strBuf.add(substitute(i+1, "<action>, "));
          strBuf.add(randomly(["","then ","and ", "and finally "]));
          strBuf.add(substitute(i+2, "<action>. "));
          i+=2;
        } else if (same('subject', i, i+1)) {
          strBuf.add(capitalize(substitute(i, "<subject> <action>")));
          strBuf.add(randomly([", ",", then "," and "]));
          strBuf.add(substitute(i+1, "<action>. "));
          i++;
        } else if (same('string', i, i-1)) {
          strBuf.add(capitalize(substitute(i, randomly(["<subject> does the same. ", "Same goes for <subject>. "]))));
        } else {
            strBuf.add(capitalize(substitute(i, "<subject> <action>. ")));
        }
      } else {
        strBuf.add(capitalize(substitute(i, "<action>. ")));
      }
    }
    return strBuf.toString();
  }
}


class Entity {
  List <String> names;
  String pronoun = "it";

  Entity() {
    names = new List();
  }

  String get randomName() => randomly(names);
}

class Actor extends Entity {
  // current state
  bool alive = true;
  bool isPlayer = false;
  int team = 2; // actors are on team 2 (Enemy) by default
  int _hitpoints;
  // from 0.0 = lying on the ground to 5.0 = professional combat stance
  // 0=lying, 1=on_four, 2=almost_falling, 3=shaken, 4=firm_stance, 5=pro_stance
  double _stance;  
  List<CombatMove> moves;
  CombatMove currentMove;
  CombatMove previousMove; // keeps track of previous move so that actors don't do the same thing over and over again
  int tillEndOfMove = 0;
  List<Weapon> wieldedWeapons;
  List<Function> modifiers;  // functions to be run on each update (poison, specials)
  Combat combat;
  Actor _target;
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
  }

  Actor get target() => _target;
  void set target(Actor value) {
    _target = value;
    previousMove = null;
  }

  Actor() : super() {
    // init with defaults
    names = ["actor"];
    pronoun = "he";
    _hitpoints = maxHitpoints;
    _stance = maxStance;

    modifiers = new List();
    moves = [new CombatMove()]; // TODO
  }

  void update() {
    if (!alive)
      return;

    modifiers.forEach((Function mod) { mod(this); });

    if (!alive) // make sure actor doesn't move after being poisoned to death, for example
      return;

    if (tillEndOfMove > 0) {
      if (target != null && !target.alive) { // don't attack already dead actors
        currentMove = null;
        target = null;
        tillEndOfMove = 0;
      }
      tillEndOfMove--; // just let the time pass
    } else {
      // effect of finished move
      if (currentMove != null) {
        if (target.alive)
          currentMove.applyEffects(this, target);
        tillEndOfMove = currentMove.recovery / speed * 10;
        previousMove = currentMove;
        currentMove = null;
        return;
      }
      // AI
      if (!isPlayer) {
        if (target == null || !target.alive) {
          List<Actor> possibleEnemies = combat.actors.filter((o) => o.team != team && o.alive);
          if (!possibleEnemies.isEmpty())
            target = randomly(possibleEnemies);
          else {
            alive = false; // TODO: more elegant way to make sure combats don't wage forever
            return;
          }
        }

        if (target == null || !moves.some((m) => m.applicable(this,target)) ) {
          // no target or no combat moves applicable to the target, TODO: try to change target?
          combat.storyline.add(randomly(["just stands there", "doesn't do anything", "does nothing"], subject:this));
        } else {
          // TODO: choice
          currentMove = randomly(moves.filter((m) => m.applicable(this,target)));
          tillEndOfMove = currentMove.duration / speed * 10; // TODO: randomness?
          currentMove.start(this, target);
        }
      }
    }
  }

  void die() {
    alive = false;
    if (!isPlayer)
      combat.storyline.add(randomly(['dies','ceases to breathe','perishes']), subject:this);
    else
      combat.storyline.add("you die", subject:this);
  }

  // stats
  int maxHitpoints = 5;
  double maxStance = 4.0;
  int speed = 10;
  int armor = 10;
  int dodging = 10;
  int blocking = 10;
}

class Player extends Actor {
  Player() : super() {
    isPlayer = true;
    team = 1; // player is on team Player (1)
    names = ["player"];
    pronoun = "you";
  }
}

class CombatMove extends Entity {
  /// the string to be presented as a choice to the player
  /// e.g.: "Hit <object> to the stomach"
  String choiceString;

  int duration; // number of turns from start to effect (=hit)
  int recovery; // number of turns it gets to start a new move again

  // modifiers to move's performer
  double dodgingMod;
  double blockingMod;

  Function start;
  Function applyEffects;
  Function computeChance;
  /// used to sort moves by immediate suitability. The top choices should be
  /// a good combination of low-risk, low-impact, and high-risk, high-impact moves
  Function computeSuitability;
  Function applicable;

  CombatMove() : super() {
    // init with defaults
    choiceString = "Hit <object> to the stomach";
    duration = 2;
    recovery = 1;
    dodgingMod = 0.8;
    blockingMod = 0.8;

    applicable = (Actor attacker, Actor target) {
      return true;
    };

    computeChance = (Actor attacker, Actor target) {
      return 0.6;
    };

    computeSuitability = (Actor attacker, Actor target) {
      return 1;
    };

    start = (Actor attacker, Actor target) {
      if (target.isPlayer) {
        attacker.combat.storyline.add("tries to hit <object> to the ${randomly(['stomach','gut'])}", subject:attacker, object:target);
      } else if (attacker.isPlayer) {
        attacker.combat.storyline.add("you decide to punch <object> in the ${randomly(['stomach','gut'])}", subject:attacker, object:target);
      }
    };

    applyEffects = (Actor attacker, Actor target) {
      if (target.isPlayer)
        attacker.combat.storyline.add("hits you to the stomach", subject:attacker, object:target);
      else
        attacker.combat.storyline.add("you hit ${target.randomName} to the stomach", subject:attacker, object:target);
      target.hitpoints -= 1;
    };
  }
}

class Weapon extends Entity {
}

interface LoopedEvent {
  bool finished;
  bool interactionNeeded;
  void start();
  void update();
  void updateUntilInteraction();
}


class Combat extends Entity implements LoopedEvent {
  Storyline storyline;

  bool _started = false;
  bool finished = false;
  bool interactionNeeded = false;

  int time = 0;

  void start() {
    actors.forEach((a) { 
        a.combat = this; 
        if (a.isPlayer)
          _player = a;
    });
    if (_player == null)
      throw new Exception("Cannot start combat without player.");
    _started = true;
  }

  List<Actor> actors;
  Actor _player;
  List<Choice> playerChoices;

  Combat() : super() {
    storyline = new Storyline();
    actors = new List();
    playerChoices = new List();
  }

  /// The main function that gets called every single move and calls each actor to do their own stuff.
  void update() {
    actors.forEach((actor) {
      actor.update();
    });

    if (actors.every((a) => !a.alive || _player.team == a.team)) {
      finished = true;
      return;
    }

    if (_player != null && _player.alive && _player.tillEndOfMove <= 0) { // TODO: check if there is stuff to be done by player
      if (_player.target == null) {
        // let player choose his target
        List<Actor> possibleEnemies = actors.filter((o) => o.team != _player.team && o.alive);
        possibleEnemies.forEach((enemy) {
            playerChoices.add(new Choice("Target ${enemy.randomName}.", showNow:true, then:() { storyline.add("you now lock on to <object>", subject:_player, object:enemy); _player.target = enemy; }));
        });
      } else {
        // find out possible moves the player can perform on the target
        List<CombatMove> possibleMoves = _player.moves.filter((m) => m.applicable(_player,_player.target));
        if (!possibleMoves.isEmpty()) {
          // only allow to repeat previous move when there is no other option
          if (possibleMoves.length > 1)
            possibleMoves = possibleMoves.filter((m) => m != _player.previousMove);
          // sort moves by how effective they can be
          possibleMoves.sort((a,b) => a.computeSuitability(_player,_player.target) - b.computeSuitability(_player,_player.target));
          // only show first three
          possibleMoves = possibleMoves.getRange(0, Math.min(3, possibleMoves.length));
          possibleMoves.forEach((move) {
              playerChoices.add(new Choice(Storyline.getString(move.choiceString, subject:_player, object:_player.target), showNow:true, then:() { _player.currentMove = move; _player.currentMove.start(_player, _player.target); }));
          });
        }
        // let player target someone else
        playerChoices.add(new Choice("Target another enemy.", showNow:true, then:() { _player.target = null; }));
      }

      // TODO: implement moves and check what is to be done. Then start moves in the then: clause.
      if (!playerChoices.isEmpty()) {
        interactionNeeded = true;
        playerChoices.add(new Choice("Do nothing.", showNow:true)); // TODO: this is for debug only..?
      }
    }

    time++;
  }

  void updateUntilInteraction() {
    while (!finished && !interactionNeeded) {
      update();
    }
    interactionNeeded = false;  // reset for next run
  }
}

</classes>

<library>

void start(LoopedEvent event) {
  vars["_curLoopedEvent"] = event;
  vars["_curLoopedEventChoices"] = new List<Choice>();
  event.playerChoices = vars["_curLoopedEventChoices"];
  event.start();
  updateLoopedEvent();
}

void updateLoopedEvent() {
  LoopedEvent event = vars["_curLoopedEvent"];
  if (event.finished)
    return;
  event.playerChoices.clear();
  event.updateUntilInteraction();
  echo(event.storyline.toString());
  event.storyline.clear();
  choices.addAll(event.playerChoices);
  nextScript(updateLoopedEvent);
}

</library>
