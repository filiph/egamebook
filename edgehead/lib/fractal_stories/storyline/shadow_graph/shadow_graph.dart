library storyline.shadow_graph;

import 'dart:collection';
import 'dart:math';

import 'package:built_value/built_value.dart' show $jc, $jf;
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:logging/logging.dart';

part 'src/identifier.dart';
part 'src/report_pair.dart';
part 'src/sentence_join_type.dart';

/// A graph that tells [Storyline] where to use what qualification (e.g. "he" or
/// "the goblin" or "the red goblin") and how to join sentences (e.g. "and" or
/// "but" or just plain period).
///
/// Algorithm at a glance:
///
/// * construct a "graph" like above - how each entity goes in and out of the
/// discourse * create a "shadow graph" which has "minimum qualification
/// (pronoun -> proper noun)" and "maximum qualification" for each entity for
/// each report. At first, this is all at the lowest level (everything is
/// pronoun) for "minimum" and highest (proper noun) for the "maximum" *
/// actually, this should be a `Set<QualificationLevel>` * also create a graph
/// of begin / end sentence possibilities (`Set<SentenceJoinType>`) (sentence
/// joiners: period, comma, period-and, period-but, and, but) * fill the joiner
/// graph with obvious / forced stuff * wholeSentence == period * but == but *
/// detect "forced pronoun" (when the string says `<subjectPronoun>` but no
/// `<subject>`, for example) * these things will collapse minimum and maximum
/// to just "pronoun" * detect missing proper nouns * these will lower maximum
/// beneath proper nouns * detect missing adjectives * removes everything that
/// involves an adjective * start filling in the obvious. E.g.: 	* start of
/// Storyline must have ">pronoun" for everything. 	* (the above, more
/// generally) - everything that hasn't been mentioned must be ">pronoun" * if
/// there are two sentences next to each other, and the second one has the same
/// pair of entities (1 + 2), the minimum qualification level of the subject of
/// the second sentence goes to a level that makes it obvious which one we're
/// talking about * identify places that are great opportunities. e.g. 	* 2 + 3
/// is great, because it's the same subject, and the second sentence doesn't
/// have another entity in it * the sentence joiner between 2 and 3 is "and" *
/// the qualification level for subject in 3 is `pronoun` (or even "omitted"?) *
/// qual level of every other entity in these sentences is modified accordingly
/// (i.e. other entity with same pronoun becomes ">pronoun") * another great
/// opportunity is a string of 3 reports with the same subject * joiners are:
/// comma + and * qual level for second and third sentence are "omitted" *
/// identify good opportunities (second pass) * Alternate long and short
/// sentences. * Join "but" sentences with same subject with "but" (not period).
/// * Join "but" sentences with different subjects with "but-period". * Prevent
/// two "buts" next to each other. * We apply baseline rules * "the other" -
/// only when there are two entities of same class and nobody else * adjective +
/// "one" - only when the sentence has a subject with same name but different
/// adjective, and we used the adjective for the subject recently * "the other
/// $noun" - only when there are only two instances of $noun (red and green
/// goblin, no blue goblin) * noun - only when there is no other entity with the
/// same $name in the whole storyline * AI: maybe give Storyline a list of
/// active entities before realization. Because the paragraph might not mention
/// the blue orc, so Storyline omits "red" in "red orc", but it's still
/// confusing for the player ("which one?"). * Lastly, go from left to right and
/// fill in the rest of the joiners and concretize the qualification level of
/// each entity * use the least qualified level (e.g. omit / pronoun when
/// possible) * Assert that there is no place where we have nothing to choose
/// from.
class ShadowGraph {
  /// An [Entity] used to signify that no entity can be referred to by
  /// an identifier. This usually means that, for example, [Pronoun.HE]
  /// cannot be used because two of the entities use it.
  static final Entity noEntity = Entity(name: 'NO ENTITY');

  /// The [ShadowGraph] sometimes must backtrack, and try constructing itself
  /// again. For example, it might have to add a new entity to a report
  /// in order to distinguish some object from another (e.g. there are two
  /// swords, and to distinguish them, we need to bring in the owners
  /// of those swords).
  static const _maxIterations = 10;

  /// All the entities mentioned in the original storyline's [Report]s
  /// ([Report.subject], [Report.object], etc., for every report
  /// in the storyline).
  ///
  /// This does not contain all the relevant entities (e.g. all the actors
  /// that are alive in the world): those are in [_storylineEntities].
  ///
  /// This also doesn't contain entities that are added later (e.g. because
  /// some noun needs to be distinguished from another using
  /// [Element.firstOwnerId], and so we need to add the first owner's entity
  /// into the mix).
  final Set<Entity> _mentionedEntities;

  /// All the entities that could be relevant but aren't necessarily mentioned
  /// in the storyline.
  ///
  /// It's important to know them because they form the context of the
  /// utterance. For example, we don't want to start the storyline by saying
  /// "The goblin stands up" when there are 3 goblins present.
  final UnmodifiableMapView<int, Entity> _storylineEntities;

  /// For each report, this maps from different concrete identifiers
  /// (such as "he" or "the goblin") to entities in that report.
  late List<Map<Identifier, Entity>> _identifiers;

  /// These are the reports. They "shadow" the storyline's original [Report]s.
  /// This provides a way to modify the nature of the reports (such as adding
  /// an entity where needed) without modifying the underlying, immutable
  /// reports.
  late List<ShadowReport> reports;

