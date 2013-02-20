library actor;

//import 'loopedevent.dart';
import 'storyline.dart';

/**
 * Minimal class to store information about the actor in the [Storyline].
 */
class Actor {
  Actor({this.name, this.team: DEFAULT_ENEMY, this.isPlayer: false,
         this.pronoun: Pronoun.IT});
  
  final String name;
  
  static const int FRIEND = 1;
  static const int DEFAULT_ENEMY = 2;
  int team;
  final bool isPlayer;
  
  bool isAlive = true;

  final Pronoun pronoun;
  
  void report(String text, {Actor object}) {
    storyline.add(text, subject: this, object: object); // TODO: add stuff
  }
}

class Player extends Actor {
  Player() : super(name: "player", pronoun: Pronoun.YOU,
                   team: Actor.FRIEND, isPlayer: true) {
  }
}

