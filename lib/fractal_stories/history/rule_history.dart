library stranded.history.rule;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/history/history.dart';

part 'rule_history.g.dart';

abstract class RuleHistory implements Built<RuleHistory, RuleHistoryBuilder> {
  factory RuleHistory([void updates(RuleHistoryBuilder b)]) = _$RuleHistory;

  RuleHistory._();

  BuiltMap<int, RuleRecord> get records;

  SingleQueryResult<RuleRecord> query(int ruleId) {
    return new SingleQueryResult(records[ruleId]);
  }
}

class RuleRecord implements Record {
  int ruleId;

  @override
  DateTime time;

  RuleRecord(this.ruleId, this.time);
}
