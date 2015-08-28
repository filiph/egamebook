library barbrawl;

import "../libraries/loopedevent.dart";
import 'package:egamebook/src/book/scripter_typedefs.dart';
import '../libraries/timeline.dart';
import '../libraries/randomly.dart';

class BarBrawl extends LoopedEvent {
  BarBrawl(this.echo, this.choice);

  static const int MAX_OPTIONS = 3;
  static const int MAX_FAILURES_BEFORE_SUCCESS = 3;

  /// The options that the brawl starts with. If their length is below
  /// [MAX_OPTIONS], another options will be randomly added.
  List<BarBrawlOption> startingOptions;
  final Set<BarBrawlOption> allOptions = new Set<BarBrawlOption>();
  final Timeline timeline = new Timeline();

  /// Counter for failures. After this hits [MAX_FAILURES_BEFORE_SUCCESS], we
  /// allow a success.
  int failures = 0;
  /// Keeps track of additional paragraphs so that there's not more than one.
  /// Many paragraphs make it confusing. There should be only one "special"
  /// per turn. Additional paragraphs are added by onSetup functions and
  /// by timeline events.
  bool additionalParagraphPresent = false;

  /// Returns true if the brawl was successful for the player.
  bool wasSuccessful = false;

  final EchoFunction echo;
  final ChoiceFunction choice;

  void init() {
    _initOptions();
    _initTimeline();
  }

