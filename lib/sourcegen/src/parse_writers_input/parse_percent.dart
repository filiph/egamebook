num parsePercent(String string) {
  assert(
  string.endsWith('%'),
  "String $string doesn't seem to be a valid "
      "percent denomination.");
  var percent = num.parse(string.replaceAll('%', ''));
  return percent / 100;
}