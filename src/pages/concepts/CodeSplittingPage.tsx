import { useState, lazy, Suspense, useEffect } from "react";
import CodeExample from "../../components/CodeExample";

// Simulate immediate loading of heavy dependencies
console.log(
  "📦 Without code splitting: Loading all editor dependencies immediately (2MB+)"
);
console.log("⚙️ CKEditor core loaded");
console.log("⚙️ CKEditor plugins loaded");
console.log("⚙️ CKEditor UI components loaded");

// Simulating a heavy third-party rich text editor component
const RichTextEditor = () => {
  useEffect(() => {
    console.log("📝 Regular editor mounted and ready");
  }, []);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2 border-b pb-2 mb-2">
        <button className="p-1 hover:bg-gray-100 rounded">
          <strong>B</strong>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <em>I</em>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <u>U</u>
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1" />
        <button className="p-1 hover:bg-gray-100 rounded">
          <span role="img" aria-label="image">
            🖼️
          </span>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <span role="img" aria-label="link">
            🔗
          </span>
        </button>
      </div>
      <div className="min-h-[100px] p-2 bg-gray-50 rounded" contentEditable>
        Start typing here...
      </div>
    </div>
  );
};

// Lazy loaded version of the rich text editor
const LazyRichTextEditor = lazy(() => {
  console.log("🚀 With code splitting: Downloading editor chunk on demand...");
  return new Promise((resolve) => {
    // Simulate network loading of a separate chunk
    setTimeout(() => {
      console.log("📥 Editor chunk downloaded (50KB)");
      console.log("📦 Loading editor dependencies...");

      // Simulate loading dependencies after chunk is downloaded
      setTimeout(() => {
        console.log("⚙️ CKEditor core loaded");
        console.log("⚙️ CKEditor plugins loaded");
        console.log("⚙️ CKEditor UI components loaded");

        resolve({
          default: function LazyEditor() {
            useEffect(() => {
              console.log("📝 Lazy editor mounted and ready");
            }, []);

            return (
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 border-b pb-2 mb-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <strong>B</strong>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <em>I</em>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <u>U</u>
                  </button>
                  <div className="w-px h-4 bg-gray-300 mx-1" />
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <span role="img" aria-label="image">
                      🖼️
                    </span>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <span role="img" aria-label="link">
                      🔗
                    </span>
                  </button>
                </div>
                <div
                  className="min-h-[100px] p-2 bg-gray-50 rounded"
                  contentEditable
                >
                  Start typing here...
                </div>
              </div>
            );
          },
        });
      }, 500);
    }, 500);
  });
});

const CodeSplittingPage = () => {
  const [showGoodExample, setShowGoodExample] = useState(false);
  const [showBadExample, setShowBadExample] = useState(false);

  const goodExample = `
// Good Example: Using lazy loading for the rich text editor
const RichTextEditor = lazy(() => import('./RichTextEditor'));

function BlogEditor() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div>
      <button onClick={() => setShowEditor(true)}>
        Start Writing
      </button>

      {showEditor && (
        <Suspense fallback={<div>Loading editor...</div>}>
          <RichTextEditor />
        </Suspense>
      )}
    </div>
  );
}`;

  const badExample = `
// Bad Example: Importing the rich text editor immediately
import RichTextEditor from './RichTextEditor';
import '@ckeditor/ckeditor5-build-classic'; // 2MB+
import '@ckeditor/ckeditor5-plugins/*';     // More MBs
import '@ckeditor/ckeditor5-theme';         // More KBs

function BlogEditor() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div>
      <button onClick={() => setShowEditor(true)}>
        Start Writing
      </button>

      {showEditor && <RichTextEditor />}
    </div>
  );
}`;

  return (
    <div className="space-y-6">
      <div className="prose">
        <h2 className="text-2xl font-bold">What is it?</h2>
        <p>
          Code splitting is a technique that allows you to split your
          application's code into smaller chunks and load them on demand, rather
          than loading everything upfront. This is especially useful for large
          features like rich text editors, complex forms, or data visualization
          tools that might not be needed immediately.
        </p>

        <h2 className="text-2xl font-bold">When to use it?</h2>
        <ul className="list-disc list-inside">
          <li>
            For features with heavy dependencies (rich text editors, charts,
            etc.)
          </li>
          <li>For routes in your application</li>
          <li>For features behind authentication</li>
          <li>For modal windows and dialogs</li>
          <li>For below-the-fold content</li>
        </ul>

        <h2 className="text-2xl font-bold">When not to use it?</h2>
        <ul className="list-disc list-inside">
          <li>For small components that are frequently used</li>
          <li>For components that are needed immediately on page load</li>
          <li>When the splitting overhead exceeds the loading benefits</li>
          <ul className="list-disc list-inside">
            <li>
              Why? Because the overhead of making an additional network request
              might be more expensive than just including it in the main bundle.
            </li>
            <li>
              Remember: Code splitting should be used strategically at the right
              points in your application!
            </li>
          </ul>
        </ul>
      </div>

      <div className="space-y-4">
        <CodeExample
          title="✅ Good Example"
          description="Loading the rich text editor and its dependencies (2MB+) only when needed"
          code={goodExample}
        >
          <div
            data-react-scan-label="Lazy Loading Example"
            className="space-y-4"
          >
            {!showGoodExample && (
              <div className="p-4 bg-green-50 rounded">
                <p className="text-sm text-green-700">
                  👆 Initial page load is fast because the editor code isn't
                  loaded yet
                </p>
              </div>
            )}

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowGoodExample(true)}
            >
              Start Writing
            </button>

            {showGoodExample && (
              <Suspense
                fallback={
                  <div className="p-4 bg-gray-100 rounded animate-pulse">
                    <p className="text-sm text-gray-600">
                      Loading rich text editor...
                    </p>
                  </div>
                }
              >
                <LazyRichTextEditor />
              </Suspense>
            )}
          </div>
        </CodeExample>

        <CodeExample
          title="❌ Bad Example"
          description="Loading heavy editor dependencies (2MB+) immediately on page load"
          code={badExample}
        >
          <div
            data-react-scan-label="Eager Loading Example"
            className="space-y-4"
          >
            {!showBadExample && (
              <div className="p-4 bg-red-50 rounded">
                <p className="text-sm text-red-700">
                  ⚠️ Page load is slower because editor code is included in the
                  main bundle
                </p>
              </div>
            )}

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowBadExample(true)}
            >
              Start Writing
            </button>

            {showBadExample && <RichTextEditor />}
          </div>
        </CodeExample>

        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-sm">
            👉 Open the console to see the loading sequence. Notice how the
            "Good" example only loads the editor code when you click the button,
            while the "Bad" example loads everything upfront, making the initial
            page load slower.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeSplittingPage;
