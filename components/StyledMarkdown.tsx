'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function StyledMarkdown({ content }: { content: string }) {
  if (!content) return null;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: p => <h1 className="text-2xl font-bold text-amber-600 mb-4 mt-6" {...p} />,
        h2: p => <h2 className="text-xl font-bold text-amber-600 mb-3 mt-5" {...p} />,
        h3: p => <h3 className="text-lg font-semibold text-amber-600 mb-2 mt-4" {...p} />,
        p: p => <p className="text-[#3d3a2a] leading-relaxed mb-4" {...p} />,

        // fixed bullet/number list styling
        ul: p => <ul className="list-disc pl-6 mb-4 text-[#3d3a2a] space-y-1" {...p} />,
        ol: p => <ol className="list-decimal pl-6 mb-4 text-[#3d3a2a] space-y-1" {...p} />,
        li: p => <li className="leading-relaxed" {...p} />,

        strong: p => <strong className="text-amber-600 font-semibold" {...p} />,
        em: p => <em className="text-amber-600 italic" {...p} />,
        code: p => (
          <code className="bg-amber-950/40 px-1.5 py-0.5 rounded text-amber-600 text-sm" {...p} />
        ),
        pre: p => <pre className="bg-amber-950/30 p-4 rounded-lg overflow-x-auto mb-4" {...p} />,
        blockquote: p => (
          <blockquote
            className="border-l-4 border-amber-600/70 pl-4 italic text-[#3d3a2a] my-4 bg-amber-50/40 rounded-md"
            {...p}
          />
        ),
        a: p => <a className="text-amber-600 hover:text-amber-700 underline" {...p} />,

        table: p => (
          <div className="w-full overflow-x-auto mb-6">
            <table
              className="min-w-full border border-amber-800/30 rounded-lg text-sm text-[#3d3a2a]"
              {...p}
            />
          </div>
        ),

        thead: p => <thead className="text-amber-800" {...p} />,
        tbody: p => <tbody className="divide-y divide-amber-700/20" {...p} />,
        tr: p => <tr className="hover:bg-amber-50/40 transition-colors" {...p} />,
        th: p => (
          <th className="px-3 py-2 text-left font-semibold border-b border-amber-800/30" {...p} />
        ),
        td: p => <td className="px-3 py-2 align-top border-b border-amber-800/20" {...p} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
