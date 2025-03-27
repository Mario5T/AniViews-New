import React, { useEffect, useState } from 'react';
import { getSeasonalAnime, getTopAnime } from '../services/animeService';
import { Link } from 'react-router-dom';

function AnimeList({ type, title }) {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        let data;
        if (type === 'top') {
          data = await getTopAnime();
        } else if (type === 'seasonal') {
          data = await getSeasonalAnime();
        }
        setAnime(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [type]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 aspect-[3/4] rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {anime.map((item, index) => (
        <Link
          key={`${type}-${item.mal_id}-${index}`}
          to={`/anime/${item.mal_id}`}
          className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200"
        >
          <div className="aspect-[3/4] relative">
            <img
              src={item.images?.jpg?.image_url || item.images?.jpg?.large_image_url}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-anime.jpg'; // Add a placeholder image to your public folder
              }}
            />
          </div>
          <div className="p-2">
            <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AnimeList;