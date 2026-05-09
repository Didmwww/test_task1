import React, { useState, useEffect } from 'react';

const App = () => {
  // Початковий стан: дані, пошук, фільтр FDV (2 трлн) та сортування
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [maxFdv, setMaxFdv] = useState(2000000000000); // Ліміт 2 трильйони за замовчуванням
  const [sort, setSort] = useState('mcap');

  // Отримуємо дані з нашого бекенду
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projects')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Помилка завантаження:", err);
        setLoading(false);
      });
  }, []);

  // Логіка фільтрації та сортування
  const filtered = data
    .filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
    .filter((coin) => coin.fdv <= maxFdv)
    .sort((a, b) => b[sort] - a[sort]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '30px', borderBottom: '2px solid #f0f0f0', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', color: '#333' }}>Crypto Discovery Tool</h1>
        <p style={{ color: '#777' }}>Real-time data from CoinGecko API via FastAPI</p>
      </header>

      {/* Панель фільтрів */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        alignItems: 'flex-end', 
        marginBottom: '40px', 
        background: '#fafafa', 
        padding: '20px', 
        borderRadius: '10px' 
      }}>
        
        {/* Пошук */}
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>SEARCH</label>
          <input 
            type="text"
            placeholder="Search by name (e.g. bitcoin)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>

        {/* Повзунок FDV (до 2 Трлн) */}
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
            MAX FDV: ${ 
              maxFdv >= 1000000000000 ? (maxFdv/1000000000000).toFixed(1) + 'T' : 
              maxFdv >= 1000000000 ? (maxFdv/1000000000).toFixed(1) + 'B' : 
              (maxFdv/1000000).toFixed(0) + 'M' 
            }
          </label>
          <input 
            type="range" 
            min="0" 
            max="2000000000000" 
            step="1000000000" 
            value={maxFdv} 
            onChange={(e) => setMaxFdv(Number(e.target.value))} 
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>

        {/* Сортування */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>SORT BY</label>
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          >
            <option value="mcap">Market Cap</option>
            <option value="volume">24h Volume</option>
          </select>
        </div>
      </div>

      {/* Список монет */}
      {loading ? (
        <div style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>Loading projects...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {filtered.length > 0 ? filtered.map((coin) => (
            <div key={coin.id} style={{ 
              border: '1px solid #eee', 
              padding: '20px', 
              borderRadius: '12px', 
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={coin.image} alt={coin.name} style={{ width: '40px', height: '40px' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>{coin.name}</h3>
                  <span style={{ color: '#888', fontSize: '12px' }}>{coin.symbol}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>${coin.price.toLocaleString()}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>FDV: ${(coin.fdv / 1000000000).toFixed(2)}B</div>
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#999' }}>
              No projects found matching your filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;