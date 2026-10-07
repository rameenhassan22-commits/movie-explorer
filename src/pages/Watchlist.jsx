import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { clearWatchlist } from "../features/watchlist/watchlistSlice";

export default function Watchlist() {
  const items = useSelector((state) => state.watchlist.items);
  const dispatch = useDispatch();

  if (items.length === 0)
    return (
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <div className="text-7xl mb-4">🍿</div>
        <h2 className="text-2xl font-bold text-slate-700">
          Your watchlist is empty
        </h2>
        <p className="text-slate-500 mt-2 mb-6">
          Browse popular movies and add them here.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 shadow-md hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-200 active:scale-95"
        >
          Browse Movies
        </Link>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            My Watchlist
          </h1>
          <p className="text-slate-500 mt-1">
            {items.length} {items.length === 1 ? "movie" : "movies"} saved
          </p>
        </div>
        <button
          onClick={() => dispatch(clearWatchlist())}
          className="px-4 py-2 rounded-xl text-rose-600 font-semibold bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all active:scale-95"
        >
          Clear All
        </button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}