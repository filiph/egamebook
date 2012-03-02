
--- 
welcome

# Thin Ice

You encounter two ominous-looking creatures. One of them is large. It is an orc! And an ugly one at that. The other one is smaller, obviously younger. An orcling. They are bare handed and before you know it, they both attack you!

<dart>

vars["moveLeftHook"] = new CombatMove.Hand();
vars["moveLeftHook"].string = "strike to the face";
vars["moveLeftHook"].choiceString = "strike <object> with <subjectPronoun's> left hook";
vars["moveLeftHook"].thirdPartyString = "strikes <object> with <subjectPronoun's> left hook";
vars["moveLeftHook"].duration = 3;
vars["moveLeftHook"].recovery = 1;
vars["moveLeftHook"].damage = 2;
vars["moveLeftHook"].stanceDamage = 10;
vars["moveLeftHook"].fightingMod = -1;


vars["player"] = new Player();
vars["player"].moves.add(vars["moveLeftHook"]);
vars["player"].moves.add(new CombatMove.Kick());
vars["player"].fighting = 3;
vars["player"].hitpoints = 10;

vars["wolf"] = new Actor();
vars["wolf"].names = ["the orcling", "the orcling", "the young orcling"];
vars["wolf"].pronoun = Storyline.IT;
vars["wolf"].hitpoints = 2;
vars["wolf"].speed = 1;
// vars["wolf"].team = 3;
/*vars["wolf"].modifiers.add((wolf) {
    if (Math.random() < 0.01) {
      wolf.echo("The ${wolf.randomName} spits out blood.");
      wolf.hitpoints -= 1;
    }
});*/
vars["orc"] = new Actor();
vars["orc"].names = ["the orc", "the big orc", "the ugly orc"];
vars["orc"].moves.add(vars["moveLeftHook"]);
vars["orc"].hitpoints = 10;
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


void DEBUG(String str) {
  print(str);
}

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

class Pronoun {
  // see http://en.wikipedia.org/wiki/Latin_declension
  final String nominative; // He (kdo? co?)
  // vocative // not used
  final String accusative; // Him (koho? co?)
  final String genitive;   // His (koho? ceho?)
  // dative // not used
  // ablative
  // locative

  String toString() => nominative;

  const Pronoun(this.nominative, this.accusative, this.genitive); 
}

class Storyline {
  StringBuffer strBuf;
  List<Map<String,Dynamic>> reports;

  static final String SUBJECT = "<subject>";
  static final String SUBJECT_POSSESIVE = "<subject's>";
  static final String OBJECT = "<object>";
  static final String OBJECT_POSSESIVE = "<object's>";
  static final String SUBJECT_PRONOUN = "<subjectPronoun>";
  static final String SUBJECT_PRONOUN_POSSESIVE = "<subjectPronoun's>";
  static final String OBJECT_PRONOUN = "<objectPronoun>";
  static final String OBJECT_PRONOUN_POSSESIVE = "<objectPronoun's>";
  static final String ACTION = "<action>";

  static final Pronoun YOU = const Pronoun("you", "you", "your");
  static final Pronoun HE = const Pronoun("he", "him", "his");
  static final Pronoun SHE = const Pronoun("she", "her", "her");
  static final Pronoun IT = const Pronoun("it", "it", "its");

  Storyline add(String str, [Actor subject, Actor object]) {
    reports.add( {
        "string": str,
        "subject": subject,
        "object": object
        // TODO: store 'positive/negative' so we can decide whether to use "and" or "but"
        // TODO: store 'but' relationships
        // TODO: store 'endSentence' - some sentences can't be naturally stringed
    });
  }

