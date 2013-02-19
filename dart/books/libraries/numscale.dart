library numscale;

import 'dart:async';
import '../../lib/src/persistence/saveable.dart';

/**
 * NumScale defines a range of numerical values and 
 */
class NumScale implements Saveable {
  NumScale({this.min: 0, this.max: 100, initialValue}) {
    if (min == max) throw new ArgumentError("Max cannot be same as min.");
    if (initialValue != null) {
      _value = initialValue;
    } else {
      _value = max;
    }
    _streamController = new StreamController.broadcast();
    _stream = _streamController.stream;
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
  
  num get percentage => (_value - min) / (max - min);
  set percentage(num percentage) =>
        value = min + percentage * (max - min);
  
  StreamController _streamController;
  Stream<num> _stream;
  
  Stream onMin() {
    return _stream.where((v) => v == min);
  }
  
  Stream onMax() {
    return _stream.where((v) => v == max);
  }
  Stream onPass(num passValue) =>
      _stream.where((v) =>
          v <= passValue && passValue < _lastValue ||
          _lastValue < passValue && passValue <= v);
  Stream onPassDownwards(num passValue) => 
      _stream.where((v) => v <= passValue && passValue < _lastValue);
  Stream onPassUpwards(num passValue) =>
      _stream.where((v) => _lastValue < passValue && passValue <= v);
  
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
