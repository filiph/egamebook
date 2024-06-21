// ignore_for_file: constant_identifier_names

part of 'storyline.dart';

/// A data structure holding the stopwords associated with a type of complement
/// (a.k.a. grammatical object, or object argument).
///
/// For example, a [ComplementType] for the subject of the sentence
/// holds stopwords such as `"<subject>"` or `"<subjectAdjectiveOne's>"`.
///
/// For our purposes, a "complement" is an entity in a sentence that
/// either acts (subject) or is acted upon (the one object in a monotransitive
/// sentence, or either of the two objects in a ditransitive sentence).
/// See https://en.wikipedia.org/wiki/Object_(grammar) and
/// https://en.wikipedia.org/wiki/Complement_(linguistics).
// ignore: use_enums
class ComplementType {
  /// Lists all the complement types.
  static const all = [
    SUBJECT,
    OBJECT,
    OBJECT2,
    OWNER,
    OBJECT_OWNER,
    OBJECT2_OWNER,
  ];

  /// Lists all stopwords of all complement types that are possessive.
  ///
  /// Basically, this is all the `"<subject's>"` and `"<objectPronoun's>"` and
  /// others.
  static final List<String> allPossessives = all
      .expand<String>((complement) => [
            complement.genericPossessive,
            complement.nounPossessive,
            complement.pronounPossessive,
            complement.adjectiveOnePossessive,
            complement.nounWithAdjectivePossessive,
          ])
      .toList(growable: false);

  static const ComplementType OBJECT = ComplementType._(
    adjectiveOne: '<objectAdjectiveOne>',
    adjectiveOnePossessive: "<objectAdjectiveOne's>",
    generic: '<object>',
    genericPossessive: "<object's>",
    noun: '<objectNoun>',
    nounPossessive: "<objectNoun's>",
    nounWithAdjective: '<objectNounWithAdjective>',
    nounWithAdjectivePossessive: "<objectNounWithAdjective's>",
    pronoun: '<objectPronoun>',
    pronounAccusative: '<objectPronounAccusative>',
    pronounNominative: '<objectPronounNominative>',
    pronounPossessive: "<objectPronoun's>",
    pronounSelf: '<objectPronounSelf>',
    theOtherNoun: '<objectTheOtherNoun>',
    theOtherNounPossessive: "<objectTheOtherNoun's>",
  );

  static const ComplementType OBJECT2 = ComplementType._(
    adjectiveOne: '<object2AdjectiveOne>',
    adjectiveOnePossessive: "<object2AdjectiveOne's>",
    generic: '<object2>',
    genericPossessive: "<object2's>",
    noun: '<object2Noun>',
    nounPossessive: "<object2Noun's>",
    nounWithAdjective: '<object2NounWithAdjective>',
    nounWithAdjectivePossessive: "<object2NounWithAdjective's>",
    pronoun: '<object2Pronoun>',
    pronounAccusative: '<object2PronounAccusative>',
    pronounNominative: '<object2PronounNominative>',
    pronounPossessive: "<object2Pronoun's>",
    pronounSelf: '<object2PronounSelf>',
    theOtherNoun: '<object2TheOtherNoun>',
    theOtherNounPossessive: "<object2TheOtherNoun's>",
  );

  static const ComplementType OBJECT_OWNER = ComplementType._(
    adjectiveOne: '<objectOwnerAdjectiveOne>',
    adjectiveOnePossessive: "<objectOwnerAdjectiveOne's>",
    generic: '<objectOwner>',
    genericPossessive: "<objectOwner's>",
    noun: '<objectOwnerNoun>',
    nounPossessive: "<objectOwnerNoun's>",
    nounWithAdjective: '<objectOwnerNounWithAdjective>',
    nounWithAdjectivePossessive: "<objectOwnerNounWithAdjective's>",
    pronoun: '<objectOwnerPronoun>',
    pronounAccusative: '<objectOwnerPronounAccusative>',
    pronounNominative: '<objectOwnerPronounNominative>',
    pronounPossessive: "<objectOwnerPronoun's>",
    pronounSelf: '<objectOwnerPronounSelf>',
    theOtherNoun: '<objectOwnerTheOtherNoun>',
    theOtherNounPossessive: "<objectOwnerTheOtherNoun's>",
  );

