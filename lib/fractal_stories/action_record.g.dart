// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.action_record;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class ActionRecord
// **************************************************************************

class _$ActionRecord extends ActionRecord {
  @override
  final BuiltSet<int> accomplices;
  @override
  final String actionClass;
  @override
  final String description;
  @override
  final KnownToMode knownTo;
  @override
  final int protagonist;
  @override
  final BuiltSet<int> sufferers;
  @override
  final int time;
  @override
  final bool wasAggressive;
  @override
  final bool wasFailure;
  @override
  final bool wasSuccess;

  factory _$ActionRecord([updates(ActionRecordBuilder b)]) =>
      (new ActionRecordBuilder()..update(updates)).build();

  _$ActionRecord._(
      {this.accomplices,
      this.actionClass,
      this.description,
      this.knownTo,
      this.protagonist,
      this.sufferers,
      this.time,
      this.wasAggressive,
      this.wasFailure,
      this.wasSuccess})
      : super._() {
    if (accomplices == null) throw new ArgumentError.notNull('accomplices');
    if (actionClass == null) throw new ArgumentError.notNull('actionClass');
    if (description == null) throw new ArgumentError.notNull('description');
    if (knownTo == null) throw new ArgumentError.notNull('knownTo');
    if (protagonist == null) throw new ArgumentError.notNull('protagonist');
    if (sufferers == null) throw new ArgumentError.notNull('sufferers');
    if (time == null) throw new ArgumentError.notNull('time');
    if (wasAggressive == null) throw new ArgumentError.notNull('wasAggressive');
    if (wasFailure == null) throw new ArgumentError.notNull('wasFailure');
    if (wasSuccess == null) throw new ArgumentError.notNull('wasSuccess');
  }

  @override
  ActionRecord rebuild(updates(ActionRecordBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  ActionRecordBuilder toBuilder() => new ActionRecordBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! ActionRecord) return false;
    return accomplices == other.accomplices &&
        actionClass == other.actionClass &&
        description == other.description &&
        knownTo == other.knownTo &&
        protagonist == other.protagonist &&
        sufferers == other.sufferers &&
        time == other.time &&
        wasAggressive == other.wasAggressive &&
        wasFailure == other.wasFailure &&
        wasSuccess == other.wasSuccess;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc(
                $jc(
                    $jc(
                        $jc(
                            $jc(
                                $jc(
                                    $jc($jc(0, accomplices.hashCode),
                                        actionClass.hashCode),
                                    description.hashCode),
                                knownTo.hashCode),
                            protagonist.hashCode),
                        sufferers.hashCode),
                    time.hashCode),
                wasAggressive.hashCode),
            wasFailure.hashCode),
        wasSuccess.hashCode));
  }

  @override
  String toString() {
    return 'ActionRecord {'
        'accomplices=${accomplices.toString()},\n'
        'actionClass=${actionClass.toString()},\n'
        'description=${description.toString()},\n'
        'knownTo=${knownTo.toString()},\n'
        'protagonist=${protagonist.toString()},\n'
        'sufferers=${sufferers.toString()},\n'
        'time=${time.toString()},\n'
        'wasAggressive=${wasAggressive.toString()},\n'
        'wasFailure=${wasFailure.toString()},\n'
        'wasSuccess=${wasSuccess.toString()},\n'
        '}';
  }
}

class ActionRecordBuilder
    implements Builder<ActionRecord, ActionRecordBuilder> {
  ActionRecord _$v;

  SetBuilder<int> _accomplices;
  SetBuilder<int> get accomplices =>
      _$this._accomplices ??= new SetBuilder<int>();
  set accomplices(SetBuilder<int> accomplices) =>
      _$this._accomplices = accomplices;

  String _actionClass;
  String get actionClass => _$this._actionClass;
  set actionClass(String actionClass) => _$this._actionClass = actionClass;

  String _description;
  String get description => _$this._description;
  set description(String description) => _$this._description = description;

  KnownToMode _knownTo;
  KnownToMode get knownTo => _$this._knownTo;
  set knownTo(KnownToMode knownTo) => _$this._knownTo = knownTo;

  int _protagonist;
  int get protagonist => _$this._protagonist;
  set protagonist(int protagonist) => _$this._protagonist = protagonist;

  SetBuilder<int> _sufferers;
  SetBuilder<int> get sufferers => _$this._sufferers ??= new SetBuilder<int>();
  set sufferers(SetBuilder<int> sufferers) => _$this._sufferers = sufferers;

  int _time;
  int get time => _$this._time;
  set time(int time) => _$this._time = time;

  bool _wasAggressive;
  bool get wasAggressive => _$this._wasAggressive;
  set wasAggressive(bool wasAggressive) =>
      _$this._wasAggressive = wasAggressive;

  bool _wasFailure;
  bool get wasFailure => _$this._wasFailure;
  set wasFailure(bool wasFailure) => _$this._wasFailure = wasFailure;

  bool _wasSuccess;
  bool get wasSuccess => _$this._wasSuccess;
  set wasSuccess(bool wasSuccess) => _$this._wasSuccess = wasSuccess;

  ActionRecordBuilder();

  ActionRecordBuilder get _$this {
    if (_$v != null) {
      _accomplices = _$v.accomplices?.toBuilder();
      _actionClass = _$v.actionClass;
      _description = _$v.description;
      _knownTo = _$v.knownTo;
      _protagonist = _$v.protagonist;
      _sufferers = _$v.sufferers?.toBuilder();
      _time = _$v.time;
      _wasAggressive = _$v.wasAggressive;
      _wasFailure = _$v.wasFailure;
      _wasSuccess = _$v.wasSuccess;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ActionRecord other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other;
  }

  @override
  void update(updates(ActionRecordBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  ActionRecord build() {
    final result = _$v ??
        new _$ActionRecord._(
            accomplices: accomplices?.build(),
            actionClass: actionClass,
            description: description,
            knownTo: knownTo,
            protagonist: protagonist,
            sufferers: sufferers?.build(),
            time: time,
            wasAggressive: wasAggressive,
            wasFailure: wasFailure,
            wasSuccess: wasSuccess);
    replace(result);
    return result;
  }
}
