import{r as l,j as e}from"./index-MCpwMBKj.js";import{C as c}from"./CodeExample-DnyVZZkH.js";const d=({value:n,label:s})=>{const o=(i=>{let a=0;for(let t=0;t<1e6;t++)a+=i;return a})(n);return e.jsx("div",{className:"p-4 bg-white rounded shadow","data-react-scan":!0,children:e.jsxs("p",{children:[s,": ",o]})})},m=l.memo(({value:n})=>(console.log("Good ExpensiveComponent rendered"),e.jsx(d,{value:n,label:"Good"}))),p=({value:n})=>(console.warn("Bad ExpensiveComponent rendered"),e.jsx(d,{value:n,label:"Bad"})),x=()=>{const[n,s]=l.useState(0),[r,o]=l.useState(0);return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"prose",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"What is it?"}),e.jsx("p",{children:"React.memo is a higher-order component that allows memoizing a component, preventing unnecessary re-renders when props haven't changed."}),e.jsx("h2",{className:"text-2xl font-bold",children:"When to use it?"}),e.jsxs("ul",{className:"list-disc list-inside",children:[e.jsx("li",{children:"Components that frequently receive the same props"}),e.jsx("li",{children:"Components with expensive calculations"}),e.jsx("li",{children:"Components that re-render frequently due to parent changes"})]}),e.jsx("h2",{className:"text-2xl font-bold",children:"When not to use it?"}),e.jsxs("ul",{className:"list-disc list-inside",children:[e.jsx("li",{children:"Components that receive unique props"}),e.jsx("li",{children:"Components that don't have expensive calculations"}),e.jsx("li",{children:"Components that don't re-render frequently"}),e.jsxs("ul",{className:"list-disc list-inside",children:[e.jsx("li",{children:"Why? Because it's not worth the overhead of memoizing a component that doesn't have expensive calculations and doesn't re-render frequently."}),e.jsx("li",{children:"The overhead of memoizing the component is greater than the benefit of preventing unnecessary re-renders."})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(c,{title:"✅ Good Example",description:"Using React.memo to prevent unnecessary re-renders",code:`
// Good Example: Using React.memo
const MemoExpensiveComponent = memo(({ value }: { value: number }) => {
  console.log("Good ExpensiveComponent rendered");
  return <TestComponent value={value} label="Good" />;
});

// Usage
<MemoExpensiveComponent value={count} />
`,children:e.jsx("div",{"data-react-scan-label":"Memoized Component",children:e.jsx(m,{value:n})})}),e.jsx(c,{title:"❌ Bad Example",description:"Not using memo causes unnecessary re-renders",code:`
// Bad Example: Not using memo for expensive components
const WithoutMemoExpensiveComponent = ({ value }: { value: number }) => {
  console.warn("Bad ExpensiveComponent rendered");
  return <TestComponent value={value} label="Bad" />;
};

// Usage
<WithoutMemoExpensiveComponent value={count} />
`,children:e.jsx("div",{"data-react-scan-label":"Non-memoized Component",children:e.jsx(p,{value:n})})}),e.jsxs("div",{className:"space-x-4",children:[e.jsxs("button",{className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",onClick:()=>s(t=>t+1),children:["Increment value (",n,")"]}),e.jsxs("button",{className:"px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600",onClick:()=>o(t=>t+1),children:["Update unrelated state (",r,")"]})]}),e.jsx("div",{className:"bg-yellow-100 p-4 rounded",children:e.jsx("p",{className:"text-sm",children:"👉 React Scan will highlight components when they re-render. Notice how the memoized component only re-renders when its value changes, while the non-memoized component re-renders on any parent update."})})]})]})};export{x as default};
