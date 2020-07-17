// GENERATED CODE - DO NOT MODIFY BY HAND

part of edgehead.serializers;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializers _$serializers = (new Serializers().toBuilder()
      ..add(ActionHistory.serializer)
      ..add(ActionRecord.serializer)
      ..add(Actor.serializer)
      ..add(Anatomy.serializer)
      ..add(AttackDirection.serializer)
      ..add(AttackerSituation.serializer)
      ..add(BodyPart.serializer)
      ..add(BodyPartDesignation.serializer)
      ..add(BodyPartFunction.serializer)
      ..add(CounterAttackSituation.serializer)
      ..add(CustomEvent.serializer)
      ..add(CustomEventHistory.serializer)
      ..add(DamageCapability.serializer)
      ..add(DefenseSituation.serializer)
      ..add(DirectorCapability.serializer)
      ..add(EdgeheadGlobalState.serializer)
      ..add(Edibility.serializer)
      ..add(FightSituation.serializer)
      ..add(GuardpostAboveChurchTakeShieldRescueSituation.serializer)
      ..add(InkSituation.serializer)
      ..add(Inventory.serializer)
      ..add(Item.serializer)
      ..add(LootSituation.serializer)
      ..add(MoveEntity.serializer)
      ..add(NpcCapability.serializer)
      ..add(OffBalanceOpportunitySituation.serializer)
      ..add(Pose.serializer)
      ..add(Predetermination.serializer)
      ..add(Pronoun.serializer)
      ..add(RoomRoamingSituation.serializer)
      ..add(RuleHistory.serializer)
      ..add(RuleRecord.serializer)
      ..add(Team.serializer)
      ..add(VisitHistory.serializer)
      ..add(VisitRecord.serializer)
      ..add(WeaponType.serializer)
      ..add(WorldState.serializer)
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(BodyPart)]),
          () => new ListBuilder<BodyPart>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(EnemyTargetAction)]),
          () => new ListBuilder<EnemyTargetAction>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(OtherActorAction)]),
          () => new ListBuilder<OtherActorAction>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(EnemyTargetAction)]),
          () => new ListBuilder<EnemyTargetAction>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(OtherActorAction)]),
          () => new ListBuilder<OtherActorAction>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(Item)]),
          () => new ListBuilder<Item>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(Item)]),
          () => new ListBuilder<Item>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(Item)]),
          () => new ListBuilder<Item>())
      ..addBuilderFactory(const FullType(BuiltSet, const [const FullType(int)]),
          () => new SetBuilder<int>())
      ..addBuilderFactory(
          const FullType(BuiltMap,
              const [const FullType(int), const FullType(EventCallback)]),
          () => new MapBuilder<int, EventCallback>())
      ..addBuilderFactory(const FullType(BuiltSet, const [const FullType(int)]),
          () => new SetBuilder<int>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(Item)]),
          () => new ListBuilder<Item>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(int)]),
          () => new ListBuilder<int>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(int)]),
          () => new ListBuilder<int>())
      ..addBuilderFactory(
          const FullType(BuiltListMultimap,
              const [const FullType(String), const FullType(CustomEvent)]),
          () => new ListMultimapBuilder<String, CustomEvent>())
      ..addBuilderFactory(
          const FullType(BuiltListMultimap,
              const [const FullType(String), const FullType(VisitRecord)]),
          () => new ListMultimapBuilder<String, VisitRecord>())
      ..addBuilderFactory(
          const FullType(
              BuiltMap, const [const FullType(int), const FullType(DateTime)]),
          () => new MapBuilder<int, DateTime>())
      ..addBuilderFactory(
          const FullType(
              BuiltMap, const [const FullType(int), const FullType(DateTime)]),
          () => new MapBuilder<int, DateTime>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(ActionRecord)]),
          () => new ListBuilder<ActionRecord>())
      ..addBuilderFactory(
          const FullType(BuiltMap,
              const [const FullType(int), const FullType(RuleRecord)]),
          () => new MapBuilder<int, RuleRecord>())
      ..addBuilderFactory(
          const FullType(BuiltSet, const [const FullType(Actor)]),
          () => new SetBuilder<Actor>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [const FullType(Situation)]),
          () => new ListBuilder<Situation>())
      ..addBuilderFactory(const FullType(BuiltSet, const [const FullType(int)]),
          () => new SetBuilder<int>()))
    .build();

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
