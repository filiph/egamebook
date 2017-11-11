part of storyline;

/// The pronouns and their different forms.
class Pronoun {
  // see http://en.wikipedia.org/wiki/Latin_declension
  static const Pronoun YOU =
      const Pronoun("you", "you", "your", "yourself"); // He (kdo? co?)
  // vocative // not used
  static const Pronoun HE =
      const Pronoun("he", "him", "his", "himself"); // Him (koho? co?)
  static const Pronoun SHE =
      const Pronoun("she", "her", "her", "herself"); // His (koho? ceho?)
  // dative // not used
  // ablative
  // locative
  static const Pronoun IT =
      const Pronoun("it", "it", "its", "itself"); // Himself

  static const Pronoun THEY =
      const Pronoun("they", "them", "their", "themselves");

  static const Pronoun WE = const Pronoun("we", "us", "our", "ourselves");

  final String nominative;

  final String accusative;

  final String genitive;

  final String self;

  const Pronoun(this.nominative, this.accusative, this.genitive, this.self);

  @override
  String toString() => nominative;
}
