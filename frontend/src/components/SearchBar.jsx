function SearchBar({ username, setUsername, onSearch, loading }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full max-w-xs">
        <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <input
          className="pl-10 pr-3 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800 text-sm shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-300"
          type="text"
          value={username}
          placeholder="Search GitHub username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <button
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-600 to-pink-500 text-white shadow-md transform transition hover:scale-105 disabled:opacity-60"
        onClick={onSearch}
        disabled={loading}
      >
        {loading ? (
          <span className="text-sm">Searching...</span>
        ) : (
          <span className="text-sm">Search</span>
        )}
      </button>
    </div>
  );
}

export default SearchBar;