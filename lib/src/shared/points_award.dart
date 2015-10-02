library points_award;

import 'message.dart';

/**
 * One PointsAward is a bundle of points awarded for something concrete
 * to the player. This is mostly done by something like
 * [:points.add(5, "bravery"):] and will be presented as "+5 points for
 * bravery".
 */
class PointsAward {
  /// The value of points to be awarded.
  final int addition;
  /// The resulting sum of points after this award.
  final int result;
  /// The (optional) justification message for the award.
  final String justification;

  /// Creates new PointsAward with number of points awarded in [addition],
  /// resulting sum of points in [result] and optional [justification]
  /// message why the points were awarded.
  PointsAward(this.addition, this.result, [this.justification]);

  /// Returns string representation of PointsAward in format of score
  /// with points in [addition] and optional [justification] message.
  String toString() {
    if (justification != null) {
      return "Score +$addition for $justification.";
    } else {
      return "Score +$addition.";
    }
  }

  /// Returns PointsAward as an [Message].
  Message toMessage() {
    var message = new Message(Message.POINTS_AWARD);
    message.listContent = [addition, result];
    message.strContent = justification;
    return message;
  }

  /// Creates and returns new PointsAward from [Message].
  factory PointsAward.fromMessage(Message message) {
    int addition = message.listContent[0];
    int result = message.listContent[1];
    String justification = message.strContent;
    return new PointsAward(addition, result, justification);
  }
}