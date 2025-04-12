import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">
            React Performance Concepts
          </h1>
          <ul className="space-y-2">
            <li>
              <Link to="/memo" className="text-blue-600 hover:text-blue-800">
                Memo/Memoization
              </Link>
            </li>
            <li>
              <Link to="/usememo" className="text-blue-600 hover:text-blue-800">
                useMemo Hook
              </Link>
            </li>
            <li>
              <Link
                to="/usecallback"
                className="text-blue-600 hover:text-blue-800"
              >
                useCallback Hook
              </Link>
            </li>
            <li>
              <Link
                to="/code-splitting"
                className="text-blue-600 hover:text-blue-800"
              >
                Code Splitting
              </Link>
            </li>
            <li>
              <Link
                to="/lazy-loading"
                className="text-blue-600 hover:text-blue-800"
              >
                Lazy Loading
              </Link>
            </li>
            <li>
              <Link
                to="/virtualization"
                className="text-blue-600 hover:text-blue-800"
              >
                Virtual Lists
              </Link>
            </li>
            <li>
              <Link
                to="/debounce-throttle"
                className="text-blue-600 hover:text-blue-800"
              >
                Debounce & Throttle
              </Link>
            </li>
            <li>
              <Link
                to="/profiling"
                className="text-blue-600 hover:text-blue-800"
              >
                Component Profiling
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
