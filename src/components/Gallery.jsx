import TourCard from './TourCard';

function Gallery({ tours, loading, error, onRemove, onRefresh }) {
  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (tours.length === 0) {
    return (
      <div className="text-center">
        <p>No tours left. Refresh to reload.</p>
        <button 
          onClick={onRefresh} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tours.map(tour => (
        <TourCard key={tour.id} tour={tour} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default Gallery;
