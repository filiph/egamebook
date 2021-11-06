// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.serializers;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializers _$serializers = (new Serializers().toBuilder()
      ..add(Choice.serializer)
      ..add(ChoiceBlock.serializer)
      ..add(ErrorElement.serializer)
      ..add(LogElement.serializer)
      ..add(LoseGame.serializer)
      ..add(SaveGame.serializer)
      ..add(SlotMachine.serializer)
      ..add(StatInitialization.serializer)
      ..add(StatUpdate.serializer)
      ..add(TextOutput.serializer)
      ..add(WinGame.serializer)
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(Choice)]),
          () => new ListBuilder<Choice>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(int)]),
          () => new ListBuilder<int>())
      ..addBuilderFactory(
          const FullType(
              BuiltMap, const [const FullType(String), const FullType(String)]),
          () => new MapBuilder<String, String>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(String)]),
          () => new ListBuilder<String>()))
    .build();

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,deprecated_member_use_from_same_package,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
