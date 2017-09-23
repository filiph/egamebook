---
layout: minimal
title: Egamebook Blog
description: "Egamebook is a project which strives to bring the gamebook (aka Choose-Your-Own-Adventure) experience to the ‘new media’ platforms (mobile, tablet, web, ...) and to the 21st century. This blog maps its journey from idea to reality."
---

<h1 class="blog-title">Blog</h1>

<p>{{ page.description }} <a href="{{ site.url }}">Back to egamebook.com</a></p>

<div class="blogpost-listing">
<ul>
{% for post in site.posts %}
<li>
    <div class="blogpost-record">
      <a href="{{ post.url }}">
        <h2>{{ post.title }}</h2>
      </a>
      
      <p>
        <strong>{{ post.date | date: "%B %-d, %Y" }}</strong> &mdash;
        {{ post.excerpt | strip_html }}
        <a href="{{ post.url }}">Read&nbsp;&rarr;</a>
      </p>
    </div>
</li>
{% endfor %}
</ul>
</div>