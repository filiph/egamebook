// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'edgehead_global.dart';

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
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'isInTesterMode':
          result.isInTesterMode = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
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
      (new EdgeheadGlobalStateBuilder()..update(updates))._build();

  _$EdgeheadGlobalState._({required this.isInTesterMode}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        isInTesterMode, r'EdgeheadGlobalState', 'isInTesterMode');
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
    var _$hash = 0;
    _$hash = $jc(_$hash, isInTesterMode.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'EdgeheadGlobalState')
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
  EdgeheadGlobalState build() => _build();

  _$EdgeheadGlobalState _build() {
    final _$result = _$v ??
        new _$EdgeheadGlobalState._(
            isInTesterMode: BuiltValueNullFieldError.checkNotNull(
                isInTesterMode, r'EdgeheadGlobalState', 'isInTesterMode'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
