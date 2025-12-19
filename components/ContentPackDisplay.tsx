
import React from 'react';
import { ContentPack, AppLanguage } from '../types';

interface Props {
  pack: ContentPack;
  language: AppLanguage;
}

const ContentPackDisplay: React.FC<Props> = ({ pack, language }) => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-indigo-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900">Content Distribution Pack</h2>
      </div>

      {/* SEO Blog */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">SEO Blog Post</h3>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">Ready</span>
        </div>
        <div className="prose max-w-none text-gray-800">
          <h1 className="text-2xl font-extrabold mb-4">{pack.seoBlog.title}</h1>
          <p className="text-lg text-gray-600 mb-6 italic">{pack.seoBlog.summary}</p>
          {pack.seoBlog.sections.map((sec, i) => (
            <div key={i} className="mb-6">
              <h4 className="text-lg font-bold mb-2 text-indigo-700">{sec.heading}</h4>
              <p>{sec.content}</p>
            </div>
          ))}
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h4 className="font-bold text-indigo-900 mb-3">Key Takeaways</h4>
            <ul className="list-disc list-inside space-y-2">
              {pack.seoBlog.takeaways.map((t, i) => (
                <li key={i} className="text-indigo-800">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Social Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            LinkedIn Post
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
            {pack.linkedInPost}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Twitter/X Thread
          </h3>
          <div className="space-y-4">
            {pack.twitterThread.map((tweet, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 border-l-4 border-gray-300">
                <span className="text-[10px] font-bold text-gray-400 block mb-1">TWEET {i + 1}/{pack.twitterThread.length}</span>
                {tweet}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Quote Cards & Chapters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Quote Snippets</h3>
          <div className="space-y-4">
            {pack.quoteCards.map((quote, i) => (
              <div key={i} className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white italic relative overflow-hidden">
                <span className="absolute -top-2 -left-2 text-6xl opacity-20 font-serif">“</span>
                <p className="relative z-10 text-sm font-medium">"{quote}"</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">YouTube Chapters</h3>
          <div className="space-y-3">
            {pack.chapters.map((ch, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 font-mono text-xs font-bold rounded">
                  {ch.timestamp}
                </span>
                <span className="text-gray-800 font-medium group-hover:text-indigo-600 transition">
                  {ch.title}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContentPackDisplay;
