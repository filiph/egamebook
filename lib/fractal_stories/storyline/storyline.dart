library storyline;

import 'dart:math';
import 'package:logging/logging.dart';
import 'package:meta/meta.dart';

import '../team.dart';
import 'randomly.dart';

part 'storyline_entity.dart';
part 'storyline_pronoun.dart';

final Logger log = new Logger('Storyline');

/// A single report about an event, atomic part of a story. It can be "John
/// picks up a shovel", "John approaches Jack" or "Jack is dead".
///
/// These events are stringed together by [Storyline] to create a coherent,
/// naturally sounding narrative.
class Report {
  final String string;

  final Entity subject;

  final Entity object;
  final Entity owner;
  final Entity objectOwner;
  bool but;
  final bool positive;
  final bool negative;
  final bool subjectAndObjectAreEnemies;
  final bool endSentence;
  final bool startSentence;
  final bool wholeSentence;

  /// A unique identifier of a thread of events that belong together. This is
  /// used with [isSupportiveActionInThread] but can also work as a hint for
  /// the document planner.
  final int actionThread;

  /// This report will not be shown when report with same [actionThread] is
  /// right next to this one.
  ///
  /// This is useful when you have a report such as "You start aiming at the
  /// enemy" and another one that says "You shoot at the enemy". When there is
  /// additional action between those two reports, it makes sense to keep both.
  /// But when they're reported side by side, it doesn't read well.
  final bool isSupportiveActionInThread;

  final int time;

  Report(this.string,
      {this.subject,
      this.object,
      this.owner,
      this.objectOwner,
      this.but: false,
      this.positive: false,
      this.negative: false,
      this.subjectAndObjectAreEnemies: false,
      this.endSentence: false,
      this.startSentence: false,
      this.wholeSentence: false,
      this.actionThread,
      this.isSupportiveActionInThread: false,
      this.time});
  Report.empty()
      : string = "",
        subject = null,
        object = null,
        owner = null,
        objectOwner = null,
        but = false,
        positive = false,
        negative = false,
        subjectAndObjectAreEnemies = false,
        endSentence = false,
        startSentence = false,
        wholeSentence = false,
        actionThread = null,
        isSupportiveActionInThread = false,
        time = null;

  @deprecated
  dynamic operator [](String key) {
    // TODO: get rid of Report field accessed via inefficient [] operator
    switch (key) {
      case 'string':
        return string;
      case 'subject':
        return subject;
      case 'object':
        return object;
      case 'owner':
        return owner;
      case 'but':
        return but;
      case 'positive':
        return positive;
      case 'negative':
        return negative;
      case 'endSentence':
        return endSentence;
      case 'startSentence':
        return startSentence;
      case 'wholeSentence':
        return wholeSentence;
      case 'time':
        return time;
      default:
        throw new ArgumentError("Invalid key $key.");
    }
  }

  @override
  String toString() => "Report"
      "<${string.substring(0, min(string.length, 20))}...,"
      "thread=$actionThread${isSupportiveActionInThread ? '(sup)' : ''}>";

// TODO: startOfAction - if there is no report before startOfAction and
// endOfAction, don't report startOfAction.
// Prevents: "You set up the laser. The laser is now set up to fire at target."
}

/// Class for reporting a sequence of events in 'natural' language.
class Storyline {
  static const String SUBJECT = "<subject>";
  static const String SUBJECT_POSSESIVE = "<subject's>";

