library storyline;

import 'dart:collection';
import 'dart:math';

import 'package:edgehead/egamebook/elements/elements.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline_pronoun.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:logging/logging.dart';
import 'package:meta/meta.dart';

export 'package:edgehead/fractal_stories/storyline/storyline_pronoun.dart';

part 'storyline_entity.dart';

// ignore_for_file: constant_identifier_names
// ignore_for_file: non_constant_identifier_names

final Logger log = Logger('Storyline');

/// A single report about an event, atomic part of a story. It can be "John
/// picks up a shovel", "John approaches Jack" or "Jack is dead".
///
/// These events are stringed together by [Storyline] to create a coherent,
/// naturally sounding narrative.
class Report {
  final String string;

  final Entity subject;

  final Entity object;
  final Entity object2;
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
  /// used with [replacesThread].
  ///
  /// Given the following string of reports of the same [actionThread]:
  ///
  /// * (startsThread) <subject> tr<ies> to ruin <object's> stance
  /// * <subject> do<esn't> get fooled
  /// * <subject> deflect<s> the feint
  /// * (replacesThread) <subject> deflect<s> <object's> feint
  ///
  /// If these reports are in a continuous string, then only
  /// "I deflect goblin's feint" will be printed.
  ///
  /// If the thread is broken in any way (e.g. by a choice block or another
  /// report with a missing or different [actionThread] id), then
  /// the last report will be ignored and only the first three will be printed.
  final int actionThread;

  /// This report marks start of a continuous thread of actions which can
  /// be summarized with a single report (marked as [replacesThread]).
  final bool startsThread;

  /// If this is `true` and this report follows after a continuous string
  /// of reports with same [actionThread] id (including a starting report
  /// with [startsThread] set to `true`), then the preceding
  /// report will be replaced by this one.
  final bool replacesThread;

  final int time;

  Report(this.string,
      {this.subject,
      this.object,
      this.object2,
      this.owner,
      this.objectOwner,
      this.but = false,
      this.positive = false,
      this.negative = false,
      this.subjectAndObjectAreEnemies = false,
      this.endSentence = false,
      this.startSentence = false,
      this.wholeSentence = false,
      this.actionThread,
      this.startsThread = false,
      this.replacesThread = false,
      this.time})
      : assert(_checkDifferentiated(
            [subject, object, object2, owner, objectOwner])) {
    if (actionThread == null) {
      assert(startsThread == false, "actionThread is null");
      assert(replacesThread == false, "actionThread is null");
    }
  }

  Report.empty()
      : string = "",
        subject = null,
        object = null,
        object2 = null,
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
        startsThread = false,
        replacesThread = false,
        time = null;

  @override
  String toString() => "Report"
      "<${string.substring(0, min(string.length, 20))}...,"
      "thread=$actionThread${replacesThread ? '(sum)' : ''}>";

  /// This asserts that all entities in the report are able to be referred to
  /// in different ways. In other words, "An apple lies next to an apple." is
  /// forbidden.
  static bool _checkDifferentiated(List<Entity> entities) {
    final nonNulls =
        entities.where((entity) => entity != null).toList(growable: false);
    for (int i = 0; i < nonNulls.length; i++) {
      for (int j = 0; j < nonNulls.length; j++) {
        if (i == j) continue;
        final a = nonNulls[i];
        final b = nonNulls[j];
        if (a.name == b.name && a.adjective == b.adjective) return false;
      }
    }
    return true;
  }
}

/// Class for reporting a sequence of events in 'natural' language.
class Storyline {
  static const String SUBJECT = "<subject>";
  static const String SUBJECT_POSSESIVE = "<subject's>";

  static const String OWNER = "<owner>";
  static const String OWNER_POSSESIVE = "<owner's>";
  static const String OBJECT_OWNER = "<objectOwner>";
  static const String OBJECT_OWNER_POSSESIVE = "<objectOwner's>";
  static const String OBJECT = "<object>";
  static const String OBJECT_POSSESSIVE = "<object's>";
  static const String SUBJECT_PRONOUN = "<subjectPronoun>";
  static const String SUBJECT_PRONOUN_ACCUSATIVE = "<subjectPronounAccusative>";
  static const String SUBJECT_PRONOUN_POSSESIVE = "<subjectPronoun's>";
  static const String SUBJECT_PRONOUN_SELF = "<subjectPronounSelf>";
  static const String SUBJECT_NOUN = "<subjectNoun>";
  static const String OBJECT_PRONOUN = "<objectPronoun>";
  static const String OBJECT_PRONOUN_NOMINATIVE = "<objectPronounNominative>";
  static const String OBJECT_PRONOUN_ACCUSATIVE = "<objectPronounAccusative>";
  static const String OBJECT_PRONOUN_POSSESSIVE = "<objectPronoun's>";
  static const String OWNER_PRONOUN = "<ownerPronoun>";
  static const String OWNER_PRONOUN_POSSESIVE = "<ownerPronoun's>";
  static const String OBJECT_OWNER_PRONOUN = "<objectOwnerPronoun>";
  static const String OBJECT_OWNER_PRONOUN_POSSESIVE = "<objectOwnerPronoun's>";
  static const String OBJECT2 = "<object2>";
  static const String OBJECT2_POSSESSIVE = "<object2's>";
  static const String OBJECT2_PRONOUN = "<object2Pronoun>";
  static const String OBJECT2_PRONOUN_NOMINATIVE = "<object2PronounNominative>";
  static const String OBJECT2_PRONOUN_ACCUSATIVE = "<object2PronounAccusative>";
  static const String OBJECT2_PRONOUN_POSSESSIVE = "<object2Pronoun's>";
  static const String ACTION = "<action>";
  static const String VERB_S = "<s>";

