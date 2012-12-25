# egamebook

A system which automatically creates playable electronic gamebooks from .egb files.

## Quick Start

Or how to be a published interactive fiction writer in 7 easy steps!

TODO: IMPLEMENT, make more visual

1.  Run the `quick_start.sh` script in `bin` directory.
2.  Watch as it creates a new project for you in the `example`
    directory.
    - You can change the name of the directory at any time. Default is
      `new`.
3.  Go to `example/new` and edit the `book.egb` file in your favorite
    plain text editor (gEdit, TextMate, Sublime, Notepad, ..).
5.  Once you're happy with the changes, run the `compile.sh` script that
    was conveniently placed in the `example/new` directory for you.
6.  Test-drive your newly created egamebook either on the command line
    (run `run.sh`) or in the browser (open `web/index.html`). 
7.  Repeat until happy with the product.
8.  Upload the contents of the `web` directory to a server. Your
    egamebook is now published.

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

## egb file format

The .egb file is the source of your egamebook. A basic one can look like this:

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

    You managed to get out of the room before the spiders got to you, but now you're in a room full of giant worms.

This will create an egamebook that starts in the first room (handle _start_) and gives the player two choices. These lead to the other two sections: _squash_ and _run_. Both these sections don't contain any choices, so they're the end of this 'book'.

### A more practical example

Let's go through some more complex examples while showing advanced
features.

    Title:      Test Gamebook #1  
    Subtitle:   The Adventures of a Guy with a Gun  
    Author:     Filip Hracek  
                John Doe  
    Web:        http://filiph.net/  
    Email:      abc@example.com  
    Keywords:   crimi, thriller  
    Copyright:  Creative Commons  


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

    You quickly grab the clothes that you left on the bedside table and get dressed. You actually manage to do it in 20 seconds in spite of being nervous as hell.

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

#### Questions

TODO explanation

    Where do you want to go now?
    - Inside the house [insideHouse]
    - To the backyard [backyard]

#### Scripts

TODO explanation

    - Pick up the axe [{ weapon = "axe" }, nextpage] 

#### Forwarding

Sometimes, you don't really want to give the player a choice, you just
want him to read the text and then "turn to section 46". This is
obvious, since you can't branch the path forever, and if you look into
any traditional (i.e. paper) gamebook, a good half of the sections there
lead to just one other section, with no room for choice.

In egamebook, this could be written as:

    - Continue [nextpage]

But you don't need to do that if you don't want to. You can also write:

    - [nextpage]

And the egamebook moves on automatically. It's give a much better flow to the player as they aren't even aware of the page turn.

### Importing libraries

TODO explanation

    <import "../dungeons_dragons.egb" />

You can put this line anywhere in your file. This will import the definitions (functions, classes and variables) of the `dungeons_dragons.egb` file into your egamebook. So if the imported file defines a handy list of monsters or a great combat-resolving function, you can use them in your book.
 
### Scripts

You can use scripts inside the pages. You start them by putting `<script>` on a separate line and end them by putting `</script>` on another separate line below them. Like this:

    Congratulations, you earned 5 coins!

    <script>
    coins += 5;
    </script>

The scripts are written in the [Dart programming language](http://dartlang.org). It's very similar to JavaScript, but better in many respects. 

There are a few special functions that you can always use inside any script. They are:

* `echo("Hello world.")` -- This will print "Hello world." in the book.
  With this, you can have deep, algorithmic control over what gets
  printed.
* `goto("squash")` -- This will go to the section called _squash_ after execution of this script block.
* `nextScript(() { print("Belated greetings."); })` -- This will call the provided function (which in this case prints "Belated greetings.") right after execution of this script. You can string unlimited number of scripts to be executed one after another.
* `repeatBlock()` -- This will repeat the current script after it's done, creating a loop. This is great for iterative minigames - you repeat something until the game (puzzle, combat, ...) is resolved.

#### Variables

Every `<script>` block is actually a function, so variables initialized in it will be lost after the block is ended. There's a simple way around this, though: when you don't initialize, but just _use_ the variable for the first time, it will be saved.

    var a = "Hello.";  // this variable will disappear after this block closes
    b = "World!";  // this variable will stay

Technical note: non-initialized variables are being saved into the `vars__` Map. So the `b` above is accessible and assignable both through `b` as well as through `vars__["b"]`.

### Functions, Classes and Variables

Apart from the `<script>` block, there are currently 3 other types of blocks. The purpose of these is to allow you to initialize or define things that you want to use in any script throughout the book.

Note: These three (in contrast to the script blocks) can be _anywhere_ in the book file. Mostly, you put them at the very bottom of the .egb file so they are easy to find and don't stand in the way. 

Note 2: In the future, we might be able to merge classes and variables and functions into one block (e.g. library). But for technical reasons, that can't happen yet.

#### Variables

This block is called every time the player opens the book. It should contain **variables** that you want to use throughout and that you want to make sure are defined from the very start.

    <variables>
    maxNumberOfSpiders = 100;
    </variables>

When the above definition is anywhere in the book, you can use the maxNumberOfSpiders variable (also anywhere in the book).

    <script>
    if (numberOfSpiders > maxNumberOfSpiders)
      echo("Aaah, too many spiders!");
    </script>

Note: you can use defined functions and classes in this block.

#### Functions

This block typically contains **functions** that you want to use throughout the book. Call them from any script.

    <functions>
    getDiceThrow() {
      return (Math.random() * 6).toInt() + 1;
    }
    </functions>

When you place the above block anywhere in the book, you can use the getDiceThrow() function anywhere.

    You throw a dice and it's a ${getDiceThrow()}.

Note: you can use defined classes in this block, but _can't_ use variables from the `<variables>` block.

#### Classes

If you want to define any **classes**, put them into the `<classes>` block. Classes are a great way to structure your code when you're really serious about the programming.

    <classes>
    class Spider {
      int legs = 8;
      String name;

      Spider(this.name) {
        if (name == null)
          name = "horrible unnamed spider";
      }
    }
    </classes>

Now, you can do this:

    <variables>
    skippy = new Spider("Skippy");
    </variables>

    <script>
    echo("You see your toilet friend ${skippy.name} here.");
    if (skippy.legs != 8)
      echo("Oh my god, someone has hurt him in your absence!");
    </script>

Note: you _can't_ use functions or variables in the `<classes>` block.
In fact, you can't even use the special functions (`echo`, `repeatBlock`, etc.) in here. You shouldn't _have_ to, but be aware of the limitation.

## Development

Run unit tests:

    bin/unit_tests.sh

The full-blown testing egamebook is in `examples/test`. You can run:

    examples/test/run_test.sh  # to compile and run the CL version
    examples/test/html_run_test.sh  # to compile and run in browser
