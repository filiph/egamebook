library storyline.pronoun;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'storyline_pronoun.g.dart';

/// The pronouns and their different forms.
///
/// Not used (and therefore unimplemented): dative, ablative, locative,
/// vocative.
///
/// See http://en.wikipedia.org/wiki/Latin_declension.
abstract class Pronoun implements Built<Pronoun, PronounBuilder> {
  static final Pronoun YOU = new Pronoun("you", "you", "your", "yourself");

  static final Pronoun HE = new Pronoun("he", "him", "his", "himself");

  static final Pronoun SHE = new Pronoun("she", "her", "her", "herself");

  static final Pronoun IT = new Pronoun("it", "it", "its", "itself");

  static final Pronoun THEY =
      new Pronoun("they", "them", "their", "themselves");

  static final Pronoun WE = new Pronoun("we", "us", "our", "ourselves");

  static Serializer<Pronoun> get serializer => _$pronounSerializer;

  factory Pronoun(
          String nominative, String accusative, String genitive, String self) =>
      new _$Pronoun((b) => b
        ..nominative = nominative
        ..accusative = accusative
        ..genitive = genitive
        ..self = self);

  Pronoun._();

  /// Him (koho? co?)
  String get accusative;

  /// His (koho? ceho?)
  String get genitive;

  /// He (kdo? co?)
  String get nominative;

  /// Himself
  String get self;

  @override
  String toString() => nominative;
}
