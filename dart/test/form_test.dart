import 'package:unittest/unittest.dart';
import 'package:egamebook/src/shared/form.dart';

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

    test("Children are added to parents", () {
      form.add(input1);
      expect(input1.parent, form);
      expect(input2.parent, isNull);
      expect(form.children.length, 1);
    });

    test("Form keeps track of ids of children", () {
      form.add(input1);
      form.add(input2);
      expect(input1.id, isNot(input2.id));
      expect(input1.id, isNotNull);
    });

    test("Form from Scripter is recreated in interface", () {
      form.add(input1);
      form.add(input2);
      Map formMap = form.toMap();
      InterfaceForm interfaceForm = new InterfaceForm(formMap);
      expect(interfaceForm.children.length, form.children.length);
    });
  });
}
