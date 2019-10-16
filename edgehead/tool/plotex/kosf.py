# Knights of San Francisco's PlotEx scenario.

from plotex3 import *

class Scenario(ScenarioClass):
    
    # The starting state: player has nothing.
    Start = State()

    # Bleeds.
    ClearGoblinCamp = Once(Chain(Set(goblin_camp_cleared=True,kompakh=True), Increment('_combats', 10)))
    TalkToJisad = Set(knows_kosf_leader=True)
    TalkToTrader = Set(has_business_in_pyramid=True)

    # Lower pyramid.
    EnterPyramid = Chain(HasAny(goblin_camp_cleared=True, knows_kosf_leader=True, has_business_in_pyramid=True), 
    	Set(in_pyramid=True, can_warg=True))

    # TODO: https://youneedawiki.com/app/page/1oEBasjqfhGKk45RXwCmSL2Pwbvc01w7QmSIS2mmtLO8

    # Meet Oracle.

    # BIG-O's TALKING UNDEAD
    GoblinGuardRaisedByBigOJustAfterFight = Once(Increment('_talking_undead', 10))
    FarmerRaisedByBigO = Once(Increment('_talking_undead', 10))
    TwoUndeadRaisedByBigOVisitSleepingPlayer = Once(Increment('_talking_undead', 10))

    # WEAKENINGS.
    # Destroy cockroach farm. (lower enemy health)
    DestroyCockroachFarm = Once(Increment('weakenings', 10))

    # Prevent reinforcements.
    DestroyOrcRopeLadder = Once(Increment('weakenings', 10))
    ReleaseKarl = Once(Increment('weakenings', 10))

    # Prevent weapons.
    SplashPoolAtOrcArmory = Once(Increment('weakenings', 10))

    # UPGRADES
    # Get a shield.
    # Get a katana / cleaving weapon.
    # Learn a new combat skill: decapitate.
    # Learn a new combat skill: slash two at once.
    # Learn "confuse".
    # Learn "combat raise the dead".
    # 

    # Meet Karl.
    

    # Meet Entologists.

    # Meet Deathless.


    # Fight through (Crowd) Source.

    GetDragonEgg = Once(Chain(Has(in_pyramid=True), Increment('_combats', 10), Set(archon_weapon=True)))

    # End game.
    KillBigO = Once(Chain(Has(in_pyramid=True,archon_weapon=True), Increment('_combats', 10), Set(win=True)))

    # Tests.
    TestWinnable = Test(can=Has(win=True))
    TestMustCombatAtLeastFiveTimes = Test(cannot=Has(win=True, _combats=5))
    TestCanUpgradeAtLeastThreeTimes = Test(can=Has(win=True, upgrades=3))
    TestNoNeedToWeakenOrcs = Test(can=Has(win=True, weakenings=0))
    TestCanWeakenOrcs = Test(can=Has(win=True, weakenings=3))
    TestMustSeeTalkingUndeadThreeTimes = Test(cannot=Has(win=True, _talking_undead=3))

    # TODO tests: 
    #   Must see Oracle? (if we actually need that for the story)
    #   Must meet BigO's undead (2 / 3 times?)
    #   Must do one warging?
    #   Must do one necromancy?

    


# This parses and carries out the command-line options, using the Scenario.
shell(Scenario)
