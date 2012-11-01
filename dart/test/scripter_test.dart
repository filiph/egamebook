#import('package:unittest/unittest.dart');
#import('dart:io');

String getPath(String filename) {
  var options = new Options();
  var pathToScript = new Path(options.script);
  var pathToFilename = pathToScript.directoryPath
        .join(new Path("files"))
        .join(new Path(filename));
  return pathToFilename.toString();
}

void main() {

  /*group("HTML Entities", () {*/
    /*test("ignores basic ASCII", () {*/
      /*expect(HtmlEntities.toHtml("abcdefg12345 []/?"),*/
        /*equals("abcdefg12345 []/?"));*/
    /*});*/
    /*test("converts single char", () {*/
      /*expect(HtmlEntities.toHtml("φ"),*/
        /*isNot(equals("φ")));*/
    /*});*/
    /*test("converts combination", () {*/
      /*expect(HtmlEntities.toHtml("abcφdef\"g♥12345é []/?"),*/
        /*equals("abc&phi;def&quot;g&hearts;12345&eacute; []/?"));*/
    /*});*/
  /*});*/

}
