import 'package:unittest/unittest.dart';
import '../../lib/src/book/scripter.dart';
import 'mockinstance.dart';

void main() {
  group("MockInstance", () {
    test("doesn't throw on accessing non-existent fields", () {
      var a = new MockInstance();
      expect(() {
        a.x = 1;
        a.y = "string";
        a.z = true;
      }, returnsNormally);
    });
    test("persists", () {
      var a = new MockInstance();
      a.x = 1;
      a.y = "string";
      a.z = true;
      expect(a.x, 1);
      expect(a.y, "string");
      expect(a.z, true);
    });
    test("nonexistent fields are MockInterface", () {
      var a = new MockInstance();
      expect(a.x, new isInstanceOf<MockInstance>("MockInstance"));
      expect(a.y, new isInstanceOf<MockInstance>("MockInstance"));
      expect(a.z, new isInstanceOf<MockInstance>("MockInstance"));
    });
    test("arithmetic works", () {
      var a = new MockInstance();
      a.x = 1;
      expect(a.x, 1);
      a.x++;
      expect(a.x, 2);
      a.x = a.x * 10;
      expect(a.x, 20);
      a.y = 5;
      expect(a.x * a.y, 100);
    });
    test("chain doesn't crash", () {
      var a = new MockInstance();
      expect(() {
        a.x.y = 1;
        a.x.z.q = "string";
        a.x.z.r = true;
      }, returnsNormally);
    });
    test("chain keeps persistence", () {
      var a = new MockInstance();
      a.x.y = 1;
      a.x.z.q = "string";
      a.x.z.r = true;
      expect(a.x.y, 1);
      expect(a.x.z.q, "string");
      expect(a.x.z.r, true);
    });
  });
}

