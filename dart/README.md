# egamebook

A system which automatically creates playable electronic gamebooks from .egb files.

## Quick Start

Or how to be a published interactive fiction writer in 8 easy steps!

Note: This is **not** implemented yet. It's a vision.

1.  Download Dart Editor and install it.
2.  On the command line, run `pub global activate egamebook`.
3.  Create a folder (`mkdir mybook`).
4.  Inside that folder (`cd mybook`), run `pub global run egamebook:create`. This will create a project scaffold that you can edit.
5.  Run `pub global run egamebook:watch`. This will watch the current directory for changes and will re-build the project any time you change anything.
6.  Edit the `.egb` file. This is the main source of your book.
7.  Open `build/index.html` in your favorite browser to test the egamebook in action.

<!-- The following is currently on hold, but most of the code is done.

### Graphing your egamebook

TODO: IMPLEMENT

Also included with the quick_start project is a GraphML file. GraphML is editable in 
the free, cross-platform [yEd](http://www.yworks.com/en/products_yed_about.html) 
editor. In this way, you have a much more visual way of designing the
flow of your egamebook.

IMAGE

Every time you run `compile.sh`, the .graphml file is updated for you. It's also
possible to run `update_to_graphml.sh` if you want to do just that.
(You may want to use the *Layout > Hierarchical* function in yEd after doing so
for a nicer looking layout. Just click OK on the modal window.)

IMAGE

Add new nodes and groups, link between them, change their names. When you're
happy with the new flow, save the file in yEd and run `update_from_graphml.sh`.
Your .egb file will be updated with the new pages and choices.

-->

## egb file format

The .egb (read: _egg_) file is the main source of your egamebook. A basic one can look like this:

    ---
    start

    You are in a room full of spiders. The spiders look annoyed.

    - Squash the spiders [squash]
    - Run! [run]

    ---
    squash

    You try to squash the spiders, but there's too many of them. Oh god,
    they're eating your face off now!

    ---
    run

    You managed to get out of the room before the spiders got to you, 
    but now you're in a room full of giant worms.

This will create an egamebook that starts in the first room (conveniently named _start_ in this case) and gives the player two choices. These lead to the other two sections: _squash_ and _run_. Both these sections don't contain any choices, so they're the end of this 'book'.

### A more practical example

Let's go through some more complex examples while showing advanced features. Please don't take this as the canonical way to write egamebooks. This is mostly to teach you the basics without having to deal with the advanced stuff.

    Title:      Test Gamebook #1  
    Subtitle:   The Adventures of a Guy with a Gun  
    Author:     Filip Hracek
                John Doe  
    Web:        http://filiph.net/  
    Email:      abc@example.com  
    Keywords:   crimi, thriller  
    Copyright:  Creative Commons
    Version:    1.0.2

    ---
    Day1.WakeUp
    
    You wake up and quickly realize the house is surrounded by the police. "Oh Rick," you sigh. "You backstabbing idiot." 

    You have a minute at most before the pigs kick the door in.
    
    <script>
      time = 0;
    </script>

    - [wakeupDilemma]

    ---
    Day1.wakeupDilemma

    <script>
      if (time >= 45) {
        goto("policeBreakIn");
      } else if (time >= 30) {
        <echo>
    You hear major commotion outside. They must be getting ready.
        </echo>
      }
    </script>

    It is $time seconds since you woke up.

    What do you do?
    - Get dressed (30 seconds) [getDressed]
    - Get the gun (15 seconds) [getGun]
    - Warn Amy by phone (30 seconds) [warnAmy]

    ---
    Day1.getDressed
    [[ visitOnce ]]

    You quickly grab the clothes that you left on the bedside table and you get dressed. You actually manage to do it in 20 seconds in spite of being nervous as hell.

    <script>
      time += 20;
    </script>

    - [wakeupDilemma]

    ---
    Day1.getGun
    [[ visitOnce ]]

    You dive under the bed and your hand almost immediately finds the old-fashioned revolver that's been taped there for some time now. You check it -- it's loaded and apparently working.

    <script>
      weapon = "gun";
      time += 15;
    </script>

    - [wakeupDilemma]

    ---
    Day1.warnAmy
    [[ visitOnce ]]

    You grab the phone and speed-dial number one. It takes ages for her to pick up, and when she does, she's sleepy and slow.

    "Wha' uppp?"

    "Hey baby," you start quickly, "I have pigs outside. Rick must have talked. Go. Go somewhere safe. Somewhere I wouldn't know."

    "What?"

    You hang up, hoping she got all that. You know you can't lose any more time now.

    <script>
      time += 30;
    </script>

    - [wakeupDilemma]

    ---
    policeBreakIn

    There's a sudden, loud crash _right in the room_ and a man in black overall jumps through the window, like some sort of a freaking ninja. Everything slows down. He's holding a gun and starts turning it towards you.

    <script>
      if (weapon == "gun") {
        <echo>
    You react instinctively. There's a loud gunshot and the man falls to the ground. You shot him in the stomach and you know he's wearing an armor, but the sheer shock and power of the impact will incapacitate this guy for some time.

    - [runOutTheWindow]
        </echo>
      } else {
        <echo>
    You realize you don't have the gun yet, so you instinctively move towards the bed (to which it's taped from below). Though the policeman can't know what you're after, he acts as instinctively as you do -- he shoots you in the right clavicle area. You fall to the ground, screaming with pain.

    - [wasted]
        </echo>
      }
    </script>

    ---
    Day1.runOutTheWindow

    You jump through the window, catch hold of some branches of the backyard tree and fall down on the grass with a thump. You hear "Shit!" from the side, so you send a blind shot there, and start running towards the white fence. The adventure begins.

    - [theAdventureBegins]
  
    ---
    wasted

    For the next few hours and days, you just see blurs and colors and you dream nightmares of Amy and the bastard son of yours.

    When you finally come to your senses, you're in prison. And you won't be getting out alive.

