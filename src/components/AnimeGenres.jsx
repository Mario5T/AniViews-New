import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAnimeGenres } from '../services/animeService';
import { FaBookmark, FaSpinner } from 'react-icons/fa';

function AnimeGenres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAnimeGenres();
        setGenres(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-500">
        Error loading genres: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Anime Genres</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <Link
            key={genre.mal_id}
            to={`/genre/${genre.mal_id}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center gap-3">
              <FaBookmark className="text-primary text-xl" />
              <div>
                <h3 className="font-semibold text-lg">{genre.name}</h3>
                <p className="text-sm text-gray-600">
                  {genre.count?.toLocaleString()} titles
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AnimeGenres;