  static const ComplementType OBJECT2_OWNER = ComplementType._(
    adjectiveOne: '<object2OwnerAdjectiveOne>',
    adjectiveOnePossessive: "<object2OwnerAdjectiveOne's>",
    generic: '<object2Owner>',
    genericPossessive: "<object2Owner's>",
    noun: '<object2OwnerNoun>',
    nounPossessive: "<object2OwnerNoun's>",
    nounWithAdjective: '<object2OwnerNounWithAdjective>',
    nounWithAdjectivePossessive: "<object2OwnerNounWithAdjective's>",
    pronoun: '<object2OwnerPronoun>',
    pronounAccusative: '<object2OwnerPronounAccusative>',
    pronounNominative: '<object2OwnerPronounNominative>',
    pronounPossessive: "<object2OwnerPronoun's>",
    pronounSelf: '<object2OwnerPronounSelf>',
    theOtherNoun: '<object2OwnerTheOtherNoun>',
    theOtherNounPossessive: "<object2OwnerTheOtherNoun's>",
  );

  static const ComplementType OWNER = ComplementType._(
    adjectiveOne: '<ownerAdjectiveOne>',
    adjectiveOnePossessive: "<ownerAdjectiveOne's>",
    generic: '<owner>',
    genericPossessive: "<owner's>",
    noun: '<ownerNoun>',
    nounPossessive: "<ownerNoun's>",
    nounWithAdjective: '<ownerNounWithAdjective>',
    nounWithAdjectivePossessive: "<ownerNounWithAdjective's>",
    pronoun: '<ownerPronoun>',
    pronounAccusative: '<ownerPronounAccusative>',
    pronounNominative: '<ownerPronounNominative>',
    pronounPossessive: "<ownerPronoun's>",
    pronounSelf: '<ownerPronounSelf>',
    theOtherNoun: '<ownerTheOtherNoun>',
    theOtherNounPossessive: "<ownerTheOtherNoun's>",
  );

  static const ComplementType SUBJECT = ComplementType._(
    isSubject: true,
    adjectiveOne: '<subjectAdjectiveOne>',
    adjectiveOnePossessive: "<subjectAdjectiveOne's>",
    generic: '<subject>',
    genericPossessive: "<subject's>",
    noun: '<subjectNoun>',
    nounPossessive: "<subjectNoun's>",
    nounWithAdjective: '<subjectNounWithAdjective>',
    nounWithAdjectivePossessive: "<subjectNounWithAdjective's>",
    pronoun: '<subjectPronoun>',
    pronounAccusative: '<subjectPronounAccusative>',
    pronounNominative: '<subjectPronounNominative>',
    pronounPossessive: "<subjectPronoun's>",
    pronounSelf: '<subjectPronounSelf>',
    theOtherNoun: '<subjectTheOtherNoun>',
    theOtherNounPossessive: "<subjectTheOtherNoun's>",
  );

  /// When `true`, this [ComplementType] is the subject.
  ///
  /// Subjects are fundamentally different than other complements (in fact,
  /// most grammars don't even consider subjects complements).
  final bool isSubject;

  final String adjectiveOne;
  final String adjectiveOnePossessive;

  /// Any representation of the object.
  ///
  /// Example: `"<subject>"`.
  ///
  /// This is not yet ready to be realized into final text. It will
  /// be substituted into one of the other stopwords.
  final String generic;
  final String genericPossessive;
  final String noun;
  final String nounPossessive;
  final String nounWithAdjective;
  final String nounWithAdjectivePossessive;
  final String pronoun;
  final String pronounAccusative;
  final String pronounNominative;
  final String pronounPossessive;
  final String pronounSelf;

  /// "The other noun" is currently unused.
  @Deprecated('Do not use, or make sure we actually solve for this.')
  final String theOtherNoun;

  /// "The other noun's" is currently unused.
  @Deprecated('Do not use, or make sure we actually solve for this. '
      "If you start using it, don't forget to add it to allPossessives.")
  final String theOtherNounPossessive;

  const ComplementType._({
    required this.adjectiveOne,
    required this.adjectiveOnePossessive,
    required this.generic,
    required this.genericPossessive,
    required this.noun,
    required this.nounPossessive,
    required this.nounWithAdjective,
    required this.nounWithAdjectivePossessive,
    required this.pronoun,
    required this.pronounAccusative,
    required this.pronounNominative,
    required this.pronounPossessive,
    required this.pronounSelf,
    // ignore: deprecated_consistency
    required this.theOtherNoun,
    // ignore: deprecated_consistency
    required this.theOtherNounPossessive,
    this.isSubject = false,
  });

  /// Returns all stopwords that are pronouns (such as `"<subjectPronoun>"`
  /// or `"<subjectPronoun's>"` for [SUBJECT]).
  List<String> get allPronouns => [
        pronoun,
        pronounAccusative,
        pronounNominative,
        pronounPossessive,
        pronounSelf,
      ];

  @override
  String toString() => 'ComplementType<$generic>';
}
