part of egb_scripter;

/**
 * The class that lets author add points. [:points:] variable is an instance
 * of this class.
 */
class PointsCounter implements Saveable {
  /// Actual sum of points.
  int _points = 0;

  /// Getter returns the current sum of points.
  int get sum => _points;

  /// Queue of points to be awarded.
  Queue<PointsAward> pointsAwards;

  /// Number of embargoed points.
  /// In order to not break possible arithmetics inside scripts the PointsCounter
  /// should look like it's adding the points even though it's not.
  /// TODO
  //  int _embargoedPoints;

  /// Creates new PointsCounter.
  PointsCounter() {
    pointsAwards = new Queue<PointsAward>();
  }

  /// Adds [value] to actual sum of points and adds new [PointsAward] into
  /// [pointsAwards]. It is also possible to include [justification] message.
  void add(int value, [String justification]) {
    if (!_pointsEmbargo) {
      _points += value;
      pointsAwards.add(new PointsAward(value, _points, justification));
    }
  }

  /// Adds [value] to actual sum of points and adds new [PointsAward] into
  /// [pointsAwards].
  PointsCounter operator +(int value) {
    add(value);
    return this;
  }

  /// Class name.
  String className = "PointsCounter";

  /// Returns Map representation of PointsCounter.
  Map toMap() => {"points": _points};

  /// Updates current PointsCounter from a given [map] and clears [pointsAwards].
  void updateFromMap(Map map) {
    _points = map["points"];
    pointsAwards.clear();
  }

  /// Clears whole actual PointsCounter.
  void clear() {
    _points = 0;
    pointsAwards.clear();
  }
}
