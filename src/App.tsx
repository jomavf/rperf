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
const DebounceThrottlePage = lazy(
  () => import("./pages/concepts/debounce-throttle")
);
const DebouncePage = lazy(
  () => import("./pages/concepts/debounce-throttle/debounce")
);
const ThrottlePage = lazy(
  () => import("./pages/concepts/debounce-throttle/throttle")
);
const ProfilingPage = lazy(() => import("./pages/concepts/profiling"));
const VirtualizationConceptPage = lazy(
  () => import("./pages/concepts/virtualization")
);
const BadExamplePage = lazy(
  () => import("./pages/concepts/virtualization/bad-example")
);
const GoodExamplePage = lazy(
  () => import("./pages/concepts/virtualization/good-example")
);

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
          <Route path="debounce-throttle" element={<DebounceThrottlePage />} />
          <Route path="profiling" element={<ProfilingPage />} />
          <Route
            path="virtualization"
            element={<VirtualizationConceptPage />}
          />
          <Route
            path="virtualization/bad-example"
            element={<BadExamplePage />}
          />
          <Route
            path="virtualization/good-example"
            element={<GoodExamplePage />}
          />
          <Route path="debounce-throttle/debounce" element={<DebouncePage />} />
          <Route path="debounce-throttle/throttle" element={<ThrottlePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
