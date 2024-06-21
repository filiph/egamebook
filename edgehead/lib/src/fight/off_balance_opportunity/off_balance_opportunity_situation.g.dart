// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'off_balance_opportunity_situation.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<OffBalanceOpportunitySituation>
    _$offBalanceOpportunitySituationSerializer =
    new _$OffBalanceOpportunitySituationSerializer();

class _$OffBalanceOpportunitySituationSerializer
    implements StructuredSerializer<OffBalanceOpportunitySituation> {
  @override
  final Iterable<Type> types = const [
    OffBalanceOpportunitySituation,
    _$OffBalanceOpportunitySituation
  ];
  @override
  final String wireName = 'OffBalanceOpportunitySituation';

  @override
  Iterable<Object?> serialize(
      Serializers serializers, OffBalanceOpportunitySituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'actorId',
      serializers.serialize(object.actorId, specifiedType: const FullType(int)),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'turn',
      serializers.serialize(object.turn, specifiedType: const FullType(int)),
    ];
    Object? value;
    value = object.culpritId;
    if (value != null) {
      result
        ..add('culpritId')
        ..add(serializers.serialize(value, specifiedType: const FullType(int)));
    }
    return result;
  }

  @override
  OffBalanceOpportunitySituation deserialize(
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new OffBalanceOpportunitySituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'actorId':
          result.actorId = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'culpritId':
          result.culpritId = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int?;
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
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

class _$OffBalanceOpportunitySituation extends OffBalanceOpportunitySituation {
  @override
  final int actorId;
  @override
  final int? culpritId;
  @override
  final int id;
  @override
  final int turn;

  factory _$OffBalanceOpportunitySituation(
          [void Function(OffBalanceOpportunitySituationBuilder)? updates]) =>
      (new OffBalanceOpportunitySituationBuilder()..update(updates))._build();

  _$OffBalanceOpportunitySituation._(
      {required this.actorId,
      this.culpritId,
      required this.id,
      required this.turn})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        actorId, r'OffBalanceOpportunitySituation', 'actorId');
    BuiltValueNullFieldError.checkNotNull(
        id, r'OffBalanceOpportunitySituation', 'id');
    BuiltValueNullFieldError.checkNotNull(
        turn, r'OffBalanceOpportunitySituation', 'turn');
  }

  @override
  OffBalanceOpportunitySituation rebuild(
          void Function(OffBalanceOpportunitySituationBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  OffBalanceOpportunitySituationBuilder toBuilder() =>
      new OffBalanceOpportunitySituationBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is OffBalanceOpportunitySituation &&
        actorId == other.actorId &&
        culpritId == other.culpritId &&
        id == other.id &&
        turn == other.turn;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, actorId.hashCode);
    _$hash = $jc(_$hash, culpritId.hashCode);
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, turn.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'OffBalanceOpportunitySituation')
          ..add('actorId', actorId)
          ..add('culpritId', culpritId)
          ..add('id', id)
          ..add('turn', turn))
        .toString();
  }
}

class OffBalanceOpportunitySituationBuilder
    implements
        Builder<OffBalanceOpportunitySituation,
            OffBalanceOpportunitySituationBuilder> {
  _$OffBalanceOpportunitySituation? _$v;

  int? _actorId;
  int? get actorId => _$this._actorId;
  set actorId(int? actorId) => _$this._actorId = actorId;

  int? _culpritId;
  int? get culpritId => _$this._culpritId;
  set culpritId(int? culpritId) => _$this._culpritId = culpritId;

  int? _id;
  int? get id => _$this._id;
  set id(int? id) => _$this._id = id;

  int? _turn;
  int? get turn => _$this._turn;
  set turn(int? turn) => _$this._turn = turn;

  OffBalanceOpportunitySituationBuilder();

  OffBalanceOpportunitySituationBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _actorId = $v.actorId;
      _culpritId = $v.culpritId;
      _id = $v.id;
      _turn = $v.turn;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(OffBalanceOpportunitySituation other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$OffBalanceOpportunitySituation;
  }

  @override
  void update(void Function(OffBalanceOpportunitySituationBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  OffBalanceOpportunitySituation build() => _build();

  _$OffBalanceOpportunitySituation _build() {
    final _$result = _$v ??
        new _$OffBalanceOpportunitySituation._(
            actorId: BuiltValueNullFieldError.checkNotNull(
                actorId, r'OffBalanceOpportunitySituation', 'actorId'),
            culpritId: culpritId,
            id: BuiltValueNullFieldError.checkNotNull(
                id, r'OffBalanceOpportunitySituation', 'id'),
            turn: BuiltValueNullFieldError.checkNotNull(
                turn, r'OffBalanceOpportunitySituation', 'turn'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
