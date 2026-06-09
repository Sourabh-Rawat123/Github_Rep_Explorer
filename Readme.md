# GitHub Repo Explorer

Project Title & Brief Description
- GitHub Repo Explorer — a full-stack exercise that fetches a GitHub user's profile and their public repositories. This project implements a small backend API that proxies GitHub API requests (with caching and rate-limiting) and a Vite + React frontend that allows searching for users and viewing repo details.

Live Demo Links

https://github-rep-explorer-1.onrender.com/

For Local Development
Tech Stack
- **Backend:** Node.js, Express — minimal REST API and routing.
- **HTTP client:** Axios — to call GitHub's API concurrently for user + repos.
- **Caching & rate-limiting:** in-memory cache service + `express-rate-limit` to reduce upstream calls and protect the API.
- **Frontend:** React (Vite) — fast dev server and modern React stack.
- **Styling & UI:** Tailwind CSS, react-icons, Chart.js (for lightweight visualizations).

Why these choices
- Node + Express provide a simple, deployable backend for proxying GitHub requests. Vite + React gives a fast developer experience for building the UI. Axios provides easy concurrent requests and response shaping.

How to Run Locally
Assumes only Node.js (16+) is installed. Run these commands from the repository root.

- Install backend dependencies and start server:

```powershell
cd backend
npm install
# Create a `.env` file in `backend/` with (optional but recommended):
# Github_Token=your_personal_access_token
node server.js
```

- Install frontend dependencies and start dev server (new terminal):

```powershell
cd frontend
npm install
npm run dev
```

Notes
- Backend default port: `8000` (change by setting `PORT` in `backend/.env`).
- Frontend dev server (Vite) usually runs on `http://localhost:5173`.

API Documentation
- GET /api/github/:username
	- Method: `GET`
	- Path: `/api/github/:username`
	- Request: no body. Provide GitHub username as URL parameter.
	- Response (200): JSON object with shape:
		```json
		{
			"user": {
				"login": "string",
				"avatar": "string",
				"name": "string|null",
				"bio": "string|null",
				"followers": number,
				"following": number,
				"publicRepos": number
			},
			"repos": [
				{
					"id": number,
					"name": "string",
					"description": "string|null",
					"language": "string|null",
					"stars": number,
					"updatedAt": "string (ISO)",
					"openIssues": number,
					"defaultBranch": "string",
					"htmlUrl": "string"
				}
			]
		}
		```
	- Errors: 400 for missing username; 404/500 for upstream or internal errors.

Project Structure
- Root files: Readme.md, frontend/, backend/
- backend/: Express API
	- `app.js` — Express app configuration, middlewares, error handlers.
	- `server.js` — server bootstrap (loads `.env` and starts `app`).
	- `routes/` — route definitions (`github_routes.js`).
	- `controllers/` — request handlers (`github_controller.js`).
	- `services/` — business logic and API calls (`github_service.js`, `cache_service.js`).
	- `utils/` — helpers (`Api_Error.js`, `Async_Handler.js`, `cache.js`).
- frontend/: Vite + React app
	- `src/` — React source files (`App.jsx`, pages, components, API helper).
	- `public/` — static assets.
	- `vite.config.js`, `package.json` — frontend build/dev config.
	-  took help of  Ai tools to  Style and Create frontend componets

 Next Steps 
    - Next Steps would be to Scale this project useing cloud computing and System 
    Design Principles 
    -Improving UI of sorting repo 
    -Adding major programming  Language Used by the user and making its chart useing Chart.js
    
