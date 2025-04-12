import { posts } from "./data";

const NonVirtualizedFeed = () => {
  console.log("📋 Regular Feed rendered - Loading all posts");

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow p-4 space-y-2">
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
      ))}
    </div>
  );
};

const BadExamplePage = () => {
  return (
    <div className="space-y-6">
      <div className="prose">
        <h1 className="text-2xl font-bold">
          ❌ Bad Example: Non-Virtualized List
        </h1>
        <p>
          This example shows what happens when you render all 10,000 items at
          once. Notice how:
        </p>
        <ul className="list-disc list-inside">
          <li>Initial page load is slow</li>
          <li>Scrolling becomes laggy</li>
          <li>Memory usage is high</li>
          <li>Browser might become unresponsive</li>
        </ul>
      </div>

      <div className="p-4 bg-red-50 rounded">
        <p className="text-sm text-red-700">
          ⚠️ Page becomes slow and unresponsive because all 10,000 posts are
          rendered at once
        </p>
      </div>

      <div className="max-h-[600px] overflow-auto border border-gray-200 rounded">
        <NonVirtualizedFeed />
      </div>

      <div className="bg-yellow-100 p-4 rounded">
        <p className="text-sm">
          👉 Open Chrome DevTools Performance tab and record while scrolling.
          You'll notice high CPU usage and potential frame drops.
        </p>
      </div>
    </div>
  );
};

export default BadExamplePage;
