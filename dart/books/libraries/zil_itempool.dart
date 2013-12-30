part of zil;

class ItemPool {
  final Zil _zil;
  List<Item> items = new List<Item>();
  
  ItemPool(this._zil);
  void add(Item item) {
    items.add(item);
  }
}