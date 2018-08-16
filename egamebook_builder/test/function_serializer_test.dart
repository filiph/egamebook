import 'dart:convert';

import 'package:built_value/serializer.dart';
import 'package:egamebook_builder/function_serializer.dart';
import 'package:test/test.dart';

void main() {
  test("simple function serialization works", () {
    FunctionSerializer getSerializer() =>
        new FunctionSerializer<StringReturner>({
          "hello": hello,
          "bye": bye,
        });

    Serializers getSerializers() =>
        (new Serializers().toBuilder()..add(getSerializer())).build();

    String str;
    {
      final serializers = getSerializers();
      final object = serializers.serialize(hello,
          specifiedType: const FullType(StringReturner));
      str = json.encode(object);
    }

    // Simulate completely new load.
    final serializers = getSerializers();
    final Object jsonObject = json.decode(str);
    final deserialized = serializers.deserialize(jsonObject,
        specifiedType: const FullType(StringReturner)) as Function;
    expect(deserialized(), "Hello.");
  });

  test(
      "serialization of function with custom types "
      "(and side effects) works", () {
    FunctionSerializer getSerializer() =>
        new FunctionSerializer<CustomTypesFunction>({
          "functionWithCustomTypes": functionWithCustomTypes,
        });

    Serializers getSerializers() =>
        (new Serializers().toBuilder()..add(getSerializer())).build();

    String str;
    {
      final serializers = getSerializers();
      final object = serializers.serialize(functionWithCustomTypes,
          specifiedType: const FullType(CustomTypesFunction));
      str = json.encode(object);
    }

    // Simulate completely new load.
    final Object jsonObject = json.decode(str);
    final deserialized = getSerializers().deserialize(jsonObject,
        specifiedType: const FullType(CustomTypesFunction)) as Function;
    final a = new A()
      ..x = 1
      ..y = 2;
    final b = new B()..z = 42;
    expect(_latestA, isNull);
    deserialized(a, b);
    expect(_latestA, a);
    expect(b.z, a.x);
  });
}

A _latestA;

String bye() => "Bye.";

void functionWithCustomTypes(A a, B b) {
  _latestA = a;
  b.z = a.x;
}

String hello() => "Hello.";

typedef String StringReturner();

typedef void CustomTypesFunction(A a, B b);

class A {
  int x, y;
}

class B {
  int z;
}
