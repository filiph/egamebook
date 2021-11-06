// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'writers_input.compiled.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<ReservoirDamWheelLeftRescueSituation>
    _$reservoirDamWheelLeftRescueSituationSerializer =
    new _$ReservoirDamWheelLeftRescueSituationSerializer();
Serializer<ReservoirDamWheelRightRescueSituation>
    _$reservoirDamWheelRightRescueSituationSerializer =
    new _$ReservoirDamWheelRightRescueSituationSerializer();
Serializer<GuardpostAboveChurchTakeShieldRescueSituation>
    _$guardpostAboveChurchTakeShieldRescueSituationSerializer =
    new _$GuardpostAboveChurchTakeShieldRescueSituationSerializer();

class _$ReservoirDamWheelLeftRescueSituationSerializer
    implements StructuredSerializer<ReservoirDamWheelLeftRescueSituation> {
  @override
  final Iterable<Type> types = const [
    ReservoirDamWheelLeftRescueSituation,
    _$ReservoirDamWheelLeftRescueSituation
  ];
  @override
  final String wireName = 'ReservoirDamWheelLeftRescueSituation';

  @override
  Iterable<Object> serialize(
      Serializers serializers, ReservoirDamWheelLeftRescueSituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'turn',
      serializers.serialize(object.turn, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  ReservoirDamWheelLeftRescueSituation deserialize(
      Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ReservoirDamWheelLeftRescueSituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final Object value = iterator.current;
      switch (key) {
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'turn':
          result.turn = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
      }
    }

    return result.build();
  }
}

class _$ReservoirDamWheelRightRescueSituationSerializer
    implements StructuredSerializer<ReservoirDamWheelRightRescueSituation> {
  @override
  final Iterable<Type> types = const [
    ReservoirDamWheelRightRescueSituation,
    _$ReservoirDamWheelRightRescueSituation
  ];
  @override
  final String wireName = 'ReservoirDamWheelRightRescueSituation';

  @override
  Iterable<Object> serialize(
      Serializers serializers, ReservoirDamWheelRightRescueSituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'turn',
      serializers.serialize(object.turn, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  ReservoirDamWheelRightRescueSituation deserialize(
      Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ReservoirDamWheelRightRescueSituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final Object value = iterator.current;
      switch (key) {
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'turn':
          result.turn = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
      }
    }

    return result.build();
  }
}

class _$GuardpostAboveChurchTakeShieldRescueSituationSerializer
    implements
        StructuredSerializer<GuardpostAboveChurchTakeShieldRescueSituation> {
  @override
  final Iterable<Type> types = const [
    GuardpostAboveChurchTakeShieldRescueSituation,
    _$GuardpostAboveChurchTakeShieldRescueSituation
  ];
  @override
  final String wireName = 'GuardpostAboveChurchTakeShieldRescueSituation';

  @override
  Iterable<Object> serialize(Serializers serializers,
      GuardpostAboveChurchTakeShieldRescueSituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'turn',
      serializers.serialize(object.turn, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  GuardpostAboveChurchTakeShieldRescueSituation deserialize(
      Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new GuardpostAboveChurchTakeShieldRescueSituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final Object value = iterator.current;
      switch (key) {
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'turn':
          result.turn = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
      }
    }

    return result.build();
  }
}

class _$ReservoirDamWheelLeftRescueSituation
    extends ReservoirDamWheelLeftRescueSituation {
  @override
  final int id;
  @override
  final int turn;

  factory _$ReservoirDamWheelLeftRescueSituation(
          [void Function(ReservoirDamWheelLeftRescueSituationBuilder)
              updates]) =>
      (new ReservoirDamWheelLeftRescueSituationBuilder()..update(updates))
          .build();

  _$ReservoirDamWheelLeftRescueSituation._({this.id, this.turn}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        id, 'ReservoirDamWheelLeftRescueSituation', 'id');
    BuiltValueNullFieldError.checkNotNull(
        turn, 'ReservoirDamWheelLeftRescueSituation', 'turn');
  }

  @override
  ReservoirDamWheelLeftRescueSituation rebuild(
          void Function(ReservoirDamWheelLeftRescueSituationBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ReservoirDamWheelLeftRescueSituationBuilder toBuilder() =>
      new ReservoirDamWheelLeftRescueSituationBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ReservoirDamWheelLeftRescueSituation &&
        id == other.id &&
        turn == other.turn;
  }

  @override
  int get hashCode {
    return $jf($jc($jc(0, id.hashCode), turn.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('ReservoirDamWheelLeftRescueSituation')
          ..add('id', id)
          ..add('turn', turn))
        .toString();
  }
}

class ReservoirDamWheelLeftRescueSituationBuilder
    implements
        Builder<ReservoirDamWheelLeftRescueSituation,
            ReservoirDamWheelLeftRescueSituationBuilder> {
  _$ReservoirDamWheelLeftRescueSituation _$v;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _turn;
  int get turn => _$this._turn;
  set turn(int turn) => _$this._turn = turn;

  ReservoirDamWheelLeftRescueSituationBuilder();

  ReservoirDamWheelLeftRescueSituationBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _turn = $v.turn;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ReservoirDamWheelLeftRescueSituation other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$ReservoirDamWheelLeftRescueSituation;
  }

  @override
  void update(
      void Function(ReservoirDamWheelLeftRescueSituationBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$ReservoirDamWheelLeftRescueSituation build() {
    final _$result = _$v ??
        new _$ReservoirDamWheelLeftRescueSituation._(
            id: BuiltValueNullFieldError.checkNotNull(
                id, 'ReservoirDamWheelLeftRescueSituation', 'id'),
            turn: BuiltValueNullFieldError.checkNotNull(
                turn, 'ReservoirDamWheelLeftRescueSituation', 'turn'));
    replace(_$result);
    return _$result;
  }
}

class _$ReservoirDamWheelRightRescueSituation
    extends ReservoirDamWheelRightRescueSituation {
  @override
  final int id;
  @override
  final int turn;

  factory _$ReservoirDamWheelRightRescueSituation(
          [void Function(ReservoirDamWheelRightRescueSituationBuilder)
              updates]) =>
      (new ReservoirDamWheelRightRescueSituationBuilder()..update(updates))
          .build();

  _$ReservoirDamWheelRightRescueSituation._({this.id, this.turn}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        id, 'ReservoirDamWheelRightRescueSituation', 'id');
    BuiltValueNullFieldError.checkNotNull(
        turn, 'ReservoirDamWheelRightRescueSituation', 'turn');
  }

  @override
  ReservoirDamWheelRightRescueSituation rebuild(
          void Function(ReservoirDamWheelRightRescueSituationBuilder)
              updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ReservoirDamWheelRightRescueSituationBuilder toBuilder() =>
      new ReservoirDamWheelRightRescueSituationBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ReservoirDamWheelRightRescueSituation &&
        id == other.id &&
        turn == other.turn;
  }

  @override
  int get hashCode {
    return $jf($jc($jc(0, id.hashCode), turn.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('ReservoirDamWheelRightRescueSituation')
          ..add('id', id)
          ..add('turn', turn))
        .toString();
  }
}

class ReservoirDamWheelRightRescueSituationBuilder
    implements
        Builder<ReservoirDamWheelRightRescueSituation,
            ReservoirDamWheelRightRescueSituationBuilder> {
  _$ReservoirDamWheelRightRescueSituation _$v;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _turn;
  int get turn => _$this._turn;
  set turn(int turn) => _$this._turn = turn;

  ReservoirDamWheelRightRescueSituationBuilder();

  ReservoirDamWheelRightRescueSituationBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _turn = $v.turn;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ReservoirDamWheelRightRescueSituation other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$ReservoirDamWheelRightRescueSituation;
  }

  @override
  void update(
      void Function(ReservoirDamWheelRightRescueSituationBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$ReservoirDamWheelRightRescueSituation build() {
    final _$result = _$v ??
        new _$ReservoirDamWheelRightRescueSituation._(
            id: BuiltValueNullFieldError.checkNotNull(
                id, 'ReservoirDamWheelRightRescueSituation', 'id'),
            turn: BuiltValueNullFieldError.checkNotNull(
                turn, 'ReservoirDamWheelRightRescueSituation', 'turn'));
    replace(_$result);
    return _$result;
  }
}

class _$GuardpostAboveChurchTakeShieldRescueSituation
    extends GuardpostAboveChurchTakeShieldRescueSituation {
  @override
  final int id;
  @override
  final int turn;

  factory _$GuardpostAboveChurchTakeShieldRescueSituation(
          [void Function(GuardpostAboveChurchTakeShieldRescueSituationBuilder)
              updates]) =>
      (new GuardpostAboveChurchTakeShieldRescueSituationBuilder()
            ..update(updates))
          .build();

  _$GuardpostAboveChurchTakeShieldRescueSituation._({this.id, this.turn})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        id, 'GuardpostAboveChurchTakeShieldRescueSituation', 'id');
    BuiltValueNullFieldError.checkNotNull(
        turn, 'GuardpostAboveChurchTakeShieldRescueSituation', 'turn');
  }

  @override
  GuardpostAboveChurchTakeShieldRescueSituation rebuild(
          void Function(GuardpostAboveChurchTakeShieldRescueSituationBuilder)
              updates) =>
      (toBuilder()..update(updates)).build();

  @override
  GuardpostAboveChurchTakeShieldRescueSituationBuilder toBuilder() =>
      new GuardpostAboveChurchTakeShieldRescueSituationBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is GuardpostAboveChurchTakeShieldRescueSituation &&
        id == other.id &&
        turn == other.turn;
  }

  @override
  int get hashCode {
    return $jf($jc($jc(0, id.hashCode), turn.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(
            'GuardpostAboveChurchTakeShieldRescueSituation')
          ..add('id', id)
          ..add('turn', turn))
        .toString();
  }
}

class GuardpostAboveChurchTakeShieldRescueSituationBuilder
    implements
        Builder<GuardpostAboveChurchTakeShieldRescueSituation,
            GuardpostAboveChurchTakeShieldRescueSituationBuilder> {
  _$GuardpostAboveChurchTakeShieldRescueSituation _$v;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _turn;
  int get turn => _$this._turn;
  set turn(int turn) => _$this._turn = turn;

  GuardpostAboveChurchTakeShieldRescueSituationBuilder();

  GuardpostAboveChurchTakeShieldRescueSituationBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _turn = $v.turn;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(GuardpostAboveChurchTakeShieldRescueSituation other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$GuardpostAboveChurchTakeShieldRescueSituation;
  }

  @override
  void update(
      void Function(GuardpostAboveChurchTakeShieldRescueSituationBuilder)
          updates) {
    if (updates != null) updates(this);
  }

  @override
  _$GuardpostAboveChurchTakeShieldRescueSituation build() {
    final _$result = _$v ??
        new _$GuardpostAboveChurchTakeShieldRescueSituation._(
            id: BuiltValueNullFieldError.checkNotNull(
                id, 'GuardpostAboveChurchTakeShieldRescueSituation', 'id'),
            turn: BuiltValueNullFieldError.checkNotNull(
                turn, 'GuardpostAboveChurchTakeShieldRescueSituation', 'turn'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,deprecated_member_use_from_same_package,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
