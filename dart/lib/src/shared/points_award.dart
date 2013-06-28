library points_award;

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
  
  toString() {
    String s = (points == 1) ? "" : "s";
    if (justification != null) {
      return "+$points point$s for $justification";
    } else {
      return "+$points point$s";
    }
  }
}