import { useState, lazy, Suspense } from "react";
import CodeExample from "../../components/CodeExample";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components immediately - this is what makes the initial bundle heavy
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Helper to generate random data
const generateData = (): ChartData<"line"> => {
  return {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales 2023",
        data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 1000)),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };
};

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Monthly Sales Report",
    },
  },
};

// Regular Chart Component - Everything loaded upfront
const SalesChart = () => {
  console.log("📊 Regular Chart component rendered");

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <Line data={generateData()} options={chartOptions} />
    </div>
  );
};

// Lazy loaded version of the chart
const LazySalesChart = lazy(() => {
  console.log("🚀 Lazy Chart: Downloading chunk...");

  // In a real app, we would do:
  // return import('./SalesChart')

  // For demo purposes, we're simulating the async import
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("📥 Chart.js core downloaded (180KB)");
      console.log("📥 react-chartjs-2 downloaded (40KB)");

      setTimeout(() => {
        console.log("📦 Loading additional plugins...");
        console.log("📥 CategoryScale plugin loaded (120KB)");
        console.log("📥 LinearScale plugin loaded (80KB)");
        console.log("📥 PointElement plugin loaded (90KB)");
        console.log("📥 LineElement plugin loaded (110KB)");
        console.log("📥 Title plugin loaded (50KB)");
        console.log("📥 Tooltip plugin loaded (150KB)");
        console.log("📥 Legend plugin loaded (140KB)");
        console.log("📥 Filler plugin loaded (70KB)");

        resolve({
          default: function LazyChart() {
            console.log("📊 Lazy Chart component rendered");

            return (
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <Line data={generateData()} options={chartOptions} />
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
// Good Example: Lazy loading Chart.js
const SalesChart = lazy(() => import('./SalesChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Show Sales Report
      </button>

      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <SalesChart />
        </Suspense>
      )}
    </div>
  );
}`;

  const badExample = `
// Bad Example: Loading Chart.js immediately
import { Chart as ChartJS } from 'chart.js';
import {
  CategoryScale,    // 120KB
  LinearScale,      // 80KB
  PointElement,     // 90KB
  LineElement,      // 110KB
  Title,            // 50KB
  Tooltip,          // 150KB
  Legend,           // 140KB
  Filler            // 70KB
} from 'chart.js';  // Total: ~810KB minified

// Register everything upfront
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Show Sales Report
      </button>

      {showChart && <SalesChart />}
    </div>
  );
}`;

  return (
    <div className="space-y-6">
      <div className="prose">
        <h2 className="text-2xl font-bold">What is it?</h2>
        <p>
          Code splitting is a technique that allows you to split your
          application's code into smaller chunks and load them on demand. In
          this example, we're using Chart.js (810KB+) to demonstrate how code
          splitting can significantly reduce the initial bundle size.
        </p>

        <h2 className="text-2xl font-bold">When to use it?</h2>
        <ul className="list-disc list-inside">
          <li>For heavy data visualization libraries (Chart.js, D3.js)</li>
          <li>For complex UI components (rich text editors, date pickers)</li>
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
          description="Loading Chart.js (810KB+) only when the chart is needed"
          code={goodExample}
        >
          <div className="space-y-4">
            {!showGoodExample && (
              <div className="p-4 bg-green-50 rounded">
                <p className="text-sm text-green-700">
                  👆 Initial page load is fast because Chart.js isn't loaded yet
                </p>
              </div>
            )}

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowGoodExample(true)}
            >
              Show Sales Report
            </button>

            {showGoodExample && (
              <Suspense
                fallback={
                  <div className="p-4 bg-gray-100 rounded animate-pulse">
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-gray-600">Loading chart library...</p>
                    </div>
                  </div>
                }
              >
                <LazySalesChart />
              </Suspense>
            )}
          </div>
        </CodeExample>

        <CodeExample
          title="❌ Bad Example"
          description="Loading Chart.js (810KB+) immediately on page load"
          code={badExample}
        >
          <div className="space-y-4">
            {!showBadExample && (
              <div className="p-4 bg-red-50 rounded">
                <p className="text-sm text-red-700">
                  ⚠️ Page load is slower because Chart.js (810KB+) is included
                  in the main bundle
                </p>
              </div>
            )}

            {<SalesChart />}
          </div>
        </CodeExample>

        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-sm">
            👉 Open the Network tab in DevTools to see the difference in initial
            bundle size. The "Bad" example includes Chart.js (810KB+) in the
            main bundle, while the "Good" example downloads it only when needed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeSplittingPage;
