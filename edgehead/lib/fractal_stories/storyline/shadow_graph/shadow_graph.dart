library storyline.shadow_graph;

import 'dart:collection';

import 'package:built_value/built_value.dart' show $jf, $jc;
import 'package:edgehead/fractal_stories/storyline/storyline.dart';

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

  List<ReportIdentifiers> _reportIdentifiers;

  /// The way sentences are stringed together.
  ///
  /// A [_joiner] for index `i` describes how a [Report] at index `i` flows
  /// from report at index `i - 1`.
  List<Set<SentenceJoinType>> _joiners;

  /// For each report, this maps from different concrete identifiers
  /// (such as "he" or "the goblin") to entities in that report.
  List<Map<Identifier, Entity>> _identifiers;

  ShadowGraph.from(Storyline storyline) {
    // At first, all qualifications and all joiners are possible.
    _reportIdentifiers = List.generate(
      storyline.reports.length,
      (_) => ReportIdentifiers(),
      growable: false,
    );
    _joiners = List.generate(
      storyline.reports.length,
      (_) => SentenceJoinType.values.toSet(),
      growable: false,
    );

    final entities = _getAllMentionedEntities(storyline.reports);
    _fillForcedJoiners(storyline.reports);
    __assertAtLeastOneJoiner(storyline.reports);
    _detectForcedPronouns(storyline.reports);
    _detectMissingProperNouns(storyline.reports);
    _detectMissingAdjectives(storyline.reports);
    _detectFirstMentions(storyline.reports, entities);
    _identifiers = _getIdentifiersThroughoutStory(storyline.reports, entities);
    _removeQualificationsWhereUnavailable(storyline.reports, _identifiers);
    _find2JoinerOpportunitiesP0(storyline.reports);
    __assertAtLeastOneJoiner(storyline.reports);
    _find2JoinerOpportunitiesP1(storyline.reports);
    __assertAtLeastOneJoiner(storyline.reports);
    _fillOtherJoiners(storyline.reports);
    _assertExactlyOnePossibleJoiner(storyline.reports);
    _removeOmittedAtStartsOfSentences(storyline.reports);
    _retainTheLowestPossible(storyline.reports);
  }

  UnmodifiableListView<SentenceJoinType> get joiners =>
      UnmodifiableListView(_joiners.map((set) => set.single));

  UnmodifiableListView<ReportIdentifiers> get qualifications =>
      UnmodifiableListView(_reportIdentifiers);

  String describe() {
    final buf = StringBuffer();

    for (int i = 0; i < _reportIdentifiers.length; i++) {
      final qual = _reportIdentifiers[i];
      buf.writeln('=== ${i + 1} ===');
      buf.writeln('subject: ${qual._subjectRange}');
      buf.writeln('object: ${qual._objectRange}');
      buf.writeln('object2: ${qual._object2Range}');

      final ids = _identifiers[i];
      buf.writeln('identifiers: $ids');

      buf.writeln(_joiners[i]);
      buf.writeln();
    }
    return buf.toString();
  }

  void __assertAtLeastOneJoiner(UnmodifiableListView<Report> reports) {
    for (int i = 0; i < _joiners.length; i++) {
      assert(
          _joiners[i].isNotEmpty,
          "There should be at least one joiner "
          "for ${reports[i]} at this point "
          "but instead there is: ${_joiners[i]}.");
    }
  }

  void _allowObjectPronoun(int i) {
    _reportIdentifiers[i]._objectRange.add(IdentifierLevel.pronoun);
  }

  void _assertExactlyOnePossibleJoiner(UnmodifiableListView<Report> reports) {
    for (int i = 0; i < _joiners.length; i++) {
      assert(
          _joiners[i].length == 1,
          "There should be a single joiner "
          "for ${reports[i]} but instead there is: ${_joiners[i]}.");
    }
  }

  /// In any storyline, the first time we mention anyone after a while,
  /// we cannot use pronouns or any other confusing identifiers.
  void _detectFirstMentions(
      UnmodifiableListView<Report> reports, Set<Entity> entities) {
    final Set<int> everMentionedIds = {};
    // Maps from entity ID to the most recent report index it was referenced.
    final Map<int, int> lastMentionedTimes = {};
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      _reportIdentifiers[i].forEachEntityIn(report, (entity, set) {
        // Detect if the entity is "you" or "I".
        final isPlayer =
            entity.pronoun == Pronoun.I || entity.pronoun == Pronoun.YOU;

        if (!isPlayer && !everMentionedIds.contains(entity.id)) {
          // If this is the first time we mention this entity, call it by
          // at least the noun.
          set.removeAll([
            IdentifierLevel.omitted,
            IdentifierLevel.pronoun,
            IdentifierLevel.adjectiveOne,
          ]);

          everMentionedIds.add(entity.id);
        }

        // Unless we just talked about the entity...
        if ((lastMentionedTimes[entity.id] ?? -1000) < i - 1) {
          // ... disallow any identifiers that might confuse this with
          // any other entity.
          set.removeAll(_getConflictingQualificationLevels(entity, entities));
        }

        lastMentionedTimes[entity.id] = i;
      });
    }
  }

  /// Detect "forced pronouns" (when the string says `<subjectPronoun>`
  /// but no `<subject>`, for example).
  void _detectForcedPronouns(UnmodifiableListView<Report> reports) {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      if (report.string.contains(Storyline.SUBJECT_PRONOUN) &&
          !report.string.contains(Storyline.SUBJECT)) {
        _limitSubjectToPronoun(i);
      }
      if (report.string.contains(Storyline.OBJECT_PRONOUN) &&
          !report.string.contains(Storyline.OBJECT)) {
        _limitObjectToPronoun(i);
      }
      if (report.string.contains(Storyline.OBJECT2_PRONOUN) &&
          !report.string.contains(Storyline.OBJECT2)) {
        _limitObject2ToPronoun(i);
      }
    }
  }

  /// Detects entities that have [Entity.adjective] == `null`, and removes
  /// the relevant [IdentifierLevel]s.
  void _detectMissingAdjectives(UnmodifiableListView<Report> reports) {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      _reportIdentifiers[i].forEachEntityIn(report, (entity, set) {
        if (entity.adjective == null) {
          set.removeAll(
              [IdentifierLevel.adjectiveOne, IdentifierLevel.adjectiveNoun]);
        }
      });
    }
  }

  /// Detect missing proper nouns -- when an entity does not have a proper
  /// noun (e.g. "John").
  void _detectMissingProperNouns(UnmodifiableListView<Report> reports) {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      _reportIdentifiers[i].forEachEntityIn(report, (entity, set) {
        if (!entity.nameIsProperNoun) {
          set.remove(IdentifierLevel.properNoun);
        }
      });
    }
  }

  /// Fill the joiner graph with obvious / forced stuff, such as:
  ///
  /// * wholeSentence == period
  /// * but == but
  void _fillForcedJoiners(UnmodifiableListView<Report> reports) {
    // Always start with new sentence (no ", and").
    _joiners[0].retainWhere((joiner) => const [
          SentenceJoinType.none,
        ].contains(joiner));

    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      if (report.wholeSentence) {
        _limitJoinerToPeriodOrNone(i);
        _limitJoinerToNoneAllowButOrAnd(i + 1);
      }
      if (report.endSentence) {
        _limitJoinerToPeriodAllowButOrAnd(i + 1);
      }
      if (report.but) {
        _limitJoinerToBut(i);
      }
    }
  }

  void _fillOtherJoiners(UnmodifiableListView<Report> reports) {
    for (int i = 0; i < reports.length; i++) {
      final set = _joiners[i];
      if (set.length > 1) {
        if (set.contains(SentenceJoinType.period)) {
          set.retainAll([SentenceJoinType.period]);
        } else if (set.contains(SentenceJoinType.none)) {
          set.retainAll([SentenceJoinType.none]);
        } else if (set.contains(SentenceJoinType.periodBut)) {
          // It is possible to use ". But " here. Let's do it.
          set.retainAll([SentenceJoinType.periodBut]);
        } else if (set.contains(SentenceJoinType.noneBut)) {
          // It is possible to use " But " here. Let's do it.
          set.retainAll([SentenceJoinType.noneBut]);
        } else {
          throw StateError("Set: $set");
        }
      }
    }
  }

  /// Find opportunities to join two sentences in one.
  ///
  /// P0 means these are the best ones, we should definitely go for them.
  void _find2JoinerOpportunitiesP0(UnmodifiableListView<Report> reports) {
    for (final pair in _ReportPair.getPairs(reports)) {
      // The orcish captain avoids the goblin and regains balance.
      if (pair.hasSameVerbType &&
          pair.hasSameSubject &&
          pair.second.object == null &&
          _joiners[pair.index].hasPeriodOrNone &&
          _joiners[pair.index + 1].contains(SentenceJoinType.and)) {
        _limitJoinerToPeriodOrNone(pair.index);
        _limitJoinerToAnd(pair.index + 1);
        continue;
      }

      // He lifts the goblin captain via telekinesis,
      // and hurls him at the orcish one.
      if (pair.hasSameVerbType &&
          pair.hasSameSubject &&
          pair.hasSameObject &&
          _joiners[pair.index].hasPeriodOrNone &&
          _joiners[pair.index + 1].contains(SentenceJoinType.and)) {
        _limitJoinerToPeriodOrNone(pair.index);
        _limitJoinerToAnd(pair.index + 1);
        _allowObjectPronoun(pair.index + 1);
        continue;
      }
    }
  }

  /// Find opportunities to join two sentences in one.
  ///
  /// P1 means these are not as great at [_find2JoinerOpportunitiesP0].
  void _find2JoinerOpportunitiesP1(UnmodifiableListView<Report> reports) {
    for (final pair in _ReportPair.getPairs(reports)) {
      // He has his dagger and his shield.
      if (pair.hasSameVerbType &&
          pair.hasSameSubject &&
          _joiners[pair.index].hasPeriodOrNone &&
          _joiners[pair.index + 1].contains(SentenceJoinType.and)) {
        _limitJoinerToPeriodOrNone(pair.index);
        _limitJoinerToAnd(pair.index + 1);
        continue;
      }

      // I dodge the red orc and he hits the concrete floor.
      if (pair.hasSameVerbType &&
          pair.first.object != null &&
          pair.second.subject == pair.first.object &&
          _joiners[pair.index].hasPeriodOrNone &&
          _joiners[pair.index + 1].contains(SentenceJoinType.and)) {
        _limitJoinerToPeriodOrNone(pair.index);
        _limitJoinerToAnd(pair.index + 1);
        continue;
      }
    }
  }

  /// Gets all mentioned entities in [reports].
  ///
  /// The entities will be stored in their initial state (for example,
  /// if an entity changes pronoun during [reports], this will
  /// not be reflected: only the original pronoun will be listed.
  Set<Entity> _getAllMentionedEntities(UnmodifiableListView<Report> reports) {
    final result = <Entity>{};
    final resultIds = <int>{};
    for (final report in reports) {
      for (final entity in report.allEntities) {
        if (!resultIds.contains(entity.id)) {
          result.add(entity);
          resultIds.add(entity.id);
        }
      }
    }
    return result;
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
    final others = Set<Entity>.from(allEntities.where((e) => e != entity));

    if (others.any((e) => e.pronoun == entity.pronoun)) {
      yield IdentifierLevel.pronoun;
    }

    // skipping "theOther" - don't know

    if (entity.adjective != null &&
        others.any((e) => e.adjective == entity.adjective)) {
      yield IdentifierLevel.adjectiveOne;
    }

    if (others.any((e) => e.name == entity.name)) {
      yield IdentifierLevel.noun;
    }

    // skipping theOtherNoun - don't know

    if (entity.adjective != null &&
        others.any((e) =>
            '${e.adjective} ${e.name}' ==
            '${entity.adjective} ${entity.name}')) {
      yield IdentifierLevel.adjectiveNoun;
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
  List<Map<Identifier, Entity>> _getIdentifiersThroughoutStory(
      UnmodifiableListView<Report> reports, Set<Entity> entities) {
    final result = List<Map<Identifier, Entity>>(reports.length);
    var previous = <Identifier, Entity>{};
    for (int i = 0; i < reports.length; i++) {
      final current = <Identifier, Entity>{};

      // Mark [entity] as identifiable with [id], or mark the [id]
      // unusable ([noEntity]) if it's already assigned to some other entity.
      void assign(Identifier id, Entity entity) {
        if (previous.containsKey(id) && previous[id] != entity) {
          // A new entity assignable to an id that was assignable to someone
          // else in the preceding report.
          return;
        }
        if (current.containsKey(id)) {
          // Duplicate identifiers (e.g. 2 "he" pronouns).
          current[id] = noEntity;
        } else {
          current[id] = entity;
        }
      }

      // Mark the previous report's subject as the omitted one in this report.
      if (i >= 1) {
        final previousSubject = reports[i - 1].subject;
        if (previousSubject != null && reports[i].subject == previousSubject) {
          current[const Identifier.omitted()] = previousSubject;
        }
      }

      final reportEntities = reports[i].allEntities.toList(growable: false);

      for (final entityInReport in reportEntities) {
        final entity = entities.singleWhere((e) => e.id == entityInReport.id);

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
      }

      result[i] = current;
      previous = current;
    }

    return result;
  }

  void _limitJoinerToAnd(int i) {
    if (i < 0 || i >= _joiners.length) return;
    _joiners[i].retainWhere((joiner) => const [
          SentenceJoinType.and,
        ].contains(joiner));
  }

  void _limitJoinerToBut(int i) {
    if (i < 0 || i >= _joiners.length) return;
    _joiners[i].retainWhere((joiner) => const [
          SentenceJoinType.but,
          SentenceJoinType.noneBut,
          SentenceJoinType.periodBut,
        ].contains(joiner));
  }

  void _limitJoinerToNoneAllowButOrAnd(int i) {
    if (i < 0 || i >= _joiners.length) return;
    _joiners[i].retainWhere((joiner) => const [
          SentenceJoinType.none,
          SentenceJoinType.noneAnd,
          SentenceJoinType.noneBut
        ].contains(joiner));
  }

  void _limitJoinerToPeriodAllowButOrAnd(int i) {
    if (i < 0 || i >= _joiners.length) return;
    _joiners[i].retainWhere((joiner) => const [
          SentenceJoinType.period,
          SentenceJoinType.periodAnd,
          SentenceJoinType.periodBut
        ].contains(joiner));
  }

  void _limitJoinerToPeriodOrNone(int i) {
    if (i < 0 || i >= _joiners.length) return;
    _joiners[i].retainAll(const [
      SentenceJoinType.none,
      SentenceJoinType.period,
    ]);
  }

  void _limitObject2ToPronoun(int i) {
    if (i < 0 || i >= _reportIdentifiers.length) return;
    _reportIdentifiers[i]
        ._object2Range
        .retainWhere((qual) => qual == IdentifierLevel.pronoun);
  }

  void _limitObjectToPronoun(int i) {
    if (i < 0 || i >= _reportIdentifiers.length) return;
    _reportIdentifiers[i]
        ._objectRange
        .retainWhere((qual) => qual == IdentifierLevel.pronoun);
  }

  void _limitSubjectToPronoun(int i) {
    if (i < 0 || i >= _reportIdentifiers.length) return;
    _reportIdentifiers[i]
        ._subjectRange
        .retainWhere((qual) => qual == IdentifierLevel.pronoun);
  }

  void _removeOmittedAtStartsOfSentences(UnmodifiableListView<Report> reports) {
    const startNewSentenceJoiners = [
      SentenceJoinType.period,
      SentenceJoinType.periodAnd,
      SentenceJoinType.periodBut,
      SentenceJoinType.none,
      SentenceJoinType.noneAnd,
      SentenceJoinType.noneBut,
    ];

    for (int i = 0; i < _reportIdentifiers.length; i++) {
      // At this point, the final joiner must have been selected.
      final joiner = joiners[i];
      if (startNewSentenceJoiners.contains(joiner)) {
        _reportIdentifiers[i].forEachEntityIn(reports[i], (entity, set) {
          set.remove(IdentifierLevel.omitted);
        });
      }
    }
  }

  /// Use the data in [identifiers] to remove qualifications levels
  /// that would be confusing.
  ///
  /// Most of the work has already been done -- we know which identifiers
  /// (such as "he" or "the goblin") can potentially refer to which
  /// entity in each report. Now we just need to update
  /// the [ReportIdentifiers] accordingly.
  void _removeQualificationsWhereUnavailable(
      UnmodifiableListView<Report> reports,
      List<Map<Identifier, Entity>> identifiers) {
    for (int i = 0; i < reports.length; i++) {
      final report = reports[i];
      final current = identifiers[i];
      _reportIdentifiers[i].forEachEntityIn(report, (entity, set) {
        // Take the identifiers that refer to the entity.
        final relevantIdentifiers = current.entries
            .where((entry) => entry.value == entity)
            .map((entry) => entry.key)
            .toList(growable: false);

        // Retain only the part of the entity's current range
        // (`Set<QualificationLevel>`) that is supported by one of
        // these identifiers.
        set.retainWhere((level) => relevantIdentifiers
            .any((identifier) => identifier.satisfiedBy(level)));
      });
    }
  }

  /// Only retain the lowest (i.e., least specific) qualification level
  /// for each entity in each report.
  void _retainTheLowestPossible(UnmodifiableListView<Report> reports) {
    for (int i = 0; i < _reportIdentifiers.length; i++) {
      final report = reports[i];
      _reportIdentifiers[i].forEachEntityIn(report, (entity, set) {
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
}
