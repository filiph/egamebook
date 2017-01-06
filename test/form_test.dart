@TestOn("browser")
import 'package:test/test.dart';
import 'package:egamebook/src/shared/form.dart';
import 'package:egamebook/src/shared/user_interaction.dart';
import 'package:egamebook/src/shared/points_award.dart';
import 'package:egamebook/src/shared/stat.dart';
import 'package:egamebook/src/shared/message.dart';
import 'package:egamebook/src/presenter/form_proxy.dart';
import 'dart:convert';
import 'package:egamebook/presenters/html/html_presenter.dart';
import 'package:egamebook/src/persistence/storage.dart';
import 'package:egamebook/scripter.dart';
import 'dart:html'
    show
        window,
        DocumentFragment,
        HeadingElement,
        SpanElement,
        Event,
        ButtonElement,
        SelectElement,
        OptionElement,
        DivElement,
        CheckboxInputElement,
        ParagraphElement,
        RadioButtonInputElement,
        querySelector,
        querySelectorAll;
import 'dart:async';
import 'package:egamebook/src/book/scripter_proxy.dart';
import 'package:egamebook/src/persistence/savegame.dart';
import 'package:egamebook/runner.dart';
import 'package:egamebook/src/persistence/player_profile.dart';

class ScripterProxyStub extends ScripterProxy {
  @override
  Future init() {
    return new Future.value();
  }


  @override
  // ignore: strong_mode_invalid_method_override
  Presenter presenter;

  @override
  void load(Savegame savegame, [Set<String> playerChronology]) {}

  @override
  void quit() {}

  @override
  void restart() {}

  @override
  String get uid => "ProxyStubBOOK";
}

