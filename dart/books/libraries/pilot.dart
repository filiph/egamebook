part of spaceship;

class Pilot extends Actor {
  Pilot({name: "pilot", team: Actor.DEFAULT_ENEMY, isPlayer: false, 
    pronoun: Pronoun.HE})
      : super(name: name, team: team, isPlayer: isPlayer,
              pronoun: pronoun) {
      
  }
    
  Pilot.player() : super(name: "player", pronoun: Pronoun.YOU,
      team: Actor.FRIEND, isPlayer: true);
    
  Pilot.ai(this.spaceship) : super(name: "pilot", team: Actor.DEFAULT_ENEMY, 
                    isPlayer: false, pronoun: Pronoun.HE);
  
  Spaceship spaceship;
  @deprecated  // Each action takes exactly one unit of time.
  int timeToNextInteraction = 0;
  
  CombatMove currentMove;
  
  void update() {
    if (!isAliveAndActive) return;
    
    if (currentMove != null) {
      currentMove.targetShip = spaceship.targetShip;
      currentMove.start();
      currentMove.update();
      currentMove = null;
    }
    
    if (spaceship != null && timeToNextInteraction <= 0) {
      var availableMoves = spaceship.getAvailableMoves();
      var formSections = spaceship.getSystemSetupSections();
      if (isPlayer) {
        _playerCreateForm(availableMoves, formSections);
      } else {
        _aiChooseMove(availableMoves);
      }
    }
    
    --timeToNextInteraction;
  }
  
  void _playerCreateForm(List<CombatMove> moves, List<FormSection> sections) {
    Form form = new Form();
    
    MultipleChoiceInput moveChoice = new MultipleChoiceInput("Action", null);

    TextOutput textOutput = new TextOutput();
    textOutput.html = "Nothing yet.";
    form.append(textOutput);
    
    moveChoice.append(new Option("None", (_) => currentMove = null, selected: 
      true));
    
    moves.sort((a, b) => Comparable.compare(a.system.name, b.system.name));
    moves.forEach((CombatMove move) {
      Option o = new Option(move.commandText, (_) {
        currentMove = move;
        textOutput.html = "The move '${move.commandText}' selected";
      });
      moveChoice.append(o);
    });
    form.append(moveChoice);
    // TODO: target another ship
    
    form.children.addAll(sections);

    showForm(form);
  }
  
  // TODO author can subclass Pilot and pre-program AI to pick moves
  void _aiChooseMove(List<CombatMove> moves) {
    // dumb pilot doesn't touch anything
    // TODO: target most healthy enemy ship
    // TODO: start retreating if shaken up and allowed to do so
  }
  
  // TODO _aiUpdate - add 
  // TODO _playerUpdate
}

