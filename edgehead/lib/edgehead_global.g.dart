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
  Iterable<Object?> serialize(
      Serializers serializers, EdgeheadGlobalState object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'isInTesterMode',
      serializers.serialize(object.isInTesterMode,
          specifiedType: const FullType(bool)),
    ];

    return result;
  }

  @override
  EdgeheadGlobalState deserialize(
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new EdgeheadGlobalStateBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'isInTesterMode':
          result.isInTesterMode = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
      }
    }

    return result.build();
  }
}

class _$EdgeheadGlobalState extends EdgeheadGlobalState {
  @override
  final bool isInTesterMode;

  factory _$EdgeheadGlobalState(
          [void Function(EdgeheadGlobalStateBuilder)? updates]) =>
      (new EdgeheadGlobalStateBuilder()..update(updates)).build();

  _$EdgeheadGlobalState._({required this.isInTesterMode}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        isInTesterMode, 'EdgeheadGlobalState', 'isInTesterMode');
  }

  @override
  EdgeheadGlobalState rebuild(
          void Function(EdgeheadGlobalStateBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  EdgeheadGlobalStateBuilder toBuilder() =>
      new EdgeheadGlobalStateBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is EdgeheadGlobalState &&
        isInTesterMode == other.isInTesterMode;
  }

  @override
  int get hashCode {
    return $jf($jc(0, isInTesterMode.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('EdgeheadGlobalState')
          ..add('isInTesterMode', isInTesterMode))
        .toString();
  }
}

class EdgeheadGlobalStateBuilder
    implements Builder<EdgeheadGlobalState, EdgeheadGlobalStateBuilder> {
  _$EdgeheadGlobalState? _$v;

  bool? _isInTesterMode;
  bool? get isInTesterMode => _$this._isInTesterMode;
  set isInTesterMode(bool? isInTesterMode) =>
      _$this._isInTesterMode = isInTesterMode;

  EdgeheadGlobalStateBuilder();

  EdgeheadGlobalStateBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _isInTesterMode = $v.isInTesterMode;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(EdgeheadGlobalState other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$EdgeheadGlobalState;
  }

  @override
  void update(void Function(EdgeheadGlobalStateBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  _$EdgeheadGlobalState build() {
    final _$result = _$v ??
        new _$EdgeheadGlobalState._(
            isInTesterMode: BuiltValueNullFieldError.checkNotNull(
                isInTesterMode, 'EdgeheadGlobalState', 'isInTesterMode'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,deprecated_member_use_from_same_package,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
