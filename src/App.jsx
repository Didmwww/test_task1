import React, { useState, useEffect } from 'react';

function App() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [fdvLimit, setFdvLimit] = useState(100000000);
  const [sortBy, setSortBy] = useState('market_cap');

  useEffect(() => {
    fetch('http://localhost:8000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  // Фильтрация на стороне фронтенда (Поиск и кастомный FDV)
  const filteredData = projects
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => p.fdv <= fdvLimit)
    .sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Crypto Filter Tool</h1>
      
      <div className="flex flex-wrap gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
        <input 
          type="text" 
          placeholder="Search project..." 
          className="border p-2 rounded w-64"
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <div className="flex flex-col">
          <label className="text-xs text-gray-500">Max FDV: ${fdvLimit.toLocaleString()}</label>
          <input 
            type="range" 
            min="0" max="100000000" step="1000000"
            value={fdvLimit}
            onChange={(e) => setFdvLimit(Number(e.target.value))}
          />
        </div>

        <select 
          className="border p-2 rounded"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="market_cap">Sort by Market Cap</option>
          <option value="total_volume">Sort by 24h Volume</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredData.map(project => (
          <div key={project.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-4">
              <img src={project.image} alt={project.name} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-bold">{project.name} <span className="text-gray-400 uppercase text-sm">{project.symbol}</span></h3>
                <p className="text-sm text-gray-500">Price: ${project.current_price.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm"><b>MCap:</b> ${project.market_cap.toLocaleString()}</p>
              <p className="text-sm"><b>FDV:</b> ${project.fdv.toLocaleString()}</p>
              <p className="text-sm"><b>Vol 24h:</b> ${project.total_volume.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;