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

COINGECKO_API = "https://api.coingecko.com/api/v3"

@app.get("/api/projects")
async def get_projects():
    async with httpx.AsyncClient() as client:
        params = {
            "vs_currency": "usd",
            "order": "market_cap_desc",
            "per_page": 250,
            "page": 1,
            "sparkline": "false"
        }
        response = await client.get(f"{COINGECKO_API}/coins/markets", params=params)
        data = response.json()
        
        filtered_projects = []
        
        for coin in data:
            mcap = coin.get("market_cap") or 0
            fdv = coin.get("fully_diluted_valuation") or 0
            volume = coin.get("total_volume") or 0
            max_supply = coin.get("max_supply")
            total_supply = coin.get("total_supply")

            
            if (mcap > 0 and 
                fdv < 100_000_000 and 
                volume > 50_000 and 
                max_supply is not None and 
                max_supply == total_supply):
                
                filtered_projects.append({
                    "id": coin["id"],
                    "name": coin["name"],
                    "symbol": coin["symbol"],
                    "image": coin["image"],
                    "current_price": coin["current_price"],
                    "market_cap": mcap,
                    "fdv": fdv,
                    "total_volume": volume,

                    "tvl": volume * 1.1 
                })
        
        return filtered_projects

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