  static const String SUBJECT_NOUN_WITH_ADJECTIVE =
      "<subjectNounWithAdjective>";
  static const String OBJECT_NOUN_WITH_ADJECTIVE = "<objectNounWithAdjective>";
  static const String OBJECT2_NOUN_WITH_ADJECTIVE =
      "<object2NounWithAdjective>";

  /// e.g. in "goes"
  static const String VERB_ES = "<es>";
  static const String VERB_SSES = "<sses>";

  /// e.g. in "tries", "flies"
  static const String VERB_IES = "<ies>";
  static const String VERB_DO = "<does>";
  static const String VERB_BE = "<is>";
  static const String VERB_BE_NOT = "<isn't>";
  static const String VERB_HAVE = "<has>";
  static final RegExp QUOTE_INTERPUNCTION_DUPLICATION =
      RegExp(r'''(\w)([\.\?\!])(["'])\.(?=$|\s)''');
  static const String PARAGRAPH_NEWLINES = "\n\n";

  /// Matches occurrences of `<object` that aren't `<object2`.
  static final RegExp OBJECT_NOT_OBJECT2_REGEXP = RegExp(r'''<object[^2]''');

  static const int SHORT_TIME = 4;

  static const int VERY_LONG_TIME = 1000;

  static const _beginningOfTime = -1;

  static const _endOfTime = 9999999;

  /// Internal list of reports. This is constructed by filtering [_records].
  List<Report> _reports;

  /// Internal queue of records, mixing [Report] instances with custom
  /// elements (such as images, maps, stat updates, what have you).
  ///
  /// As a general rule, [Report]s are joined into paragraphs of text, and
  /// custom elements are printed after these paragraphs.
  final Queue<_StorylineRecord> _records = Queue<_StorylineRecord>();

  int time = 0;

  /// This map tracks the times when each entity (its [Entity.id]) was first
  /// mentioned. If this is lower than the current report's [time], the entity
  /// can use a definitive article (the book), otherwise it needs an indefinite
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
      _records.any((rec) => rec.report?.string == PARAGRAPH_NEWLINES);

  /// Add another event to the story.
  ///
  /// When [str] ends with [:.:] or [:!:] or [:?:] and starts with a capital
  /// letter, [wholeSentence] will automatically be [:true:] for convenience.
  void add(String str,
      {Entity subject,
      Entity object,
      Entity object2,
      Entity owner,
      Entity objectOwner,
      bool but = false,
      bool positive = false,
      bool negative = false,
      bool subjectAndObjectAreEnemies = false,
      bool endSentence = false,
      bool startSentence = false,
      bool wholeSentence = false,
      int actionThread,
      bool startsThread = false,
      bool replacesThread = false,
      int time}) {
    if (str == null || str == "") {
      // Ignore empty records.
      return;
    }

    assert(
        !str.contains("<subject") || subject != null, "'$str' lacks subject");
    assert(
        _entityAndSubstringExistTogether(
            str, object, OBJECT_NOT_OBJECT2_REGEXP),
        "'$str' lacks object");
    assert(_entityAndSubstringExistTogether(str, object2, "<object2"),
        "'$str' lacks object2");

    bool wholeSentenceAutoDetected =
        (str.endsWith(".") || str.endsWith("!") || str.endsWith("?")) &&
            str.startsWith(RegExp("[A-Z]"));

    final report = Report(str,
        subject: subject,
        object: object,
        object2: object2,
        owner: owner,
        objectOwner: objectOwner,
        but: but,
        positive: positive,
        negative: negative,
        subjectAndObjectAreEnemies: subjectAndObjectAreEnemies,
        endSentence: endSentence,
        startSentence: startSentence,
        wholeSentence: wholeSentenceAutoDetected || wholeSentence,
        actionThread: actionThread,
        startsThread: startsThread,
        replacesThread: replacesThread,
        time: time ?? this.time);

    _records.add(_StorylineRecord(report: report));
  }

  /// Add an element that is not text.
  void addCustomElement(ElementBase element) {
    _records.add(_StorylineRecord(customElement: element));
  }

