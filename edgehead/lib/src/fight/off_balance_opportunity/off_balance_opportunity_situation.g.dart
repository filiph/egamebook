// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.off_balance_situation;

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
  Iterable serialize(
      Serializers serializers, OffBalanceOpportunitySituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'actorId',
      serializers.serialize(object.actorId, specifiedType: const FullType(int)),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'time',
      serializers.serialize(object.time, specifiedType: const FullType(int)),
    ];
    if (object.culpritId != null) {
      result
        ..add('culpritId')
        ..add(serializers.serialize(object.culpritId,
            specifiedType: const FullType(int)));
    }

    return result;
  }

  @override
  OffBalanceOpportunitySituation deserialize(
      Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new OffBalanceOpportunitySituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'actorId':
          result.actorId = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'culpritId':
          result.culpritId = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'time':
          result.time = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
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
  final int culpritId;
  @override
  final int id;
  @override
  final int time;

  factory _$OffBalanceOpportunitySituation(
          [void updates(OffBalanceOpportunitySituationBuilder b)]) =>
      (new OffBalanceOpportunitySituationBuilder()..update(updates)).build();

  _$OffBalanceOpportunitySituation._(
      {this.actorId, this.culpritId, this.id, this.time})
      : super._() {
    if (actorId == null) {
      throw new BuiltValueNullFieldError(
          'OffBalanceOpportunitySituation', 'actorId');
    }
    if (id == null) {
      throw new BuiltValueNullFieldError(
          'OffBalanceOpportunitySituation', 'id');
    }
    if (time == null) {
      throw new BuiltValueNullFieldError(
          'OffBalanceOpportunitySituation', 'time');
    }
  }

  @override
  OffBalanceOpportunitySituation rebuild(
          void updates(OffBalanceOpportunitySituationBuilder b)) =>
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
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, actorId.hashCode), culpritId.hashCode), id.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('OffBalanceOpportunitySituation')
          ..add('actorId', actorId)
          ..add('culpritId', culpritId)
          ..add('id', id)
          ..add('time', time))
        .toString();
  }
}

class OffBalanceOpportunitySituationBuilder
    implements
        Builder<OffBalanceOpportunitySituation,
            OffBalanceOpportunitySituationBuilder> {
  _$OffBalanceOpportunitySituation _$v;

  int _actorId;
  int get actorId => _$this._actorId;
  set actorId(int actorId) => _$this._actorId = actorId;

  int _culpritId;
  int get culpritId => _$this._culpritId;
  set culpritId(int culpritId) => _$this._culpritId = culpritId;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _time;
  int get time => _$this._time;
  set time(int time) => _$this._time = time;

  OffBalanceOpportunitySituationBuilder();

  OffBalanceOpportunitySituationBuilder get _$this {
    if (_$v != null) {
      _actorId = _$v.actorId;
      _culpritId = _$v.culpritId;
      _id = _$v.id;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(OffBalanceOpportunitySituation other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$OffBalanceOpportunitySituation;
  }

  @override
  void update(void updates(OffBalanceOpportunitySituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$OffBalanceOpportunitySituation build() {
    final _$result = _$v ??
        new _$OffBalanceOpportunitySituation._(
            actorId: actorId, culpritId: culpritId, id: id, time: time);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