  static const String OWNER = "<owner>";
  static const String OWNER_POSSESIVE = "<owner's>";
  static const String OBJECT_OWNER = "<object-owner>";
  static const String OBJECT_OWNER_POSSESIVE = "<object-owner's>";
  static const String OBJECT = "<object>";
  static const String OBJECT_POSSESIVE = "<object's>";
  static const String SUBJECT_PRONOUN = "<subjectPronoun>";
  static const String SUBJECT_PRONOUN_POSSESIVE = "<subjectPronoun's>";
  static const String SUBJECT_PRONOUN_SELF = "<subjectPronounSelf>";
  static const String SUBJECT_NOUN = "<subjectNoun>";
  static const String OBJECT_PRONOUN = "<objectPronoun>";
  static const String OBJECT_PRONOUN_POSSESIVE = "<objectPronoun's>";
  static const String OWNER_PRONOUN = "<ownerPronoun>";
  static const String OWNER_PRONOUN_POSSESIVE = "<ownerPronoun's>";
  static const String OBJECT_OWNER_PRONOUN = "<object-ownerPronoun>";
  static const String OBJECT_OWNER_PRONOUN_POSSESIVE =
      "<object-ownerPronoun's>";
  static const String ACTION = "<action>";
  static const String VERB_S = "<s>";
  static const String VERB_ES = "<es>";
  static const String VERB_SSES = "<sses>";
  static const String VERB_IES = "<ies>";
  // e.g. in "goes"
  static const String VERB_DO = "<does>";
  // e.g. in "tries", "flies"
  static const String VERB_BE = "<is>";
  static const String VERB_HAVE = "<has>";
  static final RegExp QUOTE_INTERPUNCTION_DUPLICATION =
      new RegExp(r'''(\w)([\.\?\!])(["'])\.(?=$|\s)''');
  static const String PARAGRAPH_NEWLINES = "\n\n";

  static const int SHORT_TIME = 4;

  static const int VERY_LONG_TIME = 1000;

  static const _beginningOfTime = -1;

  static const _endOfTime = 9999999;

  final List<Report> reports = new List<Report>();

  int time = 0;

  /// This map tracks the times when each entity (its [Entity.id]) was first
  /// mentioned. If this is lower than the current report's [time], the entity
  /// can use a definitive artice (the book), otherwise it needs an indefinite
  /// article (a book).
  ///
  /// Why not just [bool] instead of [int]? Because we want to be able to
  /// correctly realize a [Storyline] several times in a row. If we kept
  /// track of first mentions as booleans, once an entity was mentioned, it
  /// would then forever appear as "mentioned from the beginning".
  final Map<int, int> _firstMentions = {};

  Storyline();

  @visibleForTesting
  bool get hasManyParagraphs =>
      reports.any((r) => r.string == PARAGRAPH_NEWLINES);

  /// Add another event to the story.
  ///
  /// When [str] ends with [:.:] or [:!:] or [:?:] and starts with a capital
  /// letter, [wholeSentence] will automatically be [:true:] for convenience.
  void add(String str,
      {Entity subject,
      Entity object,
      Entity owner,
      Entity objectOwner,
      bool but: false,
      bool positive: false,
      bool negative: false,
      bool subjectAndObjectAreEnemies: false,
      bool endSentence: false,
      bool startSentence: false,
      bool wholeSentence: false,
      int actionThread,
      bool isSupportiveActionInThread: false,
      int time}) {
    if (str == null || str == "") {
      // Ignore empty records.
      return;
    }

    assert(
        subject != null || !str.contains("<subject"), "'$str' lacks subject");
    assert(object != null || !str.contains("<object"), "'$str' lacks object");

    bool wholeSentenceAutoDetected =
        (str.endsWith(".") || str.endsWith("!") || str.endsWith("?")) &&
            str.startsWith(new RegExp("[A-Z]"));

    reports.add(new Report(str,
        subject: subject,
        object: object,
        owner: owner,
        objectOwner: objectOwner,
        but: but,
        positive: positive,
        negative: negative,
        subjectAndObjectAreEnemies: subjectAndObjectAreEnemies,
        endSentence: endSentence,
        startSentence: startSentence,
        wholeSentence: wholeSentenceAutoDetected ? true : wholeSentence,
        actionThread: actionThread,
        isSupportiveActionInThread: isSupportiveActionInThread,
        time: time ?? this.time));
  }

