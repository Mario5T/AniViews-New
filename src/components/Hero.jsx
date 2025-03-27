import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { searchAnime } from '../services/animeService';

function Hero() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 3) {
      setIsSearching(true);
      try {
        const results = await searchAnime(value);
        setSearchResults(results.slice(0, 5));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (animeId) => {
    navigate(`/anime/${animeId}`);
    setSearchResults([]);
    setQuery('');
  };

  return (
    <div className="relative h-96 bg-gray-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Discover Your Next Favorite Anime
            </h1>
            <p className="text-xl text-gray-200">
              Explore thousands of anime titles, ratings, and reviews
            </p>
            <div className="relative max-w-lg">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  placeholder="Search anime..."
                  className="w-full pl-12 pr-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              
              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-50">
                  {searchResults.map((anime) => (
                    <div
                      key={anime.mal_id}
                      onClick={() => handleResultClick(anime.mal_id)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={anime.images?.jpg?.small_image_url}
                        alt={anime.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="text-gray-900 font-medium line-clamp-1">{anime.title}</h4>
                        <p className="text-sm text-gray-500">{anime.year || 'Year N/A'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Loading State */}
              {isSearching && (
                <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg p-4 text-center text-gray-600">
                  Searching...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;