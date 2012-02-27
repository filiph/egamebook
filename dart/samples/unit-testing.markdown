
--- 
welcome

# Thin Ice

A sci-fi thriller featuring a dynamic storyline, swords, and vaginas.
Written by: Filip Hracek

<dart>
vars["eyeColor"]= "black";
</dart>

- Start [beforeVisit]
- Customize your character first [customizeCharacter]

--- 
customizeCharacter

What is your eye’s color?

<dart>
choice("Black", showNow:true).then(() { vars["eyeColor"]= "black"; });
choice("Blue", showNow:true).then(() { vars["eyeColor"]= "blue"; });
choice("Brown", showNow:true).then(() { vars["eyeColor"]= "brown"; });
choice("Gray", showNow:true).then(() { vars["eyeColor"]= "gray"; });
choice("Green", showNow:true).then(() { vars["eyeColor"]= "green"; });
</dart>

- Start [beforeVisit]

--- 
beforeVisit

Contrary to popular belief, being a young gynaecologist isn’t the bachelor’s dream occupation. Most women won’t be attracted to a guy when the first thing he sees of them is their vagina. But no matter how often you explain this to your friends, they will always think you’re living the life of a hip-hop star. "$name is the man!" they say. Maybe they suppose that seeing a woman’s privates keeps being exciting even after 2 years of practice? It doesn’t. In fact, sometimes you’d rather be a dentist and look into people’s throats, a rectum specialist and stare into other’s assholes, or a psychologist and dive into their horrible, filthy minds.

There _are_ bright moments, you must admit. Preventive examinations. Young ladies with charm and no actual pathology. You prefer when there’s no reason for spreading legs, actually -- just talk. 

"Doctor?" The nurse has just opened the door to the office. She’s 60 years old, dependable and decidedly more knowledgeable in gynaecology than you are. An inheritance from your father’s practice, Lydia (that’s her name) knows you from when you were 3 or so. She’s like a grandmother to you, but during office ours, you two keep the doctor-nurse playacting alive. "Maria Pruitt has come 15 minutes early, sir. Can she come in?"

"Maria Pruitt?" you ask. You don’t recall that name.

"A new patient, doctor."

- "Oh! Let her come in." [introducingMaria]
- "Just a few more minutes, please." [letHerWait]

--- 
letHerWait

Lydia nods and closes the door. You remember to look for files or receipts from other patients that may be left lying on the table. That would be unprofessional and might scare away the new business. How can they trust you to keep their records safe if they can see the records of others? But there is nothing of note on the table, and you have nothing else to do than wait. (There are administrative tasks to be taken care of, but none of them could be even started under 15 minutes.)

After a while, you call Lydia on the intercom.

- "I’m ready, please let the patient in." [introducingMaria]

--- 
introducingMaria

Maria Pruitt is gorgeous. Also, she says: "I’m here for a preventive examination." There is nothing wrong with her. 

"Your reproductive organs are in perfect shape," you tell her when she’s putting her pants back on. "Congratulations." Maria gives you a smile and a nod. "Thanks, doctor." She’s blushing a little.

"I’m afraid you don’t really need to came back here for a year or so." Your flirty joke makes Maria giggle and she loses the tension and the blush. "O-kay," she says, takes the patient card and leaves. There’s no indication she will be back sooner than in 12 months, but for some reason, you know you’ll be seeing you much sooner. You don’t try to stop her.

Little do you know that in less then 24 hours, you’ll wish you’d never let Maria Pruitt in your office at all.

- Next [goingHome]


--- 
goingHome

(Potka opilce "ktery to zcasti hraje" a pusti se do bitky. Ve skutecnosti jej u toho pozoruje pritel od Marie.)


<classes>
class Enemy {
  List<String> names;
  int speed;
  int hitpoints;

  String get name() => names[0];

  Enemy(String name) {
    names = new List();
    names.add(name);
  }
}

</classes>

<library>
void combatStart(options) {
  // TODO: check for options
  // TODO: save options to persistent variables

  combatTurn();
}
void combatTurn() {
  combatTurnPlayer();
  combatTurnEnemy();
  if (vars["enemy"]!= null && vars["playerLives)"]) {
    combatGenerateOptions();
    nextScript(combatTurn);
  } else
    combatEnd();
}

void combatGenerateOptions() {
  
}

void combatTurnPlayer() {
  // resolve combat
}

void combatTurnEnemy() {
  // resolve combat
}

void combatEnd() {
  // TODO: zhodnotit fight
}
</library>