  /// Add a sentence (or more) enumerating several things ([articles]) at once.
  /// Example: "You can see a handkerchief, a brush and a mirror here."
  /// You can provide "<also>" for a more human-like enumeration.
  void addEnumeration(String start, Iterable<Entity> articles, String end,
      {Entity subject,
      Entity object,
      Entity owner,
      int maxPerSentence: 3,
      String conjuction: "and"}) {
    assert(start != null);
    assert(articles != null);
    if (articles.length == 0) {
      // Don't create any report.
      return;
    }
    StringBuffer buf = new StringBuffer();

    String removeAlso(String s) =>
        s.replaceAll("<also> ", "").replaceAll("  ", " ").trim();
    // TODO: less hacky

    buf.write(removeAlso(start)); // TODO: less hacky
    buf.write(" ");
    int i = 0;
    int sentenceCount = 0;
    for (Entity article in articles) {
      if (i > 0) {
        if (i == 1 && article == articles.last) {
          buf.write(" ");
          buf.write(conjuction);
        } else if (i == maxPerSentence - 1) {
          buf.write(", $conjuction");
        } else {
          buf.write(",");
        }
        buf.write(" ");
      }

      // Adds 'the', 'a', or nothing. TODO: instead of using the
      // addParticleToFirstOccurence method (designed for longer texts), use
      // something smaller.
      String articleWithParticle = addParticleToFirstOccurence(
          article.name, article.name, article, null, time);
      buf.write(articleWithParticle);
      i++;
      if (i > maxPerSentence - 1 || article == articles.last) {
        if (end != null) {
          buf.write(" ");
          if (sentenceCount == 0) {
            buf.write(removeAlso(end));
          } else {
            buf.write(end.replaceAll("<also>", "also"));
          }
        }
        buf.write(".");
        add(buf.toString(),
            subject: subject,
            object: object,
            owner: owner,
            wholeSentence: true);
        sentenceCount++;
        i = 0;
        buf.clear();
        buf.write(start.replaceAll("<also>", "also"));
        buf.write(" ");
      }
    }
  }

  void addParagraph() => add(PARAGRAPH_NEWLINES, wholeSentence: true);

  /// Adds [:the:] or [:a:] to first occurence of [SUB_STRING] (like
  /// [:<subject>:]) in [string]. The next occurences will be automatically
  /// converted to pronouns.
  ///
  /// The [reportTime] should correspond to the time this report is being said.
  /// Storyline tracks when different entities were first mentioned so it
  /// can apply either definitive (the) or indefinite (a) article.
  String addParticleToFirstOccurence(String string, String SUB_STRING,
      Entity entity, Entity entityOwner, int reportTime) {
    // Make sure we don't add particles to "your car" etc.
    if (entityOwner != null &&
        (string.indexOf("$OWNER_POSSESIVE $SUB_STRING") != -1 ||
            string.indexOf("$OWNER_PRONOUN_POSSESIVE $SUB_STRING") != -1 ||
            string.indexOf("$OBJECT_OWNER_POSSESIVE $SUB_STRING") != -1 ||
            string.indexOf("$OBJECT_OWNER_PRONOUN_POSSESIVE $SUB_STRING") !=
                -1)) {
      return string;
    }

    String stringWithParticle;

    if (!entity.nameIsProperNoun) {
      if (_hasBeenMentioned(entity, reportTime)) {
        stringWithParticle = string.replaceFirst(SUB_STRING, "the $SUB_STRING");
      } else {
        if (entity.name
            .startsWith(new RegExp(r"[aeiouy]", caseSensitive: false))) {
          stringWithParticle =
              string.replaceFirst(SUB_STRING, "an $SUB_STRING");
        } else {
          stringWithParticle = string.replaceFirst(SUB_STRING, "a $SUB_STRING");
        }
        _firstMentions[entity.id] = reportTime;
      }
    }
    return stringWithParticle ?? string;
  }

  void clear() {
    reports.clear();
  }

  /// Appends [other] storyline to this one.
  void concatenate(Storyline other) {
    reports.addAll(other.reports);
  }

  bool exchangedSubjectObject(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    if (reports[i].subject == null || reports[j].subject == null) return false;
    if (reports[i].object == null || reports[j].object == null) return false;
    return reports[i].subject.id == reports[j].object.id &&
        reports[i].object.id == reports[j].subject.id;
  }

