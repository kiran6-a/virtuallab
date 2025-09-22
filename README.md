# VirtualLab

Flask + React virtual lab with user auth and physics pages.

## Backend
`powershell
cd backend
python -m venv venv
venv\Scripts\python.exe -m pip install -U pip
venv\Scripts\python.exe -m pip install -r requirements.txt
venv\Scripts\python.exe app.py
` 

## Frontend
`powershell
cd backend/frontend
npm install
npm start
` 

## API
Auth: POST /api/register, POST /api/login, POST /api/logout, GET /api/me
Users CRUD: GET/POST /api/users, GET/PATCH/DELETE /api/users/:id