  factory ShadowGraph.from(Storyline storyline) {
    /// These are the reports we get from the storyline itself.
    List<Report> reports = storyline.rawReports;
    late ShadowGraph graph;

    // Try at most ten times to construct the ShadowGraph.
    //
    // The loop goes at least twice, so that we can guarantee that no new
    // entities had to be added at some point during the first pass.
    for (var i = 0; i < _maxIterations; i++) {
      final mentionedEntities = _getAllMentionedEntities(reports);
      graph = ShadowGraph._(storyline, reports, mentionedEntities);

      if (_checkEquivalent(graph.reports, reports)) {
        // No modification to entities in the ShadowGraph. We're done here.
        break;
      }

      // The graph had to add entities. Run again with the added entities
      // by replacing the previous reports with the new ones.
      //
      // The new reports have the added entities in the form of, for example,
      // [ShadowReport.objectOwner].
      reports = graph.reports;
    }

    return graph;
  }

  /// The private constructor. Use the [ShadowGraph.from] factory.
  ShadowGraph._(
      Storyline storyline, List<Report> reports, this._mentionedEntities)
      : _storylineEntities = storyline.allEntities {
    this.reports = List.generate(
      reports.length,
      (index) => ShadowReport(reports[index], getEntityById),
      growable: false,
    );

    _fillForcedJoinersAndConjunctions();
    __assertAtLeastOneJoiner();
    _detectMissingProperNouns();
    __assertAtLeastOneIdentifier();
    _detectReportsNotStartingWithSubject();
    __assertAtLeastOneIdentifier();
    _detectMissingAdjectives();
    __assertAtLeastOneIdentifier();
    _detectMissingOwners();
    __assertAtLeastOneIdentifier();
    _forceOwners();
    __assertAtLeastOneIdentifier();
    _detectFirstMentions();
    __assertAtLeastOneIdentifier();
    _identifiers = _getIdentifiersThroughoutStory();
    _removeQualificationsWhereUnavailable(_identifiers);
    __assertAtLeastOneIdentifier();
    _findPositiveNegativeButConjunctions();
    __assertAtLeastOneIdentifier();
    __assertAtLeastOneJoiner();
    _find2JoinerOpportunitiesP0();
    __assertAtLeastOneIdentifier();
    __assertAtLeastOneJoiner();
    _find2JoinerOpportunitiesP1();
    __assertAtLeastOneIdentifier();
    __assertAtLeastOneJoiner();
    _fillOtherJoiners();
    __assertAtLeastOneIdentifier();
    __assertExactlyOnePossibleJoiner();
    _removeOmittedAtStartsOfSentences();
    __assertAtLeastOneIdentifier();
    _detectForcedPronouns();
    __assertAtLeastOneIdentifier();
    _removeButsTooClose();

    _retainTheLowestPossibleIdentifiers();
    _retainTheHighestPossibleConjunction();
  }

  Set<Entity> get allMentionedEntities => _mentionedEntities;

  UnmodifiableListView<SentenceConjunction> get conjunctions =>
      UnmodifiableListView(
          reports.map((report) => report._conjunctions.single));

  UnmodifiableListView<SentenceJoinType> get joiners =>
      UnmodifiableListView(reports.map((report) => report._joiners.single));

  UnmodifiableListView<ReportIdentifiers> get qualifications =>
      UnmodifiableListView(reports.map((report) => report._reportIdentifiers));

  String describe() {
    final buf = StringBuffer();

    for (int i = 0; i < reports.length; i++) {
      final qual = reports[i]._reportIdentifiers;
      buf.writeln('=== ${i + 1} ===');
      buf.writeln('subject: ${qual._subjectRange}');
      buf.writeln('object: ${qual._objectRange}');
      buf.writeln('object2: ${qual._object2Range}');

      final ids = reports[i]._identifiers;
      buf.writeln('identifiers: $ids');

      buf.writeln(reports[i]._joiners);
      buf.writeln(reports[i]._conjunctions);
      buf.writeln();
    }
    return buf.toString();
  }

  /// Uses the [currentEntities] to find the entity with the provided [id].
  ///
  /// If it cannot find the entity among the current ones (usually the ones
  /// mentioned in the current [Storyline]), it will broaden the search
  /// to [_storylineEntities] (which are generally all entities in the Book).
  ///
  /// Returns `null` if the entity with [id] cannot be found.
  Entity getEntityById(int id) {
    for (final entity in _mentionedEntities) {
      if (entity.id == id) return entity;
    }

    final result = _storylineEntities[id];
    assert(
        result != null,
        'The entity with id=$id is missing from both '
        'currentEntities=$_mentionedEntities and from '
        '_storylineEntities=$_storylineEntities');
    return result!;
  }

