library stranded.team;

import 'package:built_value/built_value.dart';

part 'team.g.dart';

abstract class Team implements Built<Team, TeamBuilder> {
  int get id;

  Team._();
  factory Team([updates(TeamBuilder b)]) = _$Team;

  /// Currently, every team is enemy of every other team. In the future,
  /// we can implement allegiances etc.
  bool isEnemyWith(Team other) => id != other.id;
}

final Team neutralTeam = new Team((b) => b.id = 0);
final Team playerTeam = new Team((b) => b.id = 1);
final Team defaultEnemyTeam = new Team((b) => b.id = 2);
