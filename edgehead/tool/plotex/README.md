# PlotEx

This is here to design the quests and vignettes in a way that makes logical
sense. For example, this script verifies that the game is winnable, and that
the player experiences at least a few combat situations before winning.

This assumes that `kosf.py` is kept in sync with the actual game. The PlotEx
representation of the game should be a lot simpler, modeling only the most
important story beats.

The code in `plotex3.py` is coming from 
[Andrew Plotkin's PlotEx project](https://eblong.com/zarf/plotex/)
and is in public domain. Documentation is available
[here](https://eblong.com/zarf/plotex/docs.html).

## Testing

Execute the following command to run all tests:

```sh
python3 kosf.py -T
```

You can provide starting conditions, or disallow actions. Read the script docs
by running `python3 -h`. Output, for convenience:

```
Usage: kosf.py [options]

Options:
  -h, --help            show this help message and exit
  -s STATES, --start=STATES
                        state(s) to begin at (default: Start)
  --startwith=QUALITIES
                        extra boolean quality to add to start states
  --block=ACTIONS       actions to forbid for this run
  --withhold=ACTIONS    actions to hold until last
  -t TESTS, --test=TESTS
                        test(s) to run
  -T, --alltest, --alltests
                        run all tests
  --genlimit=GENLIMIT   maximum number of states to generate
  -m, --showmed         display all intermediate states
  --showin              display actions into each state
  --showout             display actions out of each state
  -a, --showall         combines --showmed --showin --showout
  -d, --diff            display only the differences between the found states
  -c, --count           display only the number of states found
  --graphviz=FILE       create a graphviz (.gv) file
  --graphml=FILE        create a GML (.gml) file
  -f QUALITIES, --filter=QUALITIES
                        display only states containing this quality
  -H ACTIONS, --history=ACTIONS
                        display only states that passed through this action
  --noopt               do not optimize the run based on action type
```


## Listing possible outcomes

You can list all meaningful playthroughs via `python3 kosf.py`.

## Visualizing playthroughs

The tool supports export of playthroughs via the `--graphviz` and `--graphml`
flags.
