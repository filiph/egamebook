// GENERATED CODE - DO NOT MODIFY BY HAND

part of edgehead_global;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class EdgeheadGlobalState
// **************************************************************************

class _$EdgeheadGlobalState extends EdgeheadGlobalState {
  @override
  final bool hasKegOfBeer;
  @override
  final int bloodrockFollowers;

  factory _$EdgeheadGlobalState([void updates(EdgeheadGlobalStateBuilder b)]) =>
      (new EdgeheadGlobalStateBuilder()..update(updates)).build()
          as _$EdgeheadGlobalState;

  _$EdgeheadGlobalState._({this.hasKegOfBeer, this.bloodrockFollowers})
      : super._() {
    if (hasKegOfBeer == null) throw new ArgumentError.notNull('hasKegOfBeer');
    if (bloodrockFollowers == null)
      throw new ArgumentError.notNull('bloodrockFollowers');
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
    return hasKegOfBeer == other.hasKegOfBeer &&
        bloodrockFollowers == other.bloodrockFollowers;
  }

  @override
  int get hashCode {
    return $jf($jc($jc(0, hasKegOfBeer.hashCode), bloodrockFollowers.hashCode));
  }

  @override
  String toString() {
    return 'EdgeheadGlobalState {'
        'hasKegOfBeer=${hasKegOfBeer.toString()},\n'
        'bloodrockFollowers=${bloodrockFollowers.toString()},\n'
        '}';
  }
}

class _$EdgeheadGlobalStateBuilder extends EdgeheadGlobalStateBuilder {
  _$EdgeheadGlobalState _$v;

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

  _$EdgeheadGlobalStateBuilder() : super._();

  EdgeheadGlobalStateBuilder get _$this {
    if (_$v != null) {
      super.hasKegOfBeer = _$v.hasKegOfBeer;
      super.bloodrockFollowers = _$v.bloodrockFollowers;
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
            hasKegOfBeer: hasKegOfBeer, bloodrockFollowers: bloodrockFollowers);
    replace(result);
    return result;
  }
}
