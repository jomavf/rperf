import { useState, useEffect, lazy, Suspense } from "react";
import CodeExample from "../../components/CodeExample";

// LazyImage component definition
const LazyImageComponent = ({
  src,
  alt,
  size,
}: {
  src: string;
  alt: string;
  size: string;
}) => {
  useEffect(() => {
    console.log(`📥 Loading high-res image: ${alt} (${size})`);
  }, [alt, size]);

  return <img src={src} alt={alt} className="w-full h-48 object-cover" />;
};

// Simulated high-res photos data (in a real app, this might come from an API)
const photos = [
  {
    id: 1,
    title: "Mountain Lake Reflection",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80",
    fullSize:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=100",
    size: "2.8 MB",
    author: "Mads Schmidt Rasmussen",
  },
  {
    id: 2,
    title: "Tropical Beach Sunset",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80",
    fullSize:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&q=100",
    size: "2.3 MB",
    author: "Sean Oulashin",
  },
  {
    id: 3,
    title: "Northern Lights Aurora",
    thumbnail:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=200&q=80",
    fullSize:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=2400&q=100",
    size: "3.1 MB",
    author: "Vincent Guth",
  },
  {
    id: 4,
    title: "Autumn Forest Path",
    thumbnail:
      "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=200&q=80",
    fullSize:
      "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=2400&q=100",
    size: "2.5 MB",
    author: "Jesse Bowser",
  },
  {
    id: 5,
    title: "Desert Sand Dunes",
    thumbnail:
      "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=200&q=80",
    fullSize:
      "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=2400&q=100",
    size: "2.7 MB",
    author: "Jonatan Pie",
  },
  {
    id: 6,
    title: "Snowy Mountain Peak",
    thumbnail:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&q=80",
    fullSize:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=2400&q=100",
    size: "2.9 MB",
    author: "Benjamin Voros",
  },
];

// Regular Image Viewer - Loads all high-res images immediately
const EagerImageViewer = () => {
  console.log("📸 Regular Image Viewer rendered - Loading all high-res images");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="relative">
            <img
              src={photo.fullSize}
              alt={photo.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
              Photo by {photo.author}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold">{photo.title}</h3>
            <p className="text-sm text-gray-500">Size: {photo.size}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Lazy loaded high-resolution image component
const LazyImage = lazy(() => {
  console.log("🖼️ Loading high-res image component...");
  return new Promise<{
    default: React.ComponentType<{ src: string; alt: string; size: string }>;
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        default: LazyImageComponent,
      });
    }, 1000);
  });
});

// Lazy Image Viewer - Only loads high-res images when they're needed
const LazyImageViewer = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          {selectedPhoto === photo.id ? (
            <Suspense
              fallback={
                <div className="w-full h-48 bg-gray-100 animate-pulse flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-2"></div>
                    <p className="text-sm text-gray-500">
                      Loading high-res image...
                    </p>
                  </div>
                </div>
              }
            >
              <div className="relative">
                <LazyImage
                  src={photo.fullSize}
                  alt={photo.title}
                  size={photo.size}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                  Photo by {photo.author}
                </div>
              </div>
            </Suspense>
          ) : (
            <div className="relative">
              <img
                src={photo.thumbnail}
                alt={photo.title}
                className="w-full h-48 object-cover filter blur-[1px]"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                Photo by {photo.author}
              </div>
              <button
                onClick={() => setSelectedPhoto(photo.id)}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity"
              >
                <span className="bg-white px-4 py-2 rounded-full text-sm">
                  Load High-Res
                </span>
              </button>
            </div>
          )}
          <div className="p-4">
            <h3 className="font-semibold">{photo.title}</h3>
            <p className="text-sm text-gray-500">Size: {photo.size}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const LazyLoadingPage = () => {
  const [showGoodExample, setShowGoodExample] = useState(false);

  const goodExample = `
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
}`;

  const badExample = `
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
}`;

  return (
    <div className="space-y-6">
      <div className="prose">
        <h2 className="text-2xl font-bold">What is it?</h2>
        <p>
          Lazy loading is a technique that defers loading of non-critical
          resources until they are actually needed. In this example, we're using
          lazy loading for high-resolution images (2MB+ each) to demonstrate how
          it can significantly improve initial page load time and save
          bandwidth.
        </p>

        <h2 className="text-2xl font-bold">When to use it?</h2>
        <ul className="list-disc list-inside">
          <li>For high-resolution images and media</li>
          <li>For content below the fold</li>
          <li>For resource-intensive components</li>
          <li>For optional features or content</li>
          <li>For large datasets or lists</li>
        </ul>

        <h2 className="text-2xl font-bold">When not to use it?</h2>
        <ul className="list-disc list-inside">
          <li>For above-the-fold content</li>
          <li>For critical UI elements</li>
          <li>When resources are small enough</li>
          <ul className="list-disc list-inside">
            <li>
              Why? Because the overhead of lazy loading might be more expensive
              than just loading the resource immediately.
            </li>
            <li>
              Remember: Lazy loading should be used strategically to balance
              initial load time with user experience!
            </li>
          </ul>
        </ul>
      </div>

      <div className="space-y-4">
        <CodeExample
          title="✅ Good Example"
          description="Loading high-res images (2MB+ each) only when requested"
          code={goodExample}
        >
          <div className="space-y-4">
            {!showGoodExample && (
              <div className="p-4 bg-green-50 rounded">
                <p className="text-sm text-green-700">
                  👆 Initial page load is fast because only thumbnails are
                  loaded
                </p>
              </div>
            )}

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowGoodExample(true)}
            >
              Show Photo Gallery
            </button>

            {showGoodExample && <LazyImageViewer />}
          </div>
        </CodeExample>

        <CodeExample
          title="❌ Bad Example"
          description="Loading all high-res images (6MB+ total) immediately"
          code={badExample}
        >
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded">
              <p className="text-sm text-red-700">
                ⚠️ Page load is slower because all high-res images (6MB+) are
                loaded immediately
              </p>
            </div>

            <EagerImageViewer />
          </div>
        </CodeExample>

        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-sm">
            👉 Open the Network tab in DevTools to see the difference. The "Bad"
            example loads all high-res images (6MB+) immediately, while the
            "Good" example only loads thumbnails first (15KB total) and high-res
            images on demand.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LazyLoadingPage;
