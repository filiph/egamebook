part of '../shadow_graph.dart';

/// A list of [IdentifierLevel]s, going from most verbose to least.
///
/// We generally want to use the least verbose qualifications, such as
/// "he" or "she". But often we are forced to be more specific (e.g. when
/// there are two male actors, so "he" is too vague).
const List<IdentifierLevel> orderedQualificationLevels = [
  IdentifierLevel.properNoun,
  IdentifierLevel.ownerAdjectiveNoun,
  IdentifierLevel.adjectiveNoun,
  IdentifierLevel.ownerNoun,
  IdentifierLevel.noun,
  IdentifierLevel.adjectiveOne,
  IdentifierLevel.pronoun,
  IdentifierLevel.omitted,
];

/// The way an [Entity] can be referred to. These are things like "he"
/// or "the other goblin".
class Identifier {
  final IdentifierLevel level;

  final String? string;

  final Pronoun? pronoun;

  const Identifier.adjectiveNoun(this.string)
      : level = IdentifierLevel.adjectiveNoun,
        pronoun = null;

  const Identifier.adjectiveOne(this.string)
      : level = IdentifierLevel.adjectiveOne,
        pronoun = null;

  const Identifier.commonNoun(String string, int id)
      : string = "$string ($id)",
        level = IdentifierLevel.noun,
        pronoun = null;

  const Identifier.noun(this.string)
      : level = IdentifierLevel.noun,
        pronoun = null;

  const Identifier.omitted()
      : level = IdentifierLevel.omitted,
        pronoun = null,
        string = null;

  const Identifier.ownerAdjectiveNoun(this.string)
      : level = IdentifierLevel.ownerAdjectiveNoun,
        pronoun = null;

  const Identifier.ownerNoun(this.string)
      : level = IdentifierLevel.ownerNoun,
        pronoun = null;

  const Identifier.pronoun(this.pronoun)
      : level = IdentifierLevel.pronoun,
        string = null;

  const Identifier.properNoun(this.string)
      : level = IdentifierLevel.properNoun,
        pronoun = null;

  @override
  int get hashCode =>
      $jf($jc($jc($jc(0, string.hashCode), pronoun.hashCode), level.hashCode));

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Identifier &&
        level == other.level &&
        pronoun == other.pronoun &&
        string == other.string;
  }

  bool satisfiedBy(IdentifierLevel level) {
    return level == this.level;
  }

  @override
  String toString() => "Identifier<$level, $string, $pronoun>";
}

enum IdentifierLevel {
  /// Like [pronoun], but so close that it can be omitted.
  omitted,

  /// Something like "he" or "it".
  pronoun,

  /// Something like "the brown one" or "the slimy one".
  adjectiveOne,

  /// Something like "sword" or "apple".
  noun,

  /// Same as [noun], but forces the addition of an owner. For example,
  /// a "shield" becomes "Tamara's shield".
  ownerNoun,

  /// Same as [adjectiveNoun], but forces the addition of an owner. For example,
  /// a "red shield" becomes "Tamara's red shield".
  ownerAdjectiveNoun,

  /// Something like "the brown jacket" or "the long sword"
  adjectiveNoun,

  /// Something like "Aren" or "Excalibur".
  properNoun,
}

/// A set of options for each entity in a given report.
class ReportIdentifiers {
  static final _log = Logger('ReportIdentifiers');

  final Set<IdentifierLevel> _subjectRange = IdentifierLevel.values.toSet();

  final Set<IdentifierLevel> _objectRange = IdentifierLevel.values.toSet()
    ..remove(IdentifierLevel.omitted);

  final Set<IdentifierLevel> _object2Range = IdentifierLevel.values.toSet()
    ..remove(IdentifierLevel.omitted);

  final Set<IdentifierLevel> _ownerRange = IdentifierLevel.values.toSet()
    ..remove(IdentifierLevel.omitted);

  final Set<IdentifierLevel> _objectOwnerRange = IdentifierLevel.values.toSet()
    ..remove(IdentifierLevel.omitted);

  final Set<IdentifierLevel> _object2OwnerRange = IdentifierLevel.values.toSet()
    ..remove(IdentifierLevel.omitted);

  /// A callback used by [forEachEntityIn()] to find entities by their `id`.
  ///
  /// This is important when we find out an entity such as
  /// [objectOwner] should be added.
  final Entity Function(int id) getEntityById;

  ReportIdentifiers(this.getEntityById);

  IdentifierLevel get object => _ensureSingle(_objectRange, "_objectRange");

  IdentifierLevel get object2 => _ensureSingle(_object2Range, "_object2Range");

  IdentifierLevel get object2Owner =>
      _ensureSingle(_object2OwnerRange, "_object2OwnerRange");

  IdentifierLevel get objectOwner =>
      _ensureSingle(_objectOwnerRange, "_objectOwnerRange");

  IdentifierLevel get owner => _ensureSingle(_ownerRange, "_ownerRange");

  IdentifierLevel get subject => _ensureSingle(_subjectRange, "_subjectRange");

