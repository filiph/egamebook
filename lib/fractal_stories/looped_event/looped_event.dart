import 'dart:async';

/**
 * LoopedEvent is any event that gets executed in a loop, waiting for
 * a) resolution and b) need of player input. It is intended for 'minigames'
 * inside the egamebook.
 *
 * Example: a hand-to-hand combat can be a LoopedEvent that takes fighters
 * and loops through 'rounds' (seconds?) of the fight.
 */

abstract class LoopedEvent /*TODO: implements Saveable ?*/ {
  LoopedEvent(this._echo, this._goto, this._choices, this.choiceFunction) {}

  final StringTakingVoidFunction _goto;
  final StringTakingVoidFunction _echo;
  final ChoiceFunction choiceFunction;
  final dynamic _choices;

  final StringBuffer _strbuf = new StringBuffer();
  void echo(String message) {
    _strbuf.write(message);
  }

  bool finished = false;

  /// The page to jump to when combat is finished.
  String onFinishedGoto;

  Future<Null> update();

  /**
   * Runs the update loop until user interaction is needed or until LoopedEvent
   * is finished.
   */
  Future<Null> run() async {
    if (onFinishedGoto == null)
      throw new StateError("Cannot run a LoopedEvent "
          "before onFinishedGoto is defined.");
    if (finished) {
      _choices.clear();
      _goto(onFinishedGoto);
      return;
    }

    while (!finished && _choices.isEmpty && _strbuf.isEmpty) {
      await update();
    }
    if (_strbuf.isNotEmpty) {
      _echo(_strbuf.toString());
      _strbuf.clear();
    }
  }
}

typedef void StringTakingVoidFunction(String arg);

/// Mock of the signature of `choice()` in EgbScripter.
typedef dynamic ChoiceFunction(String string,
    {String goto,
    Future<Null> script(),
    String submenu,
    bool deferToEndOfPage,
    bool deferToChoiceList});
