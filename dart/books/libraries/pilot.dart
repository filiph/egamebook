part of spaceship;

class Pilot extends Actor {
  Pilot({name: "pilot", team: Actor.DEFAULT_ENEMY, isPlayer: false,
      pronoun: Pronoun.HE})
      : super(name: name, team: team, isPlayer: isPlayer, pronoun: pronoun) {}

  Pilot.player() : super(
          name: "player",
          pronoun: Pronoun.YOU,
          team: Actor.FRIEND,
          isPlayer: true);

  Pilot.ai(this.spaceship) : super(
          name: "pilot",
          team: Actor.DEFAULT_ENEMY,
          isPlayer: false,
          pronoun: Pronoun.HE);

  Spaceship spaceship;
  int timeToNextInteraction = 0;

  void update() {
    if (!isAliveAndActive) return;

    if (spaceship != null && timeToNextInteraction <= 0) {
      if (isPlayer) {
        _playerCreateForm(spaceship.getManeuvreSetupSection(),
            spaceship.getSystemSetupSections());
      } else {
        _aiChooseMove(spaceship.getManeuvreSetupSection(),
            spaceship.getSystemSetupSections());
      }
    }

    --timeToNextInteraction;
  }

  // TODO: add pilot's maneuvres, communications, specials
  // TODO: FormSection -> FormDialogs
  void _playerCreateForm(FormSection maneuvres, List<FormSection> sections) {
    Form form = new Form();
    form.children.add(_createCurrentStatusText());
    if (maneuvres != null) {
      form.children.add(maneuvres);
    }
    form.children.addAll(sections);
    showForm(form);
  }

  FormSection _createCurrentStatusText() {
    FormSection section = new FormSection("Info");
    TextOutput text = new TextOutput();
    StringBuffer buf = new StringBuffer();
//    text.current = "<strong>Bodega</strong> (100% hull, poor speed) is targeting "
//        "<strong>Messenger</strong> (100% hull, excellent speed). Bodega has "
//        "worse position.";

    buf.write("<table class='form-table'>");
    buf.write("<tr><th></th><th>Hull</th><th>Weapons</th><th>Speed</th>"
        "<th>Position to ${spaceship.name}</th></tr>");
    buf.write(_createTableRowForShip(spaceship, null));
    spaceship.currentCombat.spaceships
        .where((ship) => ship != spaceship)
        .forEach((otherShip) {
      buf.write(_createTableRowForShip(otherShip, spaceship));
    });
    buf.write("</table>");
    text.current = buf.toString();
    section.children.add(text);
    return section;
  }

  String _createTableRowForShip(Spaceship ship, Spaceship reference) {
    StringBuffer buf = new StringBuffer();
    buf.write("<tr>");
    buf.write("<td>${ship.name}</td>");
    buf.write("<td>${ship.hull.hp.percentageString}</td>");
    buf.write("<td>50%</td>");
    buf.write("<td>slow</td>");
    if (reference != null) {
      buf.write("<td>${ship.getPositionStringTowards(reference,
                                                     wrapInColor: true)}</td>");
    } else {
      buf.write("<td>&mdash;</td>");
    }
    buf.write("</tr>");
    return buf.toString();
  }

  // TODO author can subclass Pilot and pre-program AI to pick moves
  void _aiChooseMove(FormSection maneuvres, List<FormSection> sections) {
    List<SubmitButton> allButtons = [[maneuvres], sections]
        .expand((e) => e)
        .expand((FormSection s) => s.children.where((el) => el is SubmitButton))
        .toList(growable: false);

    SubmitButton buttonToPress = Randomly.choose(allButtons);
    buttonToPress.onSubmit();
  }

  // TODO _aiUpdate - add
  // TODO _playerUpdate
}