  void _initOptions() {
    var whyDoThat2;
    var whyDoThat = new BarBrawlOption("\"Why would you do that?\"",
        getAvailability: () => timeline.time == 0, onSuccessOrFailure: () {
      echo("\"Why would y—\"\n\n");
      echo("He hit you again. From the other side. "
          "Before you managed to turn your head back towards him, he had "
          "raised his fist again.");
      startingOptions = [whyDoThat2];
    });
    whyDoThat2 = new BarBrawlOption("\"—ou do that?\"",
        getAvailability: () =>
            timeline.currentlyAtTime(whyDoThat.timeLastFired),
        onSuccessOrFailure: () {
      echo("Another punch in the face. This time it landed so hard it knocked "
          "you off.");
      finished = true;
    });
    var stopIt = new BarBrawlOption("\"Stop it!\"",
        getAvailability: () => !timeline
                .currentlyAtTime(whyDoThat.timeLastFired) &&
            timeline.time > 0,
        onSuccessOrFailure: () {
      echo("\"Stop it!\"\n\n");
      echo("There was a smirk on his face. He hit you in the stomach. You bent "
          "forward, gulping for air.\n\n");
      echo("\"Why should I?\" The last thing you saw was his knee flying "
          "straight towards your face.");
      finished = true;
    });

    var hitHimBack = new BarBrawlOption("Hit him back",
        getAvailability: () => timeline.time == 0, onSuccessOrFailure: () {
      echo("You threw a punch in his general direction but missed. He jabbed "
          "at your jaw.");
    });
    var hitFace = new BarBrawlOption("Hit him in the face",
        getAvailability: () => timeline.time > 0, onSuccess: () {
      echo("He tried to deflect it but failed miserably. With all your "
          "strength, you landed your fist directly in the middle of his face. "
          "You felt the shattering power of the impact through your hand. "
          "The farmer flew backwards and landed on a table, unconscious.");
    }, onFailure: () {
      echo("Your right hook was deflected and he headbutted you. You took two "
          "steps back and barely regained your balance.");
    });
    // "he caught him on the side of the head with a stinging haymaker"
    // he threw another punch: deliver, give, land.
    var hitStomach = new BarBrawlOption("Hit him in the stomach",
        getAvailability: () => timeline.time > 0, onSuccess: () {
      echo("Your fist lands right in his solar plexus. The farmer lets out "
          "a gurgling sound and bends over your arm. You kneel him in the face "
          "and he sagged on the floor, unconscious.");
    }, onFailure: () {
      echo("He dodged your stomach punch and put his right elbow "
          "in your face.");
    });
    var raiseArms = new BarBrawlOption("Raise arms in defense", onSuccess: () {
      echo("Your arms deflected a haymaker that would definitely send you "
          "to the floor. The farmer's face was now open to your left hand. "
          "You hit him hard. Then again in the stomach. And then again, "
          "with a powerful haymaker of your own. He flew towards the floor, "
          "unconscious.");
    }, onFailure: () {
      echo("Your arms deflected a haymaker that would definitely send you "
          "to the floor. But before you could do anything to retaliate, the farmer slipped "
          "a painful uppercut punch between your arms.");
    });
    var sidestep = new BarBrawlOption("Sidestep",
        getAvailability: () => timeline.time > 0, onSetup: () {
      echo("You thought you could see how he was going to hit next.");
    }, onSuccess: () {
      echo("You guessed well. You dodged the punch and the farmer tried to "
          "keep his balance — his right arm still extended forward. "
          "That's when you landed a well placed blow to his flank. He "
          "shrieked. An elbow to the face sent him to the ground, "
          "unconscious.");
    }, onFailure: () {
      echo("You guessed wrong. You sidestepped right into his blow. The impact "
          "almost sent you to the ground.");
    });
    var behindPilot = new BarBrawlOption("Hide behind the pilot",
        getAvailability: () => timeline.time > 0, onSetup: () {
      echo("A heavily built guy in a pilot overall backed into your field "
          "of vision. He had probably got hit by someone and looked a bit disoriented. "
          "The farmer didn't notice. His eyes were laser focused on you.");
    }, onSuccess: () {
      echo("You sidestepped so that the pilot was now almost between the farmer "
          "and you. The farmer was just in the middle of throwing a hook so "
          "he missed you and weakly hit the pilot on the back of the head "
          "instead. The pilot, still desoriented, blindly swung his fist at him "
          "and landed it squarely on the farmer's ear.\n\n");
      echo("That was your cue. You lunged at the farmer with everything you "
          "got and landed a blow first in his chest, then in the face, and "
          "finaly in the stomach. The farmer went to the ground, unconscious.");
    }, onFailure: () {
      echo("You sidestepped so that the pilot was now almost between the farmer "
          "and you. The farmer saw this, though, lunged forward, avoiding "
          "the pilot, then landed an uppercut right in your jaw. ");
    });
    var useBottle;
    var lookAround = new BarBrawlOption(
        "Look around for objects to hit him with", onSuccessOrFailure: () {
      echo("From the corner of your eye you saw the bottle of Golitsyn vodka "
          "from which you had been drinking just minutes ago. It was still standing "
          "on your table behind you.");
      startingOptions = [useBottle];
    });
    useBottle = new BarBrawlOption("Hit him with the bottle",
        getAvailability: () => lookAround.hasBeenFired, onSuccess: () {
      echo("You quickly grabbed the bottle and smashed it over the top of "
          "the farmer's head. He plummeted to the floor, unconscious.");
    }, onFailure: () {
      echo("You quickly looked behind and grabbed the bottle, but when you "
          "turned back towards the farmer, you were greeted with a direct punch "
          "in the eye. You let go of the bottle and it dropped to the floor, "
          "shattering.");
    });
    var kickCrotch = new BarBrawlOption("Knee him in the crotch",
        onSuccessOrFailure: () {
      echo("He didn't expect that. Your knee landed squarely in the groin and "
          "the farmer keeled over.\n\n");
      echo("The fights closest to you were now stopping. People started "
          "alternately looking at you and at the farmer who was now lying on "
          "his side, both hands in the lap, unconsciouss.\n\n");
      echo("You hadn't known about the no-groin-attack rule but that wasn't "
          "going to absolve you. There are very few rules in bar fight, but "
          "those that exist are enforced with violent fervor. After a "
          "thunderous scream, at least four "
          "guys (you didn't really have the time to count them) jumped you and beat you into unconsciousness.");
      // Make sure it's unsuccessful.
      wasSuccessful = false;
      finished = true;
    });
    var undercut = new BarBrawlOption("Undercut his legs", onSetup: () {
      echo("He tried to kick you but lost balance while doing so and aborted.");
    }, onSuccess: () {
      echo("Seeing that he barely stood on one foot, you swept "
          "his legs. The farmer wasn't ready, hitting his head hard on the floor while falling. When "
          "he weakly started to get up, you punched him from above. That sent "
          "him back to the ground, unconscious.");
    }, onFailure: () {
      echo("Seeing that he barely stood on one foot, you tried to sweep "
          "his legs. But by the time your leg hit his, the farmer had already "
          "regained his balance. Your leg just stopped there and you were "
          "lucky to withdraw before he was able to stamp on your knee.");
    });

    allOptions.addAll(<BarBrawlOption>[
      whyDoThat,
      hitHimBack,
      whyDoThat2,
      stopIt,
      hitFace,
      hitStomach,
      raiseArms,
      sidestep,
      behindPilot,
      lookAround,
      useBottle,
      kickCrotch,
      undercut
    ]);

    startingOptions = <BarBrawlOption>[whyDoThat, hitHimBack];

    // We don't want to start with anything that has onSetup, do we?
    additionalParagraphPresent = true;
  }

