from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, task

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(task.router)
app.include_router(auth.router)