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
    CheckboxInput checkboxInput;
    int age, money;

    setUp(() {
      form = new Form();
      input1 = new RangeInput("Age", (value) => age = value, min: 20, max: 100,
          value: 30, step: 1, maxEnabled: 40);
      input2 = new RangeInput("Money", (value) => money = value, max: 1000,
          step: 100);
      checkboxInput = new CheckboxInput("Use extra force", (_) {});
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
      form.children.add(checkboxInput);
      Map map = form.toMap();
      print(JSON.encode(map));
      FormProxy formProxy = new FormProxy.fromMap(map);
      expect(formProxy.children.length, form.children.length);
      expect((form.children[0] as BaseRange).max, (formProxy.children[0] as
          BaseRange).max);
    });
  });

  group("HtmlInterface", () {
    Form form;
    RangeInput input1, input2, input3;
    RangeOutput energyGauge;
    RangeInput weapons, shields;
    CheckboxInput checkboxInput;
    TextOutput textOutput;
    int age, money, freetime;
    EgbInterface interface;
    EgbStorage storage;
    EgbScripterProxy scripterProxyStub;

    setUp(() {
      form = new Form();
      input1 = new RangeInput("Age", (value) => age = value, min: 20, max: 100,
          value: 30, step: 5, minEnabled: 25, maxEnabled: 40);
      input2 = new RangeInput("Money", (value) => money = value, max: 1000,
          step: 100);
      input3 = new RangeInput("Free time", (value) => freetime = value, max: 10,
          maxEnabled: 5);
      
      Function updateEnergyGauges = (_) {
        energyGauge.current = 10 - weapons.current - shields.current;
        weapons.maxEnabled = weapons.current + energyGauge.current;
        shields.maxEnabled = shields.current + energyGauge.current;
      };
      energyGauge = new RangeOutput("Energy available", max: 10, value: 10);
      weapons = new RangeInput("Weapons", updateEnergyGauges, value: 0);
      shields = new RangeInput("Shields", updateEnergyGauges, value: 0);
      
      textOutput = new TextOutput();
      
      checkboxInput = new CheckboxInput("Use extra force", (_) {});

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
    
    test("creates checkbox", () {
      form.children.add(checkboxInput);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = interface.showForm(formProxy);
      CheckboxInputElement checkboxEl = 
          querySelector("#${formProxy.children.first.id} input");
      expect(checkboxInput.current, false);
      stream.listen(expectAsync((CurrentState values) {
        print(JSON.encode(values.toMap()));
        form.receiveUserInput(values);
        expect((form.children[0] as CheckboxInput).current, true);
      }));
      checkboxEl.click();
    });

    test("sends updated values", () {
      form.children.add(input1);
      form.children.add(input2);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = interface.showForm(formProxy);
      // Select the second radio button of the first RangeInput -> age = 25.
      RadioButtonInputElement radioButton = querySelector(
          "#${formProxy.children.first.id} div.buttons input:nth-child(2)");
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
      ButtonElement submitButton = querySelectorAll("button.submit-main").last;
      stream.listen(expectAsync((CurrentState values) {
        expect(values.submitted, true);
        // Select the second radio button of the first RangeInput -> age = 25.
        RadioButtonInputElement radioButton = querySelector(
            "#${formProxy.children.first.id} div.buttons input:nth-child(2)");
        expect(radioButton.disabled, true);
        expect(submitButton.disabled, true);
      }));
      submitButton.click();
    });

    test("updates according to onInput listeners", () {
      form.children.add(input1);
      form.children.add(input2);
      form.children.add(input3);
      form.onInput = (_) {
        if (input1.current <= 25) {
          input3.maxEnabled = null;
        } else {
          input3.maxEnabled = 5;
        }
      };
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = interface.showForm(formProxy);

      RadioButtonInputElement freeTimeButton = querySelector(
          "#${formProxy.children[2].id} div.buttons input:nth-child(8)");
      expect(freeTimeButton.disabled, true);

      stream.listen(expectAsync((CurrentState values) {
        FormConfiguration changedConfig = form.receiveUserInput(values);
        interface.updateForm(changedConfig);
        // Make sure the free time buttons have been un-disabled.
        RadioButtonInputElement freeTimeButton = querySelector(
            "#${formProxy.children[2].id} div.buttons input:nth-child(8)");
        expect(freeTimeButton.disabled, false);
      }));

      // Select age = 25.
      RadioButtonInputElement ageButton = querySelector(
          "#${formProxy.children.first.id} div.buttons input:nth-child(2)");
      ageButton.click();
    });

    test("values update", () {
      var inputMoney = new RangeInput("Money", (value) => money = value,
          stringifyFunction: (int value) => "\$$value", max: 1000, step: 100);
      var inputPercentage = new RangeInput("Thrust", (value) {}, max: 100, step:
          10, stringifyFunction: (int value) => "$value %");
      form.children.add(inputMoney);
      form.children.add(inputPercentage);

      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = interface.showForm(formProxy);

      stream.listen(expectAsync((CurrentState values) {
        FormConfiguration changedConfig = form.receiveUserInput(values);
        interface.updateForm(changedConfig);
        var percentageStringElement = querySelector(
            "#${formProxy.children.last.id} p.current-value");
        expect(percentageStringElement.text, "100 %");
      }));
      
      // Select percentage = 100%.
      RadioButtonInputElement percentageButton = querySelector(
          "#${formProxy.children.last.id} div.buttons input:nth-child(11)");
      percentageButton.click();
    });
    
    test("creates RangeOutput and updates it", () {
      form.children.add(energyGauge);
      form.children.add(weapons);
      form.children.add(shields);
      
      Map map = form.toMap();
      print(JSON.encode(map));

      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = interface.showForm(formProxy);

      stream.listen(expectAsync((CurrentState values) {
        FormConfiguration changedConfig = form.receiveUserInput(values);
        interface.updateForm(changedConfig);
        
        RadioButtonInputElement onlyTwoAvailableButton = querySelector(
            "#${formProxy.children.first.id} div.buttons input:nth-child(3)");
        expect(onlyTwoAvailableButton.checked, true);
      }));
      
      // Select Shields = 8
      RadioButtonInputElement eightButton = querySelector(
          "#${formProxy.children.last.id} div.buttons input:nth-child(9)");
      eightButton.click();
    });
    
    test("creates text output", () {
      textOutput.html = "<p>Initial text.</p>";
      form.children.add(textOutput);
      form.children.add(input1);
      
      form.onInput = (_) {
        textOutput.html = "<p>You are currently <strong>${input1.current}"
            "</strong> years old.</p>";
      };
      
      Map map = form.toMap();
      print(JSON.encode(map));

      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = interface.showForm(formProxy);

      stream.listen((CurrentState values) {
        FormConfiguration changedConfig = form.receiveUserInput(values);
        interface.updateForm(changedConfig);
        
        
        ParagraphElement textOutputParagraph = querySelector(
            "#${formProxy.children.first.id} p");
        expect(textOutputParagraph.text, "You are currently 35 years old.");
      });
      
      // Select age = 35
      RadioButtonInputElement ageButton = querySelector(
          "#${formProxy.children.last.id} div.buttons input:nth-child(4)");
      ageButton.click();
    });

    test("creates MultipleChoice", () {
      MultipleChoiceInput moveChoice = new MultipleChoiceInput("Action", null);
      Option a = new Option("Zvolit A", null, selected: true);
      Option b = new Option("Zvolit B", null);
      moveChoice.children.addAll([a, b]);
          
      form.append(moveChoice);
    });
  });
}