  /// Returns an iterable of all the entities present in given report.
  Iterable<Entity> getAllEntities(int i) sync* {
    if (!valid(i)) return;
    var report = reports[i];
    if (report.subject != null) yield report.subject;
    if (report.object != null) yield report.object;
    if (report.owner != null) yield report.owner;
    if (report.objectOwner != null) yield report.objectOwner;
  }

  /// Takes care of substitution of stopwords. Called by substitute().
  String getString(String str, Report report) {
    Entity subject = report.subject;
    Entity object = report.object;
    Entity owner = report.owner;
    Entity objectOwner = report.objectOwner;

    String result = str;

    if (subject != null) {
      if (subject.isPlayer) {
        // don't talk like a robot: "player attack wolf" -> "you attack wolf"
        result = result.replaceAll(SUBJECT, Pronoun.YOU.nominative);
        result = result.replaceAll(SUBJECT_POSSESIVE, Pronoun.YOU.genitive);
      }

      if (subject.pronoun == Pronoun.YOU || subject.pronoun == Pronoun.THEY) {
        // "you fly there", "they pick up the bananas" ...
        result = result.replaceAll(VERB_S, "");
        result = result.replaceAll(VERB_ES, "");
        result = result.replaceAll(VERB_SSES, "ss");
        result = result.replaceAll(VERB_IES, "y");
        result = result.replaceAll(VERB_DO, "do");
        result = result.replaceAll(VERB_BE, "are");
        result = result.replaceAll(VERB_HAVE, "have");
      } else {
        // "he flies there", "it picks up the bananas" ...
        result = result.replaceAll(VERB_S, "s");
        result = result.replaceAll(VERB_ES, "es");
        result = result.replaceAll(VERB_SSES, "sses");
        result = result.replaceAll(VERB_IES, "ies");
        result = result.replaceAll(VERB_DO, "does");
        result = result.replaceAll(VERB_BE, "is");
        result = result.replaceAll(VERB_HAVE, "has");
      }

      result = result.replaceFirst(SUBJECT, SUBJECT_NOUN);
      result = result.replaceAll(SUBJECT, subject.pronoun.nominative);

      result = addParticleToFirstOccurence(
          result, SUBJECT_NOUN, subject, owner, report.time);
      result = result.replaceFirst(SUBJECT_NOUN, subject.name);

      result = result.replaceAll(SUBJECT_PRONOUN, subject.pronoun.nominative);
      if (str.contains(new RegExp("$SUBJECT.+$SUBJECT_POSSESIVE"))) {
        // "actor takes his weapon"
        result = result.replaceAll(SUBJECT_POSSESIVE, subject.pronoun.genitive);
      }
      result = addParticleToFirstOccurence(
          result, SUBJECT_POSSESIVE, subject, owner, report.time);
      result = result.replaceFirst(SUBJECT_POSSESIVE, "${subject.name}'s");
      result = result.replaceAll(SUBJECT_POSSESIVE, subject.pronoun.genitive);
      result = result.replaceAll(
          SUBJECT_PRONOUN_POSSESIVE, subject.pronoun.genitive);
      result = result.replaceAll(SUBJECT_PRONOUN_SELF, subject.pronoun.self);
    }

    if (object != null) {
      if (object.isPlayer) {
        result = result.replaceAll(OBJECT, Pronoun.YOU.accusative);
        result = result.replaceAll(OBJECT_POSSESIVE, Pronoun.YOU.genitive);
      } else {
        result = addParticleToFirstOccurence(
            result, OBJECT, object, objectOwner, report.time);
        result = result.replaceAll(OBJECT, object.name);
        // TODO: change first to name, next to pronoun?
      }
      result = result.replaceAll(OBJECT_PRONOUN, object.pronoun.accusative);
      if (str.contains(new RegExp("$OBJECT.+$OBJECT_POSSESIVE"))) {
        // "actor takes his weapon"
        result = result.replaceAll(OBJECT_POSSESIVE, object.pronoun.genitive);
      }
      result = addParticleToFirstOccurence(
          result, OBJECT_POSSESIVE, object, objectOwner, report.time);
      result = result.replaceFirst(OBJECT_POSSESIVE, "${object.name}'s");
      result = result.replaceAll(OBJECT_POSSESIVE, object.pronoun.genitive);
      result =
          result.replaceAll(OBJECT_PRONOUN_POSSESIVE, object.pronoun.genitive);
    }
    result = _realizeOwner(owner, result, str, OWNER, OWNER_POSSESIVE,
        OWNER_PRONOUN, OWNER_PRONOUN_POSSESIVE, report.time);
    result = _realizeOwner(
        objectOwner,
        result,
        str,
        OBJECT_OWNER,
        OBJECT_OWNER_POSSESIVE,
        OBJECT_OWNER_PRONOUN,
        OBJECT_OWNER_PRONOUN_POSSESIVE,
        report.time);

    return result;
  }

