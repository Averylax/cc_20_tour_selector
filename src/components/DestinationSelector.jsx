function DestinationSelector({ destinations, selected, onSelect }) {
    return (
      <div className="mb-4 text-center">
        <select 
          value={selected} 
          onChange={e => onSelect(e.target.value)} 
          className="border px-2 py-1 rounded"
        >
          {destinations.map(dest => (
            <option key={dest} value={dest}>{dest}</option>
          ))}
        </select>
      </div>
    );
  }
  
  export default DestinationSelector;
  