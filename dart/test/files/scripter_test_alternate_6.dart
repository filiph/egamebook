#library('Scripter Implementation');

#import('../../lib/src/egb_library.dart');
#import('dart:math');

class A {
  int i;
}

class ScripterImpl extends Scripter {

  /* LIBRARY */


  ScripterImpl() : super() {
    pageHandles = {
      r"""ggg""": 7,
      r"""bbb""": 1,
      r"""xxx""": 2,
      r"""fff""": 6,
      r"""dddeee""": 5,
      r"""aaa""": 0,
      r"""zzz""": 3,
      r"""ccc""": 4,
    };

    pages = [
      /* PAGES & BLOCKS */
      // aaa
      [
        """Starting. Setting time to 0.""",
        () {
  time = 0;
        },
        {
          "string": r"""ABC """,
          "goto": r"""bbb"""
        },
        {
          "string": r"""CDE """,
          "goto": r"""xxx"""
        }
      ],
      // bbb
      [
        """Blah.""",
        {
          "string": r"""efger """,
          "goto": r"""zzz"""
        },
        {
          "string": r"""gegreg """,
          "goto": r"""ccc"""
        }
      ],
      // xxx
      [
        """Shouldn't reach this!"""
      ],
      // zzz
      [
        """Shouldn't reach this, neither!"""
      ],
      // ccc
      [
        () {
          echo("""Increasing time by 1 to ${time++}.""");
        },
        {
          "string": r"""egreger """,
          "goto": r"""dddeee"""
        },
        {
          "string": r"""ervfvcx """,
          "goto": r"""zzz"""
        }
      ],
      // dddeee
      [
        () {
          echo("""Welcome (back?) to dddeee. Time is now $time. Increasing by 1.""");
        },
        () {
time++;
        },
        {
          "string": r"""evdfvdv """,
          "goto": r"""fff"""
        },
        {
          "string": r"""loop """,
          "goto": r"""dddeee"""
        }
      ],
      // fff
      [
        {
          "string": r"""back """,
          "goto": r"""dddeee"""
        },
        {
          "string": r"""end """,
          "goto": r"""ggg"""
        }
      ],
      // ggg
      [
        """End of book."""
      ]
    ];
  }
  /* INIT */
  void initBlock() {


  }
}
