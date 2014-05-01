import 'package:unittest/unittest.dart';
import 'package:egamebook/src/shared/form.dart';
import 'package:egamebook/src/interface/form_proxy.dart';
import 'dart:convert';
import 'package:egamebook/src/interface/interface_html.dart';
import 'package:egamebook/src/persistence/storage.dart';
import 'dart:html';
import 'dart:async';

void main() {
  unittestConfiguration.timeout = new Duration(seconds: 5);
  
  group("Pure", () {
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
  
  group("HtmlInterface", () {
    Form form;
    RangeInput input1, input2;
    int age, money;
    EgbInterface interface;

    setUp(() {
      form = new Form();
      input1 = new RangeInput("Age", (value) => age = value, min: 20,
          max: 100, value: 30, step: 5, minEnabled: 25, maxEnabled: 40);
      input2 = new RangeInput("Money", (value) => money = value, max:
          1000, step: 100);
      
      
      // create the interface
      interface = new HtmlInterface();
      // open storage
      EgbStorage storage = new MemoryStorage();
      // set player profile
      interface.setPlayerProfile(storage.getDefaultPlayerProfile());
      interface.setup();
    });
    
    tearDown(() {
      interface.close();
//      querySelector("#book-wrapper").children.clear();
    });
    
    test("creates DOM elements", () {
      form.children.add(input1);
      form.children.add(input2);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      interface.showForm(formProxy);
      expect(querySelector("#${formProxy.children.first.id}"), isNotNull);
    });

    test("sends updated values", () {
      form.children.add(input1);
      form.children.add(input2);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = interface.showForm(formProxy);
      // Select the second radio button of the first RangeInput -> age = 25.
      RadioButtonInputElement radioButton = 
          querySelector("#${formProxy.children.first.id} div.buttons "
                        "input:nth-child(2)");
      expect(radioButton.checked, false);
      stream.listen(expectAsync((CurrentState values) {
        form.receiveUserInput(values);
        expect((form.children[0] as RangeInput).current, 25);
        expect(age, 25);
      }));
      radioButton.click();
    });
    
    // TODO: disabled right after changing a value
    
    test("sends and closes after being submitted", () {
      form.children.add(input1);
      form.children.add(input2);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = interface.showForm(formProxy);
      ButtonElement submitButton = 
          querySelectorAll("button.submit").last;
      stream.listen(expectAsync((CurrentState values) {
        expect(values.submitted, true);
        // Select the second radio button of the first RangeInput -> age = 25.
        RadioButtonInputElement radioButton = 
            querySelector("#${formProxy.children.first.id} div.buttons "
            "input:nth-child(2)");
        expect(radioButton.disabled, true);
        expect(submitButton.disabled, true);
      }));
      submitButton.click();
    });
    
  });
}
