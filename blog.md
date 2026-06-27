---
layout: default
title: 博客 - Taishan Net 教程与资讯
description: Taishan Net 博客提供客户端下载教程、Clash配置指南、Shadowrocket使用教程、机场推荐、网络知识等文章。
keywords: [taishan net教程, Clash教程, Shadowrocket教程, 机场推荐, taishan机场教程]
---

<section class="pt-28 pb-20">
  <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
    <div class="text-center" data-aos="fade-up">
      <span class="section-kicker">博客</span>
      <h1 class="mt-4 text-3xl font-bold text-white sm:text-5xl">教程与资讯</h1>
      <p class="mx-auto mt-4 max-w-xl text-slate-300">Taishan Net 官方博客，提供客户端配置教程、机场推荐、网络知识等内容。</p>
    </div>

    <div class="mt-10 flex flex-wrap justify-center gap-3" data-aos="fade-up">
      <span class="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-200">全部</span>
      <span class="rounded-full border border-white/10 px-4 py-1.5 text-sm text-slate-400">客户端下载</span>
      <span class="rounded-full border border-white/10 px-4 py-1.5 text-sm text-slate-400">机场教程</span>
      <span class="rounded-full border border-white/10 px-4 py-1.5 text-sm text-slate-400">Clash教程</span>
      <span class="rounded-full border border-white/10 px-4 py-1.5 text-sm text-slate-400">Shadowrocket教程</span>
      <span class="rounded-full border border-white/10 px-4 py-1.5 text-sm text-slate-400">Sing-box教程</span>
      <span class="rounded-full border border-white/10 px-4 py-1.5 text-sm text-slate-400">OpenWRT教程</span>
      <span class="rounded-full border border-white/10 px-4 py-1.5 text-sm text-slate-400">机场推荐</span>
    </div>

    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
      {% for post in site.posts %}
      <a href="{{ site.baseurl }}{{ post.url }}" class="blog-card group overflow-hidden">
        <div class="p-6">
          <div class="flex items-center gap-3 text-xs text-slate-500">
            <span class="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-0.5 text-indigo-200">{{ post.categories[0] | default: '网络知识' }}</span>
            <span>{{ post.date | date: "%Y-%m-%d" }}</span>
          </div>
          <h2 class="mt-3 text-base font-semibold text-white transition group-hover:text-indigo-200">{{ post.title }}</h2>
          <p class="mt-2 line-clamp-2 text-sm text-slate-400">{{ post.description | default: post.excerpt | strip_html | truncate: 100 }}</p>
          <span class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-300">阅读全文 <span aria-hidden="true">→</span></span>
        </div>
      </a>
      {% endfor %}
    </div>

    {% if site.posts.size == 0 %}
    <div class="glass-card mt-10 p-12 text-center" data-aos="fade-up">
      <p class="text-slate-400">博客文章即将上线，敬请期待。</p>
    </div>
    {% endif %}
  </div>
</section>
