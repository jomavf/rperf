import{g,j as e,r as t}from"./index-DCKY2ykT.js";import{C as p}from"./CodeExample-BYOUyIeY.js";import{r as f}from"./debounce-BpwJb8w8.js";import"./extends-CF3RwP-h.js";var j=f();const b=g(j),x=async r=>(console.log(`🔍 API Call: Searching for "${r}"`),await new Promise(c=>setTimeout(c,300)),Array.from({length:5},(c,l)=>({id:l+1,title:`Result ${l+1} for "${r}"`,description:`This is a sample search result that matches your query "${r}". It might be a product, article, or any other searchable content.`}))),v=()=>{const[r,c]=t.useState(""),[l,i]=t.useState([]),[o,n]=t.useState(!1),[d,u]=t.useState(0),h=async a=>{if(c(a),!a.trim()){i([]);return}n(!0);const s=await x(a);i(s),n(!1),u(m=>m+1)};return e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("input",{type:"text",value:r,onChange:a=>h(a.target.value),placeholder:"Type to search (calls API immediately)",className:"flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"}),e.jsxs("div",{className:"text-sm text-gray-500",children:["API Calls: ",d]})]}),e.jsx("div",{className:"space-y-4",children:o?e.jsx("div",{className:"animate-pulse space-y-4",children:[1,2,3].map(a=>e.jsx("div",{className:"bg-gray-100 h-20 rounded"},a))}):l.map(a=>e.jsxs("div",{className:"p-4 bg-white rounded-lg shadow-sm",children:[e.jsx("h3",{className:"font-semibold",children:a.title}),e.jsx("p",{className:"text-sm text-gray-600",children:a.description})]},a.id))})]})},S=()=>{const[r,c]=t.useState(""),[l,i]=t.useState([]),[o,n]=t.useState(!1),[d,u]=t.useState(0),h=t.useCallback(b(async s=>{if(!s.trim()){i([]),n(!1);return}n(!0);const m=await x(s);i(m),n(!1),u(y=>y+1)},500),[]),a=s=>{c(s),h(s)};return e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("input",{type:"text",value:r,onChange:s=>a(s.target.value),placeholder:"Type to search (waits 500ms)",className:"flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"}),e.jsxs("div",{className:"text-sm text-gray-500",children:["API Calls: ",d]})]}),e.jsx("div",{className:"space-y-4",children:o?e.jsx("div",{className:"animate-pulse space-y-4",children:[1,2,3].map(s=>e.jsx("div",{className:"bg-gray-100 h-20 rounded"},s))}):l.map(s=>e.jsxs("div",{className:"p-4 bg-white rounded-lg shadow-sm",children:[e.jsx("h3",{className:"font-semibold",children:s.title}),e.jsx("p",{className:"text-sm text-gray-600",children:s.description})]},s.id))})]})},P=()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"prose",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"Debounce Example: Search Input"}),e.jsx("p",{children:"Debouncing is particularly useful for search inputs where we want to wait for the user to stop typing before making API calls. This prevents unnecessary server load and provides a better user experience."})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx(p,{title:"❌ Bad Example: No Debounce",description:"This example makes an API call on every keystroke. Try typing quickly and watch the API calls counter increase rapidly.",code:`
// Bad Example: Calling API on every keystroke
const handleSearch = async (query: string) => {
  setSearchQuery(query);
  
  if (!query.trim()) return;
  
  setIsSearching(true);
  const results = await searchAPI(query); // 🚫 API call on every keystroke!
  setSearchResults(results);
  setIsSearching(false);
};

// Usage
<input
  type="text"
  value={searchQuery}
  onChange={(e) => handleSearch(e.target.value)}
/>`,children:e.jsx(v,{})}),e.jsx(p,{title:"✅ Good Example: With Debounce",description:"This example waits 500ms after the last keystroke before making an API call. Type quickly and notice how it makes fewer API calls.",code:`
// Good Example: Using debounce
const debouncedSearch = useCallback(
  debounce(async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    const results = await searchAPI(query); // ✅ Only called after 500ms of no typing
    setSearchResults(results);
    setIsSearching(false);
  }, 500),
  []
);

// Usage
<input
  type="text"
  value={searchQuery}
  onChange={(e) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  }}
/>`,children:e.jsx(S,{})})]}),e.jsxs("div",{className:"bg-blue-50 p-4 rounded-lg",children:[e.jsx("h3",{className:"font-semibold text-blue-800",children:"Why use Debounce?"}),e.jsxs("ul",{className:"list-disc list-inside mt-2 text-blue-700",children:[e.jsx("li",{children:"Reduces unnecessary API calls"}),e.jsx("li",{children:"Improves application performance"}),e.jsx("li",{children:"Better user experience"}),e.jsx("li",{children:"Reduces server load"}),e.jsx("li",{children:"Prevents UI jank from too many updates"})]})]})]});export{P as default};