  void __assertAtLeastOneIdentifier() {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      reports[i]._reportIdentifiers.forEachEntityIn(report,
          (complement, entity, set) {
        assert(
            set.isNotEmpty,
            "We have an empty range ($set) for $entity ($complement) "
            "in $report (#$i).\n"
            "Reports: $reports\n\n"
            "Identifiers: ${report._identifiers}\n\n"
            "ReportIdentifiers: ${report._reportIdentifiers}");
        assert(
            complement == ComplementType.SUBJECT ||
                set.difference(const {IdentifierLevel.omitted}).isNotEmpty,
            "The identifier range only has 'omitted' despite the fact that "
            "complement is $complement for $entity in $report (#$i).");
      });
    }
  }

  void __assertAtLeastOneJoiner() {
    for (int i = 0; i < reports.length; i++) {
      assert(
          reports[i]._joiners.isNotEmpty,
          "There should be at least one joiner "
          "for ${reports[i]} at this point "
          "but instead there is: ${reports[i]._joiners}.");
    }
  }

  void __assertExactlyOnePossibleJoiner() {
    for (int i = 0; i < reports.length; i++) {
      assert(
          reports[i]._joiners.length == 1,
          "There should be a single joiner "
          "for ${reports[i]} but instead there is: ${reports[i]._joiners}.");
    }
  }

  void _allowAnd(int i) {
    if (i < 0 || i >= reports.length) return;
    reports[i]._conjunctions.add(SentenceConjunction.and);
  }

  void _allowBut(int i) {
    if (i < 0 || i >= reports.length) return;
    reports[i]._conjunctions.add(SentenceConjunction.but);
  }

  void _allowObjectPronoun(int i) {
    reports[i]._reportIdentifiers._objectRange.add(IdentifierLevel.pronoun);
  }

  /// In any storyline, the first time we mention anyone after a while,
  /// we cannot use pronouns or any other confusing identifiers.
  void _detectFirstMentions() {
    final Set<int> everMentionedIds = {};
    // Maps from entity ID to the most recent report index it was referenced.
    final Map<int, int> lastMentionedTimes = {};
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      reports[i]._reportIdentifiers.forEachEntityIn(report,
          (complement, entity, set) {
        if (!entity.isPlayer && !everMentionedIds.contains(entity.id)) {
          // If this is the first time we mention this entity, call it by
          // at least the noun.
          set.removeAll([
            IdentifierLevel.omitted,
            IdentifierLevel.pronoun,
            IdentifierLevel.adjectiveOne,
          ]);

          everMentionedIds.add(entity.id);
        }

        assert(
            set.isNotEmpty,
            'The range of identifiers for $entity ($complement) '
            'is already empty. Entities: $_mentionedEntities.');

        // Unless we just talked about the entity...
        if ((lastMentionedTimes[entity.id] ?? -1000) < i - 1) {
          // ... disallow any identifiers that might confuse this with
          // any other entity.
          set.removeAll(
              _getConflictingQualificationLevels(entity, _mentionedEntities));
        }

        if (set.isEmpty && entity.isCommon) {
          // This is something like "stance" or similar. It's possible there
          // are two stances mentioned in the same storyline.
          log.severe("The entity reached an empty set of IdentifierLevel, "
              "but was also common, so we're adding one level back: $entity. "
              "Report: $report");
          set.add(IdentifierLevel.noun);
        }

        assert(
            set.isNotEmpty,
            'The range of identifiers for $entity ($complement) '
            'is already empty. Entities: $_mentionedEntities.');

        lastMentionedTimes[entity.id] = i;
      });
    }
  }

  /// Detect "forced pronouns" (when the string says `<subjectPronoun>`
  /// but no `<subject>`, for example).
  void _detectForcedPronouns() {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];

      for (final complement in ComplementType.all) {
        if (report.string.contains(complement.pronoun) &&
            !report.string.contains(complement.generic)) {
          reports[i]._reportIdentifiers.getRangeByType(complement)
            ..clear()
            ..add(IdentifierLevel.pronoun);
        }
      }
    }
  }

  /// Detects entities that have [Entity.adjective] == `null`, and removes
  /// the relevant [IdentifierLevel]s.
  void _detectMissingAdjectives() {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      reports[i]._reportIdentifiers.forEachEntityIn(report,
          (complement, entity, set) {
        if (entity.adjective == null) {
          set.removeAll(
              [IdentifierLevel.adjectiveOne, IdentifierLevel.adjectiveNoun]);
        }
      });
    }
  }

  /// Detects entities that have [Entity.firstOwnerId] == `null`, and removes
  /// the relevant [IdentifierLevel]s.
  ///
  /// This does not preclude the existence of a separate [Report.owner],
  /// for example. This is just for the [Entity.firstOwnerId]-related owners.
  void _detectMissingOwners() {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      reports[i]._reportIdentifiers.forEachEntityIn(report,
          (complement, entity, set) {
        if (entity.firstOwnerId == null) {
          set.removeAll([
            IdentifierLevel.ownerNoun,
            IdentifierLevel.ownerAdjectiveNoun,
          ]);
        }
      });
    }
  }

  /// Detect missing proper nouns -- when an entity does not have a proper
  /// noun (e.g. "John").
  void _detectMissingProperNouns() {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      reports[i]._reportIdentifiers.forEachEntityIn(report,
          (complement, entity, set) {
        if (!entity.nameIsProperNoun) {
          set.remove(IdentifierLevel.properNoun);
        }
      });
    }
  }

  /// Detect sentences which don't start with "<subject>", and therefore
  /// cannot omit subject.
  ///
  /// For example, a sentence like "in the meantime, <subject> take<s> <object>"
  /// does not start with "<subject>", and so subject cannot be omitted.
  void _detectReportsNotStartingWithSubject() {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      if (!report.string.startsWith(ComplementType.SUBJECT.generic)) {
        reports[i]
            ._reportIdentifiers
            ._subjectRange
            .remove(IdentifierLevel.omitted);
      }
    }
  }

  /// Fill the joiner graph with obvious / forced stuff, such as:
  ///
  /// * wholeSentence == none
  /// * isRaw == none
  void _fillForcedJoinersAndConjunctions() {
    // Always start with new sentence (no ", and" or period).
    reports[0]._joiners
      ..clear()
      ..add(SentenceJoinType.none);

    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      if (report.wholeSentence || report.isRaw) {
        _limitJoinerToPeriodOrNone(i);
        _limitJoinerToNone(i + 1);
      }
      if (report.endSentence) {
        _limitJoinerToPeriod(i + 1);
      }
      if (report.but) {
        _allowBut(i);
      }
    }
  }

  void _fillOtherJoiners() {
    for (int i = 0; i < reports.length; i++) {
      final set = reports[i]._joiners;
      if (set.length > 1) {
        if (set.contains(SentenceJoinType.period)) {
          set.retainAll([SentenceJoinType.period]);
        } else if (set.contains(SentenceJoinType.none)) {
          set.retainAll([SentenceJoinType.none]);
        } else {
          throw StateError("Set: $set");
        }
      }
    }
  }

  /// Find opportunities to join two sentences in one.
  ///
  /// P0 means these are the best ones, we should definitely go for them.
  void _find2JoinerOpportunitiesP0() {
    for (final pair in _ReportPair.getPairs(reports)) {
      // The goblin tries to dodge and/but fails.
      if (pair.hasSameVerbType &&
          pair.hasSameSubject &&
          pair.first.object == null &&
          pair.second.object == null &&
          reports[pair.index]._joiners.hasPeriodOrNone &&
          reports[pair.index + 1]._joiners.hasComma) {
        _limitJoinerToPeriodOrNone(pair.index);
        _limitJoinerToComma(pair.index + 1);
        _allowAnd(pair.index + 1);
      }

      // The orcish captain avoids the goblin and regains balance.
      if (pair.hasSameVerbType &&
          pair.hasSameSubject &&
          pair.second.object == null &&
          reports[pair.index]._joiners.hasPeriodOrNone &&
          reports[pair.index + 1]._joiners.hasComma) {
        _limitJoinerToPeriodOrNone(pair.index);
        _limitJoinerToComma(pair.index + 1);
        _allowAnd(pair.index + 1);
        continue;
      }

      // He lifts the goblin captain via telekinesis,
      // and hurls him at the orcish one.
      if (pair.hasSameVerbType &&
          pair.hasSameSubject &&
          pair.hasSameObject &&
          reports[pair.index]._joiners.hasPeriodOrNone &&
          reports[pair.index + 1]._joiners.hasComma) {
        _limitJoinerToPeriodOrNone(pair.index);
        _limitJoinerToComma(pair.index + 1);
        _allowObjectPronoun(pair.index + 1);
        _allowAnd(pair.index + 1);
        continue;
      }
    }
  }

  /// Find opportunities to join two sentences in one.
  ///
  /// P1 means these are not as great at [_find2JoinerOpportunitiesP0].
  void _find2JoinerOpportunitiesP1() {
    for (final pair in _ReportPair.getPairs(reports)) {
      // He has his dagger and his shield.
      if (pair.hasSameVerbType &&
          pair.hasSameSubject &&
          reports[pair.index]._joiners.hasPeriodOrNone &&
          reports[pair.index + 1]._joiners.hasComma) {
        _limitJoinerToPeriodOrNone(pair.index);
        _limitJoinerToComma(pair.index + 1);
        _allowAnd(pair.index + 1);
        continue;
      }

      // I dodge the red orc and he hits the concrete floor.
      if (pair.hasSameVerbType &&
          pair.first.object != null &&
          pair.second.subject == pair.first.object &&
          reports[pair.index]._joiners.hasPeriodOrNone &&
          reports[pair.index + 1]._joiners.hasComma) {
        _limitJoinerToPeriodOrNone(pair.index);
        _limitJoinerToComma(pair.index + 1);
        _allowAnd(pair.index + 1);
        continue;
      }
    }
  }

  /// Finds pairs of sentences that should be joined by "but" because
  /// they are "opposite sentiments". For example:
  ///
  ///     The goblin stands up but doesn't regain full balance.
  void _findPositiveNegativeButConjunctions() {
    for (final pair in _ReportPair.getPairs(reports)) {
      // The goblin stands up but doesn't regain full balance.
      if (pair.hasSameSubject && pair.positiveNegativeAreSwitched) {
        _allowBut(pair.index + 1);
      }

      // I stand up but the goblin slashes me again.
      if (pair.hasSameVerbType &&
          pair.subjectsAreEnemies &&
          ((pair.first.object == null || pair.secondSubjectIsFirstObject) ||
              (pair.second.object == null ||
                  pair.firstSubjectIsSecondObject)) &&
          pair.positiveNegativeAreSame) {
        _allowBut(pair.index + 1);
      }
    }
  }

  /// Detects entities that have `<*wner>` before them, and that have
  /// [Entity.firstOwnerId] set, and removes all irrelevant [IdentifierLevel]s.
  ///
  /// Entities with `<*wner>` before them cannot be just [IdentifierLevel.noun],
  /// for example. They are forced to be [IdentifierLevel.ownerNoun]
  /// or [IdentifierLevel.ownerAdjectiveNoun].
  ///
  /// This assures that the author can say
  /// `"<subject> hits <objectOwner's> <object>"` without specifying
  /// `objectOwner`. If `object` has [Entity.firstOwnerId], this storyline
  /// will still be realized.
  void _forceOwners() {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];

      if (report.string.contains(ComplementType.OWNER.genericPossessive) &&
          report.subject!.firstOwnerId != null) {
        reports[i]._reportIdentifiers._subjectRange.retainAll([
          IdentifierLevel.ownerNoun,
          IdentifierLevel.ownerAdjectiveNoun,
        ]);
      }

      if (report.string
              .contains(ComplementType.OBJECT_OWNER.genericPossessive) &&
          report.object!.firstOwnerId != null) {
        reports[i]._reportIdentifiers._objectRange.retainAll([
          IdentifierLevel.ownerNoun,
          IdentifierLevel.ownerAdjectiveNoun,
        ]);
      }

      if (report.string
              .contains(ComplementType.OBJECT2_OWNER.genericPossessive) &&
          report.object2!.firstOwnerId != null) {
        reports[i]._reportIdentifiers._object2Range.retainAll([
          IdentifierLevel.ownerNoun,
          IdentifierLevel.ownerAdjectiveNoun,
        ]);
      }
    }
  }

  /// Returns a set of [IdentifierLevel] where [entity] clashes with
  /// any other entity in [allEntities].
  ///
  /// [allEntities] can include the [entity] itself. This method will
  /// automatically discard it (because obviously, an entity will clash
  /// with itself).
  ///
  /// For an example of a "clashing" qualification level, let's have two
  /// entities:
  ///
  ///   * A burly man
  ///   * A burly boy
  ///
  /// The output of this method would be [IdentifierLevel.pronoun] (because
  /// both the burly man and the burly boy are "he") and
  /// [IdentifierLevel.adjectiveOne] (because both are "the burly one").
  Iterable<IdentifierLevel> _getConflictingQualificationLevels(
      Entity entity, Set<Entity> allEntities) sync* {
    final others =
        Set<Entity>.from(allEntities.where((e) => e.id != entity.id));

    if (others.any((e) => e.pronoun == entity.pronoun)) {
      yield IdentifierLevel.pronoun;
    }

    if (entity.adjective != null &&
        others.any((e) => e.adjective == entity.adjective)) {
      yield IdentifierLevel.adjectiveOne;
    }

    if (!entity.isCommon && others.any((e) => e.name == entity.name)) {
      yield IdentifierLevel.noun;
    }

    if (entity.firstOwnerId != null &&
        others.any((e) =>
            e.name == entity.name && e.firstOwnerId == entity.firstOwnerId)) {
      yield IdentifierLevel.ownerNoun;
    }

    if (entity.adjective != null &&
        others.any(
            (e) => e.name == entity.name && e.adjective == entity.adjective)) {
      yield IdentifierLevel.adjectiveNoun;
    }

    if (entity.firstOwnerId != null &&
        others.any((e) =>
            e.name == entity.name &&
            e.adjective == entity.adjective &&
            e.firstOwnerId == entity.firstOwnerId)) {
      yield IdentifierLevel.ownerAdjectiveNoun;
    }

    if (entity.nameIsProperNoun && others.any((e) => e.name == entity.name)) {
      yield IdentifierLevel.properNoun;
    }
  }

  /// Finds out which [Entity] is referred to by which [Identifier] as the
  /// story unfolds.
  ///
  /// For example, [Pronoun.HE] will not identify anything at first, until
  /// a report mentions an entity that uses the pronoun as [Entity.pronoun].
  List<Map<Identifier, Entity>> _getIdentifiersThroughoutStory() {
    final result = List<Map<Identifier, Entity>?>.filled(reports.length, null,
        growable: false);
    var previous = <Identifier, Entity>{};

    /// Used to ensure that no two unrelated entities have the same id.
    final assertionIdMap = <int, Type>{};

    /// Gets an entity, either from [entities] (mentioned in this
    /// Storyline), or — if unavailable - in [_storylineEntities].
    Entity getEntity(int id) => _mentionedEntities.singleWhere(
          (e) => e.id == id,
          orElse: () =>
              _storylineEntities.values.singleWhere((e) => e.id == id),
        );

    // We start with a "minus first" report in order to populate [previous]
    // with all entities. This ensures that the first report of the storyline
    // doesn't start referring to one of two orcs as simply "orc".
    for (int i = -1; i < reports.length; i++) {
      final current = <Identifier, Entity>{};

      // Mark [entity] as identifiable with [id], or mark the [id]
      // unusable ([noEntity]) if it's already assigned to some other entity.
      void assign(Identifier id, Entity entity) {
        if (previous.containsKey(id) && previous[id]!.id != entity.id) {
          // A new entity assignable to an id that was assignable to someone
          // else in the preceding report.
          return;
        }
        if (current.containsKey(id) && current[id]!.id != entity.id) {
          // The identifier already points to an entity. Also, that entity
          // isn't _this_ [entity] (which might happen when an entity is both
          // the subject and the object of a report).
          current[id] = noEntity;
        } else {
          current[id] = entity;
        }
      }

      // Mark the previous report's subject as the omitted one in this report.
      if (i >= 1) {
        final previousSubject = reports[i - 1].subject;
        if (previousSubject != null &&
            reports[i].subject?.id == previousSubject.id) {
          current[const Identifier.omitted()] = previousSubject;
        }
      }

      UnmodifiableListView<Entity> reportEntities;
      if (i == -1) {
        // Before the first report in the Storyline,
        // we also add a bogus report that contains all storyline entities
        // (not just this report's entities).
        // This way, we don't start a paragraph with "the orc" when there are,
        // in fact, multiple orcs present.
        reportEntities = UnmodifiableListView(_storylineEntities.values);
      } else {
        final allReportEntities = <Entity>[];
        reports[i]._reportIdentifiers.forEachEntityIn(reports[i],
            (complement, entity, set) {
          allReportEntities.add(entity);
        });
        reportEntities = UnmodifiableListView(allReportEntities);
      }

      for (final entityInReport in reportEntities) {
        assert(!assertionIdMap.containsKey(entityInReport.id) ||
            assertionIdMap[entityInReport.id] == entityInReport.runtimeType);
        assert(() {
          assertionIdMap[entityInReport.id] = entityInReport.runtimeType;
          return true;
        }());

        // This normalizes the entity so it always has the same adjective,
        // pronoun, and so on, during the whole Storyline.
        final entity = getEntity(entityInReport.id);

        if (entity.isCommon) {
          // Can share a storyline with entities of same name, like "thrust".
          final commonNameId = Identifier.commonNoun(entity.name, entity.id);
          assign(commonNameId, entity);
        }

        final pronounId = Identifier.pronoun(entity.pronoun);
        assign(pronounId, entity);

        if (entity.adjective != null &&
            reportEntities.where((e) => e.name == entity.name).length >= 2) {
          final adjectiveOneId = Identifier.adjectiveOne(entity.adjective);
          assign(adjectiveOneId, entity);
        }

        if (!entity.nameIsProperNoun) {
          final nounId = Identifier.noun(entity.name);
          assign(nounId, entity);
        }

        if (entity.firstOwnerId != null) {
          final owner = getEntityById(entity.firstOwnerId!);

          // We're assuming the owner will be mentioned by name here.
          // That might be problematic. What's actually happening is that
          // the owner is "extracted" as [ShadowReport.objectOwner]. They will
          // become a new entity in the report, which means they can be referred
          // to as a pronoun, for example.
          //
          // The assumption is that this is okay. Here, we only need to verify
          // that the identifier is unique: "Tamara's shield" versus
          // "Leroy's shield" versus "Leroy's dagger".
          //
          // That said, there will be a false positive conflict when,
          // for example, Leroy has two daggers. To solve that, we would
          // have to have `Identifier.ownerAdjectiveNoun` or something similar.
          final ownerNounId =
              Identifier.ownerNoun('${owner.name}\'s ${entity.name}');
          assign(ownerNounId, entity);

          // Same as above, but for a combination of owner, adjective and name.
          // For example, "Tamara's red shield".
          if (entity.adjective != null) {
            final ownerAdjectiveNounId = Identifier.ownerAdjectiveNoun(
                '${owner.name}\'s ${entity.adjective} ${entity.name}');
            assign(ownerAdjectiveNounId, entity);
          }
        }

        // TODO: theOtherNoun - by definition, this one will have 2 entities
        //       we would have to know if this is an object or a subject

        if (entity.adjective != null) {
          final adjectiveNounId =
              Identifier.adjectiveNoun('${entity.adjective} ${entity.name}');
          assign(adjectiveNounId, entity);
        }

        if (entity.nameIsProperNoun) {
          final properNounId = Identifier.properNoun(entity.name);
          assign(properNounId, entity);
        }

        assert(
            current.values.any((e) => e.id == entity.id),
            "The entity $entity didn't get any values in $current. "
            "This can mean that you have two entities with the exact "
            "same adjective and name (${entity.adjective} ${entity.name}). "
            "A possible copy-paste error.");
      }

      if (i >= 0) {
        result[i] = current;
      }
      previous = current;
    }

    assert(!result.any((e) => e == null),
        "We haven't filled the whole result list with values.");
    return result.cast<Map<Identifier, Entity>>();
  }

  void _limitJoinerToComma(int i) {
    if (i < 0 || i >= reports.length) return;
    reports[i]._joiners.retainAll(const {
      SentenceJoinType.comma,
    });
  }

  void _limitJoinerToNone(int i) {
    if (i < 0 || i >= reports.length) return;
    reports[i]._joiners.retainAll(const {
      SentenceJoinType.none,
    });
  }

  void _limitJoinerToPeriod(int i) {
    if (i < 0 || i >= reports.length) return;
    reports[i]._joiners
      ..clear()
      ..addAll(const {
        SentenceJoinType.period,
      });
  }

  void _limitJoinerToPeriodOrNone(int i) {
    if (i < 0 || i >= reports.length) return;
    reports[i]._joiners.retainAll(const {
      SentenceJoinType.none,
      SentenceJoinType.period,
    });
  }

  /// Removes buts when two of them are next to each other.
  void _removeButsTooClose() {
    for (int i = 0; i < reports.length - 1; i++) {
      if (reports[i]._conjunctions.contains(SentenceConjunction.but) &&
          reports[i + 1]._conjunctions.contains(SentenceConjunction.but)) {
        // Favor the forced "but".
        if (reports[i].but) {
          reports[i + 1]
              ._conjunctions
              .removeAll(const {SentenceConjunction.but});
          continue;
        }
        if (reports[i + 1].but) {
          reports[i]._conjunctions.removeAll(const {SentenceConjunction.but});
          continue;
        }

        // Otherwise, go with the first "but" and remove the second.
        reports[i + 1]._conjunctions.removeAll(const {SentenceConjunction.but});
      }
    }
  }

  void _removeOmittedAtStartsOfSentences() {
    const startNewSentenceJoiners = [
      SentenceJoinType.period,
      SentenceJoinType.none,
    ];

    for (int i = 0; i < reports.length; i++) {
      // At this point, the final joiner must have been selected.
      final joiner = joiners[i];
      if (startNewSentenceJoiners.contains(joiner)) {
        reports[i]._reportIdentifiers.forEachEntityIn(reports[i],
            (complement, entity, set) {
          set.remove(IdentifierLevel.omitted);
        });
      }
    }
  }

  /// Use the data in [identifiers] to remove qualifications levels
  /// that would be confusing. Disambiguate.
  ///
  /// Most of the work has already been done -- we know which identifiers
  /// (such as "he" or "the goblin") can potentially refer to which
  /// entity in each report. Now we just need to update
  /// the [ReportIdentifiers] accordingly.
  void _removeQualificationsWhereUnavailable(
      List<Map<Identifier, Entity>> identifiers) {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      final current = identifiers[i];
      reports[i]._reportIdentifiers.forEachEntityIn(report,
          (complement, entity, set) {
        assert(
            set.isNotEmpty,
            "set of identifiers is already empty for $complement ($entity)"
            " in $report");

        // Take the identifiers that refer to the entity.
        // For example, in a particular sentence, "he" and "Aren" can
        // both be relevant identifiers for the actor named Aren.
        final relevantIdentifiers = current.entries
            .where((entry) => entry.value.id == entity.id)
            .map((entry) => entry.key)
            .toList();

        // It is possible for an entity to appear which wasn't in the
        // list of entities in [_getIdentifiersThroughoutStory].
        //
        // For example, the algorithm here in
        // _removeQualificationsWhereUnavailable can realize
        // that a `leg` (subject) needs a `goblin's` (owner) because there are
        // two legs at play in the given storyline. Suddenly, the report
        // "<subject> goes limp" also includes a [Report.owner] that
        // wasn't there before. This means we have no [relevantIdentifiers]
        // to work with.
        //
        // Thankfully, the algorithm is iterative. This iteration will fail
        // (because it ends with more entities than it started with) and
        // the next iteration will have the goblin from the start.
        // Here, all we can do is to give the goblin all the identifiers.
        if (relevantIdentifiers.isEmpty) {
          log.info("relevantIdentifiers for $entity are empty in $report: "
              "$current");
          relevantIdentifiers.addAll([
            // All identifiers, except for omitted. Omitted doesn't make sense
            // for anything other than subject, and an added entity
            // is never the subject of the sentence.
            if (entity.adjective != null)
              Identifier.adjectiveNoun('${entity.adjective} ${entity.name}'),
            if (entity.adjective != null)
              Identifier.adjectiveOne(entity.adjective),
            if (!entity.nameIsProperNoun) Identifier.noun(entity.name),
            Identifier.pronoun(entity.pronoun),
            if (entity.nameIsProperNoun) Identifier.properNoun(entity.name),
          ]);
        }

        // Retain only the part of the entity's current range
        // (`Set<QualificationLevel>`) that is supported by one of
        // these identifiers.
        set.retainWhere((level) => relevantIdentifiers
            .any((identifier) => identifier.satisfiedBy(level)));

        assert(
            set.isNotEmpty,
            "range of identifiers for $entity (${entity.id}, $complement) "
            "is empty in $report. "
            "Report relevantIdentifiers: $relevantIdentifiers");
      });
    }
  }

  void _retainTheHighestPossibleConjunction() {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      final conjunctions = reports[i]._conjunctions;
      assert(conjunctions.isNotEmpty, "Missing conjunction for $report (#$i).");
      if (conjunctions.contains(SentenceConjunction.but)) {
        conjunctions.retainAll({SentenceConjunction.but});
      } else if (conjunctions.contains(SentenceConjunction.and)) {
        conjunctions.retainAll({SentenceConjunction.and});
      } else {
        conjunctions.retainAll({SentenceConjunction.nothing});
      }
    }
  }

  /// Only retain the lowest (i.e., least specific) qualification level
  /// for each entity in each report.
  void _retainTheLowestPossibleIdentifiers() {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      reports[i]._reportIdentifiers.forEachEntityIn(report,
          (complement, entity, set) {
        assert(set.isNotEmpty,
            "We have an empty range ($set) for $entity in $report.");
        int j = 0;
        while (set.length > 1) {
          set.remove(orderedQualificationLevels[j]);
          j += 1;
        }
        assert(set.length == 1);
      });
    }
  }

  /// Checks whether [a] and [b] reports have the same entities.
  static bool _checkEquivalent(List<ShadowReport> a, List<Report> b) {
    assert(a.length == b.length,
        "We don't expect to have different sizes of lists here.");
    for (var i = 0; i < min(a.length, b.length); i++) {
      if (!a[i].isEntityEquivalentTo(b[i])) {
        return false;
      }
    }
    return true;
  }

  /// Gets all mentioned entities in [storylineReports].
  ///
  /// The entities will be stored in their initial state. For example,
  /// if an entity changes pronoun during [storylineReports], this will
  /// not be reflected: only the original pronoun will be listed.
  static Set<Entity> _getAllMentionedEntities(
      Iterable<Report> storylineReports) {
    final result = <Entity>{};
    final resultIds = <int>{};
    for (final report in storylineReports) {
      for (final entity in report.allEntities) {
        if (!resultIds.contains(entity.id)) {
          result.add(entity);
          resultIds.add(entity.id);
        }
      }
    }
    return result;
  }
}

