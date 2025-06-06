import Gallery from './Gallery'; // Importing the Gallery component to display a grid of tour cards
import DestinationSelector from './DestinationSelector'; // Importing DestinationSelector component to select a destination from a dropdown

function TourCard({ tour, onRemove }) { // TourCard component to display individual tour cards
    const { id, name, info, image, price } = tour; // Destructuring tour object to get individual properties
  
    return (
      <div className="border rounded p-4 shadow">
        <img src={image} alt={name} className="w-full h-60 object-cover rounded mb-2" />
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">{name}</h2>
          <span className="text-green-600 font-bold">${price}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{info}</p>
        <button 
          onClick={() => onRemove(id)} 
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Not Interested
        </button>
      </div>
    );
}

export default TourCard;

