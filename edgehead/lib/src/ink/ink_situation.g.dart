// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ink_situation.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<InkSituation> _$inkSituationSerializer =
    new _$InkSituationSerializer();

class _$InkSituationSerializer implements StructuredSerializer<InkSituation> {
  @override
  final Iterable<Type> types = const [InkSituation, _$InkSituation];
  @override
  final String wireName = 'InkSituation';

  @override
  Iterable<Object> serialize(Serializers serializers, InkSituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'currentPath',
      serializers.serialize(object.currentPath,
          specifiedType:
              const FullType(BuiltList, const [const FullType(int)])),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'inkAstName',
      serializers.serialize(object.inkAstName,
          specifiedType: const FullType(String)),
      'turn',
      serializers.serialize(object.turn, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  InkSituation deserialize(Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new InkSituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'currentPath':
          result.currentPath.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(int)]))
              as BuiltList<Object>);
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'inkAstName':
          result.inkAstName = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
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

class _$InkSituation extends InkSituation {
  @override
  final BuiltList<int> currentPath;
  @override
  final int id;
  @override
  final String inkAstName;
  @override
  final int turn;

  factory _$InkSituation([void Function(InkSituationBuilder) updates]) =>
      (new InkSituationBuilder()..update(updates)).build();

  _$InkSituation._({this.currentPath, this.id, this.inkAstName, this.turn})
      : super._() {
    if (currentPath == null) {
      throw new BuiltValueNullFieldError('InkSituation', 'currentPath');
    }
    if (id == null) {
      throw new BuiltValueNullFieldError('InkSituation', 'id');
    }
    if (inkAstName == null) {
      throw new BuiltValueNullFieldError('InkSituation', 'inkAstName');
    }
    if (turn == null) {
      throw new BuiltValueNullFieldError('InkSituation', 'turn');
    }
  }

  @override
  InkSituation rebuild(void Function(InkSituationBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  InkSituationBuilder toBuilder() => new InkSituationBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is InkSituation &&
        currentPath == other.currentPath &&
        id == other.id &&
        inkAstName == other.inkAstName &&
        turn == other.turn;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, currentPath.hashCode), id.hashCode),
            inkAstName.hashCode),
        turn.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('InkSituation')
          ..add('currentPath', currentPath)
          ..add('id', id)
          ..add('inkAstName', inkAstName)
          ..add('turn', turn))
        .toString();
  }
}

class InkSituationBuilder
    implements Builder<InkSituation, InkSituationBuilder> {
  _$InkSituation _$v;

  ListBuilder<int> _currentPath;
  ListBuilder<int> get currentPath =>
      _$this._currentPath ??= new ListBuilder<int>();
  set currentPath(ListBuilder<int> currentPath) =>
      _$this._currentPath = currentPath;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  String _inkAstName;
  String get inkAstName => _$this._inkAstName;
  set inkAstName(String inkAstName) => _$this._inkAstName = inkAstName;

  int _turn;
  int get turn => _$this._turn;
  set turn(int turn) => _$this._turn = turn;

  InkSituationBuilder();

  InkSituationBuilder get _$this {
    if (_$v != null) {
      _currentPath = _$v.currentPath?.toBuilder();
      _id = _$v.id;
      _inkAstName = _$v.inkAstName;
      _turn = _$v.turn;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(InkSituation other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$InkSituation;
  }

  @override
  void update(void Function(InkSituationBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$InkSituation build() {
    _$InkSituation _$result;
    try {
      _$result = _$v ??
          new _$InkSituation._(
              currentPath: currentPath.build(),
              id: id,
              inkAstName: inkAstName,
              turn: turn);
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'currentPath';
        currentPath.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'InkSituation', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
