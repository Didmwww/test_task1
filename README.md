Crypto Discovery Tool — Full Stack Technical Task

This is a high-performance, full-stack application designed to discover and filter cryptocurrency projects using the CoinGecko API. The project was developed as a technical test, focusing on robust API integration, real-time filtering, and professional UI/UX.



🚀 Quick Start

1\. Backend (FastAPI)

Navigate to the directory: cd backend



Install dependencies: pip install fastapi uvicorn httpx



Run the server: python main.py



The API will be live at: \[http://127.0.0.1:8000/api/projects](http://127.0.0.1:8000/api/projects)



2\. Frontend (React + Vite)

Navigate to the directory: cd frontend



Install dependencies: npm install



Start the app: npm run dev



Access the UI at the URL shown in your terminal (usually http://localhost:5173)



✨ Key Features

Live Data Integration: Fetches real-time market data from CoinGecko.



Advanced Filtering:



Search projects by name with instant updates.



Dynamic FDV (Fully Diluted Valuation) Slider supporting values from $0 to $2T (covering everything from micro-caps to Bitcoin).



Smart Sorting: Sort assets by Market Capitalization or 24h Trading Volume.



API Resilience: Implemented a server-side caching mechanism to handle HTTP 429 (Rate Limit) errors gracefully.



🛠 Technical Implementation \& Assumptions

API Rate Limit Handling (The "Stability" Factor)

Free-tier API keys for CoinGecko have strict rate limits. To prevent the UI from "breaking" or showing empty states when limits are reached:



The backend implements a Caching Layer.



It stores the last successful response in memory.



If the API returns a 429 Too Many Requests error, the server automatically serves the cached data instead of an error, ensuring a seamless user experience.



Slider Flexibility

While the original task suggested an FDV limit of $100M, the slider has been expanded to $2.0T. This allows users to test the application with major assets (BTC, ETH) while still providing the precision needed to filter for low-cap gems.



🤖 AI Workflow

Assistant: Gemini 3 Flash.



Process:



AI was used to scaffold the initial FastAPI structure and React components.



Manual Intervention: I manually refined the filtering logic to handle null values from the API and implemented the global cache state in Python to solve the "disappearing data" issue caused by rate limiting.



The UI styling was iteratively improved via AI suggestions to achieve a clean, professional look without using heavy external CSS frameworks.



Developed by: Dmytro Osadchyi



Tech Stack: Python (FastAPI), JavaScript (React), Vite.

