import React from 'react';
import { Link } from 'react-router-dom';

const AnimeCard = ({ id, title, image, rating, episodes }) => {
  return (
    <Link to={`/anime/${id}`} className="card group hover:shadow-lg transition-shadow duration-300 block">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={image || 'https://via.placeholder.com/300x400'} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {rating && (
          <div className="absolute top-2 right-2 bg-primary px-2 py-1 rounded text-white text-sm">
            ★ {rating}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{title}</h3>
        {episodes && (
          <p className="text-gray-600 text-sm">{episodes} Episodes</p>
        )}
      </div>
    </Link>
  );
};

export default AnimeCard;