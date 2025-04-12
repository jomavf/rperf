import{r as a,j as e}from"./index-w5awoWBm.js";import{C as t}from"./CodeExample-BJ5ACdN8.js";const n=({src:i,alt:l,size:s})=>(a.useEffect(()=>{console.log(`📥 Loading high-res image: ${l} (${s})`)},[l,s]),e.jsx("img",{src:i,alt:l,className:"w-full h-48 object-cover"})),o=[{id:1,title:"Mountain Lake Reflection",thumbnail:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80",fullSize:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=100",size:"2.8 MB",author:"Mads Schmidt Rasmussen"},{id:2,title:"Tropical Beach Sunset",thumbnail:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80",fullSize:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&q=100",size:"2.3 MB",author:"Sean Oulashin"},{id:3,title:"Northern Lights Aurora",thumbnail:"https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=200&q=80",fullSize:"https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=2400&q=100",size:"3.1 MB",author:"Vincent Guth"},{id:4,title:"Autumn Forest Path",thumbnail:"https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=200&q=80",fullSize:"https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=2400&q=100",size:"2.5 MB",author:"Jesse Bowser"},{id:5,title:"Desert Sand Dunes",thumbnail:"https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=200&q=80",fullSize:"https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=2400&q=100",size:"2.7 MB",author:"Jonatan Pie"},{id:6,title:"Snowy Mountain Peak",thumbnail:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&q=80",fullSize:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=2400&q=100",size:"2.9 MB",author:"Benjamin Voros"}],d=()=>(console.log("📸 Regular Image Viewer rendered - Loading all high-res images"),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:o.map(i=>e.jsxs("div",{className:"bg-white rounded-lg shadow-sm overflow-hidden",children:[e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:i.fullSize,alt:i.title,className:"w-full h-48 object-cover"}),e.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1",children:["Photo by ",i.author]})]}),e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"font-semibold",children:i.title}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Size: ",i.size]})]})]},i.id))})),r=a.lazy(()=>(console.log("🖼️ Loading high-res image component..."),new Promise(i=>{setTimeout(()=>{i({default:n})},1e3)}))),c=()=>{const[i,l]=a.useState(null);return e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:o.map(s=>e.jsxs("div",{className:"bg-white rounded-lg shadow-sm overflow-hidden",children:[i===s.id?e.jsx(a.Suspense,{fallback:e.jsx("div",{className:"w-full h-48 bg-gray-100 animate-pulse flex items-center justify-center",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-2"}),e.jsx("p",{className:"text-sm text-gray-500",children:"Loading high-res image..."})]})}),children:e.jsxs("div",{className:"relative",children:[e.jsx(r,{src:s.fullSize,alt:s.title,size:s.size}),e.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1",children:["Photo by ",s.author]})]})}):e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:s.thumbnail,alt:s.title,className:"w-full h-48 object-cover filter blur-[1px]"}),e.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1",children:["Photo by ",s.author]}),e.jsx("button",{onClick:()=>l(s.id),className:"absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity",children:e.jsx("span",{className:"bg-white px-4 py-2 rounded-full text-sm",children:"Load High-Res"})})]}),e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"font-semibold",children:s.title}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Size: ",s.size]})]})]},s.id))})},g=()=>{const[i,l]=a.useState(!1);return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"prose",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"What is it?"}),e.jsx("p",{children:"Lazy loading is a technique that defers loading of non-critical resources until they are actually needed. In this example, we're using lazy loading for high-resolution images (2MB+ each) to demonstrate how it can significantly improve initial page load time and save bandwidth."}),e.jsx("h2",{className:"text-2xl font-bold",children:"When to use it?"}),e.jsxs("ul",{className:"list-disc list-inside",children:[e.jsx("li",{children:"For high-resolution images and media"}),e.jsx("li",{children:"For content below the fold"}),e.jsx("li",{children:"For resource-intensive components"}),e.jsx("li",{children:"For optional features or content"}),e.jsx("li",{children:"For large datasets or lists"})]}),e.jsx("h2",{className:"text-2xl font-bold",children:"When not to use it?"}),e.jsxs("ul",{className:"list-disc list-inside",children:[e.jsx("li",{children:"For above-the-fold content"}),e.jsx("li",{children:"For critical UI elements"}),e.jsx("li",{children:"When resources are small enough"}),e.jsxs("ul",{className:"list-disc list-inside",children:[e.jsx("li",{children:"Why? Because the overhead of lazy loading might be more expensive than just loading the resource immediately."}),e.jsx("li",{children:"Remember: Lazy loading should be used strategically to balance initial load time with user experience!"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{title:"✅ Good Example",description:"Loading high-res images (2MB+ each) only when requested",code:`
// Good Example: Using lazy loading for high-resolution images
const LazyImage = lazy(() => import('./HighResImage'));

function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="gallery">
      {photos.map(photo => (
        <div key={photo.id}>
          {selectedPhoto === photo.id ? (
            <Suspense fallback={<LoadingPlaceholder />}>
              <LazyImage
                src={photo.fullSize}
                alt={photo.title}
              />
            </Suspense>
          ) : (
            <img
              src={photo.thumbnail}
              alt={photo.title}
              onClick={() => setSelectedPhoto(photo.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}`,children:e.jsxs("div",{className:"space-y-4",children:[!i&&e.jsx("div",{className:"p-4 bg-green-50 rounded",children:e.jsx("p",{className:"text-sm text-green-700",children:"👆 Initial page load is fast because only thumbnails are loaded"})}),e.jsx("button",{className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",onClick:()=>l(!0),children:"Show Photo Gallery"}),i&&e.jsx(c,{})]})}),e.jsx(t,{title:"❌ Bad Example",description:"Loading all high-res images (6MB+ total) immediately",code:`
// Bad Example: Loading all high-resolution images immediately
function PhotoGallery() {
  return (
    <div className="gallery">
      {photos.map(photo => (
        <div key={photo.id}>
          <img
            src={photo.fullSize} // 2MB+ each!
            alt={photo.title}
          />
        </div>
      ))}
    </div>
  );
}`,children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"p-4 bg-red-50 rounded",children:e.jsx("p",{className:"text-sm text-red-700",children:"⚠️ Page load is slower because all high-res images (6MB+) are loaded immediately"})}),e.jsx(d,{})]})}),e.jsx("div",{className:"bg-yellow-100 p-4 rounded",children:e.jsx("p",{className:"text-sm",children:'👉 Open the Network tab in DevTools to see the difference. The "Bad" example loads all high-res images (6MB+) immediately, while the "Good" example only loads thumbnails first (15KB total) and high-res images on demand.'})})]})]})};export{g as default};
