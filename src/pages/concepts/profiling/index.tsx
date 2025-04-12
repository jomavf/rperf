import { useState, useCallback, useEffect, useRef } from "react";
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
        <div>Eventos Procesados: {events}</div>
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
        <div>Eventos Procesados: {events}</div>
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

const ProfilingPage = () => {
  return (
    <div className="space-y-8">
      <div className="prose">
        <h1 className="text-3xl font-bold">
          Throttle Example: User Interaction Profiling
        </h1>
        <p>
          El profiling de interacciones de usuario puede ser intensivo en
          recursos, especialmente para eventos frecuentes como el movimiento del
          mouse. Este ejemplo visualiza el profiling de eventos del usuario y
          muestra cómo el throttling puede ayudar a mantener el rendimiento.
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Los puntos rojos representan clicks</li>
          <li>Los puntos verdes representan movimiento del mouse</li>
          <li>Los puntos azules representan eventos de scroll</li>
          <li>Los puntos amarillos representan pulsaciones de teclas</li>
        </ul>
      </div>

      <div className="space-y-6">
        <CodeExample
          title="❌ Bad Example: Sin Throttle"
          description="Este ejemplo realiza profiling en CADA evento. Mueve el mouse rápidamente, haz click o presiona teclas y observa cómo el rendimiento se degrada rápidamente."
          code={`
// Ejemplo Malo: Profiling en cada evento
const handleEvent = (e) => {
  // Recolectar datos de profiling
  const profileData = {
    x: e.clientX,
    y: e.clientY,
    timestamp: Date.now(),
    eventType: e.type,
    elementInfo: e.target.tagName
  };

  // 🚫 Trabajo pesado en CADA evento
  Array.from({ length: 1000 }).forEach(() => {
    JSON.parse(JSON.stringify(profileData));
  });

  // Actualizar visualización
  setPoints(prev => [...prev, createVisualizationPoint(profileData)]);
  setEvents(e => e + 1); // 🚫 Los eventos se acumulan rápidamente
};`}
        >
          <BadProfilingExample />
        </CodeExample>

        <CodeExample
          title="✅ Good Example: Con Throttle"
          description="Este ejemplo limita el profiling a 10 veces por segundo. Observa cómo el rendimiento se mantiene estable incluso con muchas interacciones."
          code={`
// Ejemplo Bueno: Profiling throttled
const throttledProfile = useCallback(
  throttle((e) => {
    // Recolectar datos de profiling
    const profileData = {
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
      eventType: e.type,
      elementInfo: e.target.tagName
    };

    // ✅ Trabajo pesado limitado a 10 veces por segundo
    Array.from({ length: 1000 }).forEach(() => {
      JSON.parse(JSON.stringify(profileData));
    });

    // Actualizar visualización
    setPoints(prev => [...prev, createVisualizationPoint(profileData)]);
    setEvents(e => e + 1); // ✅ Eventos controlados
  }, 100), // 10 profiles por segundo
  []
);`}
        >
          <GoodProfilingExample />
        </CodeExample>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800">
          ¿Por qué usar Throttle en Profiling?
        </h3>
        <ul className="list-disc list-inside mt-2 text-blue-700">
          <li>Reduce la sobrecarga de procesamiento</li>
          <li>Mantiene una tasa de muestreo consistente</li>
          <li>Previene la degradación del rendimiento</li>
          <li>Genera conjuntos de datos más manejables</li>
          <li>Mejora la experiencia del usuario final</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilingPage;
