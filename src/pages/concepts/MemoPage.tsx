import { useState, memo } from "react";

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

  return (
    <div className="space-y-6">
      <div className="prose">
        <h1>React.memo - Component Memoization</h1>

        <h2>What is it?</h2>
        <p>
          React.memo is a higher-order component that allows memoizing a
          component, preventing unnecessary re-renders when props haven't
          changed.
        </p>

        <h2>When to use it?</h2>
        <ul>
          <li>Components that frequently receive the same props</li>
          <li>Components with expensive calculations</li>
          <li>Components that re-render frequently due to parent changes</li>
        </ul>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Practical Example</h3>

        <div className="space-y-4">
          <div data-react-scan-label="Memoized Component">
            <MemoExpensiveComponent value={count} />
          </div>
          <div data-react-scan-label="Non-memoized Component">
            <WithoutMemoExpensiveComponent value={count} />
          </div>
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
              👉 React Scan will highlight components when they re-render.
              Notice how the memoized component only re-renders when its value
              changes, while the non-memoized component re-renders on any parent
              update.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoPage;
