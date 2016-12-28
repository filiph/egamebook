library stranded.team;

import 'package:built_value/built_value.dart';

part 'team.g.dart';

final Team defaultEnemyTeam = new Team((b) => b.id = 2);

final Team neutralTeam = new Team((b) => b.id = 0);
final Team playerTeam = new Team((b) => b.id = 1);

abstract class Team implements Built<Team, TeamBuilder> {
  factory Team([updates(TeamBuilder b)]) = _$Team;

  Team._();
  int get id;

  /// Currently, every team is enemy of every other team. In the future,
  /// we can implement allegiances etc.
  bool isEnemyWith(Team other) => id != other.id;
}
