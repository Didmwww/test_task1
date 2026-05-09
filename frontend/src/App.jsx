import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [maxFdv, setMaxFdv] = useState(100000000);
  const [sort, setSort] = useState('mcap');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projects')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(e => console.error(e));
  }, []);

  const filtered = data
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter(c => c.fdv <= maxFdv)
    .sort((a, b) => b[sort] - a[sort]);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px', fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>
      <header style={{ marginBottom: '40px', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800' }}>Crypto Discovery</h1>
        <p style={{ color: '#666' }}>Filtered projects from CoinGecko API</p>
      </header>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px', background: '#f8f9fa', padding: '20px', borderRadius: '12px' }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>SEARCH</label>
          <input 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
            placeholder="Search by name (e.g. eth)"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>MAX FDV: ${ (maxFdv/1000000).toFixed(0) }M</label>
          <input type="range" min="0" max="100000000" step="1000000" value={maxFdv} onChange={e => setMaxFdv(Number(e.target.value))} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>SORT BY</label>
          <select style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} onChange={e => setSort(e.target.value)}>
            <option value="mcap">Market Cap</option>
            <option value="volume">24h Volume</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filtered.map(coin => (
          <div key={coin.id} style={{ padding: '20px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', transition: 'transform 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
              <img src={coin.image} style={{ width: '32px', height: '32px', borderRadius: '50%' }} alt="" />
              <div>
                <h3 style={{ margin: 0, fontSize: '18px' }}>{coin.name}</h3>
                <span style={{ color: '#888', fontSize: '12px' }}>{coin.symbol}</span>
              </div>
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Price:</span> <strong>${coin.price.toLocaleString()}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Market Cap:</span> <strong>${(coin.mcap / 1000000).toFixed(2)}M</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>FDV:</span> <strong>${(coin.fdv / 1000000).toFixed(2)}M</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Vol 24h:</span> <strong>${(coin.volume / 1000).toFixed(1)}K</strong></div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>No projects match your criteria.</div>}
    </div>
  );
};

export default App;