  /// When an entity should start the storyline as unmentioned, call this
  /// method.
  ///
  /// Unmentioned entities get the indefinite article ('a book') the first
  /// time they are mentioned.
  ///
  /// By default, all entities start as mentioned. This is because very often
  /// you want to introduce entities in custom prose, and then refer to them
  /// later in [Storyline].
  ///
  /// For example, you want to say "There is a book on the table." Then,
  /// when [Storyline] refers to the book, it should probably say something like
  /// "take the book" (and not "take a book"). It is only in rare circumstances
  /// that you want to _start_ talking about an entity in Storyline. And for
  /// that there is this method.
  void markEntityAsUnmentioned(Entity entity) {
    _firstMentions[entity.id] = _endOfTime;
  }

  Entity object(int i) {
    if (i < 0 || i >= reports.length)
      return null;
    else
      return reports[i].object;
  }

  bool oppositeSentiment(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    // subject(i) == object(j), both have same sentiment => opposite sentiment
    if (exchangedSubjectObject(i, j) &&
        reports[i].subjectAndObjectAreEnemies &&
        reports[j].subjectAndObjectAreEnemies) {
      if (reports[i].positive && reports[j].positive) return true;
      if (reports[i].negative && reports[j].negative) return true;
    }
    return false;
  }

  /// If storyline already has something to show (at least one full
  /// paragraph), this will output it through [printFunction] and remove it.
  ///
  /// Returns `true` if any paragraphs were output.
  bool outputFinishedParagraphs(void printFunction(Object msg)) {
    var printed = false;
    while (hasManyParagraphs) {
      printFunction(realize(onlyFirstParagraph: true));
      removeFirstParagraph();
      printed = true;
    }
    return printed;
  }

