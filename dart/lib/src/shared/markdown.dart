// TODO: use pub package 'markdown' when 
// https://github.com/dpeek/dart-markdown/issues/2 is resolved
/*
 * Copyright (c) 2012 Tom Alexander
 * 
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * 
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 * 
 *    2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 * 
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */
library markdown_parser;

/** 
 * Convert special html characters into code, same as the php function
 * 
 * @param inp The string containing html characters
 * 
 * @return The formatted string
 */
String htmlspecialchars(String inp) {
    return inp.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

class markdown_regex {
    RegExp regex;
    Function callback;
    int start;
    int end;
    String before;
    String after;
    Match found;
    bool has_match;
    Function process_function;
    markdown_regex(RegExp _regex, Function _callback, {Function process: generate_markdown_nodes}) {
        regex = _regex;
        callback = _callback;
        start = -1;
        end = -1;
        has_match = false;
        process_function = process;
    }

    /** 
     * Do all the matching and storing of context variables
     * 
     * @param inp The markdown text to parse
     */
    void populate_variables(String inp) {
        if (regex.hasMatch(inp)) {
            has_match = true;
        } else {
            return;
        }
        found = regex.firstMatch(inp);
        start = found.start;
        end = found.end;
        before = inp.substring(0, start);
        after = inp.substring(end);
    }

    /** 
     * Process the text preceding the match, process the match with its callback, and then process the text following the match
     * 
     * 
     * @return a list of markdown nodes generated
     */
    List<markdown_node> execute() {
        List<markdown_node> ret = new List<markdown_node>();
        if (!has_match)
            return ret;
        
        for (markdown_node cur in process_function(before)) {
            ret.add(cur);
        }
        // call the callback
        ret.add(callback(found));

        for (markdown_node cur in process_function(after)) {
            ret.add(cur);
        }
        return ret;
    }
}

class markdown_node {
    List<markdown_node> children;
    markdown_node() {
        children = new List<markdown_node>();
    }

    String generate_html() {
        return "ERROR: SHOULD BE OVERRIDDEN";
    }
}

class markdown_headline extends markdown_node {
    int level;
    markdown_headline(int _level, String content) : super() {
        level = _level;
        List<markdown_node> subcontent = generate_markdown_emphasis(content);
        for (markdown_node cur in subcontent) {
            children.add(cur);
        }
    }

    String generate_html() {
        String ret = "<h${level}>";
        for (markdown_node cur in children) {
            ret = "${ret}${cur.generate_html()}";
        }
        ret = "${ret}</h${level}>";
        return ret;
    }
}

class markdown_paragraph extends markdown_node {
    markdown_paragraph(String content) : super() {
        if (content.endsWith("\n"))
            content = content.substring(0, content.length-1);
        List<markdown_node> subcontent = generate_markdown_emphasis(content);
        for (markdown_node cur in subcontent) {
            children.add(cur);
        }
    }

    String generate_html() {
        String ret = "<p>";
        for (markdown_node cur in children) {
            ret = "${ret}${cur.generate_html()}";
        }
        ret = "${ret}</p>";
        return ret;
    }
}

class markdown_blockquote extends markdown_node {
    markdown_blockquote(String _content) : super() {
        for (markdown_node cur in generate_markdown_nodes(_content)) {
            children.add(cur);
        }
    }

    String generate_html() {
        String ret = "<blockquote>";
        for (markdown_node cur in children) {
            ret = "${ret}${cur.generate_html()}";
        }
        ret = "${ret}</blockquote>";
        return ret;
    }
}

class markdown_code extends markdown_node {
    markdown_code(String content) : super() {
        children.add(new markdown_plaintext(htmlspecialchars(content)));
    }

    String generate_html() {
        String ret = "<code>";
        for (markdown_node cur in children) {
            ret = "${ret}${cur.generate_html()}";
        }
        ret = "${ret}</code>";
        return ret;
    }
}

class markdown_precode extends markdown_node {
    markdown_precode(String content) : super() {
        children.add(new markdown_plaintext(htmlspecialchars(content)));
    }

    String generate_html() {
        String ret = "<pre><code>";
        for (markdown_node cur in children) {
            ret = "${ret}${cur.generate_html()}";
        }
        ret = "${ret}</code></pre>";
        return ret;
    }
}

class markdown_emphasis extends markdown_node {
    markdown_emphasis(String content) : super() {
        children.add(new markdown_plaintext(content));
    }

    String generate_html() {
        String ret = "<em>";
        for (markdown_node cur in children) {
            ret = "${ret}${cur.generate_html()}";
        }
        ret = "${ret}</em>";
        return ret;
    }
}

class markdown_strong extends markdown_node {
    markdown_strong(String content) : super() {
        children.add(new markdown_plaintext(content));
    }

    String generate_html() {
        String ret = "<strong>";
        for (markdown_node cur in children) {
            ret = "${ret}${cur.generate_html()}";
        }
        ret = "${ret}</strong>";
        return ret;
    }
}

class markdown_plaintext extends markdown_node {
    String content;
    markdown_plaintext(String _content) : super() {
        content = _content;
    }

    String generate_html() {
        return content;
    }
}

class markdown_list_item extends markdown_node {
    markdown_list_item(String content) : super() {
        List<markdown_node> subcontent = generate_markdown_emphasis(content);
        for (markdown_node cur in subcontent) {
            children.add(cur);
        }
    }

    String generate_html() {
        String ret = "<li>";
        for (markdown_node cur in children) {
            ret = "${ret}${cur.generate_html()}";
        }
        ret = "${ret}</li>";
        return ret;
    }
}

class markdown_number_list extends markdown_node {
    markdown_number_list() : super() {
    }

    void add_list_item(String content) {
        children.add(new markdown_list_item(content));
    }

    String generate_html() {
        String ret = "<ol>";
        for (markdown_node cur in children) {
            ret = "${ret}${cur.generate_html()}";
        }
        ret = "${ret}</ol>";
        return ret;
    }
}

class markdown_bullet_list extends markdown_node {
    markdown_bullet_list() : super() {
    }

    void add_list_item(String content) {
        children.add(new markdown_list_item(content));
    }

    String generate_html() {
        String ret = "<ul>";
        for (markdown_node cur in children) {
            ret = "${ret}${cur.generate_html()}";
        }
        ret = "${ret}</ul>";
        return ret;
    }
}

class markdown_link extends markdown_node {
    String link;
    markdown_link(String _link, String content) : super() {
        link = _link;
        children.add(new markdown_plaintext(content));
    }

    String generate_html() {
        String ret = "<a href=\"${link}\">";
        for (markdown_node cur in children) {
            ret = "${ret}${cur.generate_html()}";
        }
        ret = "${ret}</a>";
        return ret;
    }
}

class markdown_image extends markdown_node {
    String link;
    String alt_text;
    String title;
    markdown_image(String _link, String _alt_text, String _title) : super() {
        link = _link;
        alt_text = _alt_text;
        title = _title;
    }

    String generate_html() {
        return "<img src=\"${link}\" alt=\"${alt_text}\" title=\"${title}\" />";
    }
}

/** 
 * Convert markdown to HTML
 * 
 * @param inp Markdown formatted text
 * 
 * @return HTML formatted text
 */
String markdown_to_html(String inp) {
    String ret = "";
    inp = inp.replaceAll("\r\n", "\n"); // Handle newlines in a linux fashion
    List<markdown_node> top_nodes = generate_markdown_nodes(inp);
    for (markdown_node cur in top_nodes) {
        ret = "${ret}${cur.generate_html()}";
    }
    return ret;
}

/** 
 * Handle the processing for most of the markdown types
 * 
 * @param content The string to process
 * 
 * @return a list of markdown nodes
 */
List<markdown_node> generate_markdown_nodes(String content) {
    List<markdown_node> ret = new List<markdown_node>();
    List<markdown_regex> regular_expressions = new List<markdown_regex>();

    RegExp plain_header = new RegExp(r"^(#+) ([^#\n]+)#*\n?", multiLine: true);
    RegExp blockquote = new RegExp(r"(^> ?.*?$\n?)+", multiLine: true);
    RegExp multiline_code = new RegExp(r"(^    ?.*?$\n?)+", multiLine: true);
    RegExp underline_big_header = new RegExp(r"^(.+)\n=+\n?", multiLine: true);
    RegExp underline_little_header = new RegExp(r"^(.+)\n-+\n?", multiLine: true);
    RegExp number_list = new RegExp(r"(^\s*[0-9]+\. ?.*?$\n?)+", multiLine: true);
    RegExp bullet_list = new RegExp(r"(^\s*[-] ?.*?$\n?)+", multiLine: true);
    
    regular_expressions.add(new markdown_regex(plain_header, (Match found) {
                int header_depth = found.group(1).trim().length;
                return new markdown_headline(header_depth, found.group(2));
    }));
    regular_expressions.add(new markdown_regex(blockquote, (Match found) {
                // Trim the '> ' at the start of the line
                String fixed = found.group(0).splitMapJoin("\n", onNonMatch: (String match) {
                        if (match.length < 2)
                            return "";
                        else if (match.startsWith("> "))
                            return match.substring(2);
                        else
                            return match.substring(1);
                    });
                return new markdown_blockquote(fixed);
    }));
    regular_expressions.add(new markdown_regex(multiline_code, (Match found) {
                // Trim the '> ' at the start of the line
                String fixed = found.group(0).splitMapJoin("\n", onNonMatch: (String match) {
                        if (match.length < 4)
                            return "";
                        else
                            return match.substring(4);
                    });
                return new markdown_precode(fixed);
    }));
    regular_expressions.add(new markdown_regex(underline_big_header, (Match found) {
                return new markdown_headline(1, found.group(1));
    }));
    regular_expressions.add(new markdown_regex(underline_little_header, (Match found) {
                return new markdown_headline(2, found.group(1));
    }));
    regular_expressions.add(new markdown_regex(number_list, (Match found) {
                markdown_number_list ret = new markdown_number_list();
                RegExp number_item = new RegExp(r"^\s*[0-9]+\. ?(.*?)$", multiLine: true);
                for (Match subfound in number_item.allMatches(found.group(0))) {
                    ret.add_list_item(subfound.group(1));
                }
                return ret;
    }));
    regular_expressions.add(new markdown_regex(bullet_list, (Match found) {
                markdown_bullet_list ret = new markdown_bullet_list();
                RegExp number_item = new RegExp(r"^\s*[-] ?(.*?)$", multiLine: true);
                for (Match subfound in number_item.allMatches(found.group(0))) {
                    ret.add_list_item(subfound.group(1));
                }
                return ret;
    }));

    bool found_match = false;
    int earliest_start = -1;
    markdown_regex earliest_regex = null;
    for (markdown_regex cur in regular_expressions) {
        cur.populate_variables(content);
        if (!cur.has_match)
            continue;

        found_match = true;
        if (earliest_start == -1 || cur.start <= earliest_start) {
            earliest_start = cur.start;
            earliest_regex = cur;
        }
    }

    if (!found_match) {
        if (content.length > 0) {
            for (markdown_node cur in generate_markdown_paragraphs(content)) {
                ret.add(cur);
            }
        }
        return ret;
    }
    return earliest_regex.execute();
}

/** 
 * Generate the paragraph tags for remaining strings
 * 
 * @param content The remaining string
 * 
 * @return a list of paragraph nodes
 */
List<markdown_node> generate_markdown_paragraphs(String content) {
    List<markdown_node> ret = new List<markdown_node>();
    List<markdown_regex> regular_expressions = new List<markdown_regex>();

    RegExp empty_line = new RegExp(r"^\s*$", multiLine: true);
    RegExp paragraph_regex = new RegExp(r"(^.*[^\s]+.*\n?)+", multiLine: true);
    
    regular_expressions.add(new markdown_regex(paragraph_regex, (Match found) {
                return new markdown_paragraph(found.group(0));
    }, process: generate_markdown_paragraphs));
    
    bool found_match = false;
    int earliest_start = -1;
    markdown_regex earliest_regex = null;
    for (markdown_regex cur in regular_expressions) {
        cur.populate_variables(content);
        if (!cur.has_match)
            continue;

        found_match = true;
        if (earliest_start == -1 || cur.start <= earliest_start) {
            earliest_start = cur.start;
            earliest_regex = cur;
        }
    }

    if (!found_match) {
        if (content.length > 0) {
            for (markdown_node cur in generate_markdown_emphasis(content)) {
                ret.add(cur);
            }
        }
        return ret;
    }
    return earliest_regex.execute();
}

/** 
 * Generate the emphasis tags for remaining strings
 * 
 * @param content The remaining string
 * 
 * @return a list of paragraph nodes
 */
List<markdown_node> generate_markdown_emphasis(String content) {
    List<markdown_node> ret = new List<markdown_node>();
    List<markdown_regex> regular_expressions = new List<markdown_regex>();

    RegExp single_asterix = new RegExp(r"\*(?! )([^*]+)(?! )\*");
    RegExp single_underscore = new RegExp(r"_(?! )([^_]+)(?! )\_");
    RegExp double_asterix = new RegExp(r"\*{2}(?! )([^*]+)(?! )\*{2}");
    RegExp double_underscore = new RegExp(r"_{2}(?! )([^_]+)(?! )_{2}");
    RegExp single_tick_code = new RegExp(r"`(?! )([^`]+)(?! )`");
    
    RegExp spaced_asterix = new RegExp(r" (\*) ");
    RegExp spaced_underscore = new RegExp(r" (_) ");
    RegExp backslash_asterix = new RegExp(r"\\(\*)");
    RegExp backslash_underscore = new RegExp(r"\\(_)");

    RegExp link = new RegExp(r"(?!!)\[([^\]]+)\]\(([^)]+)\)");
    RegExp image = new RegExp(r"!\[([^\]]+)\]\(([^) ]+) ?([^)]*)\)");
    
    regular_expressions.add(new markdown_regex(single_asterix, (Match found) {
                return new markdown_emphasis(found.group(1));
    }, process: generate_markdown_emphasis));
    regular_expressions.add(new markdown_regex(single_underscore, (Match found) {
                return new markdown_emphasis(found.group(1));
    }, process: generate_markdown_emphasis));
    regular_expressions.add(new markdown_regex(double_asterix, (Match found) {
                return new markdown_strong(found.group(1));
    }, process: generate_markdown_emphasis));
    regular_expressions.add(new markdown_regex(double_underscore, (Match found) {
                return new markdown_strong(found.group(1));
    }, process: generate_markdown_emphasis));
    regular_expressions.add(new markdown_regex(single_tick_code, (Match found) {
                return new markdown_code(found.group(1));
    }, process: generate_markdown_emphasis));

    regular_expressions.add(new markdown_regex(spaced_asterix, (Match found) {
                return new markdown_plaintext(found.group(1));
    }, process: generate_markdown_emphasis));
    regular_expressions.add(new markdown_regex(spaced_underscore, (Match found) {
                return new markdown_plaintext(found.group(1));
    }, process: generate_markdown_emphasis));
    regular_expressions.add(new markdown_regex(backslash_asterix, (Match found) {
                return new markdown_plaintext(found.group(1));
    }, process: generate_markdown_emphasis));
    regular_expressions.add(new markdown_regex(backslash_underscore, (Match found) {
                return new markdown_plaintext(found.group(1));
    }, process: generate_markdown_emphasis));

    regular_expressions.add(new markdown_regex(link, (Match found) {
                return new markdown_link(found.group(2), found.group(1));
    }, process: generate_markdown_emphasis));
    regular_expressions.add(new markdown_regex(image, (Match found) {
                return new markdown_image(found.group(2), found.group(1), found.group(3));
    }, process: generate_markdown_emphasis));

    
    bool found_match = false;
    int earliest_start = -1;
    markdown_regex earliest_regex = null;
    for (markdown_regex cur in regular_expressions) {
        cur.populate_variables(content);
        if (!cur.has_match)
            continue;

        found_match = true;
        if (earliest_start == -1 || cur.start <= earliest_start) {
            earliest_start = cur.start;
            earliest_regex = cur;
        }
    }

    if (!found_match) {
        if (content.length > 0) {
            ret.add(new markdown_plaintext(content));
        }
        return ret;
    }
    return earliest_regex.execute();
}