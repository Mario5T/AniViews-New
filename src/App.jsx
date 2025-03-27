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

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Hero />} />
      <Route path="trending" element={<TrendingAnime />} />
      <Route path="seasonal" element={<SeasonalAnime />} />
      <Route path="genres" element={<AnimeGenres />} />
      <Route path="genre/:id" element={<GenreDetails />} />
      <Route path="anime/:id" element={<AnimeDetails />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
