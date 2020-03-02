part of storyline.shadow_graph;

/// A list of [IdentifierLevel]s, going from most verbose to least.
///
/// We generally want to use the least verbose qualifications, such as
/// "he" or "she". But often we are forced to be more specific (e.g. when
/// there are two male actors, so "he" is too vague).
const List<IdentifierLevel> orderedQualificationLevels = [
  IdentifierLevel.properNoun,
  IdentifierLevel.adjectiveNoun,
  IdentifierLevel.ownerNamesNoun,
  IdentifierLevel.ownerPronounsNoun,
  IdentifierLevel.noun,
  IdentifierLevel.adjectiveOne,
  IdentifierLevel.pronoun,
  IdentifierLevel.omitted,
];

/// The way an [Entity] can be referred to. These are things like "he"
/// or "the other goblin".
class Identifier {
  final IdentifierLevel level;

  final String string;

  final Pronoun pronoun;

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

  const Identifier.ownerNamesNoun(this.string)
      : level = IdentifierLevel.ownerNamesNoun,
        pronoun = null;

  const Identifier.ownerPronounsNoun(this.string)
      : level = IdentifierLevel.ownerPronounsNoun,
        pronoun = null;

  const Identifier.pronoun(this.pronoun)
      : level = IdentifierLevel.pronoun,
        string = null;

  const Identifier.properNoun(this.string)
      : level = IdentifierLevel.properNoun,
        pronoun = null;

  const Identifier._()
      : level = null,
        pronoun = null,
        string = null,
        assert(false, 'Only use named constructors such as Identifier.pronoun');

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

  /// Something like "my sword" or "her shield".
  ownerPronounsNoun,

  /// Something like "Tamara's sword" or "the goblin's helmet".
  ownerNamesNoun,

  /// Something like "the brown jacket" or "the long sword"
  adjectiveNoun,

  /// Something like "Aren" or "Excalibur".
  properNoun,
}

/// A set of options for each entity in a given report.
class ReportIdentifiers {
  final Set<IdentifierLevel> _subjectRange = IdentifierLevel.values.toSet();

  final Set<IdentifierLevel> _objectRange = IdentifierLevel.values.toSet();

  final Set<IdentifierLevel> _object2Range = IdentifierLevel.values.toSet();

  final Set<IdentifierLevel> _ownerRange = IdentifierLevel.values.toSet();

  final Set<IdentifierLevel> _objectOwnerRange = IdentifierLevel.values.toSet();

  IdentifierLevel get object => _ensureSingle(_objectRange, "_objectRange");

  IdentifierLevel get object2 => _ensureSingle(_object2Range, "_object2Range");

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
      callback(ComplementType.SUBJECT, report.subject, _subjectRange);
    }
    if (report.object != null) {
      callback(ComplementType.OBJECT, report.object, _objectRange);
    }
    if (report.object2 != null) {
      callback(ComplementType.OBJECT2, report.object2, _object2Range);
    }
    if (report.owner != null) {
      callback(ComplementType.OWNER, report.owner, _ownerRange);
    }
    if (report.objectOwner != null) {
      callback(
          ComplementType.OBJECT_OWNER, report.objectOwner, _objectOwnerRange);
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
      default:
        throw UnimplementedError('No entity for $type');
    }
  }

  @override
  String toString() => "$runtimeType<subject=$_subjectRange, "
      "object=$_objectRange, object2=$_object2Range>";

  static IdentifierLevel _ensureSingle(
      Set<IdentifierLevel> set, String debugLabel) {
    assert(set.length <= 1, "Too many options for $debugLabel: $set");
    assert(set.isNotEmpty, "No options for $debugLabel: $set");
    if (set.length == 1) {
      return set.single;
    }
    // This shouldn't ever happen (in debug, we throw above). But for
    // robustness, we pick the least qualified.
    int j = 0;
    while (set.length > 1) {
      set.remove(orderedQualificationLevels[j]);
      j += 1;
    }
    return set.single;
  }

  /// Replaces the identifier level of [complement] (e.g. subject or object)
  /// with [level].
  ///
  /// This assumes the range of possible identifier levels has been already
  /// collapsed to just one.
  void patchByType(ComplementType complement, IdentifierLevel level) {
    final set = getRangeByType(complement);
    assert(set.length == 1);
    set
      ..clear()
      ..add(level);
  }
}