/// This is a mutable wrapper around the immutable [Report].
///
/// [ShadowGraph] uses this class to represent the Storyline as it solves
/// the NLG problem.
class ShadowReport implements Report {
  final Report wrapped;

  /// A callback used by [forEachEntityIn()] to find entities by their `id`.
  ///
  /// This is important when we find out an entity such as
  /// [objectOwner] should be added.
  final Entity Function(int id) getEntityById;

  /// For each report, this lists the possible identifiers to use.
  ///
  /// For example, the second sentence might be able to refer to its
  /// subject with a pronoun or with the name (but not with "the other one").
  ///
  /// [ReportIdentifiers] for each report starts with everything allowed,
  /// and the algorithm removes impossibilities.
  final ReportIdentifiers _reportIdentifiers;

  /// The way sentences are stringed together (with period, with comma,
  /// or without anything).
  ///
  /// A [_joiners] describes how the [Report] flows from the report
  /// that precedes it.
  ///
  /// [_joiners] starts with everything allowed, and the algorithm removes
  /// impossibilities (so that at the end, only a few or just one possibility
  /// survives).
  final Set<SentenceJoinType> _joiners = SentenceJoinType.values.toSet();

  /// The conjunction between this report and the previous one.
  ///
  /// No conjunction is possible at the start. The algorithm may add
  /// [SentenceConjunction.and] or [SentenceConjunction.but].
  final Set<SentenceConjunction> _conjunctions = {SentenceConjunction.nothing};

