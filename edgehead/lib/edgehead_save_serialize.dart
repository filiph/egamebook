import 'dart:convert';

import 'package:edgehead/edgehead_serializers.dart' as edgehead_serializer;
import 'package:edgehead/fractal_stories/world_state.dart';

/// Outputs a savegame, given current [world].
///
/// This is pretty expensive (serialization, JSON encoding).
String serializeWorldState(WorldState world) =>
    json.encode(edgehead_serializer.serializers
        .serializeWith(WorldState.serializer, world));
