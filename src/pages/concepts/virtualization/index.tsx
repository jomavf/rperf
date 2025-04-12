import { Link } from "react-router-dom";

const VirtualizationConceptPage = () => {
  return (
    <div className="space-y-6">
      <div className="prose">
        <h1 className="text-3xl font-bold">List Virtualization</h1>
        <p>
          List virtualization is a technique that improves performance by only
          rendering the items that are currently visible in the viewport. This
          is especially important when dealing with large lists of data, such as
          social media feeds, long tables, or infinite scrolling lists.
        </p>

        <h2 className="text-2xl font-bold">When to use it?</h2>
        <ul className="list-disc list-inside">
          <li>Social media feeds with many posts</li>
          <li>Data tables with hundreds/thousands of rows</li>
          <li>Product catalogs with infinite scroll</li>
          <li>Chat applications with message history</li>
          <li>Long lists of comments or reviews</li>
        </ul>

        <h2 className="text-2xl font-bold">When not to use it?</h2>
        <ul className="list-disc list-inside">
          <li>Short lists (less than 50 items)</li>
          <li>When all items need to be immediately searchable</li>
          <li>When items have highly variable heights</li>
          <ul className="list-disc list-inside pl-4">
            <li>
              Though libraries like react-virtualized support variable heights,
              it adds complexity
            </li>
            <li>
              Consider if the performance gain is worth the added complexity
            </li>
          </ul>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/virtualization/bad-example"
          className="block p-6 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">❌ Bad Example</h3>
          <p className="text-gray-600">
            See what happens when you render all 10,000 items at once.
            Experience the performance issues firsthand.
          </p>
        </Link>

        <Link
          to="/virtualization/good-example"
          className="block p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">✅ Good Example</h3>
          <p className="text-gray-600">
            See how virtualization keeps the page fast and responsive, even with
            10,000 items.
          </p>
        </Link>
      </div>

      <div className="prose">
        <h2 className="text-2xl font-bold">Implementation Tips</h2>
        <ul className="list-disc list-inside">
          <li>
            Use established libraries like react-window or react-virtualized
          </li>
          <li>Consider window size and scroll container dimensions</li>
          <li>
            Optimize item rendering (memo components if they're
            computation-heavy)
          </li>
          <li>
            Handle edge cases (variable heights, dynamic content updates, etc.)
          </li>
          <li>Test performance with realistic data volumes</li>
        </ul>
      </div>
    </div>
  );
};

export default VirtualizationConceptPage;
