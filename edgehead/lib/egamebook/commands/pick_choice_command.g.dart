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
  Iterable<Object?> serialize(Serializers serializers, PickChoice object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'choice',
      serializers.serialize(object.choice,
          specifiedType: const FullType(Choice)),
    ];

    return result;
  }

  @override
  PickChoice deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new PickChoiceBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'choice':
          result.choice.replace(serializers.deserialize(value,
              specifiedType: const FullType(Choice))! as Choice);
          break;
      }
    }

    return result.build();
  }
}

class _$PickChoice extends PickChoice {
  @override
  final Choice choice;

  factory _$PickChoice([void Function(PickChoiceBuilder)? updates]) =>
      (new PickChoiceBuilder()..update(updates)).build();

  _$PickChoice._({required this.choice}) : super._() {
    BuiltValueNullFieldError.checkNotNull(choice, 'PickChoice', 'choice');
  }

  @override
  PickChoice rebuild(void Function(PickChoiceBuilder) updates) =>
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
  _$PickChoice? _$v;

  ChoiceBuilder? _choice;
  ChoiceBuilder get choice => _$this._choice ??= new ChoiceBuilder();
  set choice(ChoiceBuilder? choice) => _$this._choice = choice;

  PickChoiceBuilder();

  PickChoiceBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _choice = $v.choice.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PickChoice other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$PickChoice;
  }

  @override
  void update(void Function(PickChoiceBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  _$PickChoice build() {
    _$PickChoice _$result;
    try {
      _$result = _$v ?? new _$PickChoice._(choice: choice.build());
    } catch (_) {
      late String _$failedField;
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

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,deprecated_member_use_from_same_package,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
