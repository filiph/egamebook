library stranded.history.rule;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/history/history.dart';
import 'package:meta/meta.dart';

part 'rule_history.g.dart';

abstract class RuleHistory implements Built<RuleHistory, RuleHistoryBuilder> {
  static Serializer<RuleHistory> get serializer => _$ruleHistorySerializer;

  factory RuleHistory([void updates(RuleHistoryBuilder b)]) = _$RuleHistory;

  RuleHistory._();

  BuiltMap<int, RuleRecord> get records;

  SingleQueryResult<RuleRecord> query(int ruleId) {
    return SingleQueryResult(records[ruleId]);
  }
}

abstract class RuleRecord
    implements Record, Built<RuleRecord, RuleRecordBuilder> {
  static Serializer<RuleRecord> get serializer => _$ruleRecordSerializer;

  factory RuleRecord({@required int ruleId, @required DateTime time}) =
      _$RuleRecord._;

  RuleRecord._();

  int get ruleId;

  @override
  DateTime get time;
}
