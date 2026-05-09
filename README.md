Crypto Project Filter Tool — Full Stack Task
This is a full-stack application designed to fetch, filter, and display cryptocurrency project data using the CoinGecko API. The project was built as a test task within a 90-minute time limit, focusing on efficient AI-assisted development and functional delivery.

🚀 How to Run
1. Backend (Python + FastAPI)
Navigate to the backend directory: cd backend

(Optional) Create a virtual environment: python -m venv venv

(Optional) Activate venv: .\venv\Scripts\activate (Windows)

Install dependencies: pip install fastapi uvicorn httpx

Start the server: python main.py

The API will be available at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

2. Frontend (React + Vite)
Navigate to the frontend directory: cd frontend

Install dependencies: npm install

Start the development server: npm run dev

Open your browser at the URL provided in the terminal (usually http://localhost:5173)

✅ What I Completed
Backend:

Developed a REST API using FastAPI to fetch data from CoinGecko.

Implemented server-side filtering for Market Cap (>0) and 24h Trading Volume (>$50k).

Added logic to handle Fully Diluted Valuation (FDV) and Supply checks.

Frontend:

Built a responsive UI using React.

Implemented real-time search by project name (partial matches).

Added a dynamic FDV filter (range slider).

Added sorting options for Market Capitalization and 24h Trading Volume.

🧠 Assumptions and Limitations
TVL Data: Since the free CoinGecko /markets endpoint does not always provide Total Value Locked (TVL), I used a calculated placeholder/mock logic for this specific field to demonstrate UI functionality.

Supply Filtering: The requirement "Max Supply equals Total Supply" is quite restrictive for many active projects. I implemented this logic, but for testing purposes, I ensured the app handles cases where these values might be null or missing in the API response.

API Rate Limits: To handle CoinGecko’s free tier rate limits, I implemented basic error handling. If the API returns a 429 error, the backend provides fallback data or clear error messages.

🤖 AI Workflow
Tools Used: Gemini (for scaffolding and logic optimization) and VS Code.

How AI helped:

Rapidly generated the boilerplate for the FastAPI server and React components, saving approximately 30 minutes of setup time.

Assisted in writing efficient CSS-in-JS styles for a clean UI without external heavy libraries.

Manual Corrections:

Manually adjusted the filtering logic in Python to handle None values from the API, preventing server crashes.

Refined the React useEffect hooks to ensure proper synchronization between the search input and the filtered list.

Developed by: Dmytro Osadchyi