  /// This maps from different concrete identifiers
  /// (such as "he" or "the goblin") to entities in the report.
  Map<Identifier, Entity>? _identifiers;

  ShadowReport(this.wrapped, this.getEntityById)
      : _reportIdentifiers = ReportIdentifiers(getEntityById);

  @override
  int? get actionThread => wrapped.actionThread;

  @override
  Iterable<Entity> get allEntities sync* {
    if (subject != null) yield subject!;
    if (object != null) yield object!;
    if (object2 != null) yield object2!;
    if (owner != null) yield owner!;
    if (objectOwner != null) yield objectOwner!;
    if (object2Owner != null) yield object2Owner!;
  }

  @override
  bool get but => wrapped.but;

  @override
  bool get endSentence => wrapped.endSentence;

  @override
  bool get isRaw => wrapped.isRaw;

  @override
  bool get negative => wrapped.negative;

  @override
  Entity? get object =>
      _reportIdentifiers.getEntityByType(wrapped, ComplementType.OBJECT);

  @override
  Entity? get object2 =>
      _reportIdentifiers.getEntityByType(wrapped, ComplementType.OBJECT2);

  @override
  Entity? get object2Owner =>
      _reportIdentifiers.getEntityByType(wrapped, ComplementType.OBJECT2_OWNER);

