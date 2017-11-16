import 'dart:async';

import 'package:slot_machine/result.dart' as slot;

/// Mock of the signature of `choice()` in EgbScripter.
typedef dynamic ChoiceFunction(String string,
    {String goto,
    Future<Null> script(),
    String submenu,
    bool deferToEndOfPage,
    bool deferToChoiceList,
    String helpMessage});

typedef void StringTakingVoidFunction(String arg);

typedef Future<slot.SessionResult> SlotMachineShowFunction(
    double probability, String rollReason,
    {bool rerollable, String rerollEffectDescription});

/// LoopedEvent is any event that gets executed in a loop, waiting for
/// a) resolution and b) need of player input. It is intended for 'minigames'
/// inside the egamebook.
///
/// Example: a hand-to-hand combat can be a LoopedEvent that takes fighters
/// and loops through 'rounds' (seconds?) of the fight.
abstract class LoopedEvent /*TODO: implements Saveable ?*/ {
  final StringTakingVoidFunction _goto;

  final StringTakingVoidFunction _echo;
  final ChoiceFunction choiceFunction;
  final dynamic _choices;
  final SlotMachineShowFunction _slotMachineShowFunction;

  final StringBuffer _stringBuffer = new StringBuffer();

  bool finished = false;

  /// The page to jump to when combat is finished.
  String onFinishedGoto;

  LoopedEvent(this._echo, this._goto, this._choices, this.choiceFunction,
      this._slotMachineShowFunction);

  Future<slot.SessionResult> showSlotMachine(double probability, String rollReason,
      {bool rerollEnabled, String rerollEffectDescription}) {
    _pushStringBuffer();
    return _slotMachineShowFunction(probability, rollReason,
        rerollable: rerollEnabled,
        rerollEffectDescription: rerollEffectDescription);
  }

  /// Calls Scripter's echo() function with the accumulated StringBuffer.
  void _pushStringBuffer() {
    if (_stringBuffer.isNotEmpty) {
      _echo(_stringBuffer.toString());
      _stringBuffer.clear();
    }
  }

  void echo(Object message) {
    _stringBuffer.write(message);
  }

  /// Runs the update loop until user interaction is needed or until LoopedEvent
  /// is finished.
  Future<Null> run() async {
    if (onFinishedGoto == null)
      throw new StateError("Cannot run a LoopedEvent "
          "before onFinishedGoto is defined.");
    if (finished) {
      _choices.clear();
      _goto(onFinishedGoto);
      return;
    }

    while (!finished && _choices.isEmpty as bool && _stringBuffer.isEmpty) {
      await update();
    }

    _pushStringBuffer();
  }

  Future<Null> update();
}
