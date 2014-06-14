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
  int timeToNextInteraction = 0;
  
  void update() {
    if (!isAliveAndActive) return;
    
    if (spaceship != null && timeToNextInteraction <= 0) {
      if (isPlayer) {
        _playerCreateForm([], spaceship.getSystemSetupSections());
      } else {
        _aiChooseMove(spaceship.getAvailableMoves());
      }
    }
    
    --timeToNextInteraction;
  }
  
  // TODO: add pilot's maneuvres, communications, specials
  // TODO: FormSection -> FormDialogs
  void _playerCreateForm(List<CombatMove> maneuvres, List<FormSection> sections) {
    Form form = new Form();
    
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

