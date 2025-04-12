import { useState, useCallback, useEffect, useRef, Profiler } from "react";
import CodeExample from "../../../components/CodeExample";
import throttle from "lodash/throttle";

interface ProfileData {
  x: number;
  y: number;
  timestamp: number;
  eventType: string;
  elementInfo: string;
}

interface VisualizationPoint {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  label: string;
}

interface RenderMetrics {
  id: string;
  phase: string;
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  timestamp: number;
}

const COLORS = {
  click: "#FF6B6B",
  mousemove: "#4ECDC4",
  scroll: "#45B7D1",
  keypress: "#96CEB4",
};

const MAX_POINTS = 100;
const POINT_LIFE = 200;

const createVisualizationPoint = (data: ProfileData): VisualizationPoint => ({
  x: data.x,
  y: data.y,
  size: data.eventType === "click" ? 12 : 8,
  color: COLORS[data.eventType as keyof typeof COLORS] || "#FFEEAD",
  opacity: 1,
  label: `${data.eventType} - ${data.elementInfo}`,
});

// Component that simulates a heavy load
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

const BadProfilingExample = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<VisualizationPoint[]>([]);
  const [events, setEvents] = useState(0);
  const [fps, setFps] = useState(0);
  const lastTimeRef = useRef(Date.now());
  const frameCountRef = useRef(0);

  // Update FPS counter every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTimeRef.current;
      setFps(Math.round((frameCountRef.current * 1000) / delta));
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animation loop
  useEffect(() => {
    let animationFrame: number;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const animate = () => {
      if (!canvas || !ctx) return;

      // Clear canvas with slight trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw points
      setPoints((prevPoints) =>
        prevPoints
          .map((point) => ({
            ...point,
            opacity: point.opacity - 0.01,
          }))
          .filter((point) => point.opacity > 0)
      );

      // Draw points
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.globalAlpha = point.opacity;
        ctx.fill();

        // Draw label
        ctx.font = "10px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText(point.label, point.x + point.size + 5, point.y);
        ctx.globalAlpha = 1;
      });

      frameCountRef.current++;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [points]);

  // Bad Example: Profile every single event
  const handleEvent = (e: React.MouseEvent | React.KeyboardEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = "clientX" in e ? e.clientX - rect.left : rect.width / 2;
    const y = "clientY" in e ? e.clientY - rect.top : rect.height / 2;

    // Collect profile data
    const profileData: ProfileData = {
      x,
      y,
      timestamp: Date.now(),
      eventType: e.type,
      elementInfo: (e.target as HTMLElement).tagName.toLowerCase(),
    };

    // Simulate heavy profiling work
    Array.from({ length: 1000 }).forEach(() => {
      JSON.parse(JSON.stringify(profileData));
    });

    // Create visualization point
    const newPoint = createVisualizationPoint(profileData);

    setPoints((prev) => [...prev.slice(-MAX_POINTS), newPoint]);
    setEvents((e) => e + 1);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <div>Processed Events: {events}</div>
        <div>FPS: {fps}</div>
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onClick={handleEvent}
        onMouseMove={handleEvent}
        onKeyPress={handleEvent}
        tabIndex={0}
        className="border border-gray-200 rounded bg-gray-900 focus:outline-none"
      />
    </div>
  );
};

const GoodProfilingExample = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<VisualizationPoint[]>([]);
  const [events, setEvents] = useState(0);
  const [fps, setFps] = useState(0);
  const lastTimeRef = useRef(Date.now());
  const frameCountRef = useRef(0);

  // Update FPS counter every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTimeRef.current;
      setFps(Math.round((frameCountRef.current * 1000) / delta));
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animation loop
  useEffect(() => {
    let animationFrame: number;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const animate = () => {
      if (!canvas || !ctx) return;

      // Clear canvas with slight trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw points
      setPoints((prevPoints) =>
        prevPoints
          .map((point) => ({
            ...point,
            opacity: point.opacity - 0.01,
          }))
          .filter((point) => point.opacity > 0)
      );

      // Draw points
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.globalAlpha = point.opacity;
        ctx.fill();

        // Draw label
        ctx.font = "10px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText(point.label, point.x + point.size + 5, point.y);
        ctx.globalAlpha = 1;
      });

      frameCountRef.current++;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [points]);

  // Good Example: Throttle event profiling
  const throttledProfile = useCallback(
    throttle((e: React.MouseEvent | React.KeyboardEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = "clientX" in e ? e.clientX - rect.left : rect.width / 2;
      const y = "clientY" in e ? e.clientY - rect.top : rect.height / 2;

      // Collect profile data
      const profileData: ProfileData = {
        x,
        y,
        timestamp: Date.now(),
        eventType: e.type,
        elementInfo: (e.target as HTMLElement).tagName.toLowerCase(),
      };

      // Simulate heavy profiling work
      Array.from({ length: 1000 }).forEach(() => {
        JSON.parse(JSON.stringify(profileData));
      });

      // Create visualization point
      const newPoint = createVisualizationPoint(profileData);

      setPoints((prev) => [...prev.slice(-MAX_POINTS), newPoint]);
      setEvents((e) => e + 1);
    }, 100), // Throttle to 10 profiles per second
    []
  );

  const handleEvent = (e: React.MouseEvent | React.KeyboardEvent) => {
    throttledProfile(e);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <div>Processed Events: {events}</div>
        <div>FPS: {fps}</div>
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onClick={handleEvent}
        onMouseMove={handleEvent}
        onKeyPress={handleEvent}
        tabIndex={0}
        className="border border-gray-200 rounded bg-gray-900 focus:outline-none"
      />
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

  // Ejemplo Bueno: Throttle las actualizaciones de métricas
  const throttledUpdateMetrics = useCallback(
    throttle(() => {
      setMetrics(metricsRef.current.slice(-50));
      setTotalRenders(rendersRef.current);
      setAvgRenderTime(totalTimeRef.current / rendersRef.current);
    }, 1000), // Actualizar máximo una vez por segundo
    []
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
