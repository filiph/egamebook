# Edgehead [![Build status](https://github.com/filiph/egamebook/actions/workflows/dart.yml/badge.svg)](https://github.com/filiph/egamebook/actions/workflows/dart.yml)

> "Skyrim, if it was Choose-Your-Own-Adventure, but still allowed the same
> freedom."

This is the main sub-project of the [egamebook][] project.

[egamebook]: https://egamebook.com

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
   * Use Dart 2 stable (which is the default as of August 2018).
2. Clone this repository (`git clone https://github.com/filiph/egamebook.git`)
   or download the 
   [zip file](https://github.com/filiph/egamebook/archive/master.zip) 
   containing it
3. Go to the repository's directory (`cd egamebook`)
4. Go to the `edgehead` sub-project (`cd edgehead`)
5. Install Dart packages (`pub get`)

Now you can try running tests (`dart run test`) or play the game on the command
line (`dart --enable-asserts bin/play.dart --log`).

### Playtesting

First of all, thank you. Even by just _thinking_ about helping this project
by playtesting means you genuinely want to see the game finished and successful,
and that means a lot to me.

If you want to play the web-based IFCOMP 2017 entry (Insignificant Little 
Vermin), [go here](https://egamebook.com/vermin). It will
give you an idea of what the interface of the final game will be like.
But, both UI-wise and gameplay-wise, it's only a prototype.

Since that IFCOMP version, I've implemented a lot of background functionality, 
like saving, easier authoring system, and richer world-simulation. 

To support these fundamental and frequent changes, I temporarily got rid of
the user interface. The current game only runs on command line. 
I want to find what's fun to do in the game before I build a new interface 
around it.

To playtest the current version of the game, install it
([see above](#installation)),
go to the `egamebook/edgehead` sub-directory, then run:

```bash
dart --enable-asserts bin/play.dart --log
```

You will be able to choose from options by using the arrow keys and hitting
`enter` or `space`.

![Animated screenshot of the CLI menu](https://raw.githubusercontent.com/filiph/cli_menu/master/example/mac_screencast.gif)

Output will be presented in raw Markdown text format, punctuated with
"UI" things like the slot machine (which, in text, looks rather
underwhelming, something like `[[ SLOT MACHINE 'Will you succeed?' 0.98 ]]`).

#### Debug cheat codes

Normally, if you choose an action that depends on chance,
the game will "throw dice" (use randomness). In the command line interface,
this happens in less than a millisecond, but it does happen.

You can force each option to either succeed or fail by using a key other
than the default `enter` or `space`. By navigating to your chosen 
option and pressing `s`, that action will succeed no matter how low your odds
are. By pressing `f`, that action will fail. (Mnemonic: `s` is for
success, `f` is for fail.) You will not see the `[[ SLOT MACHINE ... ]]`
output in either case.

Ultimately, you should default to playtesting *without* these cheats. 
If playing the game is only fun when you can force each action to succeed
or fail, then the game is broken. But the cheats are useful for predictably
getting yourself into an interesting situation, and for seeing "what happens". 

#### What to playtest

Right now, the focus is on making the combat system fun and interesting.
This means that, in the end of this development cycle, you as a player should:

1. Think that the combat is fair
2. Feel that you can do things that are your own idea (emergent gameplay)
3. Feel powerful

You should focus on the set combat piece(s) at the start of the game (the
choice says `Start one-on-one test fight with an orc`). Play and replay
this one fight - we want even simple fights like this to be interesting.
 
You can go and play Insignificant Little Vermin, but that's there mostly for
automated testing (we are fuzzy-testing that no change to the combat
system crashes the long-form adventure). When the combat system is improved,
we are going to rewrite the adventure to take advantage of it.

#### How to give feedback

Use [this Trello board](https://trello.com/b/6epMZ2JP/edgehead-own-work)
(you might need to get permission to edit it). Add a card to the "Playtest"
list.

If it's a feature request or general feedback, just write it as a new card.

If it's a bug report, please attach `edgehead.log` (which you'll find
in the game's root directory, and which gets rewritten every time you play) 
and at least the last page of the command
line output (screenshot, text file or copy-paste). You can attach files
to Trello cards by dragging and dropping them.

### Development flow

Run the following when developing:

    dart run build_runner watch --delete-conflicting-outputs
    
This will make sure that generated files (`*.g.dart`) are regenerated when
needed.

Most writing is in text files in the `assets/text/` directory. 
When the `dart run build_runner watch` watcher is running, it will, among other
things, watch for changes of the text files. It will compile the texts into the 
`lib/writers_input.compiled.dart` file, which is then used by the game itself.

It is sometimes possible to get the source generation in a bad state. This
might manifest in build failures such as:

    Error in BuiltValueGenerator for /edgehead/lib/edgehead_serializers.dart.
    Broken @SerializersFor annotation. Are all the types imported?

This is often caused by an earlier problem (for example, hitting save while
your `egb.txt` files are in some in-between state), which makes the source
generator build the files in the wrong order. The remedy is to run:

    dart run build_runner clean

After this, run the `dart run build_runner watch` command again and all should
be good. 

Most behavior and game-related code is in the other files in `lib/`. You
might want to start with `lib/edgehead_lib.dart`.  

To test, run `dart run test`, and to include long-running fuzzy tests,
run `dart run --enable-asserts test --run-skipped`.

#### Debug play-testing

If you use an IDE that lets you attach the debugger to a port, you might want
to run the playtest in regular console and attach to it. To do that, execute
this command:

    dart --enable-asserts --enable-vm-service:5858 --disable-service-auth-codes bin/play.dart

The port number is up to you. I use `5858` as a convention. The
`disable-service-auth-codes` flag makes your debug less safe (but way more
convenient).

Now, you can start the debug. For example, in IntelliJ editors, there's a run
configuration template called "Dart Remote Debug". You just need to set it
up for `localhost` and port `5858`.

Once both the executable and the debug are running, you can play as you normally
would in the terminal window, and attach breakpoints, see output and inspect
variables in the IDE.

### Testing

Run `dart run test` or setup your IDE for continuous unit testing.

Also included are long-running tests that are skipped by default. These
tests are "fuzzy" -- meaning that they will try to play the game randomly until
completion or error. 

Run all the tests, including the long-running ones, using this command:

    dart run --enable-asserts test --run-skipped
    
The `--enable-asserts` flag tells Dart to run assertions and generally be more 
fail-fast. It also makes the code run a few percent slower.

#### Overnight fuzzy-test

If you're feeling especially paranoid (e.g. before a production release), 
you can run the fuzzy test in an infinite loop with the following Unix command:

```bash
while dart run --enable-asserts test -t long-running --run-skipped; do :; done
```

The command will run forever unless a test fails or until you press `Ctrl-C`.

For slightly less paranoid times, there's always the option to run the
test suite several times in a row. Like this:

```bash
for n in {1..10}; do echo "=== Run number ${n} ==="; \
  dart run --enable-asserts test --run-skipped; done
```

#### Sharded testing

To run tests in parallel, you can use sharding:

```bash
$ dart run --enable-asserts test --total-shards 3 --shard-index 0 --run-skipped
$ dart run --enable-asserts test --total-shards 3 --shard-index 1 --run-skipped
$ dart run --enable-asserts test --total-shards 3 --shard-index 2 --run-skipped
```

### Playing on the command line

**Note:** As of August 2018, this is the only way to play the game. I have 
temporarily dropped all UI work while I focus on mechanics, authorship
tools, etc.

For a more hands-on approach, you can manually play on the command line.
This is not meant to be pretty, but it's faster than in the browser.
Run `dart bin/play.dart` if you just want to play. But consider using the
following command to also log progress and catch more bugs through checked mode:

    dart --enable-asserts bin/play.dart --log

The log is in `edgehead.log`. Remove `--log` for better performance.

Use up and down arrows to choose options, enter to select.

### Building new actions

_This section was in major need of rewrite, so I dropped it. At this point
your best bet is to look at how different combat actions are implemented
in `lib/src/fight/actions/`._

#### Playtesting actions

When you are ready to play-test your new action, run this command:

    dart --enable-asserts bin/play.dart --log --automated --action example
    
This will play automatically (randomly) until the player character reaches
a point in which he can choose an action which name includes `example`. Then,
the game switches to interactive mode.

This is a much faster way to get to your actions. The alternative is to play
towards that action manually, which takes much more time.

### Building new Situations

TBD

Don't forget to add your situation to `test/fractal_stories_test.dart`.

### Tuning AI

The NPC and enemy AI is a planner. If you run `bin/play.dart` with `--log`,
it will generate logs of all considered moves. You can use the `extract.sh`
tool to extract them and put them in a database:

```sh
./tool/ai/extract.sh edgehead.log
```

This will generate CSV and SQLite files in `tool/ai/`. You can open and
inspect them.

### Benchmarking

We have a rough, end-to-end benchmark. Run the following command and wait
for several minutes:

```sh
dart benchmark/full.dart
```

Alternatively, you can run the benchmark in AOT mode (closer to how it's going
to perform on a mobile platform):

```sh
dart2native benchmark/full.dart && ./benchmark/full.exe
```

Finally, if you want to hear a beep at the end, you can do:

``sh
dart2native benchmark/full.dart && ./benchmark/full.exe; tput bel
``

#### Results

| Commit  | Mean (s) | MoE (s) | N | Notes |
| ------- | -------: | ------: | ---: | :--- |
| f8617f53 Remove async from planner | 21.89 | 6.22 | 6 | |
| e11fe3f0 Avoid string interpolation ... | 14.91 | 0.17 | 21 | |
| bab88227 Decrease maxOrder of AI | 4.87 | 0.04 | 62 | |
| exploration: `while (await _update())` | 5.70 | 0.17 | 53 | |
| e60dfc88 Fix bug which led to ... | 4.71 | 0.04 | 64 | |
| 78cc8107 Actually fix ... | 9.73 | 0.26 | 31 | Increase of options. |
| 66f07c71 Run build | 8.29 | 0.05 | 37 | |
| 97e17d04 Use BuiltList | 5.05 | 0.02 | 60 | |
| d2b01ea5 Speed up hateTowards | 3.64 | 0.02 | 83 | |
| 2c36cb7e Avoid hateTowards bug | 2.17 | 0.01 | 139 | |
| 1a6d84ef Avoid logging removed actors | 2.14 | 0.01 | 140 | |
| 18b62ec0 Upgrade to latest dependencies | 1.69 | 0.00 | 178 | Still non-null-safe, running on a new M1 computer, on battery power |
| d427248f Finish migration | 1.22 | 0.00 | 247 | First commit after null safety, M1 on battery power |
