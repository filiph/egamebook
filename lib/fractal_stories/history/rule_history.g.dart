// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.history.rule;

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

class _$RuleHistory extends RuleHistory {
  @override
  final BuiltMap<int, RuleRecord> records;

  factory _$RuleHistory([void updates(RuleHistoryBuilder b)]) =>
      (new RuleHistoryBuilder()..update(updates)).build();

  _$RuleHistory._({this.records}) : super._() {
    if (records == null) throw new ArgumentError.notNull('records');
  }

  @override
  RuleHistory rebuild(void updates(RuleHistoryBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  RuleHistoryBuilder toBuilder() => new RuleHistoryBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! RuleHistory) return false;
    return records == other.records;
  }

  @override
  int get hashCode {
    return $jf($jc(0, records.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('RuleHistory')..add('records', records))
        .toString();
  }
}

class RuleHistoryBuilder implements Builder<RuleHistory, RuleHistoryBuilder> {
  _$RuleHistory _$v;

  MapBuilder<int, RuleRecord> _records;
  MapBuilder<int, RuleRecord> get records =>
      _$this._records ??= new MapBuilder<int, RuleRecord>();
  set records(MapBuilder<int, RuleRecord> records) => _$this._records = records;

  RuleHistoryBuilder();

  RuleHistoryBuilder get _$this {
    if (_$v != null) {
      _records = _$v.records?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(RuleHistory other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$RuleHistory;
  }

  @override
  void update(void updates(RuleHistoryBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$RuleHistory build() {
    final _$result = _$v ?? new _$RuleHistory._(records: records?.build());
    replace(_$result);
    return _$result;
  }
}
