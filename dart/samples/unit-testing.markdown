
--- 
welcome

# Thin Ice

You encounter two ominous-looking creatures. One of them is large. It is an orc! And an ugly one at that. The other one is smaller, obviously younger. An orcling. They are bare handed and before you know it, they both attack you!

<dart>

vars["moveStomach"] = new CombatMove.Hand();
vars["moveKick"] = new CombatMove.Kick();
vars["moveLeftHook"] = new CombatMove.Haymaker();
vars["moveRightHook"] = new CombatMove.Haymaker();
vars["moveRightHook"].string = "right hook";
vars["moveDefense"] = new CombatMove.Defense();
vars["moveStandUp"] = new CombatMove.StandUp();
vars["moveWithdraw"] = new CombatMove.Withdraw();

vars["humanMoves"] = [
    vars["moveStomach"],
    vars["moveKick"],
    vars["moveDefense"],
    vars["moveLeftHook"],
    vars["moveRightHook"],
    vars["moveWithdraw"],
    vars["moveStandUp"]
];

vars["player"] = new Player();
vars["player"].moves.addAll(vars["humanMoves"]);
vars["player"].fighting = 1;

vars["wolf"] = new Actor();
vars["wolf"].names = ["the orcling", "the orcling", "the young orcling"];
vars["wolf"].pronoun = Storyline.IT;
vars["wolf"].moves.addAll(vars["humanMoves"]);
vars["wolf"].hitpoints = 2;
vars["wolf"].speed = 1;

vars["orc"] = new Actor();
vars["orc"].names = ["the orc", "the big orc", "the ugly orc"];
vars["orc"].moves.addAll(vars["humanMoves"]);
/*vars["orc"].modifiers.add((orc) {
    if (Math.random() < 0.01) {
      orc.echo("The ${orc.randomName} grunts in pain from the poisoning.");
      orc.hitpoints -= 1;
    }
});*/
vars["combat"] = new Combat();
vars["combat"].actors.addAll([v_wolf, vars["orc"],vars["player"]]);
vars["combat"].specialUpdate = (combat) {
  //if ((combat.time % 10) == 5)
  //  combat.storyline.add("a lonely bird beeps in the distance");
};
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

