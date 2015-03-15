
import 'package:unittest/unittest.dart';

import '../lib/src/builder/vars_generator.dart';

void main() {
  group("Variables extractor", () {
    solo_test("extracts", () {
      String code = """
        /// Bodega.
        SpaceshipMock bodega; 
        bool isEngineer, isMedic;// Is engineer or not? Etc.
        /* The max number of points. */
        int maxPhysicalPoints;

        var number;
        """;
      var generator = new VarsGenerator();
      generator.addSource(code);
//      generator.addSource("int bodega;");
      print(generator.createExtractMethod());
      print(generator.createPopulateMethod());
    });
  });

}