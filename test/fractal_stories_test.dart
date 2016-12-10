import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:test/test.dart';

import 'package:edgehead/fractal_stories/actor.dart';

void main() {
  group("fractal_stories", () {
    group("Actor", () {
      test("rebuilt actor has different hashcode", () {
        Actor filip = new Actor((b) => b
          ..id = 1
          ..isPlayer = true
          ..pronoun = Pronoun.YOU
          ..name = "Filip"
          ..currentWeapon = new Sword()
          ..hitpoints = 2
          ..initiative = 1000);

        var filip2 = filip.rebuild((b) => b.name = "Richard");

        expect(filip.hashCode, equals(filip.hashCode));
        expect(filip.hashCode, isNot(filip2.hashCode));
      });
    });
  });
}
