part of egb_scripter;

/**
 * One PointAward is a bundle of points awarded for something concrete
 * to the player. This is mostly done by something like 
 * [:points.add(5, "bravery"):] and will be presented as "+5 points for
 * bravery".
 */
class PointsAward {
  final int points;
  final String justification;
  
  PointsAward(this.points, [this.justification]);
}

class PointsCounter implements Saveable {
  int _points = 0;
  List<PointsAward> pointAwards;
  
  // TODO: in order to not break possible arithmetics inside scripts
  // the PointsCounter should look like it's adding the points even though
  // it's not.
  int _embargoedPoints;
  
  PointsCounter() {
    pointAwards = new List<PointsAward>();
  }
  
  void add(int value, [String justification]) {
    if (!_pointsEmbargo) {
      _points += value;
      pointAwards.add(new PointsAward(value, justification));
      print("Points are now at $_points.");
    }
  }
  
  PointsCounter operator +(int value) {
    add(value);
    return this;
  }
  
  toMap() => {"points": _points, "_class": "PointsCounter"};
  updateFromMap(Map map) {
    _points = map["points"];
    pointAwards.clear();
  }

  void clear() {
    _points = 0;
    pointAwards.clear();
  }
}

