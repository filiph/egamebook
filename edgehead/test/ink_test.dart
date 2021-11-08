// @dart=2.9

import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/ink_ast.dart';
import 'package:test/test.dart';

void main() {
  group("AST", () {
    final exampleAst = InkAst([
      // #0
      InkParagraphNode(_write('I come to a closed door.')),
      // #1
      InkForkNode([
        // #1 #0
        InkChoiceNode(
          command: 'Open the door',
          consequence: [
            // #1 #0 #0
            InkParagraphNode(_write('Nothing interesting behind it.')),
            // #1 #0 #1
            InkParagraphNode(_write('Hmm...')),
          ],
        ),
        // #1 #1
        InkChoiceNode(
          command: 'Search the surroundings',
          consequence: [
            // #1 #1 #0
            InkParagraphNode(_write('Nope. The surroundings are devoid '
                'of anything interesting.')),
          ],
        ),
      ]),
      // #2
      InkParagraphNode(_write('I shrug and leave.'))
    ]);

    test("walking straight sequence works", () {
      const path = [0];
      final next = exampleAst.getNextPosition(path);
      expect(next, orderedEquals(<int>[1]));
    });

    test("returns [] at end", () {
      const path = [2];
      final next = exampleAst.getNextPosition(path);
      expect(next, isEmpty);
    });

    test("continues inside choice consequences", () {
      const path = [1, 0, 0];
      final next = exampleAst.getNextPosition(path);
      expect(next, orderedEquals(<int>[1, 0, 1]));
    });

    test("jumps out of a fork at the end of choice consequences", () {
      const path = [1, 0, 1];
      final next = exampleAst.getNextPosition(path);
      expect(next, orderedEquals(<int>[2]));
    });
  });
}

/// Helper that makes it easier to add text to an [InkParagraphNode].
void Function(ActionContext) _write(String text) =>
    (ActionContext c) => c.outputStoryline.add(text, wholeSentence: true);
