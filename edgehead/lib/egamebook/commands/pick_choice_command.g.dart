// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'pick_choice_command.dart';

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
      final key = iterator.current! as String;
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
      (new PickChoiceBuilder()..update(updates))._build();

  _$PickChoice._({required this.choice}) : super._() {
    BuiltValueNullFieldError.checkNotNull(choice, r'PickChoice', 'choice');
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
    var _$hash = 0;
    _$hash = $jc(_$hash, choice.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'PickChoice')..add('choice', choice))
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
  PickChoice build() => _build();

  _$PickChoice _build() {
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
            r'PickChoice', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