void main() {
  group("Basic setup", () {
    test(
        "defines the same builder closures for "
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

    setUp(() {
      form = new Form();
      input1 = new RangeInput("Age", (_) {},
          min: 20, max: 100, value: 30, step: 1, maxEnabled: 40);
      input2 = new RangeInput("Money", (_) {}, max: 1000, step: 100);
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
      var map = form.toMap();
      // print(JSON.encode(map));
      FormProxy formProxy = new FormProxy.fromMap(map);
      expect(formProxy.children.length, form.children.length);
      expect((form.children[0] as RangeBase).max,
          (formProxy.children[0] as RangeBase).max);
    });

    test("Elements get parents", () {
      form.children.add(input1);
      var map = form.toMap();
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
      var map = form.toMap();
      FormProxy formProxy = new FormProxy.fromMap(map);
      expect((formProxy.children.single as FormSection).disabled, true);
      expect(
          (formProxy.children.single.children.single as FormElement)
              .disabledOrInsideDisabledParent,
          true);
    });

    test("Options in MultipleChoice", () {
      multipleChoiceInput.children.add(option1);
      multipleChoiceInput.children.add(option2);
      multipleChoiceInput.children.add(option3);
      form.children.add(multipleChoiceInput);
      var map = form.toMap();
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
      var map = form.toMap();
      FormProxy formProxy = new FormProxy.fromMap(map);
      expect(
          (formProxy.children.single as FormElement).formElementChildren.length,
          multipleChoiceInput.children.length);
    });

    test("allFormElementsBelowThisOne for Form, MultipleChoice and Options",
        () {
      multipleChoiceInput.children.add(option1);
      multipleChoiceInput.children.add(option2);
      multipleChoiceInput.children.add(option3);
      form.children.add(multipleChoiceInput);
      var map = form.toMap();
      FormProxy formProxy = new FormProxy.fromMap(map);
      expect(
          (formProxy.children.single.parent as FormElement)
              .allFormElementsBelowThisOne
              .length,
          form.children.length + multipleChoiceInput.children.length);
    });

    test("Choice attributes", () {
      Choice choice =
          new Choice("Yes", submenu: "Yes submenu", goto: "Go to some place");
      expect(choice.isAutomatic, isFalse);
      expect(choice.isActionable(), isTrue);
    });

    test("Choice toMap and fromMap", () {
      Choice choice =
          new Choice("Yes", submenu: "Yes submenu", goto: "Go to some place");
      var choiceMap = choice.toMapForPresenter();
      Choice choiceFromMap = new Choice.fromMap(choiceMap);
      //expect(choice.goto, choiceFromMap.goto);
      expect(choice.string, choiceFromMap.string);
      expect(choice.submenu, choiceFromMap.submenu);
      expect(choice.toString(),
          startsWith("Choice: ${choice.string} [${choice.goto}]"));
    });

    test("Choice list", () {
      Choice choice1 = new Choice("Yes", submenu: "Yes submenu");
      Choice choice2 = new Choice("No", submenu: "No submenu");
      ChoiceList choices =
          new ChoiceList.fromList([choice1, choice2], "Is it cool?");
      expect(choices.length, 2);
      expect(choices[0], choice1);

      Choice choice3 = new Choice("Maybe", submenu: "Maybe submenu");
      choices.add(choice3);
      expect(choices.length, 3);
      expect(choices[2], choice3);

      String choice4String = "No comment";
      String choice4Submenu = "No comment submenu";
      choices.add(choice4String, submenu: choice4Submenu);
      expect(choices[3].string, choice4String);
      expect(choices[3].submenu, choice4Submenu);

      expect(() => choices.add(1), throwsA(new isInstanceOf<ArgumentError>()));
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
    int age;
    Presenter presenter;
    Store store;
    ScripterProxy scripterProxyStub;
    ButtonElement startButton, restartButton;

    setUp(() {
      form = new Form();
      input1 = new RangeInput("Age", (value) => age = value,
          min: 20,
          max: 100,
          value: 30,
          step: 5,
          minEnabled: 25,
          maxEnabled: 40);
      input2 = new RangeInput("Money", (_) {}, max: 1000, step: 100);
      input3 = new RangeInput("Free time", (_) {}, max: 10, maxEnabled: 5);
      submitButton = new SubmitButton("SUBMIT BUTTON", null,
          helpMessage: "Submit help message");
      formSection1 = new FormSection("My form section 1")..children.add(input1);
      formSection2 = new FormSection("My form section 2")..children.add(input2);
      formSection3 = new FormSection("My form section 3")..children.add(input3);

      startButton = querySelector("#start-button");
      restartButton = querySelector("#book-restart");

      InputCallback updateEnergyGauges = (_) {
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
      store = new MemoryStore();
      scripterProxyStub = new ScripterProxyStub();

      return runDirectly(scripterProxyStub, presenter, store);
    });

    tearDown(() {
      scripterProxyStub.quit();
      presenter.close();
      //      querySelector("#book-wrapper").children.clear();
    });

    final Duration DEFAULT_WAIT_FOR_DOM_UPDATE =
        new Duration(milliseconds: 200);
    test("tests start button", () {
      return new Future(expectAsync0(() {
        FormProxy formProxy = new FormProxy.fromMap(form.toMap());
        presenter.showForm(formProxy);

        expect(
            querySelector("div#book-title").style.display == "none", isFalse);
        expect(querySelector("div#big-bottom-button").style.display == "none",
            isFalse);

        startButton.click();

        return new Future.delayed(DEFAULT_WAIT_FOR_DOM_UPDATE, () {
          expect(
              querySelector("div#book-title").style.display == "none", isTrue);
          expect(querySelector("div#big-bottom-button").style.display == "none",
              isTrue);
        });
      }));
    });

    test("tests restart button", () {
      return new Future(expectAsync0(() {
        FormProxy formProxy = new FormProxy.fromMap(form.toMap());
        presenter.showForm(formProxy);

        restartButton.click();

        return new Future.delayed(DEFAULT_WAIT_FOR_DOM_UPDATE, () {
          expect(presenter.getTextHistory() == "", isTrue);
          expect(querySelector("div#book-wrapper").children.isEmpty, isTrue);
        });
      }));
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
      checkboxInput.onInput = (var value) => checked = value;
      form.children.add(checkboxInput);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = presenter.showForm(formProxy);
      CheckboxInputElement checkboxEl =
          querySelector("#${formProxy.children.first.id} input");
      expect(checkboxInput.current, false);
      stream.listen(expectAsync1((CurrentState values) {
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
      presenter.showForm(formProxy);
      ButtonElement buttonEl = querySelector("button.submit-button");
      expect(buttonEl, isNotNull);
      expect(buttonEl.text, submitButton.name);
    });

    test("creates disabled checkbox", () {
      checkboxInput.disabled = true;
      form.children.add(checkboxInput);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      presenter.showForm(formProxy);
      CheckboxInputElement checkboxEl =
          querySelector("#${formProxy.children.first.id} input");
      expect(checkboxEl.disabled, true);
      expect(
          (formProxy.children.first as PresenterCheckboxInput).disabled, true);
      expect(
          (formProxy.children.first as PresenterCheckboxInput)
              .uiElement
              .disabled,
          true);
    });

    test("creates hidden checkbox", () {
      checkboxInput.hidden = true;
      form.children.add(checkboxInput);
      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      presenter.showForm(formProxy);
      CheckboxInputElement checkboxEl =
          querySelector("#${formProxy.children.first.id} input");
      expect(checkboxEl.parent.classes.contains("display-none"), true);
      expect((formProxy.children.first as PresenterCheckboxInput).hidden, true);
      expect(
          (formProxy.children.first as PresenterCheckboxInput).uiElement.hidden,
          true);
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
      stream.listen(expectAsync1((CurrentState values) {
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
      stream.listen(expectAsync1((CurrentState values) {
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

      stream.listen(expectAsync1((CurrentState values) {
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
      var inputMoney = new RangeInput("Money", (_) {},
          stringifyFunction: (var value) => "\$$value", max: 1000, step: 100);
      var inputPercentage = new RangeInput("Thrust", (value) {},
          max: 100, step: 10, stringifyFunction: (var value) => "$value %");
      form.children.add(inputMoney);
      form.children.add(inputPercentage);

      FormProxy formProxy = new FormProxy.fromMap(form.toMap());
      Stream<CurrentState> stream = presenter.showForm(formProxy);

      stream.listen(expectAsync1((CurrentState values) {
        FormConfiguration changedConfig = form.receiveUserInput(values);
        presenter.updateForm(changedConfig);
        var percentageStringElement =
            querySelector("#${formProxy.children.last.id} p.current-value");
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

      stream.listen(expectAsync1((CurrentState values) {
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

        ParagraphElement textOutputParagraph =
            querySelector("#${formProxy.children.first.id} p");
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
      expect(
          (formProxy.children.first as PresenterFormSection).uiElement.current,
          formSection1.name);
      expect(
          buttonEl.text.contains(
              (formProxy.children.first as PresenterFormSection)
                  .uiElement
                  .current),
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

      buttonElFirst = querySelector("#${formProxy.children[0].id} button");
      buttonElSecond = querySelector("#${formProxy.children[1].id} button");
      buttonElThird = querySelector("#${formProxy.children[2].id} button");
      expect(buttonElFirst, isNotNull);
      expect(buttonElSecond, isNotNull);
      expect(buttonElThird, isNotNull);

      buttonElFirst.click();
      var arrow = buttonElFirst.querySelector(".form-section-open-close");
      expect(arrow.text, new DocumentFragment.html("&#9665;").text);
      arrow = buttonElSecond.querySelector(".form-section-open-close");
      expect(arrow.text, new DocumentFragment.html("&#9661;").text);
      arrow = buttonElThird.querySelector(".form-section-open-close");
      expect(arrow.text, new DocumentFragment.html("&#9661;").text);

      buttonElSecond.click();
      arrow = buttonElFirst.querySelector(".form-section-open-close");
      expect(arrow.text, new DocumentFragment.html("&#9661;").text);
      arrow = buttonElSecond.querySelector(".form-section-open-close");
      expect(arrow.text, new DocumentFragment.html("&#9665;").text);
      arrow = buttonElThird.querySelector(".form-section-open-close");
      expect(arrow.text, new DocumentFragment.html("&#9661;").text);
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

    test("Show simple dummy choices", () async {
      Choice choice1 = new Choice("Yes");
      Choice choice2 = new Choice("No");
      ChoiceList choices =
          new ChoiceList.fromList([choice1, choice2], "Is it cool?");
      presenter.showChoices(choices);

      expect(querySelector(".choices-div"), isNotNull);
      expect(
          querySelector(".choices-div ol")
              .children[0]
              .text
              .contains(choice1.string),
          isTrue);

      ButtonElement buttonEl = querySelectorAll(".choices-div ol button")[0];
      buttonEl.click();

      expect(buttonEl.classes.contains("chosen"), isTrue);
      expect(querySelector(".choices-div").classes.contains("chosen"), isTrue);
      expect(buttonEl.disabled, isTrue);
    });

    test("Show simple choices with submenu", () async {
      Choice choice1 = new Choice("Yes", submenu: "Yes submenu");
      Choice choice2 = new Choice("No", submenu: "No submenu");
      ChoiceList choices =
          new ChoiceList.fromList([choice1, choice2], "Is it cool?");
      presenter.showChoices(choices);

      expect(querySelector(".choices-submenus"), isNotNull);
      expect(querySelector(".choices-submenu-buttons").children.length,
          2); //2 submenus
      expect(querySelector(".choices-submenu-buttons").children[1].text,
          choice2.submenu);
      expect(
          querySelectorAll(".choices-submenu-buttons .submenu-button").length,
          2);

      ButtonElement buttonEl =
          querySelectorAll(".choices-submenu-buttons .submenu-button")[1];
      bool isNotDisplayed = querySelectorAll(".choices-submenus .choices-ol")[1]
          .classes
          .contains("display-none");
      bool isDepresed = buttonEl.classes.contains("depressed");
      buttonEl.click();

      expect(
          querySelectorAll(".choices-submenus .choices-ol")[1]
              .classes
              .contains("display-none"),
          !isNotDisplayed); // class toggled
      expect(
          buttonEl.classes.contains("depressed"), !isDepresed); // class toggled
    });

    test("Show simple choice with infochips", () async {
      Choice choice1 = new Choice("Yes [infochip1] [infochip2]");
      ChoiceList choices = new ChoiceList.fromList([choice1], "Is it cool?");
      presenter.showChoices(choices);
      SpanElement chipsSpan = querySelector(".choice-infochips");
      expect(chipsSpan, isNotNull);
      expect(chipsSpan.children.length, 2); //2 infochips
      expect(chipsSpan.children[0].text, "infochip1");
    });

    test("Show text", () {
      String text = "This is some funny text";
      presenter.showText(text).then(expectAsync1((_) {
        expect(querySelectorAll("p").any((el) => el.text == text), isTrue);
      }));
    });

    test("Award points with zero addition", () {
      SpanElement pointsSpan = querySelector("span#points-value");
      PointsAward pointsAward = new PointsAward(0, 10, "for bravery");
      expect(pointsSpan.text.contains("${pointsAward.result}"), isFalse);

      presenter.awardPoints(pointsAward).then(expectAsync1((_) {
        expect(pointsSpan.text.contains("${pointsAward.result}"), isTrue);
      }));
    });

    test("Award points with addition", () {
      PointsAward pointsAward = new PointsAward(10, 20, "for bravery");

      presenter.awardPoints(pointsAward).then(expectAsync1((_) {
        ParagraphElement pointsParagraph = querySelectorAll("p.toast").last;
        expect(pointsParagraph, isNotNull);
        expect(pointsParagraph.text, pointsAward.toString());
      }));
    });

    test("Award points with addition and no justification message", () {
      PointsAward pointsAward = new PointsAward(1, 21);

      presenter.awardPoints(pointsAward).then(expectAsync1((_) {
        ParagraphElement pointsParagraph = querySelectorAll("p.toast").last;
        expect(pointsParagraph.text, pointsAward.toString());
        expect(pointsParagraph.text, "Score +${pointsAward.addition}.");
      }));
    });

    test("Set stats", () {
      UIStat stat1 = new UIStat("energy", "Description of energy stat",
          "#ff00ff", 1, true, false, "10");
      UIStat stat2 = new UIStat("bravery", "Description of bravery stat",
          "#ffff00", 2, false, false, "50");
      var uiStats = [stat1, stat2];

      presenter.setStats(uiStats).then(expectAsync1((_) {
        DivElement statsDiv = querySelector("nav div#stats");
        List statsButtons = statsDiv.querySelectorAll("button");
        expect(statsButtons.length, uiStats.length);
        expect(statsButtons[0].text, uiStats[0].string);
        expect(statsButtons[1].classes.contains("display-none"), isTrue);
        expect(statsButtons[0].querySelector("span"), isNotNull);
      }));
    });

    test("Show dialog with default button", () {
      Dialog dialog = new Dialog("Dialogs title", "Some text");

      (presenter as HtmlPresenter).showDialog(dialog);

      DivElement dialogDiv = querySelectorAll(".dialog").last;
      DivElement overlayDiv = querySelectorAll(".overlay").last;
      expect(dialogDiv, isNotNull);
      expect(overlayDiv, isNotNull);
      expect(dialogDiv.childNodes.indexOf(overlayDiv), isNonNegative);
      HeadingElement titleHeading = dialogDiv.querySelector("h3");
      expect(titleHeading, isNotNull);
      expect(titleHeading.text, dialog.title);
      expect(
          dialogDiv.querySelector(".dialog-content > div").text, dialog.html);
      ButtonElement button = dialogDiv.querySelector("button");
      expect(button, isNotNull);
      expect(button.text, "Close");
    });

    test("Show dialog with html and custom button with behaviour", () {
      ClickBehaviour behaviour = () {
        print("Hello from Hello dialog");
        return false;
      };
      DialogButton dialogButton = new DialogButton("Say Hello", behaviour);
      Dialog dialog = new Dialog("Hello dialog",
          "<p class='extra-text'>Some hello text</p>", [dialogButton]);

      (presenter as HtmlPresenter).showDialog(dialog);

      DivElement dialogDiv = querySelectorAll(".dialog").last;
      expect(dialogDiv, isNotNull);
      expect(
          dialogDiv.querySelector(".dialog-content > div > p.extra-text").text,
          "Some hello text");
      ButtonElement button = dialogDiv.querySelector("button");
      expect(button.text, dialogButton.label);
      button.click();
    });

    test("Show error dialog", () {
      String title = "Error";
      String text = "You made a mistake!";

      (presenter as HtmlPresenter).reportError(title, text);
      DivElement dialogDiv = querySelectorAll(".dialog").last;
      expect(dialogDiv, isNotNull);
      HeadingElement titleHeading = dialogDiv.querySelector("h3");
      expect(titleHeading, isNotNull);
      expect(titleHeading.text, title);
      expect(dialogDiv.querySelector(".dialog-content > div > p").text, text);
      ButtonElement button = dialogDiv.querySelector("button");
      expect(button, isNotNull);
      expect(button.text, "Close");
    });
  });

  group("HtmlPresenter Savegame", () {
    Presenter presenter;
    Store store;
    ScripterProxy scripterProxyStub;
    Savegame savegame;
    var vars;
    var pageMapState;

    setUp(() {
      vars = new Map<String, Object>();
      vars["points"] = new PointsCounter()..add(20, "for bravery");
      vars["isEngineer"] = false;
      vars["isStrong"] = false;

      pageMapState = new Map<String, dynamic>();
      pageMapState["Start"] = {"visitCount": 0};
      pageMapState["Start: Funeral"] = {"visitCount": 10};

      savegame = new Savegame("Start", vars, pageMapState);

      presenter = new HtmlPresenter();
      store = new LocalStorageStore();
      scripterProxyStub = new ScripterProxyStub();

      return runDirectly(scripterProxyStub, presenter, store);
    });

    tearDown(() {
      //clear all
      window.localStorage.clear();
    });

    test("Save", () {
      presenter.showText("Some saving text").then(expectAsync1((_) {
        expect(presenter.getTextHistory().isEmpty,
            isFalse); //contains "Some testing text"
        presenter.save(savegame);
        expect(presenter.getTextHistory().isEmpty, isTrue);
        String playerUid = presenter.playerProfile.playerUid;
        String currentEgamebookUid =
            presenter.playerProfile.currentEgamebookUid;

        // savegame is in localstorage
        String storedSavegame =
            "$playerUid::$currentEgamebookUid::${savegame.uid}";
        expect(window.localStorage[storedSavegame], isNotNull);
        print(window.localStorage[storedSavegame]);
        expect(JSON.decode(window.localStorage[storedSavegame])["vars"],
            isNotNull);
        expect(
            JSON.decode(window.localStorage[storedSavegame])["vars"]["points"],
            isNotNull);

        // chronology is in localstorage
        String storedChronology =
            "$playerUid::$currentEgamebookUid::_storyChronology";
        expect(window.localStorage[storedChronology], isNotNull);
        expect(JSON.decode(window.localStorage[storedChronology]),
            presenter.playerProfile.storyChronology);
      }));
    });
  });

  group("Local storage store", () {
    Presenter presenter;
    Store store;
    ScripterProxy scripterProxyStub;
    String STORE_NAME = "default::ProxyStubBOOK::1234567";
    Map values = {"uid": "1234567", "currentPageName": "Start"};

    setUp(() {
      presenter = new HtmlPresenter();
      store = new LocalStorageStore();
      scripterProxyStub = new ScripterProxyStub();

      return runDirectly(scripterProxyStub, presenter, store);
    });

    tearDown(() {
      //clear all
      window.localStorage.clear();
    });

    test("Save", () {
      store.save(STORE_NAME, JSON.encode(values)).then(expectAsync1((value) {
        expect(value, isTrue);

        // We use HTML local storage implementation to retrieve value
        String valuesFromStore = window.localStorage[STORE_NAME];
        expect(valuesFromStore, isNotNull);
        expect(JSON.decode(valuesFromStore), values);
      }));
    });

    test("Save and load", () {
      store.save(STORE_NAME, JSON.encode(values)).then(expectAsync1((value) {
        store.load(STORE_NAME).then(expectAsync1((valueFromStore) {
          expect(valueFromStore, isNotNull);
          expect(JSON.decode(valueFromStore), values);
        }));
      }));
    });

    test("Delete", () {
      store.save(STORE_NAME, JSON.encode(values)).then(expectAsync1((value) {
        store.delete(STORE_NAME).then(expectAsync1((boolValue) {
          expect(boolValue, isTrue);
          expect(window.localStorage[STORE_NAME], isNull);
        }));
      }));
    });

    test("Get default player profile", () {
      PlayerProfile profile = store.getDefaultPlayerProfile();
      expect(profile, isNotNull);
      expect(profile.playerUid, Store.DEFAULT_PLAYER_UID);
    });
  });

  // Maybe will be moved to presenter_proxy test.
  group("Other", () {
    test("Award points toMessage", () {
      PointsAward pointsAward = new PointsAward(10, 20, "for bravery");
      Message message = pointsAward.toMessage();
      expect(message, isNotNull);
      expect(message.type, Message.POINTS_AWARD);
      expect(message.listContent, isNotNull);
      expect(message.listContent[0], pointsAward.addition);
      expect(message.listContent[1], pointsAward.result);
      expect(message.strContent, pointsAward.justification);
    });

    test("Award points fromMessage", () {
      var map = {
        "listContent": [10, 20],
        "strContent": "for bravery"
      };
      Message message = new Message.fromMap(map);
      expect(message, isNotNull);
      expect(message.listContent, isNotNull);
      expect(message.listContent[0], (map["listContent"] as List)[0]);
      expect(message.listContent[1], (map["listContent"] as List)[1]);
      expect(message.strContent, map["strContent"]);

      PointsAward pointsAward = new PointsAward.fromMessage(message);
      expect(pointsAward, isNotNull);
      expect(pointsAward.addition, message.listContent[0]);
      expect(pointsAward.result, message.listContent[1]);
      expect(pointsAward.justification, message.strContent);
    });

    test("Choice list toMessage", () {
      Choice choice1 = new Choice("Yes", submenu: "Yes submenu");
      Choice choice2 = new Choice("No", submenu: "No submenu");
      ChoiceList choices =
          new ChoiceList.fromList([choice1, choice2], "Is it cool?");
      Message message = choices.toMessage();
      expect(message, isNotNull);
      expect(message.type, Message.SHOW_CHOICES);
      expect(message.listContent[0], isNull); //prepend text
      expect(message.listContent[1], choices.question);
      expect(message.listContent[2], choice1.toMapForPresenter());
      expect(message.listContent[3], choice2.toMapForPresenter());
    });

    test("Choice list toMessage throws with filterOut", () {
      String text = "Some text";
      Choice choice1 = new Choice("Yes", submenu: "Yes submenu");
      Choice choice2 = new Choice("No", submenu: "No submenu");
      ChoiceList choices =
          new ChoiceList.fromList([choice1, choice2], "Is it cool?");
      expect(
          () =>
              choices.toMessage(prependText: text, filterOut: (choice) => true),
          throws);
    });

    test("Choice list fromMessage", () {
      Choice choice1 = new Choice("Yes", submenu: "Yes submenu");
      Choice choice2 = new Choice("No", submenu: "No submenu");
      String question = "Is it cool?";
      var map = {
        "listContent": [
          null,
          question,
          choice1.toMapForPresenter(),
          choice2.toMapForPresenter()
        ],
      };
      Message message = new Message.fromMap(map);
      expect(message, isNotNull);
      expect(message.listContent, isNotNull);
      expect(message.listContent.length, 4);

      ChoiceList choices = new ChoiceList.fromMessage(message);
      expect(choices, isNotNull);
      expect(choices.question, question);
      expect(choices.length, 2);
      expect(choices[0].string, choice1.string);
      expect(choices[0].hash, choice1.hash);
      expect(choices[1].string, choice2.string);
      expect(choices[1].hash, choice2.hash);
    });

    test("Choice list fromMessage throws with no listContent", () {
      var map = <String, Object>{};
      Message message = new Message.fromMap(map);
      expect(message, isNotNull);
      expect(message.listContent, isNull);

      expect(() => new ChoiceList.fromMessage(message), throws);
    });

    test("Choice toMapForPresenter", () {
      Choice choice = new Choice("Yes", submenu: "Yes submenu");
      Map map = choice.toMapForPresenter();
      expect(map, isNotNull);
      expect(map.length, 3);
      expect(map["string"], choice.string);
      expect(map["hash"], choice.hash);
      expect(map["submenu"], choice.submenu);
    });
  });
}
