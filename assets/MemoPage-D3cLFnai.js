import{r as o,j as e}from"./index-YhaijA64.js";const i=({value:n,label:t})=>{const a=(s=>{let l=0;for(let c=0;c<1e6;c++)l+=s;return l})(n);return e.jsx("div",{className:"p-4 bg-white rounded shadow","data-react-scan":!0,children:e.jsxs("p",{children:[t,": ",a]})})},d=o.memo(({value:n})=>(console.log("Good ExpensiveComponent rendered"),e.jsx(i,{value:n,label:"Good"}))),h=({value:n})=>(console.warn("Bad ExpensiveComponent rendered"),e.jsx(i,{value:n,label:"Bad"})),p=()=>{const[n,t]=o.useState(0),[r,a]=o.useState(0);return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"prose",children:[e.jsx("h1",{children:"React.memo - Component Memoization"}),e.jsx("h2",{children:"What is it?"}),e.jsx("p",{children:"React.memo is a higher-order component that allows memoizing a component, preventing unnecessary re-renders when props haven't changed."}),e.jsx("h2",{children:"When to use it?"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Components that frequently receive the same props"}),e.jsx("li",{children:"Components with expensive calculations"}),e.jsx("li",{children:"Components that re-render frequently due to parent changes"})]})]}),e.jsxs("div",{className:"bg-gray-100 p-6 rounded-lg",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Practical Example"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{"data-react-scan-label":"Memoized Component",children:e.jsx(d,{value:n})}),e.jsx("div",{"data-react-scan-label":"Non-memoized Component",children:e.jsx(h,{value:n})}),e.jsxs("div",{className:"space-x-4",children:[e.jsxs("button",{className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",onClick:()=>t(s=>s+1),children:["Increment value (",n,")"]}),e.jsxs("button",{className:"px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600",onClick:()=>a(s=>s+1),children:["Update unrelated state (",r,")"]})]}),e.jsx("div",{className:"bg-yellow-100 p-4 rounded",children:e.jsx("p",{className:"text-sm",children:"👉 React Scan will highlight components when they re-render. Notice how the memoized component only re-renders when its value changes, while the non-memoized component re-renders on any parent update."})})]})]})]})};export{p as default};
