#library('Scripter Implementation');

#import('../egb_library.dart');
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


class ScripterImpl extends Scripter {

  /* LIBRARY */

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
    ScripterImpl() : super() {
      pages = [
        /* PAGES & BLOCKS */
              // welcome
      [
        "# Thin Ice",
        "A sci-fi thriller featuring a dynamic storyline, swords, and vaginas.",
        "Written by: Filip Hracek",
        () {
        vars["eyeColor"]= "black";
        },
        {
        "string":"Start",
        "goto":2
        },
        {
        "string":"Customize your character first",
        "goto":1
        }
      ],
      // customizeCharacter
      [
        "What is your eye&rsquo;s color?",
        () {
        choice("Black", showNow:true).then(() { vars["eyeColor"]= "black"; });
        choice("Blue", showNow:true).then(() { vars["eyeColor"]= "blue"; });
        choice("Brown", showNow:true).then(() { vars["eyeColor"]= "brown"; });
        choice("Gray", showNow:true).then(() { vars["eyeColor"]= "gray"; });
        choice("Green", showNow:true).then(() { vars["eyeColor"]= "green"; });
        },
        {
        "string":"Start",
        "goto":2
        }
      ],
      // beforeVisit
      [
        "Contrary to popular belief, being a young gynaecologist isn&rsquo;t the bachelor&rsquo;s dream occupation. Most women won&rsquo;t be attracted to a guy when the first thing he sees of them is their vagina. But no matter how often you explain this to your friends, they will always think you&rsquo;re living the life of a hip-hop star. &quot;name is the man!&quot; they say. Maybe they suppose that seeing a woman&rsquo;s privates keeps being exciting even after 2 years of practice? It doesn&rsquo;t. In fact, sometimes you&rsquo;d rather be a dentist and look into people&rsquo;s throats, a rectum specialist and stare into other&rsquo;s assholes, or a psychologist and dive into their horrible, filthy minds.",
        "There _are_ bright moments, you must admit. Preventive examinations. Young ladies with charm and no actual pathology. You prefer when there&rsquo;s no reason for spreading legs, actually -- just talk. ",
        "&quot;Doctor?&quot; The nurse has just opened the door to the office. She&rsquo;s 60 years old, dependable and decidedly more knowledgeable in gynaecology than you are. An inheritance from your father&rsquo;s practice, Lydia (that&rsquo;s her name) knows you from when you were 3 or so. She&rsquo;s like a grandmother to you, but during office ours, you two keep the doctor-nurse playacting alive. &quot;Maria Pruitt has come 15 minutes early, sir. Can she come in?&quot;",
        "&quot;Maria Pruitt?&quot; you ask. You don&rsquo;t recall that name.",
        "&quot;A new patient, doctor.&quot;",
        {
        "string":"&quot;Oh! Let her come in.&quot;",
        "goto":4
        },
        {
        "string":"&quot;Just a few more minutes, please.&quot;",
        "goto":3
        }
      ],
      // letHerWait
      [
        "Lydia nods and closes the door. You remember to look for files or receipts from other patients that may be left lying on the table. That would be unprofessional and might scare away the new business. How can they trust you to keep their records safe if they can see the records of others? But there is nothing of note on the table, and you have nothing else to do than wait. (There are administrative tasks to be taken care of, but none of them could be even started under 15 minutes.)",
        "After a while, you call Lydia on the intercom.",
        {
        "string":"&quot;I&rsquo;m ready, please let the patient in.&quot;",
        "goto":4
        }
      ],
      // introducingMaria
      [
        "Maria Pruitt is gorgeous. Also, she says: &quot;I&rsquo;m here for a preventive examination.&quot; There is nothing wrong with her. ",
        "&quot;Your reproductive organs are in perfect shape,&quot; you tell her when she&rsquo;s putting her pants back on. &quot;Congratulations.&quot; Maria gives you a smile and a nod. &quot;Thanks, doctor.&quot; She&rsquo;s blushing a little.",
        "&quot;I&rsquo;m afraid you don&rsquo;t really need to came back here for a year or so.&quot; Your flirty joke makes Maria giggle and she loses the tension and the blush. &quot;O-kay,&quot; she says, takes the patient card and leaves. There&rsquo;s no indication she will be back sooner than in 12 months, but for some reason, you know you&rsquo;ll be seeing you much sooner. You don&rsquo;t try to stop her.",
        "Little do you know that in less then 24 hours, you&rsquo;ll wish you&rsquo;d never let Maria Pruitt in your office at all.",
        {
        "string":"Next",
        "goto":5
        }
      ],
      // goingHome
      [
        "(Potka opilce &quot;ktery to zcasti hraje&quot; a pusti se do bitky. Ve skutecnosti jej u toho pozoruje pritel od Marie.)"
      ]
        ];
    }
}
