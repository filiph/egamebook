library bodega_zil;

import '../libraries/zil.dart';
import '../libraries/timeline.dart';
import 'package:egamebook/src/shared/stat.dart';

// XXX START HERE: class BodegaZil
//          - initializes with echo, goto, etc. (DI)
//          - encapsulates everything, so in bodega.egb, we write:
//                bridge = bodegaZil.bridge;
//          - or maybe even just:
//                bodegaZil.init(vars);

Timeline exploration = new Timeline();

void explorationSetup(Function goto, Function echo, Zil zil,
                      Stat clock, Action jumpToSpaceStationUnity,
                      String salutation, String name) {
  exploration.mainLoop = () {
    clock.value += 1;
    // TODO: Exploration timeline - no jumping, no rescheduling
  };
  
  exploration.schedule(MAX_TIME_BEFORE_NAP, () {
    roomBeforeOvercameBySleepiness = zil.player.location;
    goto("Bridge: OvercomeBySleepiness");
  });
  
  exploration.schedule(MAX_TIME_BEFORE_HYPERDRIVE_READY, () {
    jumpToSpaceStationUnity.isActive = true;
    echo("""\n\nThe ship's PA system makes a short bleep, then Bodega says: "The hyperdrive is fully operational. We are ready to jump, $salutation$name." """);
  });
}

int MAX_TIME_BEFORE_NAP = 148;
int MESSENGER_CONTACT_TIME = 460;
int MAX_TIME_BEFORE_HYPERDRIVE_READY = 473;

Room roomBeforeOvercameBySleepiness = null;

String getHoursToHyperdrive() {
    num hours = (MAX_TIME_BEFORE_HYPERDRIVE_READY - exploration.time) / 60;
    if (hours < 0) throw "getHoursToHyperdrive() called after jump";
    if (hours < 1) {
      int tenMinutes = (hours * 6).round();
      if (tenMinutes == 0) return "a few minutes";
      return "about ${tenMinutes}0 minutes";
    }
    return """${hours.round()} hour${hours >= 1.5 ? "s" : ""}""";
}

// Printing how tired the player is.
const List tirednessStrings = const ["quite tired", "really tired", 
                                     "extremely tired", "exhausted", 
                                     "absolutely exhausted"];