  /// The main function that strings reports together into a coherent story.
  ///
  /// When [onlyFirstParagraph] is `true`, this will only realize the first
  /// paragraph and will leave the rest of the reports for later.
  String realize({bool onlyFirstParagraph: false}) {
    StringBuffer strBuf = new StringBuffer();
    List<Report> cleanedReports =
        reports.fold([], (List<Report> list, Report report) {
      Report previousReport = list.isNotEmpty ? list.last : null;
      if (previousReport != null &&
          previousReport.isSupportiveActionInThread &&
          report.actionThread == previousReport.actionThread) {
        // Skip the Report that is supportive and is next to another report
        // of the same actionThread.
        list[list.length - 1] = report;
      } else {
        list.add(report);
      }
      return list;
    });
    reports.retainWhere((Report report) => cleanedReports.contains(report));
    final int length = onlyFirstParagraph && hasManyParagraphs
        ? reports.indexOf(
                reports.firstWhere((r) => r.string == PARAGRAPH_NEWLINES)) +
            1
        : reports.length;
    if (length < 1) return "";
    final int MAX_SENTENCE_LENGTH = 3;
    int lastEndSentence = -1;
    bool endPreviousSentence = true; // previous sentence was ended
    bool endThisSentence = false; // this sentence needs to be ended
    bool but = false; // this next sentence needs to start with but
    for (int i = 0; i < length; i++) {
      // TODO: look into future - make sentences like "Although __, __"
      // TODO: ^^ can be done by 2 for loops
      // TODO: add "while you're still sweeping your legs" when it's been a long time since we said that
      // TODO: glue sentences together first (look ahead, optimize)
      if (i != 0) {
        // solve flow with previous sentence
        bool objectSubjectSwitch = exchangedSubjectObject(i - 1, i);
        but = (reports[i].but ||
                (oppositeSentiment(i, i - 1) && someActorsSame(i, i - 1))) &&
            !reports[i - 1].but;
        reports[i].but = but;
        endPreviousSentence = (i - lastEndSentence >= MAX_SENTENCE_LENGTH) ||
            endThisSentence ||
            reports[i].startSentence ||
            reports[i - 1].endSentence ||
            reports[i].wholeSentence ||
            // TODO: add possibility to continue sentence even when
            //       object-subject switch is partial (but the second object
            //       must be something like an item)
            !(_sameSubject(i, i - 1) || objectSubjectSwitch) ||
            (but && (i - lastEndSentence > 1)) ||
            (but && reports[i - 1].but) ||
            (timeSincePrevious(i) > SHORT_TIME);
        endThisSentence = false;

        if (endPreviousSentence) {
          if (reports[i - 1].wholeSentence) // don't write period after "Boom!"
            strBuf.write(" ");
          else
            strBuf.write(". ");
          if (but && !reports[i].wholeSentence) strBuf.write("But ");
        } else {
          // let's try and glue [i-1] and [i] into one sentence
          if (but) {
            strBuf.write(
                Randomly.choose([" but ", " but ", /*" yet ",*/ ", but "]));
            if (!sameSentiment(i, i + 1)) endThisSentence = true;
          } else {
            // TODO: add ", " but only when we can be sure it's not in the end of the sentence
            strBuf.write(Randomly.choose([" and ", " and ", ", and "]));
            endThisSentence = true;
          }
        }
      }

      String randomReport = string(i);

      // Resolve randomness first.
      String report = Randomly.parse(randomReport);
      if (report.contains('{') || report.contains('}')) {
        log.severe('Storyline result includes { and/or } even after being '
            'parsed by Randomly. Is there a dangling bracket here? '
            'Input = """$randomReport""" Output = """$report"""');
      }

      // clear subjects when e.g. "Wolf hits you, it growls, it strikes again."
      if (!endPreviousSentence &&
          _sameSubject(i, i - 1) &&
          string(i - 1).startsWith("$SUBJECT ") &&
          report.startsWith("$SUBJECT ")) {
        report = report.replaceFirst("$SUBJECT ", "");
      }

      report = substitute(i, report);

      if ((endPreviousSentence || i == 0) && !but) report = capitalize(report);

      // add the actual report
      strBuf.write(report);

      // set variables for next iteration
      if (endPreviousSentence) lastEndSentence = i;
      if (reports[i].wholeSentence) endThisSentence = true;
    }

    // add last dot
    if (!reports[length - 1].wholeSentence) strBuf.write(".");

    String s = strBuf.toString();

    // Fix extra dots after quotes.
    s = s.replaceAllMapped(QUOTE_INTERPUNCTION_DUPLICATION, (Match m) {
      return "${m[1]}${m[2]}${m[3]}";
    });

    return s;
  }

  @visibleForTesting
  void removeFirstParagraph() {
    if (!hasManyParagraphs) {
      reports.clear();
      return;
    }
    reports.removeRange(
        0,
        reports.indexOf(
                reports.firstWhere((r) => r.string == PARAGRAPH_NEWLINES)) +
            1);
  }

  bool sameSentiment(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    // subject(i) == object(j), opposite sentiments => same sentiment
    if (exchangedSubjectObject(i, j) &&
        reports[i].subjectAndObjectAreEnemies &&
        reports[j].subjectAndObjectAreEnemies) {
      if (reports[i].positive && reports[j].negative) return true;
      if (reports[i].negative && reports[j].positive) return true;
    }
    if (!_sameSubject(i, j)) return false;
    if (reports[i].positive && reports[j].positive) return true;
    if (reports[i].negative && reports[j].negative)
      return true;
    else
      return false;
  }

