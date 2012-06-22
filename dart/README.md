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

### Scripts

You can use scripts inside the pages. You start them by putting `<script>` on a separate line and end them by putting `</script>` on another separate line below them. Like this:

  Congratulations, you earned 5 coins!

  &lt;script&gt;
  coins += 5;
  &lt;/script&gt;

The scripts are written in the [Dart programming language](http://dartlang.org). There are a few special functions that you can always use inside a script. They are:

* `echo("Hello world.")` -- This will print "Hello world." in the book
* `goto("squash")` -- This will go to the section called _squash_ after execution of this script block
* `nextScript(() { print("Belated greetings."); })` -- This will call the provided function (which in this case prints "Belated greetings.") after execution of this script. You can string unlimited number of scripts to be executed one after another.
* `repeatBlock()` -- This will repeat the script block after execution. This is great for iterative minigames - you repeat something until the game (puzzle, combat, ...) is resolved.

#### Variables

Every `<script>` block is actually a function, so variables initialized in it will be lost after the block is ended. There's a trick: when you don't initialize, but just _use_ the variable for the first time, it will be saved. (Unless it's an instance of a user defined class, which is another story.)

  var a = "Hello.";  // this variable will disappear after this block closes
  b = "World!";  // this variable will stay

Technical note: non-initialized variables are being saved into the `vars` Map. So the `b` above is accessible and assignable both through `b` as well as through `vars["b"]`.

### Init, Classes and Library

Apart from the `<script>` block, there are currently 3 other types of blocks. The purpose of these is to allow you to initialize or define things that you want to use in many blocks throughout the book.

Note: These three (in contrast to the script blocks) can be anywhere in the book. Mostly, you either put them below or above the actual content of the book. 

#### Init

This block is called every time the player opens the book. It should contain constants that you want to use throughout.

  &lt;init&gt;
  maxNumberOfSpiders = 100;
  &lt;/init&gt;

#### Library

This block typically contains functions that you want to use throughout the book. From technical reasons, you can't define classes in this block. That's what `<classes>` is for.

  &lt;library&gt;
  getDiceThrow() {
    return (Math.random() * 6).toInt() + 1;
  }
  &lt;/library&gt;

#### Classes

For technical reasons, you can't define classes in the library block. Therefore, if you want to define any classes, put them into this block. There's one more caveat, though: you _can't_ use the special functions (`echo`, `repeatBlock`, etc.) from the `<classes>` block (again, for technical reasons). You shouldn't _have_ to, but be aware of the limitation.

In the future, we might be able to merge classes and library into one block.

  &lt;classes&gt;
  class Spider {
    int legs = 8;
    String name;

    Spider(this.name) {
      if (name == null)
        name = "horrible unnamed spider";
    }
  }
  &lt;/classes&gt;
