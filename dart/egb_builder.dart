#library("egb_builder");

#import('dart:io');

// TODO: convert all non-ASCII characters to HTML entities (&iacute; done, but what about czech chars?)
// TODO: generate a Map<String,int> so that goto("someRoom"); works inside <dart> blocks
// TODO: another region is "initialize" - to init vars["smthing"] so that they're there no matter where you open the gamebook.
// XXX: consolidate all the blocks automatically - classes go to class, functions go to library, everything else goes to init.
// TODO: make it easy to package libraries and import them - importLibrary("FGBE", version:1.0);
// XXX: use markdown block_parser.dart for parsing the text (just line parser is fine)
// XXX: make sure v_something -> vars["something"] doesn't break quotes (like in echo("something v_something");)

class Builder {
  
}