  /// Returns true if there is at least one entity that appears both in
  /// report[i] and in report[j], regardless of position
  /// (subject, object, owner, ...).
  bool someActorsSame(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    for (var a in getAllEntities(i)) {
      for (var b in getAllEntities(j)) {
        if (a.id == b.id) return true;
      }
    }
    return false;
  }

  String string(int i) {
    if (i < 0 || i >= reports.length)
      return null;
    else
      return reports[i].string;
  }

  Entity subject(int i) {
    if (i < 0 || i >= reports.length)
      return null;
    else
      return reports[i].subject;
  }

  /// makes sure the sentence flows well with the previous sentence(s), then
  /// calls getString to do in-sentence substitution
  String substitute(int i, String str,
      {bool useSubjectPronoun: false, bool useObjectPronoun: false}) {
    String result = str.replaceAll(ACTION, string(i));
    if ((useObjectPronoun || _sameObject(i, i - 1)) &&
        !(object(i).pronoun == Pronoun.IT &&
            subject(i).pronoun == Pronoun.IT)) {
      // if doing something to someone in succession, use pronoun
      // but not if the pronoun is "it" for both subject and object,
      // that makes sentences like "it makes it"

      // Never show "the guard's it".
      result = result.replaceAll(
          "$OBJECT_OWNER_POSSESIVE $OBJECT", object(i).pronoun.accusative);
      result = result.replaceAll("$OBJECT_OWNER_PRONOUN_POSSESIVE $OBJECT",
          object(i).pronoun.accusative);
      result = result.replaceAll(OBJECT, object(i).pronoun.accusative);
      result = result.replaceAll(OBJECT_POSSESIVE, object(i).pronoun.genitive);
    }
    if (useSubjectPronoun || _sameSubject(i, i - 1)) {
      // Never show "the guard's it".
      result = result.replaceAll(
          "$OWNER_POSSESIVE $SUBJECT", subject(i).pronoun.nominative);
      result = result.replaceAll(
          "$OWNER_PRONOUN_POSSESIVE $SUBJECT", subject(i).pronoun.nominative);
      result = result.replaceAll(SUBJECT, subject(i).pronoun.nominative);
      result =
          result.replaceAll(SUBJECT_POSSESIVE, subject(i).pronoun.genitive);
    }
    // if someone who was object last sentence is now subject
    // (and it's not misleading), use pronoun
    if (object(i - 1) != null &&
        subject(i) != null &&
        subject(i - 1) != null &&
        object(i - 1)?.id == subject(i)?.id &&
        subject(i - 1)?.pronoun != subject(i)?.pronoun) {
      // Never show "the guard's it".
      result = result.replaceAll(
          "$OWNER_POSSESIVE $SUBJECT", subject(i).pronoun.nominative);
      result = result.replaceAll(
          "$OWNER_PRONOUN_POSSESIVE $SUBJECT", subject(i).pronoun.nominative);
      result = result.replaceAll(SUBJECT, subject(i).pronoun.nominative);
      result =
          result.replaceAll(SUBJECT_POSSESIVE, subject(i).pronoun.genitive);
    }
    // same as previous, but with object-subject reversed
    if (subject(i - 1) != null &&
        object(i) != null &&
        subject(i - 1)?.id == object(i)?.id &&
        subject(i - 1)?.pronoun != subject(i)?.pronoun) {
      // Never show "the guard's it".
      result = result.replaceAll(
          "$OBJECT_OWNER_POSSESIVE $OBJECT", object(i).pronoun.nominative);
      result = result.replaceAll("$OBJECT_OWNER_PRONOUN_POSSESIVE $OBJECT",
          object(i).pronoun.nominative);
      result = result.replaceAll(OBJECT, object(i).pronoun.accusative);
      result = result.replaceAll(OBJECT_POSSESIVE, object(i).pronoun.genitive);
    }
    return getString(result, reports[i]);
  }

  int timeSincePrevious(int i) {
    if (reports[i].time == null || !valid(i - 1) || reports[i - 1].time == null)
      return VERY_LONG_TIME;
    else
      return reports[i].time - reports[i - 1].time;
  }

