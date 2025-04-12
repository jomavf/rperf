import { CSSProperties } from "react";
import { FixedSizeList } from "react-window";
import { posts } from "./data";

const VirtualizedFeed = () => {
  console.log("📋 Virtualized Feed rendered - Only rendering visible posts");

  const PostItem = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }) => {
    const post = posts[index];
    return (
      <div style={style}>
        <div className="p-2">
          <div className="bg-white rounded-lg shadow p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-semibold">{post.author}</div>
                <div className="text-sm text-gray-500">{post.timestamp}</div>
              </div>
            </div>
            <p className="text-gray-800">{post.content}</p>
            <div className="flex space-x-4 text-sm text-gray-500">
              <span>❤️ {post.likes} likes</span>
              <span>💬 {post.comments} comments</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <FixedSizeList
      height={600}
      width="100%"
      itemCount={posts.length}
      itemSize={180}
    >
      {PostItem}
    </FixedSizeList>
  );
};

const GoodExamplePage = () => {
  return (
    <div className="space-y-6">
      <div className="prose">
        <h1 className="text-2xl font-bold">
          ✅ Good Example: Virtualized List
        </h1>
        <p>
          This example uses react-window to virtualize the list of 10,000 items.
          Notice how:
        </p>
        <ul className="list-disc list-inside">
          <li>Initial page load is instant</li>
          <li>Scrolling is smooth (60fps)</li>
          <li>Memory usage stays low</li>
          <li>Only ~5-10 items are rendered at a time</li>
        </ul>
      </div>

      <div className="p-4 bg-green-50 rounded">
        <p className="text-sm text-green-700">
          👆 Performance stays snappy because only visible posts are rendered
          (~5-10 posts instead of all 10,000)
        </p>
      </div>

      <div className="border border-gray-200 rounded">
        <VirtualizedFeed />
      </div>

      <div className="bg-yellow-100 p-4 rounded">
        <p className="text-sm">
          👉 Open Chrome DevTools Performance tab and record while scrolling.
          You'll notice consistently low CPU usage and smooth 60fps scrolling.
        </p>
      </div>

      <div className="prose">
        <h2 className="text-xl font-bold">How it works</h2>
        <p>
          The virtualization library (react-window) only renders the items that
          are currently visible in the viewport, plus a small buffer above and
          below. As you scroll, it:
        </p>
        <ol className="list-decimal list-inside">
          <li>Recycles DOM nodes instead of creating new ones</li>
          <li>Updates content and position of recycled nodes</li>
          <li>Maintains scroll position and momentum</li>
          <li>Handles scroll events efficiently</li>
        </ol>
      </div>
    </div>
  );
};

export default GoodExamplePage;