  String string(int i) {
    if (i < 0 || i >= reports.length)
      return null;
    else
      return reports[i]["string"];
  }
  Actor subject(int i) {
    if (i < 0 || i >= reports.length)
      return null;
    else
      return reports[i]["subject"];
  }
  Actor object(int i) {
    if (i < 0 || i >= reports.length)
      return null;
    else
      return reports[i]["object"];
  }

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
  String substitute(int i, String str, [bool useSubjectPronoun=false, bool useObjectPronoun=false]) {
    String result = str.replaceAll(ACTION, string(i));
    if (useObjectPronoun || same('object', i, i-1)) {// if doing something to someone in succession, use pronoun
      result = result.replaceAll(OBJECT, object(i).pronoun.accusative);
      result = result.replaceAll(OBJECT_POSSESIVE, object(i).pronoun.genitive);
    }
    if (useSubjectPronoun) {
      result = result.replaceAll(SUBJECT, subject(i).pronoun.nominative);
      result = result.replaceAll(SUBJECT_POSSESIVE, subject(i).pronoun.genitive);
    }
    // if someone who was object last sentence is now subject (and it's not misleading), use pronoun
    if (object(i-1) != null && subject(i) != null && subject(i-1) != null
        && object(i-1) == subject(i) && subject(i-1).pronoun != subject(i).pronoun) {
      result = result.replaceAll(SUBJECT, subject(i).pronoun.nominative);
      result = result.replaceAll(SUBJECT_POSSESIVE, subject(i).pronoun.genitive);
    }
    // same as previous, but with object-subject reversed
    if (subject(i-1) != null && object(i) != null && subject(i-1) != null
        && subject(i-1) == object(i) && subject(i-1).pronoun != subject(i).pronoun) {
      result = result.replaceAll(OBJECT, object(i).pronoun.accusative);
      result = result.replaceAll(OBJECT_POSSESIVE, object(i).pronoun.genitive);
    }
    return getString(result, subject(i), object(i));
  }

