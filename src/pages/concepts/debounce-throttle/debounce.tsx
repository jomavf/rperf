import { useState, useCallback } from "react";
import CodeExample from "../../../components/CodeExample";
import debounce from "lodash/debounce";

// Simulated API call
const searchAPI = async (query: string) => {
  console.log(`🔍 API Call: Searching for "${query}"`);
  await new Promise((resolve) => setTimeout(resolve, 300));
  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: `Result ${i + 1} for "${query}"`,
    description: `This is a sample search result that matches your query "${query}". It might be a product, article, or any other searchable content.`,
  }));
};

const BadSearchExample = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{ id: number; title: string; description: string }>
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [apiCalls, setApiCalls] = useState(0);

  // Bad Example: Making API call on every keystroke
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results = await searchAPI(query);
    setSearchResults(results);
    setIsSearching(false);
    setApiCalls((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Type to search (calls API immediately)"
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-sm text-gray-500">API Calls: {apiCalls}</div>
      </div>

      <div className="space-y-4">
        {isSearching ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 h-20 rounded" />
            ))}
          </div>
        ) : (
          searchResults.map((result) => (
            <div key={result.id} className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold">{result.title}</h3>
              <p className="text-sm text-gray-600">{result.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const GoodSearchExample = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{ id: number; title: string; description: string }>
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [apiCalls, setApiCalls] = useState(0);

  // Good Example: Using debounce to wait for user to stop typing
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      const results = await searchAPI(query);
      setSearchResults(results);
      setIsSearching(false);
      setApiCalls((prev) => prev + 1);
    }, 500),
    []
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Type to search (waits 500ms)"
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-sm text-gray-500">API Calls: {apiCalls}</div>
      </div>

      <div className="space-y-4">
        {isSearching ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 h-20 rounded" />
            ))}
          </div>
        ) : (
          searchResults.map((result) => (
            <div key={result.id} className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold">{result.title}</h3>
              <p className="text-sm text-gray-600">{result.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const DebouncePage = () => {
  return (
    <div className="space-y-8">
      <div className="prose">
        <h1 className="text-3xl font-bold">Debounce Example: Search Input</h1>
        <p>
          Debouncing is particularly useful for search inputs where we want to
          wait for the user to stop typing before making API calls. This
          prevents unnecessary server load and provides a better user
          experience.
        </p>
      </div>

      <div className="space-y-6">
        <CodeExample
          title="❌ Bad Example: No Debounce"
          description="This example makes an API call on every keystroke. Try typing quickly and watch the API calls counter increase rapidly."
          code={`
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
/>`}
        >
          <BadSearchExample />
        </CodeExample>

        <CodeExample
          title="✅ Good Example: With Debounce"
          description="This example waits 500ms after the last keystroke before making an API call. Type quickly and notice how it makes fewer API calls."
          code={`
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
/>`}
        >
          <GoodSearchExample />
        </CodeExample>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800">Why use Debounce?</h3>
        <ul className="list-disc list-inside mt-2 text-blue-700">
          <li>Reduces unnecessary API calls</li>
          <li>Improves application performance</li>
          <li>Better user experience</li>
          <li>Reduces server load</li>
          <li>Prevents UI jank from too many updates</li>
        </ul>
      </div>
    </div>
  );
};

export default DebouncePage;
