import 'dart:async';
import 'dart:html';

Future<Null> awaitAnimationFrame() async {
  await window.animationFrame;
}