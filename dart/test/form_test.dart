import 'package:unittest/unittest.dart';
import 'package:egamebook/src/shared/form.dart';
import 'package:egamebook/src/shared/user_interaction.dart';
import 'package:egamebook/src/presenter/form_proxy.dart';
import 'dart:convert';
import 'package:egamebook/presenters/html/html_presenter.dart';
import 'package:egamebook/src/persistence/storage.dart';
import 'dart:html' show SpanElement, Event, ButtonElement, SelectElement, OptionElement, DivElement, CheckboxInputElement, ParagraphElement, RadioButtonInputElement, querySelector, querySelectorAll;
import 'dart:async';
import 'package:egamebook/src/book/scripter_proxy.dart';
import 'package:egamebook/src/persistence/savegame.dart';
import 'package:egamebook/runner.dart';


class ScripterProxyStub extends EgbScripterProxy {
  @override
  Future init() {
    return new Future.value();
  }

  EgbPresenter presenter;

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

  group("Basic setup", () {
    test("defines the same builder closures for "
        "FormProxy and HtmlPresenter", () {
      Set<String> proxyBuilders = customTagHandlers.keys.toSet();
      Set<String> presenterBuilders = ELEMENT_BUILDERS.keys.toSet();
      expect(proxyBuilders, equals(presenterBuilders));
    });
  });

  group("Pure", () {
    Form form;
    RangeInput input1, input2;
    CheckboxInput checkboxInput;
    MultipleChoiceInput multipleChoiceInput;
    Option option1, option2, option3;
    TextOutput textOutput;

    int age, money;

    setUp(() {
      form = new Form();
      input1 = new RangeInput("Age", (value) => age = value, min: 20, max: 100,
          value: 30, step: 1, maxEnabled: 40);
      input2 = new RangeInput("Money", (value) => money = value, max: 1000,
          step: 100);
      checkboxInput = new CheckboxInput("Use extra force", (_) {});
      multipleChoiceInput = new MultipleChoiceInput("Multiple Choice", (_) {});
      option1 = new Option("Option 1", (_) {});
      option2 = new Option("Option 2", (_) {}, selected: true);
      option3 = new Option("Option 3", (_) {}, helpMessage: "Help option");
      textOutput = new TextOutput();
    });

    test("Form gives its children unique ids before sending", () {
      form.children.add(input1);
      form.children.add(input2);
      form.toMap();
      expect(input1.id, isNot(input2.id));
      expect(input1.id, isNotNull);
    });

    test("Form from Scripter is recreated in presenter", () {
      form.children.add(input1);
      form.children.add(input2);
      form.children.add(checkboxInput);
      Map map = form.toMap();
      // print(JSON.encode(map));
      FormProxy formProxy = new FormProxy.fromMap(map);
      expect(formProxy.children.length, form.children.length);
      expect((form.children[0] as RangeBase).max, (formProxy.children[0] as
          RangeBase).max);
    });

    test("Elements get parents", () {
      form.children.add(input1);
      Map map = form.toMap();
      FormProxy formProxy = new FormProxy.fromMap(map);
      expect(formProxy.children.single.parent, formProxy);
    });

    // TODO make this work (Form currently doesn't update its disabled/hidden
    //   status)
//    test("disabledOrInsideDisabledParent works with Form", () {
//      form.children.add(input1);
//      form.disabled = true;
//      Map map = form.toMap();
//      FormProxy formProxy = new FormProxy.fromMap(map);
//      expect((formProxy.children.single as FormElement)
//          .disabledOrInsideDisabledParent, true);
//    });

    test("disabledOrInsideDisabledParent works with FormSection", () {
      FormSection section = new FormSection("Test")
          ..children.add(input1)
          ..disabled = true;
      form.children.add(section);
      Map map = form.toMap();
      FormProxy formProxy = new FormProxy.fromMap(map);
      expect((formProxy.children.single as FormSection).disabled, true);
      expect((formProxy.children.single.children.single as FormElement)
          .disabledOrInsideDisabledParent, true);
    });

    test("Options in MultipleChoice", () {
      multipleChoiceInput.children.add(option1);
      multipleChoiceInput.children.add(option2);
      multipleChoiceInput.children.add(option3);
      form.children.add(multipleChoiceInput);
      Map map = form.toMap();
      FormProxy formProxy = new FormProxy.fromMap(map);
      expect(formProxy.children.single.children.length,
          multipleChoiceInput.children.length);
      expect((formProxy.children.single.children[0] as OptionBase).current,
          (multipleChoiceInput.children[0] as OptionBase).current);
      expect((formProxy.children.single.children[1] as OptionBase).current,
          true); //we are setting selected as true
      expect((formProxy.children.single.children[2] as FormElement).helpMessage,
          isNotNull);
      expect((formProxy.children.single.children[2] as FormElement).helpMessage,
             (multipleChoiceInput.children[2] as FormElement).helpMessage);
    });

    test("formElementChildren in MultipleChoice", () {
      multipleChoiceInput.children.add(option1);
      multipleChoiceInput.children.add(option2);
      multipleChoiceInput.children.add(option3);
      form.children.add(multipleChoiceInput);
      Map map = form.toMap();
      FormProxy formProxy = new FormProxy.fromMap(map);
      expect((formProxy.children.single as FormElement)
          .formElementChildren.length, multipleChoiceInput.children.length);
    });

    test("allFormElementsBelowThisOne for Form, MultipleChoice and Options",
      () {
      multipleChoiceInput.children.add(option1);
      multipleChoiceInput.children.add(option2);
      multipleChoiceInput.children.add(option3);
      form.children.add(multipleChoiceInput);
      Map map = form.toMap();
      FormProxy formProxy = new FormProxy.fromMap(map);
      expect((formProxy.children.single.parent as FormElement)
          .allFormElementsBelowThisOne.length,
          form.children.length + multipleChoiceInput.children.length);
    });

    test("FormElements are instances (implement) of UpdatableByMap", () {
      expect(input1, new isInstanceOf<UpdatableByMap>());
      expect(checkboxInput, new isInstanceOf<UpdatableByMap>());
      expect(textOutput, new isInstanceOf<UpdatableByMap>());
      expect(option1, new isInstanceOf<UpdatableByMap>());
    });
  });

