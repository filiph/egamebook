#library('Scripter Implementation');

#import('../../lib/src/egb_library.dart');
#import('dart:math');


void DEBUG(String str) {
  print(str);
}

int GLOBAL_HASH_I = 0;

Dynamic randomly(List choices) {
  num number = choices.length;
  if (number == 0)
    throw new Exception("Cannot randomly choose from an empty set.");
  double portionSize = 1.0 / number;
  double rand = new Random().nextDouble();
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
  final String self; // Himself

  String toString() => nominative;

  const Pronoun(this.nominative, this.accusative, this.genitive, this.self); 

  static const Pronoun YOU = const Pronoun("you", "you", "your", "yourself");
  static const Pronoun HE = const Pronoun("he", "him", "his", "himself");
  static const Pronoun SHE = const Pronoun("she", "her", "her", "herself");
  static const Pronoun IT = const Pronoun("it", "it", "its", "itself");
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

  Storyline add(String str, [Actor subject, Actor object, bool but=false, bool positive=false, bool negative=false, bool endSentence=false, bool startSentence=false, bool wholeSentence=false, int time]) {
    reports.add( {
        "string": str,
        "subject": subject,
        "object": object,
        "but": but,
        "positive": positive,
        "negative": negative,
        "endSentence": endSentence,
        "startSentence": startSentence,
        "wholeSentence": wholeSentence,
        "time": time
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

  static int SHORT_TIME = 4;
  static int VERY_LONG_TIME = 1000;
  int timeSincePrevious(int i) {
    if (reports[i]["time"] == null || !valid(i-1) || reports[i-1]["time"] == null)
      return VERY_LONG_TIME;
    else
      return reports[i]["time"] - reports[i-1]["time"];
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

  bool exchanged(String key1, String key2, int i, int j) {
    if (!valid(i) || !valid(j))
      return false;
    if (reports[i][key1] == null || reports[j][key1] == null)
      return false;
    if (reports[i][key2] == null || reports[j][key2] == null)
      return false;
    if (reports[i][key1] == reports[j][key2]
     && reports[i][key2] == reports[j][key1])
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
    // subject(i) == object(j), opposite sentiments => same sentiment
    if (exchanged('subject', 'object', i, j) && subject(i).team != subject(j).team) {
      if (reports[i]["positive"] && reports[j]["negative"])
        return true;
      if (reports[i]["negative"] && reports[j]["positive"])
        return true;
    }
    if (!same('subject', i, j))
      return false;
    if (reports[i]["positive"] && reports[j]["positive"])
      return true;
    if (reports[i]["negative"] && reports[j]["negative"])
      return true;
    else
      return false;
  }

  bool oppositeSentiment(int i, int j) {
    if (!valid(i) || !valid(j))
      return false;
    // subject(i) == object(j), both have same sentiment => opposite sentiment
    if (exchanged('subject', 'object', i, j) && subject(i).team != subject(j).team) {
      if (reports[i]["positive"] && reports[j]["positive"])
        return true;
      if (reports[i]["negative"] && reports[j]["negative"])
        return true;
    }
    if (!same('subject', i, j))
      return false;
    if (reports[i]["positive"] && reports[j]["negative"])
      return true;
    if (reports[i]["negative"] && reports[j]["positive"])
      return true;
    else
      return false;
  }

  /// makes sure the sentence flows well with the previous sentence(s), then calls getString to do in-sentence substitution
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

  /// Takes care of substitution of stopwords. Called by substitute().
  static String getString(String str, [Actor subject, Actor object]) {
    String result = str;
    if (subject != null) {
      if (subject.pronoun == Pronoun.YOU) { // don't talk like a robot: "player attacks wolf"
        result = result.replaceAll(SUBJECT, subject.pronoun.nominative);
        result = result.replaceAll(SUBJECT_POSSESIVE, subject.pronoun.genitive);
        result = result.replaceAll(VERB_S, "");
        result = result.replaceAll(VERB_ES, "");
        result = result.replaceAll(VERB_IES, "y");
        result = result.replaceAll(VERB_DO, "do");
        result = result.replaceAll(VERB_BE, "are");
      }
      else { // third person
        result = result.replaceFirst(SUBJECT, subject.name);
        result = result.replaceAll(SUBJECT, subject.pronoun.nominative);
        result = result.replaceAll(VERB_S, "s");
        result = result.replaceAll(VERB_ES, "es");
        result = result.replaceAll(VERB_IES, "ies");
        result = result.replaceAll(VERB_DO, "does");
        result = result.replaceAll(VERB_BE, "is");
      }
      result = result.replaceAll(SUBJECT_PRONOUN, subject.pronoun.nominative);
      if (str.indexOf(SUBJECT) < str.indexOf(SUBJECT_POSSESIVE)) { // "actor takes his weapon"
        result = result.replaceAll(SUBJECT_POSSESIVE, subject.pronoun.genitive);
      }
      result = result.replaceFirst(SUBJECT_POSSESIVE, "${subject.name}'s");
      result = result.replaceAll(SUBJECT_POSSESIVE, subject.pronoun.genitive);
      result = result.replaceAll(SUBJECT_PRONOUN_POSSESIVE, subject.pronoun.genitive);
    }
    if (object != null) {
      if (object.isPlayer) { // don't talk like a robot: "wolf attacks player"
        result = result.replaceAll(OBJECT, object.pronoun.accusative);
        result = result.replaceAll(OBJECT_POSSESIVE, object.pronoun.genitive);
      } else
        result = result.replaceAll(OBJECT, object.name);
      result = result.replaceAll(OBJECT_PRONOUN, object.pronoun.accusative);
      if (str.indexOf(OBJECT) < str.indexOf(OBJECT_POSSESIVE)) { // "actor takes his weapon"
        result = result.replaceAll(OBJECT_POSSESIVE, object.pronoun.genitive);
      }
      result = result.replaceFirst(OBJECT_POSSESIVE, "${object.name}'s");
      result = result.replaceAll(OBJECT_POSSESIVE, object.pronoun.genitive);
      result = result.replaceAll(OBJECT_PRONOUN_POSSESIVE, object.pronoun.genitive);
    }

    return resolveRandoms(result);
  }

  // when string has { ... | ... } then choose randomly
  // TODO: tbd move to EGB Library? Along with randomly...
  static String resolveRandoms(String str) {

    int startTagIndex = str.indexOf("{");
    if (startTagIndex != -1 && startTagIndex < str.length - 1) {
      List<int> indexes = new List<int>();
      indexes.add(startTagIndex);
      int lastIndex;
      int endTagIndex;
      int depth = 1;
      for (int i = startTagIndex + 1; i < str.length; i++) {
        lastIndex = i;
        String ch = str[i];
        if (ch == "{") {
          depth++;
        } else if (ch == "|" && depth == 1) {
          indexes.add(i);
        } else if (ch == "}") {
          depth--;
          if (depth == 0) {
            endTagIndex = i;
            indexes.add(endTagIndex);
            break;
          }
        }
      }

      int numOptions = indexes.length - 1;
      if (numOptions > 1) {
        int choice = (new Random().nextDouble() * numOptions).floor().toInt();

        StringBuffer strBuf = new StringBuffer();
        strBuf.add(str.substring(0, startTagIndex));
        String choiceString = str.substring(indexes[choice] + 1, indexes[choice + 1]);
        strBuf.add(resolveRandoms(choiceString));
        strBuf.add(str.substring(endTagIndex + 1, str.length));
        if (lastIndex == str.length - 1)
          return strBuf.toString();
        else
          return resolveRandoms(strBuf.toString());
      } else {
        // not a real options string
        if (lastIndex == str.length - 1)
          return str;
        else
          return "${str.substring(0,lastIndex + 1)}${resolveRandoms(str.substring(lastIndex + 1))}";
      }
    } else { 
      // no startTag ("{") found
      return str;
    }
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
    bool endPreviousSentence = true; // previous sentence was ended
    bool endThisSentence = false; // this sentence needs to be ended
    bool but = false; // this next sentence needs to start with but
    for (int i=0; i < length; i++) {
      // TODO: look into future - make sentences like "Although __, __" 
      // TODO: ^^ can be done by 2 for loops
      // TODO: add "while you're still sweeping your legs" when it's been a long time since we said that
      if (i != 0) {
        // solve flow with previous sentence
        bool objectSubjectSwitch = exchanged('subject', 'object', i-1, i);
        but = (reports[i]["but"] || oppositeSentiment(i, i-1)) 
              && !reports[i-1]["but"];
        reports[i]["but"] = but;
        endPreviousSentence = 
          (i - lastEndSentence >= MAX_SENTENCE_LENGTH) 
          || endThisSentence
          || reports[i]["startSentence"] 
          || reports[i-1]["endSentence"] 
          || reports[i]["wholeSentence"]
          || !(same('subject', i, i-1) || objectSubjectSwitch)
          || (but && (i - lastEndSentence > 1))
          || (but && reports[i-1]["but"])
          || (timeSincePrevious(i) > SHORT_TIME);
        endThisSentence = false;

        // DEBUG("SENT: ${string(i)}\n- whole=${reports[i]["endPreviousSentence"]}
        if (endPreviousSentence) {
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
              endThisSentence = true;
          } else {
            if (same('subject', i, i-1) && string(i).startsWith("$SUBJECT ")
                && i < length - 1  && i - lastEndSentence < MAX_SENTENCE_LENGTH - 1) {
              strBuf.add(", ");
            } else {
              strBuf.add(randomly([" and ", " and ", ", and "]));
              endThisSentence = true;
            }
          }
        }
      }

      String report = string(i);
      // clear subjects when e.g. "Wolf hits you, it growls, it strikes again."
      if (!endPreviousSentence)
        if (same('subject', i, i-1))
          if (string(i-1).startsWith("$SUBJECT "))
            if (report.startsWith("$SUBJECT "))
              report = report.replaceFirst("$SUBJECT ", "");

      report = substitute(i, report);

      if ((endPreviousSentence || i == 0) && !but)
        report = capitalize(report);

      // add the actual report
      strBuf.add(report);

      // set variables for next iteration
      if (endPreviousSentence)
        lastEndSentence = i;
      if (reports[i]["wholeSentence"])
        endThisSentence = true;
    }

    // add last dot
    if (!reports[length-1]["wholeSentence"])
      strBuf.add(".");

    return strBuf.toString();
  }
}

class GameEntity implements Hashable {
  List <String> names;
  Pronoun pronoun = Pronoun.IT;

  GameEntity() {
    names = new List();
  }
  
  int hashCode() {
    return GLOBAL_HASH_I++;
  }

  String get name => randomly(names);
}

/**
  Actor class: an independent actor in the GameEvent, such as Combat.
  */
class Actor extends GameEntity {
  // current state
  bool alive = true;
  bool isPlayer = false;
  int team = 2; // actors are on team 2 (Enemy) by default
  int _hitpoints;
  // from 0 = lying on the ground to 50 = professional combat stance
  // 0=lying, 10=on_knees, 20=almost_falling, 30=shaken, 40=firm_stance, 50=pro_stance
  int _stance;  
  List<String> stanceUpStrings;
  List<String> stanceDownStrings;
  Set<CombatMoveType> moves;
  CurrentCombatMove _currentMove;
  CombatMoveType previousMove; // keeps track of previous move's type so that actors don't do the same thing over and over again
  WeaponType weapon;
  Set<ArmorType> armors;

  int tillEndOfMove = 0;
  bool recoveringFromMove = false;

  Combat combat;
  Actor _target;

  CombatCallbackHandler on;

  // an utility function that prints to the combat's storyline, pre-filling this actor as the subject
  void report(String str, [Actor subject, Actor object, bool but=false, bool positive=false, bool negative=false, bool endSentence=false, bool startSentence=false, bool wholeSentence=false, bool reportOnlyOnAlive=true]) {
    if (combat == null)
      return;
    if (subject == null)
      subject = this;
    if (!subject.alive && reportOnlyOnAlive)
      return;
    combat.storyline.add(str, subject:subject, object:object, but:but, positive:positive, negative:negative, endSentence:endSentence, startSentence:startSentence, wholeSentence:wholeSentence, time:combat.time);
  }

  /// returns the fighting ability modified by current move and stance
  int get modifiedFighting {
    int stanceMod = max((((29 - _stance) / 10) + 1), 0).toInt(); // stance 0-9 => -3, stance 10-19 => -2, 20-29 => -1. Stance 30+ => no mod
    int hitpointsMod = max(0, (((maxHitpoints - _hitpoints)/maxHitpoints - 0.7) * 10)).toInt(); // if hitpoint are below 20% of maxHitpoint => -1, below 10% => -2
    if (currentMove == null)
      return fighting - stanceMod - hitpointsMod;
    else
      return fighting - stanceMod - hitpointsMod + currentMove.type.fightingMod;
  }

  /// returns the fighting number used for purposes of attacking, where
  /// currentMove's fightingMod isn't counted.
  int get modifiedAttacking {
    if (currentMove == null)
      return modifiedFighting;
    else
      return modifiedFighting - currentMove.type.fightingMod;
  }

  int get modifiedBlocking => modifiedFighting + weapon.blockingMod;
  int get modifiedDodging {
    int value = modifiedFighting;
    for (ArmorType armor in armors) {
      value += armor.dodgingMod;
    }
    return value;
  }

  CurrentCombatMove get currentMove => _currentMove;
  void set currentMove(CombatMoveType value) { // TODO: fix class mismatch
    if (_currentMove != null)
      previousMove = _currentMove.type;
    if (value == null) {
      if (_currentMove != null) {
        tillEndOfMove = _currentMove.type.recovery; // do not substract speed from recovery - this makes speed too powerful
        if (tillEndOfMove > 0)
          recoveringFromMove = true;
      }
      _currentMove = null;
    } else {
      _currentMove = new CurrentCombatMove(value, this, target);
      tillEndOfMove = _currentMove.type.duration; // duration will vary slightly (TODO: TBD)
      _currentMove.on["start"].dispatchAll(new CombatEvent.fromMove(_currentMove));
    }
  }

  int get hitpoints => _hitpoints;
  void set hitpoints(int value) {
    if (value <= 0) {
      on["die"].dispatchAll();
      alive = false;
      return;
    }

    if (value < _hitpoints) {
      on["hitpointsDown"].dispatchAll();
      if (currentMove != null)
        currentMove.on["hitpointsDown"].dispatchAll();
    } else if (value > _hitpoints) {
      on["hitpointsUp"].dispatchAll();
      if (currentMove != null)
        currentMove.on["hitpointsUp"].dispatchAll();
    }

    // big _hitpoints - value => it hurt a lot
    int almostDyingThreshold = min(3, (maxHitpoints / 3).toInt());
    if (_hitpoints > almostDyingThreshold
        && value < almostDyingThreshold) {
      on["almostDying"].dispatchAll();
    }
    // else: "you can still fight"

    _hitpoints = min(value, maxHitpoints);
  }

  int get stance => _stance;
  void set stance(int value) {
    if (!alive)
      return;
    int prevStance = _stance;
    _stance = min(value, maxStance);
    _stance = max(0, _stance);
    // only report when stance is changed between levels
    if ((_stance / 10).toInt() != (prevStance / 10).toInt()) {
      if (_stance > prevStance) {
        report(stanceUpStrings[min(5, (_stance / 10).toInt())], positive:true);
        on["stanceUp"].dispatchAll();
        if (currentMove != null)
          currentMove.on["stanceUp"].dispatchAll();
      } else {
        report(stanceDownStrings[min(5, (_stance / 10).toInt())], negative:true);
        on["stanceDown"].dispatchAll();
        if (currentMove != null)
          currentMove.on["stanceDown"].dispatchAll();
        if (prevStance - _stance > 10 && _stance < 10) // damage from fall
          hitpoints -= 1;
      }
    }
  }

  Actor get target => _target;
  void set target(Actor value) {
    _target = value;
    previousMove = null;
  }

  // TODO: defaultOnHitpointsDown

  static void defaultOnAlmostDying(Actor _this) {
    // TODO: get rid of or make more generic
    _this.on["update"].add((Actor a) {
        if (a.combat.time % 12 == 6)
          if (randomly([true, false]))
            a.report("blood is dripping into <subject's> eyes", negative:true);
    });
    _this.report("<subject> <is> badly hurt", negative:true);
  }

  static void defaultOnDie(Actor _this) {
    _this.report("<subject> ${randomly(['pass<es> out','lose<s> consciousness','black<s> out','go<es> down'])}", negative:true, reportOnlyOnAlive:false);
  }

  bool isArmoredAgainst(WeaponType weapon, CombatMoveType move, [CombatEvent e]) {
    bool result = false;
    for (ArmorType armor in armors) {
      if (!move.hasFlag(armor.coveringEffects))
        continue;  // armor has no effect here
      if (!move.hasFlag(armor.coveringTargets))
        continue;  // armor doesn't cover the target of this move
      if (!move.hasFlag(armor.coveringSides))
        continue;  // armor doesn't cover the side of this move

      if (move.isHitpointsDamaging) {
        if (armor.hardness > weapon.piercing) {
          // DEFLECT
          result = true;
          if (e != null)
            e.armor = armor;
          break;
        }
      }
      // TODO: armor against stance damage?
    }
    return result;
  }

  // Ctor.
  Actor() : super() {
    on = new CombatCallbackHandler(this);
    weapon = new WeaponType();
    armors = new Set<ArmorType>();

    // init with defaults
    names = ["actor"];
    pronoun = Pronoun.HE;
    _hitpoints = maxHitpoints;
    _stance = maxStance;

    moves = new Set();
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

    on["almostDying"].add(defaultOnAlmostDying);
    on["die"].add(defaultOnDie);
  }

  /// Main update function of the Actor. This is where most
  /// of the action takes place.
  void update() {
    if (!alive)
      return;

    on["update"].dispatchAll();

    // make sure actor doesn't move after being poisoned to death 
    // in on["update"] above, for example
    if (!alive) 
      return;

    tillEndOfMove--; // just let the time pass
    DEBUG("${this.name} tillEndOfMove: $tillEndOfMove");

    if (tillEndOfMove > 0 && currentMove != null) {
      // move still in progress
      CombatEvent e = new CombatEvent.fromMove(currentMove);
      if (target != null && !target.alive && currentMove.type.isOffensive) {
        // actor is already dead and we're doing an offensive move
        currentMove.on["cancel"].dispatchAll(e);
        currentMove = null;
        target = null;
        return;
      } else {
        if (currentMove.type.canContinue(this, target)) {
          currentMove.on["update"].dispatchAll(e);
        } else {
          // move is no longer applicable
          currentMove.on["cancel"].dispatchAll(e);
          currentMove = null;
          return;
        }
      }
    } else if (tillEndOfMove <= 0) {
      // effect of finished move
      if (currentMove != null) {
        CombatEvent e = new CombatEvent.fromMove(currentMove);
        if (currentMove.type.canContinue(this, target)) {
          if (currentMove.type.isOffensive) {
            // throws
            double chanceToDodge = currentMove.type.chanceToDodge(this, target);
            if (new Random().nextDouble() < chanceToDodge) {
              DEBUG("- dodge success");
              // DODGED
              e.chance = chanceToDodge;
              e.chanceAll = chanceToDodge;
              // TODO: implement Luck
              target.on["dodge"].dispatchAll(e); 
              currentMove.on["sufferDodge"].dispatchAll(e); // main
              this.on["sufferDodge"].dispatchAll(e);
              currentMove = null;
              return;
            } else {
              DEBUG("- dodge fail");
              // same as above, but for blocks
              double chanceToBlock = currentMove.type.chanceToBlock(this, target);
              if (new Random().nextDouble() < chanceToBlock) {
                DEBUG("- block success");
                // BLOCKED
                e.chance = chanceToBlock;
                e.chanceAll = chanceToBlock;
                // TODO: implement Luck
                currentMove.on["sufferMeetWeapon"].dispatchAll(e);
                if (target.weapon.hardness >= this.weapon.piercing) {
                  currentMove.on["sufferBlock"].dispatchAll(e); // main
                } else {
                  // blocking weapon is too weak and breaks
                  target.weapon.on["sufferPierced"].dispatchAll(e);
                  if (target.weapon.weaponWhenPierced != null)
                    target.weapon = target.weapon.weaponWhenPierced;
                  else
                    DEBUG("Warning: weapon ${target.weapon.name} doesn't have 'weaponWhenPierced' defined.");
                }
                target.on["block"].dispatchAll(e);
                this.on["sufferBlock"].dispatchAll(e);
                currentMove = null;
                return;
              } else {
                DEBUG("- block fail => hit");
                // HIT
                e.chance = (1 - chanceToBlock);
                e.chanceAll = (1 - chanceToBlock) * (1 - chanceToDodge);

                if (target.isArmoredAgainst(this.weapon, currentMove.type, e)) {
                  // DEFLECT
                  currentMove.on["sufferDeflect"].dispatchAll(e); // main
                  e.armor.on["deflect"].dispatchAll(e);
                  target.on["deflect"].dispatchAll(e);
                  this.on["sufferDeflect"].dispatchAll(e);
                } else {
                  // HIT PROPER
                  // TODO: implement Luck
                  currentMove.on["hit"].dispatchAll(e); // main
                  target.on["sufferHit"].dispatchAll(e);
                  if (target.currentMove != null)
                    target.currentMove.on["sufferHit"].dispatchAll(e);
                  this.on["hit"].dispatchAll(e);
                }
                currentMove = null;
                return;
              }
            }
          } else {
            // non-offensive move ended
            currentMove.on["end"].dispatchAll(e);
            currentMove = null;
            return;
          }
        } else {
          // cannot continue
          currentMove.on["cancel"].dispatchAll(e);
          currentMove = null;
          return;
        }
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

        if (target == null || !moves.some((m) => m.isApplicable(this,target)) ) {
          // no target or no combat moves applicable to the target, TODO: try to change target?
          report('<subject> ${randomly(["just stands there", "doesn\'t do anything", "does nothing"])}');
        } else {
          currentMove = chooseMove();
        }
      }
    }
  }

  // List moves
  List<CombatMoveType> getPossibleMoves([int max=1000]) {
    List<CombatMoveType> possibleMoves = new List.from(
          moves.filter((m) => m.isApplicable(this,target))
        );
    if (possibleMoves.length < 2)
      return possibleMoves;

    // TODO: pick interesting choices - big chance, big damage, big stancedamage
    // first, sort by suitability (computeSuitability contains logic against repeating last move)
    possibleMoves.sort((a,b) => b.computeSuitability(this,target) - a.computeSuitability(this,target));
    // next, bring down moves that are already mostly covered by moves above them
    // bring down moves that have large countBits(flags & previous.flags) / countBits(flags) (100% => same type of move)
    final double MAX_SIMILARITY = 0.70;
    Map<int,CombatMoveType> redundantMovesMap = new Map<int,CombatMoveType>();
    for (int i=1; i < possibleMoves.length; i++) {
      for (int j=0; j < i; j++) {
        double similarity = countBits(possibleMoves[i].flags & possibleMoves[j].flags) / countBits(possibleMoves[i].flags | possibleMoves[j].flags);
        if (similarity > MAX_SIMILARITY) {
          DEBUG("${possibleMoves[i].string} is similar to ${possibleMoves[j].string}: $similarity.");
          redundantMovesMap[i] = possibleMoves[i];
          break;
        }
      }
    }
    // move redundant moves at the end of the list
    List<CombatMoveType> finalMoves = new List<CombatMoveType>(possibleMoves.length);
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

    return finalMoves.getRange(0, min(finalMoves.length, max)); // return up to max moves
  }

  // AI chooses a move
  CombatMoveType chooseMove([int max=1000]) {
    List<CombatMoveType> possibleMoves = getPossibleMoves(max:max);

    // logic that gives more chance to higher (more suitable) moves
    double random = new Random().nextDouble();
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

  // stats
  int maxHitpoints = 10;
  int maxStance = 45; // the best stance this actor can muster
  int speed = 0; // 0 = normal person, -x = everything takes x seconds longer, +x = dtto shorter
  int fighting = 0; // 1 = normal person, +x = number of extra block/dodge throws per turn
  //int blocking = 0; // like fighting, but will be modified by weapon type
  //int dodging = 0; // like fighting, but will be modified by armor(s)
}

class Player extends Actor {
  Player() : super() {
    isPlayer = true;
    team = 1; // player is on team Player (1)
    names = ["player"];
    pronoun = Pronoun.YOU;
  }
}

/**
  CombatMoveType defines every type of movement, from a simple punch to elaborate
  sword-fight combos. Only one object of a type exists.
  */
class CombatMoveType extends GameEntity {
  /// the basic description of the move
  String string;
  /// the string to be presented as a choice to the player
  /// e.g.: "hit <object> to the stomach"
  String choiceString;
  /// e.g.: "hits <object> in the stomach"
  String thirdPartyString;

  int duration; // number of turns from start to effect (=hit)
  int recovery; // number of turns it gets to start a new move again
  int damage = 0;
  int stanceDamage = 0;
  double baseChanceToDodge = 0.0;
  double baseChanceToBlock = 0.0;

  // modifiers to move's performer. Many moves will make it temporarily harder to block and dodge
  // defense moves will make it easier (positive number)
  int fightingMod = 0;

  // flags bits of the move
  int flags = 0x0;

  // target(s) of the move
  static const int MOVE_TRG_HEAD = 1<<1;
  static const int MOVE_TRG_NECK = 1<<2;
  static const int MOVE_TRG_ARMS = 1<<3;
  static const int MOVE_TRG_BODY = 1<<4;
  static const int MOVE_TRG_WAIST = 1<<5;
  static const int MOVE_TRG_LEGS = 1<<6;
  static const int MOVE_TRG_ALL = MOVE_TRG_HEAD|MOVE_TRG_NECK|MOVE_TRG_ARMS|MOVE_TRG_BODY|MOVE_TRG_WAIST|MOVE_TRG_LEGS;

  // directions of the move
  static const int MOVE_FRM_FRONT = 1<<7;
  static const int MOVE_FRM_BEHIND = 1<<8;
  static const int MOVE_FRM_LEFT = 1<<9;
  static const int MOVE_FRM_RIGHT = 1<<10;
  static const int MOVE_FRM_ALL = MOVE_FRM_FRONT|MOVE_FRM_BEHIND|MOVE_FRM_LEFT|MOVE_FRM_RIGHT;

  // limbs used (primarily) for the move by the performer
  static const int MOVE_LMB_HAND = 1<<11;
  static const int MOVE_LMB_LEG = 1<<12;
  static const int MOVE_LMB_HEAD = 1<<13;
  static const int MOVE_LMB_SPECIAL = 1<<14; // e.g. tail

  // move damages {hitpoints|stance}?
  static const int MOVE_EFF_HITPOINTS = 1<<15;
  static const int MOVE_EFF_STANCE = 1<<16;
  static const int MOVE_EFF_ALL = MOVE_EFF_HITPOINTS|MOVE_EFF_STANCE;

  // priority: quicker or more damage?
  static const int MOVE_PRI_QUICK = 1<<17;
  static const int MOVE_PRI_DAMAGE = 1<<18;

  // defensive or offensive move
  static const int MOVE_DIR_OFFENSIVE = 1<<19;
  static const int MOVE_DIR_DEFENSIVE = 1<<20;

  // utility function. Returns true if this CombatMoveType' flags have (at least one) 
  // same bit as otherType
  bool hasFlag(int otherFlags) => (flags & otherFlags) != 0;

  bool get isOffensive => hasFlag(MOVE_DIR_OFFENSIVE);
  bool get isHitpointsDamaging => hasFlag(MOVE_EFF_HITPOINTS);
  bool get isStanceDamaging => hasFlag(MOVE_EFF_STANCE);

  /// The events handler
  CombatCallbackHandler on;

  /// returns bool, whether this move is isApplicable given the two actors
  Function isApplicable;

  /// returns bool, whether this move can continue given the state
  Function canContinue;

  /// returns chance (0.0-1.0) of dodging this move
  Function chanceToDodge;

  /// returns chance (0.0-1.0) of blocking this move
  Function chanceToBlock;

  /// used to sort moves by immediate suitability. The top choices should be
  /// a good combination of low-risk, low-impact, and high-risk, high-impact moves
  Function computeSuitability;

  /* 
     Default compute functions
   */

  static bool defaultIsApplicable (CombatMoveType _this, Actor performer, Actor target) {
    return true;
  }
  
  static bool defaultCanContinue(CombatMoveType _this, Actor performer, Actor target) {
    return true;
  }

  static double defaultChanceToDodge (CombatMoveType _this, Actor performer, Actor target) {
    // the bigger the difference, the more/less chance
    int fightingDiff = target.modifiedDodging - performer.modifiedAttacking;
    //DEBUG("ChanceToDodge ${_this.string}: ${performer.name} -> ${target.name}");
    //DEBUG("- $fightingDiff");

    if (fightingDiff >= 10)
        return 1.0;
    else if (fightingDiff <= -10)
        return 0.0;
    else if (fightingDiff == 0) {
      return _this.baseChanceToDodge;
    } else if (fightingDiff > 0) {
      // target is better
      return _this.baseChanceToDodge 
             + (1.0 - _this.baseChanceToDodge) * fightingDiff / 10.0;
    } else {
      // performer is better
      return _this.baseChanceToDodge 
             - (_this.baseChanceToDodge) * fightingDiff.abs() / 10.0;
    }
  }

  static double defaultChanceToBlock (CombatMoveType _this, Actor performer, Actor target) {
    // the bigger the difference, the more/less chance
    int fightingDiff = target.modifiedDodging - performer.modifiedAttacking;
    //DEBUG("ChanceToBlock ${_this.string}: ${performer.name} -> ${target.name}");
    //DEBUG("- $fightingDiff");

    if (fightingDiff >= 10)
        return 1.0;
    else if (fightingDiff <= -10)
        return 0.0;
    else if (fightingDiff == 0) {
      return _this.baseChanceToBlock;
    } else if (fightingDiff > 0) {
      // target is better
      return _this.baseChanceToBlock 
             + (1.0 - _this.baseChanceToBlock) * fightingDiff / 10.0;
    } else {
      // performer is better
      return _this.baseChanceToBlock 
             - (_this.baseChanceToBlock) * fightingDiff.abs() / 10.0;
    }
  }

  /// Returns the chance _this move will succeed given current performer & target.
  /// Does not count with possible parry and counter moves and changes in future.
  double computeChanceToHit(Actor performer, Actor target) {
    double chanceToDodge = chanceToDodge(performer, target);
    double chanceToBlock = chanceToBlock(performer, target);
    return (1 - chanceToDodge) * (1 - chanceToBlock);
  }

  static int defaultComputeSuitability (CombatMoveType _this, Actor performer, Actor target) {
    if (_this.isOffensive) {
      num chanceToHit = _this.computeChanceToHit(performer, target);
      int value = ((_this.damage + (_this.stanceDamage / 5))*10).toInt();
      value = (value * chanceToHit * chanceToHit).toInt();
      if (performer.previousMove != null) // similar moves as the last one get minus points
        value -= countBits(_this.flags & performer.previousMove.flags)* 10;
      if (target.isArmoredAgainst(performer.weapon, _this))
        value -= 100;
      return value;
    } else {
      // TODO: defensive suitability
      return _this.fightingMod * 10;
    }
  }


  /*
  static List<String> getLuckStrings(double chance) {
    // result [0] is intro, result [1] is an adverb, result[2] is a modifying end of sentence
    List<String> result = new List<String>(3);
    if (chance < 0.05) {
      return randomly([
          ["impossibly, ", 
          "by awesome chance, ", 
          "by pure chance, ",
          ]);
    }
    if (chance < 0.2)
      return randomly(["with luck, ", "with some luck, ","by odd chance, "]);
    if (chance > 0.8 && chance < 0.95)
      return randomly(["easily, ", "effortlessly, ", "without difficulty, "]);
    if (chance >= 0.95)
      return randomly(["without a sweat, ", "as a matter of course, "]);
  }
  */

  /* 
     Default event handler functions
   */

  static void defaultOnStart (CombatMoveType _this, CombatEvent e) {
    String again = (e.performer.previousMove == _this) ? " again" : "";
    if (!e.performer.isPlayer) {
      e.performer.report("<subject> wind<s> up to ${_this.choiceString}$again", endSentence:true, object:e.target);
    } else {
      e.performer.report("you decide to ${_this.choiceString}$again", endSentence:true, object:e.target);
    }
  }

  /*
  static void defaultOnUpdate (CombatMoveType move, CombatEvent e) {
  }

  static void defaultOnEnd (CombatMoveType move, CombatEvent e) {
  }
  */

  static void defaultOnSufferDodge (CombatMoveType _this, CombatEvent e) {
    e.target.report("<subject> dodge<s> <object's> ${_this.string} (${e.chance})", object:e.performer, positive:true);
  }

  static void defaultOnSufferMeetWeapon (CombatMoveType _this, CombatEvent e) {
    // TODO: define citoslovce ("Thump", "Cling", Clank!") - BUT in the Weapon or move
    e.target.report("<subject> meet<s> <object's> move with <subject's> ${e.target.weapon.name} (${e.chance})", object:e.performer, positive:true);
  }

  static void defaultOnSufferBlock (CombatMoveType _this, CombatEvent e) {
    e.target.report("<subject> deflect<s> it", object:e.performer, positive:true);
    int actualStanceDamage = max(
        0, 
        (_this.stanceDamage / 2).toInt() - e.target.modifiedFighting
    );
    if (actualStanceDamage > 0) {
      e.target.report("the blow was hard", negative:true);
      e.target.stance -= actualStanceDamage;
    }
  }

  static void defaultOnSufferDeflect (CombatMoveType _this, CombatEvent e) {
    e.performer.report("<subject> hit<s> (${e.chanceAll})", object:e.target, positive:true);
    e.performer.report("<subject's> ${e.weapon.name} bounces off <object's> ${e.armor.name}", object:e.target, negative:true);
    e.target.stance -= _this.stanceDamage;
  }

  static void defaultOnHit (CombatMoveType _this, CombatEvent e) {
    // TODO: define citoslovce ("Thump", "Cling", Clank!") - BUT in the Weapon or move
    e.performer.report("${_this.thirdPartyString} (${e.chanceAll})", object:e.target, positive:true);
    e.target.hitpoints -= _this.damage;
    e.target.stance -= _this.stanceDamage;
  }

  static void defaultOnCancel (CombatMoveType _this, CombatEvent e) {
    e.performer.report("{there's no way <subject> can ${_this.choiceString} now|<subject> find<s> it impossible to ${_this.choiceString} now}", object:e.target, negative:true);
  }


  void initDefaultFunctions() {
    on = new CombatCallbackHandler(this);

    isApplicable = (Actor performer, Actor target) {
      return defaultIsApplicable(this, performer, target);
    };

    canContinue = (Actor performer, Actor target) {
      return defaultCanContinue(this, performer, target);
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

    on["start"].add(defaultOnStart);
    //on["update"].add(defaultOnUpdate);
    //on["end"].add(defaultOnEnd);
    on["hit"].add(defaultOnHit);
    on["sufferDeflect"].add(defaultOnSufferDeflect);
    on["sufferBlock"].add(defaultOnSufferBlock);
    on["sufferMeetWeapon"].add(defaultOnSufferMeetWeapon);
    on["sufferDodge"].add(defaultOnSufferDodge);
    on["cancel"].add(defaultOnCancel);
  }


  CombatMoveType([
      this.string = "UNNAMED MOVE",
      this.choiceString = "USE UNNAMED MOVE",
      this.thirdPartyString = "USES UNNAMED MOVE",
      this.flags = 0x0,
      this.duration,
      this.recovery,
      this.damage = 0,
      this.stanceDamage = 0,
      this.baseChanceToBlock = 1.0,
      this.baseChanceToDodge = 1.0,
      this.fightingMod = 0
      ]) : super() {

    initDefaultFunctions();
  }

}

/**
  CurrentCombatMove stores the type of the move ([CombatMoveType]) 
  and the actors of the move. When an [:on.___:] event is called
  on CurrentCombatMove, it also runs that same event of the
  CombatMoveType.
  */
class CurrentCombatMove extends GameEntity {
  CombatMoveType type;
  Actor performer;
  Actor target;

  CombatCallbackHandler on;

  CurrentCombatMove(this.type, [this.performer, this.target]) {
    on = new CombatCallbackHandler(this);
  }
}

/**
  WeaponType stores information and events of all types of weapons.
  Only one object of a weapon type exists.
  Every Actor can have only one WeaponType. This makes it easier to manage
  Storyline reporting. Therefore, there can be WeaponTypes such as
  Barehanded, SwordAndShield, OneHandOnly, and such.
  */
class WeaponType extends GameEntity {
  int piercing;
  int hardness;
  int blockingMod;
  WeaponType weaponWhenPierced; // the weapon this fall backs to when pierced
  // moves that make sense with this weapon TODO
  Set<CombatMoveType> moves;
  // moves that only this weapon allows, e.g. "drop sword" for BrokenSword
  Set<CombatMoveType> specialMoves; 

  CombatCallbackHandler on;

  bool get barehanded => hardness == 0;
  bool get blunt => hardness > 0 && hardness < 3;
  bool get sharp => hardness >= 3;

  static void defaultOnSufferPierced(WeaponType _this, CombatEvent e) {
    DEBUG("Suffer Pierced: ${_this.barehanded}");
    if (_this.barehanded) {
      if (e.weapon.blunt) {
        e.performer.report("<subject's> ${e.weapon.name} breaks <object's> ${_this.name}", object:e.target, positive:true);
        e.target.report("<subject> scream<s> in pain", negative:true);
        e.target.hitpoints = max(1, e.target.hitpoints - 10);
      } else if (e.weapon.sharp) {
        e.performer.report("<subject's> ${e.weapon.name} goes right through <object's> ${_this.name}", object:e.target, positive:true);
        e.target.report("<subject> scream<s> in pain", negative:true);
        e.target.hitpoints = max(1, e.target.hitpoints - 10);
      } else {
        throw new Exception("Weapon is not blunt nor sharp, but still is piercing barehands?");
      }
    } else {
      e.target.report("<subject's> ${_this.name} breaks", negative:true);
    }
  }

  WeaponType([
      String name,
      this.piercing = 0,
      this.hardness = 0,
      this.blockingMod = 0
      ]) {

    names = (name != null) ? [name] : ["weapon"];

    on = new CombatCallbackHandler(this);
    on["sufferPierced"].add(defaultOnSufferPierced);
  }

}

/**
  ArmorType holds information about the armor of the Actor. Usual 
  AromrTypes include: Clothes, Overall, LightArmor, but also ThickSkin, 
  Thorax, etc.
  */
class ArmorType extends GameEntity {
  int hardness;
  int dodgingMod;
  int coveringTargets; // on which flagss of move this is effective
  int coveringSides; // on which sides the armor is
  int coveringEffects; // is this effective on damage and/or stance damage?
  CombatCallbackHandler on;

  ArmorType([
      String name,
      this.hardness = 0,
      this.dodgingMod = 0,
      this.coveringTargets = CombatMoveType.MOVE_TRG_ALL,
      this.coveringSides = CombatMoveType.MOVE_FRM_ALL,
      this.coveringEffects = CombatMoveType.MOVE_EFF_ALL
      ]) {

    names = (name != null) ? [name] : ["armor"];

    on = new CombatCallbackHandler(this);
  }
}

/**
  CombatEvent holds information about each event during combat.
  It is passed to CombatCallbacks.
  */
class CombatEvent {
  Actor performer;
  Actor target;
  CombatMoveType move;
  WeaponType weapon;
  ArmorType armor;
  Combat combat;

  // chance of success of the most recent action (dodge/block/etc.)
  double _chance;
  double get chance => _chance;
  void set chance(double value) {
    //DEBUG("- chance: $value");
    _chance = value;
  }
  // chance that the event ends up like this
  double _chanceAll;
  double get chanceAll => _chanceAll;
  void set chanceAll(double value) {
    //DEBUG("- chanceAll: $value");
    _chanceAll = value;
  }
  // was luck excerted?
  bool luckUsed;

  // when this is assigned true, then following callbacks shouldn't be fired
  bool stopPropagation = false;

  CombatEvent([
      this.performer,
      this.target,
      this.move,
      this.weapon,
      this.armor,
      this.combat,
      this._chance,
      this.luckUsed
      ]);

  CombatEvent.fromMove(CurrentCombatMove currentMove) {
    performer = currentMove.performer;
    target = currentMove.target;
    move = currentMove.type;
    weapon = performer.weapon;
    assert(performer.combat == target.combat);
    combat = performer.combat;
  }
}

/**
  CombatCallback stores all callbacks assigned for a given event and given
  GameEntity. It behaves like a Queue of Functions, but there are differences:
  1) you can dispatchAll(), 2) the class keeps a pointer to the GameEntity,
  3) when the GameEntity is a CurrentCombatMove, its CombatMoveType's on.___
  event is also called.
  */
class CombatCallback {
  Queue<Function> functions;

  GameEntity _this;
  String _key;

  CombatCallback(this._this, this._key) {
    functions = new Queue<Function>();
  }

  void add(Function f) {
    functions.add(f);
  }
  void addFirst(Function f) {
    functions.addFirst(f);
  }
  void addLast(Function f) {
    functions.addLast(f);
  }
  void clear() {
    functions.clear();
  }
  void replaceAllWith(Function f) {
    clear();
    add(f);
  }

  Function get first => functions.first();
  Function get last => functions.last();

  void dispatchAll([CombatEvent e]) {
    // if this is called from a currentMove, 
    // then apply currentMove's performer & target
    if (_this is CurrentCombatMove) {
      if (e == null) {
        e = new CombatEvent.fromMove(_this);
      }
      // call this CurrentCombatMove's type EventHandler first
      _this.type.on[_key].dispatchAll(e);
    }
    // TODO: check if func returns 'true', if so, delete the callback afterwards (one-shot callback)
    for (Function func in functions) { // TODO: make sure we're going in order
      if (e == null)
        func(_this);
      else {
        func(_this, e);
        if (e.stopPropagation)
          break;
      }
    }
  }
}

/** 
  Every object can have an "on" member of class CombatCallbackHandler.
  Objects can then add listeners/handlers by doing 
  [: on["hit"].add((_this, performer, target) { ... }); :]

  When an event occurs, all the listeners are called using
  [: on["hit"].dispatchAll(); :]
  */
class CombatCallbackHandler {

  // reference to the caller object
  GameEntity _this;

  // on.___ callbacks are stored in a HashMap
  Map<String,CombatCallback> _callbacks;

  /// When callbacks are accessed, they are either returned
  /// or -- in case they don't exist yet -- first created and 
  /// then returned.
  CombatCallback operator [](String key) {
    if (_callbacks.containsKey(key))
      return _callbacks[key];
    else {
      _callbacks[key] = new CombatCallback(_this, key);
      return _callbacks[key];
    }
  }

  void operator []=(String key, CombatCallback value) {
    _callbacks[key] = value;
  }

  CombatCallbackHandler(this._this) {
    _callbacks = new Map<String,CombatCallback>();
  }
}


/// Events that can be started with start(event) and TIS takes care of the repetition.

interface LoopedEvent {
  bool finished;
  bool interactionNeeded;
  void start();
  void update();
  void updateUntilInteraction();
  List<Choice> playerChoices;
  Storyline storyline;
}


class Combat extends GameEntity implements LoopedEvent {
  Storyline storyline;

  static const int MAX_MOVES_PRESENTED = 50;

  bool _started = false;
  bool finished = false;
  bool interactionNeeded = false;

  CombatCallbackHandler on;

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
    on = new CombatCallbackHandler(this);
  }

  /// The main function that gets called every single move and calls each actor to do their own stuff.
  void update() {
    // find out if time passed since last time update() was called
    bool timePassed = (time > _prevTime);
    _prevTime = time;

    if (timePassed) {
      this.on["update"].dispatchAll();

      actors.forEach((actor) {
        actor.update();
        actor.on["update"].dispatchAll();
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
        if (possibleEnemies.length == 1) {
          _player.target = possibleEnemies[0];
        } else {
          possibleEnemies.forEach((enemy) {
              playerChoices.add(new Choice("Target ${enemy.name}.", showNow:true, then:() { storyline.add("<subject> now lock on to <object>", subject:_player, object:enemy); _player.target = enemy; }));
          });
        }
      } else {
        // find out possible moves the player can perform on the target
        List<CombatMoveType> possibleMoves = _player.getPossibleMoves(max:MAX_MOVES_PRESENTED);
        if (!possibleMoves.isEmpty()) {
          //possibleMoves.sort((a,b) => a.flags - b.flags);
          possibleMoves.forEach((move) {
              playerChoices.add(new Choice(capitalize(Storyline.getString("${move.choiceString} (${move.computeSuitability(_player, _player.target)}) (${move.computeChanceToHit(_player, _player.target)})", subject:_player, object:_player.target)), showNow:true, then:() { _player.currentMove = move; }));
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


class ScripterImpl extends Scripter {

  /* LIBRARY */

  
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
  

  ScripterImpl() : super() {
    pageHandles = {
      r"""runTests""": 2,
      r"""interactiveTest""": 1,
      r"""autoFight""": 3,
      r"""playable""": 4,
      r"""welcome""": 0,
      r"""die""": 5,
    };

    pages = [
      /* PAGES & BLOCKS */
      // welcome
      [
        """# Thin Ice System (TIS) Testing """,
        """Note this is still very experimental, especially outside the command line interface. But it should work. """,
        {
          "string": r"""Play """,
          "goto": r"""interactiveTest"""
        },
        {
          "string": r"""Run automatic fight """,
          "goto": r"""autoFight"""
        },
        {
          "string": r"""Run tests """,
          "goto": r"""runTests"""
        }
      ],
      // interactiveTest
      [
        """You encounter a worthy opponent: a drunk man wearing a helmet! """,
        () {
  v_man = new Actor();
  v_man.moves.addAll(v_humanMoves);
  v_man.weapon = v_weaponHands;
  v_man.fighting = 0;
  v_man.names = ["the drunkard", "the drunk man", "the man"];
  v_man.on["sufferHit"].add((_this, e) { _this.report("<subject> looks very surprised"); });
  v_man.armors.add(v_armorHelmet);
        },
        """He charges at you! """,
        () {
  v_combat = new Combat();
  v_combat.actors.addAll([ v_player, v_man ]);

  start(v_combat);
        },
        """And that's the end of the fight! """
      ],
      // runTests
      [
        """Running tests & asserts. """,
        """Assert util functions. """,
        () {
  assert(countBits(0x0f) == 4);
  assert(countBits(0xff) == 8);
  assert(countBits(0xffff) == 16);
  assert(countBits(0xfffe) == 15);
  assert(countBits(0xffff&0xfffe) == 15);

  assert(capitalize("things") == "Things");
  assert(capitalize("/things") == "/things");

        },
        """Assert Storyline string functions. """,
        () {
  String str = "you {hit|punch} him in the face";
  String result = Storyline.resolveRandoms(str);
  print(result);
  assert(result == "you hit him in the face" || result == "you punch him in the face");
  str = "{you|thy} have my word, {Sir|Sire}";
  result = Storyline.resolveRandoms(str);
  print(result);
  assert(result.startsWith("you have") || result.startsWith("thy have"));
  assert(result.endsWith(", Sir") || result.endsWith(", Sire"));
  str = "{||blank }options";
  result = Storyline.resolveRandoms(str);
  print(result);
  assert(result == "options" || result == "blank options");
  str = "{||blank }options";
  result = Storyline.resolveRandoms(str);
  print(result);
  assert(result == "options" || result == "blank options");
  str = "{1|two|3} options";
  result = Storyline.resolveRandoms(str);
  print(result);
  assert(result == "1 options" || result == "two options" || result == "3 options");
  str = "{1|two|3} options";
  result = Storyline.resolveRandoms(str);
  print(result);
  assert(result == "1 options" || result == "two options" || result == "3 options");
  str = "{I am deeply {honoured|humbled}|You {honour|humble} me, Sire}.";
  result = Storyline.resolveRandoms(str);
  print(result);
  assert(result.startsWith("I am") || result.startsWith("You "));
  assert(result.endsWith("ed.") || result.endsWith("Sire."));
  str = "No tags.";
  result = Storyline.resolveRandoms(str);
  print(result);
  assert(result == str);
  str = "This is {not an option string}.";
  result = Storyline.resolveRandoms(str);
  print(result);
  assert(result == str);
  str = "{}malformed {} horrible string{}";
  result = Storyline.resolveRandoms(str);
  print(result);
  assert(result == str);
  str = "{unbalanced{g|er|e}";
  result = Storyline.resolveRandoms(str);
  print(result);
  assert(result == str);


  int countBelow = 0;
  for (int i = 0; i < 1000; i++) {
    double random = new Random().nextDouble();
    if (random < 0.1)
      countBelow++;
  }
  DEBUG("There were $countBelow throws (out of 1000) that resulted with less than 0.1.");
  assert(countBelow < 500);
  assert(countBelow < 200);


  Actor a = new Actor();
  Actor b = new Actor();
  b.stance = 19;
  assert(v_moveKickLegs.canContinue(a, b) == false);
  assert(v_moveKickLegs.isApplicable(a, b) == false);

        }
      ],
      // autoFight
      [
        """Asserting that more actors of the same type can take out less actors, most of the time. """,
        () {
  v_NUMBER_OF_RUNS = 10;
  v_teamOneWins = 0;
  v_teamTwoWins = 0;

  Function runTest = () {
    v_swarmer1 = new Actor();
    v_swarmer1.names = ["the first swarmer"];
    v_swarmer1.pronoun = Pronoun.IT;
    v_swarmer1.moves.addAll(v_humanMoves);
    v_swarmer1.team = 2;

    v_swarmer2 = new Actor();
    v_swarmer2.names = ["the second swarmer"];
    v_swarmer2.pronoun = Pronoun.IT;
    v_swarmer2.moves.addAll(v_humanMoves);
    v_swarmer2.team = 2;

    v_swarmer3 = new Actor();
    v_swarmer3.names = ["the third swarmer"];
    v_swarmer3.pronoun = Pronoun.IT;
    v_swarmer3.moves.addAll(v_humanMoves);
    v_swarmer3.team = 2;

    v_individual1 = new Actor();
    v_individual1.names = ["the first individual"];
    v_individual1.moves.addAll(v_humanMoves);
    v_individual1.team = 3;

    v_individual2 = new Actor();
    v_individual2.names = ["the second individual"];
    v_individual2.moves.addAll(v_humanMoves);
    v_individual2.team = 3;

    v_combat = new Combat();
    v_combat.actors.addAll([v_individual1, v_swarmer1, v_individual2, v_swarmer2, v_swarmer3]);
    v_combat.on["update"].add((combat) {
      if ((combat.time % 10) == 0)
        combat.storyline.add("it's 10 seconds later");
    });
    v_combat.start();
    v_combat.updateUntilInteraction();

    assert(v_combat.finished);
    assert((!v_swarmer1.alive && !v_swarmer2.alive && !v_swarmer3.alive) 
          || (!v_individual1.alive && !v_individual2.alive));

    DEBUG(v_combat.storyline.toString());

    if (v_individual1.alive || v_individual2.alive)
      v_teamTwoWins++;
    else
      v_teamOneWins++;
  };

  for (int i = 0; i < v_NUMBER_OF_RUNS; i++)
    runTest();
  DEBUG("Swarm vs Individual: $v_teamOneWins : $v_teamTwoWins");
  assert(v_teamOneWins > v_teamTwoWins);


        }
      ],
      // playable
      [
        () {
  v_wolf = new Actor();
  v_wolf.names = ["the orcling", "the orcling", "the young orcling"];
  v_wolf.pronoun = Pronoun.IT;
  v_wolf.moves.addAll(v_humanMoves);
  v_wolf.hitpoints = 2;
  v_wolf.speed = 1;

  v_orc = new Actor();
  v_orc.names = ["the orc", "the big orc", "the ugly orc"];
  v_orc.moves.addAll(v_humanMoves);
  v_combat = new Combat();
  v_combat.actors.addAll([v_wolf, v_orc,v_player]);
  v_combat.on["update"].add((combat) {
    if ((combat.time % 10) == 5)
      combat.storyline.add("a lonely bird beeps in the distance");
  });
  start(v_combat);
        },
        () {
  if (!v_player.alive)
    goto(1);
        },
        """Congratulations! You beat your first enemies! """
      ],
      // die
      [
        """You died like the bitch you are. """
      ]
    ];
  }
  /* INIT */
  void initBlock() {

    
      // MOVES
      // TODO: see http://en.wikipedia.org/wiki/Punch_(combat) for inspiration
      // http://www.eazycheezy.net/2010/04/how-to-throw-a-punch-by-guest-author-the-wolf.html
    
      // move: hit to stomach
      v_moveStomachPunch = new CombatMoveType(
          flags: CombatMoveType.MOVE_TRG_BODY|CombatMoveType.MOVE_FRM_FRONT
                |CombatMoveType.MOVE_LMB_HAND|CombatMoveType.MOVE_EFF_HITPOINTS
                |CombatMoveType.MOVE_PRI_DAMAGE|CombatMoveType.MOVE_DIR_OFFENSIVE,
          string: "hit to the stomach",
          choiceString: "hit <object> to the stomach",
          thirdPartyString: "<subject> {hit<s>|punch<es>} <object> to the stomach",
          duration: 4,
          recovery: 1,
          damage: 1,
          stanceDamage: 2,
          baseChanceToDodge: 0.1,
          baseChanceToBlock: 0.3
      );
    
      v_moveStomachPunch.isApplicable 
          = v_moveStomachPunch.canContinue 
          = (performer, target) => performer.stance >= 20 && target.stance >= 20; 
    
      // move: right hook
      v_moveRightHook = new CombatMoveType(
          flags: CombatMoveType.MOVE_TRG_HEAD|CombatMoveType.MOVE_FRM_RIGHT
                |CombatMoveType.MOVE_LMB_HAND|CombatMoveType.MOVE_EFF_HITPOINTS
                |CombatMoveType.MOVE_PRI_DAMAGE|CombatMoveType.MOVE_DIR_OFFENSIVE,
          string: "right hook",
          choiceString: "punch <object> in the head with <subject's> right hook",
          thirdPartyString: "<subject> {hit<s>|punch<es>} <object> in the {face|head} with <subject's> right hook",
          duration: 6,
          recovery: 1,
          damage: 2,
          stanceDamage: 8,
          baseChanceToDodge: 0.4,
          baseChanceToBlock: 0.4,
          fightingMod: -1
      );
    
      v_moveRightHook.isApplicable 
          = v_moveRightHook.canContinue 
          = (performer, target) => performer.stance >= 20 && target.stance >= 10; 
    
      v_moveRightHook.on["hit"].addFirst((_this, e) {
          e.performer.report("{Boom|Thump}!", wholeSentence:true);
      });
    
      // move: jab
      v_moveJab = new CombatMoveType(
          flags: CombatMoveType.MOVE_TRG_BODY|CombatMoveType.MOVE_FRM_FRONT
                |CombatMoveType.MOVE_LMB_HAND|CombatMoveType.MOVE_EFF_STANCE
                |CombatMoveType.MOVE_PRI_QUICK|CombatMoveType.MOVE_DIR_OFFENSIVE,
          string: "jab at face",
          choiceString: "quickly jab at <object's> face",
          thirdPartyString: "<subject> {{lightly|quickly} jab<s>|throw<s> a {light|quick} jab} at <object's> {face|head}",
          duration: 2,
          recovery: 1,
          damage: 0,
          stanceDamage: 3,
          baseChanceToDodge: 0.1,
          baseChanceToBlock: 0.3
      );
    
      v_moveJab.isApplicable 
          = v_moveJab.canContinue 
          = (performer, target) => performer.stance >= 20 && target.stance >= 10; 
    
    
      // move: punch in groin
      v_moveGroinPunch = new CombatMoveType(
          flags: CombatMoveType.MOVE_TRG_WAIST|CombatMoveType.MOVE_FRM_FRONT
                |CombatMoveType.MOVE_LMB_HAND|CombatMoveType.MOVE_EFF_HITPOINTS
                |CombatMoveType.MOVE_PRI_DAMAGE|CombatMoveType.MOVE_DIR_OFFENSIVE,
          string: "hit to the groin",
          choiceString: "punch <object> {in the groin|between the legs|into the genitals}",
          thirdPartyString: "<subject> {hit<s>|punch<es>} <object> {in the groin|between the legs|into the genitals}",
          duration: 4,
          recovery: 2,
          damage: 5,
          stanceDamage: 5,
          baseChanceToDodge: 0.4,
          baseChanceToBlock: 0.7
      );
    
      v_moveGroinPunch.isApplicable 
          = v_moveGroinPunch.canContinue 
          = (performer, target) => performer.stance >= 10 && target.stance >= 20; 
    
      // move: kick legs
      v_moveKickLegs = new CombatMoveType(
          flags: CombatMoveType.MOVE_TRG_LEGS|CombatMoveType.MOVE_FRM_RIGHT
                |CombatMoveType.MOVE_LMB_LEG|CombatMoveType.MOVE_EFF_STANCE
                |CombatMoveType.MOVE_PRI_DAMAGE|CombatMoveType.MOVE_DIR_OFFENSIVE,
        string: "kick to the legs",
        choiceString: "kick <object's> legs",
        thirdPartyString: "<subject> kick<s> <object's> legs",
        duration: 6,
        recovery: 2,
        damage: 0,
        stanceDamage: 15,
        baseChanceToDodge: 0.2,
        baseChanceToBlock: 0.2,
        fightingMod: -1
      );
    
      v_moveKickLegs.isApplicable 
          = v_moveKickLegs.canContinue 
          = (performer, target) => performer.stance >= 30 && target.stance >= 20;
    
      // move: kick in groin
    
      // move: undercut legs
      v_moveFootSweep = new CombatMoveType(
          flags: CombatMoveType.MOVE_TRG_LEGS|CombatMoveType.MOVE_FRM_RIGHT
                |CombatMoveType.MOVE_LMB_LEG|CombatMoveType.MOVE_EFF_STANCE
                |CombatMoveType.MOVE_PRI_DAMAGE|CombatMoveType.MOVE_DIR_OFFENSIVE,
          string: "foot sweep",
          choiceString: "sweep <object's> feet",
          thirdPartyString: "<subject> {undercut<s>|sweep<s>} <object's> legs",
          duration: 6,
          recovery: 4,
          stanceDamage: 31,
          baseChanceToDodge: 0.4,
          baseChanceToBlock: 0.2,
          fightingMod: -1
      );
    
      v_moveFootSweep.on["hit"].add((_this, e) {
          if (e.target.currentMove != null) {
            // TODO: report
            e.target.currentMove.on["cancel"].dispatchAll(new CombatEvent.fromMove(e.target.currentMove));
            e.target.currentMove = null;
          }
      });
    
      v_moveFootSweep.isApplicable = v_moveFootSweep.canContinue = (performer, target) {
        return performer.stance >= 10 && target.stance >= 20;
      };
      
      // move: kick on ground
      v_moveKickOnGround = new CombatMoveType(
          flags: CombatMoveType.MOVE_TRG_BODY|CombatMoveType.MOVE_FRM_FRONT
                |CombatMoveType.MOVE_LMB_LEG|CombatMoveType.MOVE_EFF_HITPOINTS
                |CombatMoveType.MOVE_PRI_DAMAGE|CombatMoveType.MOVE_DIR_OFFENSIVE,
          string: "kick",
          choiceString: "kick <object> while on the ground",
          thirdPartyString: "<subject> kick<s> <object> {|while }on the ground",
          duration: 4,
          recovery: 3,
          damage: 3,
          stanceDamage: 10,
          baseChanceToDodge: 0.2,
          baseChanceToBlock: 0.4
      );
    
      v_moveKickOnGround.isApplicable 
          = v_moveKickOnGround.canContinue = (performer, target) {
        return performer.stance >= 20 && target.stance < 20;
      };
    
      // move: defend
      v_moveStepBack = new CombatMoveType(
          flags: CombatMoveType.MOVE_DIR_DEFENSIVE|CombatMoveType.MOVE_LMB_LEG
                |CombatMoveType.MOVE_LMB_HAND,
          string: "step back",
          choiceString: "focus on defense",
          thirdPartyString: "<subject> {{withdraw<s>|back<s> away} {a little|a bit|a little bit}|give<s> a {|little} bit of ground}",
          duration: 5,
          recovery: 0,
          fightingMod: +1
      );
    
      v_moveStepBack.isApplicable = v_moveStepBack.canContinue 
          = (performer, target) => performer.stance >= 20;
    
      v_moveStepBack.on["start"].replaceAllWith((_this, e) {
          e.performer.report(_this.thirdPartyString);
      });
    
      v_moveStepBack.on["end"].replaceAllWith((_this, e) {
          e.performer.stance += 10;
      });
    
      // move: counter
      v_moveBasicParryHand = new CombatMoveType(
          flags: CombatMoveType.MOVE_DIR_DEFENSIVE|CombatMoveType.MOVE_LMB_HAND,
          string: "parry",
          choiceString: "parry <object's> move",
          thirdPartyString: "<subject> {gather<s>|brace<s>} to parry <object's> {attack|move}",
          duration: 3,
          recovery: 1,
          fightingMod: +1
      );
    
      v_moveBasicParryHand.isApplicable = (performer, target) {
        return performer.stance >= 10 && target.currentMove != null
                && target.tillEndOfMove > 3
                && target.currentMove.type.isOffensive
                && target.target == performer
                && target.currentMove.type.hasFlag(CombatMoveType.MOVE_LMB_HAND);
      };
      
      v_moveBasicParryHand.canContinue = (performer, target) {
        return performer.stance >= 10 && target.currentMove != null;
      };
    
      v_moveBasicParryHand.on["end"].add((_this, e) {
          // parrying gives one other chance to block||dodge before the blow even lands 
          double chanceToParry = 1 - e.target.currentMove.type.computeChanceToHit(e.target, e.performer);
          if (new Random().nextDouble() < chanceToParry) {
            // PARRIED
            e.performer.report("<subject> {stop<s>|intercept<s>} <object's> ${e.target.currentMove.type.string} which gives ${e.performer.pronoun.accusative} a chance to counter-attack.", object:e.target, wholeSentence:true);
            e.target.currentMove = null;
            e.target.tillEndOfMove = 4;
          } else {
            // NOT PARRIED
            e.performer.report("<subject's> {try|attempt} to parry <object's> ${e.target.currentMove.type.string} {fails|is unsuccessful|doesn't work out}", object:e.target, negative:true);
          }
      });
    
      v_moveBasicParryHand.computeSuitability = (Actor performer, Actor target) {
        return 100; // when this move is isApplicable, it's probably a good idea to use it
      };
    
      // TODO: ^^ different for arms and for legs - hold leg, hold arm
      
      // move: advanced parry (only advanced fighters can do this)
    
      // move: stand up
      v_moveStandUp = new CombatMoveType(
          flags: CombatMoveType.MOVE_DIR_DEFENSIVE|CombatMoveType.MOVE_LMB_LEG,
          string: "stand up",
          choiceString: "stand up",
          thirdPartyString: "<subject> {stand<s> up|{rise<s>|get<s>} to <subject's> feet|get<s> up}",
          duration: 8,
          recovery: 0,
          fightingMod: -1
      );
    
      v_moveStandUp.isApplicable 
          = (performer, target) => performer.stance < 20;
    
      v_moveStandUp.on["update"].add((_this, e) {
        // first few timesteps the actor is gathering - his stance doesn't rise yet
        if (e.performer.tillEndOfMove <= (_this.duration / 2).toInt()) { 
          e.performer.stance += 4;
        }
      });
    
      v_moveStandUp.on["start"].replaceAllWith((_this, e) {
          String again = (e.performer.previousMove == _this) ? " again" : "";
          e.performer.report("<subject> {gather<s>|begin<s>|tr<ies>} to stand up$again");
      });
    
      v_moveStandUp.on["end"].replaceAllWith((_this, e) {
          e.performer.stance += 10;
      });
    
      v_moveStandUp.computeSuitability = (Actor performer, Actor target) {
        return 100; // when this move is isApplicable, it's probably a good idea to use it
      };
    
      // move: roll out
      v_moveRollOut = new CombatMoveType(
          flags: CombatMoveType.MOVE_DIR_DEFENSIVE,
          string: "roll",
          choiceString: "roll out of the way",
          thirdPartyString: "<subject> roll<s> {out|away} of <object's> {way|reach}",
          duration: 3,
          recovery: 1,
          fightingMod: -1
      );
    
      v_moveRollOut.isApplicable 
          = (performer, target) => performer.stance < 10;
    
      v_moveRollOut.on["end"].replaceAllWith((_this, e) {
          e.performer.report("<subject> {{end<s>|finish<es>} <subject's> roll|roll<s> a bit out of the way}", positive:true);
          if (e.target.currentMove != null 
              && e.target.currentMove.type.duration - e.target.tillEndOfMove >= 3) {
            e.target.currentMove.on["cancel"].dispatchAll(new CombatEvent.fromMove(e.target.currentMove));
            e.target.currentMove = null;
          }
          e.performer.stance += 10;
      });
    
      v_moveRollOut.computeSuitability = (Actor performer, Actor target) {
        return 100; // when this move is isApplicable, it's probably a good idea to use it
      };
    
      // move: roll under his legs
    
    
      // TODO: sword weapon + 2 basic moves
    
      v_moveSlash = new CombatMoveType(
          flags: CombatMoveType.MOVE_TRG_BODY|CombatMoveType.MOVE_FRM_RIGHT
                |CombatMoveType.MOVE_LMB_HAND|CombatMoveType.MOVE_EFF_HITPOINTS
                |CombatMoveType.MOVE_PRI_DAMAGE|CombatMoveType.MOVE_DIR_OFFENSIVE,
          string: "slash",
          choiceString: "slash <object's> body",
          thirdPartyString: "<subject> slash<es> <object's> body",
          duration: 5,
          recovery: 3,
          damage: 10,
          stanceDamage: 5,
          baseChanceToDodge: 0.4,
          baseChanceToBlock: 0.7,
          fightingMod: -1
      );
    
      v_humanMoves = [
          v_moveStomachPunch,
          v_moveRightHook,
          v_moveJab,
          v_moveKickLegs,
          v_moveFootSweep,
          v_moveKickOnGround,
          v_moveStepBack,
          v_moveStandUp,
          v_moveBasicParryHand,
          v_moveGroinPunch,
          v_moveRollOut
      ];
    
      // WEAPONS
    
      // TODO: create HandsCutOff and OneHandCutOff
      // TODO: weapons have pointer to the weapon they become when pirced
      // weapon: bare hands
      v_weaponHands = new WeaponType(
          name: "hand",
          piercing: 0,
          hardness: 0
      );
    
      // weapon: stick / baseball bat
    
      // weapon: steel rod
    
      // weapon: sword
      v_weaponSword = new WeaponType(
          name: "sword",
          piercing: 3,
          hardness: 3
      );
    
    
      // ARMORS
    
      // armor: clothes
      v_armorClothes = new ArmorType(
          name: "clothes",
          hardness: 0
      );
    
      v_armorHelmet = new ArmorType(
          name: "helmet",
          hardness: 1,
          coveringTargets: CombatMoveType.MOVE_TRG_HEAD
      );
    
      v_player = new Player();
      v_player.moves.addAll(v_humanMoves);
      v_player.weapon = v_weaponHands;
      //v_player.weapon = v_weaponSword;
    
      v_player.fighting = 1;

  }
}
