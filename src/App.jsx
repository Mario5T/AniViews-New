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

// Create router with future flags
// Create a layout component
const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">
            © 2024 AniViews. All anime data provided by 
            <a 
              href="https://jikan.moe" 
              className="text-primary hover:text-primary-dark ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jikan API
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

// Create HomePage component
const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <main className="container mx-auto px-4 py-8 space-y-12">
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <FaFire className="text-red-500 text-2xl" />
            <h2 className="text-3xl font-bold">Trending Now</h2>
          </div>
          <TrendingAnime />
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <FaCalendarAlt className="text-blue-500 text-2xl" />
            <h2 className="text-3xl font-bold">Current Season</h2>
          </div>
          <AnimeList type="seasonal" title="Popular This Season" />
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <FaStar className="text-yellow-500 text-2xl" />
            <h2 className="text-3xl font-bold">All-Time Top</h2>
          </div>
          <AnimeList type="top" title="Top Rated Anime" />
        </section>
      </main>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="trending" element={<TrendingAnime />} />
      <Route path="seasonal" element={<SeasonalAnime />} />
      <Route path="genres" element={<AnimeGenres />} />
      <Route path="anime/:id" element={<AnimeDetails />} />
      <Route path="genre/:id" element={<GenreDetails />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

// Add to imports
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
