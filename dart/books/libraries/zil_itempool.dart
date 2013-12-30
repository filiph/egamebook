part of zil;

class ItemPool implements ZilSaveable {
  final Zil _zil;
  List<Item> items = new List<Item>();
  
  ItemPool(this._zil);
  void add(Item item) {
    items.add(item);
  }

  Map<String, dynamic> toMap() => {
    "items": items.map((item) => item.toMap()).toList()
  };

  void updateFromMap(Map<String, dynamic> map) {
    List<Map<String,dynamic>> list = map["items"];
    assert(list.length == items.length);
    for (int i = 0; i < items.length; i++) {
      items[i].updateFromMap(list[i]);
    }
  }
}