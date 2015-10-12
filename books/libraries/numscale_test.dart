import 'package:test/test.dart';
import 'numscale.dart';

void main() {
  group("NumScale", () {
    test("hits min", () {
      var scale = new NumScale(min: 0, max: 100, initialValue: 50);
      scale.onMin().listen(expectAsync((v) {
        expect(v, 0);
      }, count: 1));
      for (int i = 0; i < 100; i++) {
        scale.value -= 1;
      }
    });
    test("hits max", () {
      var scale = new NumScale(min: 0, max: 100, initialValue: 50);
      scale.onMax().listen(expectAsync((v) {
        expect(v, 100);
      }, count: 1));
      for (int i = 0; i < 100; i++) {
        scale.value += 1;
      }
    });
    test("hits max even with bigger step", () {
      var scale = new NumScale(min: 0, max: 100, initialValue: 50);
      scale.onMax().listen(expectAsync((v) {
        expect(v, 100);
      }, count: 1));
      for (int i = 0; i < 50; i++) {
        scale.value += 17;
      }
    });
    test("detects value pass", () {
      var scale = new NumScale(min: 0, max: 100, initialValue: 50);
      scale.onPass(40).listen(expectAsync((v) {
        expect(v, lessThanOrEqualTo(40));
      }, count: 1));
      for (int i = 0; i < 50; i++) {
        scale.value -= 2;
      }
    });
    test("detects value pass downwards", () {
      var scale = new NumScale(min: 0, max: 100, initialValue: 50);
      scale.onPassDownwards(40).listen(expectAsync((v) {
        expect(v, lessThanOrEqualTo(40));
      }, count: 1));
      for (int i = 0; i < 50; i++) {
        scale.value -= 2;
      }
    });
    test("detects value pass upwards", () {
      var scale = new NumScale(min: 0, max: 100, initialValue: 50);
      scale.onPassUpwards(65).listen(expectAsync((v) {
        expect(v, greaterThanOrEqualTo(65));
      }, count: 1));
      for (int i = 0; i < 50; i++) {
        scale.value += 1;
      }
    });
  });

  group("IntScale", () {
    test("hits min", () {
      var scale = new IntScale(min: 0, max: 100, initialValue: 50);
      scale.onMin().listen(expectAsync((v) {
        expect(v, 0);
      }, count: 1));
      for (int i = 0; i < 100; i++) {
        scale.value -= 1;
      }
    });
    test("hits max", () {
      var scale = new IntScale(min: 0, max: 100, initialValue: 50);
      scale.onMax().listen(expectAsync((v) {
        expect(v, 100);
      }, count: 1));
      for (int i = 0; i < 100; i++) {
        scale.value += 1;
      }
    });
    test("hits max even with bigger step", () {
      var scale = new IntScale(min: 0, max: 100, initialValue: 50);
      scale.onMax().listen(expectAsync((v) {
        expect(v, 100);
      }, count: 1));
      for (int i = 0; i < 50; i++) {
        scale.value += 17;
      }
    });
    test("detects value pass", () {
      var scale = new IntScale(min: 0, max: 100, initialValue: 50);
      scale.onPass(40).listen(expectAsync((v) {
        expect(v, lessThanOrEqualTo(40));
      }, count: 1));
      for (int i = 0; i < 50; i++) {
        scale.value -= 2;
      }
    });
    test("detects value pass downwards", () {
      var scale = new IntScale(min: 0, max: 100, initialValue: 50);
      scale.onPassDownwards(40).listen(expectAsync((v) {
        expect(v, lessThanOrEqualTo(40));
      }, count: 1));
      for (int i = 0; i < 50; i++) {
        scale.value -= 2;
      }
    });
    test("detects value pass upwards", () {
      var scale = new IntScale(min: 0, max: 100, initialValue: 50);
      scale.onPassUpwards(65).listen(expectAsync((v) {
        expect(v, greaterThanOrEqualTo(65));
      }, count: 1));
      for (int i = 0; i < 50; i++) {
        scale.value += 1;
      }
    });
  });
}
