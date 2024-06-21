# egamebook_builder [![Build status](https://github.com/filiph/egamebook/actions/workflows/dart.yml/badge.svg)](https://github.com/filiph/egamebook/actions/workflows/dart.yml)

A library of builders intended for [egamebook.com][] projects.

[egamebook.com]: https://egamebook.com

## Installation

Add `egamebook_builder` to your dependencies and run `pub get`.

Then, just use the annotations mentioned below and run 
`dart run build_runner build` (or `dart run build_runner watch` for continuous
rebuilding).

## Writer's builder

This builder will take text files written in the specific egamebook
format and will compile them into a single Dart file.

For examples of the format, look at [`edgehead/assets/text`][examples].

[examples]: https://github.com/filiph/egamebook/tree/master/edgehead/assets/text

In order for this builder to work, your `build.yaml` file must include
something like the following:

```yaml
targets:
  $default:
    sources:
      # This ensures that builders can act on the text files
      # from which you want to compile.
      - assets/**
      # These are the defaults. You can drop either 
      # if you don't need them. 
      - lib/**
      - web/**
    builders:
      egamebook_builder|writers_builder:
        # This is where you tell the builder which Dart file to use for setup.
        generate_for: ['lib/writers_input.dart']
``` 

You also need a Dart file (like `lib/writers_input.dart` above) with contents
such as this:

```dart
@GatherWriterInputFrom(const ['assets/text/**/*'])
library writers_input;

import 'package:egamebook_builder/writers_builder.dart';
```

The `'assets/text/**/*'` part gives the builder a glob pattern to use to find
the text files. This particular one tells the builder to use all files
in any subdirectory of the `assets/text` directory of the package.

## Instance serialization

For `built_value`, you might want to have top-level objects serialized
and deserialized by reference. 

```dart
// file: my_file_gather.dart

part 'my_file_gather.gathered.dart';

@GatherInstancesFrom(['lib/src/fight/**/actions/*.dart'],
    additionalTypes: [OtherActorAction, EnemyTargetAction])
final InstanceSerializer<Action> actionSerializer = _$actionSerializer;
```

The code above will tell `egamebook_builder` to create a part file
named `my_file_gather.gathered.dart` that contains a single top-level
variable called `_$actionSerializer`. This variable will be 
an InstanceSerializer of type `Action` (and its subtypes `OtherActorAction`
and `EnemyTargetAction`). It will gather all instances of type `Action`
(and its subtypes) from all files which satisfy the glob
`lib/src/fight/**/actions/*.dart`.

This means that you can now start writing actions in the specified
directory paths and they will be automatically picked up and added
to the serializer. Now you don't need to think about adding each
action to a list.

You can use the auto-generated serializer by adding it to the
`built_value` serializers, like so: 

```dart
@SerializersFor([
  // ...
])
final Serializers serializers = (_$serializers.toBuilder()
      ..add(actionSerializer))
    .build();
```
