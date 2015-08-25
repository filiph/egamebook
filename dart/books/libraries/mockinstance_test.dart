import 'package:unittest/unittest.dart';
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
    test("nonexistent fields are MockInstance", () {
      var a = new MockInstance();
      expect(a.x, new isInstanceOf<MockInstance>());
      expect(a.y, new isInstanceOf<MockInstance>());
      expect(a.z, new isInstanceOf<MockInstance>());
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
    test("allow for [] accessor", () {
      var a = new MockInstance();
      a["something"] = 1;
      expect(a["something"], 1);
    });
    test("allow for [] accessor down the chain", () {
      var a = new MockInstance();
      a.x.y["something"] = 1;
      expect(a.x.y["something"], 1);
    });
    test("the [] accessor doesn't break the chain", () {
      var a = new MockInstance();
      a.x["something"].y = 1;
      expect(a.x["something"].y, 1);
    });
  });
}

