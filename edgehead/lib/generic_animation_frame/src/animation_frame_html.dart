import 'dart:async';
import 'dart:html';

Future<void> awaitAnimationFrame() async {
  await window.animationFrame;
}

Future<void> awaitIdleCallback() async {
  // TODO: actually use window.requestIdleCallback() when available
  await window.animationFrame;
  await Future<void>.delayed(const Duration(milliseconds: 5));
}
