import 'dart:async';

import 'package:edgehead/egamebook/commands/commands.dart';
import 'package:edgehead/egamebook/elements/elements.dart';
import 'package:meta/meta.dart';
import 'package:slot_machine/result.dart' as slot;

abstract class Book {
  StreamController<ElementBase> _elementsController;

  /// The completer for [showChoices]. Should be `null` by default, and only
  /// `non-null` when there is a [ChoiceBlock] waiting for player input.
  Completer<Choice> _showChoicesCompleter;

  /// The completer for [showSlotMachine]. Should be `null` by default,
  /// and only `non-null` when there is a slot machine rolling or waiting
  /// for player input.
  Completer<slot.SessionResult> _showSlotMachineCompleter;

  /// Whether or not the book is waiting for a command from the player.
  /// If it isn't, commands arriving to the book will throw a runtime error.
  ///
  /// This is important because we don't want to allow the player to change
  /// the Book's state while it's working. For example, drinking a potion
  /// from the inventory should not be allowed _while_ a combat simulation
  /// is taking place. It should only be available when it's the player's turn.
  ///
  /// TODO: Instead of throwing, buffer the input and send it after we are
  /// waiting for input again.
  @protected
  bool isWaitingForInput = true;

  Book() : _elementsController = StreamController<ElementBase>();

  /// The build identifier. This should probably be autopopulated
  /// from the commit hash.
  String get buildId;

  Stream<ElementBase> get elements => _elementsController.stream;

  /// If you want to send custom book elements, use [elementsSink].
  ///
  /// Most [Book]s will use methods like [showChoices] which use
  /// [elementsSink] internally.
  ///
  /// If you opt into using the manual method, you also need to make sure
  /// to deal with custom [Command]s coming from the player.  For example,
  /// a fancy Map element could be sending a `MapZoom` command which you
  /// should deal with in [acceptCustom].
  @protected
  StreamSink<ElementBase> get elementsSink => _elementsController.sink;

  /// The version in semver form (e.g. "1.0.2").
  String get semver;

  /// A string uniquely identifying this egamebook.
  String get uid;

  /// Major player events are sent through this function. For example, player
  /// picking a [Choice] or requesting a game load.
  ///
  /// Custom events are redirected to [acceptCustom].
  void accept(CommandBase command) {
    assert(isWaitingForInput);

    if (command is PickChoice) {
      assert(_showChoicesCompleter != null);
      _showChoicesCompleter.complete(command.choice);
      _showChoicesCompleter = null;
      isWaitingForInput = false;
      return;
    }

    if (command is ResolveSlotMachine) {
      assert(_showSlotMachineCompleter != null);
      _showSlotMachineCompleter
          .complete(slot.SessionResult(command.result, command.wasRerolled));
      _showSlotMachineCompleter = null;
      isWaitingForInput = false;
      return;
    }

    // else
    acceptCustom(command);
  }

  /// Override this function when you expect custom commands from the user.
  ///
  /// Please make sure to update [isWaitingForInput]. If the command sets
  /// things in motion (as in, starts the simulation), you should set it
  /// to `false`. Otherwise, keep it `true`.
  @protected
  void acceptCustom(CommandBase command) {
    throw UnimplementedError();
  }

  /// Cleans up
  @mustCallSuper
  void close() {
    _elementsController.close();
  }

  /// Show a block of choices. This method returns with a [Future] of the
  /// picked [Choice].
  @protected
  Future<Choice> showChoices(ChoiceBlock choices) {
    assert(_showChoicesCompleter == null);
    _showChoicesCompleter = Completer<Choice>();
    _elementsController.add(choices);
    isWaitingForInput = true;
    return _showChoicesCompleter.future;
  }

  @protected
  Future<slot.SessionResult> showSlotMachine(
      double probability, String rollReason,
      {bool rerollable = false, String rerollEffectDescription}) {
    assert(_showSlotMachineCompleter == null);
    _showSlotMachineCompleter = Completer<slot.SessionResult>();
    _elementsController.add(SlotMachine((b) => b
      ..probability = probability
      ..rollReason = rollReason
      ..rerollable = rerollable
      ..rerollEffectDescription = rerollEffectDescription));
    isWaitingForInput = true;
    return _showSlotMachineCompleter.future;
  }

  /// Sets the book in motion. Either from the start, or from a saved position.
  void start();
}
