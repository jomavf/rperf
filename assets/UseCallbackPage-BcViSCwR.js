import{r as a,j as e}from"./index-DBbMUpSG.js";import{C as s}from"./CodeExample-DaxyL2HO.js";const l=a.memo(({onAction:o,label:t})=>(console.log(`${t} child rendered`),e.jsxs("div",{className:"p-4 bg-white rounded shadow","data-react-scan":!0,children:[e.jsxs("p",{className:"mb-2",children:[t," Component"]}),e.jsx("button",{className:"px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600",onClick:o,children:"Trigger Action"})]}))),u=()=>{const[,o]=a.useState(0),[t,c]=a.useState(0),i=a.useCallback(()=>{console.log("Good callback executed"),o(n=>n+1)},[]),d=()=>{console.warn("Bad callback executed"),o(n=>n+1)};return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"prose",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"What is it?"}),e.jsx("p",{children:"useCallback is a React Hook that returns a memoized version of a callback function that only changes if one of its dependencies has changed. It's particularly useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders."}),e.jsx("h2",{className:"text-2xl font-bold",children:"When to use it?"}),e.jsxs("ul",{className:"list-disc list-inside",children:[e.jsx("li",{children:"When passing callbacks to memoized child components (using React.memo)"}),e.jsx("li",{children:"When a callback is used as a dependency in other hooks"}),e.jsx("li",{children:"When you want to maintain referential equality between renders"})]}),e.jsx("h2",{className:"text-2xl font-bold",children:"When not to use it?"}),e.jsxs("ul",{className:"list-disc list-inside",children:[e.jsx("li",{children:"For callbacks passed to regular, non-memoized components"}),e.jsx("li",{children:"When the callback changes frequently with different dependencies"}),e.jsx("li",{children:"For simple event handlers that don't affect child component optimization"}),e.jsxs("ul",{className:"list-disc list-inside",children:[e.jsx("li",{children:"Why? Because the overhead of creating and maintaining the memoized callback might be more expensive than the potential benefits."}),e.jsx("li",{children:"Remember: useCallback is not a performance optimization by itself, it needs to be used in conjunction with React.memo or similar optimizations."})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{title:"✅ Good Example",description:"Using useCallback with a memoized child component",code:`
// Good Example: Using useCallback with a memoized child component
const MemoizedChild = memo(({ onAction }) => {
  console.log("Child rendered");
  return <button onClick={onAction}>Action</button>;
});

// Parent component
const memoizedCallback = useCallback(() => {
  console.log("Good callback executed");
  setCount(c => c + 1);
}, []); // Empty deps array since we use the function updater

<MemoizedChild onAction={memoizedCallback} />
`,children:e.jsx("div",{"data-react-scan-label":"Memoized Callback",children:e.jsx(l,{onAction:i,label:"Good"})})}),e.jsx(s,{title:"❌ Bad Example",description:"Not using useCallback causes child component to re-render unnecessarily because the onAction prop is a new function on every render. This breaks the memoization of the child component.",code:`
// Bad Example: Not using useCallback with a memoized child component
const MemoizedChild = memo(({ onAction }) => {
  console.log("Child rendered");
  return <button onClick={onAction}>Action</button>;
});

// Parent component
const nonMemoizedCallback = () => {
  console.warn("Bad callback executed");
  setCount(c => c + 1);
};

<MemoizedChild onAction={nonMemoizedCallback} />
`,children:e.jsx("div",{"data-react-scan-label":"Non-memoized Callback",children:e.jsx(l,{onAction:d,label:"Bad"})})}),e.jsx("div",{className:"space-x-4",children:e.jsxs("button",{className:"px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600",onClick:()=>c(n=>n+1),children:["Update unrelated state (",t,")"]})}),e.jsx("div",{className:"bg-yellow-100 p-4 rounded",children:e.jsx("p",{className:"text-sm",children:'👉 Open the console to see component renders. Notice how the "Bad" child component re-renders on every parent update, while the "Good" child component only renders when necessary. Both callbacks work the same way, but useCallback prevents unnecessary re-renders of the memoized child.'})})]})]})};export{u as default};