  group("HtmlPresenter", () {
    Form form;
    FormSection formSection1, formSection2, formSection3;
    RangeInput input1, input2, input3;
    RangeOutput energyGauge;
    RangeInput weapons, shields;
    CheckboxInput checkboxInput;
    TextOutput textOutput;
    SubmitButton submitButton;
    int age, money, freetime;
    EgbPresenter presenter;
    EgbStorage storage;
    EgbScripterProxy scripterProxyStub;
    ButtonElement startButton, restartButton;

    setUp(() {
      form = new Form();
      input1 = new RangeInput("Age", (value) => age = value, min: 20, max: 100,
          value: 30, step: 5, minEnabled: 25, maxEnabled: 40);
      input2 = new RangeInput("Money", (value) => money = value, max: 1000,
          step: 100);
      input3 = new RangeInput("Free time", (value) => freetime = value, max: 10,
          maxEnabled: 5);
      submitButton = new SubmitButton("SUBMIT BUTTON", null,
          helpMessage: "Submit help message");
      formSection1 = new FormSection("My form section 1")
          ..children.add(input1);
      formSection2 = new FormSection("My form section 2")
          ..children.add(input2);
      formSection3 = new FormSection("My form section 3")
          ..children.add(input3);

      startButton = querySelector("#start-button");
      restartButton = querySelector("#book-restart");

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

      presenter = new HtmlPresenter();
      storage = new MemoryStorage();
      scripterProxyStub = new ScripterProxyStub();

      return runDirectly(scripterProxyStub, presenter, storage);
    });

    tearDown(() {
      scripterProxyStub.quit();
      presenter.close();
      //      querySelector("#book-wrapper").children.clear();
    });

    test("tests start button", () async {
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      presenter.showForm(formProxy);

      expect(querySelector("div#book-title").style.display == "none", isFalse);
      expect(querySelector("div#big-bottom-button").style.display == "none",
        isFalse);

      startButton.click();

      await new Future.delayed(new Duration(milliseconds: 200), (){
        expect(querySelector("div#book-title").style.display == "none", isTrue);
        expect(querySelector("div#big-bottom-button").style.display == "none",
            isTrue);
      });
    });

    test("tests restart button", () async {
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      presenter.showForm(formProxy);

      restartButton.click();

      await new Future.delayed(new Duration(milliseconds: 200), (){
        expect(presenter.getTextHistory() == "", isTrue);
        expect(querySelector("div#book-wrapper").children.isEmpty, isTrue);
      });
    });

    test("creates DOM elements", () {
      form.children.add(input1);
      form.children.add(input2);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      presenter.showForm(formProxy);
      expect(querySelector("#${formProxy.children.first.id}"), isNotNull);
    });

    test("creates checkbox", () {
      bool checked = false;
      checkboxInput.onInput = (bool value) => checked = value;
      form.children.add(checkboxInput);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = presenter.showForm(formProxy);
      CheckboxInputElement checkboxEl =
          querySelector("#${formProxy.children.first.id} input");
      expect(checkboxInput.current, false);
      stream.listen(expectAsync((CurrentState values) {
        print(JSON.encode(values.toMap()));
        form.receiveUserInput(values);
        expect((form.children[0] as CheckboxInput).current, true);
        expect(checked, true);
      }));
      checkboxEl.click();
    });

    test("creates submit button", () {
      form.children.add(submitButton);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = presenter.showForm(formProxy);
      ButtonElement buttonEl = querySelector("button.submit-button");
      expect(buttonEl, isNotNull);
      expect(buttonEl.text, submitButton.name);
    });

    test("creates disabled checkbox", () {
      checkboxInput.disabled = true;
      form.children.add(checkboxInput);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = presenter.showForm(formProxy);
      CheckboxInputElement checkboxEl =
          querySelector("#${formProxy.children.first.id} input");
      expect(checkboxEl.disabled, true);
      expect((formProxy.children.first as PresenterCheckboxInput)
                .disabled, true);
      expect((formProxy.children.first as PresenterCheckboxInput)
          .uiElement.disabled, true);
    });

    test("creates hidden checkbox", () {
      checkboxInput.hidden = true;
      form.children.add(checkboxInput);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = presenter.showForm(formProxy);
      CheckboxInputElement checkboxEl =
          querySelector("#${formProxy.children.first.id} input");
      expect(checkboxEl.parent.classes.contains("display-none"), true);
      expect((formProxy.children.first as PresenterCheckboxInput)
                .hidden, true);
      expect((formProxy.children.first as PresenterCheckboxInput)
          .uiElement.hidden, true);
    });

    test("sends updated values", () {
      form.children.add(input1);
      form.children.add(input2);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = presenter.showForm(formProxy);
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
      form.submitText = ">>";
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = presenter.showForm(formProxy);
      ButtonElement submitButton = querySelectorAll("button.submit-main").last;
      stream.listen(expectAsync((CurrentState values) {
        expect(values.submitted, true, reason: "not submitted");
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
      Stream<CurrentState> stream = presenter.showForm(formProxy);

      RadioButtonInputElement freeTimeButton = querySelector(
          "#${formProxy.children[2].id} div.buttons input:nth-child(8)");
      expect(freeTimeButton.disabled, true);

      stream.listen(expectAsync((CurrentState values) {
        FormConfiguration changedConfig = form.receiveUserInput(values);
        presenter.updateForm(changedConfig);
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
      Stream<CurrentState> stream = presenter.showForm(formProxy);

      stream.listen(expectAsync((CurrentState values) {
        FormConfiguration changedConfig = form.receiveUserInput(values);
        presenter.updateForm(changedConfig);
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
      Stream<CurrentState> stream = presenter.showForm(formProxy);

      stream.listen(expectAsync((CurrentState values) {
        FormConfiguration changedConfig = form.receiveUserInput(values);
        presenter.updateForm(changedConfig);

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
      Stream<CurrentState> stream = presenter.showForm(formProxy);

      expect((formProxy.children.first as PresenterTextOutput).current,
          textOutput.html);
      /*expect((formProxy.children.first as PresenterTextOutput).uiElement.current,
          textOutput.html);*/

      stream.listen((CurrentState values) {
        FormConfiguration changedConfig = form.receiveUserInput(values);
        presenter.updateForm(changedConfig);

        ParagraphElement textOutputParagraph = querySelector(
            "#${formProxy.children.first.id} p");
        expect(textOutputParagraph.text, "You are currently 35 years old.");
      });

      // Select age = 35
      RadioButtonInputElement ageButton = querySelector(
          "#${formProxy.children.last.id} div.buttons input:nth-child(4)");
      ageButton.click();
    });

    test("creates form section", () {
      form.children.add(formSection1);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      presenter.showForm(formProxy);
      expect(querySelector("#${formProxy.children.first.id}"), isNotNull);
      expect(querySelector(".form-section"), isNotNull);
      ButtonElement buttonEl =
          querySelector("#${formProxy.children.first.id} button");
      expect((formProxy.children.first as PresenterFormSection).uiElement.current,
          formSection1.name);
      expect(buttonEl.text.contains(
          (formProxy.children.first as PresenterFormSection).uiElement.current),
          isTrue); // There is the ▽ character.
    });

    test("creates form section and tests opening/closing", () {
      ButtonElement buttonElFirst, buttonElSecond, buttonElThird;
      form.children.add(formSection1);
      form.children.add(formSection2);
      form.children.add(formSection3);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      presenter.showForm(formProxy);

      expect(formProxy.children.length, form.children.length);

      buttonElFirst =
          querySelector("#${formProxy.children[0].id} button");
      buttonElSecond =
          querySelector("#${formProxy.children[1].id} button");
      buttonElThird =
          querySelector("#${formProxy.children[2].id} button");
      expect(buttonElFirst, isNotNull);
      expect(buttonElSecond, isNotNull);
      expect(buttonElThird, isNotNull);

      buttonElFirst.click();
      var arrow = buttonElFirst.querySelector(".form-section-open-close");
      expect(arrow.text, "◁");
      arrow = buttonElSecond.querySelector(".form-section-open-close");
      expect(arrow.text, "▽");
      arrow = buttonElThird.querySelector(".form-section-open-close");
      expect(arrow.text, "▽");

      buttonElSecond.click();
      arrow = buttonElFirst.querySelector(".form-section-open-close");
      expect(arrow.text, "▽");
      arrow = buttonElSecond.querySelector(".form-section-open-close");
      expect(arrow.text, "◁");
      arrow = buttonElThird.querySelector(".form-section-open-close");
      expect(arrow.text, "▽");
    });

    test("creates MultipleChoice", () {
      MultipleChoiceInput moveChoice = new MultipleChoiceInput("Action", null);
      Option a = new Option("Zvolit A", null, selected: true);
      Option b = new Option("Zvolit B", null);
      moveChoice.children.addAll([a, b]);
      form.children.add(moveChoice);

      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      presenter.showForm(formProxy);

      DivElement divEl = querySelector("#${formProxy.children[0].id}");
      expect(divEl, isNotNull);

      OptionElement optionEl1 = divEl.querySelectorAll("option")[0];
      OptionElement optionEl2 = divEl.querySelectorAll("option")[1];
      SelectElement selectEl = divEl.querySelector("select");

      expect(querySelector(".multiple-choice-input"), isNotNull);
      expect(optionEl1.selected, isTrue);
      selectEl.value = optionEl2.value;
      selectEl.dispatchEvent(new Event("change"));
      expect(optionEl2.selected, isTrue);
    });

    test("Show simple dummy choices", () {
      EgbChoice choice1 = new EgbChoice("Yes");
      EgbChoice choice2 = new EgbChoice("No");
      EgbChoiceList choices = new EgbChoiceList.fromList(
          [choice1, choice2], "Is it cool?");
      presenter.showChoices(choices).then(expectAsync((_) {
        expect(querySelector(".choices-div"), isNotNull);
        expect(querySelector(".choices-div ol").children[0]
        .text.contains(choice1.string), isTrue);
      }));
    });

    test("Show simple choices with submenu", () {
      EgbChoice choice1 = new EgbChoice("Yes", submenu: "Yes submenu");
      EgbChoice choice2 = new EgbChoice("No", submenu: "No submenu");
      EgbChoiceList choices = new EgbChoiceList.fromList(
          [choice1, choice2], "Is it cool?");
      presenter.showChoices(choices).then(expectAsync((_) {
        expect(querySelector(".choices-submenus"), isNotNull);
        expect(querySelector(".choices-submenu-buttons").children.length,
            2); //2 submenus
        expect(querySelector(".choices-submenu-buttons").children[1].text,
            choice2.submenu);
      }));
    });

    test("Show simple choice with infochips", () {
      EgbChoice choice1 = new EgbChoice("Yes [infochip1] [infochip2]");
      EgbChoiceList choices = new EgbChoiceList.fromList(
          [choice1], "Is it cool?");
      presenter.showChoices(choices).then(expectAsync((_) {
        SpanElement chipsSpan = querySelector(".choice-infochips");
        expect(chipsSpan, isNotNull);
        expect(chipsSpan.children.length, 2); //2 infochips
        expect(chipsSpan.children[0].text, "infochip1");
      }));
    });
  });
}
