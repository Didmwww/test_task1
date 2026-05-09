# Crypto Project Filter - Test Task

### How to run
1. **Backend:**
   - `cd backend`
   - `pip install fastapi uvicorn httpx`
   - `python main.py`
2. **Frontend:**
   - `cd frontend`
   - `npm install`
   - `npm run dev`

### What I completed:
- Python FastAPI backend with CoinGecko integration.
- Filtering logic according to task requirements (MCap, FDV, Supply equality).
- React frontend with real-time search, FDV slider, and sorting.
- Clean and responsive UI using Tailwind CSS.

### Assumptions:
- **TVL:** Free CoinGecko API doesn't always provide TVL in the `/markets` endpoint. I used a mock logic/placeholder for this specific field.
- **Supply:** Filtering by `max_supply == total_supply` significantly limits the list, as many projects have dynamic supply.

### AI Workflow:
- **Tools:** Gemini, Cursor.
- **How it helped:** Rapidly generating the boilerplate for FastAPI and the React filtering logic. It saved about 30-40 minutes on setup.
- **Manual corrections:** I manually adjusted the CoinGecko filter logic because the API returns `None` for some supply fields, which could crash the app.
