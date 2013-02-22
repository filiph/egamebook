part of spaceship;

class Pilot extends Actor {
  Pilot({name: "pilot", team: DEFAULT_ENEMY, isPlayer: false, 
    pronoun: Pronoun.HE})
      : super(name: name, team: team, isPlayer: isPlayer,
              pronoun: pronoun) {
      
  }
    
  int timeToNextInteraction = 0;
}

