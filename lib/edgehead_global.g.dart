// GENERATED CODE - DO NOT MODIFY BY HAND

part of edgehead_global;

// **************************************************************************
// Generator: BuiltValueGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line
// ignore_for_file: annotate_overrides
// ignore_for_file: avoid_annotating_with_dynamic
// ignore_for_file: avoid_returning_this
// ignore_for_file: omit_local_variable_types
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first

Serializer<EdgeheadGlobalState> _$edgeheadGlobalStateSerializer =
    new _$EdgeheadGlobalStateSerializer();

class _$EdgeheadGlobalStateSerializer
    implements StructuredSerializer<EdgeheadGlobalState> {
  @override
  final Iterable<Type> types = const [
    EdgeheadGlobalState,
    _$EdgeheadGlobalState
  ];
  @override
  final String wireName = 'EdgeheadGlobalState';

  @override
  Iterable serialize(Serializers serializers, EdgeheadGlobalState object,
      {FullType specifiedType: FullType.unspecified}) {
    return <Object>[];
  }

  @override
  EdgeheadGlobalState deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    return new EdgeheadGlobalStateBuilder().build();
  }
}

class _$EdgeheadGlobalState extends EdgeheadGlobalState {
  factory _$EdgeheadGlobalState([void updates(EdgeheadGlobalStateBuilder b)]) =>
      (new EdgeheadGlobalStateBuilder()..update(updates)).build();

  _$EdgeheadGlobalState._() : super._();

  @override
  EdgeheadGlobalState rebuild(void updates(EdgeheadGlobalStateBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  EdgeheadGlobalStateBuilder toBuilder() =>
      new EdgeheadGlobalStateBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! EdgeheadGlobalState) return false;
    return true;
  }

  @override
  int get hashCode {
    return 712033461;
  }

  @override
  String toString() {
    return newBuiltValueToStringHelper('EdgeheadGlobalState').toString();
  }
}

class EdgeheadGlobalStateBuilder
    implements Builder<EdgeheadGlobalState, EdgeheadGlobalStateBuilder> {
  _$EdgeheadGlobalState _$v;

  EdgeheadGlobalStateBuilder();

  @override
  void replace(EdgeheadGlobalState other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$EdgeheadGlobalState;
  }

  @override
  void update(void updates(EdgeheadGlobalStateBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$EdgeheadGlobalState build() {
    final _$result = _$v ?? new _$EdgeheadGlobalState._();
    replace(_$result);
    return _$result;
  }
}
