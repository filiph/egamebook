import 'package:unittest/unittest.dart';
import 'package:egamebook/src/shared/form.dart';
import 'package:egamebook/src/interface/form_proxy.dart';
import 'dart:convert';
import 'package:egamebook/src/interface/interface_html.dart';
import 'package:egamebook/src/persistence/storage.dart';
import 'dart:html';
import 'dart:async';
import 'package:egamebook/src/book/scripter_proxy.dart';
import 'package:egamebook/src/persistence/savegame.dart';
import 'package:egamebook/src/runner.dart';
import 'dart:math';


class ScripterProxyStub extends EgbScripterProxy {
  @override
  Future init() {
    return new Future.value();
  }

  EgbInterface interface;

  @override
  void load(EgbSavegame savegame, [Set<String> playerChronology]) {
  }

  @override
  void quit() {
  }

  @override
  void restart() {
  }

  @override
  String get uid => "ProxyStubBOOK";
}

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
    RangeInput input1, input2, input3;
    int age, money, freetime;
    EgbInterface interface;
    EgbStorage storage;
    EgbScripterProxy scripterProxyStub;

    setUp(() {
      form = new Form();
      input1 = new RangeInput("Age", (value) => age = value, min: 20,
          max: 100, value: 30, step: 5, minEnabled: 25, maxEnabled: 40);
      input2 = new RangeInput("Money", (value) => money = value, max:
          1000, step: 100);
      input3 = new RangeInput("Free time", (value) => freetime = value,
          max: 10, maxEnabled: 5);
      
      interface = new HtmlInterface();
      storage = new MemoryStorage();
      scripterProxyStub = new ScripterProxyStub();
      
      return runDirectly(scripterProxyStub, interface, storage);
    });
    
    tearDown(() {
      scripterProxyStub.quit();
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
    
    solo_test("updates according to onInput listeners", () {
      form.children.add(input1);
      form.children.add(input2);
      form.children.add(input3);
      form.onInput = (_) {
        if (input1.current <= 25) {
          input3.maxEnabled = null;
        } else {
          input3.maxEnabled = 5;
//          input3.current = min(input3.current, input3.maxEnabled);
        }
      };
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = interface.showForm(formProxy);
      
      stream.listen(/*expectAsync(*/(CurrentState values) {
        FormConfiguration changedConfig = form.receiveUserInput(values);
        interface.updateForm(changedConfig);
      }/*)*/);
    });
    
  });
}