// from http://en.wikipedia.org/wiki/Hamming_weight
int countBits(int x) {
  int count;
  for (count=0; x > 0; count++)
      x &= x - 1;
  return count;
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
  static final String VERB_S = "<s>";
  static final String VERB_ES = "<es>"; // e.g. in "goes"
  static final String VERB_IES = "<ies>"; // e.g. in "tries", "flies"
  static final String VERB_DO = "<does>";
  static final String VERB_BE = "<is>";

  static final Pronoun YOU = const Pronoun("you", "you", "your");
  static final Pronoun HE = const Pronoun("he", "him", "his");
  static final Pronoun SHE = const Pronoun("she", "her", "her");
  static final Pronoun IT = const Pronoun("it", "it", "its");

  Storyline add(String str, [Actor subject, Actor object, bool but=false, bool positive=false, bool negative=false, bool endSentence=false, bool startSentence=false, bool wholeSentence=false]) {
    reports.add( {
        "string": str,
        "subject": subject,
        "object": object,
        "but": but,
        "positive": positive,
        "negative": negative,
        "endSentence": endSentence,
        "startSentence": startSentence,
        "wholeSentence": wholeSentence
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
    if (!valid(i) || !valid(j))
      return false;
    if (reports[i][key] == null || reports[j][key] == null)
      return false;
    if (reports[i][key] == reports[j][key])
      return true;
    else
      return false;
  }

  bool valid(int i) {
    if (i >= reports.length || i < 0)
      return false;
    else
      return true;
  }

  bool sameSentiment(int i, int j) {
    if (!valid(i) || !valid(j))
      return false;
    if (!same('subject', i, j))
      return false;
    if (reports[i]["positive"] && reports[j]["positive"])
      return true;
    if (reports[i]["negative"] && reports[j]["negative"])
      return true;
  }

  bool oppositeSentiment(int i, int j) {
    if (!valid(i) || !valid(j))
      return false;
    if (!same('subject', i, j))
      return false;
    if (reports[i]["positive"] && reports[j]["negative"])
      return true;
    if (reports[i]["negative"] && reports[j]["positive"])
      return true;
  }

  /// makes sure the sentence flows well with the previous sentence(s), then calls getString to do the rest
  String substitute(int i, String str, [bool useSubjectPronoun=false, bool useObjectPronoun=false]) {
    String result = str.replaceAll(ACTION, string(i));
    if (useObjectPronoun || same('object', i, i-1)) {// if doing something to someone in succession, use pronoun
      result = result.replaceAll(OBJECT, object(i).pronoun.accusative);
      result = result.replaceAll(OBJECT_POSSESIVE, object(i).pronoun.genitive);
    }
    if (useSubjectPronoun || same('subject', i, i-1)) {
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

  /// Takes care of substitution of stopwords
  static String getString(String str, [Actor subject, Actor object]) {
    String result = str;
    if (subject != null) {
      if (subject.isPlayer) { // don't talk like a robot: "player attack wolf", TODO: Storyline.YOU instead?
        result = result.replaceAll(SUBJECT, subject.pronoun.nominative);
        result = result.replaceAll(SUBJECT_POSSESIVE, subject.pronoun.genitive);
        result = result.replaceAll(VERB_S, "");
        result = result.replaceAll(VERB_ES, "");
        result = result.replaceAll(VERB_IES, "y");
        result = result.replaceAll(VERB_DO, "do");
        result = result.replaceAll(VERB_BE, "are");
      }
      else { // third person
        result = result.replaceAll(SUBJECT, subject.randomName);
        result = result.replaceAll(VERB_S, "s");
        result = result.replaceAll(VERB_ES, "es");
        result = result.replaceAll(VERB_IES, "ies");
        result = result.replaceAll(VERB_DO, "does");
        result = result.replaceAll(VERB_BE, "is");
      }
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

  /// The main function that strings reports together into a coherent story.
  String toString() {
    final int length = reports.length;
    if (length < 1)
      return "";
    final int MAX_SENTENCE_LENGTH = 3;
    int lastEndSentence = -1;
    bool endSentence = true; // previous sentence was ended
    bool endSentenceNeeded = false; // this sentence needs to be ended
    bool but = false; // this next sentence needs to start with but
    for (int i=0; i < length; i++) {
      // TODO: look into future - make sentences like "Although __, __"
      if (i != 0) {
        // solve flow with previous sentence
        bool objectSubjectSwitch = 
                 reports[i-1]["subject"] == reports[i]["object"]
              && reports[i-1]["object"] == reports[i]["subject"];
        but = reports[i]["but"] || oppositeSentiment(i, i-1);
        endSentence = 
          (i - lastEndSentence >= MAX_SENTENCE_LENGTH) 
          || endSentenceNeeded
          || reports[i]["startSentence"] 
          || reports[i-1]["endSentence"] 
          || reports[i]["wholeSentence"]
          || !(same('subject', i, i-1) || objectSubjectSwitch)
          || (but && (i - lastEndSentence > 1));
        endSentenceNeeded = false;

        // DEBUG("SENT: ${string(i)}\n- whole=${reports[i]["endSentence"]}
        if (endSentence) {
          if (reports[i-1]["wholeSentence"]) // don't write period after "Boom!"
            strBuf.add(" ");
          else
            strBuf.add(". ");
          if (but && !reports[i]["wholeSentence"])
            strBuf.add(randomly(["But ", "But ", "However, ", "Nonetheless, ", "Nevertheless, "]));
        } else { // let's try and glue [i-1] and [i] into one sentence
          if (but) {
            strBuf.add(randomly([" but ", " but ", " yet ", ", but "]));
            if (!sameSentiment(i, i+1))
              endSentenceNeeded = true;
          } else {
            if (same('subject', i, i-1) && string(i).startsWith("$SUBJECT ")
                && i < length - 1  && i - lastEndSentence < MAX_SENTENCE_LENGTH - 1) {
              strBuf.add(", ");
            } else {
              strBuf.add(randomly([" and ", " and ", ", and "]));
              endSentenceNeeded = true;
            }
          }
        }
      }

      String report = string(i);
      // clear subjects when e.g. "Wolf hits you, it growls, it strikes again."
      if (!endSentence)
        if (same('subject', i, i-1))
          if (string(i-1).startsWith("$SUBJECT "))
            if (report.startsWith("$SUBJECT "))
              report = report.replaceFirst("$SUBJECT ", "");

      report = substitute(i, report);

      if ((endSentence || i == 0) && !but)
        report = capitalize(report);

      // add the actual report
      strBuf.add(report);

      // set variables for next iteration
      if (endSentence)
        lastEndSentence = i;
      if (reports[i]["wholeSentence"])
        endSentenceNeeded = true;
    }

    // add last dot
    if (!reports[length-1]["wholeSentence"])
      strBuf.add(".");

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
  List<String> stanceUpStrings;
  List<String> stanceDownStrings;
  List<CombatMove> moves;
  CombatMove _currentMove;
  CombatMove previousMove; // keeps track of previous move so that actors don't do the same thing over and over again
  int tillEndOfMove = 0;
  bool recoveringFromMove = false;
  List<Weapon> wieldedWeapons;
  List<Function> modifiers;  // functions to be run on each update (poison, specials)
  Combat combat;
  Actor _target;

  // an utility function that prints to the combat's storyline, pre-filling this actor as the subject
  void echo(String str, [Actor subject, Actor object, bool but=false, bool positive=false, bool negative=false, bool endSentence=false, bool startSentence=false, bool wholeSentence=false]) {
    if (combat == null)
      return;
    if (subject == null)
      subject = this;
    combat.storyline.add(str, subject:subject, object:object, but:but, positive:positive, negative:negative, endSentence:endSentence, startSentence:startSentence, wholeSentence:wholeSentence);
  }

  /// returns the fighting ability modified by current move and stance
  int get modifiedFighting() {
    int stanceMod = Math.max((((29 - _stance) / 10) + 1), 0).toInt(); // stance 0-9 => -3, stance 10-19 => -2, 20-29 => -1. Stance 30+ => no mod
    int hitpointsMod = Math.max(0, (((maxHitpoints - _hitpoints)/maxHitpoints - 0.7) * 10)).toInt(); // if hitpoint are below 20% of maxHitpoint => -1, below 10% => -2
    if (currentMove == null)
      return fighting - stanceMod - hitpointsMod;
    else
      return fighting - stanceMod - hitpointsMod + currentMove.fightingMod;
  }

  CombatMove get currentMove() => _currentMove;
  void set currentMove(CombatMove value) {
    if (_currentMove != null)
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
    if (value < _hitpoints && value == 1)
      echo("<subject> looks like hell", negative:true);
    else if (_hitpoints > 3 && (value == 2 || value == 3))
      echo("<subject> <is> badly hurt", negative:true);
    _hitpoints = Math.min(value, maxHitpoints);
    if (_hitpoints <= 0) {
      die();
    }
  }

  int get stance() => _stance;
  void set stance(int value) {
    if (!alive)
      return;
    int prevStance = _stance;
    _stance = Math.min(value, maxStance);
    // only report when stance is changed between levels
    if ((_stance / 10).toInt() != (prevStance / 10).toInt()) {
      if (_stance > prevStance)
        echo(stanceUpStrings[Math.min(5, (_stance / 10).toInt())], positive:true);
      else {
        echo(stanceDownStrings[Math.min(5, (_stance / 10).toInt())], negative:true);
        if (prevStance - _stance > 10 && _stance < 10) // damage from fall
          hitpoints -= 1;
      }
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
    moves = new List();
    stanceUpStrings = const [
        "",  // no need for this string - nowhere to stand up from
        "<subject> get<s> to <subjectPronoun's> knees",
        "<subject> stand<s> up",
        "<subject> regain<s> some balance",
        "<subject's> stance gets firm",
        "<subject> go<es> into a perfect combat stance" 
    ];
    stanceDownStrings = const [
        "<subject> fall<s> to the ground",
        "<subject> fall<s> to <subjectPronoun's> knees",
        "<subject> <is> almost ready to fall",
        "<subject> get<s> off balance",
        "<subject> lose<s> <subjectPronoun's> professional stance",
        "" // no need for this string (yet?) - nowhere to fall from
    ];
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
      } else if (currentMove != null && currentMove.update != null) {
        if (currentMove.applicable(this, target, alreadyRunning:true))
          currentMove.update(this, target);
        else { // cancel move if it's no longer applicable
          currentMove.applyCancel(this, target);
          currentMove = null;
        }
      }
    } else {
      // effect of finished move
      if (currentMove != null) {
        if (currentMove.applicable(this, target, alreadyRunning:true)) {
          if (currentMove.offensive) {
            // resolve if target dodged the attack. Difference between fighting skills
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
          } else { // non-offensive move ended
            currentMove.applyEnd(this, target);
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
          currentMove = chooseMove();
          currentMove.start(this, target);
        }
      }
    }
  }

  // List moves
  List<CombatMove> getPossibleMoves([int max=1000]) {
    List<CombatMove> possibleMoves = moves.filter((m) => m.applicable(this,target));
    if (possibleMoves.length < 2)
      return possibleMoves;

    // first, sort by suitability (computeSuitability contains logic against repeating last move)
    possibleMoves.sort((a,b) => b.computeSuitability(this,target) - a.computeSuitability(this,target));
    // next, bring down moves that are already mostly covered by moves above them
    // bring down moves that have large countBits(type & previous.type) / countBits(type) (100% => same type of move)
    final double MAX_SIMILARITY = 0.70;
    DEBUG("PosMoves: $randomName");
    Map<int,CombatMove> redundantMovesMap = new Map<int,CombatMove>();
    for (int i=1; i < possibleMoves.length; i++) {
      DEBUG("- ${possibleMoves[i].string}");
      for (int j=0; j < i; j++) {
        double similarity = countBits(possibleMoves[i].type & possibleMoves[j].type) / countBits(possibleMoves[i].type);
        DEBUG("  - is ${(similarity*100).toInt()} similar to ${possibleMoves[j].string}");
        if (similarity > MAX_SIMILARITY) {
          DEBUG("PosMoves: $randomName - ${possibleMoves[i].string} is similar to ${possibleMoves[j].string}");
          redundantMovesMap[i] = possibleMoves[i];
          break;
        }
      }
    }
    // move redundant moves at the end of the list
    List<CombatMove> finalMoves = new List<CombatMove>(possibleMoves.length);
    int regularIndex = 0; int redundantIndex = possibleMoves.length - redundantMovesMap.length;
    for (int i = 0; i < possibleMoves.length; i++) {
      if (!redundantMovesMap.containsKey(i)) {
        finalMoves[regularIndex] = possibleMoves[i];
        regularIndex++;
      } else {
        finalMoves[redundantIndex] = possibleMoves[i];
        redundantIndex++;
      }
    }

    finalMoves.forEach((m) {
        DEBUG("${m}");
        });

    return finalMoves.getRange(0, Math.min(finalMoves.length, max)); // return up to max moves
  }

  // AI chooses a move
  CombatMove chooseMove([int max=1000]) {
    List<CombatMove> possibleMoves = getPossibleMoves(max:max);

    // logic that gives more chance to higher (more suitable) moves
    double random = Math.random();
    int pos;
    int len = possibleMoves.length; 
    int allParts = (len*(len+1)/2).toInt(); // 1+2+3+4+.. = allParts
    double part = 0.0;

    for (pos = 0; pos < len; pos++) {
      part += len - pos;
      if (random < part / allParts)
        break;
    }

    return possibleMoves[pos];
  }

  void die() {
    alive = false;
    echo("<subject> ${randomly(['pass<es> out','lose<s> consciousness','black<s> out','go<es> down'])}", negative:true);
  }

  // stats
  int maxHitpoints = 10;
  int maxStance = 45; // the best stance this actor can muster
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
  bool offensive = true; // offensive moves need a target, non-offensive are e.g. standing up
  int damage = 0;
  int stanceDamage = 0;
  double baseChanceToDodge = 1.0;
  double baseChanceToBlock = 1.0;

  // modifiers to move's performer. Many moves will make it temporarily harder to block and dodge
  // defense moves will make it easier (positive number)
  int fightingMod = 0;

  int type = 0x0;

  static final int MOVE_TRG_HEAD = 1<<1;
  static final int MOVE_TRG_BODY = 1<<2;
  static final int MOVE_TRG_WAIST = 1<<3;
  static final int MOVE_TRG_LEGS = 1<<4;
  static final int MOVE_FRM_FRONT = 1<<5;
  static final int MOVE_FRM_LEFT = 1<<6;
  static final int MOVE_FRM_RIGHT = 1<<7;
  static final int MOVE_LMB_HAND = 1<<8;
  static final int MOVE_LMB_LEG = 1<<9;
  static final int MOVE_LMB_HEAD = 1<<10;
  static final int MOVE_EFF_HITPOINTS = 1<<11;
  static final int MOVE_EFF_STANCE = 1<<12;
  static final int MOVE_PRI_QUICK = 1<<13;
  static final int MOVE_PRI_DAMAGE = 1<<14;
  static final int MOVE_DIR_OFFENSIVE = 1<<15;
  static final int MOVE_DIR_DEFENSIVE = 1<<16;



  /// returns bool, whether this move is applicable given the two actors
  Function applicable;

  /// reports on start of the move
  Function start;

  /// gets called every turn
  Function update;

  /// end of non-offensive move
  Function applyEnd;

  /// applies and report on success
  Function applyHit;

  /// applies and report on block
  Function applyBlock;

  /// applies and report on dodge
  Function applyDodge;
 
  /// applies and reports on a cancelled move
  Function applyCancel;
 
  /// returns chance (0.0-1.0) of dodging this move
  Function chanceToDodge;

  /// returns chance (0.0-1.0) of blocking this move
  Function chanceToBlock;

  /// used to sort moves by immediate suitability. The top choices should be
  /// a good combination of low-risk, low-impact, and high-risk, high-impact moves
  Function computeSuitability;



  // Default functions

  // alreadyRunning says whether the move has already been started. There might be different rules (you can only start standing up when not standing, but you can surely continue afterwards).
  static bool defaultApplicable (CombatMove move, Actor performer, Actor target, [bool alreadyRunning=false]) {
    return target.alive; // only perform moves when target is alive (by default)
  }

  static void defaultStart (CombatMove move, Actor performer, Actor target) {
    String again = (performer.previousMove == move) ? " again" : "";
    if (!performer.isPlayer) {
      performer.echo("<subject> wind<s> up to ${move.choiceString}$again", endSentence:true, object:target);
    } else {
      performer.echo("you decide to ${move.choiceString}$again", endSentence:true, object:target);
    }
  }

  static void defaultUpdate (CombatMove move, Actor performer, Actor target) {
  }

  static void defaultApplyEnd (CombatMove move, Actor performer, Actor target) {
  }

  static void defaultApplyHit (CombatMove move, Actor performer, Actor target, [String hitString="<subject> hit<s> <object>"]) {
    performer.echo(hitString, object:target, positive:true);
    int actualDamage = Math.max(0, move.damage - target.armor);
    target.hitpoints -= actualDamage;
    if (actualDamage == 0 && move.damage != 0)
      performer.echo("it doesn't hurt <object>", object:target, but:true);
    target.stance -= move.stanceDamage;
    if (target.currentMove != null && !target.currentMove.offensive)
      target.currentMove = null;
  }

  static void defaultApplyBlock (CombatMove move, Actor performer, Actor target) {
    target.echo("<subject> block<s> <object's> ${move.string}", object:performer, positive:true);
    int actualStanceDamage = Math.max(
        0, 
        (move.stanceDamage / 2).toInt() - target.fighting
    );
    if (actualStanceDamage > 0) {
      target.echo("the blow was hard", negative:true);
      target.stance -= actualStanceDamage;
    }
    if (target.currentMove != null && !target.currentMove.offensive)
      target.currentMove = null;
  }

  static void defaultApplyDodge (CombatMove move, Actor performer, Actor target) {
    target.echo("<subject> dodge<s> <object's> ${move.string}", object:performer, positive:true);
    if (target.currentMove != null && !target.currentMove.offensive)
      target.currentMove = null;
  }

  static void defaultApplyCancel (CombatMove move, Actor performer, Actor target) {
    performer.echo("there's no way <subject> can ${move.choiceString} now", object:target, negative:true);
  }

  static double defaultChanceToDodge (CombatMove move, Actor performer, Actor target) {
    return move.baseChanceToDodge; 
  }

  static double defaultChanceToBlock (CombatMove move, Actor performer, Actor target) {
    return move.baseChanceToBlock; 
  }

  static int defaultComputeSuitability (CombatMove move, Actor performer, Actor target) {
    if (move.offensive) {
      int value = move.damage + (move.stanceDamage / 5).toInt();
      value += ((1 - move.chanceToDodge(performer, target)) * (1 - move.chanceToBlock(performer, target)) * 10).toInt();
      if (performer.previousMove != null) // similar moves as the last one get minus points
        value -= countBits(move.type & performer.previousMove.type);
      return value;
    } else {
      return move.fightingMod;
    }
  }

  void initDefaultFunctions() { //TODO is there a more elegant way? a default super-constructor?
    applicable = (Actor performer, Actor target, [bool alreadyRunning=false]) {
      return defaultApplicable(this, performer, target, alreadyRunning:alreadyRunning);
    };

    start = (Actor performer, Actor target) {
      defaultStart(this, performer, target);
    };

    update = (Actor performer, Actor target) {
      defaultUpdate(this, performer, target);
    };

    applyEnd = (Actor performer, Actor target) {
      defaultApplyEnd(this, performer, target);
    };

    applyHit = (Actor performer, Actor target) {
      defaultApplyHit(this, performer, target);
    };

    applyBlock = (Actor performer, Actor target) {
      defaultApplyBlock(this, performer, target);
    };

    applyDodge = (Actor performer, Actor target) {
      defaultApplyDodge(this, performer, target);
    };

    applyCancel = (Actor performer, Actor target) {
      defaultApplyCancel(this, performer, target);
    };
   
    chanceToDodge = (Actor performer, Actor target) {
      return defaultChanceToDodge(this, performer, target);
    };

    chanceToBlock = (Actor performer, Actor target) {
      return defaultChanceToBlock(this, performer, target);
    };

    computeSuitability = (Actor performer, Actor target) {
      return defaultComputeSuitability(this, performer, target);
    };
  }

  // TODO: see http://en.wikipedia.org/wiki/Punch_(combat) for inspiration
  // http://www.eazycheezy.net/2010/04/how-to-throw-a-punch-by-guest-author-the-wolf.html
  CombatMove.Hand() : super() {
    // init with defaults
    initDefaultFunctions();

    type = MOVE_TRG_BODY|MOVE_FRM_RIGHT|MOVE_LMB_HAND|MOVE_EFF_HITPOINTS|MOVE_PRI_QUICK|MOVE_DIR_OFFENSIVE;
    string = "hit to the stomach";
    choiceString = "hit <object> to the stomach";
    thirdPartyString = "hits <object> to the stomach";
    duration = 4;
    recovery = 1;
    damage = 1;
    stanceDamage = 2;
    baseChanceToDodge = 0.1;
    baseChanceToBlock = 0.3;

    applicable = (Actor performer, Actor target, [bool alreadyRunning=false]) {
      if (performer.stance < 10)
        return false;
      return defaultApplicable(this, performer, target, alreadyRunning:alreadyRunning);
    };
  }

  CombatMove.Haymaker() : super() {
    // init with defaults
    initDefaultFunctions();

    type = MOVE_TRG_HEAD|MOVE_FRM_RIGHT|MOVE_LMB_HAND|MOVE_EFF_HITPOINTS|MOVE_PRI_DAMAGE|MOVE_DIR_OFFENSIVE;
    string = "strike to the face";
    choiceString = "strike <object> with <subjectPronoun's> left hook";
    thirdPartyString = "strikes <object> with <subjectPronoun's> left hook";
    duration = 6;
    recovery = 1;
    damage = 2;
    stanceDamage = 8;
    baseChanceToDodge = 0.2;
    baseChanceToBlock = 0.2;
    fightingMod = -1;

    applicable = (Actor performer, Actor target, [bool alreadyRunning=false]) {
      if (performer.stance < 20)
        return false;
      if (target.stance < 10)
        return false;
      return defaultApplicable(this, performer, target, alreadyRunning:alreadyRunning);
    };

    applyHit = (Actor performer, Actor target) {
      performer.echo("Boom!", wholeSentence:true, positive:true);
      defaultApplyHit(this, performer, target, hitString:"<subject> hit<s> <object> in the face");
    };
  }

  CombatMove.Kick() : super() {
    // init with defaults
    initDefaultFunctions();

    type = MOVE_TRG_LEGS|MOVE_FRM_RIGHT|MOVE_LMB_LEG|MOVE_EFF_STANCE|MOVE_PRI_DAMAGE|MOVE_DIR_OFFENSIVE;
    string = "kick to the legs";
    choiceString = "kick <object's> legs";
    thirdPartyString = "kicks <object's> legs";
    duration = 6;
    recovery = 2;
    damage = 0;
    stanceDamage = 15;
    baseChanceToDodge = 0.2;
    baseChanceToBlock = 0.2;
    fightingMod = -1;

    applicable = (Actor performer, Actor target, [bool alreadyRunning=false]) {
      if (performer.stance < 30 || target.stance < 20)
        return false;
      return defaultApplicable(this, performer, target, alreadyRunning:alreadyRunning);
    };

    applyHit = (Actor performer, Actor target) {
      defaultApplyHit(this, performer, target, hitString:"<subject> kick<s> <object's> legs");
    };
  }

  CombatMove.Defense() : super () {
    // init with defaults
    initDefaultFunctions();

    type = MOVE_DIR_DEFENSIVE|MOVE_LMB_HAND;
    string = "parry";
    offensive = false;
    choiceString = "parry <object's> move";
    thirdPartyString = "parries <object's> move";
    duration = 4;
    recovery = 0;
    fightingMod = +2;

    applicable = (Actor performer, Actor target, [bool alreadyRunning=false]) {
      if (target.target != performer)
        return false; // don't parry attacks that don't target you
      if (target.currentMove == null 
          || (target.currentMove.damage == 0 && target.currentMove.stanceDamage == 0))
        return false; // don't parry no attack and don't parry someone parrying you
      return defaultApplicable(this, performer, target, alreadyRunning:alreadyRunning);
    };

    start = (Actor performer, Actor target) {
      if (target.isPlayer) {
        performer.echo("<subject> braces for <object's> blow", object:target);
      } else if (performer.isPlayer) {
        performer.echo("you decide to brace for <object's> blow", endSentence:true, object:target);
      }
      // wait for the blow
      performer.tillEndOfMove = target.tillEndOfMove + 1;
    };

    update = (Actor performer, Actor target) {
      performer.stance += 1;
    };
  }

  CombatMove.StandUp() : super () {
    // init with defaults
    initDefaultFunctions();

    type = MOVE_DIR_DEFENSIVE|MOVE_LMB_LEG;
    string = "stand up";
    offensive = false;
    choiceString = "stand up";
    thirdPartyString = "stands up";
    duration = 8;
    recovery = 0;
    fightingMod = -1;

    applicable = (Actor performer, Actor target, [bool alreadyRunning=false]) {
      if (alreadyRunning)
        return true;
      else
        return performer.stance < 20; // can only start standing up if not standing up already
    };

    update = (Actor performer, Actor target) {
      if (performer.tillEndOfMove <= (duration / 2).toInt()) // first few timesteps the actor is gathering - his stance doesn't rise yet
        performer.stance += 4;
    };

    start = (Actor performer, Actor target) {
      String again = (performer.previousMove == this) ? " again" : "";
      performer.echo(randomly(["<subject> gather<s> to stand up$again", "<subject> begin<s> to stand up$again", "<subject> tr<ies> to stand up$again"]));
    };

    computeSuitability = (Actor performer, Actor target) {
      return 10; // when this move is applicable, it's probably a good idea to use it
    };
  }

  CombatMove.Withdraw() : super() {
    // init with defaults
    initDefaultFunctions();

    type = MOVE_DIR_DEFENSIVE|MOVE_LMB_LEG;
    string = "withdraw";
    offensive = false;
    choiceString = "take a step back";
    thirdPartyString = "takes a step back";
    duration = 5;
    recovery = 0;
    fightingMod = +1;

    applicable = (Actor performer, Actor target, [bool alreadyRunning=false]) {
      if (!performer.alive)
        return false;
      if (performer.stance < 20)
        return false;
      if (!alreadyRunning && performer.stance == performer.maxStance)
        return false;
      return true; 
    };

    start = (Actor performer, Actor target) {
      performer.echo(randomly(["<subject> withdraw<s>", "<subject> back<s> away", "<subject> give<s> ground"]));
    };

    applyEnd = (Actor performer, Actor other) {
      performer.stance += 10;
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

  static final int MAX_MOVES_PRESENTED = 5;

  bool _started = false;
  bool finished = false;
  bool interactionNeeded = false;

  Function specialUpdate; // allows defining novel combat situations (moving train, random events, spawning enemies...)

  int _prevTime = 0;
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
    // find out if time passed since last time update() was called
    bool timePassed = (time > _prevTime);
    _prevTime = time;

    if (timePassed) {
      if (specialUpdate != null)
        specialUpdate(this);

      actors.forEach((actor) {
        actor.update();
      });

      // make sure the fight still needs to continue
      if (!actors.some((a) => a.alive && actors.some((b) => b.alive && b.team != a.team))) {
        finished = true;
        return;
      }
    }

    if (_player != null && _player.alive && _player.tillEndOfMove <= 0) {
      if (_player.target == null) {
        // let player choose his target
        List<Actor> possibleEnemies = actors.filter((o) => o.team != _player.team && o.alive);
        possibleEnemies.forEach((enemy) {
            playerChoices.add(new Choice("Target ${enemy.randomName}.", showNow:true, then:() { storyline.add("<subject> now lock on to <object>", subject:_player, object:enemy); _player.target = enemy; }));
        });
      } else {
        // find out possible moves the player can perform on the target
        List<CombatMove> possibleMoves = _player.getPossibleMoves(max:MAX_MOVES_PRESENTED);
        if (!possibleMoves.isEmpty()) {
          possibleMoves.sort((a,b) => a.type - b.type);
          possibleMoves.forEach((move) {
              playerChoices.add(new Choice(capitalize(Storyline.getString(move.choiceString, subject:_player, object:_player.target)), showNow:true, then:() { _player.currentMove = move; _player.currentMove.start(_player, _player.target); }));
          });
        }
        // let player target someone else
        if (actors.some((a) => a.alive && a != _player.target && a.team != _player.team))
          playerChoices.add(new Choice("Target another enemy.", showNow:true, then:() { _player.target = null; time--; })); 
      }

      if (!playerChoices.isEmpty()) {
        interactionNeeded = true;
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
