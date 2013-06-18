library looped_event;

import 'storyline.dart';
import 'timeline.dart';
import 'actor.dart';
import 'package:egamebook/src/book/scripter.dart';
import 'package:egamebook/src/shared/user_interaction.dart';

/**
 * LoopedEvent is any event that gets executed in a loop, waiting for
 * a) resolution and b) need of player input. It is intended for 'minigames'
 * inside the egamebook. 
 * 
 * Example: a hand-to-hand combat can be a LoopedEvent that takes fighters
 * and loops through 'rounds' (seconds?) of the fight. 
 */

abstract class LoopedEvent /*TODO: implements Saveable ?*/ {
  LoopedEvent({this.actors: const [], this.timeline}) {
    if (storyline == null) storyline = new Storyline();
    if (timeline == null) timeline = new Timeline();
//    actors.forEach((actor) => actor.participateIn(this));
  }
  
  bool finished = false;
  /// The page to jump to when combat is finished.
  String onFinishedGoto;
  void update();
  
  Timeline timeline;
  List<Actor> actors;
  
  /**
   * Runs the update loop until user interaction is needed or until LoopedEvent
   * is finished.
   */
  void run() {
    if (onFinishedGoto == null) throw new StateError("Cannot run a LoopedEvent "
                                  "before onFinishedGoto is defined.");
    if (finished) {
      choices.clear();
      goto(onFinishedGoto);
      return;
    }
      
    while (!finished && choices.isEmpty) {
      update();
    }
    echo(storyline.toString());
    storyline.clear();
  }
}