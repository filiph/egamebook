---
layout: minimal
title: Egamebook
description: "Egamebook is a project which strives to bring the gamebook (aka Choose-Your-Own-Adventure) experience to the ‘new media’ platforms (mobile, tablet, web, ...) and to the 21st century."
---

{% include blog-ticker.html %}

<h1><img src="img/egamebook-title.png" alt="Egamebook" /></h1>

<img class="book" src="img/book-illustration.jpg" alt="Illustration of a book" />

<p>You are anxious to find out more about this “egamebook” thing. You open the page at <a href="http://www.egamebook.com/">egamebook.com</a> in your <script>var userAgent = navigator.userAgent; if (userAgent.indexOf("Chrome") !== -1) {document.write("Chrome ");} else if (userAgent.indexOf("Firefox") !== -1) {document.write("Firefox ");} else if (userAgent.indexOf("Opera") !== -1) {document.write("Opera ");} else if (userAgent.indexOf("MSIE") !== -1) {document.write("Internet Explorer ");} else if (userAgent.indexOf("Safari") !== -1) {document.write("Safari ");}</script>browser and you read its contents.  The following is written on the page:</p>

> Egamebook is a project which strives to bring the [gamebook][] (aka Choose-Your-Own-Adventure) experience to the ‘new media’ platforms (mobile, tablet, web, ...). True, great examples of electronic gamebooks are already out there, but they are not much more than a copy of the older, paper gamebooks – you merely choose between different paragraphs to read.
>
> This was a necessity in the old medium. In a book, you couldn’t – for example – run a simulation and then describe its changing state in natural language. But there is nothing stopping you from this today.

Interesting. You scratch your head and read some more.

> Well, actually, there is something stopping you. Existing electronic gamebook platforms are not ready for any of this. They are stuck in the book mindset. At best, they keep track of a few simple variables (e.g. number of gold coins), they do elementary computations on them, and then report the results in short messages.
>
> Imagine reading a book where you can do much more than just choose a path. Imagine a book where your actions have realistic and meaningful impact on the fictional, simulated world.
>
> <img class="knight" src="img/knight-illustration.jpg" alt="Knight illustration" />
>
> 1. You are playing as a bandit and choose your base of attack to be in a forest between two villages. Your actions lead to one of the villages having a shortage of goods, leading to higher prices there. It also leads to the forest acquiring a fame of being home to some _supernatural_ evil, because none of your victims make it out alive.
>
> 2. You are a starship pilot with an asteroid in tow. When confronted with a much bigger, hostile ship, you execute a maneuver which sends the asteroid flying toward it. The asteroid hits, resulting in structural damage, and disabling some of the ship’s outer systems, including the scanner and two thrusters. This allows you to make your escape.
>
> 3. You are a boxer in the midst of a championship fight. Your opponent is shifting his weight as if to prepare for a massive left hook. You decide to call his bluff, expose your side, and deal a punch to the face in order to throw him off balance. He was not bluffing though, and before you can hit, his left hook lands squarely on your exposed face, sending you flying to the ground.

Your eyebrows go way up. _Okay,_ you think, _nice. But how is this possible? I’m sure it’s fun to dream up things like these, but the big question is whether there’s a way to actually make them work._ You skip a few other examples. Then a subtitle catches your attention.

> ## A living, breathing world – through scripting
>
> Existing electronic gamebook systems work with either scripting languages (like JavaScript) or – more often – with something even simpler (something that only allows variables and conditional statements and not much else). In contrast, egamebook (this project) is build on [Dart][], which is a mature, structured programming environment. Authors can do as little as simple arithmetic assignments, or as much as running [physics simulations][] or complex ecologies.
>
> ![Illustration of a plane](img/plane-illustration.jpg)
>
> There is no limit to what the authors can implement. They have all the tooling and structure that they need for implementing complex mechanics like the ones above. Actually, in this respect, the tooling is better than for many [AAA games][]. 
>
> In the development of titles like Skyrim, most work is spent on the visual representation. The world needs to look as realistic as possible in 3D (not just graphics, but also the way people act, walk and talk, in 3D – that’s a lot of work). Scripting (including the world ‘simulation’ logic) is often done in languages like [Lua][], or in something like Skyrim’s [Papyrus][], and tends to be the last thing to worry about. In contrast – for an egamebook – scripting is _all you do_ (apart from writing, of course), so it makes perfect sense to give it a little more attention.
>
> An egamebook author can use libraries like [Box2D] for 2D physics, [AStar][] for pathfinding, [darwin][] for genetic algorithms, [Backy][] for neural networks – to name a few. Authors can also easily create their own libraries, which they can test independently from the gamebook.
>
> Let’s say you need to keep track of each city in a game world – their population, economic characteristics, diplomacy status, and much more. In a language like Dart, the complexity is manageable: you create a `City` class and its logic, you test it, and when it's ready, you then use it in your egamebook.

<img class="cleaner" src="img/cleaner-illustration.jpg" alt="Cleaner illustration" />

All this starts to feel like a lot of BS. It looks good in theory, yes, but is there actually something that _works_?

> ## Current status
>
> The system is being developed along with the first true egamebook, called _The Bodega Incident_.
>
> Already, it can do all the basic stuff and much more, but it doesn’t make sense to release it just yet. The world doesn’t need another ‘okay’ electronic gamebook system. It needs a polished system, with a shining example of a gamebook.

It looks like you join a mailing list at this point (in case you’re interested in playing – or creating – an egamebook in the future).

<ul class="choices">
  <li class="button preferred"><a href="https://groups.google.com/forum/#!forum/egamebook"><strong>Join</strong> the discussion/mailing list.</a></li>
	<li class="button"><a href="https://plus.google.com/communities/117415708119099457420">Join the Google+ Community.</a></li>
  <li class="button"><a href="signup.html">Sign up for no more than one email announcement a month.</a></li>
</ul>

[egamebook]: http://www.egamebook.com
[gamebook]: http://en.wikipedia.org/wiki/Gamebook
[Dart]: http://www.dartlang.org/
[physics simulations]: https://plus.google.com/111783114889748547827/posts/Jguy38GJbsy
[AAA games]: http://en.wikipedia.org/wiki/AAA#Games
[Lua]: http://en.wikipedia.org/wiki/Lua_(programming_language)
[Papyrus]: http://www.creationkit.com/Papyrus_Introduction
[Box2D]: http://pub.dartlang.org/packages/box2d
[AStar]: http://pub.dartlang.org/packages/a_star
[darwin]: http://pub.dartlang.org/packages/darwin
[Backy]: http://pub.dartlang.org/packages/backy
[RickRoll]: http://www.youtube.com/watch?v=oHg5SJYRHA0
