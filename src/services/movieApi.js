const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
export const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

const tmdbFetch = async (path) => {
  if (!TMDB_TOKEN) {
    throw new Error(
      "Missing TMDB token. Add VITE_TMDB_TOKEN to .env and restart the dev server."
    );
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB error ${res.status}: ${res.statusText}`);
  }

  return res.json();
};

const normalize = (m) => ({
  id: m.id,
  title: m.title || m.name || "Untitled",
  year: (m.release_date || m.first_air_date || "").slice(0, 4),
  rating: m.vote_average ?? 0,
  genre: "Movie",
  poster: m.poster_path,
  overview: m.overview,
});

export const fetchMovies = async (page = 1) => {
  const data = await tmdbFetch(`/movie/popular?language=en-US&page=${page}`);
  return {
    movies: data.results.map(normalize),
    totalPages: data.total_pages,
    currentPage: data.page,
  };
};

export const searchMovies = async (query) => {
  if (!query.trim()) return [];
  const data = await tmdbFetch(
    `/search/movie?language=en-US&query=${encodeURIComponent(query)}&page=1`
  );
  return data.results.map(normalize);
};