library vars_generator_test;

import 'package:test/test.dart';

import '../lib/src/builder/vars_generator.dart';

void main() {
  group("Variables extractor", () {
    test("extracts without throwing", () {
      String code = """
        /// Comment.
        SpaceshipMock bodega; 
        bool isEngineer, isMedic;// Another comment.
        /* Third comment. */
        int maxPhysicalPoints;
        var number;
        """;
      var generator = new VarsGenerator();
      expect(() => generator.addSource(code), returnsNormally);
      print(generator.generateExtractMethodCode());
      print(generator.generatePopulateMethodCode());
    });

    test("extracts all variables", () {
      String code = """
        SpaceshipMock bodega; 
        bool isEngineer, isMedic;
        int maxPhysicalPoints;
        var number;
        """;
      var generator = new VarsGenerator();
      generator.addSource(code);
      expect(generator.variables.length, 5);
    });

    test("extracts type", () {
      String code = """
        SpaceshipMock bodega; 
        var number;
        """;
      var generator = new VarsGenerator();
      generator.addSource(code);
      expect(generator.variables.first.type, "SpaceshipMock");
      expect(generator.variables.last.type, null);
    });

    test("throws on bad code", () {
      String code = """
        SpaceshipMock bodega.;
        """;
      var generator = new VarsGenerator();
      expect(() => generator.addSource(code), throwsArgumentError);
    });

    test("throws with duplicate variables in one code block", () {
      String code = """
        SpaceshipMock bodega;
        int something;
        bool bodega;
        """;
      var generator = new VarsGenerator();
      expect(() => generator.addSource(code), throwsArgumentError);
    });

    test("throws with duplicate variables in different blocks", () {
      String code = """
        SpaceshipMock bodega;
        int something;
        """;
      var generator = new VarsGenerator();
      generator.addSource(code);
      String additionalCode = """
        bool bodega;
        """;
      expect(() => generator.addSource(additionalCode), throwsArgumentError);
    });

    test("generates valid methods", () {
      String code = """
        SpaceshipMock bodega = new SpaceshipMock({
          "config": 42,
          "array": [1, 2, null]
        });
        int something = 5;
        var number = null;
        """;

      String extractMethod = """
  void extractStateFromVars() {
    bodega = vars["bodega"] as SpaceshipMock;
    something = vars["something"] as int;
    number = vars["number"];
  }
""";

      String populateMethod = """
  void populateVarsFromState() {
    vars["bodega"] = bodega;
    vars["something"] = something;
    vars["number"] = number;
  }
""";

      String initBlock = """
    bodega = new SpaceshipMock({"config" : 42, "array" : [1, 2, null]});
    something = 5;
    number = null;
""";

      var generator = new VarsGenerator();
      generator.addSource(code);
      String generatedExtractMethod = generator.generateExtractMethodCode();
      expect(generatedExtractMethod.trim(), extractMethod.trim());
      String generatedPopulateMethod = generator.generatePopulateMethodCode();
      expect(generatedPopulateMethod.trim(), populateMethod.trim());
      String generatedInitBlock = generator.generateInitBlockCode();
      expect(generatedInitBlock.trim(), initBlock.trim());
    });
  });

}