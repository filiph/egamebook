/// UI of the book. Egamebook UIs, be they CLI-based, web-based or Flutter-based
/// all need to subclass [Presenter].
import 'dart:async';

import 'package:edgehead/egamebook/book.dart';
import 'package:edgehead/egamebook/elements/elements.dart';
import 'package:meta/meta.dart';

abstract class Presenter<T extends Book> implements Sink<ElementBase> {
  @protected
  T book;

  final Completer<void> _bookEndCompleter = Completer<void>();

  StreamSubscription<ElementBase> _bookSubscription;

  /// Future completes when the underlying [book] ends, either with [WinGame]
  /// or with [LoseGame].
  ///
  /// After this future completes, the caller should call [close]. This will
  /// close both the [book] and this [Presenter]. Once this happens, there is
  /// no way to restart either. You have to create new ones.
  Future<void> get bookEnd => _bookEndCompleter.future;

  @protected
  @override
  void add(ElementBase element) {
    beforeElement();

    if (element is TextOutput) {
      addText(element);
      return;
    }

    if (element is WinGame) {
      addWin(element);
      _bookEndCompleter.complete();
      return;
    }

    if (element is LoseGame) {
      addLose(element);
      _bookEndCompleter.complete();
      return;
    }

    if (element is ChoiceBlock) {
      addChoiceBlock(element);
      return;
    }

    if (element is SlotMachine) {
      addSlotMachine(element);
      return;
    }

    if (element is SaveGame) {
      addSavegameBookmark(element);
      return;
    }

    if (element is ErrorElement) {
      addError(element);
      return;
    }

    addCustomElement(element);
  }

  @protected
  void addChoiceBlock(ChoiceBlock block);

  /// Implementor of a [Presenter] must make sure that any elements coming
  /// from the game are handled here.
  ///
  /// For example, stats updates, map updates, custom animations, etc.
  ///
  /// This method is annotated with [mustCallSuper] so that implementers never
  /// forget to raise an error when there is an element that this presenter
  /// cannot handle. Failing fast is much better than ignoring an entire
  /// class of book elements.
  @protected
  @mustCallSuper
  void addCustomElement(ElementBase element) {
    throw UnimplementedError("Unexpected type of element: $element");
  }

  @protected
  void addError(ErrorElement error);

  @protected
  void addLog(LogElement log);

  @protected
  void addLose(LoseGame loseGame);

  @protected
  void addSavegameBookmark(SaveGame savegame);

  @protected
  void addSlotMachine(SlotMachine machine);

  @protected
  void addText(TextOutput text);

  @protected
  void addWin(WinGame winGame);

  /// Called every time an element is added.
  void beforeElement();

  @override
  @mustCallSuper
  void close() {
    book.close();
    _bookSubscription.cancel();
  }

  @mustCallSuper
  Future<void> initialize(T book) {
    assert(this.book == null, "Cannot reuse Presenter several times.");
    this.book = book;
    _bookSubscription = book.elements.listen(add);
    return Future<void>.value();
  }

  void startBook() {
    assert(book != null, "Call and await initialize() first");
    book.start();
  }
}
