library actor;

//import 'loopedevent.dart';
import 'storyline.dart';

/**
 * Minimal class to store information about the actor in the [Storyline].
 */
class Actor {
  Actor({this.name, this.team: DEFAULT_ENEMY, this.isPlayer: false,
         this.pronoun: Pronoun.IT});
  
  String name;
  
  static const int FRIEND = 1;
  static const int DEFAULT_ENEMY = 2;
  int team;
  bool isPlayer;
  
  bool isAlive = true;

  Pronoun pronoun;
//  LoopedEvent loopedEvent;
  
  void report(String text, {Actor object}) {
    storyline.add(text, subject: this, object: object); // TODO: add stuff
  }
  
//  void participateIn(LoopedEvent loopedEvent) {
//    if (this.loopedEvent != null) throw new StateError("Cannot participate in "
//                                              "more than one event at once.");
//    this.loopedEvent = loopedEvent;
//  }
//  void stopParticipatingIn(LoopedEvent loopedEvent) {
//    if (this.loopedEvent == loopedEvent) {
//      this.loopedEvent = null;
//    }
//  }
}

class Player extends Actor {
  Player() : super(name: "player", pronoun: Pronoun.YOU,
                   team: Actor.FRIEND, isPlayer: true) {
  }
}

