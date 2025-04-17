import { useEffect, useState } from 'react';
import Gallery from './components/Gallery';
import DestinationSelector from './components/DestinationSelector';

function App() {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://course-api.com/react-tours-project');
      const data = await res.json();
      setTours(data);
      setFilteredTours(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tours');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    if (selectedDestination === 'All') {
      setFilteredTours(tours);
    } else {
      setFilteredTours(tours.filter(tour => tour.name === selectedDestination));
    }
  }, [selectedDestination, tours]);

  const removeTour = id => {
    const updatedTours = filteredTours.filter(tour => tour.id !== id);
    setFilteredTours(updatedTours);
  };

  const uniqueDestinations = ['All', ...new Set(tours.map(tour => tour.name))];

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Tour Explorer</h1>
      <DestinationSelector 
        destinations={uniqueDestinations} 
        selected={selectedDestination} 
        onSelect={setSelectedDestination} 
      />
      <Gallery 
        tours={filteredTours} 
        loading={loading} 
        error={error} 
        onRemove={removeTour} 
        onRefresh={fetchTours} 
      />
    </main>
  );
}

export default App;
