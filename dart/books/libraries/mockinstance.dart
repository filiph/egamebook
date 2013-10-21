library mock_instance;
import 'dart:mirrors';

/**
 * A mock class for testing before any game logic is set up. When you create 
 * an instance of [MockInstance], you can then freely access random fields 
 * and methods of that instance: they will all exist (and be 
 * of type [MockInstance] by default). This is made possible through 
 * [:noSuchMethod:].
 * 
 * Example of use:
 * 
 *     var spaceship = new MockInstance();
 *     spaceship.speed = 15;  // valid without any additional code
 *     spaceship.speed++;     // also valid
 *     // You can also work with 'chains', like below.
 *     spaceship.hull.color = "red";
 *     
 * Later, you can implement class Spaceship that will actually do some work.
 */
class MockInstance {
  Map vars = new Map();
  
  dynamic noSuchMethod(Invocation invocation) {
    String memberName = MirrorSystem.getName(invocation.memberName);
    if (invocation.isGetter) {
      if (vars[memberName] == null) {
        vars[memberName] = new MockInstance();
      }      
      return vars[memberName];
    } else if (invocation.isSetter) {
      memberName = memberName.replaceAll("=", ""); // fix bug in Dart that sets memberName to "variable=" when setter
      vars[memberName] = invocation.positionalArguments[0];
      return null;
    } else if (memberName == "[]=") {
      vars[invocation.positionalArguments[0]] = 
          invocation.positionalArguments[1];
      return null;
    } else if (memberName == "[]") {
      if (vars[invocation.positionalArguments[0]] == null) {
        vars[invocation.positionalArguments[0]] = new MockInstance();
      }
      return vars[invocation.positionalArguments[0]];
    } else {
      throw new NoSuchMethodError(this, invocation.memberName,
          invocation.positionalArguments, 
          null //TODO: invocation.namedArguments
          );
    }
  }
}
