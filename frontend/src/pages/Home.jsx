import { useState } from "react";
import { getGithubProfile } from "../api/github_api.js";

import SearchBar from "../components/SearchBar.jsx";
import UserProfile from "../components/UserProfile.jsx";
import RepoList from "../components/RepoList.jsx";
import LoadingSpinner from "../components/Loading_Spinner.jsx";
import RecentSearches from "../components/Recent_Searches.jsx";

function Home() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("stars");
  const [visibleRepos, setVisibleRepos] = useState(10);

  const [recentSearches, setRecentSearches] = useState([]);

  const searchUser = async (searchTerm) => {
    try {
      setLoading(true);
      setError("");

      const result = await getGithubProfile(searchTerm);

      setData(result);
      setVisibleRepos(10);

      const updatedSearches = [
        searchTerm,
        ...recentSearches.filter(
          (item) => item !== searchTerm
        ),
      ].slice(0, 5);

      setRecentSearches(updatedSearches);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong"
      );

      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!username.trim()) return;

    await searchUser(username);
  };

  const sortedRepos = data
    ? [...data.repos].sort((a, b) => {
        switch (sortBy) {
          case "stars":
            return b.stars - a.stars;

          case "name":
            return a.name.localeCompare(b.name);

          case "updated":
            return (
              new Date(b.updatedAt) -
              new Date(a.updatedAt)
            );

          default:
            return 0;
        }
      })
    : [];

  const displayedRepos = sortedRepos.slice(
    0,
    visibleRepos
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl p-6">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-pink-500">
                GitHub Profile Explorer
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Search GitHub users and explore repositories.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">

              <SearchBar
                username={username}
                setUsername={setUsername}
                onSearch={handleSearch}
                loading={loading}
              />

              <RecentSearches
                searches={recentSearches}
                onSelect={async (search) => {
                  setUsername(search);
                  await searchUser(search);
                }}
              />

              {data && (
                <select
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                >
                  <option value="stars">
                    Sort by Stars
                  </option>

                  <option value="name">
                    Sort by Name
                  </option>

                  <option value="updated">
                    Sort by Updated
                  </option>
                </select>
              )}

            </div>

          </div>

          {loading && <LoadingSpinner />}

          {error && (
            <div className="mt-4 text-red-500">
              {error}
            </div>
          )}

          {!loading && data && (
            <div className="mt-6 space-y-6">

              <UserProfile user={data.user} />

              <RepoList repos={displayedRepos} />

              {visibleRepos < sortedRepos.length && (
                <div className="flex justify-center">
                  <button
                    onClick={() =>
                      setVisibleRepos(
                        (prev) => prev + 10
                      )
                    }
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Load More
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Home;