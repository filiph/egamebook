library Scripter_Implementation;

import 'package:egamebook/scripter.dart';
import 'dart:isolate';

import 'package:edgehead/edgehead_lib.dart';

class ScripterImpl extends Scripter {
  @override
  String uid = "net.filiph.edgehead.0.0.1";

  /* LIBRARY */

      EdgeheadGame game;
  
      Stat<double> hitpoints = new Stat<double>("Health", (double value) {
      if (value == 0.0) {
        return "💀"; // dead, skull
      }
      if (value <= 0.5) {
        return "😣"; // bleeding, persevering face
      }
      if (value < 1.0) {
        return "😧"; // cut, anguished face
      }
      return "😐"; // fine, neutral face
      }, description: "Your physical state", initialValue: 100.0, show: true);
      Stat<int> stamina = new Stat<int>("Stamina", (int value) => "$value 🌟",
        description: "Spare physical energy", show: true);
      Stat<int> gold = new Stat<int>("Gold", (int value) => "$value 💰",
        description: "Gold coins", show: false);

  @override
  void populateVarsFromState() {
    vars["game"] = game;
    vars["hitpoints"] = hitpoints;
    vars["stamina"] = stamina;
    vars["gold"] = gold;
  }
  @override
  void extractStateFromVars() {
    game = vars["game"] as EdgeheadGame;
    hitpoints = vars["hitpoints"] as Stat<double>;
    stamina = vars["stamina"] as Stat<int>;
    gold = vars["gold"] as Stat<int>;
  }
  ScripterImpl() : super() {
    /* PAGES & BLOCKS */
    pageMap[r"""start"""] = new ScripterPage(
      [
          """# Insignificant Little Vermin""",
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
  Hit <strong>Info</strong> to learn more about this egamebook, and its
  sequel.
</p>"""
]
    );
        firstPage = pageMap[r"""start"""];
  }
  /* INIT */
  @override
  void initBlock() {
    game = null;
    hitpoints = new Stat<double>("Health", (double value) {if (value == 0.0) {return "💀";} if (value <= 0.5) {return "😣";} if (value < 1.0) {return "😧";} return "😐";}, description: "Your physical state", initialValue: 100.0, show: true);
    stamina = new Stat<int>("Stamina", (int value) => "$value 🌟", description: "Spare physical energy", show: true);
    gold = new Stat<int>("Gold", (int value) => "$value 💰", description: "Gold coins", show: false);

        game = new EdgeheadGame(echo, goto, choices, choice, showSlotMachine,
                                hitpoints, stamina, gold);
        game.onFinishedGoto = "endGame";
        points.add(0);

  }
}

// The entry point of the isolate.
void main(List<String> args, SendPort mainIsolatePort) {
  PresenterProxy presenter = new IsolatePresenterProxy(mainIsolatePort);
  Scripter book = new ScripterImpl();
  presenter.setScripter(book);
}
