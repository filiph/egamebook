library edgehead.event_callbacks;

import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:egamebook_builder/instance_serializer.dart';

import 'edgehead_event_callbacks.dart';

part 'edgehead_event_callbacks_gather.gathered.dart';

@GatherInstancesFrom(['lib/edgehead_event_callbacks.dart'])
final InstanceSerializer<EventCallback> eventCallbackSerializer =
    _$eventCallbackSerializer;
