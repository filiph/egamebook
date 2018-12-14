// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.command.pick_choice;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<PickChoice> _$pickChoiceSerializer = new _$PickChoiceSerializer();

class _$PickChoiceSerializer implements StructuredSerializer<PickChoice> {
  @override
  final Iterable<Type> types = const [PickChoice, _$PickChoice];
  @override
  final String wireName = 'PickChoice';

  @override
  Iterable serialize(Serializers serializers, PickChoice object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'choice',
      serializers.serialize(object.choice,
          specifiedType: const FullType(Choice)),
    ];

    return result;
  }

  @override
  PickChoice deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new PickChoiceBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'choice':
          result.choice.replace(serializers.deserialize(value,
              specifiedType: const FullType(Choice)) as Choice);
          break;
      }
    }

    return result.build();
  }
}

class _$PickChoice extends PickChoice {
  @override
  final Choice choice;

  factory _$PickChoice([void updates(PickChoiceBuilder b)]) =>
      (new PickChoiceBuilder()..update(updates)).build();

  _$PickChoice._({this.choice}) : super._() {
    if (choice == null) {
      throw new BuiltValueNullFieldError('PickChoice', 'choice');
    }
  }

  @override
  PickChoice rebuild(void updates(PickChoiceBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  PickChoiceBuilder toBuilder() => new PickChoiceBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PickChoice && choice == other.choice;
  }

  @override
  int get hashCode {
    return $jf($jc(0, choice.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('PickChoice')..add('choice', choice))
        .toString();
  }
}

class PickChoiceBuilder implements Builder<PickChoice, PickChoiceBuilder> {
  _$PickChoice _$v;

  ChoiceBuilder _choice;
  ChoiceBuilder get choice => _$this._choice ??= new ChoiceBuilder();
  set choice(ChoiceBuilder choice) => _$this._choice = choice;

  PickChoiceBuilder();

  PickChoiceBuilder get _$this {
    if (_$v != null) {
      _choice = _$v.choice?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PickChoice other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$PickChoice;
  }

  @override
  void update(void updates(PickChoiceBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$PickChoice build() {
    _$PickChoice _$result;
    try {
      _$result = _$v ?? new _$PickChoice._(choice: choice.build());
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'choice';
        choice.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'PickChoice', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
