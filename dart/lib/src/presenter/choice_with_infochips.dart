library choice_with_infochips;

/**
 * Choice in the format:
 * 
 *     - Fire at hull [~45%] [Laser] [Fire at hull]
 * 
 * Will be shown with chips [:~45%:] and [:Laser:] in the interface. This is
 * an easy way to convey information to the player.
 */
class ChoiceWithInfochips {
  String text;
  List<String> infochips;
  
  ChoiceWithInfochips(String raw) {
    if (raw == null) {
      throw new ArgumentError("Cannot create ChoiceWithInfochips "
          "from a null string.");
    }
    text = raw;
    infochips = new List<String>();
    int level = 0;
    int lastOpenBracketIndex = null;
    bool encounteredFirstChip = false;
    for (int i = 0; i < raw.length; i++) {
      if (raw[i] == "[") {
        if (encounteredFirstChip == false) {
          text = raw.substring(0, i);
          encounteredFirstChip = true;
        }
        level++;
        lastOpenBracketIndex = i;
        continue;
      }
      if (raw[i] == "]") {
        if (level == 1) {  // Ignore brackets that are nested.
          if (i - lastOpenBracketIndex > 1) {
            var chipText = raw.substring(lastOpenBracketIndex + 1, i);
            infochips.add(chipText);
          } else {
            // We encountered a null bracket ("[]").
            if (infochips.isEmpty) {
              text = raw;
            }
          }
        }
        level--;
        continue;
      }
    }
    if (level != 0) {
      // Number of "[" is different from number of "]". Scratch the whole
      // infochips thing to be on the safe side.
      infochips = const [];
      text = raw;
    }
  }
}