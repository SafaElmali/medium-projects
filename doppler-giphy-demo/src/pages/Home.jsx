import GifGrid from '../components/GifGrid';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Trending GIFs</h1>
          <p className="mt-1 text-sm text-gray-500">Discover the most popular GIFs right now</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <GifGrid />
      </main>
    </div>
  );
};

export default Home;
