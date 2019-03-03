import 'dart:async';

import 'src/animation_frame_interface.dart'
    if (dart.library.html) 'src/animation_frame_html.dart'
    if (dart.library.io) 'src/animation_frame_io.dart';

/// On the web, returns a Future that completes just before the window is about
/// to repaint so the user can draw an animation frame. Outside of the web,
/// returns a Future that completes in the next event-loop iteration.
Future<void> animationFrame() => awaitAnimationFrame();

/// On the web, returns a Future that completes just after an animation frame
/// was drawn. Outside of the web, this merely waits about 5 milliseconds before
/// completing.
Future<void> idleCallback() => awaitIdleCallback();
