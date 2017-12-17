library built_value_type_error;

import 'package:built_value/built_value.dart';

part 'built_value_type_error.g.dart';

abstract class A<T> implements Built<A<T>, ABuilder<T>> {
  factory A([updates(ABuilder<T> b)]) = _$A<T>;
  A._();

  T get foo;
  int get i;
}
//
////abstract class ABuilder<T> implements Builder<A<T>, ABuilder<T>> {
////  int i;
////  T foo;
////
////  factory ABuilder() = _$ABuilder<T>;
////  ABuilder._();
////}
//
//abstract class ABuilder implements Builder<A, ABuilder> {
//  int i;
//  T foo;
//
//  factory ABuilder() = _$ABuilder;
//  ABuilder._();
//}
