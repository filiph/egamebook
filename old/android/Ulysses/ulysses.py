# This Python file uses the following encoding: utf-8

import os, re

fo_name = "./ULYSSES-modified.html"
html_header = """<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>Ulysses</title>
	<link rel="stylesheet" type="text/css" href="ulysses.css" />
</head>

<body>
"""
html_footer = """</body>
</html>
"""



fo = open(fo_name, "r")
cur_section = 0
fw = open("./html/index.html", "w")

for line in fo:
	m = re.match("<h2>\(Section &mdash; ([0-9]+)\)</h2>", line)
	if m: # new section found
		new_section = int(m.group(1))
		print("New section: %d" % new_section)
		
		#close the old one
		fw.write(html_footer)
		fw.close()
		
		#open the new one
		fw = open("./html/s%d.html" % new_section, "w")
		fw.write(html_header)
	
	fw.write(line)

fo.close()

fw.write(html_footer)
fw.close()