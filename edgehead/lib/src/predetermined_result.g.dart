// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'predetermined_result.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const Predetermination _$none = const Predetermination._('none');
const Predetermination _$successGuaranteed =
    const Predetermination._('successGuaranteed');
const Predetermination _$failureGuaranteed =
    const Predetermination._('failureGuaranteed');

Predetermination _$valueOf(String name) {
  switch (name) {
    case 'none':
      return _$none;
    case 'successGuaranteed':
      return _$successGuaranteed;
    case 'failureGuaranteed':
      return _$failureGuaranteed;
    default:
      throw new ArgumentError(name);
  }
}

final BuiltSet<Predetermination> _$values =
    new BuiltSet<Predetermination>(const <Predetermination>[
  _$none,
  _$successGuaranteed,
  _$failureGuaranteed,
]);

Serializer<Predetermination> _$predeterminationSerializer =
    new _$PredeterminationSerializer();

class _$PredeterminationSerializer
    implements PrimitiveSerializer<Predetermination> {
  @override
  final Iterable<Type> types = const <Type>[Predetermination];
  @override
  final String wireName = 'Predetermination';

  @override
  Object serialize(Serializers serializers, Predetermination object,
          {FullType specifiedType = FullType.unspecified}) =>
      object.name;

  @override
  Predetermination deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      Predetermination.valueOf(serialized as String);
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