  @override
  Entity? get objectOwner =>
      _reportIdentifiers.getEntityByType(wrapped, ComplementType.OBJECT_OWNER);

  @override
  Entity? get owner =>
      _reportIdentifiers.getEntityByType(wrapped, ComplementType.OWNER);

  @override
  bool get positive => wrapped.positive;

  ReportIdentifiers get qualifications => _reportIdentifiers;

  @override
  bool get replacesThread => wrapped.replacesThread;

  @override
  bool get startSentence => wrapped.startSentence;

  @override
  bool get startsThread => wrapped.startsThread;

  @override
  String get string => wrapped.string;

  @override
  Entity? get subject =>
      _reportIdentifiers.getEntityByType(wrapped, ComplementType.SUBJECT);

  @override
  bool get subjectAndObjectAreEnemies => wrapped.subjectAndObjectAreEnemies;

  @override
  int? get time => wrapped.time;

  @override
  bool get wholeSentence => wrapped.wholeSentence;

  @override
  Entity? getEntityByType(ComplementType type) {
    return _reportIdentifiers.getEntityByType(wrapped, type);
  }

  /// Returns `true` if this and [other] are equivalent in terms of
  /// entities. This can be used to check whether the [ShadowReport]
  /// has added any new entities (for example, through a new [owner]
  /// entity that needed to be added because [subject] was
  /// too vague. (E.g. "The sword hits the sword." --> "Tamara's sword
  /// hits the goblin's sword." Tamara and goblin are new entities added
  /// to the report in the process of NLG.)
  bool isEntityEquivalentTo(Report other) {
    assert(
        string == other.string,
        "We don't expect to be checking entity-equivalency of "
        "two completely different reports.");
    return subject == other.subject &&
        object == other.object &&
        object2 == other.object2 &&
        owner == other.owner &&
        objectOwner == other.objectOwner &&
        object2Owner == other.object2Owner;
  }

  @override
  String toString() => "ShadowReport"
      "<${string.substring(0, min(string.length, 90))}...,"
      "thread=$actionThread${replacesThread ? '(sum)' : ''}>";
}
