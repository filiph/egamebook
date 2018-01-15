import 'dart:convert';

import 'package:built_value/serializer.dart';
import 'package:edgehead/sourcegen/functions_serializer.dart';
import 'package:test/test.dart';

void main() {
  test("simple function serialization works", () {
    FunctionSerializer getSerializer() =>
        new FunctionSerializer<String Function()>({
          "hello": hello,
          "bye": bye,
        });

    Serializers getSerializers() =>
        (new Serializers().toBuilder()..add(getSerializer())).build();

    String str;
    {
      final serializers = getSerializers();
      final object = serializers.serialize(hello);
      str = JSON.encode(object);
    }

    // Simulate completely new load.
    final serializers = getSerializers();
    final json = JSON.decode(str);
    final deserialized = serializers.deserialize(json);
    expect(deserialized(), "Hello.");
  });

  test(
      "serialization of function with custom types "
      "(and side effects) works", () {
    FunctionSerializer getSerializer() =>
        new FunctionSerializer<void Function(A, B)>({
          "functionWithCustomTypes": functionWithCustomTypes,
        });

    Serializers getSerializers() =>
        (new Serializers().toBuilder()..add(getSerializer())).build();

    String str;
    {
      final serializers = getSerializers();
      final object = serializers.serialize(functionWithCustomTypes);
      str = JSON.encode(object);
    }

    // Simulate completely new load.
    final json = JSON.decode(str);
    final deserialized = getSerializers().deserialize(json);
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

class A {
  int x, y;
}

class B {
  int z;
}
