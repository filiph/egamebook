
--- 
welcome

# Thin Ice


<dart>
vars["player"] = new Player();
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

Congratulations! You beat your first enemies!

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
  List<String> strings;
  List<Actor> abouts;

  Storyline add(Actor about, String str) {
    abouts.addLast(about);
    strings.addLast(str);
    strBuf = new StringBuffer();
  }

  Storyline() {
    strings = new List<String>();
    abouts = new List<Actor>();
  }

  void clear() {
    strings.clear();
    abouts.clear();
    strBuf.clear();
  }

  String toString() {
    for (int i=0; i < strings.length; i++) {
      if (abouts[i] != null && !abouts[i].isPlayer) {
        if (abouts.length > i+1 && abouts[i] == abouts[i+1]) {
          strBuf.add(capitalize("${abouts[i].randomName} ${strings[i]}${randomly([' and',', then',', and then'])} ${strings[i+1]}. "));
          if (abouts.length > i+2 && abouts[i] == abouts[i+2]) {
            strBuf.add(capitalize("${abouts[i].pronoun} ${string[i]}. "));
            i++;
          }
          i++;
        } else {
          if (i>0 && strings[i] == strings[i-1])
            strBuf.add(randomly([capitalize("${abouts[i].randomName} does the same. "), "Same goes for ${abouts[i].randomName}. "]));
          else
            strBuf.add(capitalize("${abouts[i].randomName} ${strings[i]}. "));
        }
      } else {
        strBuf.add("${strings[i]}. ");
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
  double _stance;  // from 0.0 = lying on the ground to 5.0 = professional combat stance
  List<CombatMove> moves;
  CombatMove currentMove;
  CombatMove previousMove;
  int tillEndOfMove = 0;
  List<Weapon> wieldedWeapons;
  List<Function> modifiers;  // functions to be run on each update (poison, specials)
  Combat combat;
  Actor target;
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

  Actor() : super() {
    // init with defaults
    names = ["actor"];
    pronoun = "he";
    _hitpoints = 3;

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
          combat.storyline.add(this, randomly(["just stands there", "doesn't do anything", "does nothing"]));
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
    combat.storyline.add(this, randomly(['dies','ceases to breathe','perishes']));
  }

  // stats
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
  }
}

class CombatMove extends Entity {
  int duration; // number of turns from start to effect (=hit)
  int recovery; // number of turns it gets to start a new move again

  // modifiers to move's performer
  double dodgingMod;
  double blockingMod;
  double stanceMod;

  Function start;
  Function applyEffects;
  Function computeChance;
  Function computeSeverity;
  Function applicable;

  Function choiceString;

  CombatMove() : super() {
    // init with defaults
    names.add("Hit to the stomach");
    duration = 2;
    recovery = 1;
    dodgingMod = 0.8;
    blockingMod = 0.8;
    stanceMod = 0.8;

    applicable = (Actor attacker, Actor target) {
      return true;
    };

    computeChance = (Actor attacker, Actor target) {
      return 0.6;
    };

    computeSeverity = (Actor attacker, Actor target) {
      return 1;
    };

    start = (Actor attacker, Actor target) {
      if (target.isPlayer)
        attacker.combat.storyline.add(attacker,"tries to hit you on the stomach");
    };

    applyEffects = (Actor attacker, Actor target) {
      if (target.isPlayer)
        attacker.combat.storyline.add(attacker,"hits you to the stomach");
      target.hitpoints -= 1;
    };

    choiceString = (Actor target) {
      return "Hit ${target.randomName} to the stomach.";
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
            playerChoices.add(new Choice("Target ${enemy.randomName}.", showNow:true, then:() { storyline.add(enemy, "is now your target"); _player.target = enemy; }));
        });
      } else {
        // find out possible moves the player can perform on the target
        List<CombatMove> possibleMoves = _player.moves.filter((m) => m.applicable(_player,_player.target));
        if (!possibleMoves.isEmpty()) {
          // only allow to repeat previous move when there is no other option
          if (possibleMoves.length > 1)
            possibleMoves = possibleMoves.filter((m) => m != _player.previousMove);
          // sort moves by how effective they can be
          possibleMoves.sort((a,b) => a.computeSeverity(_player,_player.target) - b.computeSeverity(_player,_player.target));
          // only show first three
          possibleMoves = possibleMoves.getRange(0, Math.min(3, possibleMoves.length));
          possibleMoves.forEach((move) {
              playerChoices.add(new Choice(move.choiceString(_player.target), showNow:true, then:() { _player.currentMove = move; }));
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
