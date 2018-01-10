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
    final result = <Object>[
      'bloodrockFollowers',
      serializers.serialize(object.bloodrockFollowers,
          specifiedType: const FullType(int)),
      'brianaQuoteIndex',
      serializers.serialize(object.brianaQuoteIndex,
          specifiedType: const FullType(int)),
      'hasKegOfBeer',
      serializers.serialize(object.hasKegOfBeer,
          specifiedType: const FullType(bool)),
    ];

    return result;
  }

  @override
  EdgeheadGlobalState deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new EdgeheadGlobalStateBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'bloodrockFollowers':
          result.bloodrockFollowers = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'brianaQuoteIndex':
          result.brianaQuoteIndex = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'hasKegOfBeer':
          result.hasKegOfBeer = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
      }
    }

    return result.build();
  }
}

class _$EdgeheadGlobalState extends EdgeheadGlobalState {
  @override
  final int bloodrockFollowers;
  @override
  final int brianaQuoteIndex;
  @override
  final bool hasKegOfBeer;

  factory _$EdgeheadGlobalState([void updates(EdgeheadGlobalStateBuilder b)]) =>
      (new EdgeheadGlobalStateBuilder()..update(updates)).build()
          as _$EdgeheadGlobalState;

  _$EdgeheadGlobalState._(
      {this.bloodrockFollowers, this.brianaQuoteIndex, this.hasKegOfBeer})
      : super._() {
    if (bloodrockFollowers == null)
      throw new ArgumentError.notNull('bloodrockFollowers');
    if (brianaQuoteIndex == null)
      throw new ArgumentError.notNull('brianaQuoteIndex');
    if (hasKegOfBeer == null) throw new ArgumentError.notNull('hasKegOfBeer');
  }

  @override
  EdgeheadGlobalState rebuild(void updates(EdgeheadGlobalStateBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  _$EdgeheadGlobalStateBuilder toBuilder() =>
      new _$EdgeheadGlobalStateBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! EdgeheadGlobalState) return false;
    return bloodrockFollowers == other.bloodrockFollowers &&
        brianaQuoteIndex == other.brianaQuoteIndex &&
        hasKegOfBeer == other.hasKegOfBeer;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc(0, bloodrockFollowers.hashCode), brianaQuoteIndex.hashCode),
        hasKegOfBeer.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('EdgeheadGlobalState')
          ..add('bloodrockFollowers', bloodrockFollowers)
          ..add('brianaQuoteIndex', brianaQuoteIndex)
          ..add('hasKegOfBeer', hasKegOfBeer))
        .toString();
  }
}

class _$EdgeheadGlobalStateBuilder extends EdgeheadGlobalStateBuilder {
  _$EdgeheadGlobalState _$v;

  @override
  int get bloodrockFollowers {
    _$this;
    return super.bloodrockFollowers;
  }

  @override
  set bloodrockFollowers(int bloodrockFollowers) {
    _$this;
    super.bloodrockFollowers = bloodrockFollowers;
  }

  @override
  int get brianaQuoteIndex {
    _$this;
    return super.brianaQuoteIndex;
  }

  @override
  set brianaQuoteIndex(int brianaQuoteIndex) {
    _$this;
    super.brianaQuoteIndex = brianaQuoteIndex;
  }

  @override
  bool get hasKegOfBeer {
    _$this;
    return super.hasKegOfBeer;
  }

  @override
  set hasKegOfBeer(bool hasKegOfBeer) {
    _$this;
    super.hasKegOfBeer = hasKegOfBeer;
  }

  _$EdgeheadGlobalStateBuilder() : super._();

  EdgeheadGlobalStateBuilder get _$this {
    if (_$v != null) {
      super.bloodrockFollowers = _$v.bloodrockFollowers;
      super.brianaQuoteIndex = _$v.brianaQuoteIndex;
      super.hasKegOfBeer = _$v.hasKegOfBeer;
      _$v = null;
    }
    return this;
  }

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
    final _$result = _$v ??
        new _$EdgeheadGlobalState._(
            bloodrockFollowers: bloodrockFollowers,
            brianaQuoteIndex: brianaQuoteIndex,
            hasKegOfBeer: hasKegOfBeer);
    replace(_$result);
    return _$result;
  }
}
