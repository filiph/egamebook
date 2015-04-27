library scripter_typedefs;
import 'package:egamebook/src/shared/user_interaction.dart';
import 'package:egamebook/src/shared/form.dart';

/**
 * A compendium of typedefs to [EgbScripter]'s top-level functions such as
 * [:echo:] and [:goto:].
 */

/// Corresponds to [EgbScripter.extractStateFromVars].
typedef void ExtractStateFromVarsFunction();

/// Corresponds to [EgbScripter.goto].
typedef void GotoFunction(String pageName);

/// Corresponds to [EgbScripter.echo].
typedef void EchoFunction(String str);

/// Corresponds to [EgbScripter.choice].
typedef EgbChoice ChoiceFunction(String string, {String goto, Function script,
    String submenu, bool deferToEndOfPage, bool deferToChoiceList});

/// Corresponds to [EgbScripter.showForm].
typedef void ShowFormFunction(Form form);

// TODO: add nextScript(), repeatBlock() _only_ if necessary