import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { addToWatchlist } from "../features/watchlist/watchlistSlice";
import { movieSchema } from "../features/movies/movieSchema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



export default function AddMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(movieSchema),
    defaultValues: { title: "", year: "", genre: "", rating: "" },
  });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 600));
    dispatch(addToWatchlist({ id: Date.now(), ...data }));
    setSuccess(true);
    reset();
    setTimeout(() => {
      setSuccess(false);
      navigate("/watchlist");
    }, 900);
  };

  const fieldClass = (hasError) =>
    `w-full px-4 py-2.5 border-2 rounded-xl bg-white focus:outline-none focus:ring-2 transition-all ${
      hasError
        ? "border-rose-400 focus:ring-rose-200"
        : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
    }`;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-1">
        Add a Movie
      </h1>
      <p className="text-slate-500 mb-8">Save something to watch later.</p>

      {success && (
        <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 font-medium">
          <span>✓</span> Movie added! Redirecting...
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
        noValidate
      >
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Title
          </label>
          <input
            {...register("title")}
            placeholder="e.g. The Godfather"
            className={fieldClass(errors.title)}
          />
          {errors.title && (
            <p className="text-rose-500 text-xs mt-1.5 font-medium">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Year
            </label>
            <input
              type="number"
              placeholder="1972"
              {...register("year")}
              className={fieldClass(errors.year)}
            />
            {errors.year && (
              <p className="text-rose-500 text-xs mt-1.5 font-medium">
                {errors.year.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Rating (0–10)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="9.2"
              {...register("rating")}
              className={fieldClass(errors.rating)}
            />
            {errors.rating && (
              <p className="text-rose-500 text-xs mt-1.5 font-medium">
                {errors.rating.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Genre
          </label>
          <input
            {...register("genre")}
            placeholder="Crime, Drama"
            className={fieldClass(errors.genre)}
          />
          {errors.genre && (
            <p className="text-rose-500 text-xs mt-1.5 font-medium">
              {errors.genre.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 shadow-md hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isSubmitting ? "Saving..." : "＋ Add to Watchlist"}
        </button>
      </form>
    </div>
  );
}