  /// Takes care of substitution
  static String getString(String str, [Actor subject, Actor object]) {
    String result = str;
    if (subject != null) {
      if (subject.isPlayer) { // don't talk like a robot: "player attack wolf"
        result = result.replaceAll(SUBJECT, subject.pronoun.nominative);
        result = result.replaceAll(SUBJECT_POSSESIVE, subject.pronoun.genitive);
      }
      else
        result = result.replaceAll(SUBJECT, subject.randomName);
      result = result.replaceAll(SUBJECT_PRONOUN, subject.pronoun.nominative);
      result = result.replaceAll(SUBJECT_POSSESIVE, "${subject.randomName}'s");
      result = result.replaceAll(SUBJECT_PRONOUN_POSSESIVE, subject.pronoun.genitive);
    }
    if (object != null) {
      if (object.isPlayer) { // don't talk like a robot: "wolf attacks player"
        result = result.replaceAll(OBJECT, object.pronoun.accusative);
        result = result.replaceAll(OBJECT_POSSESIVE, object.pronoun.genitive);
      } else
        result = result.replaceAll(OBJECT, object.randomName);
      result = result.replaceAll(OBJECT_PRONOUN, object.pronoun.accusative);
      result = result.replaceAll(OBJECT_POSSESIVE, "${object.randomName}'s");
      result = result.replaceAll(OBJECT_PRONOUN_POSSESIVE, object.pronoun.genitive);
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
          strBuf.add(capitalize(substitute(i, "<action>, ")));
          strBuf.add(substitute(i+1, "<action>, ", useSubjectPronoun:true));
          strBuf.add(randomly(["","then ","and ", "and finally "]));
          strBuf.add(substitute(i+2, "<action>. ", useSubjectPronoun:true));
          i+=2;
        } else if (same('subject', i, i+1)) {
          strBuf.add(capitalize(substitute(i, "<action>")));
          strBuf.add(randomly([", ",", then "," and "]));
          strBuf.add(substitute(i+1, "<action>. ", useSubjectPronoun:true));
          i++;
        } else if (same('string', i, i-1)) {
          strBuf.add(capitalize(substitute(i, randomly(["<subject> does the same. ", "Same goes for <subject>. "]))));
        } else {
            strBuf.add(capitalize(substitute(i, "<action>. ")));
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
  Pronoun pronoun = Storyline.IT;

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
  // from 0 = lying on the ground to 50 = professional combat stance
  // 0=lying, 10=on_four, 20=almost_falling, 30=shaken, 40=firm_stance, 50=pro_stance
  int _stance;  
  List<String> stanceStrings;
  List<CombatMove> moves;
  static final CombatMove _defaultHandMove = const CombatMove.Hand();
  static final CombatMove _defaultDefense = const CombatMove.Defense();
  CombatMove _currentMove;
  CombatMove previousMove; // keeps track of previous move so that actors don't do the same thing over and over again
  int tillEndOfMove = 0;
  bool recoveringFromMove = false;
  List<Weapon> wieldedWeapons;
  List<Function> modifiers;  // functions to be run on each update (poison, specials)
  Combat combat;
  Actor _target;
  // TODO: limbs?

  // an utility function that prints to the combat's storyline, pre-filling this actor as the subject
  void echo(String str, [Actor subject, Actor object]) {
    if (combat == null)
      return;
    if (subject == null)
      subject = this;
    combat.storyline.add(str, subject:subject, object:object);
  }

  /// returns the fighting ability modified by current move and stance
  int get modifiedFighting() {
    int stanceMod = Math.max((((29 - _stance) / 10) + 1), 0).toInt(); // stance 0-9 => -3, stance 10-19 => -2, 20-29 => -1. Stance 30+ => no mod
    if (currentMove == null)
      return fighting - stanceMod;
    else
      return fighting - stanceMod + currentMove.fightingMod;
  }

  CombatMove get currentMove() => _currentMove;
  void set currentMove(CombatMove value) {
    previousMove = _currentMove;
    if (value == null) {
      tillEndOfMove = _currentMove.recovery; // do not substract speed from recovery - this makes speed too powerful
      if (tillEndOfMove > 0)
        recoveringFromMove = true;
    }
    _currentMove = value;
    if (_currentMove != null)
      tillEndOfMove = _currentMove.duration - (Math.random() * 2).round().toInt(); // speed gives a chance to substract from a move's duration
  }

  int get hitpoints() => _hitpoints;
  void set hitpoints(int value) {
    _hitpoints = Math.min(value, maxHitpoints);
    if (_hitpoints <= 0) {
      die();
    }
    if (_hitpoints == 1)
      if (!isPlayer)
        echo("looks like <subject> doesn't need much more punishment to die");
      else
        echo("you are feeling you can't take any more hits");
  }

  int get stance() => _stance;
  void set stance(int value) {
    if (!alive)
      return;
    int prevStance = _stance;
    _stance = Math.min(value, maxStance);
    // only report when stance is changed between levels
    if ((_stance / 10).toInt() != (prevStance / 10).toInt()) {
      echo(stanceStrings[Math.min(5, (_stance / 10).toInt())]);
    }
  }

  Actor get target() => _target;
  void set target(Actor value) {
    _target = value;
    previousMove = null;
  }

  Actor() : super() {
    // init with defaults
    names = ["actor"];
    pronoun = Storyline.HE;
    _hitpoints = maxHitpoints;
    _stance = maxStance;

    modifiers = new List();
    moves = [new CombatMove.Hand(), new CombatMove.Defense()]; // TODO
    stanceStrings = [
        "<subject> now lies on the ground",
        "<subject> is now on <subjectPronoun's> knees",
        "<subject> is now barely standing",
        "<subject> is shaken",
        "<subject> is standing firmly",
        "<subject> is now in a professional combat stance"
      ];
    // TODO: stanceDownStrings vs stanceUpString (falls to his knees / gets on his knees)
  }

  void update() {
    if (!alive)
      return;

    modifiers.forEach((Function mod) { mod(this); });

    if (!alive) // make sure actor doesn't move after being poisoned to death, for example
      return;

    tillEndOfMove--; // just let the time pass

    if (tillEndOfMove > 0) {
      if (target != null && !target.alive) { // stop attack if actor already dead 
        currentMove = null;
        target = null;
      }
    } else {
      // effect of finished move
      if (currentMove != null) {
        if (currentMove.applicable(this, target)) {
          // resolve is target dodged the attack. Difference between fighting skills
          // means extra tries (throws) for the party that has the higher number
          double chance = currentMove.chanceToDodge(this, target);
          int throws = 1 + (this.fighting - target.modifiedFighting).abs();
          DEBUG("CHANCE: move=${currentMove.string} target=${target.names[0]} chance=$chance, throws=$throws attacker=$fighting defender=${target.modifiedFighting}");
          bool targetDodged;
          while (throws > 0) {
            targetDodged = Math.random() < chance;
            DEBUG("- targetDodged: $targetDodged");
            if (targetDodged && (target.modifiedFighting >= this.fighting))
              break;  // if target is more skillfull than attacker and he dodged once, this is it
            if (!targetDodged && (this.fighting >= target.modifiedFighting))
              break;  // similar here
            throws--;
          }
          if (targetDodged) {
            currentMove.applyDodge(this, target);
          } else {
            // same as above, but for blocks
            chance = currentMove.chanceToBlock(this, target);
            throws = 1 + (this.fighting - target.modifiedFighting).abs();
            bool targetBlocked;
            while (throws > 0) {
              targetBlocked = Math.random() < chance;
              if (targetBlocked && (target.modifiedFighting >= this.fighting))
                break;
              if (!targetBlocked && (this.fighting >= target.modifiedFighting))
                break;
              throws--;
            }
            if (targetBlocked) {
              currentMove.applyBlock(this, target);
            } else {
              currentMove.applyHit(this, target);
            }
          }
        }
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
          echo('<subject> ${randomly(["just stands there", "doesn\'t do anything", "does nothing"])}');
        } else {
          // TODO: choice
          currentMove = randomly(moves.filter((m) => m.applicable(this,target)));
          currentMove.start(this, target);
        }
      }
    }
  }

  void die() {
    alive = false;
    if (!isPlayer)
      echo("<subject> ${randomly(['passes out','loses consciousness','blacks out','goes down'])}");
    else
      echo("you lose consciousness");
  }

  // stats
  int maxHitpoints = 5;
  int maxStance = 40; // the best stance this actor can muster
  int speed = 0; // 0 = normal person, -x = everything takes x seconds longer, +x = dtto shorter
  int fighting = 0; // 1 = normal person, +x = number of extra block/dodge throws per turn
  int armor = 0; // 0 = person in clothes, +x takes points from damage taken
}

class Player extends Actor {
  Player() : super() {
    isPlayer = true;
    team = 1; // player is on team Player (1)
    names = ["player"];
    pronoun = Storyline.YOU;
  }
}

class CombatMove extends Entity {
  /// the basic description of the move
  String string;
  /// the string to be presented as a choice to the player
  /// e.g.: "hit <object> to the stomach"
  String choiceString;
  /// e.g.: "hits <object> in the stomach"
  String thirdPartyString;

