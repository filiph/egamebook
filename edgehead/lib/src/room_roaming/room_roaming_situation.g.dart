// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'room_roaming_situation.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<RoomRoamingSituation> _$roomRoamingSituationSerializer =
    new _$RoomRoamingSituationSerializer();

class _$RoomRoamingSituationSerializer
    implements StructuredSerializer<RoomRoamingSituation> {
  @override
  final Iterable<Type> types = const [
    RoomRoamingSituation,
    _$RoomRoamingSituation
  ];
  @override
  final String wireName = 'RoomRoamingSituation';

  @override
  Iterable<Object?> serialize(
      Serializers serializers, RoomRoamingSituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'currentRoomName',
      serializers.serialize(object.currentRoomName,
          specifiedType: const FullType(String)),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'monstersAlive',
      serializers.serialize(object.monstersAlive,
          specifiedType: const FullType(bool)),
      'turn',
      serializers.serialize(object.turn, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  RoomRoamingSituation deserialize(
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new RoomRoamingSituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'currentRoomName':
          result.currentRoomName = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'monstersAlive':
          result.monstersAlive = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'turn':
          result.turn = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
      }
    }

    return result.build();
  }
}

class _$RoomRoamingSituation extends RoomRoamingSituation {
  @override
  final String currentRoomName;
  @override
  final int id;
  @override
  final bool monstersAlive;
  @override
  final int turn;

  factory _$RoomRoamingSituation(
          [void Function(RoomRoamingSituationBuilder)? updates]) =>
      (new RoomRoamingSituationBuilder()..update(updates))._build();

  _$RoomRoamingSituation._(
      {required this.currentRoomName,
      required this.id,
      required this.monstersAlive,
      required this.turn})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        currentRoomName, r'RoomRoamingSituation', 'currentRoomName');
    BuiltValueNullFieldError.checkNotNull(id, r'RoomRoamingSituation', 'id');
    BuiltValueNullFieldError.checkNotNull(
        monstersAlive, r'RoomRoamingSituation', 'monstersAlive');
    BuiltValueNullFieldError.checkNotNull(
        turn, r'RoomRoamingSituation', 'turn');
  }

  @override
  RoomRoamingSituation rebuild(
          void Function(RoomRoamingSituationBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  RoomRoamingSituationBuilder toBuilder() =>
      new RoomRoamingSituationBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is RoomRoamingSituation &&
        currentRoomName == other.currentRoomName &&
        id == other.id &&
        monstersAlive == other.monstersAlive &&
        turn == other.turn;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, currentRoomName.hashCode);
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, monstersAlive.hashCode);
    _$hash = $jc(_$hash, turn.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'RoomRoamingSituation')
          ..add('currentRoomName', currentRoomName)
          ..add('id', id)
          ..add('monstersAlive', monstersAlive)
          ..add('turn', turn))
        .toString();
  }
}

class RoomRoamingSituationBuilder
    implements Builder<RoomRoamingSituation, RoomRoamingSituationBuilder> {
  _$RoomRoamingSituation? _$v;

  String? _currentRoomName;
  String? get currentRoomName => _$this._currentRoomName;
  set currentRoomName(String? currentRoomName) =>
      _$this._currentRoomName = currentRoomName;

  int? _id;
  int? get id => _$this._id;
  set id(int? id) => _$this._id = id;

  bool? _monstersAlive;
  bool? get monstersAlive => _$this._monstersAlive;
  set monstersAlive(bool? monstersAlive) =>
      _$this._monstersAlive = monstersAlive;

  int? _turn;
  int? get turn => _$this._turn;
  set turn(int? turn) => _$this._turn = turn;

  RoomRoamingSituationBuilder();

  RoomRoamingSituationBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _currentRoomName = $v.currentRoomName;
      _id = $v.id;
      _monstersAlive = $v.monstersAlive;
      _turn = $v.turn;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(RoomRoamingSituation other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$RoomRoamingSituation;
  }

  @override
  void update(void Function(RoomRoamingSituationBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  RoomRoamingSituation build() => _build();

  _$RoomRoamingSituation _build() {
    final _$result = _$v ??
        new _$RoomRoamingSituation._(
            currentRoomName: BuiltValueNullFieldError.checkNotNull(
                currentRoomName, r'RoomRoamingSituation', 'currentRoomName'),
            id: BuiltValueNullFieldError.checkNotNull(
                id, r'RoomRoamingSituation', 'id'),
            monstersAlive: BuiltValueNullFieldError.checkNotNull(
                monstersAlive, r'RoomRoamingSituation', 'monstersAlive'),
            turn: BuiltValueNullFieldError.checkNotNull(
                turn, r'RoomRoamingSituation', 'turn'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
