import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSeasonalAnime } from '../services/animeService';

function SeasonalAnime() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        const data = await getSeasonalAnime();
        setAnimeList(data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Current Season Anime</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animeList.map((anime) => (
          <Link 
            key={anime.mal_id} 
            to={`/anime/${anime.mal_id}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="aspect-[3/4] relative">
              <img 
                src={anime.images?.jpg?.image_url} 
                alt={anime.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium line-clamp-2 leading-tight">
                {anime.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SeasonalAnime;