## Advanced uses

### Advanced choices

The basic format of a choice is this:

    - Go inside the house [insideHouse]

But there are other things you can do.

#### Scripts

You can also include **inline scripts** in the choices. These scripts will be executed when the player picks the choice. Mostly, they're very basic.

    - Pick the gun [{weapon = "gun";}]
    - Pick the machette [{weapon = "machette";}]

The above example will let the player choose his weapon, and then it will continue with the page. You can also combine a script with the name of the desired page to go to.

    - Pick up the newspaper and go inside the house [{newspaper = true}, insideHouse]
    - Just go inside the house [insideHouse]

Lastly, you can have **empty choices** that do nothing. It's for when you want to give the player some useless choices that don't have any consequences on later gameplay, or when you want to have the choice to _not_ do something.

    - Pick up the shovel [{hasShovel = true;}]
    - Leave it alone [{}]
    
You probably don't want to use an empty choice at the end of a page, unless you want that to be the last choice the player takes (with no feedback).

#### Simple text results

Sometimes, you want to have a choice inside the page that just shows some text and you don't want to use something like `[{echo("blah blah")}]` nor do you want to create separate pages for the given options. For these cases, we have this:

    - Enter through the doorway [
        You walk through the doorway and enter the living room. 
        Nobody's here.
      {}]
    - Enter through the window [
        You stealthily crawl down the porch and make it into the 
        living room through the window. It turns out nobody's 
        here, so your spy move was wasted.
      {}]

Note the indentation of the text inside the choice and the `{}]` at the end. Also note you can use the `{}` to include a script with the choice.

The above is identical to the following:

    - Enter through the doorway [{echo("You walk through the doorway...");}]
    - Enter through the window [{echo("You stealthily crawl down the...");}]

#### Questions

When you have a line of text directly preceding a set of questions, that line of text becomes a 'question'. These questions can be highlighted by the user interface.

    Where do you want to go now?
    - Inside the house [insideHouse]
    - To the backyard [backyard]

Having questions like these is very common in traditional (paper) gamebooks. In egamebooks, this can be safely skipped.

#### Silent choices (Forwarding)

Sometimes, you don't really want to give the player a choice, you just want him to read the text and then "turn to section 46". This is obvious, since you can't branch the path forever, and if you look into any traditional (i.e. paper) gamebook, a good half of the sections there lead to just one other section, with no room for choice.

In egamebook, this could be written as:

    - Continue [nextpage]

But you don't need to do that if you don't want to. You can also write:

    - [nextpage]

And the egamebook moves on automatically. It'll give a much better flow to the player as they aren't even aware of the page turn.

### Scripts

You can use scripts inside the pages. You start them by putting `<script>` on a separate line and end them by putting `</script>` on another separate line below them. Like this:

    Congratulations, you earned 5 coins!

    <script>
      coins += 5;
    </script>