  @deprecated
  @override
  String toString() => realize();

  bool valid(int i) {
    if (i >= reports.length || i < 0)
      return false;
    else
      return true;
  }

  /// Returns whether or not the [entity] has been mentioned by time of the
  /// report ([reportTime]).
  bool _hasBeenMentioned(Entity entity, int reportTime) {
    return (_firstMentions[entity.id] ?? _beginningOfTime) < reportTime;
  }

  /// Applies the logic of needed for `<owner>` and `<owner's>` to work.
  ///
  /// While [resultSoFar] is the text (with stopwords) to work on, [str] is the
  /// original text (with all the stopwords still in).
  String _realizeOwner(
      Entity owner,
      String resultSoFar,
      String str,
      String OWNER_OR_OBJECT_OWNER,
      String OWNER_OR_OBJECT_OWNER_POSSESSIVE,
      String OWNER_OR_OBJECT_OWNER_PRONOUN,
      String OWNER_OR_OBJECT_OWNER_PRONOUN_POSSESSIVE,
      int reportTime) {
    var result = resultSoFar;
    if (owner != null) {
      if (owner.isPlayer) {
        result =
            result.replaceAll(OWNER_OR_OBJECT_OWNER, Pronoun.YOU.accusative);
        result = result.replaceAll(
            OWNER_OR_OBJECT_OWNER_POSSESSIVE, Pronoun.YOU.genitive);
      } else {
        result = addParticleToFirstOccurence(
            result, OWNER_OR_OBJECT_OWNER, owner, null, reportTime);
        result = result.replaceAll(OWNER_OR_OBJECT_OWNER, owner.name);
      }
      result = result.replaceAll(
          OWNER_OR_OBJECT_OWNER_PRONOUN, owner.pronoun.nominative);
      if (str.contains(new RegExp("$OWNER_OR_OBJECT_OWNER.+"
          "$OWNER_OR_OBJECT_OWNER_POSSESSIVE"))) {
        // "the ship and her gun"
        result = result.replaceAll(
            OWNER_OR_OBJECT_OWNER_POSSESSIVE, owner.pronoun.genitive);
      }
      result = addParticleToFirstOccurence(
          result, OWNER_OR_OBJECT_OWNER_POSSESSIVE, owner, null, reportTime);
      result = result.replaceFirst(
          OWNER_OR_OBJECT_OWNER_POSSESSIVE, "${owner.name}'s");
      result = result.replaceAll(
          OWNER_OR_OBJECT_OWNER_POSSESSIVE, owner.pronoun.genitive);
      result = result.replaceAll(
          OWNER_OR_OBJECT_OWNER_PRONOUN_POSSESSIVE, owner.pronoun.genitive);
    } else {
      // owner == null
      // Get rid of <owner's> and <owner> when none is set up.
      result = result.replaceAll(OWNER_OR_OBJECT_OWNER, "");
      result = result.replaceAll(OWNER_OR_OBJECT_OWNER_POSSESSIVE, "");
      result = result.replaceAll(OWNER_OR_OBJECT_OWNER_PRONOUN, "");
      result = result.replaceAll(OWNER_OR_OBJECT_OWNER_PRONOUN_POSSESSIVE, "");
    }
    return result;
  }

  bool _sameObject(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    if (reports[i].object == null || reports[j].object == null) return false;
    return reports[i].object.id == reports[j].object.id;
  }

  /// taking care of all the exceptions and rules when comparing different reports
  /// call: [: sameSubject(i, i+1) ... :]
  bool _sameSubject(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    if (reports[i].subject == null || reports[j].subject == null) return false;
    return reports[i].subject.id == reports[j].subject.id;
  }

  static String capitalize(String string) {
    var result = string;
    if (!result.contains(PARAGRAPH_NEWLINES)) {
      result = result.trimLeft();
    }
    if (result.isEmpty) return result;
    String firstLetter = result[0].toUpperCase();
    if (result.length == 1)
      return firstLetter;
    else
      return "$firstLetter${result.substring(1)}";
  }
}
