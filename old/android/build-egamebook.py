import os, glob
import markdown

path = '/Users/filiph/Programs/eGameBook/thin ice/'
html_path = os.path.join(path,'html/')

html_header = """<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>eGameBook.com</title>
	<style>
		div#matrioska {
			width: 400px;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 100px;
			font-family: Garamond, serif;
			text-align: justify;
		}
	</style>
</head>

<body>
<div id="matrioska">
"""

html_footer = """
</div>
</body>
</html>
"""


for infile in glob.glob( os.path.join(path, '*.markdown') ): #iterate over all *.markdown files in path
	print("current file is: " + infile)
	outfile = os.path.join(html_path, os.path.basename(infile)[:-9] + ".html") # create new .html filename in subdirectory
	print outfile
	fo = open(infile, "r")
	fw = open(outfile, "w")
	stxt = fo.read()
	shtml = markdown.markdown(stxt) # convert markdown syntax into HTML
	fw.write(html_header) # header
	fw.write(shtml) # body
	fw.write(html_footer) # footer (endtags)
	fw.close()
	fo.close()

print("done")