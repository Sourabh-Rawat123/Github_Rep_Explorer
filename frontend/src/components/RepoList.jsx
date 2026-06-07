import RepoCard from "./RepoCard.jsx";

function RepoList({ repos }) {
  if (!Array.isArray(repos) || repos.length === 0) {
    return <p>No repositories found.</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}

export default RepoList;
