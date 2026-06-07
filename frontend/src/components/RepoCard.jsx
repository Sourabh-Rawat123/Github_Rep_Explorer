import { useState } from "react";

function RepoCard({ repo }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="repo-card bg-white/60 dark:bg-gray-900/60 rounded-xl p-4 shadow hover:shadow-lg transform hover:-translate-y-1 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{repo.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">{repo.description}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-300">⭐ {repo.stars}</span>
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">{repo.language || '—'}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button className="text-sm px-3 py-1 rounded-md bg-linear-to-r from-purple-500 to-pink-500 text-white" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Hide' : 'Details'}
        </button>

        <a className="text-sm px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700" href={repo.htmlUrl} target="_blank" rel="noreferrer">
          View
        </a>
      </div>

      {expanded && (
        <div className="mt-3 border-t pt-3 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>Open Issues: {repo.openIssues}</p>
          <p>Default Branch: {repo.defaultBranch}</p>
          <p>Updated: {new Date(repo.updatedAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}

export default RepoCard;