  int duration; // number of turns from start to effect (=hit)
  int recovery; // number of turns it gets to start a new move again
  int damage;
  int stanceDamage;
  double baseChanceToDodge;
  double baseChanceToBlock;

  // modifiers to move's performer. Many moves will make it temporarily harder to block and dodge
  // defense moves will make it easier (positive number)
  int fightingMod;

  Function start; // reports on start of the move
  Function applyHit; // applies and report on success
  Function applyBlock; // applies and report on block
  Function applyDodge; // applies and report on dodge
  Function chanceToDodge; // returns chance (0.0-1.0) of dodging this move
  Function chanceToBlock; // returns chance (0.0-1.0) of blocking this move
  /// used to sort moves by immediate suitability. The top choices should be
  /// a good combination of low-risk, low-impact, and high-risk, high-impact moves
  Function computeSuitability; // TODO: move this into actor AI? needs the context
  Function applicable; // returns bool, whether this move is applicable given the two actors

  // TODO: see http://en.wikipedia.org/wiki/Punch_(combat) for inspiration
  // http://www.eazycheezy.net/2010/04/how-to-throw-a-punch-by-guest-author-the-wolf.html
  CombatMove.Hand() : super() {
    // init with defaults
    string = "hit to the stomach";
    choiceString = "hit <object> to the stomach";
    thirdPartyString = "hits <object> to the stomach";
    duration = 2;
    recovery = 1;
    damage = 1;
    stanceDamage = 2;
    baseChanceToDodge = 0.1;
    baseChanceToBlock = 0.3;
    fightingMod = 0;

    applicable = (Actor attacker, Actor target) {
      if (!attacker.alive || !target.alive)
        return false;
      return true; // TODO
    };

    chanceToDodge = (Actor attacker, Actor target) {
      return baseChanceToDodge; // TODO
    };

    chanceToBlock = (Actor attacker, Actor target) {
      return baseChanceToBlock;
    };

    computeSuitability = (Actor attacker, Actor target) {
      return chanceToDodge(attacker, target) * chanceToDodge(attacker, target); // TODO
    };

    start = (Actor attacker, Actor target) {
      if (target.isPlayer) {
        attacker.echo("<subject> winds up to $choiceString", object:target);
      } else if (attacker.isPlayer) {
        attacker.echo("you decide to $choiceString", object:target);
      }
    };

    applyHit = (Actor attacker, Actor target) {
      if (!attacker.isPlayer)
        attacker.echo("<subject> $thirdPartyString", object:target);
      else
        attacker.echo("<subject> $choiceString", object:target);
      target.hitpoints -= damage - target.armor;
      target.stance -= stanceDamage;
    };

    applyBlock = (Actor attacker, Actor target) {
      if (target.isPlayer)
        target.echo("<subject> block <object's> $string", object:attacker);
      else
        target.echo("<subject> blocks <object's> $string", object:attacker);
      target.stance -= (stanceDamage / 2).toInt();
    };

    applyDodge = (Actor attacker, Actor target) {
      if (target.isPlayer)
        target.echo("<subject> dodge <object's> $string", object:attacker);
      else
        target.echo("<subject> dodges <object's> $string", object:attacker);
    };
  }
  // TODO Ctors for types of moves: CombatMove.Hand(), CombatMove.Kick(), CombatMove.Sword() etc.

