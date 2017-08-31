// GENERATED CODE - DO NOT MODIFY BY HAND

part of edgehead_global;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class EdgeheadGlobalState
// **************************************************************************

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
    return 'EdgeheadGlobalState {'
        'bloodrockFollowers=${bloodrockFollowers.toString()},\n'
        'brianaQuoteIndex=${brianaQuoteIndex.toString()},\n'
        'hasKegOfBeer=${hasKegOfBeer.toString()},\n'
        '}';
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
    final result = _$v ??
        new _$EdgeheadGlobalState._(
            bloodrockFollowers: bloodrockFollowers,
            brianaQuoteIndex: brianaQuoteIndex,
            hasKegOfBeer: hasKegOfBeer);
    replace(result);
    return result;
  }
}
