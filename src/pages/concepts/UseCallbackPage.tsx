import { useState, useCallback, memo } from "react";
import CodeExample from "../../components/CodeExample";

// A memoized child component that receives a function prop
const ExpensiveChild = memo(
  ({ onAction, label }: { onAction: () => void; label: string }) => {
    console.log(`${label} child rendered`);

    return (
      <div className="p-4 bg-white rounded shadow" data-react-scan>
        <p className="mb-2">{label} Component</p>
        <button
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
          onClick={onAction}
        >
          Trigger Action
        </button>
      </div>
    );
  }
);

const UseCallbackPage = () => {
  const [, setCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  // Good Example: Using useCallback
  const memoizedCallback = useCallback(() => {
    console.log("Good callback executed");
    setCount((c) => c + 1);
  }, []); // Empty deps array since we use the function updater form

  // Bad Example: Not using useCallback
  const nonMemoizedCallback = () => {
    console.warn("Bad callback executed");
    setCount((c) => c + 1);
  };

  const goodExample = `
// Good Example: Using useCallback with a memoized child component
const MemoizedChild = memo(({ onAction }) => {
  console.log("Child rendered");
  return <button onClick={onAction}>Action</button>;
});

// Parent component
const memoizedCallback = useCallback(() => {
  console.log("Good callback executed");
  setCount(c => c + 1);
}, []); // Empty deps array since we use the function updater

<MemoizedChild onAction={memoizedCallback} />
`;

  const badExample = `
// Bad Example: Not using useCallback with a memoized child component
const MemoizedChild = memo(({ onAction }) => {
  console.log("Child rendered");
  return <button onClick={onAction}>Action</button>;
});

// Parent component
const nonMemoizedCallback = () => {
  console.warn("Bad callback executed");
  setCount(c => c + 1);
};

<MemoizedChild onAction={nonMemoizedCallback} />
`;

  return (
    <div className="space-y-6">
      <div className="prose">
        <h2 className="text-2xl font-bold">What is it?</h2>
        <p>
          useCallback is a React Hook that returns a memoized version of a
          callback function that only changes if one of its dependencies has
          changed. It's particularly useful when passing callbacks to optimized
          child components that rely on reference equality to prevent
          unnecessary renders.
        </p>

        <h2 className="text-2xl font-bold">When to use it?</h2>
        <ul className="list-disc list-inside">
          <li>
            When passing callbacks to memoized child components (using
            React.memo)
          </li>
          <li>When a callback is used as a dependency in other hooks</li>
          <li>
            When you want to maintain referential equality between renders
          </li>
        </ul>

        <h2 className="text-2xl font-bold">When not to use it?</h2>
        <ul className="list-disc list-inside">
          <li>For callbacks passed to regular, non-memoized components</li>
          <li>
            When the callback changes frequently with different dependencies
          </li>
          <li>
            For simple event handlers that don't affect child component
            optimization
          </li>
          <ul className="list-disc list-inside">
            <li>
              Why? Because the overhead of creating and maintaining the memoized
              callback might be more expensive than the potential benefits.
            </li>
            <li>
              Remember: useCallback is not a performance optimization by itself,
              it needs to be used in conjunction with React.memo or similar
              optimizations.
            </li>
          </ul>
        </ul>
      </div>

      <div className="space-y-4">
        <CodeExample
          title="✅ Good Example"
          description="Using useCallback with a memoized child component"
          code={goodExample}
        >
          <div data-react-scan-label="Memoized Callback">
            <ExpensiveChild onAction={memoizedCallback} label="Good" />
          </div>
        </CodeExample>

        <CodeExample
          title="❌ Bad Example"
          description="Not using useCallback causes child component to re-render unnecessarily because the onAction prop is a new function on every render. This breaks the memoization of the child component."
          code={badExample}
        >
          <div data-react-scan-label="Non-memoized Callback">
            <ExpensiveChild onAction={nonMemoizedCallback} label="Bad" />
          </div>
        </CodeExample>

        <div className="space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => setUnrelatedState((s) => s + 1)}
          >
            Update unrelated state ({unrelatedState})
          </button>
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-sm">
            👉 Open the console to see component renders. Notice how the "Bad"
            child component re-renders on every parent update, while the "Good"
            child component only renders when necessary. Both callbacks work the
            same way, but useCallback prevents unnecessary re-renders of the
            memoized child.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UseCallbackPage;
