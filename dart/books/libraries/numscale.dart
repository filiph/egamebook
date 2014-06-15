library numscale;

import 'dart:async';
import 'package:egamebook/src/persistence/saveable.dart';

/**
 * NumScale defines a range of numerical values and 
 */
class NumScale implements Saveable {
  NumScale({this.min: 0, this.max: 100, initialValue}) {
    if (initialValue != null) {
      _value = initialValue;
    } else {
      _value = max;
    }
    _lastValue = _value;
    _streamController = new StreamController(sync: true);
    _stream = _streamController.stream.asBroadcastStream();
  }
  
  num get value => _value;
  
  set value(num v) {
    if (v <= min) {
      v = min;
    } else if (v >= max) {
      v = max;
    }
    if (v == _value) return;
    _lastValue = _value;
    _value = v;
    _streamController.add(v);
  }
  
  num _lastValue;
  num _value;
  
  final num min;
  final num max;
  
  void setMax() {
    value = max;
  }
  void setMin() {
    value = min;
  }
  
  /// The 'length' of the scale, from min to max.
  num get range => (max - min).abs();
  
  num get percentage {
    if (max - min == 0) return 1.0;
    return (_value - min) / (max - min);
  }
  set percentage(num percentage) =>
        value = min + percentage * (max - min);
  
  bool get isNonZero => _value != 0;
  
  StreamController _streamController;
  Stream<num> _stream;
  
  Stream<num> onMin() {
    return _stream.where((v) => v == min);
  }
  
  Stream<num> onMax() {
    return _stream.where((v) => v == max);
  }
  Stream<num> onPass(num passValue) =>
      _stream.where((v) =>
          v <= passValue && passValue < _lastValue ||
          _lastValue < passValue && passValue <= v);
  Stream<num> onPassDownwards(num passValue) => 
      _stream.where((v) => v <= passValue && passValue < _lastValue);
  Stream<num> onPassUpwards(num passValue) =>
      _stream.where((v) => _lastValue < passValue && passValue <= v);
  
  /// Same as [_stream], but instead of reporting values, it reports _changes_
  /// in values; 
  Stream<num> get changesStream =>
      _stream.map((num v) => v - _lastValue);
  
  Stream<num> onChangeBy(num percentage) {
    return _stream.where((v) => (v - _lastValue).abs() / range > percentage);
  }
  Stream<num> onDownwardsChangeBy(num percentage) =>
      onChangeBy(percentage).where((v) => v < _lastValue);
  Stream<num> onUpwardsChangeBy(num percentage) =>
      onChangeBy(percentage).where((v) => v > _lastValue);
  
  final className = "NumScale";
  toMap() => {"min": min, "max": max, "value": _value};
  updateFromMap(map) {
    _value = map["value"];
    // TODO: min, max
  }
}

/**
 * IntScale is the same as NumScale, but only takes integer values.
 */

class IntScale extends NumScale {
  IntScale({int min: 0, int max: 100, int initialValue})
      : super(min: min, max: max, initialValue: initialValue);
  
  int get value => super.value;
  
  set value(int v) {
    super.value = v;
  }
  
  set percentage(num percentage) =>
      value = (min + percentage * (max - min)).toInt();
  
  final className = "IntScale";
}
