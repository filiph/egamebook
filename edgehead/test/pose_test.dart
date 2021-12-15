import 'package:edgehead/fractal_stories/pose.dart';
import 'package:test/test.dart';

void main() {
  group("Pose comparison", () {
    test("equivalency", () {
      expect(Pose.combat == Pose.combat, isTrue);
      expect(Pose.onGround == Pose.standing, isFalse);
    });

    test("greater than (or equals)", () {
      expect(Pose.combat > Pose.standing, isTrue);
      expect(Pose.combat >= Pose.standing, isTrue);
      expect(Pose.combat >= Pose.combat, isTrue);

      expect(Pose.onGround > Pose.standing, isFalse);
      expect(Pose.onGround >= Pose.standing, isFalse);
    });

    test("lesser than (or equals)", () {
      expect(Pose.onGround < Pose.offBalance, isTrue);
      expect(Pose.onGround <= Pose.offBalance, isTrue);
      expect(Pose.extended <= Pose.extended, isTrue);

      expect(Pose.extended < Pose.offBalance, isFalse);
      expect(Pose.extended <= Pose.onGround, isFalse);
    });
  });
}
