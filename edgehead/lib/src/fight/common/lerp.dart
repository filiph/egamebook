/// Remaps [value] within the range [min]-[max] to the output range
/// [outMin]-[outMax].
///
/// Taken from https://github.com/munificent/hauberk/blob/master/lib/src/engine/core/math.dart.
double lerpDouble(num value, num min, num max, double outMin, double outMax) {
  assert(min < max);

  if (value <= min) return outMin;
  if (value >= max) return outMax;

  var t = (value - min) / (max - min);
  return outMin + t * (outMax - outMin);
}
