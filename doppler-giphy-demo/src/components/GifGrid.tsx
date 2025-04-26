import { useEffect, useState } from 'react';
import { Gif } from '../types/gif';

const GifGrid = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = (error: Error) => {
    setError('Failed to fetch GIFs. Please try again later.');
    setLoading(false);
    console.error('Error fetching GIFs:', error);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/300x300?text=GIF+Not+Available';
    target.alt = 'Placeholder image';
  };

  useEffect(() => {
    const fetchTrendingGifs = async () => {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/trending?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&limit=25&offset=50`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setGifs(data.data);
        setLoading(false);
      } catch (error) {
        handleError(error as Error);
      }
    };

    fetchTrendingGifs();
  }, []);

  if (loading) {
    return (
      <div 
        className="flex justify-center items-center min-h-[400px]"
        role="status"
        aria-label="Loading GIFs"
      >
        <div 
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
          aria-hidden="true"
        />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="text-center p-6 bg-red-50 rounded-lg"
        role="alert"
        aria-live="assertive"
      >
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Retry loading GIFs"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!gifs.length) {
    return (
      <div 
        className="text-center p-6"
        role="status"
        aria-live="polite"
      >
        <p className="text-gray-600">No GIFs found</p>
      </div>
    );
  }

  return (
    <div 
      className="container mx-auto px-4"
      role="region"
      aria-label="Trending GIFs"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gifs.map((gif) => (
          <div
            key={gif.id}
            className="group bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            role="article"
            aria-label={`GIF: ${gif.title || 'Untitled'}`}
          >
            <div className="relative pb-[100%]">
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title || 'Untitled GIF'}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                onError={handleImageError}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h2 className="text-white text-sm font-medium line-clamp-2">
                    {gif.title || 'Untitled GIF'}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GifGrid;