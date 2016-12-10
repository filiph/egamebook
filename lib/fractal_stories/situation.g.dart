// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class Situation
// **************************************************************************

class _$Situation extends Situation {
  @override
  final int id;
  @override
  final SituationState state;

  factory _$Situation([updates(SituationBuilder b)]) =>
      (new SituationBuilder()..update(updates)).build();

  _$Situation._({this.id, this.state}) : super._() {
    if (id == null) throw new ArgumentError.notNull('id');
    if (state == null) throw new ArgumentError.notNull('state');
  }

  @override
  Situation rebuild(updates(SituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  _$SituationBuilder toBuilder() => new _$SituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! Situation) return false;
    return id == other.id && state == other.state;
  }

  @override
  int get hashCode {
    return $jf($jc($jc(0, id.hashCode), state.hashCode));
  }

  @override
  String toString() {
    return 'Situation {'
        'id=${id.toString()},\n'
        'state=${state.toString()},\n'
        '}';
  }
}

class _$SituationBuilder extends SituationBuilder {
  Situation _$v;

  @override
  int get id {
    _$this;
    return super.id;
  }

  @override
  set id(int id) {
    _$this;
    super.id = id;
  }

  @override
  SituationState get state {
    _$this;
    return super.state;
  }

  @override
  set state(SituationState state) {
    _$this;
    super.state = state;
  }

  _$SituationBuilder() : super._();

  SituationBuilder get _$this {
    if (_$v != null) {
      super.id = _$v.id;
      super.state = _$v.state;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Situation other) {
    _$v = other;
  }

  @override
  void update(updates(SituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  Situation build() {
    final result = _$v ?? new _$Situation._(id: id, state: state);
    replace(result);
    return result;
  }
}
