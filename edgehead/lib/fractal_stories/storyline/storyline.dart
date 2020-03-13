library storyline;

import 'dart:collection';
import 'dart:math';

import 'package:edgehead/egamebook/elements/elements.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/shadow_graph/shadow_graph.dart';
import 'package:edgehead/fractal_stories/storyline/storyline_pronoun.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:logging/logging.dart';
import 'package:meta/meta.dart';

export 'package:edgehead/fractal_stories/storyline/storyline_pronoun.dart';

part 'storyline_complement.dart';
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

  /// Returns all non-null entities (like [subject], [object] etc.)
  /// mentioned in the report.
  Iterable<Entity> get allEntities sync* {
    if (subject != null) yield subject;
    if (object != null) yield object;
    if (object2 != null) yield object2;
    if (owner != null) yield owner;
    if (objectOwner != null) yield objectOwner;
  }

  /// Returns the [Entity] corresponding to [type].
  ///
  /// For example, when called with [OBJECT2], this method will return
  /// [object2].
  ///
  /// The returned value can be `null`.
  Entity getEntityByType(ComplementType type) {
    switch (type) {
      case ComplementType.SUBJECT:
        return subject;
      case ComplementType.OBJECT:
        return object;
      case ComplementType.OBJECT2:
        return object2;
      case ComplementType.OWNER:
        return owner;
      case ComplementType.OBJECT_OWNER:
        return objectOwner;
      default:
        throw UnimplementedError('No entity for $type');
    }
  }

  @override
  String toString() => "Report"
      "<${string.substring(0, min(string.length, 90))}...,"
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
        if (a.id == b.id) continue;
        if (a.name == b.name &&
            a.adjective == b.adjective &&
            a.firstOwnerId == b.firstOwnerId) {
          // Uncomment the line below to debug this problem if the debugger
          // refuses to stop at the assertion.
          // print("$a and $b aren't differentiated enough");
          return false;
        }
      }
    }
    return true;
  }
}

/// Class for reporting a sequence of events in 'natural' language.
class Storyline {
  static const String VERB_S = "<s>";

  /// e.g. in "goes"
  static const String VERB_ES = "<es>";

  /// e.g. "possesses"
  static const String VERB_SSES = "<sses>";

  /// e.g. in "tries", "flies"
  static const String VERB_IES = "<ies>";
  static const String VERB_DO = "<does>";
  static const String VERB_BE = "<is>";
  static const String VERB_BE_NOT = "<isn't>";
  static const String VERB_HAVE = "<has>";
  static final RegExp QUOTE_INTERPUNCTUATION_DUPLICATION =
      RegExp(r'''(\w)([\.\?\!])(["'])\.(?=$|\s)''');
  static const String PARAGRAPH_NEWLINES = "\n\n";

  /// Matches occurrences of `<object` that aren't `<object2`.
  static final RegExp OBJECT_NOT_OBJECT2_REGEXP = RegExp(r'''<object[^2]''');

  static const int VERY_LONG_TIME = 1000;

  static const _beginningOfTime = -1;

  static const _endOfTime = 9999999;

  static final _vowelsRegExp = RegExp(r"[aeiouy]", caseSensitive: false);

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

  /// The backing data structure to [allEntities].
  final Map<int, Entity> _allEntities;

  /// Constructs a new storyline.
  ///
  /// Provide [referredEntities] to give [Storyline] more information
  /// about the entities that might play a role in this story.
  Storyline({Iterable<Entity> referredEntities = const []})
      : _allEntities = {
          for (final entity in referredEntities) entity.id: entity,
        };

  /// A database of entities. The map associates an [Entity.id] (an integer)
  /// with the actual [Entity]. This way, we are guaranteed that each
  /// entity has only one record. It also makes it faster to access
  /// the entities.
  ///
  /// This is a set of all entities that matter at the point of the
  /// [Storyline]. They don't need to _be_ in the storyline, but they are
  /// in the context.
  ///
  /// For example, even if the storyline only involves an orc and his sword
  /// (e.g. "the orc equips his sword"), that doesn't mean another orc in
  /// the same room isn't part of [allEntities]. The thing is, if the other
  /// orc in the room wasn't part of [allEntities] then the storyline
  /// might only realize to "the orc equips his sword", and the reader would
  /// be unsure which orc it was.
  UnmodifiableMapView<int, Entity> get allEntities =>
      UnmodifiableMapView(_allEntities);

