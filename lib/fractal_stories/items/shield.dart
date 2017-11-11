import 'package:edgehead/fractal_stories/item.dart';

class Shield extends Item {
  @override
  final String name;

  Shield({this.name: "shield"}) : super(const [ItemType.shield]);

  @override
  List<String> get categories => const ["shield"];

  @override
  int get value => 1;
}
