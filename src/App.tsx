import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";

// Lazy load all concept pages
const MemoPage = lazy(() => import("./pages/concepts/MemoPage"));
const UseMemoPage = lazy(() => import("./pages/concepts/UseMemoPage"));
const UseCallbackPage = lazy(() => import("./pages/concepts/UseCallbackPage"));
const CodeSplittingPage = lazy(
  () => import("./pages/concepts/CodeSplittingPage")
);
const LazyLoadingPage = lazy(() => import("./pages/concepts/LazyLoadingPage"));
const VirtualListsPage = lazy(
  () => import("./pages/concepts/VirtualListsPage")
);
const DebounceThrottlePage = lazy(
  () => import("./pages/concepts/DebounceThrottlePage")
);
const ProfilingPage = lazy(() => import("./pages/concepts/ProfilingPage"));

function App() {
  return (
    <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <div className="text-center p-4">
                Select a concept from the menu to begin learning!
              </div>
            }
          />
          <Route path="memo" element={<MemoPage />} />
          <Route path="usememo" element={<UseMemoPage />} />
          <Route path="usecallback" element={<UseCallbackPage />} />
          <Route path="code-splitting" element={<CodeSplittingPage />} />
          <Route path="lazy-loading" element={<LazyLoadingPage />} />
          <Route path="virtual-lists" element={<VirtualListsPage />} />
          <Route path="debounce-throttle" element={<DebounceThrottlePage />} />
          <Route path="profiling" element={<ProfilingPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
