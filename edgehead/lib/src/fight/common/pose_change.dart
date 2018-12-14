

import 'package:edgehead/fractal_stories/actor.dart';

void changeAndReportPose(ActorBuilder a, int difference) {
  final startingPose = a.pose;
  final endingPose = a.pose.changeBy(difference, max: a.poseMax);

  final wasImproved = endingPose > startingPose;
}