  @visibleForTesting
  bool get hasManyParagraphs =>
      _records.any((rec) => rec.report?.string == PARAGRAPH_NEWLINES);

  /// A list of reports (see [_reports]).
  UnmodifiableListView<Report> get reports => UnmodifiableListView(_reports);

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

      // Adds 'the', 'a', or nothing.
      // Code mostly copy-pasted from [_addParticles].
      String articleWithParticle;
      if (_hasBeenMentioned(article, time)) {
        articleWithParticle = "the ${article.name}";
      } else {
        _firstMentions[article.id] = time;
        if (article.name.startsWith(_vowelsRegExp)) {
          articleWithParticle = "an ${article.name}";
        } else {
          articleWithParticle = "a ${article.name}";
        }
      }

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
          name: '<NEVER SHOWN $i>',
          pronoun: (article == articles.last && i % maxPerSentence == 1)
              ? article.pronoun
              : Pronoun.THEY,
        );
        add(buf.toString(),
            subject: subject ?? articlesEntity,
            object: object,
            object2: object2,
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

  void clear() {
    _records.clear();
  }

  /// Appends [other] storyline to this one.
  void concatenate(Storyline other) {
    _records.addAll(other._records);
    for (final key in other._allEntities.keys) {
      // It's okay to overwrite old entries with newer ones.
      _allEntities[key] = other._allEntities[key];
    }
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
  ///
  /// This also clears the [Storyline].
  Iterable<ElementBase> generateOutput() sync* {
    yield* generateFinishedOutput();
    yield* realize();
    clear();
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

    final shadowGraph = ShadowGraph.from(this);

    for (int i = 0; i < length; i++) {
      final joiner = shadowGraph.joiners[i];
      final conjunction = shadowGraph.conjunctions[i];
      final qualifications = shadowGraph.qualifications[i];

      bool needsCapitalization = false;
      switch (joiner) {
        case SentenceJoinType.none:
          if (i > 0) strBuf.write(' ');
          switch (conjunction) {
            case SentenceConjunction.nothing:
              needsCapitalization = true;
              break;
            case SentenceConjunction.and:
              strBuf.write('And ');
              break;
            case SentenceConjunction.but:
              strBuf.write('But ');
              break;
          }
          break;
        case SentenceJoinType.period:
          strBuf.write('. ');
          switch (conjunction) {
            case SentenceConjunction.nothing:
              needsCapitalization = true;
              break;
            case SentenceConjunction.and:
              strBuf.write('And ');
              break;
            case SentenceConjunction.but:
              strBuf.write('But ');
              break;
          }
          break;
        case SentenceJoinType.comma:
          switch (conjunction) {
            case SentenceConjunction.nothing:
              strBuf.write(', ');
              break;
            case SentenceConjunction.and:
              strBuf.write(' and ');
              break;
            case SentenceConjunction.but:
              strBuf.write(' but ');
              break;
          }
          break;
      }

      String randomReport = _reports[i].string;

      // Resolve randomness first.
      String report = Randomly.parseAndPick(randomReport);
      if (report.contains('{') || report.contains('}')) {
        log.severe('Storyline result includes { and/or } even after being '
            'parsed by Randomly. Is there a dangling bracket here? '
            'Input = """$randomReport""" Output = """$report"""');
      }

      // Clear verb "to have" if pronoun is omitted.
      // ("He has his sword and his shield.")
      if (_reports[i].subject != null &&
          qualifications.subject == IdentifierLevel.omitted &&
          (string(i - 1)?.startsWith(
                  "${ComplementType.SUBJECT.generic} $VERB_HAVE ") ??
              false) &&
          report.startsWith("${ComplementType.SUBJECT.generic} $VERB_HAVE ")) {
        report = report.replaceFirst(
            "${ComplementType.SUBJECT.generic} $VERB_HAVE ", "");
      }

      final reportEntities = _reports[i].allEntities.toSet();
      Entity getEntity(int id) => shadowGraph.getEntityById(id, reportEntities);

      report = _removeOwnerStopwords(report, _reports[i]);
      report = _extractMentionedOwnerStopwords(
          report, _reports[i], qualifications,
          getEntityFromId: getEntity);
      report = _concretizeStopwords(report, _reports[i], qualifications);
      report = _preventPossessivesBeforePronouns(report, _reports[i]);
      report = _preventPossessivesBeforeProperNouns(report, _reports[i]);
      report = _addParticles(report, _reports[i]);
      report =
          _realizeStopwords(report, _reports[i], getEntityFromId: getEntity);

      if (needsCapitalization) {
        report = capitalize(report);
      }

      assert(!report.contains("<subject"), "Contains stopwords: $report");
      assert(!report.contains("<object"), "Contains stopwords: $report");

      // add the actual report
      strBuf.write(report);
    }

    // add last dot
    if (!_reports[length - 1].wholeSentence) strBuf.write(".");

    String s = strBuf.toString();

    // Fix extra dots after quotes, like:
    //
    //     He said: "Don't go!".
    //                         ^
    s = s.replaceAllMapped(QUOTE_INTERPUNCTUATION_DUPLICATION, (Match m) {
      return "${m[1]}${m[2]}${m[3]}";
    });

    // Construct the text.
    final text = TextOutput((b) => b..markdownText = s);

    if (length == lengthInRecords) {
      // No records other than of type [Report] found. Safe to just output
      // the text.
      return [text];
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

  /// Given [str] which still has stopwords (such as
  /// [ComplementType.SUBJECT.noun]) in it, add particles where appropriate.
  String _addParticles(String str, Report report) {
    String result = str;

    // Searches in [result] for [stopword]. Adds article if applicable.
    void maybeAddArticleToOne(Entity entity, String stopword) {
      result = result.replaceAllMapped(stopword, (m) {
        for (final possessive in ComplementType.allPossessives) {
          final possessiveIndex = result.indexOf(possessive);
          if (possessiveIndex == -1) continue;
          if (possessiveIndex == m.start - possessive.length - 1) {
            // The possessive (such as `<subject's>`) is just before
            // the [stopword]. The -1 is there for a space character.
            // Ignore this replacement.
            return stopword;
          }
        }

        if (_hasBeenMentioned(entity, report.time)) {
          return "the $stopword";
        } else {
          _firstMentions[entity.id] = report.time;
          if (entity.name.startsWith(_vowelsRegExp)) {
            return "an $stopword";
          } else {
            return "a $stopword";
          }
        }
      });
    }

    // Searches for any of the [stopwords] in [result]. Defers to
    // [maybeAddArticleToOne].
    void maybeAddArticleToAny(ComplementType complement) {
      final entity = report.getEntityByType(complement);

      if (entity == null) return;
      if (entity.nameIsProperNoun) return;

      // Only nouns need particles (i.e. not pronouns or "the other nouns").
      maybeAddArticleToOne(entity, complement.noun);
      maybeAddArticleToOne(entity, complement.nounPossessive);
      maybeAddArticleToOne(entity, complement.nounWithAdjective);
      maybeAddArticleToOne(entity, complement.nounWithAdjectivePossessive);
    }

    maybeAddArticleToAny(ComplementType.SUBJECT);
    maybeAddArticleToAny(ComplementType.OBJECT);
    maybeAddArticleToAny(ComplementType.OBJECT2);
    maybeAddArticleToAny(ComplementType.OWNER);
    maybeAddArticleToAny(ComplementType.OBJECT_OWNER);

    return result;
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

  /// Modifies stopwords in [string] according to [qualifications].
  ///
  /// For example, if [qualifications] say that the subject should be omitted,
  /// this method will remove the string `"<subject>"` from [string]. If it
  /// says the subject can be referred to by a pronoun, this method will
  /// replace all `"<subject>"` with `"<subjectPronoun>"`, and all
  /// `"<subject's>"` to `"<subjectPronoun's>"`.
  String _concretizeStopwords(
      String string, Report report, ReportIdentifiers qualifications) {
    var result = string;

    void modifyForComplement(ComplementType complement) {
      final entity = report.getEntityByType(complement);

      if (entity == null) {
        assert(
            !result.contains(complement.generic),
            "Stopword ${complement.generic} present when entity is null: "
            "$result");
        assert(
            !result.contains(complement.genericPossessive),
            "Stopword ${complement.genericPossessive} present when "
            "entity is null: $result");
        return;
      }

      switch (qualifications.getByType(complement)) {
        case IdentifierLevel.omitted:
          if (complement.isSubject) {
            assert(
                !result.contains(complement.generic) ||
                    result.startsWith(complement.generic),
                'Should either start with ${complement.generic} '
                'or not have it, but instead: $result');

            result = _replaceFirstThenAll(
              result,
              first: {
                '${complement.generic} ': '',
                complement.generic: '',
              },
              following: {
                complement.generic: complement.pronoun,
                complement.genericPossessive: complement.pronounPossessive,
              },
            );
          } else {
            // Not subject.
            throw UnimplementedError('Only subjects can be omitted in $result, '
                'but $qualifications show it for $complement');
          }
          break;

        case IdentifierLevel.pronoun:
          result = _replaceFirstThenAll(
            result,
            first: {
              complement.generic: complement.pronoun,
              complement.genericPossessive: complement.pronounPossessive,
            },
            following: {
              complement.generic: complement.pronoun,
              complement.genericPossessive: complement.pronounPossessive,
            },
          );
          break;
        case IdentifierLevel.adjectiveOne:
          result = _replaceFirstThenAll(
            result,
            first: {
              complement.generic: complement.adjectiveOne,
              complement.genericPossessive: complement.adjectiveOnePossessive,
            },
            following: {
              complement.generic: complement.pronoun,
              complement.genericPossessive: complement.pronounPossessive,
            },
          );
          break;
        case IdentifierLevel.noun:
          result = _replaceFirstThenAll(
            result,
            first: {
              complement.generic: complement.noun,
              complement.genericPossessive: complement.nounPossessive,
            },
            following: {
              complement.generic: complement.pronoun,
              complement.genericPossessive: complement.pronounPossessive,
            },
          );
          break;

        case IdentifierLevel.ownerPronounsNoun:
          assert(entity.firstOwnerId != null);

          result = _replaceFirstThenAll(
            result,
            first: {
              complement.generic: complement.ownerPronounsNoun,
              complement.genericPossessive:
                  complement.ownerPronounsNounPossessive,
            },
            following: {
              complement.generic: complement.pronoun,
              complement.genericPossessive: complement.pronounPossessive,
            },
          );
          break;

        case IdentifierLevel.ownerNamesNoun:
          assert(entity.firstOwnerId != null);

          result = _replaceFirstThenAll(
            result,
            first: {
              complement.generic: complement.ownerNamesNoun,
              complement.genericPossessive: complement.ownerNamesNounPossessive,
            },
            following: {
              complement.generic: complement.pronoun,
              complement.genericPossessive: complement.pronounPossessive,
            },
          );
          break;

        case IdentifierLevel.adjectiveNoun:
          result = _replaceFirstThenAll(
            result,
            first: {
              complement.generic: complement.nounWithAdjective,
              complement.genericPossessive:
                  complement.nounWithAdjectivePossessive,
            },
            following: {
              complement.generic: complement.pronoun,
              complement.genericPossessive: complement.pronounPossessive,
            },
          );
          break;
        case IdentifierLevel.properNoun:
          result = _replaceFirstThenAll(
            result,
            first: {
              complement.generic: complement.noun,
              complement.genericPossessive: complement.nounPossessive,
            },
            following: {
              complement.generic: complement.pronoun,
              complement.genericPossessive: complement.pronounPossessive,
            },
          );
          break;
      }

      assert(!result.contains(complement.generic),
          "Still contains ${complement.generic}: $result");

      assert(!result.contains(complement.genericPossessive),
          "Still contains ${complement.genericPossessive}: $result");
    }

    modifyForComplement(ComplementType.SUBJECT);
    modifyForComplement(ComplementType.OBJECT);
    modifyForComplement(ComplementType.OBJECT2);
    modifyForComplement(ComplementType.OWNER);
    modifyForComplement(ComplementType.OBJECT_OWNER);

    return result;
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

  /// A special case for things like "Haijing's it" or "wolf's they". In this
  /// case, we just want to drop the possessive.
  String _preventPossessivesBeforePronouns(String string, Report report) {
    String result = string;

    void maybeRemovePossessive(ComplementType complement) {
      final entity = report.getEntityByType(complement);
      if (entity == null) return;

      for (final pronoun in complement.allPronouns) {
        for (final possessive in ComplementType.allPossessives) {
          result = result.replaceAll("$possessive $pronoun", pronoun);
        }
      }
    }

    maybeRemovePossessive(ComplementType.SUBJECT);
    maybeRemovePossessive(ComplementType.OBJECT);
    maybeRemovePossessive(ComplementType.OBJECT2);
    maybeRemovePossessive(ComplementType.OWNER);
    maybeRemovePossessive(ComplementType.OBJECT_OWNER);

    return result;
  }

  /// A special case for things like "Bilbo swings Sting at the orc." In this
  /// case, we don't want to say "his Sting", since "Sting" is a proper noun
  /// and it sounds weird.
  String _preventPossessivesBeforeProperNouns(String string, Report report) {
    String result = string;

    void maybeRemovePossessive(Entity entity, ComplementType complement) {
      if (entity == null) return;
      if (!entity.nameIsProperNoun) return;
      for (final stopword in [
        complement.noun,
        complement.nounPossessive,
        complement.nounWithAdjective,
        complement.nounWithAdjectivePossessive,
      ]) {
        for (final possessive in ComplementType.allPossessives) {
          result = result.replaceAll("$possessive $stopword", stopword);
        }
      }
    }

    maybeRemovePossessive(report.subject, ComplementType.SUBJECT);
    maybeRemovePossessive(report.object, ComplementType.OBJECT);
    maybeRemovePossessive(report.object2, ComplementType.OBJECT2);

    return result;
  }

  /// Takes care of substitution of stopwords for actual text.
  ///
  /// For example, `<subject>` becomes `the goblin` or `she`.
  String _realizeStopwords(
    String str,
    Report report, {
    @required Entity Function(int) getEntityFromId,
  }) {
    Entity subject = report.subject;
    String result = str;

    assert(!str.contains("<is>n't"), "Please use <isn't> instead.");

    if (subject != null) {
      if (subject.isPlayer) {
        // don't talk like a robot: "player attack wolf" -> "you attack wolf"
        result = result.replaceAll(
            ComplementType.SUBJECT.generic, ComplementType.SUBJECT.pronoun);
        result = result.replaceAll(ComplementType.SUBJECT.genericPossessive,
            ComplementType.SUBJECT.pronounPossessive);
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

      result = result.replaceAll(
          ComplementType.SUBJECT.pronoun, subject.pronoun.nominative);
    }

    // Replaces stopwords for objects (but not possessive stopwords yet).
    void substituteForType(ComplementType x) {
      assert(
          !result.contains(x.generic),
          "By this time, ${x.generic} should have been substituted "
          "by alternatives in $result.");
      assert(
          !result.contains(x.genericPossessive),
          "By this time, ${x.genericPossessive} should have been substituted "
          "by alternatives in $result.");

      final object = report.getEntityByType(x);

      if (object == null) return;

      if (object.nameIsProperNoun) {
        // Disallow "you unleash your Buster".
        // We must do this before we auto-change <OBJECT> to object.name below.
        result = result.replaceAll(
            "${ComplementType.SUBJECT.genericPossessive} ${x.noun}", x.noun);
        result = result.replaceAll(
            "${ComplementType.SUBJECT.pronounPossessive} ${x.noun}", x.noun);
      }

      result = result.replaceFirst(x.noun, object.name);

      // Solve particles for object that needs an adjective.
      result = result.replaceFirst(
          x.nounWithAdjective, '${object.adjective} ${object.name}');

      // Replace the rest.
      result = result.replaceAll(x.noun, object.pronoun.accusative);
      result = result.replaceAll(x.pronoun, object.pronoun.accusative);
      result =
          result.replaceAll(x.pronounAccusative, object.pronoun.accusative);
      result = result.replaceAll(x.pronounSelf, object.pronoun.self);
      result = result.replaceAll(x.adjectiveOne, "the ${object.adjective} one");

      result = result.replaceAll(x.nounPossessive, "${object.name}'s");
      result = result.replaceAll(x.nounWithAdjectivePossessive,
          "${object.adjective} ${object.name}'s");
      result = result.replaceAll(x.pronounPossessive, object.pronoun.genitive);
      result = result.replaceAll(
          x.adjectiveOnePossessive, "the ${object.adjective} one's");

      if (object.firstOwnerId == null) {
        // If firstOwnerId is null, then `result` shouldn't contain any
        // of these.
        assert(!result.contains(x.ownerPronounsNoun));
        assert(!result.contains(x.ownerPronounsNounPossessive));
        assert(!result.contains(x.ownerNamesNoun));
        assert(!result.contains(x.ownerNamesNounPossessive));
      } else {
        final owner = getEntityFromId(object.firstOwnerId);
        final the_ = owner.nameIsProperNoun ? '' : 'the ';

        result = result.replaceAll(
            x.ownerPronounsNoun, "${owner.pronoun.genitive} ${object.name}");
        result = result.replaceAll(x.ownerPronounsNounPossessive,
            "${owner.pronoun.genitive}'s ${object.name}'s");
        result = result.replaceAll(
            x.ownerNamesNoun, "$the_${owner.name}'s ${object.name}");
        result = result.replaceAll(x.ownerNamesNounPossessive,
            "$the_${owner.name}'s ${object.name}'s");
      }
    }

    substituteForType(ComplementType.SUBJECT);
    substituteForType(ComplementType.OBJECT);
    substituteForType(ComplementType.OBJECT2);
    substituteForType(ComplementType.OWNER);
    substituteForType(ComplementType.OBJECT_OWNER);

    // Second pass after [substituteObject], now with possessives.
    // We need to do this in two parts because otherwise the
    // "<object's> <object2>" pairs will get realized too soon, which breaks
    // the logic in [addParticleToFirstOccurrence] that prevents sentences
    // like "his the left hand".
    void substituteObjectPossessive(ComplementType x) {
      final object = report.getEntityByType(x);

      if (object == null) return;

      result = result.replaceFirst(x.genericPossessive, "${object.name}'s");
      result = result.replaceAll(x.genericPossessive, object.pronoun.genitive);
      result = result.replaceAll(x.pronounPossessive, object.pronoun.genitive);
      result =
          result.replaceAll(x.pronounAccusative, object.pronoun.accusative);
      result =
          result.replaceAll(x.pronounNominative, object.pronoun.nominative);
    }

    substituteObjectPossessive(ComplementType.OBJECT);
    substituteObjectPossessive(ComplementType.OBJECT2);
    substituteObjectPossessive(ComplementType.OWNER);
    substituteObjectPossessive(ComplementType.OBJECT_OWNER);

    if (subject != null) {
      result = result.replaceAll(
          ComplementType.SUBJECT.pronounPossessive, subject.pronoun.genitive);
    }

    return result;
  }

  /// When something is [IdentifierLevel.ownerNamesNoun] or
  /// [IdentifierLevel.ownerPronounsNoun], we don't need `<owner's>`
  /// or `<objectOwner's>` before it anymore, since it will be extracted to
  /// that.
  String _removeOwnerStopwords(String string, Report report) {
    String result = string;

    final ownerPossessives = [
      ComplementType.OWNER.genericPossessive,
      ComplementType.OBJECT_OWNER.genericPossessive,
    ];

    void maybeRemoveOwnerPossessiveBefore(ComplementType complement) {
      final entity = report.getEntityByType(complement);
      if (entity == null) return;

      for (final possessive in ownerPossessives) {
        result = result.replaceAll(
            "$possessive ${complement.generic}", complement.generic);
      }
    }

    maybeRemoveOwnerPossessiveBefore(ComplementType.SUBJECT);
    maybeRemoveOwnerPossessiveBefore(ComplementType.OBJECT);
    maybeRemoveOwnerPossessiveBefore(ComplementType.OBJECT2);

    return result;
  }

  /// When an entity's owner is already mentioned in the [report], we
  /// extract it as a stopword. For example, if [Report.object] has
  /// an [Entity.firstOwnerId] of the [Report.subject], then we'll modify
  /// `<object>` to `<subject's> <object>`.
  ///
  /// This plays better with later methods, such as [_concretizeStopwords].
  ///
  /// TODO: Instead of doing this hack, add owners of entities into the report
  ///       as full-fledged entities.
  String _extractMentionedOwnerStopwords(
    String string,
    Report report,
    ReportIdentifiers qualifications, {
    @required Entity Function(int) getEntityFromId,
  }) {
    String result = string;

    const identifierLevelsWithOwners = [
      IdentifierLevel.ownerNamesNoun,
      IdentifierLevel.ownerPronounsNoun
    ];

    void maybeAddStopwordBefore(ComplementType complement) {
      final entity = report.getEntityByType(complement);
      if (entity == null) return;

      final identifierLevel = qualifications.getByType(complement);
      if (!identifierLevelsWithOwners.contains(identifierLevel)) return;

      assert(entity.firstOwnerId != null);

      final owner = getEntityFromId(entity.firstOwnerId);

      qualifications.forEachEntityIn(report,
          (otherComplement, otherEntity, otherSet) {
        if (owner.id == otherEntity.id) {
          result = result.replaceAll(complement.generic,
              '${otherComplement.genericPossessive} ${complement.generic}');
          qualifications.patchByType(complement, IdentifierLevel.noun);
        }
      });
    }

    maybeAddStopwordBefore(ComplementType.SUBJECT);
    maybeAddStopwordBefore(ComplementType.OBJECT);
    maybeAddStopwordBefore(ComplementType.OBJECT2);

    return result;
  }

  // Never show "the guard's it".
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

  /// Takes the string, and first searches for keys in [first]. Once that is
  /// found, the corresponding value in [first] is used as replacement.
  ///
  /// After that, all keys in [following] are used, and they are all replaced
  /// with the corresponding values in [following].
  ///
  /// Example:
  ///
  ///   string: <subject> fall<s> into <object's> <object2>
  ///   first:
  ///     - "<subject>": "<subjectNoun>"
  ///     - "<subject's>": "<subjectNoun's>"
  ///   following:
  ///     - "<subject>": "<subjectPronoun>"
  ///     - "<subject's>": "<subjectPronoun's>"
  static String _replaceFirstThenAll(
    String string, {
    @required Map<Pattern, String> first,
    @required Map<Pattern, String> following,
  }) {
    var result = string;

    // Find the pattern in [first] that has the earliest match.
    Pattern winner;
    int winnerIndex;
    for (final key in first.keys) {
      final index = string.indexOf(key);
      if (index == -1) {
        continue;
      }
      if (winner == null || index < winnerIndex) {
        winner = key;
        winnerIndex = index;
      }
    }

    if (winner != null) {
      result = result.replaceFirst(winner, first[winner]);
    }

    for (final key in following.keys) {
      result = result.replaceAll(key, following[key]);
    }
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
