export default function ErrorMessage({
  message = "Something went wrong",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="text-5xl mb-3">⚠️</div>
      <p className="text-rose-600 font-semibold max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 px-6 py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 shadow-md hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-200 active:scale-95"
        >
          Try Again
        </button>
      )}
    </div>
  );
}