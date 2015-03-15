import 'package:analyzer/analyzer.dart';
import 'package:analyzer/src/generated/scanner.dart';
import 'package:analyzer/src/generated/parser.dart';

/// Takes variable declaration source string and keeps track of defined
/// variables and their types. Generates code for use in ScripterImpl.
class VarsGenerator {
  final List<TypedVariable> _vars = new List<TypedVariable>();
  final List<AnalysisError> _errors = new List<AnalysisError>();

  /// Receives and analyzes a source String ([src]).
  void addSource(String src) {
    var errorListener = new _ErrorCollector();
    var reader = new CharSequenceReader(src);
    var scanner = new Scanner(null, reader, errorListener);
    var token = scanner.tokenize();
    var parser = new Parser(null, errorListener);
    var unit = parser.parseCompilationUnit(token);

    var visitor = new _TopLevelVariableHarvester();
    unit.accept(visitor);

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

    _errors.addAll(errorListener.errors);
    if (errorListener.errors.isNotEmpty) {
      throw new ArgumentError("There were errors in the source.");
    }
  }

  String createPopulateMethod() {
    final StringBuffer out = new StringBuffer();
    out.writeln("  void populateVarsFromState() {");
    for (TypedVariable variable in _vars) {
      out.writeln("    vars[\"${variable.name}\"] = ${variable.name};");
    }
    out.writeln("  }");
    return out.toString();
  }

  String createExtractMethod() {
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

class TypedVariable {
  final String type;
  final String name;
  TypedVariable(this.name, this.type);
  toString() => "$name ($type)";
}

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

class _ErrorCollector extends AnalysisErrorListener {
  List<AnalysisError> errors;
  _ErrorCollector() : errors = new List<AnalysisError>();
  onError(error) => errors.add(error);
}
