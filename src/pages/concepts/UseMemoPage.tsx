import { useState, useMemo } from "react";
import CodeExample from "../../components/CodeExample";

const ExpensiveCalculation = ({
  value,
  label,
}: {
  value: number;
  label: string;
}) => {
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

const UseMemoPage = () => {
  const [count, setCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  // Good Example: Using useMemo
  const memoizedValue = useMemo(() => {
    console.log("Good calculation executed");
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += count;
    }
    return result;
  }, [count]); // Only recalculate when count changes

  // Bad Example: Not using useMemo
  const nonMemoizedValue = (() => {
    console.warn("Bad calculation executed");
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += count;
    }
    return result;
  })();

  const goodExample = `
// Good Example: Using useMemo
const memoizedValue = useMemo(() => {
  console.log("Good calculation executed");
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += count;
  }
  return result;
}, [count]); // Only recalculate when count changes
`;

  const badExample = `
// Bad Example: Not using useMemo
const nonMemoizedValue = (() => {
  console.warn("Bad calculation executed");
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += count;
  }
  return result;
})();
`;

  return (
    <div className="space-y-6">
      <div className="prose">
        <h2 className="text-2xl font-bold">What is it?</h2>
        <p>
          useMemo is a React Hook that memoizes the result of a computation,
          preventing it from being recalculated on every render unless its
          dependencies change.
        </p>

        <h2 className="text-2xl font-bold">When to use it?</h2>
        <ul className="list-disc list-inside">
          <li>When you have computationally expensive calculations</li>
          <li>When you want to avoid recreating objects on every render</li>
          <li>When a value is used in the dependency array of other hooks</li>
        </ul>

        <h2 className="text-2xl font-bold">When not to use it?</h2>
        <ul className="list-disc list-inside">
          <li>For simple calculations or operations</li>
          <li>When the value changes frequently</li>
          <li>When the computation is not expensive</li>
          <ul className="list-disc list-inside">
            <li>
              Why? Because the overhead of creating and maintaining the memoized
              value might be more expensive than just recalculating it.
            </li>
            <li>Remember: Premature optimization is the root of all evil!</li>
          </ul>
        </ul>
      </div>

      <div className="space-y-4">
        <CodeExample
          title="✅ Good Example"
          description="Using useMemo to memoize expensive calculations"
          code={goodExample}
        >
          <div data-react-scan-label="Memoized Value">
            <ExpensiveCalculation value={memoizedValue} label="Good" />
          </div>
        </CodeExample>

        <CodeExample
          title="❌ Bad Example"
          description="Not using useMemo causes unnecessary recalculations"
          code={badExample}
        >
          <div data-react-scan-label="Non-memoized Value">
            <ExpensiveCalculation value={nonMemoizedValue} label="Bad" />
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
            👉 Open the console to see when calculations are executed. Notice
            how the memoized calculation only runs when the count changes, while
            the non-memoized calculation runs on every render.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UseMemoPage;
