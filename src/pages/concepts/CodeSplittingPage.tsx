import { useState, lazy, Suspense, useEffect } from "react";
import CodeExample from "../../components/CodeExample";

// Simulating a heavy component that would benefit from code splitting
const HeavyComponent = () => {
  useEffect(() => {
    // Simulate heavy computation on mount
    console.log("Heavy component mounted and executing expensive computation");
    const startTime = performance.now();

    // Simulate expensive computation
    let result = 0;
    for (let i = 0; i < 5000000; i++) {
      result += Math.random();
    }

    const endTime = performance.now();
    console.log(`Heavy computation took ${endTime - startTime}ms`);
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Heavy Component</h3>
      <p>
        This component has been loaded immediately and performed expensive
        computation.
      </p>
    </div>
  );
};

// Lazy loaded version of the heavy component
const LazyHeavyComponent = lazy(() => {
  console.log("Lazy component import requested");
  // Simulate network delay and module loading
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        default: function LazyComponent() {
          useEffect(() => {
            // Simulate heavy computation on mount
            console.log(
              "Lazy component mounted and executing expensive computation"
            );
            const startTime = performance.now();

            // Simulate expensive computation
            let result = 0;
            for (let i = 0; i < 5000000; i++) {
              result += Math.random();
            }

            const endTime = performance.now();
            console.log(`Lazy computation took ${endTime - startTime}ms`);
          }, []);

          return (
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold mb-2">
                Lazy Heavy Component
              </h3>
              <p>
                This component was loaded on demand and performed expensive
                computation!
              </p>
            </div>
          );
        },
      });
    }, 1500);
  });
});

const CodeSplittingPage = () => {
  const [showGoodExample, setShowGoodExample] = useState(false);
  const [showBadExample, setShowBadExample] = useState(false);

  const goodExample = `
// Good Example: Using lazy loading and Suspense
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function MyComponent() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <button onClick={() => setShowComponent(true)}>
        Load Component
      </button>

      {showComponent && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}`;

  const badExample = `
// Bad Example: Importing everything upfront
import HeavyComponent1 from './HeavyComponent1';
import HeavyComponent2 from './HeavyComponent2';
import HeavyComponent3 from './HeavyComponent3';

function MyComponent() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <button onClick={() => setShowComponent(true)}>
        Load Component
      </button>

      {showComponent && <HeavyComponent />}
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
          than loading everything upfront. In React, this is primarily achieved
          through dynamic imports and the lazy function.
        </p>

        <h2 className="text-2xl font-bold">When to use it?</h2>
        <ul className="list-disc list-inside">
          <li>For large components that aren't immediately needed</li>
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
          description="Using lazy loading to load a heavy component only when needed"
          code={goodExample}
        >
          <div data-react-scan-label="Lazy Loading Example">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
              onClick={() => setShowGoodExample(true)}
            >
              Load Heavy Component
            </button>

            {showGoodExample && (
              <Suspense
                fallback={
                  <div className="p-4 bg-gray-100 rounded animate-pulse">
                    Loading component...
                  </div>
                }
              >
                <LazyHeavyComponent />
              </Suspense>
            )}
          </div>
        </CodeExample>

        <CodeExample
          title="❌ Bad Example"
          description="Loading heavy components immediately, impacting initial page load"
          code={badExample}
        >
          <div data-react-scan-label="Eager Loading Example">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
              onClick={() => setShowBadExample(true)}
            >
              Show Heavy Component
            </button>

            {showBadExample && <HeavyComponent />}
          </div>
        </CodeExample>

        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-sm">
            👉 Open the console to see when components are loaded. Notice how
            the "Good" example loads the component only when requested, while
            the "Bad" example has the component loaded from the start. In a real
            application, this difference can significantly impact initial load
            time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeSplittingPage;
