import { useState, useCallback, useEffect, useRef } from "react";
import CodeExample from "../../../components/CodeExample";
import throttle from "lodash/throttle";

// Simulated API call to fetch more products
const fetchMoreProducts = async (page: number) => {
  console.log(`📦 API Call: Fetching page ${page}`);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return Array.from({ length: 10 }, (_, i) => ({
    id: page * 10 + i,
    title: `Product ${page * 10 + i + 1}`,
    price: Math.round(Math.random() * 100 + 10),
    description: `This is a sample product description for item ${
      page * 10 + i + 1
    }. It might be longer or shorter depending on the product.`,
    image: `https://picsum.photos/seed/${page * 10 + i}/200/200`,
  }));
};

// Simulated heavy calculation to demonstrate performance impact
const performHeavyCalculation = () => {
  let result = 0;
  for (let i = 0; i < 10000; i++) {
    result += Math.sin(i) * Math.cos(i);
  }
  return result;
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"];
const PARTICLE_COUNT = 20;
const PARTICLE_LIFE = 50;

const createParticle = (x: number, y: number): Particle => ({
  x,
  y,
  vx: (Math.random() - 0.5) * 8,
  vy: (Math.random() - 0.5) * 8,
  life: PARTICLE_LIFE,
  size: Math.random() * 8 + 4,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
});

const updateParticles = (
  particles: Particle[],
  targetX: number,
  targetY: number
): Particle[] => {
  return particles
    .map((p) => {
      // Calculate direction to target
      const dx = targetX - p.x;
      const dy = targetY - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy) + 0.01;

      // Update velocity with some attraction to target
      p.vx += (dx / distance) * 0.8;
      p.vy += (dy / distance) * 0.8;

      // Apply some drag
      p.vx *= 0.92;
      p.vy *= 0.92;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Update life
      p.life -= 1;

      return p;
    })
    .filter((p) => p.life > 0);
};

const BadParticleExample = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [updates, setUpdates] = useState(0);
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

      // Clear canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.floor((p.life / PARTICLE_LIFE) * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();
      });

      frameCountRef.current++;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [particles]);

  // Bad Example: Update on every mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add new particles
    const newParticles = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(x, y)
    );

    // Update existing particles
    setParticles((prev) => {
      const updated = updateParticles([...prev, ...newParticles], x, y);
      setUpdates((u) => u + 1);
      return updated;
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <div>Updates: {updates}</div>
        <div>FPS: {fps}</div>
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseMove={handleMouseMove}
        className="border border-gray-200 rounded bg-gray-900"
      />
    </div>
  );
};

const GoodParticleExample = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [updates, setUpdates] = useState(0);
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

      // Clear canvas with trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Calculate opacity based on life
        const opacity = (p.life / PARTICLE_LIFE).toFixed(2);
        ctx.fillStyle = p.color + "FF"; // Force full opacity in hex
        ctx.globalAlpha = Number(opacity);

        ctx.fill();
        ctx.globalAlpha = 1;
      });

      frameCountRef.current++;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [particles]);

  // Good Example: Throttle updates to 60fps (approximately every 16ms)
  const throttledMouseMove = useCallback(
    throttle((x: number, y: number) => {
      // Add new particles
      const newParticles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(x, y)
      );

      // Update existing particles
      setParticles((prev) => {
        const updated = updateParticles([...prev, ...newParticles], x, y);
        setUpdates((u) => u + 1);
        return updated;
      });
    }, 16),
    []
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    throttledMouseMove(x, y);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <div>Updates: {updates}</div>
        <div>FPS: {fps}</div>
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseMove={handleMouseMove}
        className="border border-gray-200 rounded bg-gray-900"
      />
    </div>
  );
};

const ThrottlePage = () => {
  return (
    <div className="space-y-8">
      <div className="prose">
        <h1 className="text-3xl font-bold">
          Throttle Example: Particle Animation
        </h1>
        <p>
          Throttling es esencial cuando trabajamos con animaciones e
          interacciones frecuentes del usuario. Este ejemplo muestra un sistema
          de partículas que sigue al cursor. Mueve el mouse rápidamente sobre
          los canvas y observa la diferencia:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>
            En el ejemplo malo, las partículas se crean en CADA movimiento del
            mouse, causando sobrecarga
          </li>
          <li>
            En el ejemplo bueno, las partículas se crean máximo 60 veces por
            segundo, manteniendo el rendimiento
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <CodeExample
          title="❌ Bad Example: Sin Throttle"
          description="Este ejemplo actualiza las partículas en CADA evento de mousemove. Mueve el mouse rápidamente y observa cómo el rendimiento se degrada (FPS bajan) y las actualizaciones se acumulan excesivamente."
          code={`
// Ejemplo Malo: Actualizar en cada movimiento del mouse
const handleMouseMove = (e) => {
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 🚫 Crear y actualizar partículas en CADA movimiento
  const newParticles = Array.from(
    { length: 20 }, 
    () => createParticle(x, y)
  );
  
  setParticles(prev => {
    const updated = updateParticles([...prev, ...newParticles], x, y);
    setUpdates(u => u + 1); // 🚫 Los updates se disparan
    return updated;
  });
};`}
        >
          <BadParticleExample />
        </CodeExample>

        <CodeExample
          title="✅ Good Example: Con Throttle"
          description="Este ejemplo limita las actualizaciones a 60fps (cada ~16ms). Observa cómo el FPS se mantiene estable y las actualizaciones son más controladas, resultando en una animación más suave."
          code={`
// Ejemplo Bueno: Usando throttle para 60fps
const throttledMouseMove = useCallback(
  throttle((x, y) => {
    // ✅ Crear y actualizar partículas máximo 60 veces por segundo
    const newParticles = Array.from(
      { length: 20 }, 
      () => createParticle(x, y)
    );
    
    setParticles(prev => {
      const updated = updateParticles([...prev, ...newParticles], x, y);
      setUpdates(u => u + 1); // ✅ Updates controlados
      return updated;
    });
  }, 16), // Target: 60fps (1000ms / 60 ≈ 16ms)
  []
);`}
        >
          <GoodParticleExample />
        </CodeExample>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800">
          ¿Por qué usar Throttle en Animaciones?
        </h3>
        <ul className="list-disc list-inside mt-2 text-blue-700">
          <li>Mantiene un FPS estable y predecible</li>
          <li>Previene la sobrecarga de cálculos</li>
          <li>Mejora la suavidad de la animación</li>
          <li>Reduce el uso de CPU y memoria</li>
          <li>Evita la acumulación de eventos en la cola</li>
        </ul>
      </div>
    </div>
  );
};

export default ThrottlePage;
