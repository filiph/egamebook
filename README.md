# Edgehead <a href="https://travis-ci.org/filiph/edgehead"><img src="https://travis-ci.org/filiph/edgehead.svg?branch=master"></a>

> "Skyrim, if it was Choose-Your-Own-Adventure, but still allowed the same
> freedom."

## Architecture

(This section is a stub. Some aspects of the design are better explained
at [medium.com/@filiph](http://medium.com/@filiph).)

Here are the pillars of the design:

* At any moment, we're in a `Situation`. Situations define who can act,
  whose turn it is, and what `Action`s are available. Example: combat situation,
  conversation, dodging a slash.
* `Action`s are the only things that can change the state of the world.
* `Actor`s are the entities that are active in the world, and who can perform
  `Action`s. Player is one of them,
  but NPCs and monsters are also actors. More esoteric actors can also exist,
  like a Director (who stealthily changes the world so that the player's
  experience is as fun/interesting as possible).
* `WorldState` is the state of the world at any moment in time. It is 
  an immutable object, and completely serializable.
* An important part of `WorldState` are the different histories. Instead of
  putting state into variables that change during play, we often just create
  a record that something happened, which we can later recall.
* `Planner` figures out what are the best actions to take next. This is the
  AI that drives all NPCs, but it doubles as the system that shows only the
  best choices to the player (instead of showing all choices).
* History is where much of the game's states resides

Most of the classes mentioned above are located at `lib/fractal_stories`.

Here are some additional "philosophical" pillars:

* Make it as easy as possible for writers to write stories / quests / actions, 
  but don't sacrifice flexibility. This is not a system for writers
  non-programmers, this is a system for small indie game development teams.
* Source generation over magic. Even writer's input is all transformed into
  code that you can inspect and debug.
* Use fractal design. In one game, the player should be able to make strategic
  choices (e.g. move to a different state, marry, invade Poland) _and_ 
  micro-choices (e.g. duck the punch, feint swing), and everything in between.

## Development

### Installation

1. [Install Dart](https://www.dartlang.org/install)
   * As of March 2018, Dart 2 is not supported. See discussion
     [here](https://github.com/filiph/edgehead/issues/13#issuecomment-375698672).
2. Clone this repository (`git clone https://github.com/filiph/edgehead.git`)
   or download the zip file containing it
3. Go to the repository's directory (`cd edgehead`)
4. Install Dart packages (`pub get`)

Now you can try running tests (`pub run test`) or play the game on the command
line (`dart bin/play.dart`).

### Development flow

Run the following when developing:

    dart -c tool/watch.dart
    
This will make sure that generated files (`*.g.dart`) are regenerated when
needed. If you add a new built_value class, make sure it's covered by the
globs in `tool/phases.dart`.

Most writing is in text files in the `assets/text/` directory. 
When the `tool/watch.dart` watcher is running, it will, among other things,
watch for changes of the text files. It will compile the texts into the 
`lib/writers_input.g.dart` file, which is then used by the game itself.

Most behavior and game-related code is in the other files in `lib/`. You
might want to start with `lib/edgehead_lib.dart`.  

To test, run `pub run test`, and to include long-running fuzzy tests,
run `pub run -c test --run-skipped`.

### Deployment

#### To github pages (`gh-pages`)

A one-line command that tests and then, if those are successful, immediately 
publishes the bleeding edge version to github.io can look something like
`pub run -c test --run-skipped && peanut && git push origin --set-upstream gh-pages`.

#### To official site (egamebook.com/vermin)

There is a shorthand for uploading the current version to 
[https://egamebook.com/vermin](https://egamebook.com/vermin). First, ensure
everything is built  (`egamebook build`, `dart tool/build.dart`, then
`pub build`). Second, make sure the current version runs well 
(`pub run -c test --run-skipped`). 
Third, run `./build_ifcomp_submission.sh` to copy the build over to 
`../egamebook/docs/site` (this assumes `egamebook` directory is a sibling
to `edgehead`). Fourth, go to `../egamebook/docs/site` and run `make clean`
and `make deploy`.

### Testing

Run `pub run test` or setup your IDE for continuous unit testing.

Also included are long-running tests that are skipped by default. These
tests are "fuzzy" -- meaning that they will try to play the game randomly until
completion or error. 

Run all the tests, including the long-running ones, using this command:

    pub run --checked test --run-skipped
    
The `--checked` flag tells Dart to run assertions and generally be more 
fail-fast. It also makes the code run a few percent slower.

### Playing on the command line

**Note:** As of March 2018, this is the only way to play the game. I have 
temporarily dropped all UI work while I focus on mechanics, authorship
tools, etc.

For a more hands-on approach, you can manually play on the command line.
This is not meant to be pretty, but it's faster than in the browser.
Run `dart bin/play.dart` if you just want to play. But consider using the
following command to also log progress and catch more bugs through checked mode:

    dart -c bin/play.dart --log

The log is in `edgehead.log`.

Use up and down arrow to choose options, enter to select.

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

### Building new Situations

TBD

Don't forget to add your situation to `test/fractal_stories_test.dart`.
