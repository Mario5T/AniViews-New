import { 
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimeList from './components/AnimeList';
import AnimeDetails from './components/AnimeDetails';
import TrendingAnime from './components/TrendingAnime';
import SeasonalAnime from './components/SeasonalAnime';
import AnimeGenres from './components/AnimeGenres';
import GenreDetails from './components/GenreDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { FaFire, FaStar, FaCalendarAlt } from 'react-icons/fa';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* Your routes here */}
    </Router>
  );
}

export default App;
