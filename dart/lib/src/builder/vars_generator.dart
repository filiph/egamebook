import 'package:analyzer/analyzer.dart';
import 'package:analyzer/src/generated/scanner.dart';
import 'package:analyzer/src/generated/parser.dart';
import 'dart:collection';

/// Takes variable declaration source String and keeps track of defined
/// variables and their types. [generateExtractMethodCode] and
/// [generatePopulateMethodCode] generate code for use in [ScripterImpl] that
/// substitutes [:dart:mirrors:].
class VarsGenerator {
  final List<TypedVariable> _vars = new List<TypedVariable>();
  UnmodifiableListView _varsView;

  /// Unmodifiable view of the variables present in the code.
  List<TypedVariable> get variables => _varsView;

  VarsGenerator() {
    _varsView = new UnmodifiableListView(_vars);
  }

  /// Receives and analyzes [src] and looks for top level variable declarations,
  /// adding them into the [variables] list. Can be called several times
  /// with separate code blocks.
  ///
  /// Throws when the source code contains a syntax error, or when there are
  /// multiple variables with the same name.
  void addSource(String src) {
    var errorListener = new _ErrorCollector();
    var reader = new CharSequenceReader(src);
    var scanner = new Scanner(null, reader, errorListener);
    var token = scanner.tokenize();
    var parser = new Parser(null, errorListener);
    var unit = parser.parseCompilationUnit(token);

    var visitor = new _TopLevelVariableHarvester();
    unit.accept(visitor);

    if (errorListener.errors.isNotEmpty) {
      throw new ArgumentError("There were errors in the source.");
    }

    List<String> varNames = visitor.vars.map((variable) => variable.name)
        .toList();
    if (varNames.toSet().length < varNames.length) {
      throw new ArgumentError("Duplicate variables defined.");
    }

    for (TypedVariable newVar in visitor.vars) {
      if (_vars.map((variable) => variable.name).contains(newVar.name)) {
        throw new ArgumentError("Variable $newVar already defined.");
      }
    }
    _vars.addAll(visitor.vars);
  }

  /// Generates the code of the [:populateVarsFromState():] method. This
  /// method takes declared variables and creates or updates members of the
  /// [:vars:] Map from them.
  ///
  /// Example output:
  ///
  ///     void populateVarsFromState() {
  ///       vars["bodega"] = bodega;
  ///       vars["isEngineer"] = isEngineer;
  ///       vars["maxPhysicalPoints"] = maxPhysicalPoints;
  ///     }
  String generatePopulateMethodCode() {
    // Note that the method currently generates its output through simple
    // String concatenation. It could build the code from AST, but that
    // would be way too complicated given the simplicity of the output.
    final StringBuffer out = new StringBuffer();
    out.writeln("  void populateVarsFromState() {");
    for (TypedVariable variable in _vars) {
      out.writeln("    vars[\"${variable.name}\"] = ${variable.name};");
    }
    out.writeln("  }");
    return out.toString();
  }

  /// Generates the code of the [:extractStateFromVars():] method. This
  /// method takes values from the [:vars:] Map and updates the declared
  /// variables by them.
  ///
  /// Example output:
  ///
  ///     void extractStateFromVars() {
  ///       bodega = vars["bodega"] as SpaceshipMock;
  ///       isEngineer = vars["isEngineer"] as bool;
  ///       maxPhysicalPoints = vars["maxPhysicalPoints"] as int;
  ///       untypedValue = vars["untypedValue"];
  ///     }
  String generateExtractMethodCode() {
    final StringBuffer out = new StringBuffer();
    out.writeln("  void extractStateFromVars() {");
    for (TypedVariable variable in _vars) {
      out.write("    ${variable.name} = vars[\"${variable.name}\"]");
      if (variable.type != null) {
        out.write(" as ${variable.type}");
      }
      out.writeln(";");
    }
    out.writeln("  }");
    return out.toString();
  }
}

/// A simple struct holding a variable's [name], and [type] (which is
/// [:null:] when the variable is dynamic).
class TypedVariable {
  final String type;
  final String name;
  TypedVariable(this.name, this.type);
  toString() => "$name ($type)";
}

/// A simple visitor that keeps track of top level variable declarations
/// and puts them into [vars].
class _TopLevelVariableHarvester extends GeneralizingAstVisitor {
  List<TypedVariable> vars = new List<TypedVariable>();

  visitNode(AstNode node) {
    if (node is TopLevelVariableDeclaration) {
      final VariableDeclarationList varList = node.variables;
      varList.variables.forEach((VariableDeclaration variable) {
        // TODO: varList.keyword == final : do not add or raise error?
        vars.add(new TypedVariable(variable.name.name,
            varList.type != null ? varList.type.name.name : null));
      });
    }
    return super.visitNode(node);
  }
}

/// Simple class which keeps track of errors.
class _ErrorCollector extends AnalysisErrorListener {
  List<AnalysisError> errors;
  _ErrorCollector() : errors = new List<AnalysisError>();
  onError(error) => errors.add(error);
}
