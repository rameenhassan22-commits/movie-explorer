import { z } from "zod";

const MIN_YEAR = 1888;
const CURRENT_YEAR = new Date().getFullYear();
const MIN_RATING = 0;
const MAX_RATING = 10;
const TITLE_MAX = 200;
const GENRE_MAX = 100;

const TITLE_REGEX = /^[\p{L}\p{N}\p{Sc}\s:'",.!?&\-()[\]"\/+«»]+$/u;
const GENRE_REGEX = /^[\p{L}\s,\-/&]+$/u;
const RATING_REGEX = /^\d{1,2}(\.\d{1,2})?$/;

const hasLetter = (val) => /\p{L}/u.test(val);
const normalizeWhitespace = (val) => val.replace(/\s+/g, " ").trim();

export const movieSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .transform(normalizeWhitespace)
    .pipe(
      z
        .string()
        .min(1, "Title is required")
        .max(TITLE_MAX, `Title must be ${TITLE_MAX} characters or fewer`)
        .refine(hasLetter, {
          message: "Title must contain at least one letter",
        })
        .refine((val) => TITLE_REGEX.test(val), {
          message:
            "Title contains invalid characters. Allowed: letters, numbers, spaces, and basic punctuation",
        })
    ),

  year: z
    .string({ required_error: "Year is required" })
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(1, "Year is required")
        .refine((val) => /^\d+$/.test(val), {
          message: "Year must contain only digits",
        })
        .refine((val) => val.length === 4, {
          message: "Year must be exactly 4 digits (e.g. 1994)",
        })
        .refine(
          (val) => {
            const n = Number(val);
            return n >= MIN_YEAR && n <= CURRENT_YEAR;
          },
          { message: `Year must be between ${MIN_YEAR} and ${CURRENT_YEAR}` }
        )
    )
    .transform(Number),

  genre: z
    .string({ required_error: "Genre is required" })
    .transform(normalizeWhitespace)
    .pipe(
      z
        .string()
        .min(1, "Genre is required")
        .max(GENRE_MAX, `Genre must be ${GENRE_MAX} characters or fewer`)
        .refine(hasLetter, {
          message: "Genre must contain at least one letter",
        })
        .refine((val) => GENRE_REGEX.test(val), {
          message:
            "Genre can only contain letters, spaces, commas, hyphens, and slashes",
        })
    ),

  rating: z
    .string({ required_error: "Rating is required" })
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(1, "Rating is required")
        .refine((val) => RATING_REGEX.test(val), {
          message: "Rating must be a number (e.g. 8 or 8.5)",
        })
        .refine(
          (val) => {
            const n = Number(val);
            return n >= MIN_RATING && n <= MAX_RATING;
          },
          { message: `Rating must be between ${MIN_RATING} and ${MAX_RATING}` }
        )
    )
    .transform(Number),
});

export const MOVIE_LIMITS = Object.freeze({
  TITLE_MAX,
  GENRE_MAX,
  MIN_YEAR,
  CURRENT_YEAR,
  MIN_RATING,
  MAX_RATING,
});