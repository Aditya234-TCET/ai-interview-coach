from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import engine, Base
from routes import interview

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Interview Coach API",
    description="Backend API for the AI Interview Preparation & Communication Coach",
    version="1.0.0"
)

# Configure CORS
FRONTEND_ORIGINS = [
    "http://localhost:5173",                    # local dev
    "http://localhost:3000",                    # local dev alt port
    "https://ai-interview-coach.vercel.app",    # ← your Vercel URL (update if different)
    # add more origins here if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Interview Coach API!"}

app.include_router(interview.router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
