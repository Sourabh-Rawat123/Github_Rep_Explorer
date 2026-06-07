function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center py-6">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-linear-to-r from-purple-500 to-pink-500 animate-spin-slow shadow-md mb-3 flex items-center justify-center">
                <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-white/80" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
    );
}

export default LoadingSpinner;