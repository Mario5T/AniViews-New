const API_BASE_URL = 'https://api.jikan.moe/v4';
const RATE_LIMIT_DELAY = 2000; // Increase to 2 seconds
let lastRequestTime = 0;

const handleApiRequest = async (url) => {
  try {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
      await new Promise(resolve => 
        setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest)
      );
    }

    lastRequestTime = Date.now();
    const response = await fetch(url);
    
    if (response.status === 429) {
      await new Promise(resolve => setTimeout(resolve, 4000)); // Longer delay for rate limit
      return handleApiRequest(url); // Retry the request
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getAnimeDetails = async (id) => {
  try {
    return await handleApiRequest(`${API_BASE_URL}/anime/${id}/full`);
  } catch (error) {
    console.error('Error fetching anime details:', error);
    throw error;
  }
};

export const getSeasonalAnime = async () => {
  try {
    return await handleApiRequest(`${API_BASE_URL}/seasons/now`);
  } catch (error) {
    console.error('Error fetching seasonal anime:', error);
    throw error;
  }
};

export const getTopAnime = async () => {
  try {
    return await handleApiRequest(`${API_BASE_URL}/top/anime`);
  } catch (error) {
    console.error('Error fetching top anime:', error);
    throw error;
  }
};

export const searchAnime = async (query) => {
  try {
    return await handleApiRequest(`${API_BASE_URL}/anime?q=${encodeURIComponent(query)}&sfw=true`);
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

export const getAnimeGenres = async () => {
  try {
    return await handleApiRequest(`${API_BASE_URL}/genres/anime`);
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const getAnimeByGenre = async (genreId) => {
  try {
    return await handleApiRequest(`${API_BASE_URL}/anime?genres=${genreId}&order_by=score&sort=desc`);
  } catch (error) {
    console.error('Error fetching anime by genre:', error);
    throw error;
  }
};