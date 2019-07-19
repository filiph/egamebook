// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'writers_input.compiled.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<GuardpostAboveChurchTakeShieldRescueSituation>
    _$guardpostAboveChurchTakeShieldRescueSituationSerializer =
    new _$GuardpostAboveChurchTakeShieldRescueSituationSerializer();

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
      final dynamic value = iterator.current;
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
    if (id == null) {
      throw new BuiltValueNullFieldError(
          'GuardpostAboveChurchTakeShieldRescueSituation', 'id');
    }
    if (turn == null) {
      throw new BuiltValueNullFieldError(
          'GuardpostAboveChurchTakeShieldRescueSituation', 'turn');
    }
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
    if (_$v != null) {
      _id = _$v.id;
      _turn = _$v.turn;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(GuardpostAboveChurchTakeShieldRescueSituation other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
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
            id: id, turn: turn);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
