# egamebook

A system which automatically creates playable electronic gamebooks from .egb files.

## egb file

The basic egb file looks like this:

    ---
    start

    You are in a room full of spiders. The spiders look annoyed.

    - Squash the spiders [squash]
    - Run! [run]

    ---
    squash

    You try to squash the spiders, but you realize they are actualy rusty nails. Game over.

    ---
    run

    You managed to get out of the room before the spiders got to you, but now you're in a room full of giant worms.

This will create an egamebook that starts in the first room (handle _start_) and gives the player two choices. These lead to the other two sections: _squash_ and _run_. Both these sections don't contain any choices, so they're the end of this book.

### A more practical example

Let's go through some more complex examples while showing advanced
features.

    ---
    Day1.WakeUp
    
    You woke up and quickly realize the house is surrounded by the
police. "Oh Rick," you sigh. "You just can't keep your mouth shut, can
you?" You have a minute at most before the pigs kick the door in.
    
    <script>
      time = 0;
    </script>

    - [wakeupDilemma]

    ---
    Day1.wakeupDilemma

    <dart>
      if (time >= 45) {
        goto("breakIn");
      } else if (time >= 30) {
    </dart>
    You hear major commotion outside. They must be getting ready.
    <dart>
      }
    </dart>

    What do you do?
    - Get dressed (30 seconds) [getDressed]
    - Get the gun (15 seconds) [getGun]
    - Warn Amy by phone (30 seconds) [warnAmy]

    ---
    Day1.getDressed
    [[ visitOnce ]]

    You quickly grab the clothes that you left on the bedside table and
get dressed. You actually manage to do it in 20 seconds in spite of
being nervous as hell.

    <script>
      time += 20;
    </script>

    - [wakeupDilemma]

    ---
    Day1.getGun
    [[ visitOnce ]]

    You dive under the bed and your hand almost immediately finds the
old-fashioned revolver that's been taped there for some time now. You
check it -- it's loaded and apparently working.

    <script>
      weapon = "gun";
      time += 15;
    </script>

    - [wakeupDilemma]

    ---
    Day1.warnAmy
    [[ visitOnce ]]

    You grab the phone and speed-dial number one. It takes ages for her
to pick up, and when she does, she's sleepy and slow.

    "Wha' uppp?"

    "Hey baby," you start quickly, "I have pigs outside. Rick must have
talked. Go. Go somewhere safe. Somewhere I wouldn't know."

    "What?"

    You hang up, hoping she got all that. You know you can't lose any
more time now.

    <script>
      time += 30;
    </script>

    - [wakeupDilemma]

    ---
    breakIn

    There's a sudden, loud crash _right in the room_ and a man in black
overall jumps into the room, through the window, like some sort of a
freaking ninja. Everything slows down. He's holding a gun and starts
turning it towards you.

    <script>
      if (weapon == "gun") {
    </script>
    You react instinctively. There's a loud gunshot and the man falls to
the ground. You shot him in the stomach and you know he's wearing an
armor, but the sheer shock and power of the impact will incapacitate
this guy for some time.

    - [runOutTheWindow]
    <script>
      } else {
    </script>
    You realize you don't have the gun yet, so you instinctively move
towards the bed (to which it's taped from below). Though the policeman
can't know what you're after, he acts as instinctively as you do -- he
shoots you in the right clavicle area. You fall to the ground, screaming
with pain.

    - [wasted]
    <script>
      }
    </script>

    ---
    Day1.runOutTheWindow

    You jump through the window, catch hold of some branches of the
backyard tree and fall down on the grass with a thump. You hear "Shit!"
from the side, so you send a blind shot there, and start running towards
the white fence. The adventure begins.

    - [theAdventureBegins]
  
    ---
    wasted

    For the next few hours and days, you just see blurs and colors and
you dream nightmares of Amy and the bastard son of yours.

    When you finally come to your senses, you're in prison. And you
won't be getting out alive.

## Advanced uses

### Scripts

You can use scripts inside the pages. You start them by putting `<script>` on a separate line and end them by putting `</script>` on another separate line below them. Like this:

    Congratulations, you earned 5 coins!

    <script>
    coins += 5;
    </script>

The scripts are written in the [Dart programming language](http://dartlang.org). There are a few special functions that you can always use inside a script. They are:

* `echo("Hello world.")` -- This will print "Hello world." in the book
* `goto("squash")` -- This will go to the section called _squash_ after execution of this script block
* `nextScript(() { print("Belated greetings."); })` -- This will call the provided function (which in this case prints "Belated greetings.") after execution of this script. You can string unlimited number of scripts to be executed one after another.
* `repeatBlock()` -- This will repeat the script block after execution. This is great for iterative minigames - you repeat something until the game (puzzle, combat, ...) is resolved.

#### Variables

Every `<script>` block is actually a function, so variables initialized in it will be lost after the block is ended. There's a trick, though: when you don't initialize, but just _use_ the variable for the first time, it will be saved. (Unless it's an instance of a user defined class, which is another story.)

    var a = "Hello.";  // this variable will disappear after this block closes
    b = "World!";  // this variable will stay

Technical note: non-initialized variables are being saved into the `vars` Map. So the `b` above is accessible and assignable both through `b` as well as through `vars["b"]`.

### Init, Classes and Library

Apart from the `<script>` block, there are currently 3 other types of blocks. The purpose of these is to allow you to initialize or define things that you want to use in many blocks throughout the book.

Note: These three (in contrast to the script blocks) can be anywhere in the book. Mostly, you either put them below or above the actual content of the book. 

#### Init

This block is called every time the player opens the book. It should contain constants that you want to use throughout.

    <init>
    maxNumberOfSpiders = 100;
    </init>

#### Library

This block typically contains functions that you want to use throughout the book. From technical reasons, you can't define classes in this block. That's what `<classes>` is for.

    <library>
    getDiceThrow() {
      return (Math.random() * 6).toInt() + 1;
    }
    </library>

#### Classes

For technical reasons, you can't define classes in the library block. Therefore, if you want to define any classes, put them into the classes block. There's one more caveat, though: you _can't_ use the special functions (`echo`, `repeatBlock`, etc.) from the `<classes>` block (again, for technical reasons). You shouldn't _have_ to, but be aware of the limitation.

In the future, we might be able to merge classes and library into one block.

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
