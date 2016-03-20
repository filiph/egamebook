library scripter_typedefs;

import 'package:egamebook/src/shared/user_interaction.dart';
import 'package:egamebook/src/shared/form.dart';

/**
 * A compendium of typedefs to [Scripter]'s top-level functions such as
 * [:echo:] and [:goto:].
 */

/// Corresponds to [Scripter.extractStateFromVars].
typedef void ExtractStateFromVarsFunction();

/// Corresponds to [Scripter.goto].
typedef void GotoFunction(String pageName);

/// Corresponds to [Scripter.echo].
typedef void EchoFunction(String str);

/// Corresponds to [Scripter.choice].
typedef Choice ChoiceFunction(String string,
    {String goto,
    Function script,
    String submenu,
    bool deferToEndOfPage,
    bool deferToChoiceList});

/// Corresponds to [Scripter.showForm].
typedef void ShowFormFunction(Form form);

// TODO: add nextScript(), repeatBlock() _only_ if necessary
