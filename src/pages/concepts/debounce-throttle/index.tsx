import { Link } from "react-router-dom";

const DebounceThrottlePage = () => {
  return (
    <div className="space-y-8">
      <div className="prose">
        <h1 className="text-3xl font-bold">Debounce & Throttle</h1>
        <p>
          Debouncing and throttling are techniques to control how many times we
          execute a function, helping to improve performance and prevent
          unnecessary API calls or calculations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/debounce-throttle/debounce"
          className="block p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">Debounce Example</h3>
          <p className="text-gray-600 mb-4">
            See how debouncing improves search input performance by waiting for
            the user to stop typing before making API calls.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-500">
            <li>Search inputs</li>
            <li>Form validation</li>
            <li>Save drafts</li>
            <li>Window resize events</li>
          </ul>
        </Link>

        <Link
          to="/debounce-throttle/throttle"
          className="block p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">Throttle Example</h3>
          <p className="text-gray-600 mb-4">
            Experience how throttling smooth out mouse tracking by limiting the
            rate of expensive calculations.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-500">
            <li>Mouse tracking</li>
            <li>Window scrolling</li>
            <li>Game updates</li>
            <li>Chart animations</li>
          </ul>
        </Link>
      </div>

      <div className="prose">
        <h2 className="text-2xl font-bold">Key Differences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold text-blue-600">Debounce</h3>
            <p>
              Waits for a pause in the events before executing. Like waiting for
              someone to stop typing before searching.
            </p>
            <p className="text-sm text-gray-600">
              Best for: Events that should only trigger after activity stops
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-green-600">Throttle</h3>
            <p>
              Executes at a regular interval while events are occurring. Like
              updating a game's physics 60 times per second.
            </p>
            <p className="text-sm text-gray-600">
              Best for: Events that should trigger at a steady rate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebounceThrottlePage;
