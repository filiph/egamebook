import 'package:built_value/built_value.dart';

part 'element_base.g.dart';

/// The super class of all book elements that are streamed to the UI.
///
/// These elements are streamed from the `Scripter` as output of the book.
/// Types include text, lists of choices, but also errors. Different UIs can
/// choose to display the elements in different ways (or not at all).
///
/// See built_value's polymorphism example to learn more about the [BuiltValue]
/// annotation:
/// https://github.com/google/built_value.dart/blob/master/example/lib/polymorphism.dart#L36
@BuiltValue(instantiable: false)
abstract class ElementBase {}
