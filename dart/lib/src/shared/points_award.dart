library points_award;

/**
 * One PointAward is a bundle of points awarded for something concrete
 * to the player. This is mostly done by something like 
 * [:points.add(5, "bravery"):] and will be presented as "+5 points for
 * bravery".
 */
class PointsAward {
  /// The value of points to be awarded.
  final int addition;
  /// The resulting sum of points after this award.
  final int result;
  /// The (optional) justification for the award.
  final String justification;
  
  PointsAward(this.addition, this.result, [this.justification]);
  
  toString() {
    String s = (addition == 1) ? "" : "s";
    if (justification != null) {
      return "+$addition point$s for $justification";
    } else {
      return "+$addition point$s";
    }
  }
}