// GENERATED CODE - DO NOT MODIFY BY HAND

part of edgehead.serializers;

// **************************************************************************
// Generator: BuiltValueGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line
// ignore_for_file: annotate_overrides
// ignore_for_file: avoid_annotating_with_dynamic
// ignore_for_file: avoid_returning_this
// ignore_for_file: omit_local_variable_types
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first

Serializers _$serializers = (new Serializers().toBuilder()
      ..add(ActionRecord.serializer)
      ..add(Actor.serializer)
      ..add(AttackerSituation.serializer)
      ..add(CounterAttackSituation.serializer)
      ..add(EdgeheadGlobalState.serializer)
      ..add(FightSituation.serializer)
      ..add(GuardpostAboveChurchTakeShieldRescueSituation.serializer)
      ..add(LeapDefenseSituation.serializer)
      ..add(LootSituation.serializer)
      ..add(OffBalanceOpportunitySituation.serializer)
      ..add(OnGroundDefenseSituation.serializer)
      ..add(OnGroundWrestleDefenseSituation.serializer)
      ..add(Pose.serializer)
      ..add(Predetermination.serializer)
      ..add(Pronoun.serializer)
      ..add(PunchDefenseSituation.serializer)
      ..add(RoomRoamingSituation.serializer)
      ..add(SlashDefenseSituation.serializer)
      ..add(Team.serializer)
      ..add(Weapon.serializer)
      ..add(WeaponType.serializer)
      ..add(WorldState.serializer)
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(ActionRecord)]),
          () => new ListBuilder<ActionRecord>())
      ..addBuilderFactory(
          const FullType(BuiltSet, const [const FullType(Actor)]),
          () => new SetBuilder<Actor>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(Situation)]),
          () => new ListBuilder<Situation>())
      ..addBuilderFactory(
          const FullType(
              BuiltList, const [const FullType(EnemyTargetActionBuilder)]),
          () => new ListBuilder<EnemyTargetActionBuilder>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(ItemLike)]),
          () => new ListBuilder<ItemLike>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(int)]),
          () => new ListBuilder<int>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(ItemLike)]),
          () => new ListBuilder<ItemLike>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(int)]),
          () => new ListBuilder<int>())
      ..addBuilderFactory(
          const FullType(BuiltMap,
              const [const FullType(int), const FullType(EventCallback)]),
          () => new MapBuilder<int, EventCallback>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(int)]),
          () => new ListBuilder<int>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(String)]),
          () => new ListBuilder<String>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(Item)]),
          () => new ListBuilder<Item>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(Weapon)]),
          () => new ListBuilder<Weapon>())
      ..addBuilderFactory(const FullType(BuiltSet, const [const FullType(int)]),
          () => new SetBuilder<int>())
      ..addBuilderFactory(const FullType(BuiltSet, const [const FullType(int)]),
          () => new SetBuilder<int>()))
    .build();
