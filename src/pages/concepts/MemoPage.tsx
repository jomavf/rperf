import { useState, memo } from "react";
import CodeExample from "../../components/CodeExample";

const TestComponent = ({ value, label }: { value: number; label: string }) => {
  // Simulate an expensive calculation
  const calculateExpensiveValue = (num: number) => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += num;
    }
    return result;
  };

  const expensiveValue = calculateExpensiveValue(value);

  return (
    <div className="p-4 bg-white rounded shadow" data-react-scan>
      <p>
        {label}: {expensiveValue}
      </p>
    </div>
  );
};

// Memoized child component
const MemoExpensiveComponent = memo(({ value }: { value: number }) => {
  console.log("Good ExpensiveComponent rendered");
  return <TestComponent value={value} label="Good" />;
});

const WithoutMemoExpensiveComponent = ({ value }: { value: number }) => {
  console.warn("Bad ExpensiveComponent rendered");
  return <TestComponent value={value} label="Bad" />;
};

const MemoPage = () => {
  const [count, setCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  const goodExample = `
// Good Example: Using React.memo
const MemoExpensiveComponent = memo(({ value }: { value: number }) => {
  console.log("Good ExpensiveComponent rendered");
  return <TestComponent value={value} label="Good" />;
});

// Usage
<MemoExpensiveComponent value={count} />
`;

  const badExample = `
// Bad Example: Not using memo for expensive components
const WithoutMemoExpensiveComponent = ({ value }: { value: number }) => {
  console.warn("Bad ExpensiveComponent rendered");
  return <TestComponent value={value} label="Bad" />;
};

// Usage
<WithoutMemoExpensiveComponent value={count} />
`;

  return (
    <div className="space-y-6">
      <div className="prose">
        <h2 className="text-2xl font-bold">What is it?</h2>
        <p>
          React.memo is a higher-order component that allows memoizing a
          component, preventing unnecessary re-renders when props haven't
          changed.
        </p>

        <h2 className="text-2xl font-bold">When to use it?</h2>
        <ul className="list-disc list-inside">
          <li>Components that frequently receive the same props</li>
          <li>Components with expensive calculations</li>
          <li>Components that re-render frequently due to parent changes</li>
        </ul>

        <h2 className="text-2xl font-bold">When not to use it?</h2>
        <ul className="list-disc list-inside">
          <li>Components that receive unique props</li>
          <li>Components that don't have expensive calculations</li>
          <li>Components that don't re-render frequently</li>
          <ul className="list-disc list-inside">
            <li>
              Why? Because it's not worth the overhead of memoizing a component
              that doesn't have expensive calculations and doesn't re-render
              frequently.
            </li>
            <li>
              The overhead of memoizing the component is greater than the
              benefit of preventing unnecessary re-renders.
            </li>
          </ul>
        </ul>
      </div>

      <div className="space-y-4">
        <CodeExample
          title="✅ Good Example"
          description="Using React.memo to prevent unnecessary re-renders"
          code={goodExample}
        >
          <div data-react-scan-label="Memoized Component">
            <MemoExpensiveComponent value={count} />
          </div>
        </CodeExample>

        <CodeExample
          title="❌ Bad Example"
          description="Not using memo causes unnecessary re-renders"
          code={badExample}
        >
          <div data-react-scan-label="Non-memoized Component">
            <WithoutMemoExpensiveComponent value={count} />
          </div>
        </CodeExample>

        <div className="space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setCount((c) => c + 1)}
          >
            Increment value ({count})
          </button>

          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => setUnrelatedState((s) => s + 1)}
          >
            Update unrelated state ({unrelatedState})
          </button>
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-sm">
            👉 React Scan will highlight components when they re-render. Notice
            how the memoized component only re-renders when its value changes,
            while the non-memoized component re-renders on any parent update.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoPage;
