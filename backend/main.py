from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Сховище для останніх вдалих даних
LAST_VALID_DATA = []

@app.get("/api/projects")
async def get_projects():
    global LAST_VALID_DATA
    url = "https://api.coingecko.com/api/v3/coins/markets"
    params = {
        "vs_currency": "usd", 
        "order": "market_cap_desc", 
        "per_page": 250, 
        "page": 1
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, params=params, timeout=10.0)
            
            # Якщо ліміт вичерпано — віддаємо те, що встигли зберегти раніше
            if response.status_code == 429:
                if LAST_VALID_DATA:
                    print("API Limit! Serving from cache...")
                    return LAST_VALID_DATA
                return [{"id":"limit","name":"API Limit (No cache yet)","symbol":"LIMIT","image":"","price":0,"mcap":1,"fdv":1,"volume":1}]
            
            data = response.json()
            
            # Формуємо новий список
            new_data = [{
                "id": c["id"],
                "name": c["name"],
                "symbol": c["symbol"].upper(),
                "image": c["image"],
                "price": c["current_price"],
                "mcap": c.get("market_cap") or 0,
                "fdv": c.get("fully_diluted_valuation") or (c.get("market_cap", 0) * 1.1),
                "volume": c.get("total_volume") or 0
            } for c in data if c.get("market_cap", 0) > 0]
            
            # Оновлюємо кеш
            if new_data:
                LAST_VALID_DATA = new_data
                
            return new_data
        except Exception as e:
            # У разі будь-якої іншої помилки теж намагаємось віддати кеш
            if LAST_VALID_DATA:
                return LAST_VALID_DATA
            return []

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)