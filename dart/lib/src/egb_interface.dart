library egb_interface;

import 'dart:isolate';
import 'egb_library.dart';

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
  Future<int> showChoices(ChoiceList choices);
}