  void _initTimeline() {
    timeline.schedule(2, () {
      echo("\n\nAt the other end of the bar, you heard someone laughing. "
          "Laughing! A strange sound to hear during a full scale bar fight. "
          "But you didn't exactly have the time to investigate. The farmer "
          "was a pressing issue.");
      additionalParagraphPresent = true;
    });

    timeline.time = 0;
  }

  @override
  void update() {
    Iterable<BarBrawlOption> allAvailable = allOptions.where(
        (o) => o.isAvailableByDefault &&
            (o.getAvailability == null || o.getAvailability()));
    List<BarBrawlOption> current =
        startingOptions != null ? startingOptions : [];
    startingOptions = null;

    while (current.length < MAX_OPTIONS) {
      List<BarBrawlOption> additionals = new Set.from(allAvailable)
          .difference(new Set.from(current))
          .where((BarBrawlOption o) =>
              !additionalParagraphPresent || o.onSetup == null)
          .toList();
      if (additionals.isEmpty) break;
      BarBrawlOption added = Randomly.choose(additionals);
      current.add(added);
      if (added.onSetup != null) {
        additionalParagraphPresent = true;
        echo("\n\n");
        added.onSetup();
      }
    }

    current.sort((a, b) => a.name.compareTo(b.name));

    for (var opt in current) {
      choice(opt.name, script: () {
        // Reset here for the benefit of timeline.elapse().
        additionalParagraphPresent = false;
        if (failures < MAX_FAILURES_BEFORE_SUCCESS) {
          if (opt.onFailure != null) {
            opt.onFailure();
          } else {
            opt.onSuccessOrFailure();
          }
          failures += 1;
          if (finished) return;
          timeline.elapse(1);
        } else {
          if (opt.onSuccess != null) {
            opt.onSuccess();
            wasSuccessful = true;
            finished = true;
          } else {
            opt.onSuccessOrFailure();
          }
        }
        opt.timeLastFired = timeline.time;
      });
    }
  }
}

class BarBrawlOption {
  BarBrawlOption(this.name, {this.getAvailability, this.onSetup,
      OutputOnlyFunction onSuccess, OutputOnlyFunction onFailure,
      OutputOnlyFunction onSuccessOrFailure, this.repeatable: false})
      : _onSuccess = onSuccess,
        _onFailure = onFailure,
        _onSuccessOrFailure = onSuccessOrFailure {
    if ((_onSuccess == null || _onFailure == null) &&
        _onSuccessOrFailure == null) {
      throw new StateError("If you don't set one or both of onSuccess and "
          "onFailure, you must set onSuccessOrFailure to cover for them.");
    }
  }

  /// The string that will be presented to player in choicelists.
  final String name;
  /// Returns true if the move is available at the moment. If [getAvailability]
  /// is null, then it's the same as if it was [:() => true:].
  final GetAvailabilityFunction getAvailability;
  final OutputOnlyFunction onSetup;
  final OutputOnlyFunction _onSuccess;
  final OutputOnlyFunction _onFailure;
  final OutputOnlyFunction _onSuccessOrFailure;
  OutputOnlyFunction get onSuccess => _wrapWithFiredCounter(_onSuccess);
  OutputOnlyFunction get onFailure => _wrapWithFiredCounter(_onFailure);
  /// This runs whether or not it's a success or failure. You shouldn't define
  /// this if [onSuccess] or [onFailure] is defined.
  OutputOnlyFunction get onSuccessOrFailure =>
      _wrapWithFiredCounter(_onSuccessOrFailure);
  final bool repeatable;

  get hasBeenFired => _firedCount > 0;

  OutputOnlyFunction _wrapWithFiredCounter(OutputOnlyFunction f) {
    if (f == null) return null;
    return () {
      _firedCount += 1;
      f();
    };
  }

  OutputOnlyFunction _successOrFailureResolver(
      OutputOnlyFunction calledFunction, String functionName) {
    if (calledFunction != null && _onSuccessOrFailure != null) {
      throw new StateError("You can either set up $functionName or "
          "onSuccessOrFailure, but not both.");
    }
    var f = (calledFunction != null) ? calledFunction : onSuccessOrFailure;
    return _wrapWithFiredCounter(f);
  }

  /// Number of times this was fired.
  int _firedCount = 0;

  /// The last time (probably in [Timeline] ticks) this was fired.
  int timeLastFired = null;

  /// Gets the availability as defined by default. For example, non-repeatable
  /// actions that have been fired before are not available. Implementing
  /// instance doesn't need to check for that.
  bool get isAvailableByDefault => repeatable || _firedCount == 0;

  toString() => name;
}

typedef bool GetAvailabilityFunction();
typedef void OutputOnlyFunction();
