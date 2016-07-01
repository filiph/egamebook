import 'package:analyzer/analyzer.dart';
import 'package:analyzer/src/generated/scanner.dart';
import 'package:analyzer/src/generated/parser.dart';
import 'dart:collection';

/// Takes variable declaration source String and keeps track of defined
/// variables and their types. [generateExtractMethodCode] and
/// [generatePopulateMethodCode] generate code for use in [ScripterImpl] that
/// substitutes [:dart:mirrors:].
class VarsGenerator {
  /// List of [TypedVariable]s.
  final List<TypedVariable> _vars = new List<TypedVariable>();
  UnmodifiableListView _varsView;

  /// Unmodifiable view of the variables present in the code.
  List<TypedVariable> get variables => _varsView;

  /// Creates new VarsGenerator.
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
      throw new ArgumentError("There were errors in the source: \n\n$src\n\n "
          "${errorListener.errors.map((error) =>
              "${error.message} (${error.offset} ${error.errorCode})")}");
    }

    List<String> varNames =
        visitor.vars.map((variable) => variable.name).toList();
    if (varNames.toSet().length < varNames.length) {
      throw new ArgumentError("Duplicate variables defined.");
    }

    for (TypedVariable newVar in visitor.vars) {
      if (_vars.map((variable) => variable.name).contains(newVar.name)) {
        throw new ArgumentError("Variable $newVar already defined in previous "
            "code blocks.");
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

  /// Generates the code to be added to initBlock in order to initialize all
  /// the variables that are otherwise only initialized when Scripter is
  /// constructed.
  String generateInitBlockCode() {
    final StringBuffer out = new StringBuffer();
    for (TypedVariable variable in _vars) {
      out.write("    ${variable.name} = ${variable.initializer};\n");
    }
    return out.toString();
  }
}

/// A simple struct holding a variable's [name], and [type] (which is
/// [:null:] when the variable is dynamic).
class TypedVariable {
  /// Variable type.
  final String type;

  /// Variable name.
  final String name;

  /// Variable initializer.
  final String initializer;

  /// Creates new TypedVariable with [name], [type] and [initializer].
  TypedVariable(this.name, this.type, this.initializer);

  /// Returns String representation of TypedVariable with its [name] and [type].
  String toString() => "$name ($type)";
}

/// A simple visitor that keeps track of top level variable declarations
/// and puts them into [vars].
class _TopLevelVariableHarvester extends GeneralizingAstVisitor<Object> {
  /// List of [TypedVariable]s.
  List<TypedVariable> vars = new List<TypedVariable>();

  Object visitNode(AstNode node) {
    if (node is TopLevelVariableDeclaration) {
      final VariableDeclarationList varList = node.variables;
      varList.variables.forEach((VariableDeclaration variable) {
        String initializer = variable.initializer != null
            ? variable.initializer.toSource()
            : null;
        // TODO: varList.keyword == final : do not add or raise error?
        vars.add(new TypedVariable(variable.name.name,
            varList.type != null ? varList.type.name.name : null, initializer));
      });
    }
    return super.visitNode(node);
  }
}

/// Simple class which keeps track of errors.
class _ErrorCollector extends AnalysisErrorListener {
  /// List of errors.
  List<AnalysisError> errors;

  /// Creates new _ErrorCollector.
  _ErrorCollector() : errors = new List<AnalysisError>();

  /// Called on [error].
  void onError(error) => errors.add(error);
}
