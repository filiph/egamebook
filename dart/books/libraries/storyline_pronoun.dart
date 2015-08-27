part of storyline;

/**
 * The pronouns and their different forms.
 */
class Pronoun {
  // see http://en.wikipedia.org/wiki/Latin_declension
  final String nominative; // He (kdo? co?)
  // vocative // not used
  final String accusative; // Him (koho? co?)
  final String genitive; // His (koho? ceho?)
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
  static const Pronoun THEY =
      const Pronoun("they", "them", "their", "themselves");
}