Note: The scripts are written in the [Dart programming language](http://dartlang.org). It's very similar to JavaScript, but more consistent and easier to use. It's also designed from the ground up to handle huge projects.

The variables you use in scripts can be also accessed in normal text blocks. For example, after you have the `coins` variable defined, you can write something like this (note that there is no `<script>` tag):
  
    You check your moneybag and and find out you have $coins coins.
    
The `$coins` is a standard Dart way to paste a variable into text. You can also use all the advanced ways to access variables using [Dart string interpolation](http://www.dartlang.org/docs/dart-up-and-running/contents/ch02.html#strings "Chapter 2. A Tour of the Dart Language from Dart: Up and Running | Dart: Structured web apps"), if you're into that kind of thing.

There are a few special functions that you can always use inside any script. They are:

* `**echo**("Hello world.")` -- This will print "Hello world." in the book. With this, you can have deep, algorithmic control over what gets printed.
* `**goto**("squash")` -- This will go to the section called _squash_ after the execution of the current script block has completed. Especially useful in conjunction with `if-else` control structures.
* `**nextScript**(() { echo("Belated greetings."); })` -- This will call the provided function (which in this case prints "Belated greetings.") right after the execution of the current script has ended. You can string unlimited number of scripts to be executed one after another.
* `**repeatBlock**()` -- This will repeat the current script block after it's done, creating a loop. This is great for iterative minigames - you repeat something until the game (puzzle, combat, ...) is resolved.

#### Variable persistence

Every `<script>` block is actually a function (closure), so variables initialized in it will be lost after the block is ended. There's a simple way around this, though: when you don't initialize, but just _use_ the variable, it will be saved.

    <script>
      // This variable will disappear after execution of this block ends.
      var a = "Hello.";
      // This variable will be created and will stay.
      b = "World!";
    </script>
    
The `b` variable will also be automatically saved _between_ play sessions. When the player closes the browser and opens it later, your variables will be still there without you needing to worry about it.

Technical note: This is made possible by Dart's noSuchMethod functionality. Non-initialized variables (like `b` above) are automaticaly saved into the magic `vars` Map. So the `b` above is accessible and assignable both through `b` as well as through `vars["b"]`, and its value will persist between play session.

### Imports and initializations

Apart from the `<script>` block, there are currently two other types of scripting-related tags. The purpose of these is to allow you to initialize or define things that you want to be able to use in any script throughout the book.

Note: These two (in contrast to the script blocks) can be _anywhere_ in the book file. It is customary to put them at the top of the `.egb` file. In some cases, it might be preferable to put them at the top of relevant _pages_ inside the `.egb` file. No matter what you choose, try to be consistent.

#### Library imports

We encourage egamebooks that — apart from being engaging stories — also have complex internal logic. This means you will probably want to write and use libraries, just like in any Dart file. For that, use the `<import>` tag like so:

    <import 'path/to/library.dart'/>

You can put this line anywhere in your file. It will be automatically hoisted to the top. It is equivalent to `import 'path/to/library.dart';` in a Dart file.

#### Variables blocks

This block is called every time the player opens the book and before he/she loads a savegame. It should contain **variables** that you want to use throughout and that you want to make sure are defined from the very start.

    <variables>
      time = 0;
    </variables>

When you include the above definition in the book, you can use the `time` variable anywhere and you can be sure it's initialized.

    <script>
      if (time > 50) {
        echo("Your time is up!");
      } 
    </script>

It's probably a good idea (though not required) to define **all** variables in a variables block and only _change_ them in script blocks. The advantage of this is that you don't need to worry about whether you have defined the variable you want to use yet or not. This can be a problem when your egamebook's pages are deeply interconnected (which they will be) and it's not easy to predict which page will be visited first.

Technical note: think of the `<variables>` block as the body of a constructor.

Remember that the variables block is run _before_ any savegame is loaded. This means that when the player saves a game after `time` has been incremented to 42, when he loads again, time will equal 42 (and not 0).

##### A note about classes

You cannot define classes in the `.egb` file. If you want classes (HINT: you do), create a library, put the class there and import it.

Classes are at their most useful when used as **custom types** for objects in the game. Below, we create a class for all spiders in the game, with useful fields and functions. This is what `spider.dart` could look like:

    class Spider {
      int legs = 8;
      String name;

      Spider(this.name) {
        if (name == null) {
          name = "horrible unnamed spider";
        }
      }

      torture() {
        legs -= 1;
      }
    }

Now, you can do this in your `.egb` file:

    <variables>
      skippy = new Spider("Skippy");
    </variables>

    <script>
      echo("You see your toilet friend ${skippy.name} here.");
      if (skippy.legs < 8) {
        echo("Oh my god, someone has hurt him in your absence!");
      }
    </script>

###### Persistence of custom types

The above Spider class is nice, but it unfortunately won't survive saving and loading as it is. Fortunately, we can remedy this by defining two functions: `toMap()` and `updateFromMap(map)` (and thus implementing the Saveable interface). The egamebook system will call those two functions automatically when saving and loading, respectivelly.

The Spider class above could look like this:

    class Spider {
      int legs = 8;
      String name;

      Spider(this.name) {
        if (name == null)
          name = "horrible unnamed spider";
      }
    
      torture() {
        legs -= 1;
      }
      
      toMap() => {"legs": legs, "name": name};
      
      updateFromMap(map) {
        legs = map["legs"];
        name = map["name"];
      }
    }

Now Skippy's state will persist between play sessions.

## Development

On the most basic level, egamebook is a pair of two classes which are talking to each other. One of them is the Interface and handles everything user-facing. The other one is the so-called Scripter, which contains the book and all its logic.

### Interface

The default (and currently only) interface is the HtmlInterface. It lives in the browser and shows the output of Scripter as (mostly) paragraphs of text in DOM. When Scripter calls for user input (choice), HtmlInterface creates a bunch of buttons to click on.

The interface also interfaces with Storage (or, more precisely, PlayerProfile), which is where each player's savegames and preferences are stored (one storage can support more than one player).

### Scripter

Scripter is a class that encapsulates all the functionality related to communication with the Interface. Egamebooks extend this class with the actual content of the book.

This is what the book can then look like after being converted from `.egb` to a Dart file. Egamebook authors *shouldn't* need to know the structure of such Dart files. This is what we're shielding them from by the `.egb` format.

    class ScripterImpl extends EgbScripter {

      ScripterImpl() : super() {
        /* These are the pages, and the blocks of texts and the script blocks inside them. */
        pageMap[r"""Day1.WakeUp"""] = new EgbScripterPage(
          [
            """You woke up and quickly realize the house is surrounded by the police. "Oh Rick," you sigh. "You idiot." """,
            """You have a minute at most before the pigs kick the door in.""",
            () {
              time = 0;
            },
            [
              null,
              {
                "goto": r"""wakeupDilemma"""
              }
            ]
          ]
        );
        pageMap[r"""Day1.wakeupDilemma"""] = new EgbScripterPage(
          [
            () {
                if (time >= 45) {
                  goto("policeBreakIn");
                } else if (time >= 30) {
                  echo("""You hear major commotion outside. They must be getting ready.""");
                }
            },
            () {
              echo("""It is $time seconds since you woke up.""");
            },
            () {
              echo("""This means $time seconds have passed since you opened your eyes.""");
            },
            [
              () => """What do you do?""",
              {
                "string": () => """Get dressed (30 seconds)""",
                "goto": r"""getDressed""",
                "script": () {echo("Ladyboy!");}
              },
              {
                "string": () => """Get the gun (15 seconds)""",
                "goto": r"""getGun"""
              },
              {
                "string": () => """Warn Amy by phone (30 seconds)""",
                "goto": r"""warnAmy"""
              }
            ]
          ]
        );

        // ... snip other pages ...
        
        firstPage = pageMap[r"""Day1.WakeUp"""];    
      }

      void initBlock() {
        /* These are the contents of the `<variables>` blocks. */
        name = "Filip";
        age = 30;
        surname="Hracek";
      }
    }

### Scripter in an isolate

A naive implementation of the Interface-Scripter pair would be to just have them talk to each other as two classes in the main isolate (main application thread).

Since we want to encourage large computations inside the Scripter, we don't want to do that. We want to run the Scripter in its own Isolate.

To hide the complexity of sending messages between Isolates, we have ScripterProxy and InterfaceProxy. These classes forward calls through Isolate boundaries.

                        +-Isolate--------------+
                        |                      |
                        |         +----------+ |
                        |         |          | |
     +> ScripterProxy +-----------> Scripter | |
     |                  |         |          | |
     |                  |         +---------++ |
    ++----------+       |                   |  |
    |           |       |                   |  |
    | Interface <---------+ InterfaceProxy <+  |
    |           |       |                      |
    +-----------+       +----------------------+

The application's `main()` then looks like this:

    import 'package:egamebook/runner.dart';
    import 'package:egamebook/interfaces/html/html_interface.dart';
    import 'package:egamebook/src/persistence/storage.dart';

    void main() {
      // This will be rewritten with the actual file.
      var scripterPath = '[[PathToEgbScripterImplementation]]';
      
      // create the interface
      EgbInterface interface = new HtmlInterface();
      // open storage
      EgbStorage storage = new LocalStorage();
      // set player profile
      interface.setPlayerProfile(storage.getDefaultPlayerProfile());
      // run
      runFromIsolate(scripterPath, interface, storage);
    }

### Builder

Builder is the class that converts `.egb` files and their surroundings into Scripter implementation files and their surroundings (such as `index.html`).

### Unit tests

Run unit tests:

    tools/unit_test_run.sh

