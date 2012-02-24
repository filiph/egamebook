#library('Scripter Implementation');

#import('../egb_library.dart');

class ScripterImpl extends Scripter {

  ScripterImpl() {
    instructions = [
      new PrintInstruction("First paragraph!"),
      new PrintInstruction("Second paragraph!")
    ];
    // super(); TODO: find out why this doesn't work
  }
}