  CombatMove.Kick() : super() {
    // init with defaults
    string = "kick to the legs";
    choiceString = "kick <object's> legs";
    thirdPartyString = "kicks <object's> legs";
    duration = 3;
    recovery = 2;
    damage = 1;
    stanceDamage = 10;
    baseChanceToDodge = 0.2;
    baseChanceToBlock = 0.2;
    fightingMod = -1;

    applicable = (Actor attacker, Actor target) {
      if (!attacker.alive || !target.alive)
        return false;
      if (attacker.stance < 30 || target.stance < 20)
        return false;
      return true; // TODO
    };

    chanceToDodge = (Actor attacker, Actor target) {
      return baseChanceToDodge; // TODO
    };

    chanceToBlock = (Actor attacker, Actor target) {
      return baseChanceToBlock;
    };

    computeSuitability = (Actor attacker, Actor target) {
      return chanceToDodge(attacker, target) * chanceToDodge(attacker, target); // TODO
    };

    start = (Actor attacker, Actor target) {
      if (target.isPlayer) {
        attacker.echo("<subject> winds up to $choiceString", object:target);
      } else if (attacker.isPlayer) {
        attacker.echo("you decide to $choiceString", object:target);
      }
    };

    applyHit = (Actor attacker, Actor target) {
      if (!attacker.isPlayer)
        attacker.echo("<subject> $thirdPartyString", object:target);
      else
        attacker.echo("<subject> $choiceString", object:target);
      target.hitpoints -= damage - target.armor;
      target.stance -= stanceDamage;
    };

    applyBlock = (Actor attacker, Actor target) {
      if (target.isPlayer)
        target.echo("<subject> block <object's> $string", object:attacker);
      else
        target.echo("<subject> blocks <object's> $string", object:attacker);
      target.stance -= (stanceDamage / 2).toInt();
    };

    applyDodge = (Actor attacker, Actor target) {
      if (target.isPlayer)
        target.echo("<subject> dodge <object's> $string", object:attacker);
      else
        target.echo("<subject> dodges <object's> $string", object:attacker);
    };
  }

