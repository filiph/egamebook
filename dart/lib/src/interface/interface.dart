library egb_interface;

import 'dart:async';
import 'dart:isolate';

import '../shared/user_interaction.dart';
import '../persistence/savegame.dart';

abstract class EgbInterface {
  ReceivePort _receivePort;
  SendPort _scripterPort;
  
  void setup();
  void close();

  /**
   * Displays the HTML-formated text.
   */
  Future<bool> showText(String text);
  
  /**
   * Interface gets choices, presents them to user. When user selects 
   * the choice, the returned Future completes with the selected choice's
   * hash.
   * 
   * This also displays the HTML-formated question, if it is set in ChoiceList. 
   * The question hould disappear after one of the choices is picked.
   * 
   * Completes with null when user wants to quit.
   */
  Future<int> showChoices(EgbChoiceList choices);
  
  /**
   * Marks the point at which the gameplay is saved. Interface should relay
   * the information to the player and make it possible to reload the position
   * later. (Communicated to the Runner via [stream].)
   */
  Future<bool> addSavegameBookmark(EgbSavegame savegame);
  
  /// Stream that sends player's interactions (apart from choice selection).
  /// These interactions include loading game states, starting a gamebook
  /// from scratch, etc.
  Stream<PlayerIntent> stream;
}
