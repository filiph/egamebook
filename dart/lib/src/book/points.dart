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

/**
 * The class that lets author add points. [:points:] variable is an instance
 * of this class.
 */
class PointsCounter implements Saveable {
  int _points = 0;
  Queue<PointsAward> pointsAwards;
  
  // TODO: in order to not break possible arithmetics inside scripts
  // the PointsCounter should look like it's adding the points even though
  // it's not.
  int _embargoedPoints;
  
  PointsCounter() {
    pointsAwards = new Queue<PointsAward>();
  }
  
  void add(int value, [String justification]) {
    if (!_pointsEmbargo) {
      _points += value;
      pointsAwards.add(new PointsAward(value, justification));
    }
  }
  
  PointsCounter operator +(int value) {
    add(value);
    return this;
  }
  
  String className = "PointsCounter";
  toMap() => {"points": _points};
  updateFromMap(Map map) {
    _points = map["points"];
    pointsAwards.clear();
  }

  void clear() {
    _points = 0;
    pointsAwards.clear();
  }
}