  /// Add a sentence (or more) enumerating several things ([articles]) at once.
  /// Example: "You can see a handkerchief, a brush and a mirror here."
  /// You can provide "<also>" for a more human-like enumeration.
  void addEnumeration(String start, Iterable<Entity> articles, String end,
      {Entity subject,
      Entity object,
      Entity object2,
      Entity owner,
      int maxPerSentence = 3,
      String conjunction = "and"}) {
    assert(start != null);
    assert(articles != null);
    if (articles.isEmpty) {
      throw ArgumentError.value(articles);
    }
    StringBuffer buf = StringBuffer();

    String removeAlso(String s) =>
        s.replaceAll("<also> ", "").replaceAll("  ", " ").trim();

    buf.write(removeAlso(start));
    buf.write(" ");
    int i = 0;
    int sentenceCount = 0;
    for (final article in articles) {
      if (i > 0) {
        if (i == 1 && article == articles.last) {
          buf.write(" ");
          buf.write(conjunction);
        } else if (i == maxPerSentence - 1) {
          buf.write(", $conjunction");
        } else {
          buf.write(",");
        }
        buf.write(" ");
      }

      // Adds 'the', 'a', or nothing. TODO: instead of using the
      // addParticleToFirstOccurence method (designed for longer texts), use
      // something smaller.
      String articleWithParticle = addParticleToFirstOccurrence(
          article.name, article.name, article, null, time);
      buf.write(articleWithParticle);
      i++;
      if (i >= maxPerSentence || article == articles.last) {
        // Finish sentence.
        if (end != null) {
          buf.write(" ");
          if (sentenceCount == 0) {
            buf.write(removeAlso(end));
          } else {
            buf.write(end.replaceAll("<also>", "also"));
          }
        }
        buf.write(".");
        // An entity for the articles themselves, so that the writer can
        // write <is> and so on.
        var articlesEntity = Entity(
          name: '<NEVER SHOWN>',
          pronoun: (article == articles.last && i % maxPerSentence == 1)
              ? article.pronoun
              : Pronoun.THEY,
        );
        add(buf.toString(),
            subject: subject ?? articlesEntity,
            object: object,
            object2: object2,
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

  /// Adds [:the:] or [:a:] to first occurrence of [SUB_STRING] (like
  /// [:<subject>:]) in [string]. The next occurrences will be automatically
  /// converted to pronouns elsewhere.
  ///
  /// The [reportTime] should correspond to the time this report is being said.
  /// Storyline tracks when different entities were first mentioned so it
  /// can apply either definitive (the) or indefinite (a) article.
  String addParticleToFirstOccurrence(String string, String SUB_STRING,
      Entity entity, Entity entityOwner, int reportTime) {
    // Returns true if [str] contains at least one of the stopwords
    // as prefixes to [SUB_STRING].
    bool containsOneOfPrefixes(String str, List<String> stopwords) {
      for (final stopword in stopwords) {
        if (str.contains("$stopword $SUB_STRING")) return true;
      }
      return false;
    }

    // Make sure we don't add particles to "your car" etc.
    // The following if statement checks whether we have a string such as
    // `<owner's> <object>` while also having [entityOwner] defined.
    // (When [entityOwner] is `null`, Storyline ignores it.
    if (entityOwner != null &&
        containsOneOfPrefixes(string, [
          OWNER_POSSESIVE,
          OWNER_PRONOUN_POSSESIVE,
          OBJECT_OWNER_POSSESIVE,
          OBJECT_OWNER_PRONOUN_POSSESIVE
        ])) {
      return string;
    }
    // Matches all the other possible possessive stopwords, such as
    // `<subject's>`. Here we don't ignore when subject or object aren't
    // defined.
    if (containsOneOfPrefixes(string, [
      SUBJECT_POSSESIVE,
      SUBJECT_PRONOUN_POSSESIVE,
      OBJECT_POSSESSIVE,
      OBJECT_PRONOUN_POSSESSIVE
    ])) {
      return string;
    }

    String stringWithParticle;

    if (!entity.nameIsProperNoun) {
      if (_hasBeenMentioned(entity, reportTime)) {
        stringWithParticle = string.replaceFirst(SUB_STRING, "the $SUB_STRING");
      } else {
        if (entity.name.startsWith(RegExp(r"[aeiouy]", caseSensitive: false))) {
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
    _records.clear();
  }

  /// Appends [other] storyline to this one.
  void concatenate(Storyline other) {
    _records.addAll(other._records);
  }

  bool exchangedSubjectObject(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    if (_reports[i].subject == null || _reports[j].subject == null) {
      return false;
    }
    if (_reports[i].object == null || _reports[j].object == null) return false;
    return _reports[i].subject.id == _reports[j].object.id &&
        _reports[i].object.id == _reports[j].subject.id;
  }

  /// First report is like "A punches B", second is like
  /// "B falls to the ground". We can still tie these sentences together
  /// (like with [exchangedSubjectObject]) if the pronouns aren't confusing.
  bool exchangedSubjectObjectImperfect(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    if (_reports[i].subject == null || _reports[j].subject == null) {
      return false;
    }
    if (_reports[i].object == null) return false;
    if (_reports[i].subject.pronoun == _reports[j].subject.pronoun) {
      return false;
    }
    if (_reports[i].subject.pronoun == _reports[j]?.object?.pronoun) {
      return false;
    }
    return _reports[i].object.id == _reports[j].subject.id;
  }

  /// If storyline already has something to show (at least one full
  /// paragraph), this will output it and remove it.
  ///
  /// This is useful for when the output is still being generated (no
  /// [ChoiceBlock] in sight, actors other than player still haven't finished
  /// their turns) but we do want to output something to the player.
  ///
  /// TODO: output custom elements as well
  /// TODO: optimize
  Iterable<ElementBase> generateFinishedOutput() sync* {
    while (hasManyParagraphs) {
      yield* realize(onlyFirstParagraph: true);
      removeFirstParagraph();
    }
  }

  /// Like [generateFinishedOutput], but doesn't stop before the last paragraph
  /// and goes until the end.
  Iterable<ElementBase> generateOutput() sync* {
    yield* generateFinishedOutput();
    yield* realize();
    _records.clear();
  }

  /// Returns an iterable of all the entities present in given report.
  ///
  /// This does not include [Report.object2] since that is assumed to be
  /// an item.
  Iterable<Entity> getAllActiveEntities(int i) sync* {
    if (!valid(i)) return;
    var report = _reports[i];
    if (report.subject != null) yield report.subject;
    if (report.object != null) yield report.object;
    if (report.owner != null) yield report.owner;
    if (report.objectOwner != null) yield report.objectOwner;
  }

  /// Takes care of substitution of stopwords. Called by substitute().
  String _substituteStopwords(String str, Report report) {
    Entity subject = report.subject;
    Entity object = report.object;
    Entity object2 = report.object2;
    Entity owner = report.owner;
    Entity objectOwner = report.objectOwner;

    String result = str;

    assert(!str.contains("<is>n't"), "Please use <isn't> instead.");

    if (subject != null) {
      if (subject.isPlayer) {
        // don't talk like a robot: "player attack wolf" -> "you attack wolf"
        result = result.replaceAll(SUBJECT, SUBJECT_PRONOUN);
        result =
            result.replaceAll(SUBJECT_POSSESIVE, SUBJECT_PRONOUN_POSSESIVE);
      }

      if (subject.pronoun == Pronoun.I ||
          subject.pronoun == Pronoun.YOU ||
          subject.pronoun == Pronoun.THEY) {
        // "you fly there", "they pick up the bananas" ...
        result = result.replaceAll(VERB_S, "");
        result = result.replaceAll(VERB_ES, "");
        result = result.replaceAll(VERB_SSES, "ss");
        result = result.replaceAll(VERB_IES, "y");
        result = result.replaceAll(VERB_DO, "do");
        result = result.replaceAll(
            VERB_BE, subject.pronoun == Pronoun.I ? "am" : "are");
        result = result.replaceAll(
            VERB_BE_NOT, subject.pronoun == Pronoun.I ? "am not" : "aren't");
        result = result.replaceAll(VERB_HAVE, "have");
      } else {
        // "he flies there", "it picks up the bananas" ...
        result = result.replaceAll(VERB_S, "s");
        result = result.replaceAll(VERB_ES, "es");
        result = result.replaceAll(VERB_SSES, "sses");
        result = result.replaceAll(VERB_IES, "ies");
        result = result.replaceAll(VERB_DO, "does");
        result = result.replaceAll(VERB_BE, "is");
        result = result.replaceAll(VERB_BE_NOT, "isn't");
        result = result.replaceAll(VERB_HAVE, "has");
      }

      result = result.replaceFirst(SUBJECT, SUBJECT_NOUN);
      result = result.replaceAll(SUBJECT, subject.pronoun.nominative);

      result = addParticleToFirstOccurrence(
          result, SUBJECT_NOUN, subject, owner, report.time);
      result = result.replaceFirst(SUBJECT_NOUN, subject.name);

      // Solve particles for subject that needs an adjective.
      result = addParticleToFirstOccurrence(
          result, SUBJECT_NOUN_WITH_ADJECTIVE, subject, owner, report.time);
      result = result.replaceFirst(
          SUBJECT_NOUN_WITH_ADJECTIVE, '${subject.adjective} ${subject.name}');

      result = result.replaceAll(SUBJECT_PRONOUN, subject.pronoun.nominative);
      if (str.contains(RegExp("$SUBJECT.+$SUBJECT_POSSESIVE"))) {
        // "actor takes his weapon"
        result =
            result.replaceAll(SUBJECT_POSSESIVE, SUBJECT_PRONOUN_POSSESIVE);
      }
      result = addParticleToFirstOccurrence(
          result, SUBJECT_POSSESIVE, subject, owner, report.time);
      result = result.replaceFirst(SUBJECT_POSSESIVE, "${subject.name}'s");
      result = result.replaceAll(SUBJECT_POSSESIVE, subject.pronoun.genitive);
      result = result.replaceAll(
          SUBJECT_PRONOUN_ACCUSATIVE, subject.pronoun.accusative);
      result = result.replaceAll(SUBJECT_PRONOUN_SELF, subject.pronoun.self);
    }

    void substituteObject(
        Entity object,
        String OBJECT,
        String OBJECT_POSSESSIVE,
        String OBJECT_PRONOUN,
        String OBJECT_PRONOUN_NOMINATIVE,
        String OBJECT_PRONOUN_ACCUSATIVE,
        String OBJECT_PRONOUN_POSSESIVE,
        String OBJECT_NOUN_WITH_ADJECTIVE) {
      if (object.nameIsProperNoun) {
        // Disallow "you unleash your Buster".
        // We must do this before we auto-change <OBJECT> to object.name below.
        result = result.replaceAll("$SUBJECT_POSSESIVE $OBJECT", OBJECT);
        result =
            result.replaceAll("$SUBJECT_PRONOUN_POSSESIVE $OBJECT", OBJECT);
      }

      if (object.isPlayer) {
        result = result.replaceAll(OBJECT, OBJECT_PRONOUN);
        result = result.replaceAll(OBJECT_POSSESSIVE, OBJECT_PRONOUN_POSSESIVE);
      } else {
        result = addParticleToFirstOccurrence(
            result, OBJECT, object, objectOwner, report.time);
        result = result.replaceFirst(OBJECT, object.name);

        // Solve particles for object that needs an adjective.
        result = addParticleToFirstOccurrence(result,
            OBJECT_NOUN_WITH_ADJECTIVE, object, objectOwner, report.time);
        result = result.replaceFirst(
            OBJECT_NOUN_WITH_ADJECTIVE, '${object.adjective} ${object.name}');

        // Replace the rest with pronouns.
        result = result.replaceAll(OBJECT, object.pronoun.accusative);
      }

      result = result.replaceAll(OBJECT_PRONOUN, object.pronoun.accusative);
      if (str.contains(RegExp("$OBJECT.+$OBJECT_POSSESSIVE"))) {
        // "actor takes his weapon"
        result = result.replaceAll(OBJECT_POSSESSIVE, object.pronoun.genitive);
      }
      result = addParticleToFirstOccurrence(
          result, OBJECT_POSSESSIVE, object, objectOwner, report.time);
      result = result.replaceFirst(OBJECT_POSSESSIVE, "${object.name}'s");
      result = result.replaceAll(OBJECT_POSSESSIVE, object.pronoun.genitive);
      result =
          result.replaceAll(OBJECT_PRONOUN_POSSESIVE, object.pronoun.genitive);
      result = result.replaceAll(
          OBJECT_PRONOUN_ACCUSATIVE, object.pronoun.accusative);
      result = result.replaceAll(
          OBJECT_PRONOUN_NOMINATIVE, object.pronoun.nominative);
    }

    if (object != null) {
      substituteObject(
          object,
          OBJECT,
          OBJECT_POSSESSIVE,
          OBJECT_PRONOUN,
          OBJECT_PRONOUN_NOMINATIVE,
          OBJECT_PRONOUN_ACCUSATIVE,
          OBJECT_PRONOUN_POSSESSIVE,
          OBJECT_NOUN_WITH_ADJECTIVE);
    }

    if (object2 != null) {
      substituteObject(
          object2,
          OBJECT2,
          OBJECT2_POSSESSIVE,
          OBJECT2_PRONOUN,
          OBJECT2_PRONOUN_NOMINATIVE,
          OBJECT2_PRONOUN_ACCUSATIVE,
          OBJECT2_PRONOUN_POSSESSIVE,
          OBJECT2_NOUN_WITH_ADJECTIVE);
    }

    if (subject != null) {
      result = result.replaceAll(
          SUBJECT_PRONOUN_POSSESIVE, subject.pronoun.genitive);
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
    if (i < 0 || i >= _reports.length) {
      return null;
    } else {
      return _reports[i].object;
    }
  }

  Entity object2(int i) {
    if (i < 0 || i >= _reports.length) {
      return null;
    } else {
      return _reports[i].object2;
    }
  }

  bool oppositeSentiment(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    // subject(i) == object(j), both have same sentiment => opposite sentiment
    if (exchangedSubjectObject(i, j) &&
        _reports[i].subjectAndObjectAreEnemies &&
        _reports[j].subjectAndObjectAreEnemies) {
      if (_reports[i].positive && _reports[j].positive) return true;
      if (_reports[i].negative && _reports[j].negative) return true;
    }
    return false;
  }

  /// Detect unbroken chains of actionThread from start to summary, remove
  /// everything except summary.
  Iterable<Report> _collapseThreads(List<Report> reports) sync* {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      if (report.actionThread == null) {
        // Just copy over non-thread reports.
        yield report;
        continue;
      }
      if (report.replacesThread) {
        // A lone summary we should just ignore.
        continue;
      }
      if (report.startsThread) {
        bool continuousChain = false;
        // Walk the report chain until a (potential) summary.
        for (int j = i + 1; j < reports.length; j++) {
          final next = reports[j];
          if (next.actionThread != report.actionThread) {
            // A null or a different actionThread. Stop collapsing.
            break;
          }
          if (next.startsThread) {
            throw StateError('Cannot start thread several times: $reports.');
          }
          if (next.replacesThread) {
            // Bingo. We have an unbroken chain from [report] to [next].
            // Yield just [next] instead of the whole chain.
            yield next;
            // Put the index to [next] (it will be incremented by the for loop).
            i = j;
            continuousChain = true;
            // Add any following summaries.
            for (int z = j + 1; z < reports.length; z++) {
              final followUp = reports[z];
              if (followUp.actionThread == report.actionThread &&
                  followUp.replacesThread) {
                // A following summary exists.
                yield followUp;
                continue;
              }
              // Broken thread of follow-up summaries.
              break;
            }
            break;
          }
        }
        if (continuousChain) {
          // We already got rid of [report] and the chain after it.
          continue;
        }
      }
      // A report with an actionThread id but a part of a broken chain.
      yield report;
    }
  }

  /// The main function that strings reports together into a coherent story.
  ///
  /// When [onlyFirstParagraph] is `true`, this will only realize the first
  /// paragraph and will leave the rest of the reports for later.
  ///
  /// TODO: deprecate the generated List ([_reports]) and use [_records] instead
  List<ElementBase> realize({bool onlyFirstParagraph = false}) {
    StringBuffer strBuf = StringBuffer();

    // Distill _records into a list of only storyline reports (without
    // custom elements.
    _reports =
        _records.where((rec) => rec.isReport).map((rec) => rec.report).toList();

    final cleanedReports = _collapseThreads(_reports).toList(growable: false);
    _reports.retainWhere(cleanedReports.contains);

    final hasManyParagraphs = this.hasManyParagraphs;
    final int length = onlyFirstParagraph && hasManyParagraphs
        ? _reports.indexOf(
                _reports.firstWhere((r) => r.string == PARAGRAPH_NEWLINES)) +
            1
        : _reports.length;
    // Same as above, but the index is in [_records].
    int lengthInRecords = 0;
    for (final rec in _records) {
      lengthInRecords += 1;
      if (rec.isReport && rec.report.string == PARAGRAPH_NEWLINES) break;
    }
    if (length < 1) return const [];
    const int MAX_SENTENCE_LENGTH = 3;
    int lastEndSentence = -1;
    bool endPreviousSentence = true; // previous sentence was ended
    bool endThisSentence = false; // this sentence needs to be ended
    bool but = false; // this next sentence needs to start with but
    for (int i = 0; i < length; i++) {
      // TODO: look into future - make sentences like "Although __, __"
      // TODO: ^^ can be done by 2 for loops
      // TODO: add "while you're still sweeping your legs" when it's been
      //       a long time since we said that
      // TODO: glue sentences together first (look ahead, optimize)
      if (i != 0) {
        // solve flow with previous sentence
        bool objectSubjectSwitch = exchangedSubjectObject(i - 1, i);
        bool objectSubjectSwitchImperfect =
            exchangedSubjectObjectImperfect(i - 1, i);
        but = (_reports[i].but ||
                (oppositeSentiment(i, i - 1) && someActorsSame(i, i - 1))) &&
            !_reports[i - 1].but;
        _reports[i].but = but;
        endPreviousSentence = (i - lastEndSentence >= MAX_SENTENCE_LENGTH) ||
            endThisSentence ||
            _reports[i].startSentence ||
            _reports[i - 1].endSentence ||
            _reports[i].wholeSentence ||
            !(_sameSubject(i, i - 1) ||
                objectSubjectSwitch ||
                objectSubjectSwitchImperfect) ||
            (but && (i - lastEndSentence > 1)) ||
            (but && _reports[i - 1].but) ||
            (timeSincePrevious(i) > SHORT_TIME);
        endThisSentence = false;

        if (endPreviousSentence) {
          if (_reports[i - 1].wholeSentence) {
            // don't write period after "Boom!"
            strBuf.write(" ");
          } else {
            strBuf.write(". ");
          }
          if (but && !_reports[i].wholeSentence) strBuf.write("But ");
        } else {
          // let's try and glue [i-1] and [i] into one sentence
          if (but) {
            strBuf.write(Randomly.choose(
                <String>[" but ", " but ", /*" yet ",*/ ", but "]));
            if (!sameSentiment(i, i + 1)) endThisSentence = true;
          } else {
            // TODO: add ", " but only when we can be sure
            //       it's not in the end of the sentence
            strBuf.write(Randomly.choose(<String>[" and ", " and ", ", and "]));
            endThisSentence = true;
          }
        }
      }

      String randomReport = string(i);

      // Resolve randomness first.
      String report = Randomly.parseAndPick(randomReport);
      if (report.contains('{') || report.contains('}')) {
        log.severe('Storyline result includes { and/or } even after being '
            'parsed by Randomly. Is there a dangling bracket here? '
            'Input = """$randomReport""" Output = """$report"""');
      }

      // clear subject and verb ("He has his sword and his shield.")
      if (!endPreviousSentence &&
          _sameSubject(i, i - 1) &&
          string(i - 1).startsWith("$SUBJECT ") &&
          report.startsWith("$SUBJECT $VERB_HAVE ")) {
        report = report.replaceFirst("$SUBJECT $VERB_HAVE ", "");
      }

      // clear subjects when e.g. "Wolf hits you, it growls, it strikes again."
      if (!endPreviousSentence &&
          _sameSubject(i, i - 1) &&
          string(i - 1).startsWith("$SUBJECT ") &&
          report.startsWith("$SUBJECT ")) {
        report = report.replaceFirst("$SUBJECT ", "");
      }

      report = _maybeAddAdjectives(i, report);
      report = _fixFlowWithPrevious(i, report);
      report = _substituteStopwords(report, _reports[i]);

      if ((endPreviousSentence || i == 0) && !but) report = capitalize(report);

      // add the actual report
      strBuf.write(report);

      // set variables for next iteration
      if (endPreviousSentence) lastEndSentence = i;
      if (_reports[i].wholeSentence) endThisSentence = true;
    }

    // add last dot
    if (!_reports[length - 1].wholeSentence) strBuf.write(".");

    String s = strBuf.toString();

    // Fix extra dots after quotes, like:
    //
    //     He said: "Don't go!".
    //                         ^
    s = s.replaceAllMapped(QUOTE_INTERPUNCTION_DUPLICATION, (Match m) {
      return "${m[1]}${m[2]}${m[3]}";
    });

    // Construct the text.
    final text = TextOutput((b) => b..markdownText = s);

    if (length == lengthInRecords) {
      // No records other than of type [Report] found. Safe to just output
      // the text.
      return <ElementBase>[text];
    }

    // We have elements other than text.
    final result = <ElementBase>[];
    result.add(text);
    int index = 0;
    for (final rec in _records) {
      if (!rec.isReport) result.add(rec.customElement);
      index += 1;
      if (index >= lengthInRecords) break;
    }

    return result;
  }

  /// Old way of getting text out of [Storyline]. Use [realize]
  /// instead unless you want only plain (markdown) text.
  String realizeAsString({bool onlyFirstParagraph = false}) {
    final buf = StringBuffer();
    final list = realize(onlyFirstParagraph: onlyFirstParagraph);
    for (final element in list) {
      if (element is TextOutput) {
        buf.write(element.markdownText);
      }
    }
    return buf.toString();
  }

  @visibleForTesting
  void removeFirstParagraph() {
    if (!hasManyParagraphs) {
      _records.clear();
      return;
    }
    while (_records.removeFirst().report?.string != PARAGRAPH_NEWLINES) {
      // Remove everything after the first "PARAGRAPH_LINES".
    }
  }

  bool sameSentiment(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    // subject(i) == object(j), opposite sentiments => same sentiment
    if (exchangedSubjectObject(i, j) &&
        _reports[i].subjectAndObjectAreEnemies &&
        _reports[j].subjectAndObjectAreEnemies) {
      if (_reports[i].positive && _reports[j].negative) return true;
      if (_reports[i].negative && _reports[j].positive) return true;
    }
    if (!_sameSubject(i, j)) return false;
    if (_reports[i].positive && _reports[j].positive) return true;
    if (_reports[i].negative && _reports[j].negative) {
      return true;
    } else {
      return false;
    }
  }

  /// Returns true if there is at least one entity that appears both in
  /// report[i] and in report[j], regardless of position
  /// (subject, object, owner, ...).
  bool someActorsSame(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    for (final a in getAllActiveEntities(i)) {
      for (final b in getAllActiveEntities(j)) {
        if (a.id == b.id) return true;
      }
    }
    return false;
  }

  String string(int i) {
    if (i < 0 || i >= _reports.length) {
      return null;
    } else {
      return _reports[i].string;
    }
  }

  Entity subject(int i) {
    if (i < 0 || i >= _reports.length) {
      return null;
    } else {
      return _reports[i].subject;
    }
  }

  /// makes sure the sentence flows well with the previous sentence(s), then
  /// calls getString to do in-sentence substitution
  String _fixFlowWithPrevious(int i, String str) {
    String result = str.replaceAll(ACTION, string(i));

    // If doing something to someone in succession, use pronoun
    if (_sameObject(i, i - 1) &&
        // But not if the pronoun is "it" for both subject and object.
        // Avoids sentences like "it makes it" (contrast with "he makes him").
        !(object(i).pronoun == Pronoun.IT &&
            subject(i).pronoun == Pronoun.IT)) {
      // Never show "the guard's it".
      result = result.replaceAll(
          "$OBJECT_OWNER_POSSESIVE $OBJECT", OBJECT_PRONOUN_ACCUSATIVE);
      result = result.replaceAll(
          "$OBJECT_OWNER_PRONOUN_POSSESIVE $OBJECT", OBJECT_PRONOUN_ACCUSATIVE);
      result = result.replaceAll(OBJECT, OBJECT_PRONOUN_ACCUSATIVE);
      result = result.replaceAll(OBJECT_POSSESSIVE, OBJECT_PRONOUN_POSSESSIVE);
    }
    if (_sameSubject(i, i - 1)) {
      // Never show "the guard's it".
      result = result.replaceAll("$OWNER_POSSESIVE $SUBJECT", SUBJECT_PRONOUN);
      result = result.replaceAll(
          "$OWNER_PRONOUN_POSSESIVE $SUBJECT", SUBJECT_PRONOUN);
      result = result.replaceAll(SUBJECT, SUBJECT_PRONOUN);
      result = result.replaceAll(SUBJECT_POSSESIVE, SUBJECT_PRONOUN_POSSESIVE);
    }
    // if someone who was object last sentence is now subject
    // (and it's not misleading), use pronoun
    if (object(i - 1) != null &&
        subject(i) != null &&
        subject(i - 1) != null &&
        object(i - 1)?.id == subject(i)?.id &&
        subject(i - 1)?.pronoun != subject(i)?.pronoun) {
      // Never show "the guard's it".
      result = result.replaceAll("$OWNER_POSSESIVE $SUBJECT", SUBJECT_PRONOUN);
      result = result.replaceAll(
          "$OWNER_PRONOUN_POSSESIVE $SUBJECT", SUBJECT_PRONOUN);
      result = result.replaceAll(SUBJECT, SUBJECT_PRONOUN);
      result = result.replaceAll(SUBJECT_POSSESIVE, SUBJECT_PRONOUN_POSSESIVE);
    }
    // same as previous, but with object-subject reversed
    if (subject(i - 1) != null &&
        object(i) != null &&
        subject(i - 1)?.id == object(i)?.id &&
        subject(i - 1)?.pronoun != subject(i)?.pronoun) {
      // Never show "the guard's it".
      result =
          result.replaceAll("$OBJECT_OWNER_POSSESIVE $OBJECT", OBJECT_PRONOUN);
      result = result.replaceAll(
          "$OBJECT_OWNER_PRONOUN_POSSESIVE $OBJECT", OBJECT_PRONOUN);
      result = result.replaceAll(OBJECT, OBJECT_PRONOUN_ACCUSATIVE);
      result = result.replaceAll(OBJECT_POSSESSIVE, OBJECT_PRONOUN_POSSESSIVE);
    }
    // and now with object2, the "item"
    // when a previous object2 becomes object
    if (_object2BecomesObject(i - 1, i)) {
      result = result.replaceAll(OBJECT, OBJECT_PRONOUN_ACCUSATIVE);
      result = result.replaceAll(OBJECT_POSSESSIVE, OBJECT_PRONOUN_POSSESSIVE);
    }
    // when a previous object becomes object2
    if (_objectBecomesObject2(i - 1, i)) {
      result = result.replaceAll(OBJECT2, OBJECT2_PRONOUN_ACCUSATIVE);
      result =
          result.replaceAll(OBJECT2_POSSESSIVE, OBJECT2_PRONOUN_POSSESSIVE);
    }
    // same object2 in both sentences
    if (object2(i - 1) != null &&
        object2(i - 1).id == object2(i)?.id &&
        subject(i)?.pronoun != object2(i).pronoun &&
        object(i)?.pronoun != object2(i).pronoun) {
      result = result.replaceAll(OBJECT2, OBJECT2_PRONOUN_ACCUSATIVE);
      result =
          result.replaceAll(OBJECT2_POSSESSIVE, OBJECT2_PRONOUN_POSSESSIVE);
    }

    return result;
  }

  int timeSincePrevious(int i) {
    if (_reports[i].time == null ||
        !valid(i - 1) ||
        _reports[i - 1].time == null) {
      return VERY_LONG_TIME;
    } else {
      return _reports[i].time - _reports[i - 1].time;
    }
  }

  bool valid(int i) {
    if (i >= _reports.length || i < 0) {
      return false;
    } else {
      return true;
    }
  }

  /// If [entity] is non-null, then _every_ variant of [str] must contain
  /// [pattern]. If [entity] is `null`, then _no_ variant of [str]
  /// can contain [pattern].
  ///
  /// Parses [str] with [Randomly.parse] to get all variants.
  bool _entityAndSubstringExistTogether(
      String str, Entity entity, Pattern pattern) {
    final entityExists = entity != null;

    for (final variant in Randomly.parse(str)) {
      if (entityExists) {
        // Entity exists but pattern wasn't found in [variant].
        if (!variant.contains(pattern)) return false;
      } else {
        // Entity doesn't exist but pattern was found in [variant].
        if (variant.contains(pattern)) return false;
      }
    }
    return true;
  }

  /// Returns whether or not the [entity] has been mentioned by time of the
  /// report ([reportTime]).
  bool _hasBeenMentioned(Entity entity, int reportTime) {
    return (_firstMentions[entity.id] ?? _beginningOfTime) < reportTime;
  }

  bool _object2BecomesObject(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    return object2(i) != null && object2(i) == object(j);
  }

  bool _objectBecomesObject2(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    return object(i) != null && object(i) == object2(j);
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
        result = result.replaceAll(OWNER_OR_OBJECT_OWNER, Pronoun.I.accusative);
        result = result.replaceAll(
            OWNER_OR_OBJECT_OWNER_POSSESSIVE, Pronoun.I.genitive);
      } else {
        result = addParticleToFirstOccurrence(
            result, OWNER_OR_OBJECT_OWNER, owner, null, reportTime);
        result = result.replaceAll(OWNER_OR_OBJECT_OWNER, owner.name);
      }
      result = result.replaceAll(
          OWNER_OR_OBJECT_OWNER_PRONOUN, owner.pronoun.nominative);
      if (str.contains(RegExp("$OWNER_OR_OBJECT_OWNER.+"
          "$OWNER_OR_OBJECT_OWNER_POSSESSIVE"))) {
        // "the ship and her gun"
        result = result.replaceAll(
            OWNER_OR_OBJECT_OWNER_POSSESSIVE, owner.pronoun.genitive);
      }
      result = addParticleToFirstOccurrence(
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
    if (_reports[i].object == null || _reports[j].object == null) return false;
    return _reports[i].object.id == _reports[j].object.id;
  }

  /// Taking care of all the exceptions and rules when comparing
  /// different reports call: [: sameSubject(i, i+1) ... :]
  bool _sameSubject(int i, int j) {
    if (!valid(i) || !valid(j)) return false;
    if (_reports[i].subject == null || _reports[j].subject == null) {
      return false;
    }
    return _reports[i].subject.id == _reports[j].subject.id;
  }

  static String capitalize(String string) {
    var result = string;
    if (!result.contains(PARAGRAPH_NEWLINES)) {
      result = result.trimLeft();
    }
    if (result.isEmpty) return result;
    String firstLetter = result[0].toUpperCase();
    if (result.length == 1) {
      return firstLetter;
    } else {
      return "$firstLetter${result.substring(1)}";
    }
  }

  /// Returns `true` if the two entities [a] and [b] are liable to create
  /// confusing sentences when used together. For example, two swords
  /// with [Item.name] == "sword" are going to be confusable.
  ///
  /// Returns `false` if [a] equals [b] (the [Entity.id] is the same, meaning
  /// that we are comparing the same entity to each other) or
  /// if either of them is `null`.
  bool _isConfusable(Entity a, Entity b) {
    if (a == null || b == null) return false;
    if (a.id == b.id) return false;
    // We only check [Entity.name]. Even if we have entities with different
    // pronouns and the same name, that's still confusable in most cases.
    return a.name == b.name;
  }

  String _maybeAddAdjectives(int i, String report) {
    String result = report;

    /// Returns `true` if the [NOUN] (i.e. '<subject>') needs to be prepended
    /// with an adjective because some other noun in the vicinity is confusable.
    bool neededForNoun(String NOUN, Entity entity) {
      if (entity.nameIsProperNoun) return false;
      return _isConfusable(entity, subject(i)) ||
          _isConfusable(entity, subject(i - 1)) ||
          _isConfusable(entity, subject(i + 1)) ||
          _isConfusable(entity, object(i)) ||
          _isConfusable(entity, object(i - 1)) ||
          _isConfusable(entity, object(i + 1)) ||
          _isConfusable(entity, object2(i)) ||
          _isConfusable(entity, object2(i - 1)) ||
          _isConfusable(entity, object2(i + 1));
    }

    if (neededForNoun(SUBJECT, subject(i))) {
      result = result.replaceAll(SUBJECT, SUBJECT_NOUN_WITH_ADJECTIVE);
    }

    if (neededForNoun(OBJECT, subject(i))) {
      result = result.replaceAll(OBJECT, OBJECT_NOUN_WITH_ADJECTIVE);
    }

    if (neededForNoun(OBJECT2, subject(i))) {
      result = result.replaceAll(OBJECT2, OBJECT2_NOUN_WITH_ADJECTIVE);
    }

    // Possibly do this with OWNER / OBJECT_OWNER?

    return result;
  }
}

/// Used to store different kinds of user-facing output. Normally, it's
/// a [report], but sometimes, it can be a [customElement] (like an image,
/// for example).
@immutable
class _StorylineRecord {
  final Report report;

  final ElementBase customElement;

  const _StorylineRecord({this.report, this.customElement})
      : assert(
            report == null || customElement == null,
            "_StorylineRecord should be either text or custom element, "
            "never both.");

  /// Whether this record contains a (textual) [Report].
  bool get isReport => report != null;
}
