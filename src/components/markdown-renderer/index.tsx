import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";

interface ThemedCodeBlockProps extends React.ComponentPropsWithoutRef<"code"> {
  inline?: boolean;
  isDark?: boolean;
}

const CopyButton = ({ text, isDark }: { text: string; isDark: boolean }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      className={cn(
        "absolute right-4 top-4 z-20 h-8 w-8 bg-transparent p-1.5 transition-all hover:text-muted-foreground",
        isDark ? "hidden dark:block" : "dark:hidden",
      )}
      onClick={copy}
    >
      {isCopied ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );
};

const ThemedCodeBlock = ({
  className,
  children,
  isDark = false,
  ...props
}: ThemedCodeBlockProps) => {
  const match = /language-(\w+)/.exec(className ?? "");

  if (!match) {
    // Only render inline code for light theme to avoid duplication
    if (isDark) return null;

    return (
      <code
        {...props}
        className={cn(
          "rounded-md border bg-muted-foreground/30 px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className,
        )}
      >
        {children}
      </code>
    );
  }

  const content = String(children).replace(/\n$/, "");

  return (
    <div className="group relative">
      <CopyButton text={content} isDark={isDark} />
      <SyntaxHighlighter
        {...props}
        PreTag="div"
        language={match[1]}
        style={isDark ? materialDark : materialLight}
        customStyle={{
          borderRadius: "8px",
          padding: "1rem",
          margin: "1rem 0",
        }}
        className={isDark ? "hidden dark:block" : "dark:hidden"}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
};

const MarkdownComponents = {
  h1: ({ ...props }) => (
    <h1
      className="mb-6 mt-8 border-b pb-2 text-3xl font-bold tracking-tight"
      {...props}
    />
  ),
  h2: ({ ...props }) => (
    <h2 className="mt-6 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: ({ ...props }) => (
    <h3 className="mb-3 mt-5 text-xl font-semibold tracking-tight" {...props} />
  ),
  h4: ({ ...props }) => (
    <h4 className="mb-2 mt-4 text-lg font-semibold tracking-tight" {...props} />
  ),
  h5: ({ ...props }) => (
    <h5
      className="mb-2 mt-3 text-base font-semibold tracking-tight"
      {...props}
    />
  ),
  h6: ({ ...props }) => (
    <h6 className="mb-2 mt-3 text-sm font-semibold tracking-tight" {...props} />
  ),
  p: ({ ...props }) => (
    <p className="leading-7 [&:not(:first-child)]:mt-4" {...props} />
  ),
  ul: ({ ...props }) => (
    <ul className="ml-6 list-disc [&>li]:mt-2" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="ml-6 list-decimal [&>li]:mt-2" {...props} />
  ),
  li: ({ ...props }) => <li className="leading-7" {...props} />,
  blockquote: ({ ...props }) => (
    <blockquote
      className="mt-6 border-l-4 border-muted pl-6 italic text-muted-foreground"
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-6 border-muted" {...props} />,
  table: ({ ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  th: ({ ...props }) => (
    <th
      className="border border-muted px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td className="border border-muted px-4 py-2 text-left" {...props} />
  ),
  a: ({ ...props }) => (
    <a
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
      {...props}
    />
  ),
  img: ({
    src,
    alt,
    width,
    height,
    ...props
  }: React.ComponentPropsWithoutRef<"img">) => (
    <Image
      src={src ?? ""}
      alt={alt ?? "image"}
      className="rounded-lg border"
      width={typeof width === "string" ? parseInt(width, 10) : (width ?? 500)}
      height={
        typeof height === "string" ? parseInt(height, 10) : (height ?? 300)
      }
      {...props}
    />
  ),
  code: ({ ...props }) => (
    <>
      <ThemedCodeBlock {...props} isDark={false} />
      <ThemedCodeBlock {...props} isDark={true} />
    </>
  ),
};

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown components={MarkdownComponents}>{content}</ReactMarkdown>
    </div>
  );
}