  CombatMove.Defense() : super () {
    // init with defaults
    string = "parry";
    choiceString = "parry <object's> move";
    thirdPartyString = "parries <object's> move";
    duration = 2;
    recovery = 0;
    damage = 0;
    stanceDamage = 0;
    baseChanceToDodge = 1.0;
    baseChanceToBlock = 1.0;
    fightingMod = +3;

    applicable = (Actor attacker, Actor target) {
      //DEBUG("DEFENSE applicable? ATT: ${attacker.names[0]}, TAR: ${target.names[0]}");
      if (!attacker.alive || !target.alive)
        return false;
      //DEBUG("DEFENSE both alive");
      if (target.target != attacker)
        return false; // don't parry attacks that don't target you
      //DEBUG("DEFENSE is target of the other guy");
      //DEBUG("DEFENSE target's move = ${target.currentMove.string}");
      if (target.currentMove == null || target.currentMove.damage == 0)
        return false; // don't parry no attack and don't parry someone parrying you
      //DEBUG("DEFENSE applicable, yes.");
      return true; 
    };

    chanceToDodge = (Actor attacker, Actor target) {
      return baseChanceToDodge;
    };

    chanceToBlock = (Actor attacker, Actor target) {
      return baseChanceToBlock;
    };

    computeSuitability = (Actor attacker, Actor target) {
      return 1.0; // TODO
    };

    start = (Actor attacker, Actor target) {
      if (target.isPlayer) {
        attacker.echo("<subject> braces for <object's> blow", object:target);
      } else if (attacker.isPlayer) {
        attacker.echo("you decide to brace for <object's> blow", object:target);
      }
      // wait for the blow
      attacker.tillEndOfMove = target.tillEndOfMove + 1;
    };

    applyHit = (Actor attacker, Actor target) { };

    applyBlock = (Actor attacker, Actor target) { };

    applyDodge = (Actor attacker, Actor target) { };
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

  Function specialUpdate; // allows defining novel combat situations (moving train, random events, spawning enemies...)

  int time = 0;

  void start() {
    actors.forEach((a) { 
        a.combat = this; 
        if (a.isPlayer)
          _player = a;
    });
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
    if (specialUpdate != null)
      specialUpdate();

    actors.forEach((actor) {
      actor.update();
    });

    // make sure the fight still needs to continue
    if (!actors.some((a) => a.alive && actors.some((b) => b.alive && b.team != a.team))) {
      finished = true;
      return;
    }

    if (_player != null && _player.alive && _player.tillEndOfMove <= 0) { // TODO: check if there is stuff to be done by player
      if (_player.target == null) {
        // let player choose his target
        List<Actor> possibleEnemies = actors.filter((o) => o.team != _player.team && o.alive);
        possibleEnemies.forEach((enemy) {
            playerChoices.add(new Choice("Target ${enemy.randomName}.", showNow:true, then:() { storyline.add("<subject> now lock on to <object>", subject:_player, object:enemy); _player.target = enemy; }));
        });
      } else {
        // find out possible moves the player can perform on the target
        List<CombatMove> possibleMoves = _player.moves.filter((m) => m.applicable(_player,_player.target));
        if (!possibleMoves.isEmpty()) {
          // only allow to repeat previous move when there is no other option
          if (possibleMoves.length > 1)
            possibleMoves = possibleMoves.filter((m) => m != _player.previousMove);
          // sort moves by how effective they can be TODO: pick at least one of each strategies (big hit, quick hit, stance hit, defense
          possibleMoves.sort((a,b) => a.computeSuitability(_player,_player.target) - b.computeSuitability(_player,_player.target));
          // only show first three
          possibleMoves = possibleMoves.getRange(0, Math.min(3, possibleMoves.length));
          possibleMoves.forEach((move) {
              playerChoices.add(new Choice(capitalize(Storyline.getString(move.choiceString, subject:_player, object:_player.target)), showNow:true, then:() { _player.currentMove = move; _player.currentMove.start(_player, _player.target); }));
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
