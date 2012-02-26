#library('Scripter Implementation');

#import('../egb_library.dart');

class ScripterImpl extends Scripter {

  /* LIBRARY */

  ScripterImpl() : super() {
    pages = [
      /* PAGES & BLOCKS */
      // welcome
      [
        "# Unit testing",
        "A sci-fi thriller featuring a dynamic storyline, swords, and gynaecology.",
        "Written by: Filip Hracek",
        {
        "string":"Start",
        "goto":2
        },
        {
        "string":"Customize your \"character\" first",
        "goto":1
        }
      ],
      // customizeCharacter
      [
        () {
        vars["name"] = "Filip +ěščřžčýĚŠČŘŽÝ";
        },
        "Congratulations, your name is now name.",
        {
        "string":"Start",
        "goto":2
        }
      ],
      // beforeVisit
      [
        "This is it. Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet. ",
        "Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet. ",
        () {
        echo(vars["name"]);
        },
        {
        "string":"Next",
        "goto":3
        }
      ],
      // utf8
      [
        "Please find some crazy utf-8 characters below.",
        "And now back to ASCII!",
        {
        "string":"Go to the beginning.",
        "goto":0
        },
        {
        "string":"End this thing.",
        "goto":4
        }
      ],
      // end
      [
      ]
    ];
  }
}
