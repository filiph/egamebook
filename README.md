# Edgehead

> "Skyrim, if it was Choose-Your-Own-Adventure, but still allowed the same
> freedom."

## Development

Run the following when developing:

    dart -c tool/watch.dart
    
This will make sure that built_value files (`*.g.dart`) are regenerated when
needed. If you add a new built_value class, make sure it's covered by the
globs in `tool/phases.dart`.

### Testing

Run `pub run test` or setup your IDE for continuous unit testing.

Also included are long-running tests that are skipped by default. Some of these
tests are "fuzzy" -- meaning that they will try to play the game randomly until
completion or error. 

Run all the tests, including the long-running ones, using this command:

    pub run --checked test --run-skipped

### Playing on the command line

For a more hands-on approach, you can manually play on the command line.
This is not meant to be pretty, but it's faster than in the browser.
Run `dart bin/play.dart` if you just want to play. But consider using the
following command to also log progress and catch more bugs through checked mode:

    dart -c bin/play.dart --log

The log is in `edgehead.log`.

### Building new actions

All actions must extend `Action`. Actions meant for combat will probably
extend `EnemyTargetAction` instead. There are other subclasses that take an
object, like `ExitAction`.

For the action to be used, it must be made available to at least one 
`Situation`. If it's a simple action (not `EnemyTargetAction` etc.) you need to
– by convention – create a static member called `singleton`. Like this:

    class Example extends Action {
      static final Example singleton = new Example();
      // ...
    }

If, on the other hand, the action needs an object (like `EnemyTargetAction` 
does), then instead of a singleton you have to provide a builder. Like this:

    class Example2 extends EnemyTargetAction {
      // ...
      static EnemyTargetAction builder(Actor enemy) => new Example2(enemy);
    }

Once you have a singleton or a builder, you give it to situations like this:

    abstract class ExampleSituation extends Situation
        implements Built<ExampleSituation, ExampleSituationBuilder> {
      // ...
      @override
      List<EnemyTargetActionBuilder> get actionGenerators => [
            Example2.builder,
          ];
    
      @override
      List<Action> get actions => <Action>[Example.singleton];
    }

#### Playtesting actions

When you are ready to play-test your new action, run this command:

    dart -c bin/play.dart --log --automated --action example
    
This will play automatically (randomly) until the player character reaches
a point in which he can choose an action which name includes `example`. Then,
the game switches to interactive mode.

This is a much faster way to get to your actions. The alternative is to play
towards that action manually, which takes much more time.
