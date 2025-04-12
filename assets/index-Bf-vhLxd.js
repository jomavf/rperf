import{j as e,r as t}from"./index-DCKY2ykT.js";import{C as b}from"./CodeExample-BYOUyIeY.js";import{t as M}from"./throttle-CvGWbSDY.js";import"./extends-CF3RwP-h.js";import"./debounce-BpwJb8w8.js";const w=({index:i})=>{const d=Array.from({length:1e4},(o,n)=>n*i).reduce((o,n)=>o+Math.sin(n),0);return e.jsxs("div",{className:"p-4 bg-white rounded shadow-sm",children:[e.jsxs("h3",{className:"font-semibold",children:["Component ",i]}),e.jsxs("p",{className:"text-sm text-gray-600",children:["Result: ",d.toFixed(2)]})]})},A=()=>{const[i,d]=t.useState([]),[o,n]=t.useState([1]),[p,x]=t.useState(0),[f,j]=t.useState(0),a=t.useRef([]),c=t.useRef(0),m=t.useRef(0),h=t.useCallback(()=>{d(a.current.slice(-50)),x(c.current),j(m.current/c.current)},[]),v=(r,s,l,u,y,g)=>{const N={id:r,phase:s,actualDuration:l,baseDuration:u,startTime:y,commitTime:g,timestamp:Date.now()};a.current=[...a.current.slice(-49),N],c.current+=1,m.current+=l,requestAnimationFrame(h)},R=()=>{n(r=>[...r,r.length+1])};return e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"text-sm text-gray-600",children:["Total renders: ",p]}),e.jsxs("div",{className:"text-sm text-gray-600",children:["Average time: ",f.toFixed(2),"ms"]})]}),e.jsx("button",{onClick:R,className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",children:"Add Component"})]}),e.jsx("div",{className:"space-y-2",children:e.jsx(t.Profiler,{id:"heavy-components",onRender:v,children:o.map(r=>e.jsx(w,{index:r},r))})}),e.jsxs("div",{className:"mt-4",children:[e.jsx("h4",{className:"font-semibold mb-2",children:"Latest metrics:"}),e.jsx("div",{className:"h-40 overflow-auto text-sm space-y-1",children:i.map((r,s)=>e.jsxs("div",{className:"text-gray-600",children:[new Date(r.timestamp).toLocaleTimeString(),": ",r.id," -",r.actualDuration.toFixed(2),"ms"]},s))})]})]})},C=()=>{const[i,d]=t.useState([]),[o,n]=t.useState([1]),[p,x]=t.useState(0),[f,j]=t.useState(0),a=t.useRef([]),c=t.useRef(0),m=t.useRef(0),h=t.useCallback(()=>{d(a.current.slice(-50)),x(c.current),j(m.current/c.current)},[]),v=t.useMemo(()=>M(h,1e3),[h]),R=(s,l,u,y,g,N)=>{const T={id:s,phase:l,actualDuration:u,baseDuration:y,startTime:g,commitTime:N,timestamp:Date.now()};a.current=[...a.current.slice(-49),T],c.current+=1,m.current+=u,v()},r=()=>{n(s=>[...s,s.length+1])};return e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"text-sm text-gray-600",children:["Total renders: ",p]}),e.jsxs("div",{className:"text-sm text-gray-600",children:["Average time: ",f.toFixed(2),"ms"]})]}),e.jsx("button",{onClick:r,className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",children:"Add Component"})]}),e.jsx("div",{className:"space-y-2",children:e.jsx(t.Profiler,{id:"heavy-components",onRender:R,children:o.map(s=>e.jsx(w,{index:s},s))})}),e.jsxs("div",{className:"mt-4",children:[e.jsx("h4",{className:"font-semibold mb-2",children:"Latest metrics:"}),e.jsx("div",{className:"h-40 overflow-auto text-sm space-y-1",children:i.map((s,l)=>e.jsxs("div",{className:"text-gray-600",children:[new Date(s.timestamp).toLocaleTimeString(),": ",s.id," -",s.actualDuration.toFixed(2),"ms"]},l))})]})]})},F=()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"prose",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"Throttle Example: React Profiler API"}),e.jsx("p",{children:"The React Profiler API is a powerful tool for measuring component render performance. However, in applications with many re-renders, recording every metric can impact performance. This example shows how throttling can help maintain efficient profiling."}),e.jsxs("ul",{className:"list-disc list-inside mt-2",children:[e.jsx("li",{children:"Each component performs a heavy calculation on every render"}),e.jsx("li",{children:"You can add more components to increase the load"}),e.jsx("li",{children:"Observe how metrics accumulate and their impact on performance"})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx(b,{title:"❌ Bad Example: Without Throttle",description:"This example records metrics on every render and displays them immediately. Add several components and observe how constant metric recording can affect performance.",code:`
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
};`,children:e.jsx(A,{})}),e.jsx(b,{title:"✅ Good Example: With Throttle",description:"This example accumulates metrics in refs and updates the UI at most once per second. Notice how performance remains stable even with many components.",code:`
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
};`,children:e.jsx(C,{})})]}),e.jsxs("div",{className:"bg-blue-50 p-4 rounded-lg",children:[e.jsx("h3",{className:"font-semibold text-blue-800",children:"Why use Throttle with the Profiler API?"}),e.jsxs("ul",{className:"list-disc list-inside mt-2 text-blue-700",children:[e.jsx("li",{children:"Prevents infinite update loops"}),e.jsx("li",{children:"Reduces state update overhead"}),e.jsx("li",{children:"Maintains application performance"}),e.jsx("li",{children:"Generates manageable profiling data"}),e.jsx("li",{children:"Prevents profiling from affecting the metrics"})]})]})]});export{F as default};
