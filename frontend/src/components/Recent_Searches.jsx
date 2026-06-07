function RecentSearches({
  searches,
  onSelect,
}) {
  if (!searches.length) return null;

  return (
    <div>
      <h3>Recent Searches</h3>

      {searches.map((search) => (
        <button
          key={search}
          onClick={() => onSelect(search)}
        >
          {search}
        </button>
      ))}
    </div>
  );
}

export default RecentSearches;