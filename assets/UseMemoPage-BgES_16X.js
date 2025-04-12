import{r,j as e}from"./index-DCKY2ykT.js";import{C as u}from"./CodeExample-BYOUyIeY.js";import"./extends-CF3RwP-h.js";const h=({value:s,label:a})=>{const o=(i=>{let n=0;for(let c=0;c<1e6;c++)n+=i;return n})(s);return e.jsx("div",{className:"p-4 bg-white rounded shadow","data-react-scan":!0,children:e.jsxs("p",{children:[a,": ",o]})})},v=()=>{const[s,a]=r.useState(0),[d,o]=r.useState(0),i=r.useMemo(()=>{console.log("Good calculation executed");let t=0;for(let l=0;l<1e6;l++)t+=s;return t},[s]),n=(()=>{console.warn("Bad calculation executed");let t=0;for(let l=0;l<1e6;l++)t+=s;return t})();return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"prose",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"What is it?"}),e.jsx("p",{children:"useMemo is a React Hook that memoizes the result of a computation, preventing it from being recalculated on every render unless its dependencies change."}),e.jsx("h2",{className:"text-2xl font-bold",children:"When to use it?"}),e.jsxs("ul",{className:"list-disc list-inside",children:[e.jsx("li",{children:"When you have computationally expensive calculations"}),e.jsx("li",{children:"When you want to avoid recreating objects on every render"}),e.jsx("li",{children:"When a value is used in the dependency array of other hooks"})]}),e.jsx("h2",{className:"text-2xl font-bold",children:"When not to use it?"}),e.jsxs("ul",{className:"list-disc list-inside",children:[e.jsx("li",{children:"For simple calculations or operations"}),e.jsx("li",{children:"When the value changes frequently"}),e.jsx("li",{children:"When the computation is not expensive"}),e.jsxs("ul",{className:"list-disc list-inside",children:[e.jsx("li",{children:"Why? Because the overhead of creating and maintaining the memoized value might be more expensive than just recalculating it."}),e.jsx("li",{children:"Remember: Premature optimization is the root of all evil!"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(u,{title:"✅ Good Example",description:"Using useMemo to memoize expensive calculations",code:`
// Good Example: Using useMemo
const memoizedValue = useMemo(() => {
  console.log("Good calculation executed");
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += count;
  }
  return result;
}, [count]); // Only recalculate when count changes
`,children:e.jsx("div",{"data-react-scan-label":"Memoized Value",children:e.jsx(h,{value:i,label:"Good"})})}),e.jsx(u,{title:"❌ Bad Example",description:"Not using useMemo causes unnecessary recalculations",code:`
// Bad Example: Not using useMemo
const nonMemoizedValue = (() => {
  console.warn("Bad calculation executed");
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += count;
  }
  return result;
})();
`,children:e.jsx("div",{"data-react-scan-label":"Non-memoized Value",children:e.jsx(h,{value:n,label:"Bad"})})}),e.jsxs("div",{className:"space-x-4",children:[e.jsxs("button",{className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",onClick:()=>a(t=>t+1),children:["Increment value (",s,")"]}),e.jsxs("button",{className:"px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600",onClick:()=>o(t=>t+1),children:["Update unrelated state (",d,")"]})]}),e.jsx("div",{className:"bg-yellow-100 p-4 rounded",children:e.jsx("p",{className:"text-sm",children:"👉 Open the console to see when calculations are executed. Notice how the memoized calculation only runs when the count changes, while the non-memoized calculation runs on every render."})})]})]})};export{v as default};
