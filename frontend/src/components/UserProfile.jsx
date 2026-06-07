function UserProfile({ user }) {
  if (!user) {
    return <p>No profile data available.</p>;
  }

  return (
    <div className="flex items-center gap-6 p-5 bg-linear-to-r from-white/60 to-white/30 dark:from-gray-900/60 dark:to-gray-800/40 rounded-xl shadow-sm">
      <div className="relative">
        <img src={user.avatar} alt={user.name} className="user-avatar w-20 sm:w-28 md:w-32 h-20 sm:h-28 md:h-32 rounded-xl object-cover ring-2 ring-white dark:ring-gray-800 shadow-inner" />
        <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full shadow hidden sm:block">{user.location || ""}</div>
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{user.bio}</p>

        <div className="mt-3 flex flex-wrap gap-3">
          <div className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Followers: {user.followers}</div>
          <div className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Following: {user.following}</div>
          <div className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Repos: {user.publicRepos}</div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
