library Scripter_Implementation;

import 'package:egamebook/scripter.dart';
import 'dart:isolate';

import 'package:edgehead/edgehead_lib.dart';

class ScripterImpl extends Scripter {
  String uid = "net.filiph.edgehead.0.0.1";

  /* LIBRARY */

      EdgeheadGame game;

  void populateVarsFromState() {
    vars["game"] = game;
  }
  void extractStateFromVars() {
    game = vars["game"] as EdgeheadGame;
  }
  ScripterImpl() : super() {
    /* PAGES & BLOCKS */
    pageMap[r"""start"""] = new ScripterPage(
      [
          """You and Briana sprint through the giant worm’s tunnel.""",
          """Suddenly, an **orc** and a **goblin** jump at you from a slimy crevice, swords in hands.""",
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
  Hit <strong>Restart</strong> if you want to play again. It will be different.
</p>"""
]
    );
        firstPage = pageMap[r"""start"""];
  }
  /* INIT */
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
