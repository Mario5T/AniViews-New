import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAnimeDetails } from '../services/animeService';
import { FaPlay, FaStar, FaHeart, FaArrowLeft, FaTv, FaClock, FaCalendar, FaTags } from 'react-icons/fa';
import ReviewSection from './ReviewSection';
// Add to existing imports
import { FaCheckCircle } from 'react-icons/fa';
// Add to imports
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { markAsWatched, removeFromWatched, isAnimeWatched } from '../services/watchedService';

function AnimeDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWatched, setIsWatched] = useState(false);
  
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await getAnimeDetails(id);
        setAnime(data);
        setIsWatched(isAnimeWatched(id));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  const handleWatchedToggle = () => {
    if (isWatched) {
      removeFromWatched(id);
    } else {
      markAsWatched(id);
    }
    setIsWatched(!isWatched);
  };

  const handleProtectedAction = (action) => {
    if (!user) {
      navigate('/login');
      return;
    }
    action();
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!anime) {
    return <div className="container mx-auto px-4 py-8">Anime not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary-dark">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
      
      {/* Background and Poster Section */}
      <div className="relative mb-8 rounded-xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-lg"
          style={{ backgroundImage: `url(${anime.images?.jpg?.large_image_url})` }}
        ></div>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-white bg-opacity-90">
          {/* Left Column - Poster and Actions */}
          <div className="md:col-span-1 space-y-4">
            <img 
              src={anime.images?.jpg?.large_image_url} 
              alt={anime.title} 
              className="w-full rounded-lg shadow-lg"
            />
            <div className="space-y-2">
              <button
                onClick={() => handleProtectedAction(handleWatchedToggle)}
                className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                  isWatched 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                <FaCheckCircle /> {isWatched ? 'Watched' : 'Mark as Watched'}
              </button>
              <button 
                onClick={() => handleProtectedAction(() => {/* handle favorites */})}
                className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <FaHeart /> Add to Favorites
              </button>
              {anime.trailer?.embed_url && (
                <a
                  href={anime.trailer.embed_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  <FaPlay /> Watch Trailer
                </a>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Title Section */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{anime.title}</h1>
              {anime.title_japanese && (
                <h2 className="text-2xl text-gray-600">{anime.title_japanese}</h2>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <FaStar className="text-yellow-400 text-2xl mx-auto mb-1" />
                <span className="font-bold text-lg">{anime.score || 'N/A'}</span>
                <p className="text-sm text-gray-600">Score</p>
              </div>
              <div className="text-center">
                <FaTv className="text-blue-500 text-2xl mx-auto mb-1" />
                <span className="font-bold text-lg">{anime.episodes || '?'}</span>
                <p className="text-sm text-gray-600">Episodes</p>
              </div>
              <div className="text-center">
                <FaClock className="text-green-500 text-2xl mx-auto mb-1" />
                <span className="font-bold text-lg">{anime.duration}</span>
                <p className="text-sm text-gray-600">Duration</p>
              </div>
              <div className="text-center">
                <FaCalendar className="text-purple-500 text-2xl mx-auto mb-1" />
                <span className="font-bold text-lg">{anime.year || 'Unknown'}</span>
                <p className="text-sm text-gray-600">Year</p>
              </div>
            </div>

            {/* Synopsis */}
            <div className="prose max-w-none">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <FaTags className="text-gray-500" /> Synopsis
              </h3>
              <p className="text-gray-700 leading-relaxed">{anime.synopsis}</p>
            </div>

            {/* Additional Info Sections */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Characters Section */}
              {(anime.characters || []).length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Main Characters</h3>
                  <div className="space-y-3">
                    {anime.characters.slice(0, 5).map(character => (
                      <div key={character.mal_id} className="flex items-center gap-3">
                        <a
                          href={character.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-80 transition-opacity"
                        >
                          <img 
                            src={character.images?.jpg?.image_url} 
                            alt={character.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </a>
                        <div>
                          <a
                            href={character.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold hover:underline"
                          >
                            {character.name}
                          </a>
                          <p className="text-sm text-gray-600">{character.role}</p>
                          {(character.voice_actors || []).length > 0 && (
                            <p className="text-sm text-gray-500">
                              VA: {character.voice_actors[0].person.name}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Anime Section */}
              {anime.relations && anime.relations.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Related Anime</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {anime.relations
                      .filter(relation => relation.entry.type === 'anime')
                      .map(relation => (
                        <Link
                          key={relation.entry.mal_id}
                          to={`/anime/${relation.entry.mal_id}`}
                          className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 group"
                        >
                          <div className="aspect-[3/4] relative">
                            <img
                              src={relation.entry.images?.jpg?.image_url}
                              alt={relation.entry.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              loading="lazy"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                              <span className="text-xs text-white font-medium">
                                {relation.relation_type}
                              </span>
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="text-sm font-medium line-clamp-2 leading-tight">
                              {relation.entry.title}
                            </h3>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Update the ReviewSection component call */}
      {/* Protect the review section */}
      {user ? (
        <ReviewSection animeId={id} />
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">
            Please <Link to="/login" className="text-primary hover:text-primary-dark">login</Link> to leave a review
          </p>
        </div>
      )}
    </div>
  );
}

export default AnimeDetails;