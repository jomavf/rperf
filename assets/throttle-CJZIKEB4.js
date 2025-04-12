import{j as e,r}from"./index-DCKY2ykT.js";import{C as b}from"./CodeExample-BYOUyIeY.js";import{t as F}from"./throttle-CvGWbSDY.js";import"./extends-CF3RwP-h.js";import"./debounce-BpwJb8w8.js";const P=["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEEAD"],M=20,g=50,E=(c,i)=>({x:c,y:i,vx:(Math.random()-.5)*8,vy:(Math.random()-.5)*8,life:g,size:Math.random()*8+4,color:P[Math.floor(Math.random()*P.length)]}),C=(c,i,p)=>c.map(n=>{const m=i-n.x,h=p-n.y,f=Math.sqrt(m*m+h*h)+.01;return n.vx+=m/f*.8,n.vy+=h/f*.8,n.vx*=.92,n.vy*=.92,n.x+=n.vx,n.y+=n.vy,n.life-=1,n}).filter(n=>n.life>0),R=()=>{const c=r.useRef(null),[i,p]=r.useState([]),[n,m]=r.useState(0),[h,f]=r.useState(0),v=r.useRef(Date.now()),x=r.useRef(0);r.useEffect(()=>{const d=setInterval(()=>{const l=Date.now(),s=l-v.current;f(Math.round(x.current*1e3/s)),x.current=0,v.current=l},1e3);return()=>clearInterval(d)},[]),r.useEffect(()=>{let d;const l=c.current,s=l==null?void 0:l.getContext("2d"),a=()=>{!l||!s||(s.fillStyle="rgba(0, 0, 0, 0.1)",s.fillRect(0,0,l.width,l.height),i.forEach(t=>{s.beginPath(),s.arc(t.x,t.y,t.size,0,Math.PI*2),s.fillStyle=t.color+Math.floor(t.life/g*255).toString(16).padStart(2,"0"),s.fill()}),x.current++,d=requestAnimationFrame(a))};return a(),()=>cancelAnimationFrame(d)},[i]);const j=d=>{const l=c.current;if(!l)return;const s=l.getBoundingClientRect(),a=d.clientX-s.left,t=d.clientY-s.top,u=Array.from({length:M},()=>E(a,t));p(o=>{const y=C([...o,...u],a,t);return m(A=>A+1),y})};return e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between text-sm text-gray-500 mb-2",children:[e.jsxs("div",{children:["Updates: ",n]}),e.jsxs("div",{children:["FPS: ",h]})]}),e.jsx("canvas",{ref:c,width:600,height:400,onMouseMove:j,className:"border border-gray-200 rounded bg-gray-900"})]})},S=()=>{const c=r.useRef(null),[i,p]=r.useState([]),[n,m]=r.useState(0),[h,f]=r.useState(0),v=r.useRef(Date.now()),x=r.useRef(0);r.useEffect(()=>{const s=setInterval(()=>{const a=Date.now(),t=a-v.current;f(Math.round(x.current*1e3/t)),x.current=0,v.current=a},1e3);return()=>clearInterval(s)},[]),r.useEffect(()=>{let s;const a=c.current,t=a==null?void 0:a.getContext("2d"),u=()=>{!a||!t||(t.fillStyle="rgba(0, 0, 0, 0.15)",t.fillRect(0,0,a.width,a.height),i.forEach(o=>{t.beginPath(),t.arc(o.x,o.y,o.size,0,Math.PI*2);const y=(o.life/g).toFixed(2);t.fillStyle=o.color+"FF",t.globalAlpha=Number(y),t.fill(),t.globalAlpha=1}),x.current++,s=requestAnimationFrame(u))};return u(),()=>cancelAnimationFrame(s)},[i]);const j=r.useCallback((s,a)=>{const t=Array.from({length:M},()=>E(s,a));p(u=>{const o=C([...u,...t],s,a);return m(y=>y+1),o})},[]),d=r.useMemo(()=>F(j,16),[j]),l=s=>{const a=c.current;if(!a)return;const t=a.getBoundingClientRect(),u=s.clientX-t.left,o=s.clientY-t.top;d(u,o)};return e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between text-sm text-gray-500 mb-2",children:[e.jsxs("div",{children:["Updates: ",n]}),e.jsxs("div",{children:["FPS: ",h]})]}),e.jsx("canvas",{ref:c,width:600,height:400,onMouseMove:l,className:"border border-gray-200 rounded bg-gray-900"})]})},U=()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"prose",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"Throttle Example: Particle Animation"}),e.jsx("p",{children:"Throttling es esencial cuando trabajamos con animaciones e interacciones frecuentes del usuario. Este ejemplo muestra un sistema de partículas que sigue al cursor. Mueve el mouse rápidamente sobre los canvas y observa la diferencia:"}),e.jsxs("ul",{className:"list-disc list-inside mt-2",children:[e.jsx("li",{children:"En el ejemplo malo, las partículas se crean en CADA movimiento del mouse, causando sobrecarga"}),e.jsx("li",{children:"En el ejemplo bueno, las partículas se crean máximo 60 veces por segundo, manteniendo el rendimiento"})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx(b,{title:"❌ Bad Example: Sin Throttle",description:"Este ejemplo actualiza las partículas en CADA evento de mousemove. Mueve el mouse rápidamente y observa cómo el rendimiento se degrada (FPS bajan) y las actualizaciones se acumulan excesivamente.",code:`
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
};`,children:e.jsx(R,{})}),e.jsx(b,{title:"✅ Good Example: Con Throttle",description:"Este ejemplo limita las actualizaciones a 60fps (cada ~16ms). Observa cómo el FPS se mantiene estable y las actualizaciones son más controladas, resultando en una animación más suave.",code:`
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
);`,children:e.jsx(S,{})})]}),e.jsxs("div",{className:"bg-blue-50 p-4 rounded-lg",children:[e.jsx("h3",{className:"font-semibold text-blue-800",children:"¿Por qué usar Throttle en Animaciones?"}),e.jsxs("ul",{className:"list-disc list-inside mt-2 text-blue-700",children:[e.jsx("li",{children:"Mantiene un FPS estable y predecible"}),e.jsx("li",{children:"Previene la sobrecarga de cálculos"}),e.jsx("li",{children:"Mejora la suavidad de la animación"}),e.jsx("li",{children:"Reduce el uso de CPU y memoria"}),e.jsx("li",{children:"Evita la acumulación de eventos en la cola"})]})]})]});export{U as default};