  /// Runs [callback] for every entity in [report].
  ///
  /// The callback has two parameters: the [Entity], and its current
  /// set of possible [IdentifierLevel]s. It is possible (and expected)
  /// to modify the set.
  void forEachEntityIn(Report report,
      void Function(ComplementType, Entity, Set<IdentifierLevel>) callback) {
    if (report.subject != null) {
      callback(ComplementType.SUBJECT, report.subject!, _subjectRange);
    }
    if (report.object != null) {
      callback(ComplementType.OBJECT, report.object!, _objectRange);
    }
    if (report.object2 != null) {
      callback(ComplementType.OBJECT2, report.object2!, _object2Range);
    }

    if (report.owner != null) {
      callback(ComplementType.OWNER, report.owner!, _ownerRange);
    } else if (_ownerIsForcedByRange(report.subject, _subjectRange)) {
      callback(ComplementType.OWNER,
          getEntityById(report.subject!.firstOwnerId!), _ownerRange);
    }
    if (report.objectOwner != null) {
      callback(
          ComplementType.OBJECT_OWNER, report.objectOwner!, _objectOwnerRange);
    } else if (_ownerIsForcedByRange(report.object, _objectRange)) {
      callback(ComplementType.OBJECT_OWNER,
          getEntityById(report.object!.firstOwnerId!), _objectOwnerRange);
    }
    if (report.object2Owner != null) {
      callback(ComplementType.OBJECT2_OWNER, report.object2Owner!,
          _object2OwnerRange);
    } else if (_ownerIsForcedByRange(report.object2, _object2Range)) {
      // Object2 owner is forced via _object2Range.
      callback(ComplementType.OBJECT2_OWNER,
          getEntityById(report.object2!.firstOwnerId!), _object2OwnerRange);
    }
  }

  /// Given [type], return the [IdentifierLevel] assigned to it.
  IdentifierLevel getByType(ComplementType type) {
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
      case ComplementType.OBJECT2_OWNER:
        return object2Owner;
      default:
        throw UnimplementedError('No entity for $type');
    }
  }

  /// Given [type], return the [Entity].
  Entity? getEntityByType(Report report, ComplementType type) {
    switch (type) {
      case ComplementType.SUBJECT:
        return report.subject;
      case ComplementType.OBJECT:
        return report.object;
      case ComplementType.OBJECT2:
        return report.object2;
      case ComplementType.OWNER:
        if (report.owner != null) return report.owner;
        if (_ownerIsForcedByRange(report.subject, _subjectRange)) {
          return getEntityById(report.subject!.firstOwnerId!);
        }
        return null;
      case ComplementType.OBJECT_OWNER:
        if (report.objectOwner != null) return report.objectOwner;
        if (_ownerIsForcedByRange(report.object, _objectRange)) {
          return getEntityById(report.object!.firstOwnerId!);
        }
        return null;
      case ComplementType.OBJECT2_OWNER:
        if (report.object2Owner != null) return report.object2Owner;
        if (_ownerIsForcedByRange(report.object2, _object2Range)) {
          return getEntityById(report.object2!.firstOwnerId!);
        }
        return null;
      default:
        throw UnimplementedError('No entity for $type');
    }
  }

  Set<IdentifierLevel> getRangeByType(ComplementType type) {
    switch (type) {
      case ComplementType.SUBJECT:
        return _subjectRange;
      case ComplementType.OBJECT:
        return _objectRange;
      case ComplementType.OBJECT2:
        return _object2Range;
      case ComplementType.OWNER:
        return _ownerRange;
      case ComplementType.OBJECT_OWNER:
        return _objectOwnerRange;
      case ComplementType.OBJECT2_OWNER:
        return _object2OwnerRange;
      default:
        throw UnimplementedError('No entity for $type');
    }
  }

  @override
  String toString() => "ReportIdentifiers<subject=$_subjectRange, "
      "object=$_objectRange, object2=$_object2Range>";

  IdentifierLevel _ensureSingle(Set<IdentifierLevel> set, String debugLabel) {
    assert(set.length <= 1, "Too many options for $debugLabel: $set");
    assert(set.isNotEmpty, "No options for $debugLabel: $set");
    if (set.length == 1) {
      return set.single;
    }

    _log.severe('_ensureSingle failed. "$debugLabel" had this set of '
        'IdentifierLevels: $set for $this');

    // The following two things shouldn't ever happen (in debug, we throw above,
    // because by the time this method is called, NLG should have picked
    // a single identifier level). But for robustness in prod, we need to
    // fall back to some sane defaults.
    if (set.isEmpty) {
      // Noun is the safest choice. (There could be no adjective, but noun
      // is always present.)
      return IdentifierLevel.noun;
    }

    // The set is not empty nor is it of length 1. Too many options.
    // We pick the least qualified.
    int j = 0;
    while (set.length > 1) {
      set.remove(orderedQualificationLevels[j]);
      j += 1;
    }
    return set.single;
  }

  /// Sometimes, [IdentifierLevel.ownerNoun] and
  /// [IdentifierLevel.ownerAdjectiveNoun] are the only available identifiers
  /// for the entity. In that case, we force the inclusion of an owner
  /// in things.
  bool _ownerIsForcedByRange(Entity? entity, Set<IdentifierLevel> range) {
    if (entity == null) return false;
    if (entity.firstOwnerId == null) return false;
    // If only [IdentifierLevel.ownerNoun] is available, then owner is forced.
    return range.every((level) =>
        level == IdentifierLevel.ownerNoun ||
        level == IdentifierLevel.ownerAdjectiveNoun);
  }
}
