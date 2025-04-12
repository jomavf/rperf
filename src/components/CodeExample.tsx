import { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeExampleProps {
  title: string;
  description?: string;
  code: string;
  children?: ReactNode;
}

const CodeExample = ({
  title,
  description,
  code,
  children,
}: CodeExampleProps) => {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4 bg-white border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {description && <p className="mt-1 text-gray-600">{description}</p>}
      </div>

      <SyntaxHighlighter
        language="typescript"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          borderRadius: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>

      {children && (
        <div className="p-4 bg-white border-t border-gray-200">{children}</div>
      )}
    </div>
  );
};

export default CodeExample;
