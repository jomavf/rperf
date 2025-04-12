import { useState, useCallback, useRef, Profiler, useMemo } from "react";
import CodeExample from "../../../components/CodeExample";
import throttle from "lodash/throttle";

interface RenderMetrics {
  id: string;
  phase: string;
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  timestamp: number;
}

const HeavyComponent = ({ index }: { index: number }) => {
  // Simulate heavy work during render
  const result = Array.from({ length: 10000 }, (_, i) => i * index).reduce(
    (acc, val) => acc + Math.sin(val),
    0
  );

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="font-semibold">Component {index}</h3>
      <p className="text-sm text-gray-600">Result: {result.toFixed(2)}</p>
    </div>
  );
};

const BadProfilerExample = () => {
  const [metrics, setMetrics] = useState<RenderMetrics[]>([]);
  const [components, setComponents] = useState<number[]>([1]);
  const [totalRenders, setTotalRenders] = useState(0);
  const [avgRenderTime, setAvgRenderTime] = useState(0);

  // Usar refs para acumular métricas sin causar re-renders
  const metricsRef = useRef<RenderMetrics[]>([]);
  const rendersRef = useRef(0);
  const totalTimeRef = useRef(0);

  // Actualizar el estado de forma controlada
  const updateMetricsDisplay = useCallback(() => {
    setMetrics(metricsRef.current.slice(-50));
    setTotalRenders(rendersRef.current);
    setAvgRenderTime(totalTimeRef.current / rendersRef.current);
  }, []);

  // Ejemplo Malo: Registrar cada render
  const handleRender = (
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    const newMetric: RenderMetrics = {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      timestamp: Date.now(),
    };

    // Acumular métricas en refs
    metricsRef.current = [...metricsRef.current.slice(-49), newMetric];
    rendersRef.current += 1;
    totalTimeRef.current += actualDuration;

    // Actualizar el estado de forma segura
    requestAnimationFrame(updateMetricsDisplay);
  };

  const addComponent = () => {
    setComponents((prev) => [...prev, prev.length + 1]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="text-sm text-gray-600">
            Total renders: {totalRenders}
          </div>
          <div className="text-sm text-gray-600">
            Average time: {avgRenderTime.toFixed(2)}ms
          </div>
        </div>
        <button
          onClick={addComponent}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Component
        </button>
      </div>

      <div className="space-y-2">
        <Profiler id="heavy-components" onRender={handleRender}>
          {components.map((index) => (
            <HeavyComponent key={index} index={index} />
          ))}
        </Profiler>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-2">Latest metrics:</h4>
        <div className="h-40 overflow-auto text-sm space-y-1">
          {metrics.map((metric, i) => (
            <div key={i} className="text-gray-600">
              {new Date(metric.timestamp).toLocaleTimeString()}: {metric.id} -
              {metric.actualDuration.toFixed(2)}ms
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GoodProfilerExample = () => {
  const [metrics, setMetrics] = useState<RenderMetrics[]>([]);
  const [components, setComponents] = useState<number[]>([1]);
  const [totalRenders, setTotalRenders] = useState(0);
  const [avgRenderTime, setAvgRenderTime] = useState(0);

  // Usar refs para acumular métricas sin causar re-renders
  const metricsRef = useRef<RenderMetrics[]>([]);
  const rendersRef = useRef(0);
  const totalTimeRef = useRef(0);

  // Good Example: Throttle updates
  const updateMetrics = useCallback(() => {
    setMetrics(metricsRef.current.slice(-50));
    setTotalRenders(rendersRef.current);
    setAvgRenderTime(totalTimeRef.current / rendersRef.current);
  }, []);

  const throttledUpdateMetrics = useMemo(
    () => throttle(updateMetrics, 1000),
    [updateMetrics]
  );

  const handleRender = (
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    const newMetric: RenderMetrics = {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      timestamp: Date.now(),
    };

    // Acumular métricas en refs
    metricsRef.current = [...metricsRef.current.slice(-49), newMetric];
    rendersRef.current += 1;
    totalTimeRef.current += actualDuration;

    // Actualizar el estado de forma throttled
    throttledUpdateMetrics();
  };

  const addComponent = () => {
    setComponents((prev) => [...prev, prev.length + 1]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="text-sm text-gray-600">
            Total renders: {totalRenders}
          </div>
          <div className="text-sm text-gray-600">
            Average time: {avgRenderTime.toFixed(2)}ms
          </div>
        </div>
        <button
          onClick={addComponent}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Component
        </button>
      </div>

      <div className="space-y-2">
        <Profiler id="heavy-components" onRender={handleRender}>
          {components.map((index) => (
            <HeavyComponent key={index} index={index} />
          ))}
        </Profiler>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-2">Latest metrics:</h4>
        <div className="h-40 overflow-auto text-sm space-y-1">
          {metrics.map((metric, i) => (
            <div key={i} className="text-gray-600">
              {new Date(metric.timestamp).toLocaleTimeString()}: {metric.id} -
              {metric.actualDuration.toFixed(2)}ms
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfilingPage = () => {
  return (
    <div className="space-y-8">
      <div className="prose">
        <h1 className="text-3xl font-bold">
          Throttle Example: React Profiler API
        </h1>
        <p>
          The React Profiler API is a powerful tool for measuring component
          render performance. However, in applications with many re-renders,
          recording every metric can impact performance. This example shows how
          throttling can help maintain efficient profiling.
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Each component performs a heavy calculation on every render</li>
          <li>You can add more components to increase the load</li>
          <li>
            Observe how metrics accumulate and their impact on performance
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <CodeExample
          title="❌ Bad Example: Without Throttle"
          description="This example records metrics on every render and displays them immediately. Add several components and observe how constant metric recording can affect performance."
          code={`
// Bad Example: Update on every render
const handleRender = (id, phase, actualDuration) => {
  const newMetric = {
    id,
    phase,
    actualDuration,
    timestamp: Date.now()
  };

  // 🚫 Update state on every render
  metricsRef.current = [...metricsRef.current, newMetric];
  rendersRef.current += 1;
  totalTimeRef.current += actualDuration;

  // 🚫 Force immediate update
  requestAnimationFrame(updateMetricsDisplay);
};`}
        >
          <BadProfilerExample />
        </CodeExample>

        <CodeExample
          title="✅ Good Example: With Throttle"
          description="This example accumulates metrics in refs and updates the UI at most once per second. Notice how performance remains stable even with many components."
          code={`
// Good Example: Throttle updates
const throttledUpdateMetrics = useCallback(
  throttle(() => {
    // ✅ Update state at most once per second
    setMetrics(metricsRef.current.slice(-50));
    setTotalRenders(rendersRef.current);
    setAvgRenderTime(totalTimeRef.current / rendersRef.current);
  }, 1000),
  []
);

const handleRender = (id, phase, actualDuration) => {
  // ✅ Accumulate metrics in refs (doesn't cause re-renders)
  metricsRef.current = [...metricsRef.current, newMetric];
  rendersRef.current += 1;
  totalTimeRef.current += actualDuration;

  // ✅ Update UI in a throttled way
  throttledUpdateMetrics();
};`}
        >
          <GoodProfilerExample />
        </CodeExample>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800">
          Why use Throttle with the Profiler API?
        </h3>
        <ul className="list-disc list-inside mt-2 text-blue-700">
          <li>Prevents infinite update loops</li>
          <li>Reduces state update overhead</li>
          <li>Maintains application performance</li>
          <li>Generates manageable profiling data</li>
          <li>Prevents profiling from affecting the metrics</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilingPage;
