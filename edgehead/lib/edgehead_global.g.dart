// GENERATED CODE - DO NOT MODIFY BY HAND

part of edgehead_global;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

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
      {FullType specifiedType = FullType.unspecified}) {
    return <Object>[];
  }

  @override
  EdgeheadGlobalState deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
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
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is EdgeheadGlobalState;
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
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
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

// ignore_for_file: always_put_control_body_on_new_line,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
