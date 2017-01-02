# Edgehead

> "Skyrim, if it was Choose-Your-Own-Adventure, but still allowed the same
> freedom."

## Development

### Testing

Run `pub run test` or setup your IDE for continuous unit testing.

Also included are long-running tests that are skipped by default. Some of these
tests are "fuzzy" -- meaning that they will try to play the game randomly until
completion or error. 

Run all the tests, including the long-running ones, using this command:

    pub run --checked test --run-skipped

#### Playing on the command line

For a more hands-on approach, you can manually play on the command line.
This is not meant to be pretty, but it's faster than in the browser.
Run `dart bin/play.dart` if you just want to play. But consider using the
following command to also log progress and catch more bugs through checked mode:

    dart -c bin/play.dart --log

The log is in `edgehead.log`.