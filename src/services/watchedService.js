// Temporary storage until backend is implemented
const watchedAnime = new Set();

export const markAsWatched = (animeId) => {
  watchedAnime.add(animeId);
  return true;
};

export const removeFromWatched = (animeId) => {
  watchedAnime.delete(animeId);
  return true;
};

export const isAnimeWatched = (animeId) => {
  return watchedAnime.has(animeId) || false;
};