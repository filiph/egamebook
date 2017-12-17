// GENERATED CODE - DO NOT MODIFY BY HAND

part of built_value_type_error;

// **************************************************************************
// Generator: BuiltValueGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line
// ignore_for_file: annotate_overrides
// ignore_for_file: avoid_annotating_with_dynamic
// ignore_for_file: avoid_returning_this
// ignore_for_file: omit_local_variable_types
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first

class _$A<T> extends A<T> {
  @override
  final T foo;
  @override
  final int i;

  factory _$A([void updates(ABuilder<T> b)]) =>
      (new ABuilder<T>()..update(updates)).build();

  _$A._({this.foo, this.i}) : super._() {
    if (foo == null) throw new ArgumentError.notNull('foo');
    if (i == null) throw new ArgumentError.notNull('i');
  }

  @override
  A<T> rebuild(void updates(ABuilder<T> b)) =>
      (toBuilder()..update(updates)).build();

  @override
  ABuilder<T> toBuilder() => new ABuilder<T>()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! A) return false;
    return foo == other.foo && i == other.i;
  }

  @override
  int get hashCode {
    return $jf($jc($jc(0, foo.hashCode), i.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('A')..add('foo', foo)..add('i', i))
        .toString();
  }
}

class ABuilder<T> implements Builder<A<T>, ABuilder<T>> {
  _$A<T> _$v;

  T _foo;
  T get foo => _$this._foo;
  set foo(T foo) => _$this._foo = foo;

  int _i;
  int get i => _$this._i;
  set i(int i) => _$this._i = i;

  ABuilder() {
    if (T == dynamic)
      throw new ArgumentError.value(
          'dynamic', 'T', 'All type arguments must be specified.');
  }

  ABuilder<T> get _$this {
    if (_$v != null) {
      _foo = _$v.foo;
      _i = _$v.i;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(A<T> other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$A<T>;
  }

  @override
  void update(void updates(ABuilder<T> b)) {
    if (updates != null) updates(this);
  }

  @override
  _$A<T> build() {
    final _$result = _$v ?? new _$A<T>._(foo: foo, i: i);
    replace(_$result);
    return _$result;
  }
}
