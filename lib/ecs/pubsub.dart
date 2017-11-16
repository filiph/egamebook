class Pubsub<C, T> {
  final Map<C, List<_Callback<T>>> _channels = {};

  void publish(C channel, T message) {
    for (final _Callback<T> cb in _channels[channel]) {
      try {
        cb(message);
      } catch (e) {
        print(e);
      }
    }
  }

  void subscribe(C channel, _Callback<T> cb) {
    _channels.putIfAbsent(channel, () => <_Callback<T>>[]).add(cb);
  }

  void unsubscribe(C channel, _Callback<T> fun) {
    if (_channels[channel] != null) {
      _channels[channel].remove(fun);
    }
  }
}

typedef _Callback<T> = void Function(T);
