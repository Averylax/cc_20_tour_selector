import { useEffect, useState } from 'react'; // Importing React and hooks
import Gallery from './components/Gallery'; // Importing Gallery component
import DestinationSelector from './components/DestinationSelector'; // Importing DestinationSelector component

function App() { // Main App component
  const [tours, setTours] = useState([]); // State to hold all tours
  const [filteredTours, setFilteredTours] = useState([]); // State to hold filtered tours
  const [selectedDestination, setSelectedDestination] = useState('All'); // State to hold selected destination
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  const fetchTours = async () => {
    setLoading(true); 
    try {
      const res = await fetch('https://www.course-api.com/react-tours-project');
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

  useEffect(() => { // Fetch tours on component mount
    fetchTours(); // Fetch tours from API
  }, []);

  useEffect(() => { // Filter tours based on selected destination
    if (selectedDestination === 'All') { // If 'All' is selected, show all tours
      setFilteredTours(tours); // Show all tours
    } else {
      setFilteredTours(tours.filter(tour => tour.name === selectedDestination));
    }
  }, [selectedDestination, tours]);

  const removeTour = id => { // Function to remove a tour
    const updatedTours = filteredTours.filter(tour => tour.id !== id); // Filter out the removed tour
    setFilteredTours(updatedTours);
  };

  const uniqueDestinations = ['All', ...new Set(tours.map(tour => tour.name))]; //

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

