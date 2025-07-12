'use client';

import { Highlight, themes } from 'prism-react-renderer';
import classNames from 'classnames';

interface CodeHighlightProps {
  code: string;
  language: 'json' | 'yaml';
}

export default function CodeHighlight({ code, language }: CodeHighlightProps) {
  return (
    <Highlight
      theme={themes.vsLight}
      code={code}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={classNames(
            className,
            "p-4 m-0 h-full",
            "text-sm font-mono",
            "bg-transparent"
          )}
          style={{
            ...style,
            background: 'transparent'
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}