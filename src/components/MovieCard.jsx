import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../features/watchlist/watchlistSlice";
import { POSTER_BASE } from "../services/movieApi";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const inWatchlist = useSelector((state) =>
    state.watchlist.items.some((m) => m.id === movie.id)
  );

  const posterUrl = movie.poster ? `${POSTER_BASE}${movie.poster}` : null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative aspect-[2/3] bg-gradient-to-br from-indigo-100 to-violet-100 overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl text-indigo-300">
            🎬
          </div>
        )}
        <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs font-bold rounded-full px-2 py-1 flex items-center gap-1">
          ⭐ {movie.rating ? movie.rating.toFixed(1) : "N/A"}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-slate-800 line-clamp-2 leading-snug">
          {movie.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {movie.year || "—"} • {movie.genre || "Unknown"}
        </p>

        <button
          onClick={() =>
            inWatchlist
              ? dispatch(removeFromWatchlist(movie.id))
              : dispatch(addToWatchlist(movie))
          }
          className={`mt-3 w-full py-2 rounded-xl text-white font-semibold text-sm transition-all duration-200 active:scale-95 ${
            inWatchlist
              ? "bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 shadow-md hover:shadow-lg hover:shadow-rose-500/30"
              : "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 shadow-md hover:shadow-lg hover:shadow-indigo-500/30"
          }`}
        >
          {inWatchlist ? "✕ Remove" : "＋ Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}