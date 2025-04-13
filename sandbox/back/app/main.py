# api/main.py

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from .api.router import router as api_router

app = FastAPI(
    title="AI Workflow MVP",
    description="A modular system for scanning files, running AI flows, and managing workflows via API.",
    version="0.1.0",
    contact={
        "name": "Matías Iglesias",
        "url": "http://matuteiglesias.link",
        "email": "your_email@example.com"
    },
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    },
)

# Allow local frontend requests (adjust as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/")
def read_root():
    return {"message": "Hello from AI Workflow MVP 👋"}


@app.get("/_debug/routes")
def list_routes():
    routes = []
    for route in app.routes:
        routes.append({
            "path": route.path,
            "name": route.name,
            "methods": list(route.methods),
        })
    return routes


@app.middleware("http")
async def log_requests(request: Request, call_next):
    body = await request.body()
    print(f"🚀 {request.method} {request.url.path} - {body.decode()}")
    response = await call_next(request)
    return response
