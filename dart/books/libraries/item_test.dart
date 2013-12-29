import 'package:unittest/unittest.dart';
import 'item.dart';

void main() {
  test("create item", () {
    var rock = new Item("rock");
    expect(rock.name, "rock");
    expect(rock.location, null);
    expect(rock.active, true);
  });
  test("items are accessible as a set", () {
    var rock = new Item("rock", location: "Start");
    var stick = new Item("stick", location: "Start");
    var leaf = new Item("leaf", location: "Start");
    var television = new Item("television", location: "Someplace");
    
    var all = Item.getAll();
    expect(all, unorderedEquals([rock, stick, leaf, television]));
    
    var allInStart = Item.getAllIn("Start");
    expect(allInStart, unorderedEquals([rock, stick, leaf]));
  });
  test("only active items are accessible by default", () {
    var rock = new Item("rock", location: "Start");
    var stick = new Item("stick", location: "Start", active: false);
    var leaf = new Item("leaf", location: "Start");
    var television = new Item("television", location: "Someplace");
    
    var allActiveInStart = Item.getAllIn("Start");
    expect(allActiveInStart, unorderedEquals([rock, leaf]));
    
    var allInStart = Item.getAllIn("Start", onlyActive: false);
    expect(allInStart, unorderedEquals([rock, leaf, stick]));
  });
  test("all in player possession", () {
    var rock = new Item("rock", location: Item.PLAYER_POSESSION);
    var stick = new Item("stick", location: Item.PLAYER_POSESSION, 
        active: false);
    var leaf = new Item("leaf", location: "Start");
    var television = new Item("television", location: "Someplace");
    
    var allActiveInPlayerPosession = Item.getAllIn(Item.PLAYER_POSESSION);
    expect(allActiveInPlayerPosession, unorderedEquals([rock]));
    
    var allInPlayerPosession = Item.getAllIn(Item.PLAYER_POSESSION,
        onlyActive: false);
    expect(allInPlayerPosession, unorderedEquals([rock, stick]));
    
  });
}