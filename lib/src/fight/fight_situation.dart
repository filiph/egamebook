library stranded.fight.fight_situation;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/util/alternate_iterables.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/confuse.dart';
import 'package:edgehead/src/fight/actions/pound.dart';
import 'package:edgehead/src/fight/actions/sweep_off_feet.dart';
import 'package:edgehead/src/fight/actions/regain_balance.dart';
import 'package:edgehead/src/fight/actions/scramble.dart';
import 'package:edgehead/src/fight/actions/stand_up.dart';
import 'package:edgehead/src/fight/actions/start_slash.dart';
import 'package:edgehead/src/fight/actions/start_slash_out_of_balance.dart';
import 'package:edgehead/src/fight/actions/start_slash_out_of_balance_player.dart';
import 'package:edgehead/src/fight/actions/start_slash_player.dart';
import 'package:edgehead/src/fight/actions/start_strike_down.dart';
import 'package:edgehead/src/fight/actions/start_strike_down_player.dart';
import 'package:edgehead/src/fight/actions/unconfuse.dart';

part 'fight_situation.g.dart';

typedef void TimedEventCallback(WorldState world, Storyline storyline);

abstract class FightSituation extends Situation
    implements Built<FightSituation, FightSituationBuilder> {
  /// The advantage that player has over all other actors in terms of frequency
  /// of turns.
  static const double _playerTurnAdvantage = 1.5;

  factory FightSituation([updates(FightSituationBuilder b)]) = _$FightSituation;

  factory FightSituation.initialized(Iterable<Actor> playerTeam,
          Iterable<Actor> enemyTeam, String groundMaterial) =>
      new FightSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..playerTeamIds.replace(playerTeam.map((a) => a.id))
        ..enemyTeamIds.replace(enemyTeam.map((a) => a.id))
        ..groundMaterial = groundMaterial);
  FightSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators => [
        Confuse.builder,
        Pound.builder,
        SweepOffFeet.builder,
        StartSlash.builder,
        StartSlashPlayer.builder,
        StartStrikeDown.builder,
        StartStrikeDownPlayer.builder,
        StartSlashOutOfBalance.builder,
        StartSlashOutOfBalancePlayer.builder,
      ];

  @override
  List<Action> get actions => <Action>[
        RegainBalance.singleton,
        StandUp.singleton,
        Scramble.singleton,
        Unconfuse.singleton
      ];

  BuiltList<int> get enemyTeamIds;

  BuiltMap<int, TimedEventCallback> get events;

  /// The material on the ground. It can be 'wooden floor' or 'grass'.
  ///
  /// This is used when describing how monsters and team members fall to the
  /// ground and how missiles get stuck in it.
  String get groundMaterial;

  @override
  int get id;

  @override
  String get name => "FightSituation";

  BuiltList<int> get playerTeamIds;

  @override
  int get time;

  @override
  FightSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, WorldState world) {
    var allActorIds = alternate<int>(playerTeamIds, enemyTeamIds);
    var actors = allActorIds
        .map((id) => world.getActorById(id))
        .where((a) => a.isAliveAndActive)
        .toList(growable: false);
    var players = actors.where((a) => a.isPlayer).toList(growable: false);
    assert(players.length <= 1);
    Actor player = players.length == 1 ? players.single : null;

    if (time == 0) {
      // Always start with the player if possible.
      if (player != null) {
        return player;
      }
    }

    var best = 0;
    Actor chosen;

    for (var actor in actors) {
      var latestRecord = world.actionRecords
          .firstWhere((rec) => rec.protagonist == actor.id, orElse: () => null);
      int latestTime = latestRecord?.time ?? -1;
      int recency = world.time - latestTime;
      if (actor.isPlayer) {
        // Let player act more often.
        recency = (recency * _playerTurnAdvantage).round();
      }
      if (recency > best) {
        chosen = actor;
        best = recency;
      }
    }

    return chosen;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) =>
      actors.where((Actor actor) =>
          actor.isAliveAndActive &&
          (playerTeamIds.contains(actor.id) ||
              enemyTeamIds.contains(actor.id)));

  // We're using [onBeforeAction] because when using onAfterAction, we'd report
  // timed events at a time when an action in FightSituation might have
  // created other (child) situations.
  @override
  void onBeforeAction(WorldState world, Storyline s) {
    if (Randomly.saveAgainst(0.25)) {
      s.addParagraph();
    }
    if (events.containsKey(time)) {
      events[time](world, s);
    }
  }

  @override
  bool shouldContinue(WorldState world) {
    bool canFight(Iterable<int> teamIds) =>
        teamIds.any((id) => world.getActorById(id).isAliveAndActive);
    bool isPlayerAndAlive(int id) {
      var actor = world.getActorById(id);
      return actor.isPlayer && actor.isAliveAndActive;
    }

    return canFight(playerTeamIds) &&
        canFight(enemyTeamIds) &&
        playerTeamIds.any(isPlayerAndAlive);
  }
}
