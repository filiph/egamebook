part of zil;

ZilActor player = new ZilActor(name: "player", pronoun: Pronoun.YOU,
    team: Actor.FRIEND, isPlayer: true);

class ZilActor extends Actor with Location {
  ZilActor({String name, team: Actor.NEUTRAL, isPlayer: false,
    pronoun: Pronoun.IT}) : super(name: name, team: team, isPlayer: isPlayer,
        pronoun: pronoun);
  
  Room location;
}

