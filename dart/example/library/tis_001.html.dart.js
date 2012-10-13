function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 === (void 0) ? 'Exception' : 'Exception: ' + $.S(t1);
 }
};

$$.FutureImpl = {"":
 ["_completionListeners", "_exceptionHandlers", "_successListeners", "_exceptionHandled", "_exception", "_value", "_isComplete"],
 super: "Object",
 _setException$1: function(exception) {
  if (exception === (void 0)) throw $.captureStackTrace($.IllegalArgumentException$1((void 0)));
  if (this._isComplete === true) throw $.captureStackTrace($.FutureAlreadyCompleteException$0());
  this._exception = exception;
  this._complete$0();
 },
 _setValue$1: function(value) {
  if (this._isComplete === true) throw $.captureStackTrace($.FutureAlreadyCompleteException$0());
  this._value = value;
  this._complete$0();
 },
 _complete$0: function() {
  this._isComplete = true;
  try {
    if (!(this._exception === (void 0))) {
      for (var t1 = $.iterator(this._exceptionHandlers); t1.hasNext$0() === true; ) {
        var handler = t1.next$0();
        if ($.eqB(handler.$call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    }
    if (this.get$hasValue() === true) {
      for (t1 = $.iterator(this._successListeners); t1.hasNext$0() === true; ) {
        var listener = t1.next$0();
        listener.$call$1(this.get$value());
      }
    } else {
      if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0)) throw $.captureStackTrace(this._exception);
    }
  } finally {
    for (t1 = $.iterator(this._completionListeners); t1.hasNext$0() === true; ) {
      var listener0 = t1.next$0();
      try {
        listener0.$call$1(this);
      } catch (exception) {
        $.unwrapException(exception);
      }
    }
  }
 },
 handleException$1: function(onException) {
  if (this._exceptionHandled === true) return;
  if (this._isComplete === true) {
    if (!$.eqNullB(this._exception)) this._exceptionHandled = onException.$call$1(this._exception);
  } else $.add$1(this._exceptionHandlers, onException);
 },
 then$1: function(onSuccess) {
  if (this.get$hasValue() === true) onSuccess.$call$1(this.get$value());
  else {
    if (this.get$isComplete() !== true) $.add$1(this._successListeners, onSuccess);
    else {
      if (this._exceptionHandled !== true) throw $.captureStackTrace(this._exception);
    }
  }
 },
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception === (void 0);
 },
 get$isComplete: function() {
  return this._isComplete;
 },
 get$value: function() {
  if (this.get$isComplete() !== true) throw $.captureStackTrace($.FutureNotCompleteException$0());
  if (!(this._exception === (void 0))) throw $.captureStackTrace(this._exception);
  return this._value;
 },
 is$Future: true
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 super: "Object",
 completeException$1: function(exception) {
  this._futureImpl._setException$1(exception);
 },
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
 },
 get$future: function() {
  return this._futureImpl;
 },
 is$Completer: true
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.list_13 = list;
  t1.i_22 = 0;
  this.forEach$1(new $.Closure86(t1));
  return t1.list_13;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.list_1 = list;
  t1.i_2 = 0;
  this.forEach$1(new $.Closure36(t1));
  return t1.list_1;
 },
 forEach$1: function(f) {
  var length$ = $.intTypeCheck($.get$length(this._keys));
  for (var i = 0; $.ltB(i, length$); i = $.intTypeCheck($.add(i, 1))) {
    var key = $.index(this._keys, i);
    !(key === (void 0)) && !(key === $.CTC5) && f.$call$2(key, $.index(this._values, i));
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 remove$1: function(key) {
  var index = $.intTypeCheck(this._probeForLookup$1(key));
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, (void 0));
    $.indexSet(this._keys, index, $.CTC5);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
 },
 operator$index$1: function(key) {
  var index = $.intTypeCheck(this._probeForLookup$1(key));
  if ($.ltB(index, 0)) return;
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = $.intTypeCheck(this._probeForAdding$1(key));
  if ($.index(this._keys, index) === (void 0) || $.index(this._keys, index) === $.CTC5) this._numberOfEntries = $.add(this._numberOfEntries, 1);
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.intTypeCheck($.get$length(this._keys));
  for (var i = 0; $.ltB(i, length$); i = $.intTypeCheck($.add(i, 1))) {
    $.indexSet(this._keys, i, (void 0));
    $.indexSet(this._values, i, (void 0));
  }
 },
 _grow$1: function(newCapacity) {
  $.intTypeCheck(newCapacity);
  $.assert($._isPowerOfTwo(newCapacity));
  var capacity = $.intTypeCheck($.get$length(this._keys));
  this._loadLimit = $._computeLoadLimit(newCapacity);
  var oldKeys = $.listTypeCheck(this._keys);
  var oldValues = $.listTypeCheck(this._values);
  this._keys = $.List(newCapacity);
  var t1 = $.List(newCapacity);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
  for (var i = 0; $.ltB(i, capacity); i = $.intTypeCheck($.add(i, 1))) {
    var key = $.index(oldKeys, i);
    if (key === (void 0) || key === $.CTC5) continue;
    var value = $.index(oldValues, i);
    var newIndex = $.intTypeCheck(this._probeForAdding$1(key));
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.intTypeCheck($.add(this._numberOfEntries, 1));
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.intTypeCheck($.sub($.intTypeCheck($.sub($.intTypeCheck($.get$length(this._keys)), newNumberOfEntries)), this._numberOfDeleted));
  $.gtB(this._numberOfDeleted, numberOfFree) && this._grow$1($.get$length(this._keys));
 },
 _probeForLookup$1: function(key) {
  var hash = $.intTypeCheck($._firstProbe($.hashCode(key), $.get$length(this._keys)));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) return -1;
    if ($.eqB(existingKey, key)) return hash;
    var numberOfProbes0 = $.intTypeCheck($.add(numberOfProbes, 1));
    hash = $.intTypeCheck($._nextProbe(hash, numberOfProbes, $.get$length(this._keys)));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $.intTypeCheck($._firstProbe($.hashCode(key), $.get$length(this._keys)));
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) return hash;
      return insertionIndex;
    }
    if ($.eqB(existingKey, key)) return hash;
    if ($.ltB(insertionIndex, 0) && $.CTC5 === existingKey) insertionIndex = hash;
    var numberOfProbes0 = $.intTypeCheck($.add(numberOfProbes, 1));
    hash = $.intTypeCheck($._nextProbe(hash, numberOfProbes, $.get$length(this._keys)));
    numberOfProbes = numberOfProbes0;
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $._computeLoadLimit(8);
  this._keys = $.List(8);
  var t1 = $.List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 some$1: function(f) {
  return $.some($.listSuperNativeTypeCheck(this._backingMap.getKeys$0(), 'is$Collection'), f);
 },
 filter$1: function(f) {
  var t1 = ({});
  t1.f_13 = f;
  var result = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  t1.result_2 = $.propertyTypeCheck(result, 'is$Set');
  $.forEach(this._backingMap, new $.Closure34(t1));
  return t1.result_2;
 },
 forEach$1: function(f) {
  var t1 = ({});
  t1.f_12 = f;
  $.forEach(this._backingMap, new $.Closure33(t1));
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  $.forEach(collection, new $.Closure32(this));
 },
 remove$1: function(value) {
  if (this._backingMap.containsKey$1(value) !== true) return false;
  this._backingMap.remove$1(value);
  return true;
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object'||t1.constructor !== Array||!!t1.immutable$list) return this.add$1$bailout(value, 1, t1);
  if (value !== (value | 0)) throw $.iae(value);
  var t2 = t1.length;
  if (value < 0 || value >= t2) throw $.ioore(value);
  t1[value] = value;
 },
 add$1$bailout: function(value, state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._backingMap;
    case 1:
      state = 0;
      $.indexSet(t1, value, value);
  }
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$0();
 },
 is$HashSetImplementation: true,
 is$Set: true,
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var length$ = $.intTypeCheck($.get$length(this._entries));
  if (length$ !== (length$ | 0)) return this._advance$0$bailout(1, length$);
  var entry = (void 0);
  do {
    var t1 = $.add(this._nextValidIndex, 1);
    this._nextValidIndex = t1;
    if ($.geB(t1, length$)) break;
    entry = $.index(this._entries, this._nextValidIndex);
  } while ((entry === (void 0) || entry === $.CTC5));
 },
 _advance$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.intTypeCheck($.get$length(this._entries));
    case 1:
      state = 0;
      var entry = (void 0);
      L0: while (true) {
        var t1 = $.add(this._nextValidIndex, 1);
        this._nextValidIndex = t1;
        if ($.geB(t1, length$)) break;
        entry = $.index(this._entries, this._nextValidIndex);
        if (!(entry === (void 0) || entry === $.CTC5)) break L0;
      }
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC2);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.next$0$bailout(1, t1);
  var t2 = this._nextValidIndex;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t2 = t1[t2];
  this._advance$0();
  return t2;
 },
 next$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC2);
      var t1 = this._entries;
    case 1:
      state = 0;
      var res = $.index(t1, this._nextValidIndex);
      this._advance$0();
      return res;
  }
 },
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = $.get$length(this._entries);
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  if (t1 >= t2) return false;
  t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.hasNext$0$bailout(3, t1, 0);
  t2 = this._nextValidIndex;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t1[t2] === $.CTC5 && this._advance$0();
  t1 = this._nextValidIndex;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(4, t1, 0);
  t2 = $.get$length(this._entries);
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(5, t1, t2);
  return t1 < t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
    case 3:
      t1 = env0;
      break;
    case 4:
      t1 = env0;
      break;
    case 5:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._nextValidIndex;
    case 1:
      state = 0;
      var t2 = $.get$length(this._entries);
    case 2:
      state = 0;
      if ($.geB(t1, t2)) return false;
      t1 = this._entries;
    case 3:
      state = 0;
      $.index(t1, this._nextValidIndex) === $.CTC5 && this._advance$0();
      t1 = this._nextValidIndex;
    case 4:
      state = 0;
      t2 = $.get$length(this._entries);
    case 5:
      state = 0;
      return $.lt(t1, t2);
  }
 },
 HashSetIterator$1: function(set_) {
  $.propertyTypeCheck(set_, 'is$HashSetImplementation');
  this._advance$0();
 },
 is$Iterator: true
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object",
 is$KeyValuePair: true
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_list"],
 super: "Object",
 toString$0: function() {
  return $.mapToString(this);
 },
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._map);
 },
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
 },
 forEach$1: function(f) {
  var t1 = ({});
  t1.f_1 = f;
  $.forEach(this._list, new $.Closure11(t1));
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.list_14 = list;
  t1.index_22 = 0;
  $.forEach(this._list, new $.Closure87(t1));
  $.assert($.eq(t1.index_22, $.get$length(this)));
  return t1.list_14;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.list_12 = list;
  t1.index_2 = 0;
  $.forEach(this._list, new $.Closure37(t1));
  $.assert($.eq(t1.index_2, $.get$length(this)));
  return t1.list_12;
 },
 remove$1: function(key) {
  var entry = $.propertyTypeCheck(this._map.remove$1(key), 'is$DoubleLinkedQueueEntry');
  if (entry === (void 0)) return;
  entry.remove$0();
  return entry.get$element().get$value();
 },
 operator$index$1: function(key) {
  var t1 = this._map;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.operator$index$1$bailout(key, 1, t1);
  if (key !== (key | 0)) throw $.iae(key);
  var t2 = t1.length;
  if (key < 0 || key >= t2) throw $.ioore(key);
  var entry = $.propertyTypeCheck(t1[key], 'is$DoubleLinkedQueueEntry');
  if (entry === (void 0)) return;
  return entry.get$element().get$value();
 },
 operator$index$1$bailout: function(key, state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._map;
    case 1:
      state = 0;
      var entry = $.propertyTypeCheck($.index(t1, key), 'is$DoubleLinkedQueueEntry');
      if (entry === (void 0)) return;
      return entry.get$element().get$value();
  }
 },
 operator$indexSet$2: function(key, value) {
  if (this._map.containsKey$1(key) === true) {
    var t1 = this._map;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.operator$indexSet$2$bailout(key, value, 1, t1);
    if (key !== (key | 0)) throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2) throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    $.addLast(this._list, $.KeyValuePair$2(key, value));
    t1 = this._map;
    if (typeof t1 !== 'object'||t1.constructor !== Array||!!t1.immutable$list) return this.operator$indexSet$2$bailout(key, value, 2, t1);
    t2 = this._list.lastEntry$0();
    if (key !== (key | 0)) throw $.iae(key);
    var t3 = t1.length;
    if (key < 0 || key >= t3) throw $.ioore(key);
    t1[key] = t2;
  }
 },
 operator$indexSet$2$bailout: function(key, value, state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
    case 2:
      if (state == 1 || (state == 0 && this._map.containsKey$1(key) === true)) {
        switch (state) {
          case 0:
            var t1 = this._map;
          case 1:
            state = 0;
            $.index(t1, key).get$element().set$value(value);
        }
      } else {
        switch (state) {
          case 0:
            $.addLast(this._list, $.KeyValuePair$2(key, value));
            t1 = this._map;
          case 2:
            state = 0;
            $.indexSet(t1, key, this._list.lastEntry$0());
        }
      }
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$0();
  var t1 = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(t1, ({E: 'KeyValuePair<K, V>'}));
  this._list = t1;
 },
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
 },
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = (void 0);
  this._previous = (void 0);
  return this._element;
 },
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$1(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this._previous, this);
 },
 append$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$1(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this, this._next);
 },
 _link$2: function(p, n) {
  $.propertyTypeCheck(p, 'is$DoubleLinkedQueueEntry');
  $.propertyTypeCheck(n, 'is$DoubleLinkedQueueEntry');
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
 },
 is$DoubleLinkedQueueEntry: true
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC6);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC6);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 },
 is$_DoubleLinkedQueueEntrySentinel: true
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$1(this._sentinel);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(other, ({E: 'E'}));
  $.propertyTypeCheck(other, 'is$Queue');
  var entry = $.propertyTypeCheck(this._sentinel.get$_next(), 'is$DoubleLinkedQueueEntry');
  for (; !(entry === this._sentinel); ) {
    var nextEntry = $.propertyTypeCheck(entry.get$_next(), 'is$DoubleLinkedQueueEntry');
    f.$call$1(entry.get$_element()) === true && other.addLast$1(entry.get$_element());
    $.propertyTypeCheck(nextEntry, 'is$DoubleLinkedQueueEntry');
    entry = nextEntry;
  }
  return other;
 },
 some$1: function(f) {
  var entry = $.propertyTypeCheck(this._sentinel.get$_next(), 'is$DoubleLinkedQueueEntry');
  for (; !(entry === this._sentinel); ) {
    var nextEntry = $.propertyTypeCheck(entry.get$_next(), 'is$DoubleLinkedQueueEntry');
    if (f.$call$1(entry.get$_element()) === true) return true;
    $.propertyTypeCheck(nextEntry, 'is$DoubleLinkedQueueEntry');
    entry = nextEntry;
  }
  return false;
 },
 forEach$1: function(f) {
  var entry = $.propertyTypeCheck(this._sentinel.get$_next(), 'is$DoubleLinkedQueueEntry');
  for (; !(entry === this._sentinel); ) {
    var nextEntry = $.propertyTypeCheck(entry.get$_next(), 'is$DoubleLinkedQueueEntry');
    f.$call$1(entry.get$_element());
    $.propertyTypeCheck(nextEntry, 'is$DoubleLinkedQueueEntry');
    entry = nextEntry;
  }
 },
 clear$0: function() {
  var t1 = this._sentinel;
  this._sentinel.set$_next(t1);
  t1 = this._sentinel;
  this._sentinel.set$_previous(t1);
 },
 isEmpty$0: function() {
  return this._sentinel.get$_next() === this._sentinel;
 },
 get$length: function() {
  var t1 = ({});
  t1.counter_1 = 0;
  this.forEach$1(new $.Closure10(t1));
  return t1.counter_1;
 },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 last$0: function() {
  return this._sentinel.get$_previous().get$element();
 },
 first$0: function() {
  return this._sentinel.get$_next().get$element();
 },
 get$first: function() { return new $.Closure101(this, 'first$0'); },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
 },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true; ) {
    this.add$1(t1.next$0());
  }
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addFirst$1: function(value) {
  this._sentinel.append$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$0();
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  this._sentinel = t1;
 },
 is$Queue: true,
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC2);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  return !(this._currentEntry.get$_next() === this._sentinel);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  $.propertyTypeCheck(_sentinel, 'is$_DoubleLinkedQueueEntrySentinel');
  this._currentEntry = this._sentinel;
 },
 is$Iterator: true
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) return '';
  if ($.get$length(this._buffer) === 1) return $.index(this._buffer, 0);
  var result = $.stringTypeCheck($.concatAll(this._buffer));
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 addAll$1: function(objects) {
  $.listSuperNativeTypeCheck(objects, 'is$Collection');
  for (var t1 = $.iterator(objects); t1.hasNext$0() === true; ) {
    this.add$1(t1.next$0());
  }
  return this;
 },
 add$1: function(obj) {
  var str = $.stringTypeCheck($.toString(obj));
  if (str === (void 0) || $.isEmpty(str) === true) return this;
  $.add$1(this._buffer, str);
  this._length = $.add(this._length, $.get$length(str));
  return this;
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 },
 is$StringBuffer: true
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.stringTypeCheck(str);
  $.checkString(str);
  return $._AllMatchesIterable$2(this, str);
 },
 hasMatch$1: function(str) {
  $.stringTypeCheck(str);
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  $.stringTypeCheck(str);
  var m = $.listTypeCheck($.regExpExec(this, $.checkString(str)));
  if (m === (void 0)) return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$5(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.propertyTypeCheck(other, 'is$JSSyntaxRegExp');
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true,
 is$RegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_lib2_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this.group$1(index);
 },
 group$1: function(index) {
  $.intTypeCheck(index);
  return $.index(this._groups, index);
 },
 start$0: function() {
  return this._lib2_start;
 }
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$2(this._re, this._str);
 },
 is$Iterable: function() { return true; }
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true) return false;
  if (!$.eqNullB(this._next)) return true;
  this._next = this._re.firstMatch$1(this._str);
  if ($.eqNullB(this._next)) {
    this._done = true;
    return false;
  }
  return true;
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC2);
  var next = this._next;
  this._next = (void 0);
  return next;
 },
 is$Iterator: true
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$0());
  var value = (this.list[this.i]);
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.next$0$bailout(1, value, t1);
  this.i = t1 + 1;
  return value;
 },
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      value = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$0());
      var value = (this.list[this.i]);
      var t1 = this.i;
    case 1:
      state = 0;
      this.i = $.add(t1, 1);
      return value;
  }
 },
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1);
  return t1 < (this.list.length);
 },
 hasNext$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.i;
    case 1:
      state = 0;
      return $.lt(t1, (this.list.length));
  }
 },
 is$Iterator: true
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  return !$.eqNullB(this.stack) ? this.stack : '';
 }
};

$$.Closure102 = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 },
 is$Function: true
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object",
 is$MetaInfo: true
};

$$.StringMatch = {"":
 ["pattern?", "str", "_start"],
 super: "Object",
 group$1: function(group_) {
  $.intTypeCheck(group_);
  if (!$.eqB(group_, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$1(group_));
  return this.pattern;
 },
 operator$index$1: function(g) {
  $.intTypeCheck(g);
  return this.group$1(g);
 },
 start$0: function() {
  return this._start;
 }
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.objectToString(this);
 }
};

$$.IndexOutOfRangeException = {"":
 ["_index"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._index);
 }
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.propertyTypeCheck($.StringBufferImpl$1(''), 'is$StringBuffer');
  for (var t1 = this._arguments, i = 0; $.ltB(i, $.get$length(t1)); i = $.intTypeCheck($.add(i, 1))) {
    $.gtB(i, 0) && sb.add$1(', ');
    sb.add$1($.index(t1, i));
  }
  t1 = this._existingArgumentNames;
  if (t1 === (void 0)) return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
  var actualParameters = $.stringTypeCheck(sb.toString$0());
  sb = $.propertyTypeCheck($.StringBufferImpl$1(''), 'is$StringBuffer');
  for (i = 0; $.ltB(i, $.get$length(t1)); i = $.intTypeCheck($.add(i, 1))) {
    $.gtB(i, 0) && sb.add$1(', ');
    sb.add$1($.index(t1, i));
  }
  var formalParameters = $.stringTypeCheck(sb.toString$0());
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
 }
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
 }
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
 }
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
 }
};

$$.BadNumberFormatException = {"":
 ["_s"],
 super: "Object",
 toString$0: function() {
  return 'BadNumberFormatException: \'' + $.S(this._s) + '\'';
 }
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  var t1 = this.functionName;
  if ($.eqNullB(t1)) return this.get$exceptionName();
  return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
 }
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
 }
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
 }
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
 }
};

$$.NotImplementedException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 === (void 0)) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
 }
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
 }
};

$$.FutureNotCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
 }
};

$$.FutureAlreadyCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future already completed';
 }
};

$$.AssertionError = {"":
 [],
 super: "Object"
};

$$.TypeError = {"":
 ["msg"],
 super: "AssertionError",
 toString$0: function() {
  return this.msg;
 }
};

$$.HtmlInterface = {"":
 ["choices", "choicesOl?", "choicesDiv", "paragraphsDiv", "_scripterPort?", "_receivePort?"],
 super: "Object",
 receiveFromScripter$2: function(messageJson, replyTo) {
  $.stringTypeCheck(messageJson);
  $.propertyTypeCheck(replyTo, 'is$SendPort');
  var message = $.Message$fromJson$1(messageJson);
  $.print('CMD: We have a message from Scripter: ' + $.S(message.type) + '.');
  if ($.eqB(message.type, 32)) {
    $.print('CMD: We are at the end of book. Closing.');
    this._scripterPort.send$1($.Message$Quit$0().toJson$0());
    this._receivePort.close$0();
  } else {
    if ($.eqB(message.type, 4)) {
      $.print('Showing text from scripter.');
      this.createParagraph$1(message.strContent);
      this._scripterPort.send$2($.Message$Continue$0().toJson$0(), this._receivePort.toSendPort$0());
    } else {
      if ($.eqB(message.type, 256)) {
        $.print('No visible result. Continuing.');
        this._scripterPort.send$2($.Message$Continue$0().toJson$0(), this._receivePort.toSendPort$0());
      } else {
        if ($.eqB(message.type, 64)) {
          $.print('We have choices to show!');
          !$.eqB($.index(message.listContent, 0), '') && this.createParagraph$1($.index(message.listContent, 0));
          this.choices = $.List$from(message.listContent);
          for (var i = 1; $.ltB(i, $.get$length(this.choices)); i = $.intTypeCheck($.add(i, 1))) {
            this.createChoice$3$accessKey$hash($.index($.index(this.choices, i), 'string'), $.S(i), $.index($.index(this.choices, i), 'hash'));
          }
        }
      }
    }
  }
 },
 get$receiveFromScripter: function() { return new $.Closure103(this, 'receiveFromScripter$2'); },
 createChoice$3: function(innerHtml, accessKey, hash) {
  $.stringTypeCheck(innerHtml);
  $.stringTypeCheck(accessKey);
  $.intTypeCheck(hash);
  var t1 = ({});
  t1.hash_1 = hash;
  if ($.eqNullB(this.choicesOl)) return;
  var li = $.callTypeCheck($.Element$tag('li'), 'is$LIElement');
  var a = $.callTypeCheck($.Element$tag('a'), 'is$AnchorElement');
  a.set$innerHTML(innerHtml);
  if (!$.eqNullB(t1.hash_1)) {
    $.add$1(a.get$on().get$click(), new $.Closure96(this, t1));
  }
  $.add$1(li.get$elements(), a);
  $.add$1(this.choicesOl.get$elements(), li);
  return a;
 },
 createChoice$3$accessKey$hash: function(innerHtml,accessKey,hash) {
  return this.createChoice$3(innerHtml,accessKey,hash)
},
 createParagraph$1: function(innerHtml) {
  $.stringTypeCheck(innerHtml);
  if ($.eqNullB(this.paragraphsDiv)) return;
  if ($.eqB(innerHtml, '')) {
    $.print('Received an empty string.');
    return;
  }
  var p = $.callTypeCheck($.Element$tag('p'), 'is$ParagraphElement');
  p.set$innerHTML(innerHtml);
  $.add$1(this.paragraphsDiv.get$elements(), p);
  return p;
 },
 HtmlInterface$0: function() {
  $.DEBUG_CMD('HTML interface is starting.');
  this._receivePort = $.ReceivePort();
  this._receivePort.receive$1(this.get$receiveFromScripter());
  this._scripterPort = $.spawnFunction($.createScripter);
  this._scripterPort.send$2($.Message$Start$0().toJson$0(), this._receivePort.toSendPort$0());
  this.paragraphsDiv = $.document().query$1('div#book-paragraphs');
  this.choicesDiv = $.document().query$1('div#book-choices');
  this.choicesOl = $.document().query$1('ol#book-choices-ol');
 }
};

$$.Message = {"":
 ["intContent?", "strContent", "listContent?", "type?"],
 super: "Object",
 toJson$0: function() {
  var data = $.callTypeCheck($.HashMapImplementation$0(), 'is$Map');
  data.operator$indexSet$2('type', this.type);
  if ($.eqB(this.type, 128)) data.operator$indexSet$2('intContent', this.intContent);
  else {
    if ($.eqB(this.type, 64)) data.operator$indexSet$2('listContent', this.listContent);
    else {
      $.eqB(this.type, 4) && data.operator$indexSet$2('strContent', this.strContent);
    }
  }
  return $.stringify(data);
 },
 Message$OptionSelected$1: function(hash) {
  $.intTypeCheck(hash);
  this.intContent = hash;
 },
 Message$fromJson$1: function(json) {
  $.stringTypeCheck(json);
  var data = $.callTypeCheck($.parse(json), 'is$Map');
  this.type = data.operator$index$1('type');
  if ($.eqB(this.type, 128)) this.intContent = data.operator$index$1('intContent');
  else {
    if ($.eqB(this.type, 64)) this.listContent = data.operator$index$1('listContent');
    else {
      if ($.eqB(this.type, 4)) this.strContent = data.operator$index$1('strContent');
    }
  }
 },
 Message$ShowChoices$3: function(choices, prependText, endOfPage) {
  $.listTypeCheck(choices);
  $.stringTypeCheck(prependText);
  $.boolTypeCheck(endOfPage);
  var choicesToSend = endOfPage !== true ? $.listTypeCheck($.filter(choices, new $.Closure43())) : $.listTypeCheck($.filter(choices, new $.Closure44()));
  $.DEBUG_SCR('Sending choices.');
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'Dynamic'}));
  this.listContent = t1;
  $.add$1(this.listContent, prependText);
  $.forEach(choicesToSend, new $.Closure45(this));
 },
 Message$TextResult$1: function(str) {
  $.stringTypeCheck(str);
  this.strContent = str;
 },
 is$Message: true
};

$$.UserInteraction = {"":
 ["waitForEndOfPage?", "shown="],
 super: "Object",
 hashCode$0: function() {
  return this.hash;
 },
 UserInteraction$0: function() {
  this.hash = $.toInt($.mul($.random(), 30000));
 }
};

$$.Choice = {"":
 ["$goto?", "f?", "string?", "hash", "waitForEndOfPage", "shown"],
 super: "UserInteraction",
 then$1: function(_f) {
  $.functionTypeCheck(_f);
  this.f = _f;
  return this;
 },
 goto$1: function(arg0) { return this.$goto.$call$1(arg0); },
 Choice$fromMap$1: function(map) {
  $.callTypeCheck(map, 'is$Map');
  this.string = $.index(map, 'string');
  this.$goto = $.index(map, 'goto');
  map.containsKey$1('showNow') === true && this.set$showNow($.index(map, 'showNow'));
  this.f = $.index(map, 'then');
 },
 Choice$4: function(string, goto$, then, showNow) {
  $.functionTypeCheck(then);
  $.boolTypeCheck(showNow);
  this.f = then;
  this.waitForEndOfPage = showNow !== true;
 },
 is$Choice: true
};

$$.Scripter = {"":
 ["vars?", "nextPage!"],
 super: "Object",
 runScriptBlock$1: function(script) {
  $.functionTypeCheck(script);
  this.textBuffer = $.StringBufferImpl$1('');
  this.choices = $.filter(this.choices, new $.Closure46());
  if ($.eqNullB(script)) $.index(this.blocks, this.currentBlock).$call$0();
  else script.$call$0();
  if ($.some(this.choices, new $.Closure47()) === true) return $.Message$ShowChoices$3(this.choices, $.toString(this.textBuffer), false);
  return $.Message$TextResult$1($.toString(this.textBuffer));
 },
 runScriptBlock$1$script: function(script) {
  return this.runScriptBlock$1(script)
},
 runScriptBlock$1$script: function(script) {
  return this.runScriptBlock$1(script)
},
 nextScript$1: function(f) {
  $.functionTypeCheck(f);
  $.add$1(this.nextScriptStack, f);
 },
 goto$1: function(pageNumber) {
  $.intTypeCheck(pageNumber);
  this.nextPage = pageNumber;
 },
 get$$goto: function() { return new $.Closure104(this, 'goto$1'); },
 echo$1: function(str) {
  $.stringTypeCheck(str);
  $.gtB($.get$length(this.textBuffer), 0) && $.add$1(this.textBuffer, ' ');
  $.add$1(this.textBuffer, str);
 },
 initScriptEnvironment$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'Choice'}));
  this.choices = t1;
  this.vars = $.HashMapImplementation$0();
  this.initBlock$0();
 },
 goOneStep$1: function(incomingMessage) {
  $.propertyTypeCheck(incomingMessage, 'is$Message');
  var t1 = ({});
  t1.incomingMessage_1 = incomingMessage;
  if ($.eqB(t1.incomingMessage_1.get$type(), 16)) {
    $.DEBUG_SCR('Starting from the beginning');
    this.currentPage = 0;
    this.currentBlock = (void 0);
    $.clear(this.nextScriptStack);
    this.initScriptEnvironment$0();
  }
  if ($.eqB(t1.incomingMessage_1.get$type(), 128)) {
    $.DEBUG_SCR('An option has been selected. Resolving.');
    t1.message_2 = (void 0);
    $.forEach(this.choices, new $.Closure41(this, t1));
    if (!$.eqNullB(t1.message_2)) return t1.message_2;
    return $.Message$NoResult$0();
  }
  if ($.isEmpty(this.nextScriptStack) !== true) {
    return this.runScriptBlock$1$script($.functionTypeCheck($.removeLast(this.nextScriptStack)));
  }
  if (!$.eqNullB(this.nextPage)) {
    this.currentPage = this.nextPage;
    this.currentBlock = (void 0);
    this.nextPage = (void 0);
    $.clear(this.choices);
  }
  if ($.eqNullB(this.currentBlock)) this.currentBlock = 0;
  else {
    if (this.repeatBlockBit === true) this.repeatBlockBit = false;
    else this.currentBlock = $.add(this.currentBlock, 1);
  }
  $.DEBUG_SCR('currentPage = ' + $.S(this.currentPage) + ', currentBlock = ' + $.S(this.currentBlock));
  this.blocks = $.index(this.pages, this.currentPage);
  $.DEBUG_SCR('Resolving block.');
  if ($.geB(this.currentBlock, $.get$length(this.blocks))) {
    $.DEBUG_SCR('At the end of page.');
    if ($.some(this.choices, new $.Closure42()) === true) return $.Message$ShowChoices$3(this.choices, '', true);
    return $.Message$EndOfBook$0();
  }
  t1 = $.index(this.blocks, this.currentBlock);
  if (typeof t1 === 'string') return $.Message$TextResult$1($.index(this.blocks, this.currentBlock));
  t1 = $.index(this.blocks, this.currentBlock);
  if (typeof t1 === 'object' && t1.is$Map()) {
    $.add$1(this.choices, $.Choice$fromMap$1($.index(this.blocks, this.currentBlock)));
    return $.Message$NoResult$0();
  }
  t1 = $.index(this.blocks, this.currentBlock);
  if (typeof t1 === 'function' || typeof t1 === 'object' && !!t1.is$Function) {
    $.DEBUG_SCR('Running script.');
    return this.runScriptBlock$1($.index(this.blocks, this.currentBlock));
  }
 },
 callback$2: function(messageJson, replyTo) {
  $.stringTypeCheck(messageJson);
  $.propertyTypeCheck(replyTo, 'is$SendPort');
  var message = $.Message$fromJson$1(messageJson);
  $.DEBUG_SCR('Received message from interface: ' + $.S(message.type) + '.');
  this._interfacePort = replyTo;
  if ($.eqB(message.type, 0)) {
    $.DEBUG_SCR('Closing port and quiting.');
    $.port().close$0();
  } else {
    if (!$.eqNullB(this.pages)) {
      var t1 = !$.eqNullB(this.currentPage) && $.geB(this.currentPage, $.get$length(this.pages));
    } else t1 = true;
    if (t1) {
      $.DEBUG_SCR('No more pages.');
      this._interfacePort.send$2($.Message$EndOfBook$0().toJson$0(), $.port().toSendPort$0());
    } else this._interfacePort.send$2(this.goOneStep$1(message).toJson$0(), $.port().toSendPort$0());
  }
 },
 get$callback: function() { return new $.Closure103(this, 'callback$2'); },
 Scripter$0: function() {
  $.DEBUG_SCR('Scripter has been created.');
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'Function'}));
  this.nextScriptStack = t1;
  this.initScriptEnvironment$0();
  $.port().receive$1(this.get$callback());
 }
};

$$._JsonParser = {"":
 ["position", "length?", "json"],
 super: "Object",
 _error$1: function(message) {
  $.stringTypeCheck(message);
  throw $.captureStackTrace(message);
 },
 _token$0: function() {
  for (var t1 = this.json; true; ) {
    if ($.geB(this.position, $.get$length(this))) return;
    var char$ = $.intTypeCheck($.charCodeAt(t1, this.position));
    var token = $.intTypeCheck($.index($.tokens, char$));
    if (token === 32) {
      this.position = $.add(this.position, 1);
      continue;
    }
    if (token === (void 0)) return 0;
    return token;
  }
 },
 _nextChar$0: function() {
  var t1 = this.position;
  if (typeof t1 !== 'number') return this._nextChar$0$bailout(1, t1, 0);
  this.position = t1 + 1;
  t1 = this.position;
  if (typeof t1 !== 'number') return this._nextChar$0$bailout(2, t1, 0);
  var t2 = $.get$length(this);
  if (typeof t2 !== 'number') return this._nextChar$0$bailout(3, t1, t2);
  if (t1 >= t2) return 0;
  return $.charCodeAt(this.json, this.position);
 },
 _nextChar$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.position;
    case 1:
      state = 0;
      this.position = $.add(t1, 1);
      t1 = this.position;
    case 2:
      state = 0;
      var t2 = $.get$length(this);
    case 3:
      state = 0;
      if ($.geB(t1, t2)) return 0;
      return $.charCodeAt(this.json, this.position);
  }
 },
 _char$0: function() {
  var t1 = this.position;
  if (typeof t1 !== 'number') return this._char$0$bailout(1, t1, 0);
  var t2 = $.get$length(this);
  if (typeof t2 !== 'number') return this._char$0$bailout(2, t1, t2);
  t1 >= t2 && this._error$1('Unexpected end of JSON stream');
  return $.charCodeAt(this.json, this.position);
 },
 _char$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.position;
    case 1:
      state = 0;
      var t2 = $.get$length(this);
    case 2:
      state = 0;
      $.geB(t1, t2) && this._error$1('Unexpected end of JSON stream');
      return $.charCodeAt(this.json, this.position);
  }
 },
 _isToken$1: function(tokenKind) {
  $.intTypeCheck(tokenKind);
  return $.eq(this._token$0(), tokenKind);
 },
 _isDigit$1: function(char$) {
  if (typeof char$ !== 'number') return this._isDigit$1$bailout(char$, 1, char$);
  $.intTypeCheck(char$);
  return char$ >= 48 && char$ <= 57;
 },
 _isDigit$1$bailout: function(char$, state, env0) {
  switch (state) {
    case 1:
      char$ = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.intTypeCheck(char$);
      return $.geB(char$, 48) && $.leB(char$, 57);
  }
 },
 _parseNumber$0: function() {
  this._isToken$1(45) !== true && this._error$1('Expected number literal');
  var startPos = $.intTypeCheck(this.position);
  var char$ = $.intTypeCheck(this._char$0());
  if (char$ === 45) {
    char$ = $.intTypeCheck(this._nextChar$0());
  }
  if (char$ === 48) char$ = $.intTypeCheck(this._nextChar$0());
  else {
    if (this._isDigit$1(char$) === true) {
      char$ = $.intTypeCheck(this._nextChar$0());
      for (; this._isDigit$1(char$) === true; ) {
        char$ = $.intTypeCheck(this._nextChar$0());
      }
    } else this._error$1('Expected digit when parsing number');
  }
  if (char$ === 46) {
    char$ = $.intTypeCheck(this._nextChar$0());
    if (this._isDigit$1(char$) === true) {
      char$ = $.intTypeCheck(this._nextChar$0());
      for (; this._isDigit$1(char$) === true; ) {
        char$ = $.intTypeCheck(this._nextChar$0());
      }
      var isInt = false;
    } else {
      this._error$1('Expected digit following comma');
      isInt = true;
    }
  } else isInt = true;
  if (char$ === 101 || char$ === 69) {
    char$ = $.intTypeCheck(this._nextChar$0());
    if (char$ === 45 || char$ === 43) {
      char$ = $.intTypeCheck(this._nextChar$0());
    }
    if (this._isDigit$1(char$) === true) {
      char$ = $.intTypeCheck(this._nextChar$0());
      for (; this._isDigit$1(char$) === true; ) {
        char$ = $.intTypeCheck(this._nextChar$0());
      }
      isInt = false;
    } else this._error$1('Expected digit following \'e\' or \'E\'');
  }
  var number = $.stringTypeCheck($.substring$2(this.json, startPos, this.position));
  if (isInt) return $.parseInt(number);
  return $.parseDouble(number);
 },
 _parseString$0: function() {
  this._isToken$1(34) !== true && this._error$1('Expected string literal');
  this.position = $.add(this.position, 1);
  var charCodes = $.List((void 0));
  $.setRuntimeTypeInfo(charCodes, ({E: 'int'}));
  for (var t1 = this.json; true; ) {
    var c = $.intTypeCheck(this._char$0());
    if ($.eqB(c, 34)) {
      this.position = $.add(this.position, 1);
      break;
    }
    if ($.eqB(c, 92)) {
      this.position = $.add(this.position, 1);
      $.eqB(this.position, $.get$length(this)) && this._error$1('\\ at the end of input');
      switch (this._char$0()) {
        case 34:
          c = 34;
          break;
        case 92:
          c = 92;
          break;
        case 47:
          c = 47;
          break;
        case 98:
          c = 8;
          break;
        case 110:
          c = 10;
          break;
        case 114:
          c = 13;
          break;
        case 102:
          c = 12;
          break;
        case 116:
          c = 9;
          break;
        case 117:
          $.gtB($.add(this.position, 5), $.get$length(this)) && this._error$1('Invalid unicode esacape sequence');
          var codeString = $.substring$2(t1, $.add(this.position, 1), $.add(this.position, 5));
          try {
            c = $.intTypeCheck($.parseInt('0x' + $.S(codeString)));
          } catch (exception) {
            $.unwrapException(exception);
            this._error$1('Invalid unicode esacape sequence');
          }
          this.position = $.add(this.position, 4);
          break;
        default:
          this._error$1('Invalid esacape sequence in string literal');
      }
    }
    charCodes.push(c);
    this.position = $.add(this.position, 1);
  }
  return $.String$fromCharCodes(charCodes);
 },
 _parseList$0: function() {
  var list = [];
  this.position = $.add(this.position, 1);
  if (this._isToken$1(93) !== true) {
    for (; true; ) {
      $.add$1(list, this._parseValue$0());
      if (this._isToken$1(44) !== true) break;
      this.position = $.add(this.position, 1);
    }
    this._isToken$1(93) !== true && this._error$1('Expected \']\' at end of list');
  }
  this.position = $.add(this.position, 1);
  return list;
 },
 _parseObject$0: function() {
  var object = $.makeLiteralMap([]);
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true; ) {
      var key = $.stringTypeCheck(this._parseString$0());
      this._isToken$1(58) !== true && this._error$1('Expected \':\' when parsing object');
      this.position = $.add(this.position, 1);
      $.indexSet(object, key, this._parseValue$0());
      if (this._isToken$1(44) !== true) break;
      this.position = $.add(this.position, 1);
    }
    this._isToken$1(125) !== true && this._error$1('Expected \'}\' at end of object');
  }
  this.position = $.add(this.position, 1);
  return object;
 },
 _expectKeyword$2: function(word, value) {
  $.stringTypeCheck(word);
  for (var i = 0; $.ltB(i, $.get$length(word)); i = $.intTypeCheck($.add(i, 1))) {
    !$.eqB(this._char$0(), $.charCodeAt(word, i)) && this._error$1('Expected keyword \'' + $.S(word) + '\'');
    this.position = $.add(this.position, 1);
  }
  return value;
 },
 _parseValue$0: function() {
  var token = $.intTypeCheck(this._token$0());
  token === (void 0) && this._error$1('Nothing to parse');
  switch (token) {
    case 34:
      return this._parseString$0();
    case 45:
      return this._parseNumber$0();
    case 110:
      return this._expectKeyword$2('null', (void 0));
    case 102:
      return this._expectKeyword$2('false', false);
    case 116:
      return this._expectKeyword$2('true', true);
    case 123:
      return this._parseObject$0();
    case 91:
      return this._parseList$0();
    default:
      this._error$1('Unexpected token');
  }
 },
 _parseToplevel$0: function() {
  var result = this._parseValue$0();
  !(this._token$0() === (void 0)) && this._error$1('Junk at the end of JSON input');
  return result;
 },
 _JsonParser$_internal$1: function(json) {
  $.stringTypeCheck(json);
  if (!($.tokens === (void 0))) return;
  var t1 = $.List(126);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  $.tokens = t1;
  $.indexSet($.tokens, 9, 32);
  $.indexSet($.tokens, 10, 32);
  $.indexSet($.tokens, 13, 32);
  $.indexSet($.tokens, 32, 32);
  $.indexSet($.tokens, 48, 45);
  $.indexSet($.tokens, 49, 45);
  $.indexSet($.tokens, 50, 45);
  $.indexSet($.tokens, 51, 45);
  $.indexSet($.tokens, 52, 45);
  $.indexSet($.tokens, 53, 45);
  $.indexSet($.tokens, 54, 45);
  $.indexSet($.tokens, 55, 45);
  $.indexSet($.tokens, 56, 45);
  $.indexSet($.tokens, 57, 45);
  $.indexSet($.tokens, 45, 45);
  $.indexSet($.tokens, 123, 123);
  $.indexSet($.tokens, 125, 125);
  $.indexSet($.tokens, 91, 91);
  $.indexSet($.tokens, 93, 93);
  $.indexSet($.tokens, 34, 34);
  $.indexSet($.tokens, 58, 58);
  $.indexSet($.tokens, 44, 44);
  $.indexSet($.tokens, 110, 110);
  $.indexSet($.tokens, 116, 116);
  $.indexSet($.tokens, 102, 102);
 }
};

$$.JsonUnsupportedObjectType = {"":
 [],
 super: "Object"
};

$$.JsonStringifier = {"":
 ["_seen", "_sb?"],
 super: "Object",
 _stringify$1: function(object) {
  var t1 = ({});
  if (typeof object === 'number') {
    $.add$1(this._sb, $._numberToString(object));
    return;
  }
  if (object === true) {
    $.add$1(this._sb, 'true');
    return;
  }
  if (object === false) {
    $.add$1(this._sb, 'false');
    return;
  }
  if (object === (void 0)) {
    $.add$1(this._sb, 'null');
    return;
  }
  if (typeof object === 'string') {
    $.add$1(this._sb, '"');
    $._escape(this._sb, object);
    $.add$1(this._sb, '"');
    return;
  }
  if (typeof object === 'object' && (object.constructor === Array || object.is$List2())) {
    this._checkCycle$1(object);
    var object = $.listTypeCheck(object);
    if (typeof object !== 'object'||object.constructor !== Array) return this._stringify$1$bailout(object, 1, object, 0);
    $.add$1(this._sb, '[');
    if (object.length > 0) {
      t1 = object.length;
      if (0 >= t1) throw $.ioore(0);
      this._stringify$1(object[0]);
      for (var i = 1; i < object.length; ++i) {
        $.add$1(this._sb, ',');
        t1 = object.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        this._stringify$1(object[i]);
      }
    }
    $.add$1(this._sb, ']');
    $.removeLast(this._seen);
    return;
  }
  if (typeof object === 'object' && object.is$Map()) {
    this._checkCycle$1(object);
    object = $.callTypeCheck(object, 'is$Map');
    $.add$1(this._sb, '{');
    t1.first_1 = true;
    object.forEach$1(new $.Closure2(this, t1));
    $.add$1(this._sb, '}');
    $.removeLast(this._seen);
    return;
  }
  throw $.captureStackTrace($.CTC4);
 },
 _stringify$1$bailout: function(object, state, env0, env1) {
  switch (state) {
    case 1:
      object = env0;
      break;
    case 2:
      object = env0;
      i = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = ({});
    case 1:
    case 2:
      if ((state == 0 && typeof object === 'number')) {
        $.add$1(this._sb, $._numberToString(object));
        return;
      } else {
        switch (state) {
          case 0:
          case 1:
          case 2:
            if ((state == 0 && object === true)) {
              $.add$1(this._sb, 'true');
              return;
            } else {
              switch (state) {
                case 0:
                case 1:
                case 2:
                  if ((state == 0 && object === false)) {
                    $.add$1(this._sb, 'false');
                    return;
                  } else {
                    switch (state) {
                      case 0:
                      case 1:
                      case 2:
                        if ((state == 0 && object === (void 0))) {
                          $.add$1(this._sb, 'null');
                          return;
                        } else {
                          switch (state) {
                            case 0:
                            case 1:
                            case 2:
                              if ((state == 0 && typeof object === 'string')) {
                                $.add$1(this._sb, '"');
                                $._escape(this._sb, object);
                                $.add$1(this._sb, '"');
                                return;
                              } else {
                                switch (state) {
                                  case 0:
                                  case 1:
                                  case 2:
                                    if (state == 1 || state == 2 || (state == 0 && (typeof object === 'object' && ((object.constructor === Array || object.is$List2()))))) {
                                      switch (state) {
                                        case 0:
                                          this._checkCycle$1(object);
                                          var object = $.listTypeCheck(object);
                                        case 1:
                                          state = 0;
                                          $.add$1(this._sb, '[');
                                        case 2:
                                          if (state == 2 || (state == 0 && $.gtB($.get$length(object), 0))) {
                                            switch (state) {
                                              case 0:
                                                this._stringify$1($.index(object, 0));
                                                var i = 1;
                                              case 2:
                                                L0: while (true) {
                                                  switch (state) {
                                                    case 0:
                                                      if (!$.ltB(i, $.get$length(object))) break L0;
                                                      $.add$1(this._sb, ',');
                                                      this._stringify$1($.index(object, i));
                                                      i = $.intTypeCheck($.add(i, 1));
                                                    case 2:
                                                      state = 0;
                                                  }
                                                }
                                            }
                                          }
                                          $.add$1(this._sb, ']');
                                          $.removeLast(this._seen);
                                          return;
                                      }
                                    } else {
                                      if (typeof object === 'object' && object.is$Map()) {
                                        this._checkCycle$1(object);
                                        object = $.callTypeCheck(object, 'is$Map');
                                        $.add$1(this._sb, '{');
                                        t1.first_1 = true;
                                        object.forEach$1(new $.Closure2(this, t1));
                                        $.add$1(this._sb, '}');
                                        $.removeLast(this._seen);
                                        return;
                                      }
                                      throw $.captureStackTrace($.CTC4);
                                    }
                                }
                              }
                          }
                        }
                    }
                  }
              }
            }
        }
      }
  }
 },
 _checkCycle$1: function(object) {
  for (var i = 0; $.ltB(i, $.get$length(this._seen)); i = $.intTypeCheck($.add(i, 1))) {
    if ($.index(this._seen, i) === object) throw $.captureStackTrace('Cyclic structure');
  }
  $.add$1(this._seen, object);
 },
 get$_result: function() {
  return $.toString(this._sb);
 }
};

$$._Manager = {"":
 ["managers?", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId=", "currentManagerId=", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  $.isEmpty(this.isolates) === true && this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
 },
 _nativeInitWorkerMessageHandler$0: function() {
      $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  ;
 },
 _nativeDetectEnvironment$0: function() {
      this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  ;
 },
 get$needSerialization: function() {
  return this.get$useWorkers();
 },
 get$useWorkers: function() {
  return this.supportsWorkers;
 },
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$0();
  this.isolates = $.HashMapImplementation$0();
  this.managers = $.HashMapImplementation$0();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$0();
    this._nativeInitWorkerMessageHandler$0();
  }
 },
 is$_Manager: true
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id="],
 super: "Object",
 unregister$1: function(portId) {
  $.intTypeCheck(portId);
  this.ports.remove$1(portId);
  $.isEmpty(this.ports) === true && $._globalState().get$isolates().remove$1(this.id);
 },
 register$2: function(portId, port) {
  $.intTypeCheck(portId);
  $.propertyTypeCheck(port, 'is$ReceivePort2');
  if (this.ports.containsKey$1(portId) === true) throw $.captureStackTrace($.ExceptionImplementation$1('Registry: ports must be registered only once.'));
  $.indexSet(this.ports, portId, port);
  $.indexSet($._globalState().get$isolates(), this.id, this);
 },
 lookup$1: function(portId) {
  $.intTypeCheck(portId);
  return $.index(this.ports, portId);
 },
 _setGlobals$0: function() {
  $setGlobals(this);;
 },
 eval$1: function(code) {
  $.functionTypeCheck(code);
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = (void 0);
  try {
    result = code.$call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    !$.eqNullB(old) && old._setGlobals$0();
  }
  return result;
 },
 initGlobals$0: function() {
  $initGlobals(this);;
 },
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$0();
  this.initGlobals$0();
 },
 is$_IsolateContext: true
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState().get$isWorker() !== true) this._runHelper$0();
  else {
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }
  }
 },
 _runHelper$0: function() {
  if (!$.eqNullB($._window())) {
    new $.Closure100(this).$call$0();
  } else {
    for (; this.runIteration$0() === true; ) {
    }
  }
 },
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if ($.eqNullB(event$)) {
    if ($._globalState().get$isWorker() === true) $._globalState().maybeCloseWorker$0();
    else {
      if (!$.eqNullB($._globalState().get$rootContext()) && $._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && $._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true) throw $.captureStackTrace($.ExceptionImplementation$1('Program exited with open ReceivePorts.'));
    }
    return false;
  }
  event$.process$0();
  return true;
 },
 dequeue$0: function() {
  if ($.isEmpty(this.events) === true) return;
  return this.events.removeFirst$0();
 },
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$3(isolate, fn, msg));
 }
};

$$._IsolateEvent = {"":
 ["message", "fn", "isolate"],
 super: "Object",
 process$0: function() {
  this.isolate.eval$1(this.fn);
 }
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 terminate$0: function() {
 },
 postMessage$1: function(msg) {
  $globalThis.postMessage(msg);;
 },
 set$onmessage: function(f) {
  throw $.captureStackTrace($.ExceptionImplementation$1('onmessage should not be set on MainManagerStub'));
 },
 set$id: function(i) {
  $.intTypeCheck(i);
  throw $.captureStackTrace($.NotImplementedException$1((void 0)));
 },
 get$id: function() {
  return 0;
 }
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_lib3_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._lib3_receivePort.get$_id();
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && !!other.is$_NativeJsSendPort && $.eqB(this._lib3_receivePort, other._lib3_receivePort);
 },
 send$2: function(message, replyTo) {
  $.propertyTypeCheck(replyTo, 'is$SendPort');
  var t1 = ({});
  t1.replyTo_5 = replyTo;
  t1.message_4 = message;
  $._waitForPendingPorts([t1.message_4, t1.replyTo_5], new $.Closure80(this, t1));
 },
 send$1: function(message) {
  return this.send$2(message,(void 0))
},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId?", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && !!other.is$_WorkerSendPort && $.eqB(this._workerId, other._workerId) && $.eqB(this._isolateId, other.get$_isolateId()) && $.eqB(this._receivePortId, other.get$_receivePortId());
 },
 send$2: function(message, replyTo) {
  $.propertyTypeCheck(replyTo, 'is$SendPort');
  var t1 = ({});
  t1.replyTo_2 = replyTo;
  t1.message_1 = message;
  $._waitForPendingPorts([t1.message_1, t1.replyTo_2], new $.Closure91(this, t1));
 },
 send$1: function(message) {
  return this.send$2(message,(void 0))
},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._BufferingSendPort = {"":
 ["pending=", "_futurePort?", "_port=", "_id?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._id;
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && !!other.is$_BufferingSendPort && $.eqB(this._id, other._id);
 },
 send$2: function(message, replyTo) {
  $.propertyTypeCheck(replyTo, 'is$SendPort');
  if (!$.eqNullB(this._port)) this._port.send$2(message, replyTo);
  else $.add$1(this.pending, $.makeLiteralMap(['message', message, 'replyTo', replyTo]));
 },
 send$1: function(message) {
  return this.send$2(message,(void 0))
},
 _BufferingSendPort$2: function(isolateId, _futurePort) {
  $._idCount = $.add($._idCount, 1);
  this._futurePort.then$1(new $.Closure78(this));
 },
 is$_BufferingSendPort: true,
 is$SendPort: true
};

$$._ReceivePortImpl = {"":
 ["_callback?", "_id?"],
 super: "Object",
 toSendPort$0: function() {
  return $._NativeJsSendPort$2(this, $._globalState().get$currentContext().get$id());
 },
 close$0: function() {
  this._callback = (void 0);
  $._globalState().get$currentContext().unregister$1(this._id);
 },
 receive$1: function(onMessage) {
  this._callback = onMessage;
 },
 _callback$2: function(arg0, arg1) { return this._callback.$call$2(arg0, arg1); },
 _ReceivePortImpl$0: function() {
  $._globalState().get$currentContext().register$2(this._id, this);
 },
 is$ReceivePort2: true
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_taggedObjects"],
 super: "_MessageTraverser",
 visitBufferingSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_BufferingSendPort');
  $.eqNullB(port.get$_port()) && $.add$1(this.ports, port.get$_futurePort());
 },
 visitMap$1: function(map) {
  $.callTypeCheck(map, 'is$Map');
  if (!(this._getInfo$1(map) === (void 0))) return;
  this._attachInfo$2(map, true);
  $.forEach(map.getValues$0(), new $.Closure84(this));
 },
 visitList$1: function(list) {
  $.listTypeCheck(list);
  if (!(this._getInfo$1(list) === (void 0))) return;
  this._attachInfo$2(list, true);
  $.forEach(list, new $.Closure88(this));
 },
 visitWorkerSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_WorkerSendPort');
 },
 visitNativeJsSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_NativeJsSendPort');
 },
 visitPrimitive$1: function(x) {
 }
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 _visitNativeOrWorkerPort$1: function(p) {
  $.propertyTypeCheck(p, 'is$SendPort');
  if (typeof p === 'object' && !!p.is$_NativeJsSendPort) {
    return this.visitNativeJsSendPort$1(p);
  }
  if (typeof p === 'object' && !!p.is$_WorkerSendPort) {
    return this.visitWorkerSendPort$1(p);
  }
  throw $.captureStackTrace('Illegal underlying port ' + $.S(p));
 },
 _getAttachedInfo$1: function(o) {
  return o['__MessageTraverser__attached_info__'];;
 },
 _setAttachedInfo$2: function(o, info) {
  o['__MessageTraverser__attached_info__'] = info;;
 },
 _clearAttachedInfo$1: function(o) {
  o['__MessageTraverser__attached_info__'] = (void 0);;
 },
 _dispatch$1: function(x) {
  if ($.isPrimitive(x) === true) return this.visitPrimitive$1(x);
  if (typeof x === 'object' && (x.constructor === Array || x.is$List2())) {
    return this.visitList$1(x);
  }
  if (typeof x === 'object' && x.is$Map()) {
    return this.visitMap$1(x);
  }
  if (typeof x === 'object' && !!x.is$_NativeJsSendPort) {
    return this.visitNativeJsSendPort$1(x);
  }
  if (typeof x === 'object' && !!x.is$_WorkerSendPort) {
    return this.visitWorkerSendPort$1(x);
  }
  if (typeof x === 'object' && !!x.is$_BufferingSendPort) {
    return this.visitBufferingSendPort$1(x);
  }
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
 },
 _getInfo$1: function(o) {
  return this._getAttachedInfo$1(o);
 },
 _attachInfo$2: function(o, info) {
  $.add$1(this._taggedObjects, o);
  this._setAttachedInfo$2(o, info);
 },
 _cleanup$0: function() {
  var len = $.intTypeCheck($.get$length(this._taggedObjects));
  for (var i = 0; $.ltB(i, len); i = $.intTypeCheck($.add(i, 1))) {
    this._clearAttachedInfo$1($.index(this._taggedObjects, i));
  }
  this._taggedObjects = (void 0);
 },
 traverse$1: function(x) {
  if ($.isPrimitive(x) === true) return this.visitPrimitive$1(x);
  this._taggedObjects = $.List((void 0));
  var result = (void 0);
  try {
    result = this._dispatch$1(x);
  } finally {
    this._cleanup$0();
  }
  return result;
 }
};

$$._Copier = {"":
 ["_taggedObjects"],
 super: "_MessageTraverser",
 visitBufferingSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_BufferingSendPort');
  if (!$.eqNullB(port.get$_port())) return this._visitNativeOrWorkerPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_WorkerSendPort');
  return $._WorkerSendPort$3(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
 },
 visitNativeJsSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_NativeJsSendPort');
  return $._NativeJsSendPort$2(port.get$_lib3_receivePort(), port.get$_isolateId());
 },
 visitMap$1: function(map) {
  $.callTypeCheck(map, 'is$Map');
  var t1 = ({});
  t1.copy_1 = $.callTypeCheck(this._getInfo$1(map), 'is$Map');
  if (!(t1.copy_1 === (void 0))) return t1.copy_1;
  t1.copy_1 = $.callTypeCheck($.HashMapImplementation$0(), 'is$Map');
  this._attachInfo$2(map, t1.copy_1);
  $.forEach(map, new $.Closure90(this, t1));
  return t1.copy_1;
 },
 visitList$1: function(list) {
  $.listTypeCheck(list);
  var copy = $.listTypeCheck(this._getInfo$1(list));
  if (!(copy === (void 0))) return copy;
  var len = $.intTypeCheck($.get$length(list));
  copy = $.List(len);
  this._attachInfo$2(list, copy);
  for (var i = 0; $.ltB(i, len); i = $.intTypeCheck($.add(i, 1))) {
    var t1 = this._dispatch$1($.index(list, i));
    if (i !== (i | 0)) throw $.iae(i);
    var t2 = copy.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Serializer = {"":
 ["_nextFreeRefId", "_taggedObjects"],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  $.listTypeCheck(list);
  var len = $.intTypeCheck($.get$length(list));
  var result = $.List(len);
  for (var i = 0; $.ltB(i, len); i = $.intTypeCheck($.add(i, 1))) {
    var t1 = this._dispatch$1($.index(list, i));
    if (i !== (i | 0)) throw $.iae(i);
    var t2 = result.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result[i] = t1;
  }
  return result;
 },
 visitBufferingSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_BufferingSendPort');
  if (!$.eqNullB(port.get$_port())) return this._visitNativeOrWorkerPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_WorkerSendPort');
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
 },
 visitNativeJsSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_NativeJsSendPort');
  return ['sendport', $._globalState().get$currentManagerId(), port.get$_isolateId(), port.get$_lib3_receivePort().get$_id()];
 },
 visitMap$1: function(map) {
  $.callTypeCheck(map, 'is$Map');
  var copyId = $.intTypeCheck(this._getInfo$1(map));
  if (!(copyId === (void 0))) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = $.add(id, 1);
  $.intTypeCheck(id);
  this._attachInfo$2(map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
 },
 visitList$1: function(list) {
  $.listTypeCheck(list);
  var copyId = $.intTypeCheck(this._getInfo$1(list));
  if (!(copyId === (void 0))) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = $.add(id, 1);
  $.intTypeCheck(id);
  this._attachInfo$2(list, id);
  return ['list', id, this._serializeList$1(list)];
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Deserializer = {"":
 ["_deserialized"],
 super: "Object",
 _deserializeSendPort$1: function(x) {
  $.listTypeCheck(x);
  var managerId = $.intTypeCheck($.index(x, 1));
  var isolateId = $.intTypeCheck($.index(x, 2));
  var receivePortId = $.intTypeCheck($.index(x, 3));
  if ($.eqB(managerId, $._globalState().get$currentManagerId())) {
    var isolate = $.index($._globalState().get$isolates(), isolateId);
    if ($.eqNullB(isolate)) return;
    return $._NativeJsSendPort$2(isolate.lookup$1(receivePortId), isolateId);
  }
  return $._WorkerSendPort$3(managerId, isolateId, receivePortId);
 },
 _deserializeMap$1: function(x) {
  $.listTypeCheck(x);
  var result = $.callTypeCheck($.HashMapImplementation$0(), 'is$Map');
  var id = $.intTypeCheck($.index(x, 1));
  $.indexSet(this._deserialized, id, result);
  var keys = $.listTypeCheck($.index(x, 2));
  var values = $.listTypeCheck($.index(x, 3));
  var len = $.intTypeCheck($.get$length(keys));
  $.assert($.eq(len, $.get$length(values)));
  for (var i = 0; $.ltB(i, len); i = $.intTypeCheck($.add(i, 1))) {
    result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
  }
  return result;
 },
 _deserializeList$1: function(x) {
  $.listTypeCheck(x);
  var id = $.intTypeCheck($.index(x, 1));
  var dartList = $.listTypeCheck($.index(x, 2));
  $.indexSet(this._deserialized, id, dartList);
  var len = $.intTypeCheck($.get$length(dartList));
  for (var i = 0; $.ltB(i, len); i = $.intTypeCheck($.add(i, 1))) {
    $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
  }
  return dartList;
 },
 _deserializeRef$1: function(x) {
  $.listTypeCheck(x);
  var id = $.intTypeCheck($.index(x, 1));
  var result = $.index(this._deserialized, id);
  $.assert(!(result === (void 0)));
  return result;
 },
 _deserializeHelper$1: function(x) {
  if ($.isPrimitive2(x) === true) return x;
  $.assert(typeof x === 'object' && (x.constructor === Array || x.is$List2()));
  switch ($.index(x, 0)) {
    case 'ref':
      return this._deserializeRef$1(x);
    case 'list':
      return this._deserializeList$1(x);
    case 'map':
      return this._deserializeMap$1(x);
    case 'sendport':
      return this._deserializeSendPort$1(x);
    default:
      throw $.captureStackTrace('Unexpected serialized object');
  }
 },
 deserialize$1: function(x) {
  if ($.isPrimitive2(x) === true) return x;
  this._deserialized = $.HashMapImplementation$0();
  return this._deserializeHelper$1(x);
 }
};

$$.Uri = {"":
 ["fragment", "query", "path", "port", "domain", "userInfo", "scheme"],
 super: "Object",
 toString$0: function() {
  var sb = $.propertyTypeCheck($.StringBufferImpl$1(''), 'is$StringBuffer');
  var t1 = this.scheme;
  $._addIfNonEmpty(sb, t1, t1, ':');
  if (this.hasAuthority$0() === true || $.eqB(t1, 'file')) {
    sb.add$1('//');
    t1 = this.userInfo;
    $._addIfNonEmpty(sb, t1, t1, '@');
    t1 = this.domain;
    sb.add$1(t1 === (void 0) ? 'null' : t1);
    t1 = this.port;
    if (!$.eqB(t1, 0)) {
      sb.add$1(':');
      sb.add$1($.toString(t1));
    }
  }
  t1 = this.path;
  sb.add$1(t1 === (void 0) ? 'null' : t1);
  t1 = this.query;
  $._addIfNonEmpty(sb, t1, '?', t1);
  t1 = this.fragment;
  $._addIfNonEmpty(sb, t1, '#', t1);
  return sb.toString$0();
 },
 hasAuthority$0: function() {
  return !$.eqB(this.userInfo, '') || !$.eqB(this.domain, '') || !$.eqB(this.port, 0);
 },
 isAbsolute$0: function() {
  if ('' === this.scheme) return false;
  if (!('' === this.fragment)) return false;
  return true;
 },
 query$1: function(arg0) { return this.query.$call$1(arg0); }
};

$$.Pronoun = {"":
 ["self", "genitive?", "accusative?", "nominative?"],
 super: "Object",
 toString$0: function() {
  return this.nominative;
 }
};

$$.Storyline = {"":
 ["reports", "strBuf"],
 super: "Object",
 toString$0: function() {
  var length$ = $.intTypeCheck($.get$length(this.reports));
  if (length$ !== (length$ | 0)) return this.toString$0$bailout(1, length$);
  if (length$ < 1) return '';
  for (var t1 = length$ - 1, but = false, endPreviousSentence = true, endThisSentence = false, lastEndSentence = -1, i = 0; $.ltB(i, length$); i = $.intTypeCheck($.add(i, 1))) {
    if (!$.eqB(i, 0)) {
      var objectSubjectSwitch = $.boolTypeCheck(this.exchanged$4('subject', 'object', $.sub(i, 1), i));
      but = ($.index($.index(this.reports, i), 'but') === true || this.oppositeSentiment$2(i, $.sub(i, 1)) === true) && $.index($.index(this.reports, $.sub(i, 1)), 'but') !== true;
      $.indexSet($.index(this.reports, i), 'but', but);
      if (!($.geB($.sub(i, lastEndSentence), 3) || endThisSentence || $.index($.index(this.reports, i), 'startSentence') === true || $.index($.index(this.reports, $.sub(i, 1)), 'endSentence') === true || $.index($.index(this.reports, i), 'wholeSentence') === true)) {
        var t2 = !(this.same$3('subject', i, $.sub(i, 1)) === true || objectSubjectSwitch === true);
      } else t2 = true;
      if (!t2) {
        t2 = but && $.gtB($.sub(i, lastEndSentence), 1);
      } else t2 = true;
      if (!t2) {
        t2 = but && $.index($.index(this.reports, $.sub(i, 1)), 'but') === true;
      } else t2 = true;
      endPreviousSentence = t2 || $.gtB(this.timeSincePrevious$1(i), $.SHORT_TIME);
      if (endPreviousSentence) {
        if ($.index($.index(this.reports, $.sub(i, 1)), 'wholeSentence') === true) $.add$1(this.strBuf, ' ');
        else $.add$1(this.strBuf, '. ');
        but && $.index($.index(this.reports, i), 'wholeSentence') !== true && $.add$1(this.strBuf, $.randomly(['But ', 'But ', 'However, ', 'Nonetheless, ', 'Nevertheless, ']));
        endThisSentence = false;
      } else {
        if (but) {
          $.add$1(this.strBuf, $.randomly([' but ', ' but ', ' yet ', ', but ']));
          endThisSentence = this.sameSentiment$2(i, $.add(i, 1)) !== true && true;
        } else {
          if (this.same$3('subject', i, $.sub(i, 1)) === true && $.startsWith(this.string$1(i), '<subject> ') === true && $.ltB(i, t1) && $.ltB($.sub(i, lastEndSentence), 2)) {
            $.add$1(this.strBuf, ', ');
            endThisSentence = false;
          } else {
            $.add$1(this.strBuf, $.randomly([' and ', ' and ', ', and ']));
            endThisSentence = true;
          }
        }
      }
    }
    var report = $.stringTypeCheck(this.string$1(i));
    t2 = endPreviousSentence === true;
    var t3 = !t2;
    if (t3) {
      if (this.same$3('subject', i, $.sub(i, 1)) === true) {
        if ($.startsWith(this.string$1($.sub(i, 1)), '<subject> ') === true) {
          if ($.startsWith(report, '<subject> ') === true) {
            report = $.stringTypeCheck($.replaceFirst(report, '<subject> ', ''));
          }
        }
      }
    }
    report = $.stringTypeCheck(this.substitute$2(i, report));
    if ((t2 || $.eqB(i, 0)) && but !== true) {
      report = $.stringTypeCheck($.capitalize(report));
    }
    $.add$1(this.strBuf, report);
    if (t2) lastEndSentence = i;
    if ($.index($.index(this.reports, i), 'wholeSentence') === true) endThisSentence = true;
  }
  $.index($.index(this.reports, t1), 'wholeSentence') !== true && $.add$1(this.strBuf, '.');
  return $.toString(this.strBuf);
 },
 toString$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.intTypeCheck($.get$length(this.reports));
    case 1:
      state = 0;
      if ($.ltB(length$, 1)) return '';
      var t1 = 3 - 1;
      var but = false;
      var endPreviousSentence = true;
      var endThisSentence = false;
      var lastEndSentence = -1;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, length$)) break L0;
        if (!$.eqB(i, 0)) {
          var objectSubjectSwitch = $.boolTypeCheck(this.exchanged$4('subject', 'object', $.sub(i, 1), i));
          but = ($.index($.index(this.reports, i), 'but') === true || this.oppositeSentiment$2(i, $.sub(i, 1)) === true) && $.index($.index(this.reports, $.sub(i, 1)), 'but') !== true;
          $.indexSet($.index(this.reports, i), 'but', but);
          if (!($.geB($.sub(i, lastEndSentence), 3) || endThisSentence || $.index($.index(this.reports, i), 'startSentence') === true || $.index($.index(this.reports, $.sub(i, 1)), 'endSentence') === true || $.index($.index(this.reports, i), 'wholeSentence') === true)) {
            var t2 = !(this.same$3('subject', i, $.sub(i, 1)) === true || objectSubjectSwitch === true);
          } else t2 = true;
          if (!t2) {
            t2 = but && $.gtB($.sub(i, lastEndSentence), 1);
          } else t2 = true;
          if (!t2) {
            t2 = but && $.index($.index(this.reports, $.sub(i, 1)), 'but') === true;
          } else t2 = true;
          endPreviousSentence = t2 || $.gtB(this.timeSincePrevious$1(i), $.SHORT_TIME);
          if (endPreviousSentence) {
            if ($.index($.index(this.reports, $.sub(i, 1)), 'wholeSentence') === true) $.add$1(this.strBuf, ' ');
            else $.add$1(this.strBuf, '. ');
            but && $.index($.index(this.reports, i), 'wholeSentence') !== true && $.add$1(this.strBuf, $.randomly(['But ', 'But ', 'However, ', 'Nonetheless, ', 'Nevertheless, ']));
            endThisSentence = false;
          } else {
            if (but) {
              $.add$1(this.strBuf, $.randomly([' but ', ' but ', ' yet ', ', but ']));
              endThisSentence = this.sameSentiment$2(i, $.add(i, 1)) !== true && true;
            } else {
              if (this.same$3('subject', i, $.sub(i, 1)) === true && $.startsWith(this.string$1(i), '<subject> ') === true && $.ltB(i, $.sub(length$, 1)) && $.ltB($.sub(i, lastEndSentence), t1)) {
                $.add$1(this.strBuf, ', ');
                endThisSentence = false;
              } else {
                $.add$1(this.strBuf, $.randomly([' and ', ' and ', ', and ']));
                endThisSentence = true;
              }
            }
          }
        }
        var report = $.stringTypeCheck(this.string$1(i));
        t2 = endPreviousSentence === true;
        var t3 = !t2;
        if (t3) {
          if (this.same$3('subject', i, $.sub(i, 1)) === true) {
            if ($.startsWith(this.string$1($.sub(i, 1)), '<subject> ') === true) {
              if ($.startsWith(report, '<subject> ') === true) {
                report = $.stringTypeCheck($.replaceFirst(report, '<subject> ', ''));
              }
            }
          }
        }
        report = $.stringTypeCheck(this.substitute$2(i, report));
        if ((t2 || $.eqB(i, 0)) && but !== true) {
          report = $.stringTypeCheck($.capitalize(report));
        }
        $.add$1(this.strBuf, report);
        if (t2) lastEndSentence = i;
        if ($.index($.index(this.reports, i), 'wholeSentence') === true) endThisSentence = true;
        i = $.intTypeCheck($.add(i, 1));
      }
      $.index($.index(this.reports, $.sub(length$, 1)), 'wholeSentence') !== true && $.add$1(this.strBuf, '.');
      return $.toString(this.strBuf);
  }
 },
 clear$0: function() {
  $.clear(this.reports);
  $.clear(this.strBuf);
 },
 substitute$4: function(i, str, useSubjectPronoun, useObjectPronoun) {
  if (typeof i !== 'number') return this.substitute$4$bailout(i, str, useSubjectPronoun, useObjectPronoun, 1, i);
  $.intTypeCheck(i);
  $.stringTypeCheck(str);
  $.boolTypeCheck(useSubjectPronoun);
  $.boolTypeCheck(useObjectPronoun);
  var result = $.stringTypeCheck($.replaceAll(str, '<action>', this.string$1(i)));
  if (useObjectPronoun === true || this.same$3('object', i, i - 1) === true) {
    result = $.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll(result, '<object>', this.object$1(i).get$pronoun().get$accusative())), '<object\'s>', this.object$1(i).get$pronoun().get$genitive()));
  }
  if (useSubjectPronoun === true || this.same$3('subject', i, i - 1) === true) {
    result = $.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll(result, '<subject>', this.subject$1(i).get$pronoun().get$nominative())), '<subject\'s>', this.subject$1(i).get$pronoun().get$genitive()));
  }
  var t1 = i - 1;
  if (!$.eqNullB(this.object$1(t1)) && !$.eqNullB(this.subject$1(i)) && !$.eqNullB(this.subject$1(t1)) && $.eqB(this.object$1(t1), this.subject$1(i)) && !$.eqB(this.subject$1(t1).get$pronoun(), this.subject$1(i).get$pronoun())) {
    result = $.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll(result, '<subject>', this.subject$1(i).get$pronoun().get$nominative())), '<subject\'s>', this.subject$1(i).get$pronoun().get$genitive()));
  }
  if (!$.eqNullB(this.subject$1(t1)) && !$.eqNullB(this.object$1(i)) && !$.eqNullB(this.subject$1(t1)) && $.eqB(this.subject$1(t1), this.object$1(i)) && !$.eqB(this.subject$1(t1).get$pronoun(), this.subject$1(i).get$pronoun())) {
    result = $.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll(result, '<object>', this.object$1(i).get$pronoun().get$accusative())), '<object\'s>', this.object$1(i).get$pronoun().get$genitive()));
  }
  return $.getString(result, this.subject$1(i), this.object$1(i));
 },
 substitute$4$bailout: function(i, str, useSubjectPronoun, useObjectPronoun, state, env0) {
  switch (state) {
    case 1:
      i = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.intTypeCheck(i);
      $.stringTypeCheck(str);
      $.boolTypeCheck(useSubjectPronoun);
      $.boolTypeCheck(useObjectPronoun);
      var result = $.stringTypeCheck($.replaceAll(str, '<action>', this.string$1(i)));
      if (useObjectPronoun === true || this.same$3('object', i, $.sub(i, 1)) === true) {
        result = $.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll(result, '<object>', this.object$1(i).get$pronoun().get$accusative())), '<object\'s>', this.object$1(i).get$pronoun().get$genitive()));
      }
      if (useSubjectPronoun === true || this.same$3('subject', i, $.sub(i, 1)) === true) {
        result = $.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll(result, '<subject>', this.subject$1(i).get$pronoun().get$nominative())), '<subject\'s>', this.subject$1(i).get$pronoun().get$genitive()));
      }
      if (!$.eqNullB(this.object$1($.sub(i, 1))) && !$.eqNullB(this.subject$1(i)) && !$.eqNullB(this.subject$1($.sub(i, 1))) && $.eqB(this.object$1($.sub(i, 1)), this.subject$1(i)) && !$.eqB(this.subject$1($.sub(i, 1)).get$pronoun(), this.subject$1(i).get$pronoun())) {
        result = $.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll(result, '<subject>', this.subject$1(i).get$pronoun().get$nominative())), '<subject\'s>', this.subject$1(i).get$pronoun().get$genitive()));
      }
      if (!$.eqNullB(this.subject$1($.sub(i, 1))) && !$.eqNullB(this.object$1(i)) && !$.eqNullB(this.subject$1($.sub(i, 1))) && $.eqB(this.subject$1($.sub(i, 1)), this.object$1(i)) && !$.eqB(this.subject$1($.sub(i, 1)).get$pronoun(), this.subject$1(i).get$pronoun())) {
        result = $.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll(result, '<object>', this.object$1(i).get$pronoun().get$accusative())), '<object\'s>', this.object$1(i).get$pronoun().get$genitive()));
      }
      return $.getString(result, this.subject$1(i), this.object$1(i));
  }
 },
 substitute$2: function(i,str) {
  return this.substitute$4(i,str,false,false)
},
 oppositeSentiment$2: function(i, j) {
  $.intTypeCheck(i);
  $.intTypeCheck(j);
  if (this.valid$1(i) !== true || this.valid$1(j) !== true) return false;
  if (this.exchanged$4('subject', 'object', i, j) === true && !$.eqB(this.subject$1(i).get$team(), this.subject$1(j).get$team())) {
    var t1 = this.reports;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.oppositeSentiment$2$bailout(i, j, 1, t1);
    if (i !== (i | 0)) throw $.iae(i);
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    if ($.index(t1[i], 'positive') === true) {
      t1 = this.reports;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.oppositeSentiment$2$bailout(i, j, 2, t1);
      if (j !== (j | 0)) throw $.iae(j);
      t2 = t1.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      t1 = $.index(t1[j], 'positive') === true;
    } else t1 = false;
    if (t1) return true;
    t1 = this.reports;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.oppositeSentiment$2$bailout(i, j, 3, t1);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    if ($.index(t1[i], 'negative') === true) {
      t1 = this.reports;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.oppositeSentiment$2$bailout(i, j, 4, t1);
      if (j !== (j | 0)) throw $.iae(j);
      t2 = t1.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      t1 = $.index(t1[j], 'negative') === true;
    } else t1 = false;
    if (t1) return true;
  }
  if (this.same$3('subject', i, j) !== true) return false;
  t1 = this.reports;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.oppositeSentiment$2$bailout(i, j, 5, t1);
  if (i !== (i | 0)) throw $.iae(i);
  t2 = t1.length;
  if (i < 0 || i >= t2) throw $.ioore(i);
  if ($.index(t1[i], 'positive') === true) {
    t1 = this.reports;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.oppositeSentiment$2$bailout(i, j, 6, t1);
    if (j !== (j | 0)) throw $.iae(j);
    t2 = t1.length;
    if (j < 0 || j >= t2) throw $.ioore(j);
    t1 = $.index(t1[j], 'negative') === true;
  } else t1 = false;
  if (t1) return true;
  t1 = this.reports;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.oppositeSentiment$2$bailout(i, j, 7, t1);
  t2 = t1.length;
  if (i < 0 || i >= t2) throw $.ioore(i);
  if ($.index(t1[i], 'negative') === true) {
    t1 = this.reports;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.oppositeSentiment$2$bailout(i, j, 8, t1);
    if (j !== (j | 0)) throw $.iae(j);
    t2 = t1.length;
    if (j < 0 || j >= t2) throw $.ioore(j);
    t1 = $.index(t1[j], 'positive') === true;
  } else t1 = false;
  if (t1) return true;
  return false;
 },
 oppositeSentiment$2$bailout: function(i, j, state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      break;
    case 4:
      t1 = env0;
      break;
    case 5:
      t1 = env0;
      break;
    case 6:
      t1 = env0;
      break;
    case 7:
      t1 = env0;
      break;
    case 8:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      $.intTypeCheck(i);
      $.intTypeCheck(j);
      if (this.valid$1(i) !== true || this.valid$1(j) !== true) return false;
    case 1:
    case 2:
    case 3:
    case 4:
      if (state == 1 || state == 2 || state == 3 || state == 4 || (state == 0 && (this.exchanged$4('subject', 'object', i, j) === true && !$.eqB(this.subject$1(i).get$team(), this.subject$1(j).get$team())))) {
        switch (state) {
          case 0:
            var t1 = this.reports;
          case 1:
            state = 0;
          case 2:
            if (state == 2 || (state == 0 && $.index($.index(t1, i), 'positive') === true)) {
              switch (state) {
                case 0:
                  t1 = this.reports;
                case 2:
                  state = 0;
                  t1 = $.index($.index(t1, j), 'positive') === true;
              }
            } else {
              t1 = false;
            }
            if (t1) return true;
            t1 = this.reports;
          case 3:
            state = 0;
          case 4:
            if (state == 4 || (state == 0 && $.index($.index(t1, i), 'negative') === true)) {
              switch (state) {
                case 0:
                  t1 = this.reports;
                case 4:
                  state = 0;
                  t1 = $.index($.index(t1, j), 'negative') === true;
              }
            } else {
              t1 = false;
            }
            if (t1) return true;
        }
      }
      if (this.same$3('subject', i, j) !== true) return false;
      t1 = this.reports;
    case 5:
      state = 0;
    case 6:
      if (state == 6 || (state == 0 && $.index($.index(t1, i), 'positive') === true)) {
        switch (state) {
          case 0:
            t1 = this.reports;
          case 6:
            state = 0;
            t1 = $.index($.index(t1, j), 'negative') === true;
        }
      } else {
        t1 = false;
      }
      if (t1) return true;
      t1 = this.reports;
    case 7:
      state = 0;
    case 8:
      if (state == 8 || (state == 0 && $.index($.index(t1, i), 'negative') === true)) {
        switch (state) {
          case 0:
            t1 = this.reports;
          case 8:
            state = 0;
            t1 = $.index($.index(t1, j), 'positive') === true;
        }
      } else {
        t1 = false;
      }
      if (t1) return true;
      return false;
  }
 },
 sameSentiment$2: function(i, j) {
  $.intTypeCheck(i);
  $.intTypeCheck(j);
  if (this.valid$1(i) !== true || this.valid$1(j) !== true) return false;
  if (this.exchanged$4('subject', 'object', i, j) === true && !$.eqB(this.subject$1(i).get$team(), this.subject$1(j).get$team())) {
    var t1 = this.reports;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.sameSentiment$2$bailout(i, j, 1, t1);
    if (i !== (i | 0)) throw $.iae(i);
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    if ($.index(t1[i], 'positive') === true) {
      t1 = this.reports;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.sameSentiment$2$bailout(i, j, 2, t1);
      if (j !== (j | 0)) throw $.iae(j);
      t2 = t1.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      t1 = $.index(t1[j], 'negative') === true;
    } else t1 = false;
    if (t1) return true;
    t1 = this.reports;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.sameSentiment$2$bailout(i, j, 3, t1);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    if ($.index(t1[i], 'negative') === true) {
      t1 = this.reports;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.sameSentiment$2$bailout(i, j, 4, t1);
      if (j !== (j | 0)) throw $.iae(j);
      t2 = t1.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      t1 = $.index(t1[j], 'positive') === true;
    } else t1 = false;
    if (t1) return true;
  }
  if (this.same$3('subject', i, j) !== true) return false;
  t1 = this.reports;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.sameSentiment$2$bailout(i, j, 5, t1);
  if (i !== (i | 0)) throw $.iae(i);
  t2 = t1.length;
  if (i < 0 || i >= t2) throw $.ioore(i);
  if ($.index(t1[i], 'positive') === true) {
    t1 = this.reports;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.sameSentiment$2$bailout(i, j, 6, t1);
    if (j !== (j | 0)) throw $.iae(j);
    t2 = t1.length;
    if (j < 0 || j >= t2) throw $.ioore(j);
    t1 = $.index(t1[j], 'positive') === true;
  } else t1 = false;
  if (t1) return true;
  t1 = this.reports;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.sameSentiment$2$bailout(i, j, 7, t1);
  t2 = t1.length;
  if (i < 0 || i >= t2) throw $.ioore(i);
  if ($.index(t1[i], 'negative') === true) {
    t1 = this.reports;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.sameSentiment$2$bailout(i, j, 8, t1);
    if (j !== (j | 0)) throw $.iae(j);
    t2 = t1.length;
    if (j < 0 || j >= t2) throw $.ioore(j);
    t1 = $.index(t1[j], 'negative') === true;
  } else t1 = false;
  if (t1) return true;
  return false;
 },
 sameSentiment$2$bailout: function(i, j, state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      break;
    case 4:
      t1 = env0;
      break;
    case 5:
      t1 = env0;
      break;
    case 6:
      t1 = env0;
      break;
    case 7:
      t1 = env0;
      break;
    case 8:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      $.intTypeCheck(i);
      $.intTypeCheck(j);
      if (this.valid$1(i) !== true || this.valid$1(j) !== true) return false;
    case 1:
    case 2:
    case 3:
    case 4:
      if (state == 1 || state == 2 || state == 3 || state == 4 || (state == 0 && (this.exchanged$4('subject', 'object', i, j) === true && !$.eqB(this.subject$1(i).get$team(), this.subject$1(j).get$team())))) {
        switch (state) {
          case 0:
            var t1 = this.reports;
          case 1:
            state = 0;
          case 2:
            if (state == 2 || (state == 0 && $.index($.index(t1, i), 'positive') === true)) {
              switch (state) {
                case 0:
                  t1 = this.reports;
                case 2:
                  state = 0;
                  t1 = $.index($.index(t1, j), 'negative') === true;
              }
            } else {
              t1 = false;
            }
            if (t1) return true;
            t1 = this.reports;
          case 3:
            state = 0;
          case 4:
            if (state == 4 || (state == 0 && $.index($.index(t1, i), 'negative') === true)) {
              switch (state) {
                case 0:
                  t1 = this.reports;
                case 4:
                  state = 0;
                  t1 = $.index($.index(t1, j), 'positive') === true;
              }
            } else {
              t1 = false;
            }
            if (t1) return true;
        }
      }
      if (this.same$3('subject', i, j) !== true) return false;
      t1 = this.reports;
    case 5:
      state = 0;
    case 6:
      if (state == 6 || (state == 0 && $.index($.index(t1, i), 'positive') === true)) {
        switch (state) {
          case 0:
            t1 = this.reports;
          case 6:
            state = 0;
            t1 = $.index($.index(t1, j), 'positive') === true;
        }
      } else {
        t1 = false;
      }
      if (t1) return true;
      t1 = this.reports;
    case 7:
      state = 0;
    case 8:
      if (state == 8 || (state == 0 && $.index($.index(t1, i), 'negative') === true)) {
        switch (state) {
          case 0:
            t1 = this.reports;
          case 8:
            state = 0;
            t1 = $.index($.index(t1, j), 'negative') === true;
        }
      } else {
        t1 = false;
      }
      if (t1) return true;
      return false;
  }
 },
 valid$1: function(i) {
  $.intTypeCheck(i);
  if ($.geB(i, $.get$length(this.reports)) || $.ltB(i, 0)) return false;
  return true;
 },
 exchanged$4: function(key1, key2, i, j) {
  $.stringTypeCheck(key1);
  $.stringTypeCheck(key2);
  $.intTypeCheck(i);
  $.intTypeCheck(j);
  if (this.valid$1(i) !== true || this.valid$1(j) !== true) return false;
  var t1 = this.reports;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 1, t1, 0);
  if (i !== (i | 0)) throw $.iae(i);
  var t2 = t1.length;
  if (i < 0 || i >= t2) throw $.ioore(i);
  t1 = t1[i];
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 2, t1, 0);
  if (key1 !== (key1 | 0)) throw $.iae(key1);
  var t3 = t1.length;
  if (key1 < 0 || key1 >= t3) throw $.ioore(key1);
  if (!$.eqNullB(t1[key1])) {
    t1 = this.reports;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 3, t1, 0);
    if (j !== (j | 0)) throw $.iae(j);
    t2 = t1.length;
    if (j < 0 || j >= t2) throw $.ioore(j);
    t1 = t1[j];
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 4, t1, 0);
    t3 = t1.length;
    if (key1 < 0 || key1 >= t3) throw $.ioore(key1);
    t1 = $.eqNullB(t1[key1]);
  } else t1 = true;
  if (t1) return false;
  t1 = this.reports;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 5, t1, 0);
  t2 = t1.length;
  if (i < 0 || i >= t2) throw $.ioore(i);
  t1 = t1[i];
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 6, t1, 0);
  if (key2 !== (key2 | 0)) throw $.iae(key2);
  t3 = t1.length;
  if (key2 < 0 || key2 >= t3) throw $.ioore(key2);
  if (!$.eqNullB(t1[key2])) {
    t1 = this.reports;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 7, t1, 0);
    if (j !== (j | 0)) throw $.iae(j);
    t2 = t1.length;
    if (j < 0 || j >= t2) throw $.ioore(j);
    t1 = t1[j];
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 8, t1, 0);
    t3 = t1.length;
    if (key2 < 0 || key2 >= t3) throw $.ioore(key2);
    t1 = $.eqNullB(t1[key2]);
  } else t1 = true;
  if (t1) return false;
  t1 = this.reports;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 9, t1, 0);
  t2 = t1.length;
  if (i < 0 || i >= t2) throw $.ioore(i);
  t1 = t1[i];
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 10, t1, 0);
  t3 = t1.length;
  if (key1 < 0 || key1 >= t3) throw $.ioore(key1);
  t1 = t1[key1];
  var t4 = this.reports;
  if (typeof t4 !== 'string' && (typeof t4 !== 'object'||t4.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 11, t1, t4);
  if (j !== (j | 0)) throw $.iae(j);
  var t5 = t4.length;
  if (j < 0 || j >= t5) throw $.ioore(j);
  t4 = t4[j];
  if (typeof t4 !== 'string' && (typeof t4 !== 'object'||t4.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 12, t1, t4);
  var t6 = t4.length;
  if (key2 < 0 || key2 >= t6) throw $.ioore(key2);
  if ($.eqB(t1, t4[key2])) {
    t1 = this.reports;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 13, t1, 0);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i];
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 14, t1, 0);
    t3 = t1.length;
    if (key2 < 0 || key2 >= t3) throw $.ioore(key2);
    t1 = t1[key2];
    t4 = this.reports;
    if (typeof t4 !== 'string' && (typeof t4 !== 'object'||t4.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 15, t1, t4);
    t5 = t4.length;
    if (j < 0 || j >= t5) throw $.ioore(j);
    t4 = t4[j];
    if (typeof t4 !== 'string' && (typeof t4 !== 'object'||t4.constructor !== Array)) return this.exchanged$4$bailout(key1, key2, i, j, 16, t1, t4);
    t6 = t4.length;
    if (key1 < 0 || key1 >= t6) throw $.ioore(key1);
    t1 = $.eqB(t1, t4[key1]);
  } else t1 = false;
  if (t1) return true;
  return false;
 },
 exchanged$4$bailout: function(key1, key2, i, j, state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      break;
    case 4:
      t1 = env0;
      break;
    case 5:
      t1 = env0;
      break;
    case 6:
      t1 = env0;
      break;
    case 7:
      t1 = env0;
      break;
    case 8:
      t1 = env0;
      break;
    case 9:
      t1 = env0;
      break;
    case 10:
      t1 = env0;
      break;
    case 11:
      t1 = env0;
      t2 = env1;
      break;
    case 12:
      t1 = env0;
      t2 = env1;
      break;
    case 13:
      t1 = env0;
      break;
    case 14:
      t1 = env0;
      break;
    case 15:
      t1 = env0;
      t2 = env1;
      break;
    case 16:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      $.stringTypeCheck(key1);
      $.stringTypeCheck(key2);
      $.intTypeCheck(i);
      $.intTypeCheck(j);
      if (this.valid$1(i) !== true || this.valid$1(j) !== true) return false;
      var t1 = this.reports;
    case 1:
      state = 0;
      t1 = $.index(t1, i);
    case 2:
      state = 0;
    case 3:
    case 4:
      if (state == 3 || state == 4 || (state == 0 && !$.eqNullB($.index(t1, key1)))) {
        switch (state) {
          case 0:
            t1 = this.reports;
          case 3:
            state = 0;
            t1 = $.index(t1, j);
          case 4:
            state = 0;
            t1 = $.eqNullB($.index(t1, key1));
        }
      } else {
        t1 = true;
      }
      if (t1) return false;
      t1 = this.reports;
    case 5:
      state = 0;
      t1 = $.index(t1, i);
    case 6:
      state = 0;
    case 7:
    case 8:
      if (state == 7 || state == 8 || (state == 0 && !$.eqNullB($.index(t1, key2)))) {
        switch (state) {
          case 0:
            t1 = this.reports;
          case 7:
            state = 0;
            t1 = $.index(t1, j);
          case 8:
            state = 0;
            t1 = $.eqNullB($.index(t1, key2));
        }
      } else {
        t1 = true;
      }
      if (t1) return false;
      t1 = this.reports;
    case 9:
      state = 0;
      t1 = $.index(t1, i);
    case 10:
      state = 0;
      t1 = $.index(t1, key1);
      var t2 = this.reports;
    case 11:
      state = 0;
      t2 = $.index(t2, j);
    case 12:
      state = 0;
    case 13:
    case 14:
    case 15:
    case 16:
      if (state == 13 || state == 14 || state == 15 || state == 16 || (state == 0 && $.eqB(t1, $.index(t2, key2)))) {
        switch (state) {
          case 0:
            t1 = this.reports;
          case 13:
            state = 0;
            t1 = $.index(t1, i);
          case 14:
            state = 0;
            t1 = $.index(t1, key2);
            t2 = this.reports;
          case 15:
            state = 0;
            t2 = $.index(t2, j);
          case 16:
            state = 0;
            t1 = $.eqB(t1, $.index(t2, key1));
        }
      } else {
        t1 = false;
      }
      if (t1) return true;
      return false;
  }
 },
 same$3: function(key, i, j) {
  $.stringTypeCheck(key);
  $.intTypeCheck(i);
  $.intTypeCheck(j);
  if (this.valid$1(i) !== true || this.valid$1(j) !== true) return false;
  var t1 = this.reports;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.same$3$bailout(key, i, j, 1, t1, 0);
  if (i !== (i | 0)) throw $.iae(i);
  var t2 = t1.length;
  if (i < 0 || i >= t2) throw $.ioore(i);
  t1 = t1[i];
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.same$3$bailout(key, i, j, 2, t1, 0);
  if (key !== (key | 0)) throw $.iae(key);
  var t3 = t1.length;
  if (key < 0 || key >= t3) throw $.ioore(key);
  if (!$.eqNullB(t1[key])) {
    t1 = this.reports;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.same$3$bailout(key, i, j, 3, t1, 0);
    if (j !== (j | 0)) throw $.iae(j);
    t2 = t1.length;
    if (j < 0 || j >= t2) throw $.ioore(j);
    t1 = t1[j];
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.same$3$bailout(key, i, j, 4, t1, 0);
    t3 = t1.length;
    if (key < 0 || key >= t3) throw $.ioore(key);
    t1 = $.eqNullB(t1[key]);
  } else t1 = true;
  if (t1) return false;
  t1 = this.reports;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.same$3$bailout(key, i, j, 5, t1, 0);
  t2 = t1.length;
  if (i < 0 || i >= t2) throw $.ioore(i);
  t1 = t1[i];
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.same$3$bailout(key, i, j, 6, t1, 0);
  t3 = t1.length;
  if (key < 0 || key >= t3) throw $.ioore(key);
  t1 = t1[key];
  var t4 = this.reports;
  if (typeof t4 !== 'string' && (typeof t4 !== 'object'||t4.constructor !== Array)) return this.same$3$bailout(key, i, j, 7, t1, t4);
  if (j !== (j | 0)) throw $.iae(j);
  var t5 = t4.length;
  if (j < 0 || j >= t5) throw $.ioore(j);
  t4 = t4[j];
  if (typeof t4 !== 'string' && (typeof t4 !== 'object'||t4.constructor !== Array)) return this.same$3$bailout(key, i, j, 8, t1, t4);
  var t6 = t4.length;
  if (key < 0 || key >= t6) throw $.ioore(key);
  if ($.eqB(t1, t4[key])) return true;
  return false;
 },
 same$3$bailout: function(key, i, j, state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      break;
    case 4:
      t1 = env0;
      break;
    case 5:
      t1 = env0;
      break;
    case 6:
      t1 = env0;
      break;
    case 7:
      t1 = env0;
      t2 = env1;
      break;
    case 8:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      $.stringTypeCheck(key);
      $.intTypeCheck(i);
      $.intTypeCheck(j);
      if (this.valid$1(i) !== true || this.valid$1(j) !== true) return false;
      var t1 = this.reports;
    case 1:
      state = 0;
      t1 = $.index(t1, i);
    case 2:
      state = 0;
    case 3:
    case 4:
      if (state == 3 || state == 4 || (state == 0 && !$.eqNullB($.index(t1, key)))) {
        switch (state) {
          case 0:
            t1 = this.reports;
          case 3:
            state = 0;
            t1 = $.index(t1, j);
          case 4:
            state = 0;
            t1 = $.eqNullB($.index(t1, key));
        }
      } else {
        t1 = true;
      }
      if (t1) return false;
      t1 = this.reports;
    case 5:
      state = 0;
      t1 = $.index(t1, i);
    case 6:
      state = 0;
      t1 = $.index(t1, key);
      var t2 = this.reports;
    case 7:
      state = 0;
      t2 = $.index(t2, j);
    case 8:
      state = 0;
      if ($.eqB(t1, $.index(t2, key))) return true;
      return false;
  }
 },
 timeSincePrevious$1: function(i) {
  if (typeof i !== 'number') return this.timeSincePrevious$1$bailout(i, 1, i, 0, 0);
  $.intTypeCheck(i);
  var t1 = this.reports;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.timeSincePrevious$1$bailout(i, 2, i, t1, 0);
  if (i !== (i | 0)) throw $.iae(i);
  var t2 = t1.length;
  if (i < 0 || i >= t2) throw $.ioore(i);
  if (!($.eqNullB($.index(t1[i], 'time')) || this.valid$1(i - 1) !== true)) {
    t1 = this.reports;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.timeSincePrevious$1$bailout(i, 3, i, t1, 0);
    t2 = i - 1;
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    var t3 = t1.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    t2 = $.eqNullB($.index(t1[t2], 'time'));
    t1 = t2;
  } else t1 = true;
  if (t1) return $.VERY_LONG_TIME;
  t1 = this.reports;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.timeSincePrevious$1$bailout(i, 4, i, t1, 0);
  t2 = t1.length;
  if (i < 0 || i >= t2) throw $.ioore(i);
  t1 = $.index(t1[i], 'time');
  if (typeof t1 !== 'number') return this.timeSincePrevious$1$bailout(i, 5, i, t1, 0);
  t3 = this.reports;
  if (typeof t3 !== 'string' && (typeof t3 !== 'object'||t3.constructor !== Array)) return this.timeSincePrevious$1$bailout(i, 6, t1, i, t3);
  var t4 = i - 1;
  if (t4 !== (t4 | 0)) throw $.iae(t4);
  var t5 = t3.length;
  if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
  t4 = $.index(t3[t4], 'time');
  if (typeof t4 !== 'number') return this.timeSincePrevious$1$bailout(i, 7, t1, t4, 0);
  return t1 - t4;
 },
 timeSincePrevious$1$bailout: function(i, state, env0, env1, env2) {
  switch (state) {
    case 1:
      i = env0;
      break;
    case 2:
      i = env0;
      t1 = env1;
      break;
    case 3:
      i = env0;
      t1 = env1;
      break;
    case 4:
      i = env0;
      t1 = env1;
      break;
    case 5:
      i = env0;
      t1 = env1;
      break;
    case 6:
      t1 = env0;
      i = env1;
      t2 = env2;
      break;
    case 7:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.intTypeCheck(i);
      var t1 = this.reports;
    case 2:
      state = 0;
    case 3:
      if (state == 3 || (state == 0 && !($.eqNullB($.index($.index(t1, i), 'time')) || this.valid$1($.sub(i, 1)) !== true))) {
        switch (state) {
          case 0:
            t1 = this.reports;
          case 3:
            state = 0;
            t1 = $.eqNullB($.index($.index(t1, $.sub(i, 1)), 'time'));
        }
      } else {
        t1 = true;
      }
    case 4:
    case 5:
    case 6:
    case 7:
      if ((state == 0 && t1)) {
        return $.VERY_LONG_TIME;
      } else {
        switch (state) {
          case 0:
            t1 = this.reports;
          case 4:
            state = 0;
            t1 = $.index($.index(t1, i), 'time');
          case 5:
            state = 0;
            var t2 = this.reports;
          case 6:
            state = 0;
            t2 = $.index($.index(t2, $.sub(i, 1)), 'time');
          case 7:
            state = 0;
            return $.sub(t1, t2);
        }
      }
  }
 },
 object$1: function(i) {
  $.intTypeCheck(i);
  if ($.ltB(i, 0) || $.geB(i, $.get$length(this.reports))) return;
  return $.index($.index(this.reports, i), 'object');
 },
 subject$1: function(i) {
  $.intTypeCheck(i);
  if ($.ltB(i, 0) || $.geB(i, $.get$length(this.reports))) return;
  return $.index($.index(this.reports, i), 'subject');
 },
 string$1: function(i) {
  $.intTypeCheck(i);
  if ($.ltB(i, 0) || $.geB(i, $.get$length(this.reports))) return;
  return $.index($.index(this.reports, i), 'string');
 },
 get$string: function() { return new $.Closure104(this, 'string$1'); },
 add$10: function(str, subject, object, but, positive, negative, endSentence, startSentence, wholeSentence, time) {
  $.stringTypeCheck(str);
  $.propertyTypeCheck(subject, 'is$Actor');
  $.propertyTypeCheck(object, 'is$Actor');
  $.boolTypeCheck(but);
  $.boolTypeCheck(positive);
  $.boolTypeCheck(negative);
  $.boolTypeCheck(endSentence);
  $.boolTypeCheck(startSentence);
  $.boolTypeCheck(wholeSentence);
  $.intTypeCheck(time);
  $.add$1(this.reports, $.makeLiteralMap(['string', str, 'subject', subject, 'object', object, 'but', but, 'positive', positive, 'negative', negative, 'endSentence', endSentence, 'startSentence', startSentence, 'wholeSentence', wholeSentence, 'time', time]));
 },
 add$1: function(str) {
  return this.add$10(str,(void 0),(void 0),false,false,false,false,false,false,(void 0))
},
 add$10$but$endSentence$negative$object$positive$startSentence$subject$time$wholeSentence: function(str,but,endSentence,negative,object,positive,startSentence,subject,time,wholeSentence) {
  return this.add$10(str,subject,object,but,positive,negative,endSentence,startSentence,wholeSentence,time)
},
 add$3$object$subject: function(str,object,subject) {
  return this.add$10(str,subject,object,false,false,false,false,false,false,(void 0))
},
 Storyline$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'Map<String, Dynamic>'}));
  this.reports = t1;
  this.strBuf = $.StringBufferImpl$1('');
 }
};

$$.GameEntity = {"":
 ["pronoun=", "names!"],
 super: "Object",
 get$name: function() {
  return $.randomly(this.names);
 },
 hashCode$0: function() {
  var t1 = $.GLOBAL_HASH_I;
  $.GLOBAL_HASH_I = $.add(t1, 1);
  return t1;
 },
 GameEntity$0: function() {
  this.names = $.List((void 0));
 }
};

$$.Actor = {"":
 ["fighting!", "speed!", "maxStance", "maxHitpoints", "on?", "_target", "combat=", "recoveringFromMove", "tillEndOfMove=", "armors?", "weapon=", "previousMove?", "_currentMove", "moves?", "stanceDownStrings", "stanceUpStrings", "_stance", "_hitpoints", "team=", "isPlayer?", "alive?", "pronoun", "names"],
 super: "GameEntity",
 chooseMove$1: function(max) {
  $.intTypeCheck(max);
  var possibleMoves = $.listTypeCheck(this.getPossibleMoves$1$max(max));
  var random = $.doubleTypeCheck($.random());
  var len = $.intTypeCheck($.get$length(possibleMoves));
  if (len !== (len | 0)) return this.chooseMove$1$bailout(max, 1, random, possibleMoves, len, 0);
  var allParts = $.intTypeCheck($.toInt(len * (len + 1) / 2));
  if (allParts !== (allParts | 0)) return this.chooseMove$1$bailout(max, 2, len, random, possibleMoves, allParts);
  for (var part = 0.0, pos = 0; $.ltB(pos, len); pos = $.intTypeCheck($.add(pos, 1))) {
    part = $.doubleTypeCheck($.add(part, $.sub(len, pos)));
    if ($.ltB(random, $.div(part, allParts))) break;
  }
  return $.index(possibleMoves, pos);
 },
 chooseMove$1$bailout: function(max, state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      random = env0;
      possibleMoves = env1;
      len = env2;
      break;
    case 2:
      len = env0;
      random = env1;
      possibleMoves = env2;
      allParts = env3;
      break;
  }
  switch (state) {
    case 0:
      $.intTypeCheck(max);
      var possibleMoves = $.listTypeCheck(this.getPossibleMoves$1$max(max));
      var random = $.doubleTypeCheck($.random());
      var len = $.intTypeCheck($.get$length(possibleMoves));
    case 1:
      state = 0;
      var allParts = $.intTypeCheck($.toInt($.div($.mul(len, $.add(len, 1)), 2)));
    case 2:
      state = 0;
      var part = 0.0;
      var pos = 0;
      L0: while (true) {
        if (!$.ltB(pos, len)) break L0;
        part = $.doubleTypeCheck($.add(part, $.sub(len, pos)));
        if ($.ltB(random, $.div(part, allParts))) break;
        pos = $.intTypeCheck($.add(pos, 1));
      }
      return $.index(possibleMoves, pos);
  }
 },
 chooseMove$0: function() {
  return this.chooseMove$1(1000)
},
 getPossibleMoves$1: function(max) {
  $.intTypeCheck(max);
  var possibleMoves = $.List$from($.filter(this.moves, new $.Closure20(this)));
  if (possibleMoves.length < 2) return possibleMoves;
  $.sort(possibleMoves, new $.Closure21(this));
  var redundantMovesMap = $.callTypeCheck($.HashMapImplementation$0(), 'is$Map');
  for (var i = 1; $.ltB(i, possibleMoves.length); i = $.intTypeCheck($.add(i, 1))) {
    for (var j = 0; $.ltB(j, i); j = $.intTypeCheck($.add(j, 1))) {
      if (i !== (i | 0)) throw $.iae(i);
      var t1 = possibleMoves.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = possibleMoves[i].get$flags();
      if (j !== (j | 0)) throw $.iae(j);
      var t3 = possibleMoves.length;
      if (j < 0 || j >= t3) throw $.ioore(j);
      t2 = $.countBits($.and(t2, possibleMoves[j].get$flags()));
      var t4 = possibleMoves.length;
      if (i < 0 || i >= t4) throw $.ioore(i);
      var t5 = possibleMoves[i].get$flags();
      var t6 = possibleMoves.length;
      if (j < 0 || j >= t6) throw $.ioore(j);
      var similarity = $.doubleTypeCheck($.div(t2, $.countBits($.or(t5, possibleMoves[j].get$flags()))));
      if ($.gtB(similarity, 0.7)) {
        t1 = possibleMoves.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        t2 = $.S(possibleMoves[i].get$string()) + ' is similar to ';
        t3 = possibleMoves.length;
        if (j < 0 || j >= t3) throw $.ioore(j);
        $.DEBUG(t2 + $.S(possibleMoves[j].get$string()) + ': ' + $.S(similarity) + '.');
        t2 = possibleMoves.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        redundantMovesMap.operator$indexSet$2(i, possibleMoves[i]);
        break;
      }
    }
  }
  var finalMoves = $.List(possibleMoves.length);
  $.setRuntimeTypeInfo(finalMoves, ({E: 'CombatMoveType'}));
  var redundantIndex = $.intTypeCheck($.sub(possibleMoves.length, $.get$length(redundantMovesMap)));
  if (redundantIndex !== (redundantIndex | 0)) return this.getPossibleMoves$1$bailout(max, 1, finalMoves, possibleMoves, redundantMovesMap, redundantIndex);
  for (var regularIndex = 0, i = 0; $.ltB(i, possibleMoves.length); i = $.intTypeCheck($.add(i, 1))) {
    if (redundantMovesMap.containsKey$1(i) !== true) {
      if (i !== (i | 0)) throw $.iae(i);
      t1 = possibleMoves.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      t2 = possibleMoves[i];
      if (regularIndex !== (regularIndex | 0)) throw $.iae(regularIndex);
      t3 = finalMoves.length;
      if (regularIndex < 0 || regularIndex >= t3) throw $.ioore(regularIndex);
      finalMoves[regularIndex] = t2;
      regularIndex = $.intTypeCheck($.add(regularIndex, 1));
    } else {
      if (i !== (i | 0)) throw $.iae(i);
      t1 = possibleMoves.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      t2 = possibleMoves[i];
      if (redundantIndex !== (redundantIndex | 0)) throw $.iae(redundantIndex);
      t3 = finalMoves.length;
      if (redundantIndex < 0 || redundantIndex >= t3) throw $.ioore(redundantIndex);
      finalMoves[redundantIndex] = t2;
      redundantIndex = $.intTypeCheck($.add(redundantIndex, 1));
    }
  }
  return $.getRange(finalMoves, 0, $.min(finalMoves.length, max));
 },
 getPossibleMoves$1$bailout: function(max, state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      finalMoves = env0;
      possibleMoves = env1;
      redundantMovesMap = env2;
      redundantIndex = env3;
      break;
  }
  switch (state) {
    case 0:
      $.intTypeCheck(max);
      var possibleMoves = $.List$from($.filter(this.moves, new $.Closure20(this)));
      if (possibleMoves.length < 2) return possibleMoves;
      $.sort(possibleMoves, new $.Closure21(this));
      var redundantMovesMap = $.callTypeCheck($.HashMapImplementation$0(), 'is$Map');
      var i = 1;
      L0: while (true) {
        if (!$.ltB(i, possibleMoves.length)) break L0;
        var j = 0;
        L1: while (true) {
          if (!$.ltB(j, i)) break L1;
          if (i !== (i | 0)) throw $.iae(i);
          var t1 = possibleMoves.length;
          if (i < 0 || i >= t1) throw $.ioore(i);
          var t2 = possibleMoves[i].get$flags();
          if (j !== (j | 0)) throw $.iae(j);
          var t3 = possibleMoves.length;
          if (j < 0 || j >= t3) throw $.ioore(j);
          t2 = $.countBits($.and(t2, possibleMoves[j].get$flags()));
          if (i !== (i | 0)) throw $.iae(i);
          var t4 = possibleMoves.length;
          if (i < 0 || i >= t4) throw $.ioore(i);
          var t5 = possibleMoves[i].get$flags();
          if (j !== (j | 0)) throw $.iae(j);
          var t6 = possibleMoves.length;
          if (j < 0 || j >= t6) throw $.ioore(j);
          var similarity = $.doubleTypeCheck($.div(t2, $.countBits($.or(t5, possibleMoves[j].get$flags()))));
          if ($.gtB(similarity, 0.7)) {
            if (i !== (i | 0)) throw $.iae(i);
            t1 = possibleMoves.length;
            if (i < 0 || i >= t1) throw $.ioore(i);
            t2 = $.S(possibleMoves[i].get$string()) + ' is similar to ';
            if (j !== (j | 0)) throw $.iae(j);
            t3 = possibleMoves.length;
            if (j < 0 || j >= t3) throw $.ioore(j);
            $.DEBUG(t2 + $.S(possibleMoves[j].get$string()) + ': ' + $.S(similarity) + '.');
            if (i !== (i | 0)) throw $.iae(i);
            t2 = possibleMoves.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            redundantMovesMap.operator$indexSet$2(i, possibleMoves[i]);
            break;
          }
          j = $.intTypeCheck($.add(j, 1));
        }
        i = $.intTypeCheck($.add(i, 1));
      }
      var finalMoves = $.List(possibleMoves.length);
      $.setRuntimeTypeInfo(finalMoves, ({E: 'CombatMoveType'}));
      var redundantIndex = $.intTypeCheck($.sub(possibleMoves.length, $.get$length(redundantMovesMap)));
    case 1:
      state = 0;
      var regularIndex = 0;
      i = 0;
      L2: while (true) {
        if (!$.ltB(i, possibleMoves.length)) break L2;
        if (redundantMovesMap.containsKey$1(i) !== true) {
          if (i !== (i | 0)) throw $.iae(i);
          t1 = possibleMoves.length;
          if (i < 0 || i >= t1) throw $.ioore(i);
          t2 = possibleMoves[i];
          if (regularIndex !== (regularIndex | 0)) throw $.iae(regularIndex);
          t3 = finalMoves.length;
          if (regularIndex < 0 || regularIndex >= t3) throw $.ioore(regularIndex);
          finalMoves[regularIndex] = t2;
          regularIndex = $.intTypeCheck($.add(regularIndex, 1));
        } else {
          if (i !== (i | 0)) throw $.iae(i);
          t1 = possibleMoves.length;
          if (i < 0 || i >= t1) throw $.ioore(i);
          t2 = possibleMoves[i];
          if (redundantIndex !== (redundantIndex | 0)) throw $.iae(redundantIndex);
          t3 = finalMoves.length;
          if (redundantIndex < 0 || redundantIndex >= t3) throw $.ioore(redundantIndex);
          finalMoves[redundantIndex] = t2;
          redundantIndex = $.intTypeCheck($.add(redundantIndex, 1));
        }
        i = $.intTypeCheck($.add(i, 1));
      }
      return $.getRange(finalMoves, 0, $.min(finalMoves.length, max));
  }
 },
 getPossibleMoves$1$max: function(max) {
  return this.getPossibleMoves$1(max)
},
 update$0: function() {
  if (this.alive !== true) return;
  $.index(this.on, 'update').dispatchAll$0();
  if (this.alive !== true) return;
  var t1 = this.tillEndOfMove;
  if (typeof t1 !== 'number') return this.update$0$bailout(1, t1, 0, 0, 0);
  this.tillEndOfMove = t1 - 1;
  $.DEBUG($.S(this.get$name()) + ' tillEndOfMove: ' + $.S(this.tillEndOfMove));
  t1 = this.tillEndOfMove;
  if (typeof t1 !== 'number') return this.update$0$bailout(2, t1, 0, 0, 0);
  if (t1 > 0 && !$.eqNullB(this.get$currentMove())) {
    var e = $.CombatEvent$fromMove$1(this.get$currentMove());
    if (!$.eqNullB(this.get$target()) && this.get$target().get$alive() !== true && this.get$currentMove().get$type().get$isOffensive() === true) {
      $.index(this.get$currentMove().get$on(), 'cancel').dispatchAll$1(e);
      this.set$currentMove((void 0));
      this.set$target((void 0));
      return;
    }
    if (this.get$currentMove().get$type().canContinue$2(this, this.get$target()) === true) $.index(this.get$currentMove().get$on(), 'update').dispatchAll$1(e);
    else {
      $.index(this.get$currentMove().get$on(), 'cancel').dispatchAll$1(e);
      this.set$currentMove((void 0));
      return;
    }
  } else {
    t1 = this.tillEndOfMove;
    if (typeof t1 !== 'number') return this.update$0$bailout(3, t1, 0, 0, 0);
    if (t1 <= 0) {
      if (!$.eqNullB(this.get$currentMove())) {
        e = $.CombatEvent$fromMove$1(this.get$currentMove());
        if (this.get$currentMove().get$type().canContinue$2(this, this.get$target()) === true) {
          if (this.get$currentMove().get$type().get$isOffensive() === true) {
            var chanceToDodge = $.doubleTypeCheck(this.get$currentMove().get$type().chanceToDodge$2(this, this.get$target()));
            if (typeof chanceToDodge !== 'number') return this.update$0$bailout(4, e, chanceToDodge, 0, 0);
            t1 = $.random();
            if (typeof t1 !== 'number') return this.update$0$bailout(5, chanceToDodge, e, t1, 0);
            if (t1 < chanceToDodge) {
              $.DEBUG('- dodge success');
              e.set$chance(chanceToDodge);
              e.set$chanceAll(chanceToDodge);
              $.index(this.get$target().get$on(), 'dodge').dispatchAll$1(e);
              $.index(this.get$currentMove().get$on(), 'sufferDodge').dispatchAll$1(e);
              $.index(this.on, 'sufferDodge').dispatchAll$1(e);
              this.set$currentMove((void 0));
              return;
            }
            $.DEBUG('- dodge fail');
            var chanceToBlock = $.doubleTypeCheck(this.get$currentMove().get$type().chanceToBlock$2(this, this.get$target()));
            if (typeof chanceToBlock !== 'number') return this.update$0$bailout(6, chanceToDodge, e, chanceToBlock, 0);
            t1 = $.random();
            if (typeof t1 !== 'number') return this.update$0$bailout(7, chanceToDodge, chanceToBlock, e, t1);
            if (t1 < chanceToBlock) {
              $.DEBUG('- block success');
              e.set$chance(chanceToBlock);
              e.set$chanceAll(chanceToBlock);
              $.index(this.get$currentMove().get$on(), 'sufferMeetWeapon').dispatchAll$1(e);
              t1 = this.get$target().get$weapon().get$hardness();
              if (typeof t1 !== 'number') return this.update$0$bailout(8, e, t1, 0, 0);
              var t2 = this.weapon.get$piercing();
              if (typeof t2 !== 'number') return this.update$0$bailout(9, e, t1, t2, 0);
              if (t1 >= t2) $.index(this.get$currentMove().get$on(), 'sufferBlock').dispatchAll$1(e);
              else {
                $.index(this.get$target().get$weapon().get$on(), 'sufferPierced').dispatchAll$1(e);
                if (!$.eqNullB(this.get$target().get$weapon().get$weaponWhenPierced())) {
                  t1 = this.get$target().get$weapon().get$weaponWhenPierced();
                  this.get$target().set$weapon(t1);
                } else $.DEBUG('Warning: weapon ' + $.S(this.get$target().get$weapon().get$name()) + ' doesn\'t have \'weaponWhenPierced\' defined.');
              }
              $.index(this.get$target().get$on(), 'block').dispatchAll$1(e);
              $.index(this.on, 'sufferBlock').dispatchAll$1(e);
              this.set$currentMove((void 0));
              return;
            }
            $.DEBUG('- block fail => hit');
            t1 = 1 - chanceToBlock;
            e.set$chance(t1);
            e.set$chanceAll(t1 * (1 - chanceToDodge));
            if (this.get$target().isArmoredAgainst$3(this.weapon, this.get$currentMove().get$type(), e) === true) {
              $.index(this.get$currentMove().get$on(), 'sufferDeflect').dispatchAll$1(e);
              $.index(e.armor.get$on(), 'deflect').dispatchAll$1(e);
              $.index(this.get$target().get$on(), 'deflect').dispatchAll$1(e);
              $.index(this.on, 'sufferDeflect').dispatchAll$1(e);
            } else {
              $.index(this.get$currentMove().get$on(), 'hit').dispatchAll$1(e);
              $.index(this.get$target().get$on(), 'sufferHit').dispatchAll$1(e);
              !$.eqNullB(this.get$target().get$currentMove()) && $.index(this.get$target().get$currentMove().get$on(), 'sufferHit').dispatchAll$1(e);
              $.index(this.on, 'hit').dispatchAll$1(e);
            }
            this.set$currentMove((void 0));
            return;
          }
          $.index(this.get$currentMove().get$on(), 'end').dispatchAll$1(e);
          this.set$currentMove((void 0));
          return;
        }
        $.index(this.get$currentMove().get$on(), 'cancel').dispatchAll$1(e);
        this.set$currentMove((void 0));
        return;
      }
      if (this.isPlayer !== true) {
        if ($.eqNullB(this.get$target()) || this.get$target().get$alive() !== true) {
          var possibleEnemies = $.listTypeCheck($.filter(this.combat.get$actors(), new $.Closure25(this)));
          if ($.isEmpty(possibleEnemies) !== true) this.set$target($.randomly(possibleEnemies));
          else {
            this.alive = false;
            return;
          }
        }
        if ($.eqNullB(this.get$target()) || $.some(this.moves, new $.Closure26(this)) !== true) this.report$1('<subject> ' + $.S($.randomly(['just stands there', 'doesn\'t do anything', 'does nothing'])));
        else this.set$currentMove(this.chooseMove$0());
      }
    }
  }
 },
 update$0$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      break;
    case 4:
      e = env0;
      chanceToDodge = env1;
      break;
    case 5:
      chanceToDodge = env0;
      e = env1;
      t1 = env2;
      break;
    case 6:
      chanceToDodge = env0;
      e = env1;
      chanceToBlock = env2;
      break;
    case 7:
      chanceToDodge = env0;
      chanceToBlock = env1;
      e = env2;
      t1 = env3;
      break;
    case 8:
      e = env0;
      t1 = env1;
      break;
    case 9:
      e = env0;
      t1 = env1;
      t2 = env2;
      break;
  }
  switch (state) {
    case 0:
      if (this.alive !== true) return;
      $.index(this.on, 'update').dispatchAll$0();
      if (this.alive !== true) return;
      var t1 = this.tillEndOfMove;
    case 1:
      state = 0;
      this.tillEndOfMove = $.sub(t1, 1);
      $.DEBUG($.S(this.get$name()) + ' tillEndOfMove: ' + $.S(this.tillEndOfMove));
      t1 = this.tillEndOfMove;
    case 2:
      state = 0;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      if ((state == 0 && ($.gtB(t1, 0) && !$.eqNullB(this.get$currentMove())))) {
        var e = $.CombatEvent$fromMove$1(this.get$currentMove());
        if (!$.eqNullB(this.get$target()) && this.get$target().get$alive() !== true && this.get$currentMove().get$type().get$isOffensive() === true) {
          $.index(this.get$currentMove().get$on(), 'cancel').dispatchAll$1(e);
          this.set$currentMove((void 0));
          this.set$target((void 0));
          return;
        }
        if (this.get$currentMove().get$type().canContinue$2(this, this.get$target()) === true) $.index(this.get$currentMove().get$on(), 'update').dispatchAll$1(e);
        else {
          $.index(this.get$currentMove().get$on(), 'cancel').dispatchAll$1(e);
          this.set$currentMove((void 0));
          return;
        }
      } else {
        switch (state) {
          case 0:
            t1 = this.tillEndOfMove;
          case 3:
            state = 0;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            if (state == 4 || state == 5 || state == 6 || state == 7 || state == 8 || state == 9 || (state == 0 && $.leB(t1, 0))) {
              switch (state) {
                case 0:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                  if (state == 4 || state == 5 || state == 6 || state == 7 || state == 8 || state == 9 || (state == 0 && !$.eqNullB(this.get$currentMove()))) {
                    switch (state) {
                      case 0:
                        e = $.CombatEvent$fromMove$1(this.get$currentMove());
                      case 4:
                      case 5:
                      case 6:
                      case 7:
                      case 8:
                      case 9:
                        if (state == 4 || state == 5 || state == 6 || state == 7 || state == 8 || state == 9 || (state == 0 && this.get$currentMove().get$type().canContinue$2(this, this.get$target()) === true)) {
                          switch (state) {
                            case 0:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                              if (state == 4 || state == 5 || state == 6 || state == 7 || state == 8 || state == 9 || (state == 0 && this.get$currentMove().get$type().get$isOffensive() === true)) {
                                switch (state) {
                                  case 0:
                                    var chanceToDodge = $.doubleTypeCheck(this.get$currentMove().get$type().chanceToDodge$2(this, this.get$target()));
                                  case 4:
                                    state = 0;
                                    t1 = $.random();
                                  case 5:
                                    state = 0;
                                  case 6:
                                  case 7:
                                  case 8:
                                  case 9:
                                    if ((state == 0 && $.ltB(t1, chanceToDodge))) {
                                      $.DEBUG('- dodge success');
                                      e.set$chance(chanceToDodge);
                                      e.set$chanceAll(chanceToDodge);
                                      $.index(this.get$target().get$on(), 'dodge').dispatchAll$1(e);
                                      $.index(this.get$currentMove().get$on(), 'sufferDodge').dispatchAll$1(e);
                                      $.index(this.on, 'sufferDodge').dispatchAll$1(e);
                                      this.set$currentMove((void 0));
                                      return;
                                    } else {
                                      switch (state) {
                                        case 0:
                                          $.DEBUG('- dodge fail');
                                          var chanceToBlock = $.doubleTypeCheck(this.get$currentMove().get$type().chanceToBlock$2(this, this.get$target()));
                                        case 6:
                                          state = 0;
                                          t1 = $.random();
                                        case 7:
                                          state = 0;
                                        case 8:
                                        case 9:
                                          if (state == 8 || state == 9 || (state == 0 && $.ltB(t1, chanceToBlock))) {
                                            switch (state) {
                                              case 0:
                                                $.DEBUG('- block success');
                                                e.set$chance(chanceToBlock);
                                                e.set$chanceAll(chanceToBlock);
                                                $.index(this.get$currentMove().get$on(), 'sufferMeetWeapon').dispatchAll$1(e);
                                                t1 = this.get$target().get$weapon().get$hardness();
                                              case 8:
                                                state = 0;
                                                var t2 = this.weapon.get$piercing();
                                              case 9:
                                                state = 0;
                                                if ($.geB(t1, t2)) $.index(this.get$currentMove().get$on(), 'sufferBlock').dispatchAll$1(e);
                                                else {
                                                  $.index(this.get$target().get$weapon().get$on(), 'sufferPierced').dispatchAll$1(e);
                                                  if (!$.eqNullB(this.get$target().get$weapon().get$weaponWhenPierced())) {
                                                    t1 = this.get$target().get$weapon().get$weaponWhenPierced();
                                                    this.get$target().set$weapon(t1);
                                                  } else $.DEBUG('Warning: weapon ' + $.S(this.get$target().get$weapon().get$name()) + ' doesn\'t have \'weaponWhenPierced\' defined.');
                                                }
                                                $.index(this.get$target().get$on(), 'block').dispatchAll$1(e);
                                                $.index(this.on, 'sufferBlock').dispatchAll$1(e);
                                                this.set$currentMove((void 0));
                                                return;
                                            }
                                          } else {
                                            $.DEBUG('- block fail => hit');
                                            e.set$chance($.sub(1, chanceToBlock));
                                            e.set$chanceAll($.sub(1, chanceToBlock) * $.sub(1, chanceToDodge));
                                            if (this.get$target().isArmoredAgainst$3(this.weapon, this.get$currentMove().get$type(), e) === true) {
                                              $.index(this.get$currentMove().get$on(), 'sufferDeflect').dispatchAll$1(e);
                                              $.index(e.armor.get$on(), 'deflect').dispatchAll$1(e);
                                              $.index(this.get$target().get$on(), 'deflect').dispatchAll$1(e);
                                              $.index(this.on, 'sufferDeflect').dispatchAll$1(e);
                                            } else {
                                              $.index(this.get$currentMove().get$on(), 'hit').dispatchAll$1(e);
                                              $.index(this.get$target().get$on(), 'sufferHit').dispatchAll$1(e);
                                              !$.eqNullB(this.get$target().get$currentMove()) && $.index(this.get$target().get$currentMove().get$on(), 'sufferHit').dispatchAll$1(e);
                                              $.index(this.on, 'hit').dispatchAll$1(e);
                                            }
                                            this.set$currentMove((void 0));
                                            return;
                                          }
                                      }
                                    }
                                }
                              } else {
                                $.index(this.get$currentMove().get$on(), 'end').dispatchAll$1(e);
                                this.set$currentMove((void 0));
                                return;
                              }
                          }
                        } else {
                          $.index(this.get$currentMove().get$on(), 'cancel').dispatchAll$1(e);
                          this.set$currentMove((void 0));
                          return;
                        }
                    }
                  }
                  if (this.isPlayer !== true) {
                    if ($.eqNullB(this.get$target()) || this.get$target().get$alive() !== true) {
                      var possibleEnemies = $.listTypeCheck($.filter(this.combat.get$actors(), new $.Closure25(this)));
                      if ($.isEmpty(possibleEnemies) !== true) this.set$target($.randomly(possibleEnemies));
                      else {
                        this.alive = false;
                        return;
                      }
                    }
                    if ($.eqNullB(this.get$target()) || $.some(this.moves, new $.Closure26(this)) !== true) this.report$1('<subject> ' + $.S($.randomly(['just stands there', 'doesn\'t do anything', 'does nothing'])));
                    else this.set$currentMove(this.chooseMove$0());
                  }
              }
            }
        }
      }
  }
 },
 isArmoredAgainst$3: function(weapon, move, e) {
  $.propertyTypeCheck(weapon, 'is$WeaponType');
  $.propertyTypeCheck(move, 'is$CombatMoveType');
  $.propertyTypeCheck(e, 'is$CombatEvent');
  for (var t1 = $.iterator(this.armors); result = false, t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (move.hasFlag$1(t2.get$coveringEffects()) !== true) continue;
    if (move.hasFlag$1(t2.get$coveringTargets()) !== true) continue;
    if (move.hasFlag$1(t2.get$coveringSides()) !== true) continue;
    if (move.get$isHitpointsDamaging() === true) {
      if ($.gtB(t2.get$hardness(), weapon.get$piercing())) {
        !$.eqNullB(e) && e.set$armor(t2);
        result = true;
        break;
      }
    }
  }
  return result;
  var result;
 },
 isArmoredAgainst$2: function(weapon,move) {
  return this.isArmoredAgainst$3(weapon,move,(void 0))
},
 set$target: function(value) {
  $.propertyTypeCheck(value, 'is$Actor');
  this._target = value;
  this.previousMove = (void 0);
 },
 get$target: function() {
  return this._target;
 },
 set$stance: function(value) {
  $.intTypeCheck(value);
  if (this.alive !== true) return;
  var prevStance = $.intTypeCheck(this._stance);
  this._stance = $.min(value, this.maxStance);
  this._stance = $.max(0, this._stance);
  if (!$.eqB($.toInt($.div(this._stance, 10)), $.toInt($.div(prevStance, 10)))) {
    if ($.gtB(this._stance, prevStance)) {
      this.report$2$positive($.index(this.stanceUpStrings, $.min(5, $.toInt($.div(this._stance, 10)))), true);
      $.index(this.on, 'stanceUp').dispatchAll$0();
      !$.eqNullB(this.get$currentMove()) && $.index(this.get$currentMove().get$on(), 'stanceUp').dispatchAll$0();
    } else {
      this.report$2$negative($.index(this.stanceDownStrings, $.min(5, $.toInt($.div(this._stance, 10)))), true);
      $.index(this.on, 'stanceDown').dispatchAll$0();
      !$.eqNullB(this.get$currentMove()) && $.index(this.get$currentMove().get$on(), 'stanceDown').dispatchAll$0();
      $.gtB($.sub(prevStance, this._stance), 10) && $.ltB(this._stance, 10) && this.set$hitpoints($.sub(this.get$hitpoints(), 1));
    }
  }
 },
 get$stance: function() {
  return this._stance;
 },
 set$hitpoints: function(value) {
  $.intTypeCheck(value);
  if ($.leB(value, 0)) {
    $.index(this.on, 'die').dispatchAll$0();
    this.alive = false;
    return;
  }
  if ($.ltB(value, this._hitpoints)) {
    $.index(this.on, 'hitpointsDown').dispatchAll$0();
    !$.eqNullB(this.get$currentMove()) && $.index(this.get$currentMove().get$on(), 'hitpointsDown').dispatchAll$0();
  } else {
    if ($.gtB(value, this._hitpoints)) {
      $.index(this.on, 'hitpointsUp').dispatchAll$0();
      !$.eqNullB(this.get$currentMove()) && $.index(this.get$currentMove().get$on(), 'hitpointsUp').dispatchAll$0();
    }
  }
  var almostDyingThreshold = $.intTypeCheck($.min(3, $.toInt($.div(this.maxHitpoints, 3))));
  $.gtB(this._hitpoints, almostDyingThreshold) && $.ltB(value, almostDyingThreshold) && $.index(this.on, 'almostDying').dispatchAll$0();
  this._hitpoints = $.min(value, this.maxHitpoints);
 },
 get$hitpoints: function() {
  return this._hitpoints;
 },
 set$currentMove: function(value) {
  $.propertyTypeCheck(value, 'is$CombatMoveType');
  if (!$.eqNullB(this._currentMove)) this.previousMove = this._currentMove.get$type();
  if ($.eqNullB(value)) {
    if (!$.eqNullB(this._currentMove)) {
      this.tillEndOfMove = this._currentMove.get$type().get$recovery();
      if ($.gtB(this.tillEndOfMove, 0)) this.recoveringFromMove = true;
    }
    this._currentMove = (void 0);
  } else {
    this._currentMove = $.CurrentCombatMove$3(value, this, this.get$target());
    this.tillEndOfMove = this._currentMove.get$type().get$duration();
    $.index(this._currentMove.get$on(), 'start').dispatchAll$1($.CombatEvent$fromMove$1(this._currentMove));
  }
 },
 get$currentMove: function() {
  return this._currentMove;
 },
 get$modifiedDodging: function() {
  var value = $.intTypeCheck(this.get$modifiedFighting());
  for (var t1 = $.iterator(this.armors); t1.hasNext$0() === true; ) {
    value = $.intTypeCheck($.add(value, t1.next$0().get$dodgingMod()));
  }
  return value;
 },
 get$modifiedAttacking: function() {
  if ($.eqNullB(this.get$currentMove())) return this.get$modifiedFighting();
  return $.sub(this.get$modifiedFighting(), this.get$currentMove().get$type().get$fightingMod());
 },
 get$modifiedFighting: function() {
  var stanceMod = $.intTypeCheck($.toInt($.max($.sub(29, this._stance) / 10 + 1, 0)));
  var hitpointsMod = $.intTypeCheck($.toInt($.max(0, $.mul($.sub($.div($.sub(this.maxHitpoints, this._hitpoints), this.maxHitpoints), 0.7), 10))));
  if ($.eqNullB(this.get$currentMove())) return $.sub($.sub(this.fighting, stanceMod), hitpointsMod);
  return $.add($.sub($.sub(this.fighting, stanceMod), hitpointsMod), this.get$currentMove().get$type().get$fightingMod());
 },
 report$10: function(str, subject, object, but, positive, negative, endSentence, startSentence, wholeSentence, reportOnlyOnAlive) {
  $.stringTypeCheck(str);
  $.propertyTypeCheck(subject, 'is$Actor');
  $.propertyTypeCheck(object, 'is$Actor');
  $.boolTypeCheck(but);
  $.boolTypeCheck(positive);
  $.boolTypeCheck(negative);
  $.boolTypeCheck(endSentence);
  $.boolTypeCheck(startSentence);
  $.boolTypeCheck(wholeSentence);
  $.boolTypeCheck(reportOnlyOnAlive);
  if ($.eqNullB(this.combat)) return;
  if ($.eqNullB(subject)) var subject = this;
  if (subject.get$alive() !== true && reportOnlyOnAlive === true) return;
  this.combat.get$storyline().add$10$but$endSentence$negative$object$positive$startSentence$subject$time$wholeSentence(str, but, endSentence, negative, object, positive, startSentence, subject, this.combat.get$time(), wholeSentence);
 },
 report$2$wholeSentence: function(str,wholeSentence) {
  return this.report$10(str,(void 0),(void 0),false,false,false,false,false,wholeSentence,true)
},
 report$1: function(str) {
  return this.report$10(str,(void 0),(void 0),false,false,false,false,false,false,true)
},
 report$1: function(str) {
  return this.report$10(str,(void 0),(void 0),false,false,false,false,false,false,true)
},
 report$3$negative$reportOnlyOnAlive: function(str,negative,reportOnlyOnAlive) {
  return this.report$10(str,(void 0),(void 0),false,false,negative,false,false,false,reportOnlyOnAlive)
},
 report$3$object$positive: function(str,object,positive) {
  return this.report$10(str,(void 0),object,false,positive,false,false,false,false,true)
},
 report$3$negative$object: function(str,negative,object) {
  return this.report$10(str,(void 0),object,false,false,negative,false,false,false,true)
},
 report$3$object$wholeSentence: function(str,object,wholeSentence) {
  return this.report$10(str,(void 0),object,false,false,false,false,false,wholeSentence,true)
},
 report$3$endSentence$object: function(str,endSentence,object) {
  return this.report$10(str,(void 0),object,false,false,false,endSentence,false,false,true)
},
 report$2$negative: function(str,negative) {
  return this.report$10(str,(void 0),(void 0),false,false,negative,false,false,false,true)
},
 report$2$positive: function(str,positive) {
  return this.report$10(str,(void 0),(void 0),false,positive,false,false,false,false,true)
},
 report$2$positive: function(str,positive) {
  return this.report$10(str,(void 0),(void 0),false,positive,false,false,false,false,true)
},
 Actor$0: function() {
  this.on = $.CombatCallbackHandler$1(this);
  this.weapon = $.WeaponType$4((void 0), 0, 0, 0);
  var t1 = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(t1, ({E: 'ArmorType'}));
  this.armors = t1;
  this.names = ['actor'];
  this.pronoun = $.CTC10;
  this._hitpoints = this.maxHitpoints;
  this._stance = this.maxStance;
  this.moves = $.HashSetImplementation$0();
  this.stanceUpStrings = $.CTC11;
  this.stanceDownStrings = $.CTC12;
  $.add$1($.index(this.on, 'almostDying'), $.defaultOnAlmostDying);
  $.add$1($.index(this.on, 'die'), $.defaultOnDie);
 },
 is$Actor: true
};

$$.Player = {"":
 ["fighting", "speed", "maxStance", "maxHitpoints", "on", "_target", "combat", "recoveringFromMove", "tillEndOfMove", "armors", "weapon", "previousMove", "_currentMove", "moves", "stanceDownStrings", "stanceUpStrings", "_stance", "_hitpoints", "team", "isPlayer", "alive", "pronoun", "names"],
 super: "Actor",
 Player$0: function() {
  this.isPlayer = true;
  this.team = 1;
  this.names = ['player'];
  this.pronoun = $.CTC8;
 }
};

$$.CombatMoveType = {"":
 ["computeSuitability!", "chanceToBlock", "chanceToDodge", "canContinue!", "isApplicable!", "on?", "flags?", "fightingMod?", "baseChanceToBlock?", "baseChanceToDodge?", "stanceDamage?", "damage?", "recovery?", "duration?", "thirdPartyString?", "choiceString?", "string?", "pronoun", "names"],
 super: "GameEntity",
 initDefaultFunctions$0: function() {
  this.on = $.CombatCallbackHandler$1(this);
  this.isApplicable = new $.Closure72(this);
  this.canContinue = new $.Closure73(this);
  this.chanceToDodge = new $.Closure74(this);
  this.chanceToBlock = new $.Closure75(this);
  this.computeSuitability = new $.Closure76(this);
  $.add$1($.index(this.on, 'start'), $.defaultOnStart);
  $.add$1($.index(this.on, 'hit'), $.defaultOnHit);
  $.add$1($.index(this.on, 'sufferDeflect'), $.defaultOnSufferDeflect);
  $.add$1($.index(this.on, 'sufferBlock'), $.defaultOnSufferBlock);
  $.add$1($.index(this.on, 'sufferMeetWeapon'), $.defaultOnSufferMeetWeapon);
  $.add$1($.index(this.on, 'sufferDodge'), $.defaultOnSufferDodge);
  $.add$1($.index(this.on, 'cancel'), $.defaultOnCancel);
 },
 computeChanceToHit$2: function(performer, target) {
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  var chanceToDodge = $.doubleTypeCheck(this.chanceToDodge$2(performer, target));
  var chanceToBlock = $.doubleTypeCheck(this.chanceToBlock$2(performer, target));
  return $.sub(1, chanceToDodge) * $.sub(1, chanceToBlock);
 },
 computeSuitability$2: function(arg0, arg1) { return this.computeSuitability.$call$2(arg0, arg1); },
 chanceToBlock$2: function(arg0, arg1) { return this.chanceToBlock.$call$2(arg0, arg1); },
 chanceToDodge$2: function(arg0, arg1) { return this.chanceToDodge.$call$2(arg0, arg1); },
 canContinue$2: function(arg0, arg1) { return this.canContinue.$call$2(arg0, arg1); },
 isApplicable$2: function(arg0, arg1) { return this.isApplicable.$call$2(arg0, arg1); },
 get$isHitpointsDamaging: function() {
  return this.hasFlag$1(32768);
 },
 get$isOffensive: function() {
  return this.hasFlag$1(524288);
 },
 hasFlag$1: function(otherFlags) {
  if (otherFlags !== (otherFlags | 0)) return this.hasFlag$1$bailout(otherFlags, 1, otherFlags, 0);
  var t1 = this.flags;
  if (t1 !== (t1 | 0)) return this.hasFlag$1$bailout(otherFlags, 2, otherFlags, t1);
  return !((t1 & otherFlags) >>> 0 === 0);
 },
 hasFlag$1$bailout: function(otherFlags, state, env0, env1) {
  switch (state) {
    case 1:
      otherFlags = env0;
      break;
    case 2:
      otherFlags = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.intTypeCheck(otherFlags);
      var t1 = this.flags;
    case 2:
      state = 0;
      return !$.eqB($.and(t1, otherFlags), 0);
  }
 },
 CombatMoveType$11: function(string, choiceString, thirdPartyString, flags, duration, recovery, damage, stanceDamage, baseChanceToBlock, baseChanceToDodge, fightingMod) {
  this.initDefaultFunctions$0();
 },
 is$CombatMoveType: true
};

$$.CurrentCombatMove = {"":
 ["on?", "target=", "performer?", "type?", "pronoun", "names"],
 super: "GameEntity",
 CurrentCombatMove$3: function(type, performer, target) {
  this.on = $.CombatCallbackHandler$1(this);
 },
 is$CurrentCombatMove: true
};

$$.WeaponType = {"":
 ["on?", "specialMoves", "moves?", "weaponWhenPierced?", "blockingMod", "hardness?", "piercing?", "pronoun", "names"],
 super: "GameEntity",
 get$sharp: function() {
  return $.ge(this.hardness, 3);
 },
 get$blunt: function() {
  return $.gtB(this.hardness, 0) && $.ltB(this.hardness, 3);
 },
 get$barehanded: function() {
  return $.eq(this.hardness, 0);
 },
 WeaponType$4: function(name$, piercing, hardness, blockingMod) {
  $.stringTypeCheck(name$);
  this.names = !$.eqNullB(name$) ? [name$] : ['weapon'];
  this.on = $.CombatCallbackHandler$1(this);
  $.add$1($.index(this.on, 'sufferPierced'), $.defaultOnSufferPierced);
 },
 is$WeaponType: true
};

$$.ArmorType = {"":
 ["on?", "coveringEffects?", "coveringSides?", "coveringTargets?", "dodgingMod?", "hardness?", "pronoun", "names"],
 super: "GameEntity",
 ArmorType$6: function(name$, hardness, dodgingMod, coveringTargets, coveringSides, coveringEffects) {
  $.stringTypeCheck(name$);
  this.names = !$.eqNullB(name$) ? [name$] : ['armor'];
  this.on = $.CombatCallbackHandler$1(this);
 }
};

$$.CombatEvent = {"":
 ["stopPropagation?", "luckUsed", "_chanceAll", "_chance", "combat=", "armor=", "weapon=", "move", "target=", "performer?"],
 super: "Object",
 set$chanceAll: function(value) {
  $.doubleTypeCheck(value);
  this._chanceAll = value;
 },
 get$chanceAll: function() {
  return this._chanceAll;
 },
 set$chance: function(value) {
  $.doubleTypeCheck(value);
  this._chance = value;
 },
 get$chance: function() {
  return this._chance;
 },
 CombatEvent$fromMove$1: function(currentMove) {
  $.propertyTypeCheck(currentMove, 'is$CurrentCombatMove');
  this.performer = currentMove.get$performer();
  this.target = currentMove.get$target();
  this.move = currentMove.get$type();
  this.weapon = this.performer.get$weapon();
  $.assert($.eq(this.performer.get$combat(), this.target.get$combat()));
  this.combat = this.performer.get$combat();
 },
 is$CombatEvent: true
};

$$.CombatCallback = {"":
 ["_key", "_this", "functions"],
 super: "Object",
 dispatchAll$1: function(e) {
  $.propertyTypeCheck(e, 'is$CombatEvent');
  var t1 = this._this;
  if (typeof t1 === 'object' && !!t1.is$CurrentCombatMove) {
    if ($.eqNullB(e)) var e = $.CombatEvent$fromMove$1(this._this);
    $.index(this._this.get$type().get$on(), this._key).dispatchAll$1(e);
  }
  for (t1 = $.iterator(this.functions); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if ($.eqNullB(e)) t2.$call$1(this._this);
    else {
      t2.$call$2(this._this, e);
      if (e.get$stopPropagation() === true) break;
    }
  }
 },
 dispatchAll$0: function() {
  return this.dispatchAll$1((void 0))
},
 get$last: function() {
  return $.last(this.functions);
 },
 last$0: function() { return this.get$last().$call$0(); },
 get$first: function() {
  return this.functions.first$0();
 },
 first$0: function() { return this.get$first().$call$0(); },
 replaceAllWith$1: function(f) {
  $.functionTypeCheck(f);
  this.clear$0();
  this.add$1(f);
 },
 clear$0: function() {
  $.clear(this.functions);
 },
 addLast$1: function(f) {
  $.functionTypeCheck(f);
  $.addLast(this.functions, f);
 },
 addFirst$1: function(f) {
  $.functionTypeCheck(f);
  this.functions.addFirst$1(f);
 },
 add$1: function(f) {
  $.functionTypeCheck(f);
  $.add$1(this.functions, f);
 },
 CombatCallback$2: function(_this, _key) {
  var t1 = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(t1, ({E: 'Function'}));
  this.functions = t1;
 },
 is$CombatCallback: true
};

$$.CombatCallbackHandler = {"":
 ["_callbacks", "_this"],
 super: "Object",
 operator$indexSet$2: function(key, value) {
  $.stringTypeCheck(key);
  $.propertyTypeCheck(value, 'is$CombatCallback');
  var t1 = this._callbacks;
  if (typeof t1 !== 'object'||t1.constructor !== Array||!!t1.immutable$list) return this.operator$indexSet$2$bailout(key, value, 1, t1);
  if (key !== (key | 0)) throw $.iae(key);
  var t2 = t1.length;
  if (key < 0 || key >= t2) throw $.ioore(key);
  t1[key] = value;
 },
 operator$indexSet$2$bailout: function(key, value, state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      $.stringTypeCheck(key);
      $.propertyTypeCheck(value, 'is$CombatCallback');
      var t1 = this._callbacks;
    case 1:
      state = 0;
      $.indexSet(t1, key, value);
  }
 },
 operator$index$1: function(key) {
  $.stringTypeCheck(key);
  if (this._callbacks.containsKey$1(key) === true) {
    var t1 = this._callbacks;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.operator$index$1$bailout(key, 1, t1);
    if (key !== (key | 0)) throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2) throw $.ioore(key);
    return t1[key];
  }
  t1 = this._callbacks;
  if (typeof t1 !== 'object'||t1.constructor !== Array||!!t1.immutable$list) return this.operator$index$1$bailout(key, 2, t1);
  t2 = $.CombatCallback$2(this._this, key);
  if (key !== (key | 0)) throw $.iae(key);
  var t3 = t1.length;
  if (key < 0 || key >= t3) throw $.ioore(key);
  t1[key] = t2;
  t2 = this._callbacks;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object'||t2.constructor !== Array)) return this.operator$index$1$bailout(key, 3, t2);
  t1 = t2.length;
  if (key < 0 || key >= t1) throw $.ioore(key);
  return t2[key];
 },
 operator$index$1$bailout: function(key, state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      $.stringTypeCheck(key);
    case 1:
    case 2:
    case 3:
      if (state == 1 || (state == 0 && this._callbacks.containsKey$1(key) === true)) {
        switch (state) {
          case 0:
            var t1 = this._callbacks;
          case 1:
            state = 0;
            return $.index(t1, key);
        }
      } else {
        switch (state) {
          case 0:
            t1 = this._callbacks;
          case 2:
            state = 0;
            $.indexSet(t1, key, $.CombatCallback$2(this._this, key));
            t1 = this._callbacks;
          case 3:
            state = 0;
            return $.index(t1, key);
        }
      }
  }
 },
 CombatCallbackHandler$1: function(_this) {
  this._callbacks = $.HashMapImplementation$0();
 }
};

$$.Combat = {"":
 ["playerChoices=", "_player=", "actors?", "time=", "_prevTime", "on?", "interactionNeeded", "finished?", "_started", "storyline?", "pronoun", "names"],
 super: "GameEntity",
 updateUntilInteraction$0: function() {
  while (true) {
    if (!(this.finished !== true && this.interactionNeeded !== true)) break;
    this.update$0();
  }
  this.interactionNeeded = false;
 },
 update$0: function() {
  var t1 = this.time;
  if (typeof t1 !== 'number') return this.update$0$bailout(1, t1, 0);
  var t2 = this._prevTime;
  if (typeof t2 !== 'number') return this.update$0$bailout(2, t1, t2);
  var timePassed = t1 > t2;
  this._prevTime = this.time;
  if (timePassed) {
    $.index(this.on, 'update').dispatchAll$0();
    $.forEach(this.actors, new $.Closure13());
    if ($.some(this.actors, new $.Closure14(this)) !== true) {
      this.finished = true;
      return;
    }
  }
  if (!$.eqNullB(this._player) && this._player.get$alive() === true) {
    t1 = this._player.get$tillEndOfMove();
    if (typeof t1 !== 'number') return this.update$0$bailout(3, t1, 0);
    t1 = t1 <= 0;
  } else t1 = false;
  if (t1) {
    if ($.eqNullB(this._player.get$target())) {
      var possibleEnemies = $.listTypeCheck($.filter(this.actors, new $.Closure15(this)));
      if (typeof possibleEnemies !== 'object'||possibleEnemies.constructor !== Array) return this.update$0$bailout(4, possibleEnemies, 0);
      if (possibleEnemies.length === 1) {
        t1 = possibleEnemies.length;
        if (0 >= t1) throw $.ioore(0);
        t2 = possibleEnemies[0];
        this._player.set$target(t2);
      } else {
        $.forEach(possibleEnemies, new $.Closure16(this));
      }
    } else {
      var possibleMoves = $.listTypeCheck(this._player.getPossibleMoves$1$max(50));
      if ($.isEmpty(possibleMoves) !== true) {
        $.forEach(possibleMoves, new $.Closure17(this));
      }
      if ($.some(this.actors, new $.Closure18(this)) === true) {
        $.add$1(this.playerChoices, $.Choice$4('Target another enemy.', (void 0), new $.Closure19(this), true));
      }
    }
    if ($.isEmpty(this.playerChoices) !== true) this.interactionNeeded = true;
  }
  t1 = this.time;
  if (typeof t1 !== 'number') return this.update$0$bailout(5, t1, 0);
  this.time = t1 + 1;
 },
 update$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
    case 3:
      t1 = env0;
      break;
    case 4:
      possibleEnemies = env0;
      break;
    case 5:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.time;
    case 1:
      state = 0;
      var t2 = this._prevTime;
    case 2:
      state = 0;
      var timePassed = $.boolTypeCheck($.gt(t1, t2));
      this._prevTime = this.time;
      if (timePassed === true) {
        $.index(this.on, 'update').dispatchAll$0();
        $.forEach(this.actors, new $.Closure13());
        if ($.some(this.actors, new $.Closure14(this)) !== true) {
          this.finished = true;
          return;
        }
      }
    case 3:
      if (state == 3 || (state == 0 && (!$.eqNullB(this._player) && this._player.get$alive() === true))) {
        switch (state) {
          case 0:
            t1 = this._player.get$tillEndOfMove();
          case 3:
            state = 0;
            t1 = $.leB(t1, 0);
        }
      } else {
        t1 = false;
      }
    case 4:
      if (state == 4 || (state == 0 && t1)) {
        switch (state) {
          case 0:
          case 4:
            if (state == 4 || (state == 0 && $.eqNullB(this._player.get$target()))) {
              switch (state) {
                case 0:
                  var possibleEnemies = $.listTypeCheck($.filter(this.actors, new $.Closure15(this)));
                case 4:
                  state = 0;
                  if ($.eqB($.get$length(possibleEnemies), 1)) {
                    t1 = $.index(possibleEnemies, 0);
                    this._player.set$target(t1);
                  } else {
                    $.forEach(possibleEnemies, new $.Closure16(this));
                  }
              }
            } else {
              var possibleMoves = $.listTypeCheck(this._player.getPossibleMoves$1$max(50));
              if ($.isEmpty(possibleMoves) !== true) {
                $.forEach(possibleMoves, new $.Closure17(this));
              }
              if ($.some(this.actors, new $.Closure18(this)) === true) {
                $.add$1(this.playerChoices, $.Choice$4('Target another enemy.', (void 0), new $.Closure19(this), true));
              }
            }
            if ($.isEmpty(this.playerChoices) !== true) this.interactionNeeded = true;
        }
      }
      t1 = this.time;
    case 5:
      state = 0;
      this.time = $.add(t1, 1);
  }
 },
 start$0: function() {
  $.forEach(this.actors, new $.Closure27(this));
  this._started = true;
 },
 Combat$0: function() {
  this.storyline = $.Storyline$0();
  this.actors = $.List((void 0));
  this.playerChoices = $.List((void 0));
  this.on = $.CombatCallbackHandler$1(this);
 },
 is$LoopedEvent: true
};

$$.ScripterImpl = {"":
 ["textBuffer", "vars", "choices", "nextScriptStack", "repeatBlockBit", "nextPage", "currentBlock", "currentPage", "blocks", "pages", "_interfacePort"],
 super: "Scripter",
 initBlock$0: function() {
  $.indexSet(this.vars, 'moveStomachPunch', $.CombatMoveType$11('hit to the stomach', 'hit <object> to the stomach', '<subject> {hit<s>|punch<es>} <object> to the stomach', 821392, 4, 1, 1, 2, 0.3, 0.1, 0));
  var t1 = new $.Closure48();
  $.index(this.vars, 'moveStomachPunch').set$canContinue(t1);
  $.index(this.vars, 'moveStomachPunch').set$isApplicable(t1);
  $.indexSet(this.vars, 'moveRightHook', $.CombatMoveType$11('right hook', 'punch <object> in the head with <subject\'s> right hook', '<subject> {hit<s>|punch<es>} <object> in the {face|head} with <subject\'s> right hook', 822274, 6, 1, 2, 8, 0.4, 0.4, -1));
  t1 = new $.Closure49();
  $.index(this.vars, 'moveRightHook').set$canContinue(t1);
  $.index(this.vars, 'moveRightHook').set$isApplicable(t1);
  $.index($.index(this.vars, 'moveRightHook').get$on(), 'hit').addFirst$1(new $.Closure50());
  $.indexSet(this.vars, 'moveJab', $.CombatMoveType$11('jab at face', 'quickly jab at <object\'s> face', '<subject> {{lightly|quickly} jab<s>|throw<s> a {light|quick} jab} at <object\'s> {face|head}', 723088, 2, 1, 0, 3, 0.3, 0.1, 0));
  t1 = new $.Closure51();
  $.index(this.vars, 'moveJab').set$canContinue(t1);
  $.index(this.vars, 'moveJab').set$isApplicable(t1);
  $.indexSet(this.vars, 'moveGroinPunch', $.CombatMoveType$11('hit to the groin', 'punch <object> {in the groin|between the legs|into the genitals}', '<subject> {hit<s>|punch<es>} <object> {in the groin|between the legs|into the genitals}', 821408, 4, 2, 5, 5, 0.7, 0.4, 0));
  t1 = new $.Closure52();
  $.index(this.vars, 'moveGroinPunch').set$canContinue(t1);
  $.index(this.vars, 'moveGroinPunch').set$isApplicable(t1);
  $.indexSet(this.vars, 'moveKickLegs', $.CombatMoveType$11('kick to the legs', 'kick <object\'s> legs', '<subject> kick<s> <object\'s> legs', 857152, 6, 2, 0, 15, 0.2, 0.2, -1));
  t1 = new $.Closure53();
  $.index(this.vars, 'moveKickLegs').set$canContinue(t1);
  $.index(this.vars, 'moveKickLegs').set$isApplicable(t1);
  $.indexSet(this.vars, 'moveFootSweep', $.CombatMoveType$11('foot sweep', 'sweep <object\'s> feet', '<subject> {undercut<s>|sweep<s>} <object\'s> legs', 857152, 6, 4, 0, 31, 0.2, 0.4, -1));
  $.add$1($.index($.index(this.vars, 'moveFootSweep').get$on(), 'hit'), new $.Closure54());
  t1 = new $.Closure55();
  $.index(this.vars, 'moveFootSweep').set$canContinue(t1);
  $.index(this.vars, 'moveFootSweep').set$isApplicable(t1);
  $.indexSet(this.vars, 'moveKickOnGround', $.CombatMoveType$11('kick', 'kick <object> while on the ground', '<subject> kick<s> <object> {|while }on the ground', 823440, 4, 3, 3, 10, 0.4, 0.2, 0));
  t1 = new $.Closure56();
  $.index(this.vars, 'moveKickOnGround').set$canContinue(t1);
  $.index(this.vars, 'moveKickOnGround').set$isApplicable(t1);
  $.indexSet(this.vars, 'moveStepBack', $.CombatMoveType$11('step back', 'focus on defense', '<subject> {{withdraw<s>|back<s> away} {a little|a bit|a little bit}|give<s> a {|little} bit of ground}', 1054720, 5, 0, 0, 0, 1.0, 1.0, 1));
  t1 = new $.Closure57();
  $.index(this.vars, 'moveStepBack').set$canContinue(t1);
  $.index(this.vars, 'moveStepBack').set$isApplicable(t1);
  $.index($.index(this.vars, 'moveStepBack').get$on(), 'start').replaceAllWith$1(new $.Closure58());
  $.index($.index(this.vars, 'moveStepBack').get$on(), 'end').replaceAllWith$1(new $.Closure59());
  $.indexSet(this.vars, 'moveBasicParryHand', $.CombatMoveType$11('parry', 'parry <object\'s> move', '<subject> {gather<s>|brace<s>} to parry <object\'s> {attack|move}', 1050624, 3, 1, 0, 0, 1.0, 1.0, 1));
  t1 = new $.Closure60();
  $.index(this.vars, 'moveBasicParryHand').set$isApplicable(t1);
  t1 = new $.Closure61();
  $.index(this.vars, 'moveBasicParryHand').set$canContinue(t1);
  $.add$1($.index($.index(this.vars, 'moveBasicParryHand').get$on(), 'end'), new $.Closure62());
  t1 = new $.Closure63();
  $.index(this.vars, 'moveBasicParryHand').set$computeSuitability(t1);
  $.indexSet(this.vars, 'moveStandUp', $.CombatMoveType$11('stand up', 'stand up', '<subject> {stand<s> up|{rise<s>|get<s>} to <subject\'s> feet|get<s> up}', 1052672, 8, 0, 0, 0, 1.0, 1.0, -1));
  t1 = new $.Closure64();
  $.index(this.vars, 'moveStandUp').set$isApplicable(t1);
  $.add$1($.index($.index(this.vars, 'moveStandUp').get$on(), 'update'), new $.Closure65());
  $.index($.index(this.vars, 'moveStandUp').get$on(), 'start').replaceAllWith$1(new $.Closure66());
  $.index($.index(this.vars, 'moveStandUp').get$on(), 'end').replaceAllWith$1(new $.Closure67());
  t1 = new $.Closure68();
  $.index(this.vars, 'moveStandUp').set$computeSuitability(t1);
  $.indexSet(this.vars, 'moveRollOut', $.CombatMoveType$11('roll', 'roll out of the way', '<subject> roll<s> {out|away} of <object\'s> {way|reach}', 1048576, 3, 1, 0, 0, 1.0, 1.0, -1));
  t1 = new $.Closure69();
  $.index(this.vars, 'moveRollOut').set$isApplicable(t1);
  $.index($.index(this.vars, 'moveRollOut').get$on(), 'end').replaceAllWith$1(new $.Closure70());
  t1 = new $.Closure71();
  $.index(this.vars, 'moveRollOut').set$computeSuitability(t1);
  $.indexSet(this.vars, 'moveSlash', $.CombatMoveType$11('slash', 'slash <object\'s> body', '<subject> slash<es> <object\'s> body', 822288, 5, 3, 10, 5, 0.7, 0.4, -1));
  $.indexSet(this.vars, 'humanMoves', [$.index(this.vars, 'moveStomachPunch'), $.index(this.vars, 'moveRightHook'), $.index(this.vars, 'moveJab'), $.index(this.vars, 'moveKickLegs'), $.index(this.vars, 'moveFootSweep'), $.index(this.vars, 'moveKickOnGround'), $.index(this.vars, 'moveStepBack'), $.index(this.vars, 'moveStandUp'), $.index(this.vars, 'moveBasicParryHand'), $.index(this.vars, 'moveGroinPunch'), $.index(this.vars, 'moveRollOut')]);
  $.indexSet(this.vars, 'weaponHands', $.WeaponType$4('hand', 0, 0, 0));
  $.indexSet(this.vars, 'weaponSword', $.WeaponType$4('sword', 3, 3, 0));
  $.indexSet(this.vars, 'armorClothes', $.ArmorType$6('clothes', 0, 0, 126, 1920, 98304));
  $.indexSet(this.vars, 'armorHelmet', $.ArmorType$6('helmet', 1, 0, 2, 1920, 98304));
  $.indexSet(this.vars, 'player', $.Player$0());
  $.addAll($.index(this.vars, 'player').get$moves(), $.index(this.vars, 'humanMoves'));
  t1 = $.index(this.vars, 'weaponHands');
  $.index(this.vars, 'player').set$weapon(t1);
  $.index(this.vars, 'player').set$fighting(1);
 },
 updateLoopedEvent$0: function() {
  var event$ = $.propertyTypeCheck($.index(this.vars, '_curLoopedEvent'), 'is$LoopedEvent');
  if (event$.get$finished() === true) return;
  $.clear(event$.get$playerChoices());
  event$.updateUntilInteraction$0();
  this.echo$1($.toString(event$.get$storyline()));
  $.clear(event$.get$storyline());
  $.addAll(this.choices, event$.get$playerChoices());
  this.nextScript$1(this.get$updateLoopedEvent());
 },
 get$updateLoopedEvent: function() { return new $.Closure101(this, 'updateLoopedEvent$0'); },
 start$1: function(event$) {
  $.propertyTypeCheck(event$, 'is$LoopedEvent');
  $.indexSet(this.vars, '_curLoopedEvent', event$);
  var t1 = this.vars;
  var t2 = $.List((void 0));
  $.setRuntimeTypeInfo(t2, ({E: 'Choice'}));
  $.indexSet(t1, '_curLoopedEventChoices', t2);
  event$.set$playerChoices($.index(this.vars, '_curLoopedEventChoices'));
  event$.start$0();
  this.updateLoopedEvent$0();
 },
 ScripterImpl$0: function() {
  this.pages = [['# Thin Ice System (TIS) Unit Testing', $.makeLiteralMap(['string', 'Play', 'goto', 1]), $.makeLiteralMap(['string', 'Run automatic fight', 'goto', 3]), $.makeLiteralMap(['string', 'Run tests', 'goto', 2])], ['You encounter a worthy opponent: a homeless man!', new $.Closure3(this), 'He charges at you!', new $.Closure4(this), 'And that&apos;&apos;s the end of the fight!'], ['Running tests & asserts.', 'Assert util functions.', new $.Closure5(), 'Assert Storyline string functions.', new $.Closure6(this)], ['Asserting that more actors of the same type can take out less actors, most of the time.', new $.Closure7(this)], [new $.Closure8(this), new $.Closure9(this), 'Congratulations! You beat your first enemies!'], ['You died like the bitch you are.']];
 }
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this._get$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._DeprecatedPeerConnectionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$click: function() {
  return this._get$1('click');
 }
};

$$.FilteredElementList = {"":
 ["_childNodes", "_node"],
 super: "Object",
 last$0: function() {
  return $.last(this.get$_filtered());
 },
 lastIndexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Element');
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf$2(this.get$_filtered(), element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Element');
  $.intTypeCheck(start);
  return $.indexOf$2(this.get$_filtered(), element, start);
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange(this.get$_filtered(), start, rangeLength);
 },
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  var t1 = this.get$_filtered();
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.operator$index$1$bailout(index, 1, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(index, state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      $.intTypeCheck(index);
      var t1 = this.get$_filtered();
    case 1:
      state = 0;
      return $.index(t1, index);
  }
 },
 get$length: function() {
  return $.get$length(this.get$_filtered());
 },
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
 },
 some$1: function(f) {
  return $.some(this.get$_filtered(), f);
 },
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
 },
 removeLast$0: function() {
  var result = this.last$0();
  !$.eqNullB(result) && result.remove$0();
  return result;
 },
 clear$0: function() {
  $.clear(this._childNodes);
 },
 removeRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.Closure99());
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC15);
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$Element');
  this.add$1(value);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  $.forEach(collection, this.get$add());
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$Element');
  $.add$1(this._childNodes, value);
 },
 get$add: function() { return new $.Closure104(this, 'add$1'); },
 set$length: function(newLength) {
  $.intTypeCheck(newLength);
  var len = $.get$length(this);
  if ($.geB(newLength, len)) return;
  if ($.ltB(newLength, 0)) throw $.captureStackTrace($.CTC16);
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$Element');
  this.operator$index$1(index).replaceWith$1(value);
 },
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
 },
 get$first: function() {
  for (var t1 = $.iterator(this._childNodes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (typeof t2 === 'object' && t2.is$Element()) {
      return t2;
    }
  }
  return;
 },
 first$0: function() { return this.get$first().$call$0(); },
 get$_filtered: function() {
  return $.List$from($.filter(this._childNodes, new $.Closure98()));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
};

$$._ChildrenElementList = {"":
 ["_childElements", "_lib_element"],
 super: "Object",
 last$0: function() {
  return this._lib_element.get$$$dom_lastElementChild();
 },
 removeLast$0: function() {
  var result = this.last$0();
  !$.eqNullB(result) && this._lib_element.$dom_removeChild$1(result);
  return result;
 },
 clear$0: function() {
  this._lib_element.set$text('');
 },
 lastIndexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Element');
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Element');
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $._FrozenElementList$_wrap$1($.getRange2(this, start, rangeLength, []));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC15);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  for (var t1 = $.iterator(collection), t2 = this._lib_element; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 iterator$0: function() {
  return $.iterator(this._toList$0());
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$_ElementImpl');
  return this.add$1(value);
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$_ElementImpl');
  this._lib_element.$dom_appendChild$1(value);
  return value;
 },
 set$length: function(newLength) {
  $.intTypeCheck(newLength);
  throw $.captureStackTrace($.CTC14);
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_ElementImpl');
  var t1 = this._lib_element;
  var t2 = this._childElements;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object'||t2.constructor !== Array)) return this.operator$indexSet$2$bailout(index, value, 1, t1, t2);
  if (index !== (index | 0)) throw $.iae(index);
  var t3 = t2.length;
  if (index < 0 || index >= t3) throw $.ioore(index);
  t1.$dom_replaceChild$2(value, t2[index]);
 },
 operator$indexSet$2$bailout: function(index, value, state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      $.intTypeCheck(index);
      $.callTypeCheck(value, 'is$_ElementImpl');
      var t1 = this._lib_element;
      var t2 = this._childElements;
    case 1:
      state = 0;
      t1.$dom_replaceChild$2(value, $.index(t2, index));
  }
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.operator$index$1$bailout(index, 1, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(index, state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      $.intTypeCheck(index);
      var t1 = this._childElements;
    case 1:
      state = 0;
      return $.index(t1, index);
  }
 },
 get$length: function() {
  return $.get$length(this._childElements);
 },
 isEmpty$0: function() {
  return $.eqNull(this._lib_element.get$$$dom_firstElementChild());
 },
 some$1: function(f) {
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    if (f.$call$1(t1.next$0()) === true) return true;
  }
  return false;
 },
 filter$1: function(f) {
  var t1 = ({});
  t1.f_14 = f;
  var output = [];
  this.forEach$1(new $.Closure97(t1, output));
  return $._FrozenElementList$_wrap$1(output);
 },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._childElements); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
 },
 get$first: function() {
  return this._lib_element.get$$$dom_firstElementChild();
 },
 first$0: function() { return this.get$first().$call$0(); },
 _toList$0: function() {
  var t1 = this._childElements;
  var output = $.List($.get$length(t1));
  for (var len = $.intTypeCheck($.get$length(t1)), i = 0; $.ltB(i, len); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = $.index(t1, i);
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = output.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    output[i] = t2;
  }
  return output;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
};

$$._FrozenElementList = {"":
 ["_nodeList"],
 super: "Object",
 last$0: function() {
  return $.last(this._nodeList);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC14);
 },
 clear$0: function() {
  throw $.captureStackTrace($.CTC14);
 },
 lastIndexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Element');
  $.intTypeCheck(start);
  return $.lastIndexOf$2(this._nodeList, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Element');
  $.intTypeCheck(start);
  return $.indexOf$2(this._nodeList, element, start);
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $._FrozenElementList$_wrap$1($.getRange(this._nodeList, start, rangeLength));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC14);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.CTC14);
 },
 iterator$0: function() {
  return $._FrozenElementListIterator$1(this);
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$Element');
  throw $.captureStackTrace($.CTC14);
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$Element');
  throw $.captureStackTrace($.CTC14);
 },
 set$length: function(newLength) {
  $.intTypeCheck(newLength);
  $.set$length(this._nodeList, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$Element');
  throw $.captureStackTrace($.CTC14);
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  var t1 = this._nodeList;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.operator$index$1$bailout(index, 1, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(index, state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      $.intTypeCheck(index);
      var t1 = this._nodeList;
    case 1:
      state = 0;
      return $.index(t1, index);
  }
 },
 get$length: function() {
  return $.get$length(this._nodeList);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
 },
 some$1: function(f) {
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    if (f.$call$1(t1.next$0()) === true) return true;
  }
  return false;
 },
 filter$1: function(f) {
  var out = $._ElementList$1([]);
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && out.add$1(t2);
  }
  return out;
 },
 forEach$1: function(f) {
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
 },
 get$first: function() {
  return $.index(this._nodeList, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
};

$$._FrozenElementListIterator = {"":
 ["_lib_index", "_lib_list"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this._lib_index;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = $.get$length(this._lib_list);
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 < t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_index;
    case 1:
      state = 0;
      var t2 = $.get$length(this._lib_list);
    case 2:
      state = 0;
      return $.lt(t1, t2);
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC2);
  var t1 = this._lib_list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.next$0$bailout(1, t1, 0);
  var t2 = this._lib_index;
  if (typeof t2 !== 'number') return this.next$0$bailout(2, t1, t2);
  this._lib_index = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC2);
      var t1 = this._lib_list;
    case 1:
      state = 0;
      var t2 = this._lib_index;
    case 2:
      state = 0;
      this._lib_index = $.add(t2, 1);
      return $.index(t1, t2);
  }
 },
 is$Iterator: true
};

$$._ElementList = {"":
 ["_lib_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $._ElementList$1($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
 },
 filter$1: function(f) {
  return $._ElementList$1($._ListWrapper.prototype.filter$1.call(this, f));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$click: function() {
  return this._get$1('click');
 }
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._EventsImpl = {"":
 ["_ptr"],
 super: "Object",
 _get$1: function(type) {
  $.stringTypeCheck(type);
  return $._EventListenerListImpl$2(this._ptr, type);
 },
 operator$index$1: function(type) {
  $.stringTypeCheck(type);
  return this._get$1($.toLowerCase(type));
 }
};

$$._EventListenerListImpl = {"":
 ["_type", "_ptr"],
 super: "Object",
 _remove$2: function(listener, useCapture) {
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
 },
 _add$2: function(listener, useCapture) {
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
 },
 remove$2: function(listener, useCapture) {
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  this._remove$2(listener, useCapture);
  return this;
 },
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 add$2: function(listener, useCapture) {
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  this._add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this._get$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._ChildNodeListLazy = {"":
 ["_lib_this"],
 super: "Object",
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  var t1 = this._lib_this.get$$$dom_childNodes();
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.operator$index$1$bailout(index, 1, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(index, state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      $.intTypeCheck(index);
      var t1 = this._lib_this.get$$$dom_childNodes();
    case 1:
      state = 0;
      return $.index(t1, index);
  }
 },
 get$length: function() {
  return $.get$length(this._lib_this.get$$$dom_childNodes());
 },
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $._NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 lastIndexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Node');
  $.intTypeCheck(start);
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,0)
},
 indexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Node');
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter3(this, [], f));
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 iterator$0: function() {
  return $.iterator(this._lib_this.get$$$dom_childNodes());
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_NodeImpl');
  this._lib_this.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._lib_this.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !$.eqNullB(result) && this._lib_this.$dom_removeChild$1(result);
  return result;
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  for (var t1 = $.iterator(collection), t2 = this._lib_this; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$_NodeImpl');
  this._lib_this.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$_NodeImpl');
  this._lib_this.$dom_appendChild$1(value);
 },
 last$0: function() {
  return this._this.lastChild;;
 },
 get$first: function() {
  return this._this.firstChild;;
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 get$first: function() {
  return $.index(this._lib_list, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange(this._lib_list, start, rangeLength);
 },
 last$0: function() {
  return $.last(this._lib_list);
 },
 removeLast$0: function() {
  return $.removeLast(this._lib_list);
 },
 clear$0: function() {
  return $.clear(this._lib_list);
 },
 lastIndexOf$2: function(element, start) {
  $.intTypeCheck(start);
  return $.lastIndexOf$2(this._lib_list, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,0)
},
 indexOf$2: function(element, start) {
  $.intTypeCheck(start);
  return $.indexOf$2(this._lib_list, element, start);
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  return $.sort(this._lib_list, compare);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  return $.addAll(this._lib_list, collection);
 },
 addLast$1: function(value) {
  return $.addLast(this._lib_list, value);
 },
 add$1: function(value) {
  return $.add$1(this._lib_list, value);
 },
 set$length: function(newLength) {
  $.intTypeCheck(newLength);
  $.set$length(this._lib_list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  var t1 = this._lib_list;
  if (typeof t1 !== 'object'||t1.constructor !== Array||!!t1.immutable$list) return this.operator$indexSet$2$bailout(index, value, 1, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  t1[index] = value;
 },
 operator$indexSet$2$bailout: function(index, value, state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      $.intTypeCheck(index);
      var t1 = this._lib_list;
    case 1:
      state = 0;
      $.indexSet(t1, index, value);
  }
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  var t1 = this._lib_list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.operator$index$1$bailout(index, 1, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(index, state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      $.intTypeCheck(index);
      var t1 = this._lib_list;
    case 1:
      state = 0;
      return $.index(t1, index);
  }
 },
 get$length: function() {
  return $.get$length(this._lib_list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._lib_list);
 },
 some$1: function(f) {
  return $.some(this._lib_list, f);
 },
 filter$1: function(f) {
  return $.filter(this._lib_list, f);
 },
 forEach$1: function(f) {
  return $.forEach(this._lib_list, f);
 },
 iterator$0: function() {
  return $.iterator(this._lib_list);
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_lib_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $._NodeListWrapper$1($.getRange(this._lib_list, start, rangeLength));
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter(this._lib_list, f));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$close: function() {
  return this._get$1('close');
 },
 close$0: function() { return this.get$close().$call$0(); },
 get$click: function() {
  return this._get$1('click');
 }
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$click: function() {
  return this._get$1('click');
 }
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$start: function() {
  return this._get$1('start');
 },
 start$0: function() { return this.get$start().$call$0(); },
 start$1: function(arg0) { return this.get$start().$call$1(arg0); }
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$close: function() {
  return this._get$1('close');
 },
 close$0: function() { return this.get$close().$call$0(); }
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$click: function() {
  return this._get$1('click');
 }
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl"
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC2);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.next$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.next$0$bailout(2, t1, t2);
  this._pos = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC2);
      var t1 = this._array;
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t2, 1);
      return $.index(t1, t2);
  }
 },
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 },
 is$Iterator: true
};

$$.Closure = {"":
 ["box_0"],
 super: "Closure102",
 $call$2: function(k, v) {
  this.box_0.first_3 !== true && $.add$1(this.box_0.result_1, ', ');
  this.box_0.first_3 = false;
  $._emitObject(k, this.box_0.result_1, this.box_0.visiting_2);
  $.add$1(this.box_0.result_1, ': ');
  $._emitObject(v, this.box_0.result_1, this.box_0.visiting_2);
 }
};

$$.Closure2 = {"":
 ["this_2", "box_0"],
 super: "Closure102",
 $call$2: function(key, value) {
  $.stringTypeCheck(key);
  if (this.box_0.first_1 !== true) $.add$1(this.this_2.get$_sb(), ',"');
  else $.add$1(this.this_2.get$_sb(), '"');
  $._escape(this.this_2.get$_sb(), key);
  $.add$1(this.this_2.get$_sb(), '":');
  this.this_2._stringify$1(value);
  this.box_0.first_1 = false;
 }
};

$$.Closure3 = {"":
 ["this_0"],
 super: "Closure102",
 $call$0: function() {
  $.indexSet(this.this_0.get$vars(), 'man', $.Actor$0());
  $.addAll($.index(this.this_0.get$vars(), 'man').get$moves(), $.index(this.this_0.get$vars(), 'humanMoves'));
  var t1 = $.index(this.this_0.get$vars(), 'weaponHands');
  $.index(this.this_0.get$vars(), 'man').set$weapon(t1);
  $.index(this.this_0.get$vars(), 'man').set$fighting(0);
  t1 = ['the drunkard', 'the drunk man', 'the man'];
  $.index(this.this_0.get$vars(), 'man').set$names(t1);
  $.add$1($.index($.index(this.this_0.get$vars(), 'man').get$on(), 'sufferHit'), new $.Closure40());
  $.add$1($.index(this.this_0.get$vars(), 'man').get$armors(), $.index(this.this_0.get$vars(), 'armorHelmet'));
 }
};

$$.Closure40 = {"":
 [],
 super: "Closure102",
 $call$2: function(_this, e) {
  _this.report$1('<subject> looks very surprised');
 }
};

$$.Closure4 = {"":
 ["this_1"],
 super: "Closure102",
 $call$0: function() {
  $.indexSet(this.this_1.get$vars(), 'combat', $.Combat$0());
  $.addAll($.index(this.this_1.get$vars(), 'combat').get$actors(), [$.index(this.this_1.get$vars(), 'player'), $.index(this.this_1.get$vars(), 'man')]);
  this.this_1.start$1($.index(this.this_1.get$vars(), 'combat'));
 }
};

$$.Closure5 = {"":
 [],
 super: "Closure102",
 $call$0: function() {
  $.assert($.eq($.countBits(15), 4));
  $.assert($.eq($.countBits(255), 8));
  $.assert($.eq($.countBits(65535), 16));
  $.assert($.eq($.countBits(65534), 15));
  $.assert($.eq($.countBits(65534), 15));
  $.assert($.eq($.capitalize('things'), 'Things'));
  $.assert($.eq($.capitalize('/things'), '/things'));
 }
};

$$.Closure6 = {"":
 ["this_2"],
 super: "Closure102",
 $call$0: function() {
  var result = $.stringTypeCheck($.resolveRandoms('you {hit|punch} him in the face'));
  $.print(result);
  $.assert($.eqB(result, 'you hit him in the face') || $.eqB(result, 'you punch him in the face'));
  result = $.stringTypeCheck($.resolveRandoms('{you|thy} have my word, {Sir|Sire}'));
  $.print(result);
  $.assert($.startsWith(result, 'you have') === true || $.startsWith(result, 'thy have') === true);
  $.assert($.endsWith(result, ', Sir') === true || $.endsWith(result, ', Sire') === true);
  result = $.stringTypeCheck($.resolveRandoms('{||blank }options'));
  $.print(result);
  $.assert($.eqB(result, 'options') || $.eqB(result, 'blank options'));
  result = $.stringTypeCheck($.resolveRandoms('{||blank }options'));
  $.print(result);
  $.assert($.eqB(result, 'options') || $.eqB(result, 'blank options'));
  result = $.stringTypeCheck($.resolveRandoms('{1|two|3} options'));
  $.print(result);
  $.assert($.eqB(result, '1 options') || $.eqB(result, 'two options') || $.eqB(result, '3 options'));
  result = $.stringTypeCheck($.resolveRandoms('{1|two|3} options'));
  $.print(result);
  $.assert($.eqB(result, '1 options') || $.eqB(result, 'two options') || $.eqB(result, '3 options'));
  result = $.stringTypeCheck($.resolveRandoms('{I am deeply {honoured|humbled}|You {honour|humble} me, Sire}.'));
  $.print(result);
  $.assert($.startsWith(result, 'I am') === true || $.startsWith(result, 'You ') === true);
  $.assert($.endsWith(result, 'ed.') === true || $.endsWith(result, 'Sire.') === true);
  result = $.stringTypeCheck($.resolveRandoms('No tags.'));
  $.print(result);
  $.assert($.eq(result, 'No tags.'));
  result = $.stringTypeCheck($.resolveRandoms('This is {not an option string}.'));
  $.print(result);
  $.assert($.eq(result, 'This is {not an option string}.'));
  result = $.stringTypeCheck($.resolveRandoms('{}malformed {} horrible string{}'));
  $.print(result);
  $.assert($.eq(result, '{}malformed {} horrible string{}'));
  result = $.stringTypeCheck($.resolveRandoms('{unbalanced{g|er|e}'));
  $.print(result);
  $.assert($.eq(result, '{unbalanced{g|er|e}'));
  for (var countBelow = 0, i = 0; $.ltB(i, 1000); i = $.intTypeCheck($.add(i, 1))) {
    if ($.ltB($.doubleTypeCheck($.random()), 0.1)) {
      countBelow = $.intTypeCheck($.add(countBelow, 1));
    }
  }
  $.DEBUG('There were ' + $.S(countBelow) + ' throws (out of 1000) that resulted with less than 0.1.');
  $.assert($.lt(countBelow, 500));
  $.assert($.lt(countBelow, 200));
  var a = $.Actor$0();
  var b = $.Actor$0();
  b.set$stance(19);
  $.assert($.eq($.index(this.this_2.get$vars(), 'moveKickLegs').canContinue$2(a, b), false));
  $.assert($.eq($.index(this.this_2.get$vars(), 'moveKickLegs').isApplicable$2(a, b), false));
 }
};

$$.Closure7 = {"":
 ["this_3"],
 super: "Closure102",
 $call$0: function() {
  $.indexSet(this.this_3.get$vars(), 'NUMBER_OF_RUNS', 10);
  $.indexSet(this.this_3.get$vars(), 'teamOneWins', 0);
  $.indexSet(this.this_3.get$vars(), 'teamTwoWins', 0);
  var runTest = $.functionTypeCheck(new $.Closure38(this.this_3));
  for (var i = 0; $.ltB(i, $.index(this.this_3.get$vars(), 'NUMBER_OF_RUNS')); i = $.intTypeCheck($.add(i, 1))) {
    runTest.$call$0();
  }
  $.DEBUG('Swarm vs Individual: ' + $.S($.index(this.this_3.get$vars(), 'teamOneWins')) + ' : ' + $.S($.index(this.this_3.get$vars(), 'teamTwoWins')));
  $.assert($.gt($.index(this.this_3.get$vars(), 'teamOneWins'), $.index(this.this_3.get$vars(), 'teamTwoWins')));
 }
};

$$.Closure38 = {"":
 ["this_4"],
 super: "Closure102",
 $call$0: function() {
  $.indexSet(this.this_4.get$vars(), 'swarmer1', $.Actor$0());
  var t1 = ['the first swarmer'];
  $.index(this.this_4.get$vars(), 'swarmer1').set$names(t1);
  $.index(this.this_4.get$vars(), 'swarmer1').set$pronoun($.CTC7);
  $.addAll($.index(this.this_4.get$vars(), 'swarmer1').get$moves(), $.index(this.this_4.get$vars(), 'humanMoves'));
  $.index(this.this_4.get$vars(), 'swarmer1').set$team(2);
  $.indexSet(this.this_4.get$vars(), 'swarmer2', $.Actor$0());
  t1 = ['the second swarmer'];
  $.index(this.this_4.get$vars(), 'swarmer2').set$names(t1);
  $.index(this.this_4.get$vars(), 'swarmer2').set$pronoun($.CTC7);
  $.addAll($.index(this.this_4.get$vars(), 'swarmer2').get$moves(), $.index(this.this_4.get$vars(), 'humanMoves'));
  $.index(this.this_4.get$vars(), 'swarmer2').set$team(2);
  $.indexSet(this.this_4.get$vars(), 'swarmer3', $.Actor$0());
  t1 = ['the third swarmer'];
  $.index(this.this_4.get$vars(), 'swarmer3').set$names(t1);
  $.index(this.this_4.get$vars(), 'swarmer3').set$pronoun($.CTC7);
  $.addAll($.index(this.this_4.get$vars(), 'swarmer3').get$moves(), $.index(this.this_4.get$vars(), 'humanMoves'));
  $.index(this.this_4.get$vars(), 'swarmer3').set$team(2);
  $.indexSet(this.this_4.get$vars(), 'individual1', $.Actor$0());
  t1 = ['the first individual'];
  $.index(this.this_4.get$vars(), 'individual1').set$names(t1);
  $.addAll($.index(this.this_4.get$vars(), 'individual1').get$moves(), $.index(this.this_4.get$vars(), 'humanMoves'));
  $.index(this.this_4.get$vars(), 'individual1').set$team(3);
  $.indexSet(this.this_4.get$vars(), 'individual2', $.Actor$0());
  t1 = ['the second individual'];
  $.index(this.this_4.get$vars(), 'individual2').set$names(t1);
  $.addAll($.index(this.this_4.get$vars(), 'individual2').get$moves(), $.index(this.this_4.get$vars(), 'humanMoves'));
  $.index(this.this_4.get$vars(), 'individual2').set$team(3);
  $.indexSet(this.this_4.get$vars(), 'combat', $.Combat$0());
  $.addAll($.index(this.this_4.get$vars(), 'combat').get$actors(), [$.index(this.this_4.get$vars(), 'individual1'), $.index(this.this_4.get$vars(), 'swarmer1'), $.index(this.this_4.get$vars(), 'individual2'), $.index(this.this_4.get$vars(), 'swarmer2'), $.index(this.this_4.get$vars(), 'swarmer3')]);
  $.add$1($.index($.index(this.this_4.get$vars(), 'combat').get$on(), 'update'), new $.Closure39());
  $.index(this.this_4.get$vars(), 'combat').start$0();
  $.index(this.this_4.get$vars(), 'combat').updateUntilInteraction$0();
  $.assert($.index(this.this_4.get$vars(), 'combat').get$finished());
  if (!($.index(this.this_4.get$vars(), 'swarmer1').get$alive() !== true && $.index(this.this_4.get$vars(), 'swarmer2').get$alive() !== true && $.index(this.this_4.get$vars(), 'swarmer3').get$alive() !== true)) {
    t1 = $.index(this.this_4.get$vars(), 'individual1').get$alive() !== true && $.index(this.this_4.get$vars(), 'individual2').get$alive() !== true;
  } else t1 = true;
  $.assert(t1);
  $.DEBUG($.toString($.index(this.this_4.get$vars(), 'combat').get$storyline()));
  t1 = $.index(this.this_4.get$vars(), 'individual1').get$alive() === true || $.index(this.this_4.get$vars(), 'individual2').get$alive() === true;
  if (t1) {
    t1 = this.this_4.get$vars();
    $.indexSet(t1, 'teamTwoWins', $.add($.index(t1, 'teamTwoWins'), 1));
  } else {
    t1 = this.this_4.get$vars();
    $.indexSet(t1, 'teamOneWins', $.add($.index(t1, 'teamOneWins'), 1));
  }
 }
};

$$.Closure39 = {"":
 [],
 super: "Closure102",
 $call$1: function(combat) {
  $.eqB($.mod(combat.get$time(), 10), 0) && $.add$1(combat.get$storyline(), 'it\'s 10 seconds later');
 }
};

$$.Closure8 = {"":
 ["this_5"],
 super: "Closure102",
 $call$0: function() {
  $.indexSet(this.this_5.get$vars(), 'wolf', $.Actor$0());
  var t1 = ['the orcling', 'the orcling', 'the young orcling'];
  $.index(this.this_5.get$vars(), 'wolf').set$names(t1);
  $.index(this.this_5.get$vars(), 'wolf').set$pronoun($.CTC7);
  $.addAll($.index(this.this_5.get$vars(), 'wolf').get$moves(), $.index(this.this_5.get$vars(), 'humanMoves'));
  $.index(this.this_5.get$vars(), 'wolf').set$hitpoints(2);
  $.index(this.this_5.get$vars(), 'wolf').set$speed(1);
  $.indexSet(this.this_5.get$vars(), 'orc', $.Actor$0());
  t1 = ['the orc', 'the big orc', 'the ugly orc'];
  $.index(this.this_5.get$vars(), 'orc').set$names(t1);
  $.addAll($.index(this.this_5.get$vars(), 'orc').get$moves(), $.index(this.this_5.get$vars(), 'humanMoves'));
  $.indexSet(this.this_5.get$vars(), 'combat', $.Combat$0());
  $.addAll($.index(this.this_5.get$vars(), 'combat').get$actors(), [$.index(this.this_5.get$vars(), 'wolf'), $.index(this.this_5.get$vars(), 'orc'), $.index(this.this_5.get$vars(), 'player')]);
  $.add$1($.index($.index(this.this_5.get$vars(), 'combat').get$on(), 'update'), new $.Closure12());
  this.this_5.start$1($.index(this.this_5.get$vars(), 'combat'));
 }
};

$$.Closure12 = {"":
 [],
 super: "Closure102",
 $call$1: function(combat) {
  $.eqB($.mod(combat.get$time(), 10), 5) && $.add$1(combat.get$storyline(), 'a lonely bird beeps in the distance');
 }
};

$$.Closure9 = {"":
 ["this_6"],
 super: "Closure102",
 $call$0: function() {
  $.index(this.this_6.get$vars(), 'player').get$alive() !== true && this.this_6.goto$1(1);
 }
};

$$.Closure10 = {"":
 ["box_0"],
 super: "Closure102",
 $call$1: function(element) {
  var counter = $.intTypeCheck($.add(this.box_0.counter_1, 1));
  this.box_0.counter_1 = counter;
 }
};

$$.Closure11 = {"":
 ["box_0"],
 super: "Closure102",
 $call$1: function(entry) {
  $.propertyTypeCheck(entry, 'is$KeyValuePair');
  this.box_0.f_1.$call$2(entry.get$key(), entry.get$value());
 }
};

$$.Closure13 = {"":
 [],
 super: "Closure102",
 $call$1: function(actor) {
  actor.update$0();
  $.index(actor.get$on(), 'update').dispatchAll$0();
 }
};

$$.Closure14 = {"":
 ["this_6"],
 super: "Closure102",
 $call$1: function(a) {
  var t1 = ({});
  t1.a_1 = a;
  return t1.a_1.get$alive() === true && $.some(this.this_6.get$actors(), new $.Closure24(t1)) === true;
 }
};

$$.Closure24 = {"":
 ["box_0"],
 super: "Closure102",
 $call$1: function(b) {
  return b.get$alive() === true && !$.eqB(b.get$team(), this.box_0.a_1.get$team());
 }
};

$$.Closure15 = {"":
 ["this_7"],
 super: "Closure102",
 $call$1: function(o) {
  return !$.eqB(o.get$team(), this.this_7.get$_player().get$team()) && o.get$alive() === true;
 }
};

$$.Closure16 = {"":
 ["this_8"],
 super: "Closure102",
 $call$1: function(enemy) {
  var t1 = ({});
  t1.enemy_3 = enemy;
  $.add$1(this.this_8.get$playerChoices(), $.Choice$4('Target ' + $.S(t1.enemy_3.get$name()) + '.', (void 0), new $.Closure23(this.this_8, t1), true));
 }
};

$$.Closure23 = {"":
 ["this_9", "box_2"],
 super: "Closure102",
 $call$0: function() {
  var t1 = this.this_9.get$storyline();
  var t2 = this.this_9.get$_player();
  t1.add$3$object$subject('<subject> now lock on to <object>', this.box_2.enemy_3, t2);
  t2 = this.box_2.enemy_3;
  this.this_9.get$_player().set$target(t2);
 }
};

$$.Closure17 = {"":
 ["this_10"],
 super: "Closure102",
 $call$1: function(move) {
  var t1 = ({});
  t1.move_5 = move;
  $.add$1(this.this_10.get$playerChoices(), $.Choice$4($.capitalize($.getString($.S(t1.move_5.get$choiceString()) + ' (' + $.S(t1.move_5.computeSuitability$2(this.this_10.get$_player(), this.this_10.get$_player().get$target())) + ') (' + $.S(t1.move_5.computeChanceToHit$2(this.this_10.get$_player(), this.this_10.get$_player().get$target())) + ')', this.this_10.get$_player(), this.this_10.get$_player().get$target())), (void 0), new $.Closure22(t1, this.this_10), true));
 }
};

$$.Closure22 = {"":
 ["box_4", "this_11"],
 super: "Closure102",
 $call$0: function() {
  var t1 = this.box_4.move_5;
  this.this_11.get$_player().set$currentMove(t1);
 }
};

$$.Closure18 = {"":
 ["this_12"],
 super: "Closure102",
 $call$1: function(a) {
  return a.get$alive() === true && !$.eqB(a, this.this_12.get$_player().get$target()) && !$.eqB(a.get$team(), this.this_12.get$_player().get$team());
 }
};

$$.Closure19 = {"":
 ["this_13"],
 super: "Closure102",
 $call$0: function() {
  this.this_13.get$_player().set$target((void 0));
  var t1 = this.this_13;
  t1.set$time($.sub(t1.get$time(), 1));
 }
};

$$.Closure20 = {"":
 ["this_0"],
 super: "Closure102",
 $call$1: function(m) {
  return m.isApplicable$2(this.this_0, this.this_0.get$target());
 }
};

$$.Closure21 = {"":
 ["this_1"],
 super: "Closure102",
 $call$2: function(a, b) {
  return $.sub(b.computeSuitability$2(this.this_1, this.this_1.get$target()), a.computeSuitability$2(this.this_1, this.this_1.get$target()));
 }
};

$$.Closure25 = {"":
 ["this_0"],
 super: "Closure102",
 $call$1: function(o) {
  return !$.eqB(o.get$team(), this.this_0.get$team()) && o.get$alive() === true;
 }
};

$$.Closure26 = {"":
 ["this_1"],
 super: "Closure102",
 $call$1: function(m) {
  return m.isApplicable$2(this.this_1, this.this_1.get$target());
 }
};

$$.Closure27 = {"":
 ["this_0"],
 super: "Closure102",
 $call$1: function(a) {
  a.set$combat(this.this_0);
  a.get$isPlayer() === true && this.this_0.set$_player(a);
 }
};

$$.Closure28 = {"":
 ["box_0"],
 super: "Closure102",
 $call$0: function() {
  return this.box_0.closure_1.$call$0();
 }
};

$$.Closure29 = {"":
 ["box_0"],
 super: "Closure102",
 $call$0: function() {
  return this.box_0.closure_1.$call$1(this.box_0.arg1_2);
 }
};

$$.Closure30 = {"":
 ["box_0"],
 super: "Closure102",
 $call$0: function() {
  return this.box_0.closure_1.$call$2(this.box_0.arg1_2, this.box_0.arg2_3);
 }
};

$$.Closure31 = {"":
 [],
 super: "Closure102",
 $call$1: function(a) {
  $.propertyTypeCheck(a, 'is$Actor');
  if ($.eqB($.mod(a.get$combat().get$time(), 12), 6)) {
    $.randomly([true, false]) === true && a.report$2$negative('blood is dripping into <subject\'s> eyes', true);
  }
 }
};

$$.Closure32 = {"":
 ["this_0"],
 super: "Closure102",
 $call$1: function(value) {
  this.this_0.add$1(value);
 }
};

$$.Closure33 = {"":
 ["box_0"],
 super: "Closure102",
 $call$2: function(key, value) {
  this.box_0.f_12.$call$1(key);
 }
};

$$.Closure34 = {"":
 ["box_0"],
 super: "Closure102",
 $call$2: function(key, value) {
  this.box_0.f_13.$call$1(key) === true && $.add$1(this.box_0.result_2, key);
 }
};

$$.Closure35 = {"":
 ["keys_0"],
 super: "Closure102",
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
};

$$.Closure36 = {"":
 ["box_0"],
 super: "Closure102",
 $call$2: function(key, value) {
  var t1 = this.box_0.list_1;
  var t2 = this.box_0.i_2;
  var i = $.intTypeCheck($.add(t2, 1));
  this.box_0.i_2 = i;
  $.indexSet(t1, t2, key);
 }
};

$$.Closure37 = {"":
 ["box_0"],
 super: "Closure102",
 $call$1: function(entry) {
  $.propertyTypeCheck(entry, 'is$KeyValuePair');
  var t1 = this.box_0.list_12;
  var t2 = this.box_0.index_2;
  var index = $.intTypeCheck($.add(t2, 1));
  this.box_0.index_2 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
};

$$.Closure41 = {"":
 ["this_3", "box_0"],
 super: "Closure102",
 $call$1: function(choice) {
  if ($.eqB($.hashCode(choice), this.box_0.incomingMessage_1.get$intContent())) {
    $.DEBUG_SCR('Found choice that was selected: ' + $.S(choice.get$string()));
    if (!$.eqNullB(choice.get$$goto())) {
      var t1 = choice.get$$goto();
      this.this_3.set$nextPage(t1);
    }
    if (!$.eqNullB(choice.get$f())) {
      var message = $.propertyTypeCheck(this.this_3.runScriptBlock$1$script(choice.get$f()), 'is$Message');
      this.box_0.message_2 = message;
    }
  }
 }
};

$$.Closure42 = {"":
 [],
 super: "Closure102",
 $call$1: function(choice) {
  return choice.get$shown() !== true;
 }
};

$$.Closure43 = {"":
 [],
 super: "Closure102",
 $call$1: function(choice) {
  return choice.get$waitForEndOfPage() !== true && choice.get$shown() !== true;
 }
};

$$.Closure44 = {"":
 [],
 super: "Closure102",
 $call$1: function(choice) {
  return choice.get$shown() !== true;
 }
};

$$.Closure45 = {"":
 ["this_0"],
 super: "Closure102",
 $call$1: function(choice) {
  $.add$1(this.this_0.get$listContent(), $.makeLiteralMap(['string', choice.get$string(), 'hash', $.hashCode(choice)]));
  choice.set$shown(true);
 }
};

$$.Closure46 = {"":
 [],
 super: "Closure102",
 $call$1: function(choice) {
  $.propertyTypeCheck(choice, 'is$Choice');
  return choice.get$shown() !== true;
 }
};

$$.Closure47 = {"":
 [],
 super: "Closure102",
 $call$1: function(choice) {
  return choice.get$waitForEndOfPage() !== true;
 }
};

$$.Closure48 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  return $.geB(performer.get$stance(), 20) && $.geB(target.get$stance(), 20);
 }
};

$$.Closure49 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  return $.geB(performer.get$stance(), 20) && $.geB(target.get$stance(), 10);
 }
};

$$.Closure50 = {"":
 [],
 super: "Closure102",
 $call$2: function(_this, e) {
  e.get$performer().report$2$wholeSentence('{Boom|Thump}!', true);
 }
};

$$.Closure51 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  return $.geB(performer.get$stance(), 20) && $.geB(target.get$stance(), 10);
 }
};

$$.Closure52 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  return $.geB(performer.get$stance(), 10) && $.geB(target.get$stance(), 20);
 }
};

$$.Closure53 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  return $.geB(performer.get$stance(), 30) && $.geB(target.get$stance(), 20);
 }
};

$$.Closure54 = {"":
 [],
 super: "Closure102",
 $call$2: function(_this, e) {
  if (!$.eqNullB(e.get$target().get$currentMove())) {
    $.index(e.get$target().get$currentMove().get$on(), 'cancel').dispatchAll$1($.CombatEvent$fromMove$1(e.get$target().get$currentMove()));
    e.get$target().set$currentMove((void 0));
  }
 }
};

$$.Closure55 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  return $.geB(performer.get$stance(), 10) && $.geB(target.get$stance(), 20);
 }
};

$$.Closure56 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  return $.geB(performer.get$stance(), 20) && $.ltB(target.get$stance(), 20);
 }
};

$$.Closure57 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  return $.ge(performer.get$stance(), 20);
 }
};

$$.Closure58 = {"":
 [],
 super: "Closure102",
 $call$2: function(_this, e) {
  e.get$performer().report$1(_this.get$thirdPartyString());
 }
};

$$.Closure59 = {"":
 [],
 super: "Closure102",
 $call$2: function(_this, e) {
  var t1 = e.get$performer();
  t1.set$stance($.add(t1.get$stance(), 10));
 }
};

$$.Closure60 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  return $.geB(performer.get$stance(), 10) && !$.eqNullB(target.get$currentMove()) && $.gtB(target.get$tillEndOfMove(), 3) && target.get$currentMove().get$type().get$isOffensive() === true && $.eqB(target.get$target(), performer) && target.get$currentMove().get$type().hasFlag$1(2048) === true;
 }
};

$$.Closure61 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  return $.geB(performer.get$stance(), 10) && !$.eqNullB(target.get$currentMove());
 }
};

$$.Closure62 = {"":
 [],
 super: "Closure102",
 $call$2: function(_this, e) {
  var chanceToParry = $.doubleTypeCheck($.sub(1, e.get$target().get$currentMove().get$type().computeChanceToHit$2(e.get$target(), e.get$performer())));
  if ($.ltB($.random(), chanceToParry)) {
    e.get$performer().report$3$object$wholeSentence('<subject> {stop<s>|intercept<s>} <object\'s> ' + $.S(e.get$target().get$currentMove().get$type().get$string()) + ' which gives ' + $.S(e.get$performer().get$pronoun().get$accusative()) + ' a chance to counter-attack.', e.get$target(), true);
    e.get$target().set$currentMove((void 0));
    e.get$target().set$tillEndOfMove(4);
  } else e.get$performer().report$3$negative$object('<subject\'s> {try|attempt} to parry <object\'s> ' + $.S(e.get$target().get$currentMove().get$type().get$string()) + ' {fails|is unsuccessful|doesn\'t work out}', true, e.get$target());
 }
};

$$.Closure63 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  return 100;
 }
};

$$.Closure64 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  return $.lt(performer.get$stance(), 20);
 }
};

$$.Closure65 = {"":
 [],
 super: "Closure102",
 $call$2: function(_this, e) {
  if ($.leB(e.get$performer().get$tillEndOfMove(), $.toInt($.div(_this.get$duration(), 2)))) {
    var t1 = e.get$performer();
    t1.set$stance($.add(t1.get$stance(), 4));
  }
 }
};

$$.Closure66 = {"":
 [],
 super: "Closure102",
 $call$2: function(_this, e) {
  var again = $.eqB(e.get$performer().get$previousMove(), _this) ? ' again' : '';
  e.get$performer().report$1('<subject> {gather<s>|begin<s>|tr<ies>} to stand up' + again);
 }
};

$$.Closure67 = {"":
 [],
 super: "Closure102",
 $call$2: function(_this, e) {
  var t1 = e.get$performer();
  t1.set$stance($.add(t1.get$stance(), 10));
 }
};

$$.Closure68 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  return 100;
 }
};

$$.Closure69 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  return $.lt(performer.get$stance(), 10);
 }
};

$$.Closure70 = {"":
 [],
 super: "Closure102",
 $call$2: function(_this, e) {
  e.get$performer().report$2$positive('<subject> {{end<s>|finish<es>} <subject\'s> roll|roll<s> a bit out of the way}', true);
  if (!$.eqNullB(e.get$target().get$currentMove()) && $.geB($.sub(e.get$target().get$currentMove().get$type().get$duration(), e.get$target().get$tillEndOfMove()), 3)) {
    $.index(e.get$target().get$currentMove().get$on(), 'cancel').dispatchAll$1($.CombatEvent$fromMove$1(e.get$target().get$currentMove()));
    e.get$target().set$currentMove((void 0));
  }
  var t1 = e.get$performer();
  t1.set$stance($.add(t1.get$stance(), 10));
 }
};

$$.Closure71 = {"":
 [],
 super: "Closure102",
 $call$2: function(performer, target) {
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  return 100;
 }
};

$$.Closure72 = {"":
 ["this_0"],
 super: "Closure102",
 $call$2: function(performer, target) {
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  return $.defaultIsApplicable(this.this_0, performer, target);
 }
};

$$.Closure73 = {"":
 ["this_1"],
 super: "Closure102",
 $call$2: function(performer, target) {
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  return $.defaultCanContinue(this.this_1, performer, target);
 }
};

$$.Closure74 = {"":
 ["this_2"],
 super: "Closure102",
 $call$2: function(performer, target) {
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  return $.defaultChanceToDodge(this.this_2, performer, target);
 }
};

$$.Closure75 = {"":
 ["this_3"],
 super: "Closure102",
 $call$2: function(performer, target) {
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  return $.defaultChanceToBlock(this.this_3, performer, target);
 }
};

$$.Closure76 = {"":
 ["this_4"],
 super: "Closure102",
 $call$2: function(performer, target) {
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  return $.defaultComputeSuitability(this.this_4, performer, target);
 }
};

$$.Closure77 = {"":
 ["box_0"],
 super: "Closure102",
 $call$2: function(msg, replyPort) {
  $.propertyTypeCheck(replyPort, 'is$SendPort');
  this.box_0.port_2.close$0();
  $.assert($.eq(msg, 'spawned'));
  this.box_0.completer_1.complete$1(replyPort);
 }
};

$$.Closure78 = {"":
 ["this_0"],
 super: "Closure102",
 $call$1: function(p) {
  this.this_0.set$_port(p);
  for (var t1 = $.iterator(this.this_0.get$pending()); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    p.send$2($.index(t2, 'message'), $.index(t2, 'replyTo'));
  }
  this.this_0.set$pending((void 0));
 }
};

$$.Closure79 = {"":
 ["box_0"],
 super: "Closure102",
 $call$0: function() {
  $._startIsolate2($._getJSFunctionFromName(this.box_0.functionName_1), this.box_0.replyPort_2);
 }
};

$$.Closure80 = {"":
 ["this_6", "box_3"],
 super: "Closure102",
 $call$0: function() {
  var t1 = ({});
  $.checkReplyTo(this.box_3.replyTo_5);
  var isolate = $.index($._globalState().get$isolates(), this.this_6.get$_isolateId());
  if ($.eqNullB(isolate)) return;
  if ($.eqNullB(this.this_6.get$_lib3_receivePort().get$_callback())) return;
  var shouldSerialize = !$.eqNullB($._globalState().get$currentContext()) && !$.eqB($._globalState().get$currentContext().get$id(), this.this_6.get$_isolateId());
  t1.msg_1 = this.box_3.message_4;
  t1.reply_2 = this.box_3.replyTo_5;
  if (shouldSerialize) {
    t1.msg_1 = $._serializeMessage(t1.msg_1);
    t1.reply_2 = $._serializeMessage(t1.reply_2);
  }
  $._globalState().get$topEventLoop().enqueue$3(isolate, new $.Closure89(this.this_6, t1, shouldSerialize), $.add('receive ', this.box_3.message_4));
 }
};

$$.Closure89 = {"":
 ["this_8", "box_0", "shouldSerialize_7"],
 super: "Closure102",
 $call$0: function() {
  if (!$.eqNullB(this.this_8.get$_lib3_receivePort().get$_callback())) {
    if (this.shouldSerialize_7 === true) {
      var msg = $._deserializeMessage(this.box_0.msg_1);
      this.box_0.msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0.reply_2);
      this.box_0.reply_2 = reply;
    }
    this.this_8.get$_lib3_receivePort()._callback$2(this.box_0.msg_1, this.box_0.reply_2);
  }
 }
};

$$.Closure81 = {"":
 ["box_0"],
 super: "Closure102",
 $call$1: function(_) {
  return this.box_0.callback_1.$call$0();
 }
};

$$.Closure82 = {"":
 ["box_0", "box_2"],
 super: "Closure102",
 $call$1: function(value) {
  $.indexSet(this.box_2.values_6, this.box_0.pos_1, value);
  var remaining = $.intTypeCheck($.sub(this.box_2.remaining_5, 1));
  this.box_2.remaining_5 = remaining;
  $.eqB(remaining, 0) && this.box_2.result_4.get$isComplete() !== true && this.box_2.completer_3.complete$1(this.box_2.values_6);
 }
};

$$.Closure83 = {"":
 ["box_2"],
 super: "Closure102",
 $call$1: function(exception) {
  this.box_2.result_4.get$isComplete() !== true && this.box_2.completer_3.completeException$1(exception);
  return true;
 }
};

$$.Closure84 = {"":
 ["this_0"],
 super: "Closure102",
 $call$1: function(e) {
  return this.this_0._dispatch$1(e);
 }
};

$$.Closure85 = {"":
 ["values_0"],
 super: "Closure102",
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
};

$$.Closure86 = {"":
 ["box_0"],
 super: "Closure102",
 $call$2: function(key, value) {
  var t1 = this.box_0.list_13;
  var t2 = this.box_0.i_22;
  var i = $.intTypeCheck($.add(t2, 1));
  this.box_0.i_22 = i;
  $.indexSet(t1, t2, value);
 }
};

$$.Closure87 = {"":
 ["box_0"],
 super: "Closure102",
 $call$1: function(entry) {
  $.propertyTypeCheck(entry, 'is$KeyValuePair');
  var t1 = this.box_0.list_14;
  var t2 = this.box_0.index_22;
  var index = $.intTypeCheck($.add(t2, 1));
  this.box_0.index_22 = index;
  $.indexSet(t1, t2, entry.get$value());
 }
};

$$.Closure88 = {"":
 ["this_0"],
 super: "Closure102",
 $call$1: function(e) {
  return this.this_0._dispatch$1(e);
 }
};

$$.Closure90 = {"":
 ["this_2", "box_0"],
 super: "Closure102",
 $call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
 }
};

$$.Closure91 = {"":
 ["this_3", "box_0"],
 super: "Closure102",
 $call$0: function() {
  $.checkReplyTo(this.box_0.replyTo_2);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_3, 'msg', this.box_0.message_1, 'replyTo', this.box_0.replyTo_2]));
  if ($._globalState().get$isWorker() === true) $._globalState().get$mainManager().postMessage$1(workerMessage);
  else $.index($._globalState().get$managers(), this.this_3.get$_workerId()).postMessage$1(workerMessage);
 }
};

$$.Closure92 = {"":
 ["worker_0"],
 super: "Closure102",
 $call$1: function(e) {
  $._processWorkerMessage(this.worker_0, e);
 }
};

$$.Closure93 = {"":
 ["box_0"],
 super: "Closure102",
 $call$0: function() {
  var replyTo = $._deserializeMessage(this.box_0.serializedReplyTo_2);
  $._startIsolate(this.box_0.runnerObject_1, replyTo);
 }
};

$$.Closure94 = {"":
 ["box_0"],
 super: "Closure102",
 $call$0: function() {
  $._startIsolate2(this.box_0.entryPoint_3, this.box_0.replyTo_4);
 }
};

$$.Closure95 = {"":
 ["worker_0"],
 super: "Closure102",
 $call$1: function(e) {
  $._processWorkerMessage(this.worker_0, e);
 }
};

$$.Closure96 = {"":
 ["this_2", "box_0"],
 super: "Closure102",
 $call$1: function(ev) {
  $.callTypeCheck(ev, 'is$Event');
  this.this_2.get$_scripterPort().send$2($.Message$OptionSelected$1(this.box_0.hash_1).toJson$0(), this.this_2.get$_receivePort().toSendPort$0());
  $.clear(this.this_2.get$choicesOl().get$elements());
 }
};

$$.Closure97 = {"":
 ["box_0", "output_2"],
 super: "Closure102",
 $call$1: function(element) {
  $.callTypeCheck(element, 'is$Element');
  this.box_0.f_14.$call$1(element) === true && $.add$1(this.output_2, element);
 }
};

$$.Closure98 = {"":
 [],
 super: "Closure102",
 $call$1: function(n) {
  return typeof n === 'object' && n.is$Element();
 }
};

$$.Closure99 = {"":
 [],
 super: "Closure102",
 $call$1: function(el) {
  return el.remove$0();
 }
};

$$.Closure100 = {"":
 ["this_0"],
 super: "Closure102",
 $call$0: function() {
  if (this.this_0.runIteration$0() !== true) return;
  $._window().setTimeout$2(this, 0);
 }
};

Isolate.$defineClass('Closure101', 'Closure102', ['self', 'target'], {
$call$0: function() { return this.self[this.target](); }
});
Isolate.$defineClass('Closure103', 'Closure102', ['self', 'target'], {
$call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
});
Isolate.$defineClass('Closure104', 'Closure102', ['self', 'target'], {
$call$1: function(p0) { return this.self[this.target](p0); }
});
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a * b;
  }
  return a.operator$mul$1(b);
};

$.defaultOnAlmostDying = function(_this) {
  $.propertyTypeCheck(_this, 'is$Actor');
  $.add$1($.index(_this.get$on(), 'update'), new $.Closure31());
  _this.report$2$negative('<subject> <is> badly hurt', true);
};

$._AudioContextEventsImpl$1 = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.defaultOnSufferPierced = function(_this, e) {
  $.propertyTypeCheck(_this, 'is$WeaponType');
  $.propertyTypeCheck(e, 'is$CombatEvent');
  $.DEBUG('Suffer Pierced: ' + $.S(_this.get$barehanded()));
  if (_this.get$barehanded() === true) {
    if (e.get$weapon().get$blunt() === true) {
      e.get$performer().report$3$object$positive('<subject\'s> ' + $.S(e.get$weapon().get$name()) + ' breaks <object\'s> ' + $.S(_this.get$name()), e.get$target(), true);
      e.get$target().report$2$negative('<subject> scream<s> in pain', true);
      var t1 = $.max(1, $.sub(e.get$target().get$hitpoints(), 10));
      e.get$target().set$hitpoints(t1);
    } else {
      if (e.get$weapon().get$sharp() === true) {
        e.get$performer().report$3$object$positive('<subject\'s> ' + $.S(e.get$weapon().get$name()) + ' goes right through <object\'s> ' + $.S(_this.get$name()), e.get$target(), true);
        e.get$target().report$2$negative('<subject> scream<s> in pain', true);
        t1 = $.max(1, $.sub(e.get$target().get$hitpoints(), 10));
        e.get$target().set$hitpoints(t1);
      } else throw $.captureStackTrace($.ExceptionImplementation$1('Weapon is not blunt nor sharp, but still is piercing barehands?'));
    }
  } else e.get$target().report$2$negative('<subject\'s> ' + $.S(_this.get$name()) + ' breaks', true);
};

$.intTypeCheck = function(value) {
  if (value === (void 0)) return value;
  if (typeof value === 'number' && value === (value | 0)) {
    return value;
  }
  throw $.captureStackTrace($.TypeError$1($.S(value) + ' does not implement int'));
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.floor$0();
  return Math.floor(receiver);
};

$._window = function() {
  return typeof window != 'undefined' ? window : (void 0);;
};

$.eqB = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b) === true;
    return a === b;
  }
  return a === b;
};

$._containsRef = function(c, ref) {
  $.listSuperNativeTypeCheck(c, 'is$Collection');
  for (var t1 = $.iterator(c); t1.hasNext$0() === true; ) {
    if (t1.next$0() === ref) return true;
  }
  return false;
};

$._ChildNodeListLazy$1 = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$0();
  $._globalState2(t1);
  if ($._globalState().get$isWorker() === true) return;
  var rootContext = $._IsolateContext$0();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$._NodeListWrapper$1 = function(list) {
  $.listTypeCheck(list);
  return new $._NodeListWrapper(list);
};

$.defaultOnCancel = function(_this, e) {
  $.propertyTypeCheck(_this, 'is$CombatMoveType');
  $.propertyTypeCheck(e, 'is$CombatEvent');
  e.get$performer().report$3$negative$object('{there\'s no way <subject> can ' + $.S(_this.get$choiceString()) + ' now|<subject> find<s> it impossible to ' + $.S(_this.get$choiceString()) + ' now}', true, e.get$target());
};

$.isJsArray = function(value) {
  return !(value === (void 0)) && (value.constructor === Array);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(index));
    if (index < 0 || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$._nextProbe = function(currentProbe, numberOfProbes, length$) {
  $.intTypeCheck(currentProbe);
  $.intTypeCheck(numberOfProbes);
  $.intTypeCheck(length$);
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$._parseIntOrZero = function(val) {
  $.stringTypeCheck(val);
  if (!(val === (void 0)) && !$.eqB(val, '')) return $.parseInt(val);
  return 0;
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.some = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.some$1(f);
  return $.some2(receiver, f);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.capitalize = function(str) {
  $.stringTypeCheck(str);
  var firstLetter = $.stringTypeCheck($.toUpperCase($.index(str, 0)));
  if ($.eqB($.get$length(str), 1)) return firstLetter;
  return $.S(firstLetter) + $.S($.substring$1(str, 1));
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length;
  }
  return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a >= b;
  }
  return a.operator$ge$1(b);
};

$.checkReplyTo = function(replyTo) {
  $.propertyTypeCheck(replyTo, 'is$SendPort');
  if (!(replyTo === (void 0)) && !((typeof replyTo === 'object') && !!replyTo.is$_NativeJsSendPort) && !((typeof replyTo === 'object') && !!replyTo.is$_WorkerSendPort) && !((typeof replyTo === 'object') && !!replyTo.is$_BufferingSendPort)) throw $.captureStackTrace($.ExceptionImplementation$1('SendPort.send: Illegal replyTo port type'));
};

$.defaultOnSufferDodge = function(_this, e) {
  $.propertyTypeCheck(_this, 'is$CombatMoveType');
  $.propertyTypeCheck(e, 'is$CombatEvent');
  e.get$target().report$3$object$positive('<subject> dodge<s> <object\'s> ' + $.S(_this.get$string()) + ' (' + $.S(e.get$chance()) + ')', e.get$performer(), true);
};

$.IllegalJSRegExpException$2 = function(_pattern, _errmsg) {
  $.stringTypeCheck(_pattern);
  $.stringTypeCheck(_errmsg);
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.FutureImpl$immediate = function(value) {
  var res = $.FutureImpl$0();
  res._setValue$1(value);
  return res;
};

$.some2 = function(iterable, f) {
  $.listSuperNativeTypeCheck(iterable, 'is$Iterable');
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    if (f.$call$1(t1.next$0()) === true) return true;
  }
  return false;
};

$._IDBOpenDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object')) return name$;
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.defaultOnSufferMeetWeapon = function(_this, e) {
  $.propertyTypeCheck(_this, 'is$CombatMoveType');
  $.propertyTypeCheck(e, 'is$CombatEvent');
  e.get$target().report$3$object$positive('<subject> meet<s> <object\'s> move with <subject\'s> ' + $.S(e.get$target().get$weapon().get$name()) + ' (' + $.S(e.get$chance()) + ')', e.get$performer(), true);
};

$.NullPointerException$2 = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$.Player$0 = function() {
  var t1 = new $.Player(0, 0, 45, 10, (void 0), (void 0), (void 0), false, 0, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), 2, false, true, $.CTC7, (void 0));
  t1.GameEntity$0();
  t1.Actor$0();
  t1.Player$0();
  return t1;
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._Serializer$0().traverse$1(message);
  return $._Copier$0().traverse$1(message);
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.max = function(a, b) {
  $.numTypeCheck(a);
  $.numTypeCheck(b);
  return $.ltB($.compareTo(a, b), 0) ? b : a;
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return $.truncate((a) / (b));
  }
  return a.operator$tdiv$1(b);
};

$.JSSyntaxRegExp$_globalVersionOf$1 = function(other) {
  $.propertyTypeCheck(other, 'is$JSSyntaxRegExp');
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$._startNonWorker2 = function(functionName, uri, replyPort) {
  $.stringTypeCheck(functionName);
  $.stringTypeCheck(uri);
  $.propertyTypeCheck(replyPort, 'is$SendPort');
  var t1 = ({});
  t1.functionName_1 = functionName;
  t1.replyPort_2 = replyPort;
  if (!$.eqNullB(uri)) throw $.captureStackTrace($.UnsupportedOperationException$1('Currently spawnUri is not supported without web workers.'));
  $._globalState().get$topEventLoop().enqueue$3($._IsolateContext$0(), new $.Closure79(t1), 'nonworker start');
};

$.replaceFirst = function(receiver, from, to) {
  if (!(typeof receiver === 'string')) return receiver.replaceFirst$2(from, to);
  $.checkString(to);
  return $.stringReplaceFirstUnchecked(receiver, from, to);
};

$.printString = function(string) {
  $.stringTypeCheck(string);
  if (typeof console == "object") console.log(string);
  else {
    write(string);
    write("\n");
  }
};

$.JSSyntaxRegExp$3 = function(pattern, multiLine, ignoreCase) {
  $.stringTypeCheck(pattern);
  $.boolTypeCheck(multiLine);
  $.boolTypeCheck(ignoreCase);
  return new $.JSSyntaxRegExp(ignoreCase, multiLine, pattern);
};

$.defaultOnSufferDeflect = function(_this, e) {
  $.propertyTypeCheck(_this, 'is$CombatMoveType');
  $.propertyTypeCheck(e, 'is$CombatEvent');
  e.get$performer().report$3$object$positive('<subject> hit<s> (' + $.S(e.get$chanceAll()) + ')', e.get$target(), true);
  e.get$performer().report$3$negative$object('<subject\'s> ' + $.S(e.get$weapon().get$name()) + ' bounces off <object\'s> ' + $.S(e.get$armor().get$name()), true, e.get$target());
  var t1 = e.get$target();
  t1.set$stance($.sub(t1.get$stance(), _this.get$stanceDamage()));
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._Deserializer$0().deserialize$1(message);
  return message;
};

$.stringReplaceFirstUnchecked = function(receiver, from, to) {
  if (typeof from === 'string') {
    return $.stringReplaceJS(receiver, from, to);
  }
  if (typeof from === 'object' && !!from.is$JSSyntaxRegExp) {
    return $.stringReplaceJS(receiver, $.regExpGetNative(from), to);
  }
  $.checkNull(from);
  throw $.captureStackTrace('StringImplementation.replace(Pattern) UNIMPLEMENTED');
};

$.typeNameInIE = function(obj) {
  var name$ = $.stringTypeCheck($.constructorNameFallback(obj));
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'MSStyleCSSProperties')) return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'CanvasPixelArray')) return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLPhraseElement')) return 'HTMLElement';
  return name$;
};

$.Message$TextResult$1 = function(str) {
  $.stringTypeCheck(str);
  var t1 = new $.Message((void 0), (void 0), (void 0), 4);
  t1.Message$TextResult$1(str);
  return t1;
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') return 'DOMWindow';
  if (name$ === 'CanvasPixelArray') return 'Uint8ClampedArray';
  return name$;
};

$.NotImplementedException$1 = function(message) {
  $.stringTypeCheck(message);
  return new $.NotImplementedException(message);
};

$.defaultIsApplicable = function(_this, performer, target) {
  $.propertyTypeCheck(_this, 'is$CombatMoveType');
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  return true;
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var a = (a);
    var b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$1(b));
    if (a > 0) {
      if (b > 31) return 0;
      return a >>> b;
    }
    if (b > 31) b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.stringReplaceAllUnchecked = function(receiver, from, to) {
  if (typeof receiver !== 'string') return $.stringReplaceAllUnchecked$bailout(receiver, from, to, 1, receiver, 0, 0);
  if (typeof from === 'string') {
    if (from === '') {
      if (receiver === '') return to;
      var result = $.propertyTypeCheck($.StringBufferImpl$1(''), 'is$StringBuffer');
      var length$ = receiver.length;
      result.add$1(to);
      for (var i = 0; $.ltB(i, length$); i = $.intTypeCheck($.add(i, 1))) {
        if (i !== (i | 0)) throw $.iae(i);
        var t1 = receiver.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        result.add$1(receiver[i]);
        result.add$1(to);
      }
      return result.toString$0();
    }
    return $.stringReplaceJS(receiver, $.regExpMakeNative($.propertyTypeCheck($.JSSyntaxRegExp$3((from.replace($.regExpMakeNative($.propertyTypeCheck($.CTC9, 'is$RegExp'), true), "\\$&")), false, false), 'is$RegExp'), true), to);
  }
  if (typeof from === 'object' && !!from.is$JSSyntaxRegExp) {
    return $.stringReplaceJS(receiver, $.regExpMakeNative(from, true), to);
  }
  $.checkNull(from);
  throw $.captureStackTrace('StringImplementation.replaceAll(Pattern) UNIMPLEMENTED');
};

$.eqNull = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1((void 0));
    return false;
  }
  return typeof a === "undefined";
};

$._dualPivotQuicksort = function(a, left, right, compare) {
  if (typeof a !== 'object'||a.constructor !== Array||!!a.immutable$list) return $._dualPivotQuicksort$bailout(a, left, right, compare, 1, a, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  $.intTypeCheck(left);
  $.intTypeCheck(right);
  $.assert($.gt($.sub(right, left), 32));
  var sixth = $.intTypeCheck($.tdiv($.add($.sub(right, left), 1), 6));
  var index1 = $.intTypeCheck($.add(left, sixth));
  var index5 = $.intTypeCheck($.sub(right, sixth));
  var index3 = $.intTypeCheck($.tdiv($.add(left, right), 2));
  var index2 = $.intTypeCheck($.sub(index3, sixth));
  var index4 = $.intTypeCheck($.add(index3, sixth));
  if (index1 !== (index1 | 0)) throw $.iae(index1);
  var t1 = a.length;
  if (index1 < 0 || index1 >= t1) throw $.ioore(index1);
  var el2 = a[index1];
  if (index2 !== (index2 | 0)) throw $.iae(index2);
  var t2 = a.length;
  if (index2 < 0 || index2 >= t2) throw $.ioore(index2);
  var el20 = a[index2];
  if (index3 !== (index3 | 0)) throw $.iae(index3);
  var t3 = a.length;
  if (index3 < 0 || index3 >= t3) throw $.ioore(index3);
  var el1 = a[index3];
  if (index4 !== (index4 | 0)) throw $.iae(index4);
  var t4 = a.length;
  if (index4 < 0 || index4 >= t4) throw $.ioore(index4);
  var el4 = a[index4];
  if (index5 !== (index5 | 0)) throw $.iae(index5);
  var t5 = a.length;
  if (index5 < 0 || index5 >= t5) throw $.ioore(index5);
  var el40 = a[index5];
  if ($.gtB(compare.$call$2(el2, el20), 0)) var el10 = el20;
  else {
    el10 = el2;
    el2 = el20;
  }
  if ($.gtB(compare.$call$2(el4, el40), 0)) {
    var el5 = el4;
    el4 = el40;
  } else el5 = el40;
  if ($.gtB(compare.$call$2(el10, el1), 0)) var el3 = el10;
  else {
    el3 = el1;
    el1 = el10;
  }
  if ($.gtB(compare.$call$2(el2, el3), 0)) {
    var t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.$call$2(el1, el4), 0)) {
    t0 = el1;
    el1 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.$call$2(el3, el4), 0)) {
    t0 = el3;
    el3 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.$call$2(el2, el5), 0)) {
    t0 = el5;
    el5 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.$call$2(el2, el3), 0)) {
    t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.$call$2(el4, el5), 0)) {
    t0 = el5;
    el5 = el4;
    el4 = t0;
  }
  t1 = a.length;
  if (index1 < 0 || index1 >= t1) throw $.ioore(index1);
  a[index1] = el1;
  t2 = a.length;
  if (index3 < 0 || index3 >= t2) throw $.ioore(index3);
  a[index3] = el3;
  t3 = a.length;
  if (index5 < 0 || index5 >= t3) throw $.ioore(index5);
  a[index5] = el5;
  if (left !== (left | 0)) throw $.iae(left);
  t4 = a.length;
  if (left < 0 || left >= t4) throw $.ioore(left);
  t5 = a[left];
  var t6 = a.length;
  if (index2 < 0 || index2 >= t6) throw $.ioore(index2);
  a[index2] = t5;
  if (right !== (right | 0)) throw $.iae(right);
  t5 = a.length;
  if (right < 0 || right >= t5) throw $.ioore(right);
  var t7 = a[right];
  var t8 = a.length;
  if (index4 < 0 || index4 >= t8) throw $.ioore(index4);
  a[index4] = t7;
  var less = $.intTypeCheck($.add(left, 1));
  if (less !== (less | 0)) return $._dualPivotQuicksort$bailout(a, left, right, compare, 2, el2, a, index1, el4, index5, less, 0, 0, 0, 0, 0);
  var great = $.intTypeCheck($.sub(right, 1));
  if (great !== (great | 0)) return $._dualPivotQuicksort$bailout(a, left, right, compare, 3, el2, a, less, index1, index5, el4, great, 0, 0, 0, 0);
  t1 = $.boolTypeCheck($.eq(compare.$call$2(el2, el4), 0)) === true;
  if (t1) {
    for (var k = less; $.leB(k, great); k = $.intTypeCheck($.add(k, 1))) {
      if (k !== (k | 0)) throw $.iae(k);
      t2 = a.length;
      if (k < 0 || k >= t2) throw $.ioore(k);
      t3 = a[k];
      var comp = $.intTypeCheck(compare.$call$2(t3, el2));
      if (comp !== (comp | 0)) return $._dualPivotQuicksort$bailout(a, left, right, compare, 4, index5, less, k, a, el4, t1, great, index1, t3, el2, comp);
      if (comp === 0) continue;
      if (comp < 0) {
        if (!$.eqB(k, less)) {
          if (less !== (less | 0)) throw $.iae(less);
          t2 = a.length;
          if (less < 0 || less >= t2) throw $.ioore(less);
          t4 = a[less];
          t5 = a.length;
          if (k < 0 || k >= t5) throw $.ioore(k);
          a[k] = t4;
          t4 = a.length;
          if (less < 0 || less >= t4) throw $.ioore(less);
          a[less] = t3;
        }
        less = $.intTypeCheck($.add(less, 1));
      } else {
        for (; true; ) {
          if (great !== (great | 0)) throw $.iae(great);
          t2 = a.length;
          if (great < 0 || great >= t2) throw $.ioore(great);
          comp = $.intTypeCheck(compare.$call$2(a[great], el2));
          if ($.gtB(comp, 0)) {
            great = $.intTypeCheck($.sub(great, 1));
            continue;
          } else {
            if ($.ltB(comp, 0)) {
              if (less !== (less | 0)) throw $.iae(less);
              t2 = a.length;
              if (less < 0 || less >= t2) throw $.ioore(less);
              t4 = a[less];
              t5 = a.length;
              if (k < 0 || k >= t5) throw $.ioore(k);
              a[k] = t4;
              var less0 = $.intTypeCheck($.add(less, 1));
              t4 = a.length;
              if (great < 0 || great >= t4) throw $.ioore(great);
              t6 = a[great];
              t7 = a.length;
              if (less < 0 || less >= t7) throw $.ioore(less);
              a[less] = t6;
              var great0 = $.intTypeCheck($.sub(great, 1));
              t6 = a.length;
              if (great < 0 || great >= t6) throw $.ioore(great);
              a[great] = t3;
              great = great0;
              less = less0;
              break;
            } else {
              t2 = a.length;
              if (great < 0 || great >= t2) throw $.ioore(great);
              t4 = a[great];
              t5 = a.length;
              if (k < 0 || k >= t5) throw $.ioore(k);
              a[k] = t4;
              great0 = $.intTypeCheck($.sub(great, 1));
              t4 = a.length;
              if (great < 0 || great >= t4) throw $.ioore(great);
              a[great] = t3;
              great = great0;
              break;
            }
          }
        }
      }
    }
  } else {
    for (k = less; $.leB(k, great); k = $.intTypeCheck($.add(k, 1))) {
      if (k !== (k | 0)) throw $.iae(k);
      t2 = a.length;
      if (k < 0 || k >= t2) throw $.ioore(k);
      t3 = a[k];
      if ($.ltB($.intTypeCheck(compare.$call$2(t3, el2)), 0)) {
        if (!$.eqB(k, less)) {
          if (less !== (less | 0)) throw $.iae(less);
          t2 = a.length;
          if (less < 0 || less >= t2) throw $.ioore(less);
          t4 = a[less];
          t5 = a.length;
          if (k < 0 || k >= t5) throw $.ioore(k);
          a[k] = t4;
          t4 = a.length;
          if (less < 0 || less >= t4) throw $.ioore(less);
          a[less] = t3;
        }
        less = $.intTypeCheck($.add(less, 1));
      } else {
        if ($.gtB($.intTypeCheck(compare.$call$2(t3, el4)), 0)) {
          for (; true; ) {
            if (great !== (great | 0)) throw $.iae(great);
            t2 = a.length;
            if (great < 0 || great >= t2) throw $.ioore(great);
            if ($.gtB($.intTypeCheck(compare.$call$2(a[great], el4)), 0)) {
              great = $.intTypeCheck($.sub(great, 1));
              if ($.ltB(great, k)) break;
              continue;
            } else {
              t2 = a.length;
              if (great < 0 || great >= t2) throw $.ioore(great);
              if ($.ltB($.intTypeCheck(compare.$call$2(a[great], el2)), 0)) {
                if (less !== (less | 0)) throw $.iae(less);
                t2 = a.length;
                if (less < 0 || less >= t2) throw $.ioore(less);
                t4 = a[less];
                t5 = a.length;
                if (k < 0 || k >= t5) throw $.ioore(k);
                a[k] = t4;
                less0 = $.intTypeCheck($.add(less, 1));
                t4 = a.length;
                if (great < 0 || great >= t4) throw $.ioore(great);
                t6 = a[great];
                t7 = a.length;
                if (less < 0 || less >= t7) throw $.ioore(less);
                a[less] = t6;
                great0 = $.intTypeCheck($.sub(great, 1));
                t6 = a.length;
                if (great < 0 || great >= t6) throw $.ioore(great);
                a[great] = t3;
                great = great0;
                less = less0;
              } else {
                t2 = a.length;
                if (great < 0 || great >= t2) throw $.ioore(great);
                t4 = a[great];
                t5 = a.length;
                if (k < 0 || k >= t5) throw $.ioore(k);
                a[k] = t4;
                great0 = $.intTypeCheck($.sub(great, 1));
                t4 = a.length;
                if (great < 0 || great >= t4) throw $.ioore(great);
                a[great] = t3;
                great = great0;
              }
              break;
            }
          }
        }
      }
    }
  }
  t2 = $.sub(less, 1);
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  t3 = a.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t2 = a[t2];
  t4 = a.length;
  if (left < 0 || left >= t4) throw $.ioore(left);
  a[left] = t2;
  t2 = $.sub(less, 1);
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  t5 = a.length;
  if (t2 < 0 || t2 >= t5) throw $.ioore(t2);
  a[t2] = el2;
  t2 = $.add(great, 1);
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  t6 = a.length;
  if (t2 < 0 || t2 >= t6) throw $.ioore(t2);
  t2 = a[t2];
  t7 = a.length;
  if (right < 0 || right >= t7) throw $.ioore(right);
  a[right] = t2;
  t2 = $.add(great, 1);
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  t8 = a.length;
  if (t2 < 0 || t2 >= t8) throw $.ioore(t2);
  a[t2] = el4;
  $._doSort(a, left, $.sub(less, 2), compare);
  $._doSort(a, $.add(great, 2), right, compare);
  if (t1) return;
  if ($.ltB(less, index1) && $.gtB(great, index5)) {
    while (true) {
      if (less !== (less | 0)) throw $.iae(less);
      t1 = a.length;
      if (less < 0 || less >= t1) throw $.ioore(less);
      if (!$.eqB(compare.$call$2(a[less], el2), 0)) break;
      less = $.intTypeCheck($.add(less, 1));
    }
    while (true) {
      if (great !== (great | 0)) throw $.iae(great);
      t1 = a.length;
      if (great < 0 || great >= t1) throw $.ioore(great);
      if (!$.eqB(compare.$call$2(a[great], el4), 0)) break;
      great = $.intTypeCheck($.sub(great, 1));
    }
    for (k = less; $.leB(k, great); k = $.intTypeCheck($.add(k, 1))) {
      if (k !== (k | 0)) throw $.iae(k);
      t1 = a.length;
      if (k < 0 || k >= t1) throw $.ioore(k);
      t2 = a[k];
      if ($.eqB($.intTypeCheck(compare.$call$2(t2, el2)), 0)) {
        if (!$.eqB(k, less)) {
          if (less !== (less | 0)) throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1) throw $.ioore(less);
          t3 = a[less];
          t4 = a.length;
          if (k < 0 || k >= t4) throw $.ioore(k);
          a[k] = t3;
          t3 = a.length;
          if (less < 0 || less >= t3) throw $.ioore(less);
          a[less] = t2;
        }
        less = $.intTypeCheck($.add(less, 1));
      } else {
        if ($.eqB($.intTypeCheck(compare.$call$2(t2, el4)), 0)) {
          for (; true; ) {
            if (great !== (great | 0)) throw $.iae(great);
            t1 = a.length;
            if (great < 0 || great >= t1) throw $.ioore(great);
            if ($.eqB($.intTypeCheck(compare.$call$2(a[great], el4)), 0)) {
              great = $.intTypeCheck($.sub(great, 1));
              if ($.ltB(great, k)) break;
              continue;
            } else {
              t1 = a.length;
              if (great < 0 || great >= t1) throw $.ioore(great);
              if ($.ltB($.intTypeCheck(compare.$call$2(a[great], el2)), 0)) {
                if (less !== (less | 0)) throw $.iae(less);
                t1 = a.length;
                if (less < 0 || less >= t1) throw $.ioore(less);
                t3 = a[less];
                t4 = a.length;
                if (k < 0 || k >= t4) throw $.ioore(k);
                a[k] = t3;
                less0 = $.intTypeCheck($.add(less, 1));
                t3 = a.length;
                if (great < 0 || great >= t3) throw $.ioore(great);
                t5 = a[great];
                t6 = a.length;
                if (less < 0 || less >= t6) throw $.ioore(less);
                a[less] = t5;
                great0 = $.intTypeCheck($.sub(great, 1));
                t5 = a.length;
                if (great < 0 || great >= t5) throw $.ioore(great);
                a[great] = t2;
                great = great0;
                less = less0;
              } else {
                t1 = a.length;
                if (great < 0 || great >= t1) throw $.ioore(great);
                t3 = a[great];
                t4 = a.length;
                if (k < 0 || k >= t4) throw $.ioore(k);
                a[k] = t3;
                great0 = $.intTypeCheck($.sub(great, 1));
                t3 = a.length;
                if (great < 0 || great >= t3) throw $.ioore(great);
                a[great] = t2;
                great = great0;
              }
              break;
            }
          }
        }
      }
    }
    $._doSort(a, less, great, compare);
  } else $._doSort(a, less, great, compare);
};

$.CombatMoveType$11 = function(string, choiceString, thirdPartyString, flags, duration, recovery, damage, stanceDamage, baseChanceToBlock, baseChanceToDodge, fightingMod) {
  var t1 = new $.CombatMoveType((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), flags, fightingMod, baseChanceToBlock, baseChanceToDodge, stanceDamage, damage, recovery, duration, thirdPartyString, choiceString, string, $.CTC7, (void 0));
  t1.GameEntity$0();
  t1.CombatMoveType$11(string, choiceString, thirdPartyString, flags, duration, recovery, damage, stanceDamage, baseChanceToBlock, baseChanceToDodge, fightingMod);
  return t1;
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a & b) >>> 0;
  }
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex === (void 0)) var endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  if ($.gtB(startIndex, endIndex)) throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  if ($.gtB(endIndex, length$)) throw $.captureStackTrace($.IndexOutOfRangeException$1(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$._DOMApplicationCacheEventsImpl$1 = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.StringMatch$3 = function(_start, str, pattern) {
  $.intTypeCheck(_start);
  $.stringTypeCheck(str);
  $.stringTypeCheck(pattern);
  return new $.StringMatch(pattern, str, _start);
};

$.ExceptionImplementation$1 = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  $.functionTypeCheck(closure);
  $.intTypeCheck(numberOfArguments);
  var t1 = ({});
  t1.arg2_3 = arg2;
  t1.arg1_2 = arg1;
  t1.closure_1 = closure;
  if ($.eqB(numberOfArguments, 0)) {
    return $._callInIsolate(isolate, new $.Closure28(t1));
  }
  if ($.eqB(numberOfArguments, 1)) {
    return $._callInIsolate(isolate, new $.Closure29(t1));
  }
  if ($.eqB(numberOfArguments, 2)) {
    return $._callInIsolate(isolate, new $.Closure30(t1));
  }
  throw $.captureStackTrace($.ExceptionImplementation$1('Unsupported number of arguments for wrapped closure'));
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b);
};

$.last = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.last$0();
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$.Message$EndOfBook$0 = function() {
  return new $.Message((void 0), (void 0), (void 0), 32);
};

$.String$fromCharCodes = function(charCodes) {
  $.listTypeCheck(charCodes);
  return $.createFromCharCodes(charCodes);
};

$.assert = function(condition) {
  if (typeof condition === 'function' || typeof condition === 'object' && !!condition.is$Function) {
    var condition = condition.$call$0();
  }
  if (condition !== true) throw $.captureStackTrace($.AssertionError$0());
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) return receiver.filter$1(predicate);
  return $.filter2(receiver, [], predicate);
};

$.filter2 = function(source, destination, f) {
  $.listSuperNativeTypeCheck(source, 'is$Iterable');
  $.listTypeCheck(destination);
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$._spawn2 = function(functionName, uri, isLight) {
  $.stringTypeCheck(functionName);
  $.stringTypeCheck(uri);
  $.boolTypeCheck(isLight);
  var t1 = ({});
  var completer = $.CompleterImpl$0();
  $.setRuntimeTypeInfo(completer, ({T: 'SendPort'}));
  t1.completer_1 = $.propertyTypeCheck(completer, 'is$Completer');
  t1.port_2 = $.propertyTypeCheck($.ReceivePort(), 'is$ReceivePort2');
  t1.port_2.receive$1(new $.Closure77(t1));
  var signalReply = $.propertyTypeCheck(t1.port_2.toSendPort$0(), 'is$SendPort');
  if ($._globalState().get$useWorkers() === true && isLight !== true) $._startWorker2(functionName, uri, signalReply);
  else $._startNonWorker2(functionName, uri, signalReply);
  return $._BufferingSendPort$2($._globalState().get$currentContext().get$id(), t1.completer_1.get$future());
};

$.Message$Continue$0 = function() {
  return new $.Message((void 0), (void 0), (void 0), 1);
};

$.buildDynamicMetadata = function(inputTable) {
  $.listTypeCheck(inputTable);
  var result = [];
  for (var i = 0; $.ltB(i, $.get$length(inputTable)); i = $.intTypeCheck($.add(i, 1))) {
    var tag = $.stringTypeCheck($.index($.index(inputTable, i), 0));
    var tags = $.stringTypeCheck($.index($.index(inputTable, i), 1));
    var set = $.HashSetImplementation$0();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    $.propertyTypeCheck(set, 'is$Set');
    var tagNames = $.listTypeCheck($.split(tags, '|'));
    for (var j = 0; $.ltB(j, $.get$length(tagNames)); j = $.intTypeCheck($.add(j, 1))) {
      set.add$1($.index(tagNames, j));
    }
    $.add$1(result, $.MetaInfo$3(tag, tags, set));
  }
  return result;
};

$.filter3 = function(source, destination, f) {
  $.listSuperNativeTypeCheck(source, 'is$Iterable');
  $.listTypeCheck(destination);
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$1 = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a * b) : $.mul$slow(a, b);
};

$.parseInt = function(str) {
  $.stringTypeCheck(str);
  return $.parseInt2(str);
};

$._NotificationEventsImpl$1 = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.parseInt2 = function(str) {
  $.checkString(str);
  if (!(/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))) throw $.captureStackTrace($.BadNumberFormatException$1(str));
  var trimmed = $.trim(str);
  if ($.gtB($.get$length(trimmed), 2)) {
    var t1 = $.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X');
  } else t1 = false;
  if (!t1) {
    if ($.gtB($.get$length(trimmed), 3)) {
      t1 = $.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X');
    } else t1 = false;
  } else t1 = true;
  var base = t1 ? 16 : 10;
  var ret = (parseInt(trimmed, base));
  if ($.isNaN(ret) === true) throw $.captureStackTrace($.BadNumberFormatException$1(str));
  return ret;
};

$.Choice$4 = function(string, goto$, then, showNow) {
  $.functionTypeCheck(then);
  $.boolTypeCheck(showNow);
  var t1 = new $.Choice(goto$, (void 0), string, (void 0), (void 0), false);
  t1.UserInteraction$0();
  t1.Choice$4(string, goto$, then, showNow);
  return t1;
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix === (void 0)) {
    if ($.isFirefox() === true) $._cachedBrowserPrefix = '-moz-';
    else $._cachedBrowserPrefix = '-webkit-';
  }
  return $._cachedBrowserPrefix;
};

$.createScripter = function() {
  $.ScripterImpl$0();
};

$._log = function(msg) {
  if ($._globalState().get$isWorker() === true) $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'log', 'msg', msg])));
  else {
    try {
      $._consoleLog(msg);
    } catch (exception) {
      $.unwrapException(exception);
      var trace = $.getTraceFromException(exception);
      throw $.captureStackTrace($.ExceptionImplementation$1(trace));
    }
  }
};

$.isPrimitive = function(x) {
  return x === (void 0) || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$._addIfNonEmpty = function(sb, test, first, second) {
  $.propertyTypeCheck(sb, 'is$StringBuffer');
  $.stringTypeCheck(test);
  $.stringTypeCheck(first);
  $.stringTypeCheck(second);
  if (!('' === test)) {
    $.add$1(sb, first === (void 0) ? 'null' : first);
    $.add$1(sb, second === (void 0) ? 'null' : second);
  }
};

$.isPrimitive2 = function(x) {
  return x === (void 0) || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$._emitCollection = function(c, result, visiting) {
  $.listSuperNativeTypeCheck(c, 'is$Collection');
  $.propertyTypeCheck(result, 'is$StringBuffer');
  $.listTypeCheck(visiting);
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && (c.constructor === Array || c.is$List2());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    !first && $.add$1(result, ', ');
    $._emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
};

$._numberToString = function(x) {
  $.numTypeCheck(x);
  if (typeof x === 'number' && x === (x | 0)) {
    return $.toString(x);
  }
  if (typeof x === 'number') {
    return $.toString(x);
  }
  return $.toString($.toDouble(x));
};

$._getEventData = function(e) {
  return e.data;
};

$._BufferingSendPort$2 = function(isolateId, _futurePort) {
  var t1 = $._idCount;
  t1 = new $._BufferingSendPort([], _futurePort, (void 0), t1, isolateId);
  t1._BufferingSendPort$2(isolateId, _futurePort);
  return t1;
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a - b;
  }
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$.CurrentCombatMove$3 = function(type, performer, target) {
  var t1 = new $.CurrentCombatMove((void 0), target, performer, type, $.CTC7, (void 0));
  t1.GameEntity$0();
  t1.CurrentCombatMove$3(type, performer, target);
  return t1;
};

$._PeerConnection00EventsImpl$1 = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._ElementList$1 = function(list) {
  $.listTypeCheck(list);
  return new $._ElementList(list);
};

$._WorkerContextEventsImpl$1 = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$.or = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a | b) >>> 0;
  }
  return a.operator$or$1(b);
};

$.DoubleLinkedQueueEntry$1 = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry((void 0), (void 0), (void 0));
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$._DocumentEventsImpl$1 = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.regExpTest = function(regExp, str) {
  $.propertyTypeCheck(regExp, 'is$JSSyntaxRegExp');
  $.stringTypeCheck(str);
  return $.regExpGetNative(regExp).test(str);
};

$.propertyTypeError = function(value, property) {
  var name$ = $.stringTypeCheck($.substring$2(property, 3, $.get$length(property)));
  throw $.captureStackTrace($.TypeError$1($.S(value) + ' does not implement ' + $.S(name$)));
};

$._EventsImpl$1 = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.HashSetImplementation$0 = function() {
  var t1 = new $.HashSetImplementation((void 0));
  t1.HashSetImplementation$0();
  return t1;
};

$._IDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) return $.ListIterator$1(receiver);
  return receiver.iterator$0();
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') {
    return receiver.split(pattern);
  }
  if (typeof pattern === 'object' && !!pattern.is$JSSyntaxRegExp) {
    return receiver.split($.regExpGetNative(pattern));
  }
  throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$._startIsolate = function(isolate, replyTo) {
  $.propertyTypeCheck(isolate, 'is$Isolate');
  $.propertyTypeCheck(replyTo, 'is$SendPort');
  $._fillStatics($._globalState().get$currentContext());
  var port = $.propertyTypeCheck($.ReceivePort(), 'is$ReceivePort2');
  replyTo.send$2('spawned', port.toSendPort$0());
  isolate._run$1(port);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
};

$._Deserializer$0 = function() {
  return new $._Deserializer((void 0));
};

$._SpeechRecognitionEventsImpl$1 = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$1 = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$._JsonParser$_internal$1 = function(json) {
  $.stringTypeCheck(json);
  var t1 = new $._JsonParser(0, $.get$length(json), json);
  t1._JsonParser$_internal$1(json);
  return t1;
};

$.wait = function(futures) {
  if (typeof futures !== 'string' && (typeof futures !== 'object'||futures.constructor !== Array)) return $.wait$bailout(futures, 1, futures);
  $.listTypeCheck(futures);
  var t1 = ({});
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, ({T: 'List'}));
    return t1;
  }
  var completer = $.CompleterImpl$0();
  $.setRuntimeTypeInfo(completer, ({T: 'List'}));
  t1.completer_3 = $.propertyTypeCheck(completer, 'is$Completer');
  t1.result_4 = $.propertyTypeCheck(t1.completer_3.get$future(), 'is$Future');
  t1.remaining_5 = futures.length;
  t1.values_6 = $.List(futures.length);
  for (var i = 0; $.ltB(i, futures.length); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = ({});
    t2.pos_1 = i;
    var t3 = t2.pos_1;
    if (t3 !== (t3 | 0)) throw $.iae(t3);
    var t4 = futures.length;
    if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
    var future = $.propertyTypeCheck(futures[t3], 'is$Future');
    future.then$1(new $.Closure82(t2, t1));
    future.handleException$1(new $.Closure83(t1));
  }
  return t1.result_4;
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length === 0;
  }
  return receiver.isEmpty$0();
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.regExpExec = function(regExp, str) {
  $.propertyTypeCheck(regExp, 'is$JSSyntaxRegExp');
  $.stringTypeCheck(str);
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) return;
  return result;
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a + b) : $.add$slow(a, b);
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b) === true;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  }
  if (typeof other === 'object' && !!other.is$JSSyntaxRegExp) {
    return other.hasMatch$1($.substring$1(receiver, startIndex));
  }
  return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.ObjectNotClosureException$0 = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$._consoleLog = function(msg) {
  $globalThis.console.log(msg);;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.abs$0();
  return Math.abs(receiver);
};

$._emptyIfNull = function(val) {
  $.stringTypeCheck(val);
  return !$.eqNullB(val) ? val : '';
};

$.regExpAttachGlobalNative = function(regExp) {
  $.propertyTypeCheck(regExp, 'is$JSSyntaxRegExp');
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b) === true;
};

$.Actor$0 = function() {
  var t1 = new $.Actor(0, 0, 45, 10, (void 0), (void 0), (void 0), false, 0, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), 2, false, true, $.CTC7, (void 0));
  t1.GameEntity$0();
  t1.Actor$0();
  return t1;
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  }
  return receiver.isNegative$0();
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = $.intTypeCheck(a % b);
    if ($.eqB(result, 0)) return 0;
    if ($.gtB(result, 0)) return result;
    var b = (b);
    if (b < 0) return $.sub(result, b);
    return $.add(result, b);
  }
  return a.operator$mod$1(b);
};

$.regExpMakeNative = function(regExp, global) {
  $.propertyTypeCheck(regExp, 'is$JSSyntaxRegExp');
  $.boolTypeCheck(global);
  var pattern = $.stringTypeCheck(regExp.get$pattern());
  var multiLine = $.boolTypeCheck(regExp.get$multiLine());
  var ignoreCase = $.boolTypeCheck(regExp.get$ignoreCase());
  $.checkString(pattern);
  var sb = $.propertyTypeCheck($.StringBufferImpl$1(''), 'is$StringBuffer');
  multiLine === true && $.add$1(sb, 'm');
  ignoreCase === true && $.add$1(sb, 'i');
  global === true && $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$2(pattern, (String(e))));
  }
};

$.DEBUG = function(str) {
  $.stringTypeCheck(str);
  $.print(str);
};

$.HtmlInterface$0 = function() {
  var t1 = new $.HtmlInterface((void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.HtmlInterface$0();
  return t1;
};

$.BadNumberFormatException$1 = function(_s) {
  $.stringTypeCheck(_s);
  return new $.BadNumberFormatException(_s);
};

$.stringify = function(object) {
  return $.stringify2(object);
};

$.stringify2 = function(object) {
  var stringifier = $.JsonStringifier$_internal$0();
  stringifier._stringify$1(object);
  return stringifier.get$_result();
};

$._FrozenElementListIterator$1 = function(_list) {
  return new $._FrozenElementListIterator(0, _list);
};

$.mapToString = function(m) {
  $.callTypeCheck(m, 'is$Map');
  var result = $.StringBufferImpl$1('');
  $._emitMap(m, result, $.List((void 0)));
  return result.toString$0();
};

$.WeaponType$4 = function(name$, piercing, hardness, blockingMod) {
  $.stringTypeCheck(name$);
  var t1 = new $.WeaponType((void 0), (void 0), (void 0), (void 0), blockingMod, hardness, piercing, $.CTC7, (void 0));
  t1.GameEntity$0();
  t1.WeaponType$4(name$, piercing, hardness, blockingMod);
  return t1;
};

$.lastIndexOf2 = function(a, element, startIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.lastIndexOf2$bailout(a, element, startIndex, 1, a, 0);
  $.listTypeCheck(a);
  $.intTypeCheck(startIndex);
  if ($.ltB(startIndex, 0)) return -1;
  if ($.geB(startIndex, a.length)) var startIndex = a.length - 1;
  $.intTypeCheck(startIndex);
  if (startIndex !== (startIndex | 0)) return $.lastIndexOf2$bailout(a, element, startIndex, 2, a, startIndex);
  var i = startIndex;
  for (; $.geB(i, 0); i = $.intTypeCheck($.sub(i, 1))) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$._XMLHttpRequestEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._JavaScriptAudioNodeEventsImpl$1 = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$._emitObject = function(o, result, visiting) {
  $.propertyTypeCheck(result, 'is$StringBuffer');
  $.listTypeCheck(visiting);
  if (typeof o === 'object' && (o.constructor === Array || o.is$Collection())) {
    if ($._containsRef(visiting, o) === true) {
      $.add$1(result, typeof o === 'object' && (o.constructor === Array || o.is$List2()) ? '[...]' : '{...}');
    } else $._emitCollection(o, result, visiting);
  } else {
    if (typeof o === 'object' && o.is$Map()) {
      if ($._containsRef(visiting, o) === true) $.add$1(result, '{...}');
      else $._emitMap(o, result, visiting);
    } else {
      $.add$1(result, $.eqNullB(o) ? 'null' : o);
    }
  }
};

$._emitMap = function(m, result, visiting) {
  $.callTypeCheck(m, 'is$Map');
  $.propertyTypeCheck(result, 'is$StringBuffer');
  $.listTypeCheck(visiting);
  var t1 = ({});
  t1.visiting_2 = visiting;
  t1.result_1 = result;
  $.add$1(t1.visiting_2, m);
  $.add$1(t1.result_1, '{');
  t1.first_3 = true;
  $.forEach(m, new $.Closure(t1));
  $.add$1(t1.result_1, '}');
  $.removeLast(t1.visiting_2);
};

$.resolveRandoms = function(str) {
  if (typeof str !== 'string' && (typeof str !== 'object'||str.constructor !== Array)) return $.resolveRandoms$bailout(str, 1, str, 0, 0, 0, 0, 0, 0);
  $.stringTypeCheck(str);
  var startTagIndex = $.intTypeCheck(str.indexOf('{'));
  if (startTagIndex !== (startTagIndex | 0)) return $.resolveRandoms$bailout(str, 2, str, startTagIndex, 0, 0, 0, 0, 0);
  if (!(startTagIndex === -1) && startTagIndex < str.length - 1) {
    var indexes = $.List((void 0));
    $.setRuntimeTypeInfo(indexes, ({E: 'int'}));
    indexes.push(startTagIndex);
    var i = startTagIndex + 1;
    var depth = 1;
    var lastIndex = (void 0);
    while (true) {
      if (lastIndex !== (lastIndex | 0)) return $.resolveRandoms$bailout(str, 4, depth, indexes, i, str, startTagIndex, lastIndex, 0);
      var endTagIndex = (void 0);
      if (!(i < str.length)) break;
      var t1 = str.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var ch = $.stringTypeCheck(str[i]);
      if (typeof ch !== 'string') return $.resolveRandoms$bailout(str, 5, depth, indexes, i, str, startTagIndex, ch, 0);
      if (ch === '{') {
        depth = $.intTypeCheck($.add(depth, 1));
        if (depth !== (depth | 0)) return $.resolveRandoms$bailout(str, 6, startTagIndex, str, indexes, i, depth, 0, 0);
      } else {
        if (ch === '|' && $.eqB(depth, 1)) indexes.push(i);
        else {
          if (ch === '}') {
            depth = $.intTypeCheck($.sub(depth, 1));
            if (depth !== (depth | 0)) return $.resolveRandoms$bailout(str, 7, indexes, i, str, startTagIndex, depth, 0, 0);
            if (depth === 0) {
              indexes.push(i);
              endTagIndex = i;
              lastIndex = endTagIndex;
              break;
            }
          }
        }
      }
      lastIndex = i;
      ++i;
    }
    if (endTagIndex !== (endTagIndex | 0)) return $.resolveRandoms$bailout(str, 9, lastIndex, str, indexes, startTagIndex, endTagIndex, 0, 0);
    var numOptions = indexes.length - 1;
    if (numOptions > 1) {
      t1 = $.random();
      if (typeof t1 !== 'number') return $.resolveRandoms$bailout(str, 11, endTagIndex, indexes, numOptions, lastIndex, str, startTagIndex, t1);
      var choice = $.intTypeCheck($.toInt($.floor(t1 * numOptions)));
      if (choice !== (choice | 0)) return $.resolveRandoms$bailout(str, 12, endTagIndex, indexes, lastIndex, str, startTagIndex, choice, 0);
      var strBuf = $.propertyTypeCheck($.StringBufferImpl$1(''), 'is$StringBuffer');
      strBuf.add$1($.substring$2(str, 0, startTagIndex));
      t1 = indexes.length;
      if (choice < 0 || choice >= t1) throw $.ioore(choice);
      var t2 = indexes[choice];
      if (typeof t2 !== 'number') return $.resolveRandoms$bailout(str, 13, strBuf, endTagIndex, indexes, choice, lastIndex, str, t2);
      ++t2;
      var t3 = choice + 1;
      var t4 = indexes.length;
      if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
      strBuf.add$1($.resolveRandoms($.stringTypeCheck($.substring$2(str, t2, indexes[t3]))));
      strBuf.add$1($.substring$2(str, endTagIndex + 1, str.length));
      if (lastIndex === str.length - 1) return strBuf.toString$0();
      return $.resolveRandoms(strBuf.toString$0());
    }
    if (lastIndex === str.length - 1) return str;
    t1 = lastIndex + 1;
    return $.S($.substring$2(str, 0, t1)) + $.S($.resolveRandoms($.substring$1(str, t1)));
  }
  return str;
};

$._IsolateEvent$3 = function(isolate, fn, message) {
  return new $._IsolateEvent(message, fn, isolate);
};

$._IDBDatabaseEventsImpl$1 = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.isFirefox = function() {
  return $.contains$2($.userAgent(), 'Firefox', 0);
};

$.defaultChanceToBlock = function(_this, performer, target) {
  $.propertyTypeCheck(_this, 'is$CombatMoveType');
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  var fightingDiff = $.intTypeCheck($.sub(target.get$modifiedDodging(), performer.get$modifiedAttacking()));
  if ($.geB(fightingDiff, 10)) return 1.0;
  if ($.leB(fightingDiff, -10)) return 0.0;
  if ($.eqB(fightingDiff, 0)) return _this.get$baseChanceToBlock();
  if ($.gtB(fightingDiff, 0)) return $.add(_this.get$baseChanceToBlock(), $.mul($.sub(1.0, _this.get$baseChanceToBlock()), fightingDiff) / 10.0);
  return $.sub(_this.get$baseChanceToBlock(), $.div($.mul(_this.get$baseChanceToBlock(), $.abs(fightingDiff)), 10.0));
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(a, b)) return -1;
    if ($.gtB(a, b)) return 1;
    if ($.eqB(a, b)) {
      if ($.eqB(a, 0)) {
        var aIsNegative = $.boolTypeCheck($.isNegative(a));
        if ($.eqB(aIsNegative, $.boolTypeCheck($.isNegative(b)))) return 0;
        if (aIsNegative === true) return -1;
        return 1;
      }
      return 0;
    }
    if ($.isNaN(a) === true) {
      if ($.isNaN(b) === true) return 0;
      return 1;
    }
    return -1;
  }
  if (typeof a === 'string') {
    if (!(typeof b === 'string')) throw $.captureStackTrace($.IllegalArgumentException$1(b));
    if (a == b) var t1 = 0;
    else {
      t1 = (a < b) ? -1 : 1;
    }
    return t1;
  }
  return a.compareTo$1(b);
};

$.ge = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b);
};

$._TextTrackCueEventsImpl$1 = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$._startWorker2 = function(functionName, uri, replyPort) {
  $.stringTypeCheck(functionName);
  $.stringTypeCheck(uri);
  $.propertyTypeCheck(replyPort, 'is$SendPort');
  if ($._globalState().get$isWorker() === true) $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'spawn-worker2', 'functionName', functionName, 'uri', uri, 'replyPort', replyPort])));
  else $._spawnWorker2(functionName, uri, replyPort);
};

$.lastIndexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) return $.lastIndexOf(receiver, element, start);
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$1(element));
    if (!(start === (void 0))) {
      if (!(typeof start === 'number')) throw $.captureStackTrace($.IllegalArgumentException$1(start));
      if (start < 0) return -1;
      if (start >= receiver.length) {
        if (element === '') return receiver.length;
        var start = receiver.length - 1;
      } else start = start;
    }
    return $.stringLastIndexOfUnchecked(receiver, element, start);
  }
  return receiver.lastIndexOf$2(element, start);
};

$._Copier$0 = function() {
  return new $._Copier((void 0));
};

$.MatchImplementation$5 = function(pattern, str, _start, _end, _groups) {
  $.stringTypeCheck(pattern);
  $.stringTypeCheck(str);
  $.intTypeCheck(_start);
  $.intTypeCheck(_end);
  $.listTypeCheck(_groups);
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$._spawnWorker2 = function(functionName, uri, replyPort) {
  if ($.eqNullB(functionName)) var functionName = 'main';
  if ($.eqNullB(uri)) var uri = $._thisScript();
  if ($.Uri$fromString$1(uri).isAbsolute$0() !== true) {
    uri = $.S($.stringTypeCheck($.substring$2($._thisScript(), 0, $.lastIndexOf$1($._thisScript(), '/')))) + '/' + $.S(uri);
  }
  var worker = $._newWorker(uri);
  worker.set$onmessage(new $.Closure92(worker));
  var t1 = $._globalState();
  var workerId = t1.get$nextManagerId();
  t1.set$nextManagerId($.add(workerId, 1));
  worker.set$id(workerId);
  $.indexSet($._globalState().get$managers(), workerId, worker);
  worker.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'start2', 'id', workerId, 'replyTo', $._serializeMessage(replyPort), 'functionName', functionName])));
};

$.stringReplaceJS = function(receiver, replacer, to) {
  return receiver.replace(replacer, to.replace('$', '$$$$'));
};

$.UnsupportedOperationException$1 = function(_message) {
  $.stringTypeCheck(_message);
  return new $.UnsupportedOperationException(_message);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(start));
    return $.indexOf(receiver, element, start, (receiver.length));
  }
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(start));
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$1(element));
    if (start < 0) return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.ScripterImpl$0 = function() {
  var t1 = new $.ScripterImpl((void 0), (void 0), (void 0), (void 0), false, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.Scripter$0();
  t1.ScripterImpl$0();
  return t1;
};

$._FileReaderEventsImpl$1 = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.replaceAll = function(receiver, from, to) {
  if (!(typeof receiver === 'string')) return receiver.replaceAll$2(from, to);
  $.checkString(to);
  return $.stringReplaceAllUnchecked(receiver, from, to);
};

$.NoMoreElementsException$0 = function() {
  return new $.NoMoreElementsException();
};

$.eqNullB = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1((void 0)) === true;
    return false;
  }
  return typeof a === "undefined";
};

$._Manager$0 = function() {
  var t1 = new $._Manager((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), 1, 0, 0);
  t1._Manager$0();
  return t1;
};

$.stringLastIndexOfUnchecked = function(receiver, element, start) {
  return receiver.lastIndexOf(element, start);
};

$._FrameSetElementEventsImpl$1 = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.Uri$fromString$1 = function(uri) {
  $.stringTypeCheck(uri);
  var t1 = $.CTC13.firstMatch$1(uri);
  var t2 = $._emptyIfNull($.index(t1, 1));
  var t3 = $._emptyIfNull($.index(t1, 2));
  var t4 = $._emptyIfNull($.index(t1, 3));
  var t5 = $._parseIntOrZero($.index(t1, 4));
  var t6 = $._emptyIfNull($.index(t1, 5));
  var t7 = $._emptyIfNull($.index(t1, 6));
  return new $.Uri($._emptyIfNull($.index(t1, 7)), t7, t6, t5, t4, t3, t2);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a + b;
  }
  if (typeof a === 'string') {
    var b = $.toString(b);
    if (typeof b === 'string') {
      return a + b;
    }
    $.checkNull(b);
    throw $.captureStackTrace($.IllegalArgumentException$1(b));
  }
  return a.operator$add$1(b);
};

$.List$from = function(other) {
  $.listSuperNativeTypeCheck(other, 'is$Iterable');
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.propertyTypeCheck($.iterator(other), 'is$Iterator');
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.getString = function(str, subject, object) {
  $.stringTypeCheck(str);
  $.propertyTypeCheck(subject, 'is$Actor');
  $.propertyTypeCheck(object, 'is$Actor');
  $.stringTypeCheck(str);
  if (!$.eqNullB(subject)) {
    var result = $.eqB(subject.get$pronoun(), $.CTC8) ? $.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll(str, '<subject>', subject.get$pronoun().get$nominative())), '<subject\'s>', subject.get$pronoun().get$genitive())), '<s>', '')), '<es>', '')), '<ies>', 'y')), '<does>', 'do')), '<is>', 'are')) : $.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceFirst(str, '<subject>', subject.get$name())), '<subject>', subject.get$pronoun().get$nominative())), '<s>', 's')), '<es>', 'es')), '<ies>', 'ies')), '<does>', 'does')), '<is>', 'is'));
    result = $.stringTypeCheck($.replaceAll(result, '<subjectPronoun>', subject.get$pronoun().get$nominative()));
    if ($.ltB($.indexOf$1(str, '<subject>'), $.indexOf$1(str, '<subject\'s>'))) {
      result = $.stringTypeCheck($.replaceAll(result, '<subject\'s>', subject.get$pronoun().get$genitive()));
    }
    result = $.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceFirst(result, '<subject\'s>', $.S(subject.get$name()) + '\'s')), '<subject\'s>', subject.get$pronoun().get$genitive())), '<subjectPronoun\'s>', subject.get$pronoun().get$genitive()));
  } else result = str;
  if (!$.eqNullB(object)) {
    result = object.get$isPlayer() === true ? $.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll(result, '<object>', object.get$pronoun().get$accusative())), '<object\'s>', object.get$pronoun().get$genitive())) : $.stringTypeCheck($.replaceAll(result, '<object>', object.get$name()));
    result = $.stringTypeCheck($.replaceAll(result, '<objectPronoun>', object.get$pronoun().get$accusative()));
    if ($.ltB($.indexOf$1(str, '<object>'), $.indexOf$1(str, '<object\'s>'))) {
      result = $.stringTypeCheck($.replaceAll(result, '<object\'s>', object.get$pronoun().get$genitive()));
    }
    result = $.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceAll($.stringTypeCheck($.replaceFirst(result, '<object\'s>', $.S(object.get$name()) + '\'s')), '<object\'s>', object.get$pronoun().get$genitive())), '<objectPronoun\'s>', object.get$pronoun().get$genitive()));
  }
  return $.resolveRandoms(result);
};

$.port = function() {
  return $._port;
};

$.newList = function(length$) {
  if (length$ === (void 0)) {
    return new Array();
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  $.HtmlInterface$0();
};

$._AbstractWorkerEventsImpl$1 = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.defaultOnDie = function(_this) {
  $.propertyTypeCheck(_this, 'is$Actor');
  _this.report$3$negative$reportOnlyOnAlive('<subject> ' + $.S($.randomly(['pass<es> out', 'lose<s> consciousness', 'black<s> out', 'go<es> down'])), true, false);
};

$._computeLoadLimit = function(capacity) {
  $.intTypeCheck(capacity);
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$1 = function(set_) {
  $.propertyTypeCheck(set_, 'is$HashSetImplementation');
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$._WorkerSendPort$3 = function(_workerId, isolateId, _receivePortId) {
  $.intTypeCheck(isolateId);
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.IllegalArgumentException$1 = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.Message$ShowChoices$3 = function(choices, prependText, endOfPage) {
  $.listTypeCheck(choices);
  $.stringTypeCheck(prependText);
  $.boolTypeCheck(endOfPage);
  var t1 = new $.Message((void 0), (void 0), (void 0), 64);
  t1.Message$ShowChoices$3(choices, prependText, endOfPage);
  return t1;
};

$._MediaElementEventsImpl$1 = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._processWorkerMessage = function(sender, e) {
  var t1 = ({});
  var msg = $._deserializeMessage($._getEventData(e));
  switch ($.index(msg, 'command')) {
    case 'start':
      var t2 = $.index(msg, 'id');
      $._globalState().set$currentManagerId(t2);
      t1.runnerObject_1 = $._allocate($._getJSConstructorFromName($.index(msg, 'factoryName')));
      t1.serializedReplyTo_2 = $.index(msg, 'replyTo');
      $._globalState().get$topEventLoop().enqueue$3($._IsolateContext$0(), new $.Closure93(t1), 'worker-start');
      $._globalState().get$topEventLoop().run$0();
      break;
    case 'start2':
      t2 = $.index(msg, 'id');
      $._globalState().set$currentManagerId(t2);
      t1.entryPoint_3 = $.functionTypeCheck($._getJSFunctionFromName($.index(msg, 'functionName')));
      t1.replyTo_4 = $._deserializeMessage($.index(msg, 'replyTo'));
      $._globalState().get$topEventLoop().enqueue$3($._IsolateContext$0(), new $.Closure94(t1), 'worker-start');
      $._globalState().get$topEventLoop().run$0();
      break;
    case 'spawn-worker':
      $._spawnWorker($.index(msg, 'factoryName'), $.index(msg, 'replyPort'));
      break;
    case 'spawn-worker2':
      $._spawnWorker2($.index(msg, 'functionName'), $.index(msg, 'uri'), $.index(msg, 'replyPort'));
      break;
    case 'message':
      $.index(msg, 'port').send$2($.index(msg, 'msg'), $.index(msg, 'replyTo'));
      $._globalState().get$topEventLoop().run$0();
      break;
    case 'close':
      $._log('Closing Worker');
      $._globalState().get$managers().remove$1(sender.get$id());
      sender.terminate$0();
      $._globalState().get$topEventLoop().run$0();
      break;
    case 'log':
      $._log($.index(msg, 'msg'));
      break;
    case 'print':
      if ($._globalState().get$isWorker() === true) $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'print', 'msg', msg])));
      else $.print($.index(msg, 'msg'));
      break;
    case 'error':
      throw $.captureStackTrace($.index(msg, 'msg'));
  }
};

$._IDBTransactionEventsImpl$1 = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._BodyElementEventsImpl$1 = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$._AllMatchesIterator$2 = function(re, _str) {
  $.propertyTypeCheck(re, 'is$JSSyntaxRegExp');
  $.stringTypeCheck(_str);
  return new $._AllMatchesIterator(false, (void 0), _str, $.JSSyntaxRegExp$_globalVersionOf$1(re));
};

$.FutureImpl$0 = function() {
  var t1 = [];
  var t2 = [];
  return new $.FutureImpl([], t2, t1, false, (void 0), (void 0), false);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$1(argument));
};

$._IsolateContext$0 = function() {
  var t1 = new $._IsolateContext((void 0), (void 0), (void 0));
  t1._IsolateContext$0();
  return t1;
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.Element$tag = function(tag) {
  $.stringTypeCheck(tag);
  return document.createElement(tag);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') {
    return isNaN(receiver);
  }
  return receiver.isNaN$0();
};

$.isInfinite = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.isInfinite$0();
  return (receiver == Infinity) || (receiver == -Infinity);
};

$._getJSFunctionName = function(f) {
  $.functionTypeCheck(f);
  return f.$name || (void 0);;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  $.stringTypeCheck(needle);
  $.stringTypeCheck(haystack);
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.intTypeCheck($.get$length(haystack));
  var patternLength = $.intTypeCheck($.get$length(needle));
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(needle, haystack, 1, length$, result, patternLength);
  for (var startIndex = 0; true; ) {
    var position = $.intTypeCheck($.indexOf$2(haystack, needle, startIndex));
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.intTypeCheck($.add(position, patternLength));
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.intTypeCheck($.add(startIndex, 1)) : endIndex;
    }
  }
  return result;
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a <= b;
  }
  return a.operator$le$1(b);
};

$._ChildrenElementList$_wrap$1 = function(element) {
  $.callTypeCheck(element, 'is$_ElementImpl');
  return new $._ChildrenElementList(element.get$$$dom_children(), element);
};

$._AllMatchesIterable$2 = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.doubleTypeCheck = function(value) {
  if (value === (void 0)) return value;
  if (typeof value === 'number') {
    return value;
  }
  throw $.captureStackTrace($.TypeError$1($.S(value) + ' does not implement double'));
};

$.CombatEvent$fromMove$1 = function(currentMove) {
  $.propertyTypeCheck(currentMove, 'is$CurrentCombatMove');
  var t1 = new $.CombatEvent(false, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.CombatEvent$fromMove$1(currentMove);
  return t1;
};

$.defaultChanceToDodge = function(_this, performer, target) {
  $.propertyTypeCheck(_this, 'is$CombatMoveType');
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  var fightingDiff = $.intTypeCheck($.sub(target.get$modifiedDodging(), performer.get$modifiedAttacking()));
  if ($.geB(fightingDiff, 10)) return 1.0;
  if ($.leB(fightingDiff, -10)) return 0.0;
  if ($.eqB(fightingDiff, 0)) return _this.get$baseChanceToDodge();
  if ($.gtB(fightingDiff, 0)) return $.add(_this.get$baseChanceToDodge(), $.mul($.sub(1.0, _this.get$baseChanceToDodge()), fightingDiff) / 10.0);
  return $.sub(_this.get$baseChanceToDodge(), $.div($.mul(_this.get$baseChanceToDodge(), $.abs(fightingDiff)), 10.0));
};

$.dynamicSetMetadata = function(inputTable) {
  $.listTypeCheck(inputTable);
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.intTypeCheck($.get$length(other));
  if ($.gtB(otherLength, receiverLength)) return false;
  return $.eq(other, $.substring$1(receiver, $.sub(receiverLength, otherLength)));
};

$.ListIterator$1 = function(list) {
  $.listTypeCheck(list);
  return new $.ListIterator(list, 0);
};

$.Message$OptionSelected$1 = function(hash) {
  $.intTypeCheck(hash);
  var t1 = new $.Message((void 0), (void 0), (void 0), 128);
  t1.Message$OptionSelected$1(hash);
  return t1;
};

$._Serializer$0 = function() {
  return new $._Serializer(0, (void 0));
};

$.defaultOnHit = function(_this, e) {
  $.propertyTypeCheck(_this, 'is$CombatMoveType');
  $.propertyTypeCheck(e, 'is$CombatEvent');
  e.get$performer().report$3$object$positive($.S(_this.get$thirdPartyString()) + ' (' + $.S(e.get$chanceAll()) + ')', e.get$target(), true);
  var t1 = e.get$target();
  t1.set$hitpoints($.sub(t1.get$hitpoints(), _this.get$damage()));
  t1 = e.get$target();
  t1.set$stance($.sub(t1.get$stance(), _this.get$stanceDamage()));
};

$.defaultOnStart = function(_this, e) {
  $.propertyTypeCheck(_this, 'is$CombatMoveType');
  $.propertyTypeCheck(e, 'is$CombatEvent');
  var again = $.eqB(e.get$performer().get$previousMove(), _this) ? ' again' : '';
  if (e.get$performer().get$isPlayer() !== true) e.get$performer().report$3$endSentence$object('<subject> wind<s> up to ' + $.S(_this.get$choiceString()) + again, true, e.get$target());
  else e.get$performer().report$3$endSentence$object('you decide to ' + $.S(_this.get$choiceString()) + again, true, e.get$target());
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$._getJSFunctionFromName = function(functionName) {
  $.stringTypeCheck(functionName);
      return $globalThis[functionName];
  ;
};

$.Message$fromJson$1 = function(json) {
  $.stringTypeCheck(json);
  var t1 = new $.Message((void 0), (void 0), (void 0), (void 0));
  t1.Message$fromJson$1(json);
  return t1;
};

$.functionTypeCheck = function(value) {
  if (value === (void 0)) return value;
  if (typeof value === 'function' || typeof value === 'object' && !!value.is$Function) {
    return value;
  }
  throw $.captureStackTrace($.TypeError$1($.S(value) + ' does not implement Function'));
};

$.listTypeCheck = function(value) {
  if (value === (void 0)) return value;
  if (typeof value === 'object' && (value.constructor === Array || value.is$List2())) {
    return value;
  }
  throw $.captureStackTrace($.TypeError$1($.S(value) + ' does not implement List'));
};

$.FutureAlreadyCompleteException$0 = function() {
  return new $.FutureAlreadyCompleteException();
};

$._WorkerEventsImpl$1 = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b) === true;
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.Message$Quit$0 = function() {
  return new $.Message((void 0), (void 0), (void 0), 0);
};

$.FilteredElementList$1 = function(node) {
  $.callTypeCheck(node, 'is$Node');
  return new $.FilteredElementList(node.get$nodes(), node);
};

$.convertDartClosureToJS = function(closure, arity) {
  $.intTypeCheck(arity);
  if (closure === (void 0)) return;
  var function$ = (closure.$identity);
  if (!!function$) return function$;
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$.parse = function(json) {
  $.stringTypeCheck(json);
  return $.parse2(json);
};

$._FixedSizeListIterator$1 = function(array) {
  $.listTypeCheck(array);
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.parse2 = function(json) {
  $.stringTypeCheck(json);
  return $._JsonParser$_internal$1(json)._parseToplevel$0();
};

$._FrozenElementList$_wrap$1 = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.concatAll = function(strings) {
  $.listTypeCheck(strings);
  $.checkNull(strings);
  for (var t1 = $.iterator(strings), result = ''; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    $.checkNull(t2);
    if (!(typeof t2 === 'string')) throw $.captureStackTrace($.IllegalArgumentException$1(t2));
    result = result + t2;
  }
  return result;
};

$.userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._InputElementEventsImpl$1 = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) return receiver.getRange$2(start, length$);
  if (0 === length$) return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(start));
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  if (length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver))) throw $.captureStackTrace($.IndexOutOfRangeException$1(length$));
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  return receiver.slice(start, end);
};

$.getRange2 = function(a, start, length$, accumulator) {
  $.listTypeCheck(a);
  $.intTypeCheck(start);
  $.intTypeCheck(length$);
  $.listTypeCheck(accumulator);
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$1('length'));
  if ($.ltB(start, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  var end = $.intTypeCheck($.add(start, length$));
  if (end !== (end | 0)) return $.getRange2$bailout(a, start, length$, accumulator, 1, end, 0);
  if ($.gtB(end, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
  $.intTypeCheck(start);
  if (start !== (start | 0)) return $.getRange2$bailout(a, start, length$, accumulator, 2, end, start);
  var i = start;
  for (; $.ltB(i, end); i = $.intTypeCheck($.add(i, 1))) {
    $.add$1(accumulator, $.index(a, i));
  }
  return accumulator;
};

$._DoubleLinkedQueueIterator$1 = function(_sentinel) {
  $.propertyTypeCheck(_sentinel, 'is$_DoubleLinkedQueueEntrySentinel');
  var t1 = new $._DoubleLinkedQueueIterator((void 0), _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.JsonStringifier$_internal$0 = function() {
  var t1 = $.StringBufferImpl$1('');
  var t2 = $.List((void 0));
  $.setRuntimeTypeInfo(t2, ({E: 'Object'}));
  return new $.JsonStringifier(t2, t1);
};

$.lastIndexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver) === true) {
    return $.lastIndexOf(receiver, element, (receiver.length));
  }
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$1(element));
    return receiver.lastIndexOf(element);
  }
  return receiver.lastIndexOf$1(element);
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) throw $.captureStackTrace($.IllegalArgumentException$1(value));
  return res;
};

$.toUpperCase = function(receiver) {
  if (!(typeof receiver === 'string')) return receiver.toUpperCase$0();
  return receiver.toUpperCase();
};

$._TextTrackListEventsImpl$1 = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$.defaultOnSufferBlock = function(_this, e) {
  $.propertyTypeCheck(_this, 'is$CombatMoveType');
  $.propertyTypeCheck(e, 'is$CombatEvent');
  e.get$target().report$3$object$positive('<subject> deflect<s> it', e.get$performer(), true);
  var actualStanceDamage = $.intTypeCheck($.max(0, $.sub($.toInt($.div(_this.get$stanceDamage(), 2)), e.get$target().get$modifiedFighting())));
  if ($.gtB(actualStanceDamage, 0)) {
    e.get$target().report$2$negative('the blow was hard', true);
    var t1 = e.get$target();
    t1.set$stance($.sub(t1.get$stance(), actualStanceDamage));
  }
};

$._dynamicMetadata = function(table) {
  $.listTypeCheck(table);
  $dynamicMetadata = table;
};

$._dynamicMetadata2 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$0 = function() {
  var t1 = new $.LinkedHashMapImplementation((void 0), (void 0));
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$._DeprecatedPeerConnectionEventsImpl$1 = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$._PendingSendPortFinder$0 = function() {
  return new $._PendingSendPortFinder([], (void 0));
};

$.spawnFunction = function(topLevelFunction) {
  return $._spawnFunction(topLevelFunction);
};

$.regExpGetNative = function(regExp) {
  $.propertyTypeCheck(regExp, 'is$JSSyntaxRegExp');
  var r = (regExp._re);
  return r === (void 0) ? (regExp._re = $.regExpMakeNative(regExp, false)) : r;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$4(obj, name$, arguments$, (void 0)));
};

$.checkNull = function(object) {
  if (object === (void 0)) throw $.captureStackTrace($.NullPointerException$2((void 0), $.CTC));
  return object;
};

$.Choice$fromMap$1 = function(map) {
  $.callTypeCheck(map, 'is$Map');
  var t1 = new $.Choice((void 0), (void 0), (void 0), (void 0), (void 0), false);
  t1.UserInteraction$0();
  t1.Choice$fromMap$1(map);
  return t1;
};

$.CompleterImpl$0 = function() {
  return new $.CompleterImpl($.FutureImpl$0());
};

$.stringTypeCheck = function(value) {
  if (value === (void 0)) return value;
  if (typeof value === 'string') {
    return value;
  }
  throw $.captureStackTrace($.TypeError$1($.S(value) + ' does not implement String'));
};

$.StackTrace$1 = function(stack) {
  return new $.StackTrace(stack);
};

$._EventListenerListImpl$2 = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$._fillStatics = function(context) {
    $globals = context.isolateStatics;
  $static_init();
;
};

$.ReceivePort = function() {
  return $._ReceivePortImpl$0();
};

$.DEBUG_CMD = function(str) {
  $.stringTypeCheck(str);
  $.print('CMD: ' + $.S(str));
};

$._WindowEventsImpl$1 = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.DoubleLinkedQueue$0 = function() {
  var t1 = new $.DoubleLinkedQueue((void 0));
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.insertionSort_ = function(a, left, right, compare) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.insertionSort_$bailout(a, left, right, compare, 1, a, 0, 0);
  $.listTypeCheck(a);
  if (typeof left !== 'number') return $.insertionSort_$bailout(a, left, right, compare, 2, a, left, 0);
  $.intTypeCheck(left);
  $.intTypeCheck(right);
  var i = $.intTypeCheck(left + 1);
  if (i !== (i | 0)) return $.insertionSort_$bailout(a, left, right, compare, 3, a, left, i);
  for (; $.leB(i, right); i = $.intTypeCheck($.add(i, 1))) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = a[i];
    var j = i;
    while (true) {
      if ($.gtB(j, left)) {
        t1 = $.sub(j, 1);
        if (t1 !== (t1 | 0)) throw $.iae(t1);
        var t3 = a.length;
        if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
        t1 = $.gtB(compare.$call$2(a[t1], t2), 0);
      } else t1 = false;
      if (!t1) break;
      t1 = $.sub(j, 1);
      if (t1 !== (t1 | 0)) throw $.iae(t1);
      t3 = a.length;
      if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
      $.indexSet(a, j, a[t1]);
      j = $.intTypeCheck($.sub(j, 1));
    }
    $.indexSet(a, j, t2);
  }
};

$.TypeError$1 = function(msg) {
  $.stringTypeCheck(msg);
  return new $.TypeError(msg);
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') return true;
    $.checkNull(b);
    throw $.captureStackTrace($.IllegalArgumentException$1(b));
  }
  return false;
};

$.random = function() {
  return $.random2();
};

$.random2 = function() {
  return Math.random();
};

$._DoubleLinkedQueueEntrySentinel$0 = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel((void 0), (void 0), (void 0));
  t1.DoubleLinkedQueueEntry$1((void 0));
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a < b;
  }
  return a.operator$lt$1(b);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$1(index));
      if (!($.truncate(index) === index)) throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.defaultComputeSuitability = function(_this, performer, target) {
  $.propertyTypeCheck(_this, 'is$CombatMoveType');
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  if (_this.get$isOffensive() === true) {
    var chanceToHit = $.numTypeCheck(_this.computeChanceToHit$2(performer, target));
    var value = $.intTypeCheck($.toInt($.mul($.mul($.intTypeCheck($.toInt($.mul($.add(_this.get$damage(), $.div(_this.get$stanceDamage(), 5)), 10))), chanceToHit), chanceToHit)));
    if (!$.eqNullB(performer.get$previousMove())) {
      value = $.intTypeCheck($.sub(value, $.mul($.countBits($.and(_this.get$flags(), performer.get$previousMove().get$flags())), 10)));
    }
    return target.isArmoredAgainst$2(performer.get$weapon(), _this) === true ? $.intTypeCheck($.sub(value, 100)) : value;
  }
  return $.mul(_this.get$fightingMod(), 10);
};

$._globalState = function() {
  return $globalState;;
};

$.listSuperNativeTypeCheck = function(value, property) {
  if (value === (void 0)) return value;
  if (typeof value === 'object' && (value.constructor === Array || value.is$List2())) {
    return value;
  }
  if (value[property]()) return value;
  $.propertyTypeError(value, property);
};

$._globalState2 = function(val) {
  $.propertyTypeCheck(val, 'is$_Manager');
  $globalState = val;;
};

$._ReceivePortImpl$0 = function() {
  var t1 = $._nextFreeId;
  $._nextFreeId = $.add(t1, 1);
  t1 = new $._ReceivePortImpl((void 0), t1);
  t1._ReceivePortImpl$0();
  return t1;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$0 = function() {
  return new $._MainManagerStub();
};

$.numTypeCheck = function(value) {
  if (value === (void 0)) return value;
  if (typeof value === 'number') {
    return value;
  }
  throw $.captureStackTrace($.TypeError$1($.S(value) + ' does not implement num'));
};

$.Message$NoResult$0 = function() {
  return new $.Message((void 0), (void 0), (void 0), 256);
};

$.callTypeCheck = function(value, property) {
  if (value === (void 0)) return value;
  if ((typeof value) === 'object' && (value[property]())) return value;
  $.propertyTypeError(value, property);
};

$.ArmorType$6 = function(name$, hardness, dodgingMod, coveringTargets, coveringSides, coveringEffects) {
  $.stringTypeCheck(name$);
  var t1 = new $.ArmorType((void 0), coveringEffects, coveringSides, coveringTargets, dodgingMod, hardness, $.CTC7, (void 0));
  t1.GameEntity$0();
  t1.ArmorType$6(name$, hardness, dodgingMod, coveringTargets, coveringSides, coveringEffects);
  return t1;
};

$._escape = function(sb, s) {
  $.propertyTypeCheck(sb, 'is$StringBuffer');
  $.stringTypeCheck(s);
  var length$ = $.intTypeCheck($.get$length(s));
  var charCodes = $.List((void 0));
  $.setRuntimeTypeInfo(charCodes, ({E: 'int'}));
  for (var needsEscape = false, i = 0; $.ltB(i, length$); i = $.intTypeCheck($.add(i, 1))) {
    var charCode = $.intTypeCheck($.charCodeAt(s, i));
    if ($.ltB(charCode, 32)) {
      charCodes.push(92);
      switch (charCode) {
        case 8:
          charCodes.push(98);
          break;
        case 9:
          charCodes.push(116);
          break;
        case 10:
          charCodes.push(110);
          break;
        case 12:
          charCodes.push(102);
          break;
        case 13:
          charCodes.push(114);
          break;
        default:
          charCodes.push(117);
          charCodes.push($._hexDigit($.and($.shr(charCode, 12), 15)));
          charCodes.push($._hexDigit($.and($.shr(charCode, 8), 15)));
          charCodes.push($._hexDigit($.and($.shr(charCode, 4), 15)));
          charCodes.push($._hexDigit($.and(charCode, 15)));
          break;
      }
      needsEscape = true;
    } else {
      if ($.eqB(charCode, 34) || $.eqB(charCode, 92)) {
        charCodes.push(92);
        charCodes.push(charCode);
        needsEscape = true;
      } else charCodes.push(charCode);
    }
  }
  $.add$1(sb, needsEscape ? $.String$fromCharCodes(charCodes) : s);
};

$.DEBUG_SCR = function(str) {
  $.stringTypeCheck(str);
};

$.IndexOutOfRangeException$1 = function(_index) {
  $.intTypeCheck(_index);
  return new $.IndexOutOfRangeException(_index);
};

$.toString = function(value) {
  if (typeof value == "object") {
    if ($.isJsArray(value) === true) return $.collectionToString(value);
    return value.toString$0();
  }
  if (value === 0 && (1 / value) < 0) return '-0.0';
  if (value === (void 0)) return 'null';
  if (typeof value == "function") return 'Closure';
  return String(value);
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$1((exception.stack));
};

$._TextTrackEventsImpl$1 = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.charCodeAt = function(receiver, index) {
  $.intTypeCheck(index);
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$1(index));
    if (index < 0) throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    if (index >= receiver.length) throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    return receiver.charCodeAt(index);
  }
  return receiver.charCodeAt$1(index);
};

$._BatteryManagerEventsImpl$1 = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._allocate = function(ctor) {
  return new ctor();;
};

$.AssertionError$0 = function() {
  return new $.AssertionError();
};

$._newWorker = function(url) {
  return new Worker(url);;
};

$.defaultCanContinue = function(_this, performer, target) {
  $.propertyTypeCheck(_this, 'is$CombatMoveType');
  $.propertyTypeCheck(performer, 'is$Actor');
  $.propertyTypeCheck(target, 'is$Actor');
  return true;
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.toInt$0();
  if ($.isNaN(receiver) === true) throw $.captureStackTrace($.BadNumberFormatException$1('NaN'));
  if ($.isInfinite(receiver) === true) throw $.captureStackTrace($.BadNumberFormatException$1('Infinity'));
  var truncated = $.truncate(receiver);
  return (truncated == -0.0) ? 0 : truncated;
};

$._EventLoop$0 = function() {
  var t1 = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(t1, ({E: '_IsolateEvent'}));
  return new $._EventLoop(t1);
};

$.Message$Start$0 = function() {
  return new $.Message((void 0), (void 0), (void 0), 16);
};

$._WebSocketEventsImpl$1 = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) throw $.captureStackTrace($.IndexOutOfRangeException$1(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.collectionToString = function(c) {
  $.listSuperNativeTypeCheck(c, 'is$Collection');
  var result = $.StringBufferImpl$1('');
  $._emitCollection(c, result, $.List((void 0)));
  return result.toString$0();
};

$.KeyValuePair$2 = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.MetaInfo$3 = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.CombatCallback$2 = function(_this, _key) {
  var t1 = new $.CombatCallback(_key, _this, (void 0));
  t1.CombatCallback$2(_this, _key);
  return t1;
};

$._MediaStreamEventsImpl$1 = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$._NativeJsSendPort$2 = function(_receivePort, isolateId) {
  $.intTypeCheck(isolateId);
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.defineProperty = function(obj, property, value) {
  $.stringTypeCheck(property);
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});;
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f === (void 0)) && (!!f.methods)) {
    return f.methods;
  }
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC18)[name$]);
  if (!(dartMethod === (void 0))) methods['Object'] = dartMethod;
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.print = function(obj) {
  return $.printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.countBits = function(x) {
  if (x !== (x | 0)) return $.countBits$bailout(x, 1, x);
  for (var count = 0; $.gtB(x, 0); count = $.intTypeCheck($.add(count, 1))) {
    var x = $.intTypeCheck($.and(x, $.sub(x, 1)));
  }
  return count;
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a / b) : $.div$slow(a, b);
};

$._startIsolate2 = function(topLevel, replyTo) {
  $.functionTypeCheck(topLevel);
  $.propertyTypeCheck(replyTo, 'is$SendPort');
  $._fillStatics($._globalState().get$currentContext());
  $._port = $.ReceivePort();
  replyTo.send$2('spawned', $.port().toSendPort$0());
  topLevel.$call$0();
};

$._callInIsolate = function(isolate, function$) {
  $.propertyTypeCheck(isolate, 'is$_IsolateContext');
  $.functionTypeCheck(function$);
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.stringFromCharCodes = function(charCodes) {
  for (var t1 = $.iterator(charCodes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (!((typeof t2 === 'number') && (t2 === (t2 | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(t2));
  }
  return String.fromCharCode.apply((void 0), charCodes);
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true) return receiver.addAll$1(collection);
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true; ) {
    $.add$1(receiver, iterator.next$0());
  }
};

$.objectToString = function(object) {
  var name$ = $.stringTypeCheck($.constructorNameFallback(object));
  if ($.eqB(name$, 'Object')) {
    var decompiled = (String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]);
    if (typeof decompiled === 'string') {
      name$ = decompiled;
    }
  }
  return 'Instance of \'' + $.S($.charCodeAt(name$, 0) === 36 ? $.stringTypeCheck($.substring$1(name$, 1)) : name$) + '\'';
};

$.indexOf2 = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf2$bailout(a, element, startIndex, endIndex, 1, a, 0);
  $.listTypeCheck(a);
  $.intTypeCheck(startIndex);
  $.intTypeCheck(endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) var startIndex = 0;
  $.intTypeCheck(startIndex);
  if (startIndex !== (startIndex | 0)) return $.indexOf2$bailout(a, element, startIndex, endIndex, 2, a, startIndex);
  var i = startIndex;
  for (; $.ltB(i, endIndex); i = $.intTypeCheck($.add(i, 1))) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$._firstProbe = function(hashCode, length$) {
  $.intTypeCheck(hashCode);
  $.intTypeCheck(length$);
  return $.and(hashCode, $.sub(length$, 1));
};

$._hexDigit = function(x) {
  $.intTypeCheck(x);
  return $.ltB(x, 10) ? $.add(48, x) : $.add(87, x);
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(newLength));
    if (newLength < 0) throw $.captureStackTrace($.IndexOutOfRangeException$1(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else receiver.set$length(newLength);
  return newLength;
};

$.randomly = function(choices) {
  $.listTypeCheck(choices);
  var number = $.numTypeCheck($.get$length(choices));
  if ($.eqB(number, 0)) throw $.captureStackTrace($.ExceptionImplementation$1('Cannot randomly choose from an empty set.'));
  var portionSize = $.div(1.0, number);
  return $.index(choices, $.intTypeCheck($.toInt($.floor($.div($.doubleTypeCheck($.random()), portionSize)))));
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a > b;
  }
  return a.operator$gt$1(b);
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.stringTypeCheck($.constructorNameFallback(obj));
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument')) return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent')) return 'MessageEvent';
  return name$;
};

$.indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf$bailout(a, element, startIndex, endIndex, 1, a, 0);
  $.listTypeCheck(a);
  $.intTypeCheck(startIndex);
  $.intTypeCheck(endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) var startIndex = 0;
  $.intTypeCheck(startIndex);
  if (startIndex !== (startIndex | 0)) return $.indexOf$bailout(a, element, startIndex, endIndex, 2, a, startIndex);
  var i = startIndex;
  for (; $.ltB(i, endIndex); i = $.intTypeCheck($.add(i, 1))) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.forEach$1(f);
  return $.forEach2(receiver, f);
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver & 0x1FFFFFFF;
  }
  if (!(typeof receiver === 'string')) return receiver.hashCode$0();
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; $.ltB(i, length$); i = $.intTypeCheck($.add(i, 1))) {
    hash = $.and(536870911, $.add(hash, (receiver.charCodeAt(i))));
    hash = (536870911 & hash + ((524287 & hash) >>> 0 << 10)) >>> 0;
    hash = $.intTypeCheck((hash ^ $.shr(hash, 6)) >>> 0);
  }
  hash = $.and(536870911, $.add(hash, ($.and(67108863, hash) << 3)));
  hash = $.intTypeCheck((hash ^ $.shr(hash, 11)) >>> 0);
  return $.and(536870911, $.add(hash, ($.and(16383, hash) << 15)));
};

$._spawnWorker = function(factoryName, serializedReplyPort) {
  var worker = $._newWorker($._thisScript());
  worker.set$onmessage(new $.Closure95(worker));
  var t1 = $._globalState();
  var workerId = t1.get$nextManagerId();
  t1.set$nextManagerId($.add(workerId, 1));
  worker.set$id(workerId);
  $.indexSet($._globalState().get$managers(), workerId, worker);
  worker.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'start', 'id', workerId, 'replyTo', serializedReplyPort, 'factoryName', factoryName])));
};

$.makeLiteralMap = function(keyValuePairs) {
  $.listTypeCheck(keyValuePairs);
  var iterator = $.propertyTypeCheck($.iterator(keyValuePairs), 'is$Iterator');
  var result = $.callTypeCheck($.LinkedHashMapImplementation$0(), 'is$Map');
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2($.stringTypeCheck(iterator.next$0()), iterator.next$0());
  }
  return result;
};

$.min = function(a, b) {
  $.numTypeCheck(a);
  $.numTypeCheck(b);
  var c = $.intTypeCheck($.compareTo(a, b));
  if ($.eqB(c, 0)) return a;
  if ($.ltB(c, 0)) {
    if (typeof b === 'number' && $.isNaN(b) === true) return b;
    return a;
  }
  if (typeof a === 'number' && $.isNaN(a) === true) return a;
  return b;
};

$.forEach2 = function(iterable, f) {
  $.listSuperNativeTypeCheck(iterable, 'is$Iterable');
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.createFromCharCodes = function(charCodes) {
  $.listTypeCheck(charCodes);
  $.checkNull(charCodes);
  if ($.isJsArray(charCodes) !== true) {
    if (!((typeof charCodes === 'object') && (((charCodes.constructor === Array) || charCodes.is$List2())))) throw $.captureStackTrace($.IllegalArgumentException$1(charCodes));
    var charCodes0 = $.List$from(charCodes);
    var charCodes = charCodes0;
  }
  return $.stringFromCharCodes(charCodes);
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.intTypeCheck($.get$length(other));
  if ($.gtB(length$, receiver.length)) return false;
  return other == receiver.substring(0, length$);
};

$.lastIndexOf = function(a, element, startIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.lastIndexOf$bailout(a, element, startIndex, 1, a, 0);
  $.listTypeCheck(a);
  $.intTypeCheck(startIndex);
  if ($.ltB(startIndex, 0)) return -1;
  if ($.geB(startIndex, a.length)) var startIndex = a.length - 1;
  $.intTypeCheck(startIndex);
  if (startIndex !== (startIndex | 0)) return $.lastIndexOf$bailout(a, element, startIndex, 2, a, startIndex);
  var i = startIndex;
  for (; $.geB(i, 0); i = $.intTypeCheck($.sub(i, 1))) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.Combat$0 = function() {
  var t1 = new $.Combat((void 0), (void 0), (void 0), 0, 0, (void 0), false, false, false, (void 0), $.CTC7, (void 0));
  t1.GameEntity$0();
  t1.Combat$0();
  return t1;
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string')) return receiver.trim$0();
  return receiver.trim();
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  $.stringTypeCheck(name$);
  $.listTypeCheck(arguments$);
  var tag = $.stringTypeCheck($.getTypeNameOf(obj));
  var method = (methods[tag]);
  if (method === (void 0) && !($._dynamicMetadata2() === (void 0))) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata2())); i = $.intTypeCheck($.add(i, 1))) {
      var entry = $.propertyTypeCheck($.index($._dynamicMetadata2(), i), 'is$MetaInfo');
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method === (void 0))) break;
      }
    }
  }
  if (method === (void 0)) {
    method = (methods['Object']);
  }
  var proto = (Object.getPrototypeOf(obj));
  if (method === (void 0)) {
    method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  }
  var nullCheckMethod = (function() {var res = method.apply(this, Array.prototype.slice.call(arguments));return res === null ? (void 0) : res;});
  (!proto.hasOwnProperty(name$)) && $.defineProperty(proto, name$, nullCheckMethod);
  return nullCheckMethod.apply(obj, arguments$);
};

$._MessagePortEventsImpl$1 = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$.forEach3 = function(iterable, f) {
  $.listSuperNativeTypeCheck(iterable, 'is$Iterable');
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$._waitForPendingPorts = function(message, callback) {
  var t1 = ({});
  t1.callback_1 = callback;
  var finder = $._PendingSendPortFinder$0();
  finder.traverse$1(message);
  $.wait(finder.ports).then$1(new $.Closure81(t1));
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) return $.typeNameInChrome;
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC17) === true) return $.typeNameInChrome;
  if ($.contains$1(userAgent, 'Firefox') === true) return $.typeNameInFirefox;
  if ($.contains$1(userAgent, 'MSIE') === true) return $.typeNameInIE;
  return $.constructorNameFallback;
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a ^ b) >>> 0;
  }
  return a.operator$xor$1(b);
};

$.boolTypeCheck = function(value) {
  if (value === (void 0)) return value;
  if (typeof value === 'boolean') {
    return value;
  }
  throw $.captureStackTrace($.TypeError$1($.S(value) + ' does not implement bool'));
};

$._ElementEventsImpl$1 = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.propertyTypeCheck = function(value, property) {
  if (value === (void 0)) return value;
  if (!!value[property]) return value;
  $.propertyTypeError(value, property);
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string')) return receiver.toLowerCase$0();
  return receiver.toLowerCase();
};

$._doSort = function(a, left, right, compare) {
  $.listTypeCheck(a);
  $.intTypeCheck(left);
  $.intTypeCheck(right);
  if ($.leB($.sub(right, left), 32)) $.insertionSort_(a, left, right, compare);
  else $._dualPivotQuicksort(a, left, right, compare);
};

$.toDouble = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.toDouble$0();
  return receiver;
};

$.parseDouble = function(str) {
  $.stringTypeCheck(str);
  return $.parseDouble2(str);
};

$.List = function(length$) {
  $.intTypeCheck(length$);
  return $.newList(length$);
};

$.parseDouble2 = function(str) {
  $.stringTypeCheck(str);
  $.checkString(str);
  var ret = (parseFloat(str));
  if (ret === 0) {
    var t1 = $.startsWith(str, '0x') === true || $.startsWith(str, '0X') === true;
  } else t1 = false;
  if (t1) {
    ret = (parseInt(str));
  }
  if ($.isNaN(ret) === true && !$.eqB(str, 'NaN') && !$.eqB(str, '-NaN')) throw $.captureStackTrace($.BadNumberFormatException$1(str));
  return ret;
};

$._spawnFunction = function(topLevelFunction) {
  var name$ = $._getJSFunctionName(topLevelFunction);
  if ($.eqNullB(name$)) throw $.captureStackTrace($.UnsupportedOperationException$1('only top-level functions can be spawned.'));
  return $._spawn2(name$, (void 0), false);
};

$._isPowerOfTwo = function(x) {
  $.intTypeCheck(x);
  return $.eq($.and(x, $.sub(x, 1)), 0);
};

$.CombatCallbackHandler$1 = function(_this) {
  var t1 = new $.CombatCallbackHandler((void 0), _this);
  t1.CombatCallbackHandler$1(_this);
  return t1;
};

$._XMLHttpRequestUploadEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.captureStackTrace = function(ex) {
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.indexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver) === true || typeof receiver === 'string') return $.indexOf$2(receiver, element, 0);
  return receiver.indexOf$1(element);
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      return a[key];
    }
  }
  return $.index$slow(a, index);
};

$.StackOverflowException$0 = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b);
    return a === b;
  }
  return a === b;
};

$.HashMapImplementation$0 = function() {
  var t1 = new $.HashMapImplementation((void 0), (void 0), (void 0), (void 0), (void 0));
  t1.HashMapImplementation$0();
  return t1;
};

$.sort = function(receiver, compare) {
  if ($.isJsArray(receiver) !== true) return receiver.sort$1(compare);
  $.checkMutable(receiver, 'sort');
  $.sort2(receiver, compare);
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, (void 0));
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a / b;
  }
  return a.operator$div$1(b);
};

$.StringBufferImpl$1 = function(content$) {
  var t1 = new $.StringBufferImpl((void 0), (void 0));
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.some3 = function(iterable, f) {
  $.listSuperNativeTypeCheck(iterable, 'is$Iterable');
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    if (f.$call$1(t1.next$0()) === true) return true;
  }
  return false;
};

$.sort2 = function(a, compare) {
  $.listTypeCheck(a);
  $._doSort(a, 0, $.sub($.get$length(a), 1), compare);
};

$._SharedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b) === true;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target === (void 0))) target.builtin$typeInfo = typeInfo;
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var a = (a);
    var b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$1(b));
    if (b > 31) return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$._getJSConstructorFromName = function(factoryName) {
  $.stringTypeCheck(factoryName);
      return $globalThis[factoryName];
  ;
};

$.document = function() {
  return document;;
};

$._FileWriterEventsImpl$1 = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.FutureNotCompleteException$0 = function() {
  return new $.FutureNotCompleteException();
};

$.NoSuchMethodException$4 = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  $.stringTypeCheck(_functionName);
  $.listTypeCheck(_arguments);
  $.listTypeCheck(existingArgumentNames);
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b);
};

$._thisScript = function() {
  return $thisScriptUrl;
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) {
    return ex.dartException;
  }
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$0();
      return $.NullPointerException$2((void 0), $.CTC);
    }
    if ($.eqB(type, 'undefined_method')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$0();
      return $.NoSuchMethodException$4('', name$, [], (void 0));
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true) return $.NullPointerException$2((void 0), $.CTC);
      if ($.endsWith(message, 'is not a function') === true) return $.NoSuchMethodException$4('', '<unknown>', [], (void 0));
    }
    return $.ExceptionImplementation$1(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) return $.StackOverflowException$0();
    return $.IllegalArgumentException$1('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') return $.StackOverflowException$0();
  }
  return ex;
};

$.Storyline$0 = function() {
  var t1 = new $.Storyline((void 0), (void 0));
  t1.Storyline$0();
  return t1;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf === (void 0)) $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.$call$1(obj);
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a - b) : $.sub$slow(a, b);
};

$.resolveRandoms$bailout = function(str, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      str = env0;
      break;
    case 2:
      str = env0;
      startTagIndex = env1;
      break;
    case 3:
      str = env0;
      indexes = env1;
      startTagIndex = env2;
      i = env3;
      break;
    case 4:
      depth = env0;
      indexes = env1;
      i = env2;
      str = env3;
      startTagIndex = env4;
      lastIndex = env5;
      break;
    case 5:
      depth = env0;
      indexes = env1;
      i = env2;
      str = env3;
      startTagIndex = env4;
      ch = env5;
      break;
    case 6:
      startTagIndex = env0;
      str = env1;
      indexes = env2;
      i = env3;
      depth = env4;
      break;
    case 7:
      indexes = env0;
      i = env1;
      str = env2;
      startTagIndex = env3;
      depth = env4;
      break;
    case 8:
      indexes = env0;
      str = env1;
      startTagIndex = env2;
      depth = env3;
      lastIndex = env4;
      i = env5;
      break;
    case 9:
      lastIndex = env0;
      str = env1;
      indexes = env2;
      startTagIndex = env3;
      endTagIndex = env4;
      break;
    case 10:
      endTagIndex = env0;
      indexes = env1;
      lastIndex = env2;
      str = env3;
      startTagIndex = env4;
      numOptions = env5;
      break;
    case 11:
      endTagIndex = env0;
      indexes = env1;
      numOptions = env2;
      lastIndex = env3;
      str = env4;
      startTagIndex = env5;
      t1 = env6;
      break;
    case 12:
      endTagIndex = env0;
      indexes = env1;
      lastIndex = env2;
      str = env3;
      startTagIndex = env4;
      choice = env5;
      break;
    case 13:
      strBuf = env0;
      endTagIndex = env1;
      indexes = env2;
      choice = env3;
      lastIndex = env4;
      str = env5;
      t2 = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.stringTypeCheck(str);
      var startTagIndex = $.intTypeCheck($.indexOf$1(str, '{'));
    case 2:
      state = 0;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
      if (state == 3 || state == 4 || state == 5 || state == 6 || state == 7 || state == 8 || state == 9 || state == 10 || state == 11 || state == 12 || state == 13 || (state == 0 && (!$.eqB(startTagIndex, -1) && $.ltB(startTagIndex, $.sub($.get$length(str), 1))))) {
        switch (state) {
          case 0:
            var indexes = $.List((void 0));
            $.setRuntimeTypeInfo(indexes, ({E: 'int'}));
            indexes.push(startTagIndex);
            var i = $.intTypeCheck($.add(startTagIndex, 1));
          case 3:
            state = 0;
            var depth = 1;
            var lastIndex = (void 0);
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            L0: while (true) {
              switch (state) {
                case 0:
                case 4:
                  state = 0;
                  var endTagIndex = (void 0);
                  if (!$.ltB(i, $.get$length(str))) break L0;
                  var ch = $.stringTypeCheck($.index(str, i));
                case 5:
                  state = 0;
                case 6:
                case 7:
                  if (state == 6 || (state == 0 && $.eqB(ch, '{'))) {
                    switch (state) {
                      case 0:
                        depth = $.intTypeCheck($.add(depth, 1));
                      case 6:
                        state = 0;
                    }
                  } else {
                    switch (state) {
                      case 0:
                      case 7:
                        if ((state == 0 && ($.eqB(ch, '|') && $.eqB(depth, 1)))) {
                          indexes.push(i);
                        } else {
                          switch (state) {
                            case 0:
                            case 7:
                              if (state == 7 || (state == 0 && $.eqB(ch, '}'))) {
                                switch (state) {
                                  case 0:
                                    depth = $.intTypeCheck($.sub(depth, 1));
                                  case 7:
                                    state = 0;
                                    if ($.eqB(depth, 0)) {
                                      indexes.push(i);
                                      endTagIndex = i;
                                      lastIndex = endTagIndex;
                                      break L0;
                                    }
                                }
                              }
                          }
                        }
                    }
                  }
                  lastIndex = i;
                  i = $.intTypeCheck($.add(i, 1));
                case 8:
                  state = 0;
              }
            }
          case 9:
            state = 0;
            var numOptions = $.intTypeCheck(indexes.length - 1);
          case 10:
            state = 0;
          case 11:
          case 12:
          case 13:
            if (state == 11 || state == 12 || state == 13 || (state == 0 && $.gtB(numOptions, 1))) {
              switch (state) {
                case 0:
                  var t1 = $.random();
                case 11:
                  state = 0;
                  var choice = $.intTypeCheck($.toInt($.floor($.mul(t1, numOptions))));
                case 12:
                  state = 0;
                  var strBuf = $.propertyTypeCheck($.StringBufferImpl$1(''), 'is$StringBuffer');
                  strBuf.add$1($.substring$2(str, 0, startTagIndex));
                  if (choice !== (choice | 0)) throw $.iae(choice);
                  t1 = indexes.length;
                  if (choice < 0 || choice >= t1) throw $.ioore(choice);
                  var t2 = indexes[choice];
                case 13:
                  state = 0;
                  t2 = $.add(t2, 1);
                  var t3 = $.add(choice, 1);
                  if (t3 !== (t3 | 0)) throw $.iae(t3);
                  var t4 = indexes.length;
                  if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
                  strBuf.add$1($.resolveRandoms($.stringTypeCheck($.substring$2(str, t2, indexes[t3]))));
                  strBuf.add$1($.substring$2(str, $.add(endTagIndex, 1), $.get$length(str)));
                  if ($.eqB(lastIndex, $.sub($.get$length(str), 1))) return strBuf.toString$0();
                  return $.resolveRandoms(strBuf.toString$0());
              }
            } else {
              if ($.eqB(lastIndex, $.sub($.get$length(str), 1))) return str;
              return $.S($.substring$2(str, 0, $.add(lastIndex, 1))) + $.S($.resolveRandoms($.substring$1(str, $.add(lastIndex, 1))));
            }
        }
      } else {
        return str;
      }
  }
};

$.stringReplaceAllUnchecked$bailout = function(receiver, from, to, state, env0, env1, env2) {
  switch (state) {
    case 1:
      receiver = env0;
      break;
    case 2:
      receiver = env0;
      result = env1;
      length$ = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      if (state == 2 || (state == 0 && typeof from === 'string')) {
        switch (state) {
          case 0:
          case 2:
            if (state == 2 || (state == 0 && from === '')) {
              switch (state) {
                case 0:
                case 2:
                  if ((state == 0 && $.eqB(receiver, ''))) {
                    return to;
                  } else {
                    switch (state) {
                      case 0:
                        var result = $.propertyTypeCheck($.StringBufferImpl$1(''), 'is$StringBuffer');
                        var length$ = $.intTypeCheck($.get$length(receiver));
                      case 2:
                        state = 0;
                        result.add$1(to);
                        var i = 0;
                        L0: while (true) {
                          if (!$.ltB(i, length$)) break L0;
                          result.add$1($.index(receiver, i));
                          result.add$1(to);
                          i = $.intTypeCheck($.add(i, 1));
                        }
                        return result.toString$0();
                    }
                  }
              }
            } else {
              return $.stringReplaceJS(receiver, $.regExpMakeNative($.propertyTypeCheck($.JSSyntaxRegExp$3((from.replace($.regExpMakeNative($.propertyTypeCheck($.CTC9, 'is$RegExp'), true), "\\$&")), false, false), 'is$RegExp'), true), to);
            }
        }
      } else {
        if (typeof from === 'object' && !!from.is$JSSyntaxRegExp) {
          return $.stringReplaceJS(receiver, $.regExpMakeNative(from, true), to);
        }
        $.checkNull(from);
        throw $.captureStackTrace('StringImplementation.replaceAll(Pattern) UNIMPLEMENTED');
      }
  }
};

$.indexOf2$bailout = function(a, element, startIndex, endIndex, state, env0, env1) {
  switch (state) {
    case 1:
      a = env0;
      break;
    case 2:
      a = env0;
      startIndex = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.listTypeCheck(a);
      $.intTypeCheck(startIndex);
      $.intTypeCheck(endIndex);
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) var startIndex = 0;
      $.intTypeCheck(startIndex);
    case 2:
      state = 0;
      var i = startIndex;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) return i;
        i = $.intTypeCheck($.add(i, 1));
      }
      return -1;
  }
};

$.indexOf$bailout = function(a, element, startIndex, endIndex, state, env0, env1) {
  switch (state) {
    case 1:
      a = env0;
      break;
    case 2:
      a = env0;
      startIndex = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.listTypeCheck(a);
      $.intTypeCheck(startIndex);
      $.intTypeCheck(endIndex);
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) var startIndex = 0;
      $.intTypeCheck(startIndex);
    case 2:
      state = 0;
      var i = startIndex;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) return i;
        i = $.intTypeCheck($.add(i, 1));
      }
      return -1;
  }
};

$._dualPivotQuicksort$bailout = function(a, left, right, compare, state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10) {
  switch (state) {
    case 1:
      a = env0;
      break;
    case 2:
      el2 = env0;
      a = env1;
      index1 = env2;
      el4 = env3;
      index5 = env4;
      less = env5;
      break;
    case 3:
      el2 = env0;
      a = env1;
      less = env2;
      index1 = env3;
      index5 = env4;
      el4 = env5;
      great = env6;
      break;
    case 4:
      index5 = env0;
      less = env1;
      k = env2;
      a = env3;
      el4 = env4;
      t1 = env5;
      great = env6;
      index1 = env7;
      ak = env8;
      el2 = env9;
      comp = env10;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.listTypeCheck(a);
      $.intTypeCheck(left);
      $.intTypeCheck(right);
      $.assert($.gt($.sub(right, left), 32));
      var sixth = $.intTypeCheck($.tdiv($.add($.sub(right, left), 1), 6));
      var index1 = $.intTypeCheck($.add(left, sixth));
      var index5 = $.intTypeCheck($.sub(right, sixth));
      var index3 = $.intTypeCheck($.tdiv($.add(left, right), 2));
      var index2 = $.intTypeCheck($.sub(index3, sixth));
      var index4 = $.intTypeCheck($.add(index3, sixth));
      var el1 = $.index(a, index1);
      var el2 = $.index(a, index2);
      var el3 = $.index(a, index3);
      var el4 = $.index(a, index4);
      var el5 = $.index(a, index5);
      if ($.gtB(compare.$call$2(el1, el2), 0)) {
        var t0 = el1;
        el1 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.$call$2(el1, el3), 0)) {
        t0 = el3;
        el3 = el1;
        el1 = t0;
      }
      if ($.gtB(compare.$call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el1, el4), 0)) {
        t0 = el1;
        el1 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.$call$2(el3, el4), 0)) {
        t0 = el3;
        el3 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.$call$2(el2, el5), 0)) {
        t0 = el5;
        el5 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      $.indexSet(a, index1, el1);
      $.indexSet(a, index3, el3);
      $.indexSet(a, index5, el5);
      $.indexSet(a, index2, $.index(a, left));
      $.indexSet(a, index4, $.index(a, right));
      var less = $.intTypeCheck($.add(left, 1));
    case 2:
      state = 0;
      var great = $.intTypeCheck($.sub(right, 1));
    case 3:
      state = 0;
      var t1 = $.boolTypeCheck($.eq(compare.$call$2(el2, el4), 0)) === true;
    case 4:
      if (state == 4 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            var k = less;
          case 4:
            L0: while (true) {
              switch (state) {
                case 0:
                  if (!$.leB(k, great)) break L0;
                case 4:
                  c$0:{
                    switch (state) {
                      case 0:
                        var ak = $.index(a, k);
                        var comp = $.intTypeCheck(compare.$call$2(ak, el2));
                      case 4:
                        state = 0;
                        if ($.eqB(comp, 0)) break c$0;
                        if ($.ltB(comp, 0)) {
                          if (!$.eqB(k, less)) {
                            $.indexSet(a, k, $.index(a, less));
                            $.indexSet(a, less, ak);
                          }
                          less = $.intTypeCheck($.add(less, 1));
                        } else {
                          L1: while (true) {
                            if (!true) break L1;
                            c$1:{
                              comp = $.intTypeCheck(compare.$call$2($.index(a, great), el2));
                              if ($.gtB(comp, 0)) {
                                great = $.intTypeCheck($.sub(great, 1));
                                break c$1;
                              } else {
                                if ($.ltB(comp, 0)) {
                                  $.indexSet(a, k, $.index(a, less));
                                  var less0 = $.intTypeCheck($.add(less, 1));
                                  $.indexSet(a, less, $.index(a, great));
                                  var great0 = $.intTypeCheck($.sub(great, 1));
                                  $.indexSet(a, great, ak);
                                  great = great0;
                                  less = less0;
                                  break;
                                } else {
                                  $.indexSet(a, k, $.index(a, great));
                                  great0 = $.intTypeCheck($.sub(great, 1));
                                  $.indexSet(a, great, ak);
                                  great = great0;
                                  break;
                                }
                              }
                            }
                          }
                        }
                    }
                  }
                  k = $.intTypeCheck($.add(k, 1));
              }
            }
        }
      } else {
        k = less;
        L2: while (true) {
          if (!$.leB(k, great)) break L2;
          ak = $.index(a, k);
          if ($.ltB($.intTypeCheck(compare.$call$2(ak, el2)), 0)) {
            if (!$.eqB(k, less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            less = $.intTypeCheck($.add(less, 1));
          } else {
            if ($.gtB($.intTypeCheck(compare.$call$2(ak, el4)), 0)) {
              L3: while (true) {
                if (!true) break L3;
                c$1:{
                  if ($.gtB($.intTypeCheck(compare.$call$2($.index(a, great), el4)), 0)) {
                    great = $.intTypeCheck($.sub(great, 1));
                    if ($.ltB(great, k)) break;
                    break c$1;
                  } else {
                    if ($.ltB($.intTypeCheck(compare.$call$2($.index(a, great), el2)), 0)) {
                      $.indexSet(a, k, $.index(a, less));
                      less0 = $.intTypeCheck($.add(less, 1));
                      $.indexSet(a, less, $.index(a, great));
                      great0 = $.intTypeCheck($.sub(great, 1));
                      $.indexSet(a, great, ak);
                      great = great0;
                      less = less0;
                    } else {
                      $.indexSet(a, k, $.index(a, great));
                      great0 = $.intTypeCheck($.sub(great, 1));
                      $.indexSet(a, great, ak);
                      great = great0;
                    }
                    break;
                  }
                }
              }
            }
          }
          k = $.intTypeCheck($.add(k, 1));
        }
      }
      $.indexSet(a, left, $.index(a, $.sub(less, 1)));
      $.indexSet(a, $.sub(less, 1), el2);
      $.indexSet(a, right, $.index(a, $.add(great, 1)));
      $.indexSet(a, $.add(great, 1), el4);
      $._doSort(a, left, $.sub(less, 2), compare);
      $._doSort(a, $.add(great, 2), right, compare);
      if (t1) return;
      if ($.ltB(less, index1) && $.gtB(great, index5)) {
        L4: while (true) {
          if (!$.eqB(compare.$call$2($.index(a, less), el2), 0)) break L4;
          less = $.intTypeCheck($.add(less, 1));
        }
        L5: while (true) {
          if (!$.eqB(compare.$call$2($.index(a, great), el4), 0)) break L5;
          great = $.intTypeCheck($.sub(great, 1));
        }
        k = less;
        L6: while (true) {
          if (!$.leB(k, great)) break L6;
          ak = $.index(a, k);
          if ($.eqB($.intTypeCheck(compare.$call$2(ak, el2)), 0)) {
            if (!$.eqB(k, less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            less = $.intTypeCheck($.add(less, 1));
          } else {
            if ($.eqB($.intTypeCheck(compare.$call$2(ak, el4)), 0)) {
              L7: while (true) {
                if (!true) break L7;
                c$1:{
                  if ($.eqB($.intTypeCheck(compare.$call$2($.index(a, great), el4)), 0)) {
                    great = $.intTypeCheck($.sub(great, 1));
                    if ($.ltB(great, k)) break;
                    break c$1;
                  } else {
                    if ($.ltB($.intTypeCheck(compare.$call$2($.index(a, great), el2)), 0)) {
                      $.indexSet(a, k, $.index(a, less));
                      less0 = $.intTypeCheck($.add(less, 1));
                      $.indexSet(a, less, $.index(a, great));
                      great0 = $.intTypeCheck($.sub(great, 1));
                      $.indexSet(a, great, ak);
                      great = great0;
                      less = less0;
                    } else {
                      $.indexSet(a, k, $.index(a, great));
                      great0 = $.intTypeCheck($.sub(great, 1));
                      $.indexSet(a, great, ak);
                      great = great0;
                    }
                    break;
                  }
                }
              }
            }
          }
          k = $.intTypeCheck($.add(k, 1));
        }
        $._doSort(a, less, great, compare);
      } else $._doSort(a, less, great, compare);
  }
};

$.allMatchesInStringUnchecked$bailout = function(needle, haystack, state, env0, env1, env2) {
  switch (state) {
    case 1:
      length$ = env0;
      result = env1;
      patternLength = env2;
      break;
  }
  switch (state) {
    case 0:
      $.stringTypeCheck(needle);
      $.stringTypeCheck(haystack);
      var result = $.List((void 0));
      $.setRuntimeTypeInfo(result, ({E: 'Match'}));
      var length$ = $.intTypeCheck($.get$length(haystack));
      var patternLength = $.intTypeCheck($.get$length(needle));
    case 1:
      state = 0;
      var startIndex = 0;
      L0: while (true) {
        if (!true) break L0;
        var position = $.intTypeCheck($.indexOf$2(haystack, needle, startIndex));
        if ($.eqB(position, -1)) break;
        result.push($.StringMatch$3(position, haystack, needle));
        var endIndex = $.intTypeCheck($.add(position, patternLength));
        if ($.eqB(endIndex, length$)) break;
        else {
          startIndex = $.eqB(position, endIndex) ? $.intTypeCheck($.add(startIndex, 1)) : endIndex;
        }
      }
      return result;
  }
};

$.wait$bailout = function(futures, state, env0) {
  switch (state) {
    case 1:
      futures = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.listTypeCheck(futures);
      var t1 = ({});
      if ($.isEmpty(futures) === true) {
        t1 = $.FutureImpl$immediate($.CTC);
        $.setRuntimeTypeInfo(t1, ({T: 'List'}));
        return t1;
      }
      var completer = $.CompleterImpl$0();
      $.setRuntimeTypeInfo(completer, ({T: 'List'}));
      t1.completer_3 = $.propertyTypeCheck(completer, 'is$Completer');
      t1.result_4 = $.propertyTypeCheck(t1.completer_3.get$future(), 'is$Future');
      t1.remaining_5 = $.intTypeCheck($.get$length(futures));
      t1.values_6 = $.List($.get$length(futures));
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, $.get$length(futures))) break L0;
        var t2 = ({});
        t2.pos_1 = i;
        var future = $.propertyTypeCheck($.index(futures, t2.pos_1), 'is$Future');
        future.then$1(new $.Closure82(t2, t1));
        future.handleException$1(new $.Closure83(t1));
        i = $.intTypeCheck($.add(i, 1));
      }
      return t1.result_4;
  }
};

$.insertionSort_$bailout = function(a, left, right, compare, state, env0, env1, env2) {
  switch (state) {
    case 1:
      a = env0;
      break;
    case 2:
      a = env0;
      left = env1;
      break;
    case 3:
      a = env0;
      left = env1;
      i = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.listTypeCheck(a);
    case 2:
      state = 0;
      $.intTypeCheck(left);
      $.intTypeCheck(right);
      var i = $.intTypeCheck($.add(left, 1));
    case 3:
      state = 0;
      L0: while (true) {
        if (!$.leB(i, right)) break L0;
        var el = $.index(a, i);
        var j = i;
        L1: while (true) {
          if (!($.gtB(j, left) && $.gtB(compare.$call$2($.index(a, $.sub(j, 1)), el), 0))) break L1;
          $.indexSet(a, j, $.index(a, $.sub(j, 1)));
          j = $.intTypeCheck($.sub(j, 1));
        }
        $.indexSet(a, j, el);
        i = $.intTypeCheck($.add(i, 1));
      }
  }
};

$.countBits$bailout = function(x, state, env0) {
  switch (state) {
    case 1:
      x = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.intTypeCheck(x);
      var count = 0;
      L0: while (true) {
        if (!$.gtB(x, 0)) break L0;
        var x = $.intTypeCheck($.and(x, $.sub(x, 1)));
        count = $.intTypeCheck($.add(count, 1));
      }
      return count;
  }
};

$.getRange2$bailout = function(a, start, length$, accumulator, state, env0, env1) {
  switch (state) {
    case 1:
      end = env0;
      break;
    case 2:
      end = env0;
      start = env1;
      break;
  }
  switch (state) {
    case 0:
      $.listTypeCheck(a);
      $.intTypeCheck(start);
      $.intTypeCheck(length$);
      $.listTypeCheck(accumulator);
      if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$1('length'));
      if ($.ltB(start, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
      var end = $.intTypeCheck($.add(start, length$));
    case 1:
      state = 0;
      if ($.gtB(end, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
      $.intTypeCheck(start);
    case 2:
      state = 0;
      var i = start;
      L0: while (true) {
        if (!$.ltB(i, end)) break L0;
        $.add$1(accumulator, $.index(a, i));
        i = $.intTypeCheck($.add(i, 1));
      }
      return accumulator;
  }
};

$.lastIndexOf2$bailout = function(a, element, startIndex, state, env0, env1) {
  switch (state) {
    case 1:
      a = env0;
      break;
    case 2:
      a = env0;
      startIndex = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.listTypeCheck(a);
      $.intTypeCheck(startIndex);
      if ($.ltB(startIndex, 0)) return -1;
      if ($.geB(startIndex, $.get$length(a))) {
        var startIndex = $.intTypeCheck($.sub($.get$length(a), 1));
      }
      $.intTypeCheck(startIndex);
    case 2:
      state = 0;
      var i = startIndex;
      L0: while (true) {
        if (!$.geB(i, 0)) break L0;
        if ($.eqB($.index(a, i), element)) return i;
        i = $.intTypeCheck($.sub(i, 1));
      }
      return -1;
  }
};

$.lastIndexOf$bailout = function(a, element, startIndex, state, env0, env1) {
  switch (state) {
    case 1:
      a = env0;
      break;
    case 2:
      a = env0;
      startIndex = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.listTypeCheck(a);
      $.intTypeCheck(startIndex);
      if ($.ltB(startIndex, 0)) return -1;
      if ($.geB(startIndex, $.get$length(a))) {
        var startIndex = $.intTypeCheck($.sub($.get$length(a), 1));
      }
      $.intTypeCheck(startIndex);
    case 2:
      state = 0;
      var i = startIndex;
      L0: while (true) {
        if (!$.geB(i, 0)) break L0;
        if ($.eqB($.index(a, i), element)) return i;
        i = $.intTypeCheck($.sub(i, 1));
      }
      return -1;
  }
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.defaultOnSufferDodge.$call$2 = $.defaultOnSufferDodge;
$.defaultOnSufferDodge.$name = "defaultOnSufferDodge";
$.defaultOnAlmostDying.$call$1 = $.defaultOnAlmostDying;
$.defaultOnAlmostDying.$name = "defaultOnAlmostDying";
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.createScripter.$call$0 = $.createScripter;
$.createScripter.$name = "createScripter";
$.defaultOnSufferPierced.$call$2 = $.defaultOnSufferPierced;
$.defaultOnSufferPierced.$name = "defaultOnSufferPierced";
$.defaultOnStart.$call$2 = $.defaultOnStart;
$.defaultOnStart.$name = "defaultOnStart";
$.defaultOnHit.$call$2 = $.defaultOnHit;
$.defaultOnHit.$name = "defaultOnHit";
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.defaultOnSufferDeflect.$call$2 = $.defaultOnSufferDeflect;
$.defaultOnSufferDeflect.$name = "defaultOnSufferDeflect";
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
$.defaultOnSufferMeetWeapon.$call$2 = $.defaultOnSufferMeetWeapon;
$.defaultOnSufferMeetWeapon.$name = "defaultOnSufferMeetWeapon";
$.defaultOnCancel.$call$2 = $.defaultOnCancel;
$.defaultOnCancel.$name = "defaultOnCancel";
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.invokeClosure.$call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.defaultOnSufferBlock.$call$2 = $.defaultOnSufferBlock;
$.defaultOnSufferBlock.$name = "defaultOnSufferBlock";
$.defaultOnDie.$call$1 = $.defaultOnDie;
$.defaultOnDie.$name = "defaultOnDie";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC11 = Isolate.makeConstantList(['', '<subject> get<s> to <subjectPronoun\'s> knees', '<subject> stand<s> up', '<subject> regain<s> some balance', '<subject\'s> stance gets firm', '<subject> go<es> into a perfect combat stance']);
$.CTC12 = Isolate.makeConstantList(['<subject> fall<s> to the ground', '<subject> fall<s> to <subjectPronoun\'s> knees', '<subject> <is> almost ready to fall', '<subject> get<s> off balance', '<subject> lose<s> <subjectPronoun\'s> professional stance', '']);
$.CTC14 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC5 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC13 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$');
$.CTC17 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC18 = new Isolate.$isolateProperties.Object();
$.CTC7 = new Isolate.$isolateProperties.Pronoun('itself', 'its', 'it', 'it');
$.CTC15 = new Isolate.$isolateProperties.UnsupportedOperationException('TODO(jacobr): should we impl?');
$.CTC4 = new Isolate.$isolateProperties.JsonUnsupportedObjectType();
$.CTC3 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC10 = new Isolate.$isolateProperties.Pronoun('himself', 'his', 'him', 'he');
$.CTC8 = new Isolate.$isolateProperties.Pronoun('yourself', 'your', 'you', 'you');
$.CTC16 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC9 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '[-[\\]{}()*+?.,\\\\^$|#\\s]');
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC6 = new Isolate.$isolateProperties.EmptyQueueException();
$.SHORT_TIME = 4;
$.VERY_LONG_TIME = 1000;
$._port = (void 0);
$._getTypeNameOf = (void 0);
$._cachedBrowserPrefix = (void 0);
$._nextFreeId = 1;
$.tokens = (void 0);
$.GLOBAL_HASH_I = 0;
$._idCount = 0;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$Event', function() { return false; });
$.defineProperty(Object.prototype, 'is$ParagraphElement', function() { return false; });
$.defineProperty(Object.prototype, 'is$_StyleSheetImpl', function() { return false; });
$.defineProperty(Object.prototype, 'is$File', function() { return false; });
$.defineProperty(Object.prototype, 'is$_TouchImpl', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$_NodeImpl', function() { return false; });
$.defineProperty(Object.prototype, 'is$_ElementImpl', function() { return false; });
$.defineProperty(Object.prototype, 'is$_FileImpl', function() { return false; });
$.defineProperty(Object.prototype, 'is$LIElement', function() { return false; });
$.defineProperty(Object.prototype, 'is$Iterable', function() { return false; });
$.defineProperty(Object.prototype, 'is$List2', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$StyleSheet', function() { return false; });
$.defineProperty(Object.prototype, 'is$Touch', function() { return false; });
$.defineProperty(Object.prototype, 'is$Node', function() { return false; });
$.defineProperty(Object.prototype, 'is$Element', function() { return false; });
$.defineProperty(Object.prototype, 'is$AnchorElement', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  $.functionTypeCheck(handler);
  $.intTypeCheck(timeout);
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
  return this.postMessage(msg);;
 },
 set$onmessage: function(f) {
  this.onmessage = f;;
 },
 set$id: function(i) {
  this.id = i;;
 },
 get$id: function() {
  return this.id;;
 }
});

$.$defineNativeClass('AbstractWorker', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', ["type?", "target=", "name?"], {
 toString$0: function() {
  return this.toString();
 },
 is$AnchorElement: function() { return true; },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('WebKitAnimation', ["name?", "duration?"], {
});

$.$defineNativeClass('WebKitAnimationEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["name?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', ["target="], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('Attr', ["value=", "name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('AudioBuffer', ["length?", "duration?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["value=", "name?"], {
});

$.$defineNativeClass('AudioProcessingEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', ["target="], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$1(this);
 }
});

$.$defineNativeClass('BeforeLoadEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('BiquadFilterNode', ["type?"], {
});

$.$defineNativeClass('Blob', ["type?"], {
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$1(this);
 },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "type?", "name?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('CDATASection', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', ["f?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSRule', ["type?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
 },
 filter$1: function(arg0) { return this.get$filter().$call$1(arg0); },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 getPropertyValue$1: function(propertyName) {
  $.stringTypeCheck(propertyName);
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSStyleSheet', [], {
 is$StyleSheet: function() { return true; }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('CharacterData', ["length?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

$.$defineNativeClass('CloseEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('Comment', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('CompositionEvent', [], {
 is$Event: function() { return true; }
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.time$1 = function(title) {
  $.stringTypeCheck(title);
  return this.time(title);
 };
_ConsoleImpl.get$time = function() { return new $.Closure104(this, 'time$1'); };
$.$defineNativeClass('HTMLContentElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('CustomEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('DOMApplicationCache', [], {
 update$0: function() {
  return this.update();
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$1(this);
 }
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeType', ["type?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["name?", "length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', ["type?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  $.stringTypeCheck(string);
  return this.contains(string);
 },
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.stringTypeCheck(element);
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.stringTypeCheck(element);
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.stringTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.stringTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.stringTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 remove$1: function(token) {
  $.stringTypeCheck(token);
  return this.remove(token);
 },
 contains$1: function(token) {
  $.stringTypeCheck(token);
  return this.contains(token);
 },
 add$1: function(token) {
  $.stringTypeCheck(token);
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItem', ["type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  $.stringTypeCheck(type);
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  $.listTypeCheck(messagePorts);
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', [], {
 send$1: function(text) {
  $.stringTypeCheck(text);
  return this.send(text);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('DeviceMotionEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('DeviceOrientationEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', [], {
 query$1: function(selectors) {
  $.stringTypeCheck(selectors);
  if ($.CTC3.hasMatch$1(selectors) === true) return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
 },
 $dom_querySelector$1: function(selectors) {
  $.stringTypeCheck(selectors);
  return this.querySelector(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  $.stringTypeCheck(elementId);
  return this.getElementById(elementId);
 },
 get$on: function() {
  return $._DocumentEventsImpl$1(this);
 },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  $.stringTypeCheck(selectors);
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$1(this);
 },
 set$id: function(value) {
  $.stringTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('ID can\'t be set for document fragments.'));
 },
 click$0: function() {
 },
 get$click: function() { return new $.Closure101(this, 'click$0'); },
 get$parent: function() {
  return;
 },
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
 },
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
 },
 get$id: function() {
  return '';
 },
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
    $.stringTypeCheck(value);
  $.clear(this.get$nodes());
  var e = $.Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }
 },
 query$1: function(selectors) {
  $.stringTypeCheck(selectors);
  return this.$dom_querySelector$1(selectors);
 },
 get$elements: function() {
  if ($.eqNullB(this._elements)) this._elements = $.FilteredElementList$1(this);
  return this._elements;
 },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('DocumentType', ["name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('Element', ["innerHTML!", "id="], {
 $dom_querySelector$1: function(selectors) {
  $.stringTypeCheck(selectors);
  return this.querySelector(selectors);
 },
 get$$$dom_lastElementChild: function() {
  return this.lastElementChild;;
 },
 get$$$dom_firstElementChild: function() {
  return this.firstElementChild;;
 },
 click$0: function() {
  return this.click();
 },
 get$click: function() { return new $.Closure101(this, 'click$0'); },
 get$$$dom_children: function() {
  return this.children;;
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 query$1: function(selectors) {
  $.stringTypeCheck(selectors);
  return this.$dom_querySelector$1(selectors);
 },
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
    return $._ChildrenElementList$_wrap$1(this);
  } else {
    return Object.prototype.get$elements.call(this);
  }
 },
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
    $.listSuperNativeTypeCheck(value, 'is$Collection');
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
  } else {
    return Object.prototype.set$elements.call(this, value);
  }
 },
 is$_ElementImpl: function() { return true; },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', ["type?", "name?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('Entity', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('EntityReference', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('Entry', ["name?"], {
 remove$2: function(successCallback, errorCallback) {
  $.functionTypeCheck(successCallback);
  $.functionTypeCheck(errorCallback);
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
 },
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 remove$0: function() {
  return this.remove();
 }
});

$.$defineNativeClass('ErrorEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('Event', ["type?", "target?"], {
 stopPropagation$0: function() {
  return this.stopPropagation();
 },
 get$stopPropagation: function() { return new $.Closure101(this, 'stopPropagation$0'); },
 is$Event: function() { return true; }
});

$.$defineNativeClass('EventException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$1(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["type?", "name?", "lib$_FieldSetElementImpl$elements?"], {
 get$elements: function() {
  return this.lib$_FieldSetElementImpl$elements;
 },
 set$elements: function(x) {
  this.lib$_FieldSetElementImpl$elements = x;
 },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('File', ["name?"], {
 is$_FileImpl: function() { return true; },
 is$File: function() { return true; }
});

$.$defineNativeClass('FileException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$File');
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$File');
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$File');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$File');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_FileImpl');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileReaderEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriter', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileWriterEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.numTypeCheck(element);
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.numTypeCheck(element);
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.numTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.numTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.numTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.numTypeCheck(element);
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.numTypeCheck(element);
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.numTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.numTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.numTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["target=", "name?", "length?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', ["name?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$1(this);
 },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLHRElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Node');
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Node');
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$Node');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$Node');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_NodeImpl');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 remove$1: function(index) {
  $.intTypeCheck(index);
  return this.remove(index);
 },
 set$length: function(value) {
  $.intTypeCheck(value);
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('HashChangeEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('IDBCursor', ["key?"], {
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBDatabaseEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBTransactionEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBVersionChangeEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', ["name?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', ["name?"], {
 complete$1: function(arg0) { return this.complete.$call$1(arg0); },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["value=", "type?", "pattern?", "name?"], {
 get$on: function() {
  return $._InputElementEventsImpl$1(this);
 },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.intTypeCheck(element);
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.intTypeCheck(element);
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.intTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.intTypeCheck(element);
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.intTypeCheck(element);
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.intTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.intTypeCheck(element);
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.intTypeCheck(element);
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.intTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$1(this);
 }
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?"], {
});

$.$defineNativeClass('KeyboardEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('HTMLKeygenElement', ["type?", "name?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value=", "type?"], {
 is$LIElement: function() { return true; },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', ["type?", "target="], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMapElement', ["name?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', [], {
 start$0: function() {
  return this.start();
 },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('MediaController', ["duration?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', ["duration?"], {
 get$on: function() {
  return $._MediaElementEventsImpl$1(this);
 },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('MediaKeyEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.stringTypeCheck(element);
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.stringTypeCheck(element);
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.stringTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.stringTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.stringTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('MediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$1(this);
 }
});

$.$defineNativeClass('MediaStreamEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('MessagePort', [], {
 start$0: function() {
  return this.start();
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 postMessage$2: function(message, messagePorts) {
  $.stringTypeCheck(message);
  $.listTypeCheck(messagePorts);
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLMetaElement', ["name?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('MouseEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('MutationEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('MutationRecord', ["type?", "target?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Node');
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Node');
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$Node');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$Node');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_NodeImpl');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  $.callTypeCheck(newChild, 'is$_NodeImpl');
  $.callTypeCheck(oldChild, 'is$_NodeImpl');
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_removeChild$1: function(oldChild) {
  $.callTypeCheck(oldChild, 'is$_NodeImpl');
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  $.callTypeCheck(other, 'is$_NodeImpl');
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  $.callTypeCheck(newChild, 'is$_NodeImpl');
  return this.appendChild(newChild);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 set$text: function(value) {
  $.stringTypeCheck(value);
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 get$$$dom_childNodes: function() {
  return this.childNodes;;
 },
 replaceWith$1: function(otherNode) {
  $.callTypeCheck(otherNode, 'is$Node');
  try {
    var parent$ = $.callTypeCheck(this.get$parent(), 'is$_NodeImpl');
    parent$.$dom_replaceChild$2(otherNode, this);
  } catch (exception) {
    $.unwrapException(exception);
  }
  return this;
 },
 remove$0: function() {
  if (!$.eqNullB(this.get$parent())) {
    $.callTypeCheck(this.get$parent(), 'is$_NodeImpl').$dom_removeChild$1(this);
  }
  return this;
 },
 get$nodes: function() {
  return $._ChildNodeListLazy$1(this);
 },
 is$_NodeImpl: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $._NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 get$first: function() {
  return this.operator$index$1(0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Node');
  $.intTypeCheck(start);
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,0)
},
 indexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Node');
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter3(this, [], f));
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_NodeImpl');
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !$.eqNullB(result) && this._parent.$dom_removeChild$1(result);
  return result;
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    this._parent.$dom_appendChild$1(t2);
  }
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$_NodeImpl');
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$_NodeImpl');
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Notation', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('Notification', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLOListElement', ["type?"], {
 start$0: function() { return this.start.$call$0(); },
 start$1: function(arg0) { return this.start.$call$1(arg0); },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["type?", "name?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('OfflineAudioCompletionEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('Oscillator', ["type?"], {
});

$.$defineNativeClass('HTMLOutputElement', ["value=", "type?", "name?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('OverflowEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('PageTransitionEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$ParagraphElement: function() { return true; },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["value=", "type?", "name?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('PeerConnection00', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$1(this);
 }
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('PopStateEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('HTMLPreElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('ProcessingInstruction', ["target?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('ProgressEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', ["target?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 set$id: function(value) {
  $.stringTypeCheck(value);
  this.id = value;;
 },
 get$id: function() {
  return this.id;;
 },
 set$innerHTML: function(svg) {
  $.stringTypeCheck(svg);
  var container = $.Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.S(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
 },
 set$elements: function(value) {
  $.listSuperNativeTypeCheck(value, 'is$Collection');
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
 },
 get$elements: function() {
  return $.FilteredElementList$1(this);
 },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$1(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["type?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', ["type?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGLineElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGMatrix', ["f?"], {
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPatternElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPolygonElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGRectElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', ["type?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', ["type?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTransform', ["type?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGZoomEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('HTMLScriptElement', ["type?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "type?", "name?", "length="], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["lib$_ShadowRootImpl$innerHTML!"], {
 get$innerHTML: function() {
  return this.lib$_ShadowRootImpl$innerHTML;
 },
 set$innerHTML: function(x) {
  this.lib$_ShadowRootImpl$innerHTML = x;
 },
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLSourceElement', ["type?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 start$0: function() {
  return this.start();
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$1(this);
 }
});

$.$defineNativeClass('SpeechRecognitionEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  $.stringTypeCheck(key);
  $.stringTypeCheck(data);
  return this.setItem(key,data);
 },
 $dom_removeItem$1: function(key) {
  $.stringTypeCheck(key);
  return this.removeItem(key);
 },
 $dom_key$1: function(index) {
  $.intTypeCheck(index);
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  $.stringTypeCheck(key);
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return $.eqNull(this.$dom_key$1(0));
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $.Closure85(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $.Closure35(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if ($.eqNullB(key)) return;
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 remove$1: function(key) {
  $.stringTypeCheck(key);
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
 },
 operator$indexSet$2: function(key, value) {
  $.stringTypeCheck(key);
  $.stringTypeCheck(value);
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  $.stringTypeCheck(key);
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  $.stringTypeCheck(key);
  return !$.eqNullB(this.$dom_getItem$1(key));
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('HTMLStyleElement', ["type?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('StyleMedia', ["type?"], {
});

$.$defineNativeClass('StyleSheet', ["type?"], {
 is$_StyleSheetImpl: function() { return true; },
 is$StyleSheet: function() { return true; }
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$StyleSheet');
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$StyleSheet');
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$StyleSheet');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$StyleSheet');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_StyleSheetImpl');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('Text', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "type?", "name?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('TextEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('TextTrack', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!", "id="], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackListEventsImpl$1(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
 start$1: function(index) {
  $.intTypeCheck(index);
  return this.start(index);
 }
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('Touch', ["target?"], {
 is$_TouchImpl: function() { return true; },
 is$Touch: function() { return true; }
});

$.$defineNativeClass('TouchEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Touch');
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.callTypeCheck(element, 'is$Touch');
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$Touch');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$Touch');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_TouchImpl');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('TrackEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('WebKitTransitionEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('UIEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('HTMLUListElement', ["type?"], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.intTypeCheck(element);
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.intTypeCheck(element);
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.intTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.intTypeCheck(element);
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.intTypeCheck(element);
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.intTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 lastIndexOf$2: function(element, start) {
  $.intTypeCheck(element);
  $.intTypeCheck(start);
  if (start === (void 0)) {
    var start = $.intTypeCheck($.sub($.get$length(this), 1));
  }
  return $.lastIndexOf2(this, element, start);
 },
 lastIndexOf$1: function(element) {
  return this.lastIndexOf$2(element,(void 0))
},
 indexOf$2: function(element, start) {
  $.intTypeCheck(element);
  $.intTypeCheck(start);
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $.some3(this, f);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  $.listSuperNativeTypeCheck(collection, 'is$Collection');
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.intTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', [], {
 is$Element: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["type?", "name?"], {
});

$.$defineNativeClass('WebGLContextEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
});

$.$defineNativeClass('WebSocket', [], {
 send$1: function(data) {
  $.stringTypeCheck(data);
  return this.send(data);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$2: function(code, reason) {
  $.intTypeCheck(code);
  $.stringTypeCheck(reason);
  return this.close(code,reason);
 },
 close$0: function() {
  return this.close();
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$1(this);
 }
});

$.$defineNativeClass('WheelEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('DOMWindow', ["navigator?", "name?", "length?"], {
 setTimeout$2: function(handler, timeout) {
  $.functionTypeCheck(handler);
  $.intTypeCheck(timeout);
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WindowEventsImpl$1(this);
 }
});

$.$defineNativeClass('Worker', [], {
 terminate$0: function() {
  return this.terminate();
 },
 postMessage$2: function(message, messagePorts) {
  $.listTypeCheck(messagePorts);
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._WorkerEventsImpl$1(this);
 }
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 setTimeout$2: function(handler, timeout) {
  $.functionTypeCheck(handler);
  $.intTypeCheck(timeout);
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequest', [], {
 send$1: function(data) {
  return this.send(data);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestProgressEvent', [], {
 is$Event: function() { return true; }
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  $.stringTypeCheck(type);
  $.functionTypeCheck(listener);
  $.boolTypeCheck(useCapture);
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$1(this);
 }
});

$.$defineNativeClass('XPathException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$1(this);
 }
});

// 344 dynamic classes.
// 361 classes
// 33 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_TextImpl)*/ = 'Text|CDATASection|CDATASection';
  var v2/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v3/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v4/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v5/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v6/*class(_SVGElementImpl)*/ = [v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v7/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v8/*class(_UIEventImpl)*/ = 'UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent';
  var v9/*class(_ProgressEventImpl)*/ = 'ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent';
  var v10/*class(_ElementImpl)*/ = [v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v11/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v12/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v13/*class(_CharacterDataImpl)*/ = [v1/*class(_TextImpl)*/,v1/*class(_TextImpl)*/,'CharacterData|Comment|Comment'].join('|');
  var v14/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v15/*class(_NodeImpl)*/ = [v10/*class(_ElementImpl)*/,v11/*class(_DocumentFragmentImpl)*/,v12/*class(_DocumentImpl)*/,v13/*class(_CharacterDataImpl)*/,v10/*class(_ElementImpl)*/,v11/*class(_DocumentFragmentImpl)*/,v12/*class(_DocumentImpl)*/,v13/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v16/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v17/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v18/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGGradientElement', v3/*class(_SVGGradientElementImpl)*/],
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v2/*class(_SVGTextContentElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet|CSSStyleSheet'],
    ['Text', v1/*class(_TextImpl)*/],
    ['UIEvent', v8/*class(_UIEventImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AbstractWorker', v18/*class(_AbstractWorkerImpl)*/],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', v14/*class(_WorkerContextImpl)*/],
    ['Blob', 'Blob|File|File'],
    ['CSSRule', 'CSSRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v13/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v12/*class(_DocumentImpl)*/],
    ['DocumentFragment', v11/*class(_DocumentFragmentImpl)*/],
    ['SVGComponentTransferFunctionElement', v4/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v5/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v6/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v7/*class(_MediaElementImpl)*/],
    ['Element', v10/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['ProgressEvent', v9/*class(_ProgressEventImpl)*/],
    ['Event', [v8/*class(_UIEventImpl)*/,v9/*class(_ProgressEventImpl)*/,v8/*class(_UIEventImpl)*/,v9/*class(_ProgressEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechInputEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechInputEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v15/*class(_NodeImpl)*/],
    ['MediaStream', v16/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v17/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v14/*class(_WorkerContextImpl)*/,v15/*class(_NodeImpl)*/,v16/*class(_MediaStreamImpl)*/,v17/*class(_IDBRequestImpl)*/,v18/*class(_AbstractWorkerImpl)*/,v14/*class(_WorkerContextImpl)*/,v15/*class(_NodeImpl)*/,v16/*class(_MediaStreamImpl)*/,v17/*class(_IDBRequestImpl)*/,v18/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.$call$0 = $.main
if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.startRootIsolate($.main);
  });
} else {
  $.startRootIsolate($.main);
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var collected in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, collected)) {
      var desc = collectedClasses[collected];
      Isolate.$defineClass(collected, desc.super, desc[''], desc);
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (prototype.__proto__) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
