import { useEffect, useState } from "react";
import { fetchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const { movies: newMovies } = await fetchMovies(pageNum);
      setMovies(pageNum === 1 ? newMovies : (prev) => [...prev, ...newMovies]);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
  }, []);

  if (error) return <ErrorMessage message={error} onRetry={() => load(1)} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Popular Movies
        </h1>
        <p className="text-slate-500 mt-1">Handpicked titles, fresh from TMDB.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      {loading && <Loader message="Loading more..." />}

      {!loading && (
        <div className="text-center mt-10">
          <button
            onClick={() => load(page + 1)}
            className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 shadow-md hover:shadow-xl transition-all active:scale-95"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}