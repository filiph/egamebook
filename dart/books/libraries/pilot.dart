part of spaceship;

class Pilot extends Actor {
  Pilot({name: "pilot", team: DEFAULT_ENEMY, isPlayer: false, 
    pronoun: Pronoun.HE})
      : super(name: name, team: team, isPlayer: isPlayer,
              pronoun: pronoun) {
      
  }
    
  Pilot.player() : super(name: "player", pronoun: Pronoun.YOU,
      team: Actor.FRIEND, isPlayer: true);
    
  Pilot.ai(this.spaceship) : super(name: "pilot", team: DEFAULT_ENEMY, 
                    isPlayer: false, pronoun: Pronoun.HE);
  
  Spaceship spaceship;
  int timeToNextInteraction = 0;
  
  void update() {
    if (!isAliveAndActive) return;
    
    if (spaceship != null && timeToNextInteraction <= 0) {
      var availableMoves = spaceship.getAvailableMoves();
      if (isPlayer) {
        _playerChooseMove(availableMoves);
      } else {
        _aiChooseMove(availableMoves);
      }
    }
    
    --timeToNextInteraction;
  }
  
  void _playerChooseMove(List<CombatMove> moves) {
    List<EgbChoice> choicesToShow = [];
    moves.sort((a, b) => Comparable.compare(a.system.name, b.system.name));
    moves.forEach((move) {
      if (move.autoRepeat && move.currentTimeToFinish != null) {
        choicesToShow.add(
            new EgbChoice("Stop ${move.system.currentMove.instanceName} [2s]",
              script: () {
                move.stop();
                timeToNextInteraction = 2;
              })
            );
      } else {
        choicesToShow.add(move.createChoice(targetShip: spaceship.targetShip));
      }
    });
    choicesToShow.add(
        new EgbChoice("Wait [5s]",
            script: () {
              timeToNextInteraction = 5;
            })
        );
    // TODO: target another ship
    choices.addAll(choicesToShow);
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

