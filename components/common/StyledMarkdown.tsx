'use client';
import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

export default function StyledMarkdown({ content }: { content: string }) {
  if (!content) return null;

  const processedContent = content.replace(/-->/g, '→');

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: p => <h1 className="text-2xl text-[#c19670] mb-4 mt-6" {...p} />,
        h2: p => <h2 className="text-xl text-[#c19670] mb-3 mt-5" {...p} />,
        h3: p => <h3 className="text-lg text-[#c19670] mb-2 mt-4" {...p} />,
        p: p => <p className="text-[#c3beb6] leading-relaxed mb-4 break-words overflow-wrap-anywhere" {...p} />,

        ul: p => <ul className="list-disc pl-6 mb-4 text-[#c3beb6] space-y-1 break-words" {...p} />,
        ol: p => <ol className="list-decimal pl-6 mb-4 text-[#c3beb6] space-y-1 break-words" {...p} />,
        li: p => <li className="leading-relaxed break-words" {...p} />,

        strong: p => <strong className="text-[#c19670]" {...p} />,
        em: p => <em className="text-[#c19670] italic" {...p} />,
        code: p => <code className="bg-[#1a1819] px-1.5 py-0.5 rounded text-[#c19670] text-sm" {...p} />,
        pre: p => <pre className="bg-[#1a1819] p-4 rounded-md overflow-x-auto mb-4" {...p} />,
        blockquote: p => (
          <blockquote
            className="border-l-4 border-[#c19670]/70 pl-4 italic text-[#c3beb6] my-4 bg-[#1a1819]/40 rounded-md"
            {...p}
          />
        ),
        a: p => <a className="text-[#c19670] hover:text-[#d4a574] underline" {...p} />,

        table: p => (
          <div className="w-full overflow-x-auto mb-6">
            <table className="min-w-full border border-[#c19670]/30 rounded-md text-sm text-[#c3beb6]" {...p} />
          </div>
        ),

        thead: p => <thead className="text-[#c19670]" {...p} />,
        tbody: p => <tbody className="divide-y divide-[#c19670]/20" {...p} />,
        tr: p => <tr className="hover:bg-[#1a1819]/40 transition-colors" {...p} />,
        th: p => <th className="px-3 py-2 text-left border-b border-[#c19670]/30" {...p} />,
        td: p => <td className="px-3 py-2 align-top border-b border-[#c19670]/20" {...p} />,
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
