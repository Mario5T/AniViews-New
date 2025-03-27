import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-700 text-white p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">AniViews</div>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-purple-200">Home</a>
          <a href="/trending" className="hover:text-purple-200">Trending</a>
          <a href="/seasonal" className="hover:text-purple-200">Seasonal</a>
          <a href="/genres" className="hover:text-purple-200">Genres</a>
          <a href="/login" className="hover:text-purple-200">Login</a>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute top-16 left-0 right-0 bg-purple-700 md:hidden`}
        >
          <div className="flex flex-col items-center space-y-4 py-4">
            <a href="/" className="hover:text-purple-200">Home</a>
            <a href="/trending" className="hover:text-purple-200">Trending</a>
            <a href="/seasonal" className="hover:text-purple-200">Seasonal</a>
            <a href="/genres" className="hover:text-purple-200">Genres</a>
            <a href="/login" className="hover:text-purple-200">Login</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;