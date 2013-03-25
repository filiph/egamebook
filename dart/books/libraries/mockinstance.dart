library mock_instance;

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
  
  dynamic noSuchMethod(InvocationMirror invocation) {
    if (invocation.isGetter) {
      if (vars[invocation.memberName] == null) {
        vars[invocation.memberName] = new MockInstance();
      }      
      return vars[invocation.memberName];
    } else if (invocation.isSetter) {
      var memberName = invocation.memberName.replaceAll("=", ""); // fix bug in Dart that sets memberName to "variable=" when setter
      vars[memberName] = invocation.positionalArguments[0];
      return null;
    } else {
      throw new NoSuchMethodError(this, invocation.memberName,
          invocation.positionalArguments, invocation.namedArguments);
    }
  }
}
