import 'package:unittest/unittest.dart';
import 'package:egamebook/src/shared/form.dart';
import 'package:egamebook/src/interface/form_proxy.dart';
import 'dart:convert';

void main() {
  group("Basic", () {
    Form form;
    RangeInput input1, input2;
    int age, money;

    setUp(() {
      form = new Form();
      input1 = new RangeInput("Age", (value) => age = value, min: 20,
          max: 100, value: 30, step: 1, maxEnabled: 40);
      input2 = new RangeInput("Money", (value) => money = value, max:
          1000, step: 100);
    });

    test("Form gives its children unique ids before sending", () {
      form.children.add(input1);
      form.children.add(input2);
      form.toMap();
      expect(input1.id, isNot(input2.id));
      expect(input1.id, isNotNull);
    });

    test("Form from Scripter is recreated in interface", () {
      form.children.add(input1);
      form.children.add(input2);
      Map map = form.toMap();
      print(JSON.encode(map));
      FormProxy formProxy = new FormProxy.fromMap(map);
      expect(formProxy.children.length, form.children.length);
      expect((form.children[0] as BaseRangeInput).max, 
          (formProxy.children[0] as BaseRangeInput).max);
    });
  });
}
