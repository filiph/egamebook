library Scripter_Implementation;

import 'package:egamebook/scripter.dart';
import 'dart:isolate';

import 'package:edgehead/edgehead_lib.dart';

class ScripterImpl extends Scripter {
  @override
  String uid = "net.filiph.edgehead.0.0.1";

  /* LIBRARY */

      EdgeheadGame game;

  @override
  void populateVarsFromState() {
    vars["game"] = game;
  }
  @override
  void extractStateFromVars() {
    game = vars["game"] as EdgeheadGame;
  }
  ScripterImpl() : super() {
    /* PAGES & BLOCKS */
    pageMap[r"""start"""] = new ScripterPage(
      [
          """You and Briana sprint through the giant worm’s tunnel.""",
          """Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.""",
          """![Orc and Goblin](img/orc_and_goblin_sketch.jpg)""",
          [
            null,
          {
            "goto": r"""gameLoop"""          }
        ]
        ]
    );
    pageMap[r"""gameLoop"""] = new ScripterPage(
      [
          () async {
  await game.run();
        },
          [
            null,
          {
            "goto": r"""gameLoop"""          }
        ]
        ]
    );
    pageMap[r"""endGame"""] = new ScripterPage(
      [
          """<p class="meta">
  Hit <strong>Restart</strong> (top left) to play again. It will be different.
</p>"""
]
    );
        firstPage = pageMap[r"""start"""];
  }
  /* INIT */
  @override
  void initBlock() {
    game = null;

        game = new EdgeheadGame(echo, goto, choices, choice);
        game.onFinishedGoto = "endGame";

  }
}

// The entry point of the isolate.
void main(List<String> args, SendPort mainIsolatePort) {
  PresenterProxy presenter = new IsolatePresenterProxy(mainIsolatePort);
  Scripter book = new ScripterImpl();
  presenter.setScripter(book);
}
