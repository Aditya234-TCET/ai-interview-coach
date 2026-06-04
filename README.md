# 🚀 AI Interview Preparation & Communication Coach

![AI Interview Coach](https://img.shields.io/badge/Status-Live-success?style=for-the-badge) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) 

Welcome to the **AI Interview Preparation & Communication Coach**, a comprehensive platform designed to simulate real-world interview scenarios. Whether you are preparing for an HR screening, a deep technical dive, or a behavioral round, this AI coach acts as your personal interviewer—providing dynamic questions, analyzing your spoken responses, and giving you actionable feedback.

## 🔗 Live Demo
- **Frontend (Vercel):** [https://ai-interview-coach-delta-eosin.vercel.app](https://ai-interview-coach-delta-eosin.vercel.app)
- **Backend API (Render):** [https://ai-interview-coach-2-zr83.onrender.com](https://ai-interview-coach-2-zr83.onrender.com)

---

## ✨ Features

- 🎙️ **Real-time Voice Input:** Speak your answers naturally. The platform records your voice and transcribes it instantly.
- 🧠 **Dynamic AI Persona:** Choose from various interview modes: `HR`, `Technical`, `DSA`, or `Behavioural`.
- 📊 **Instant Feedback & Analytics:** Get immediate scores on relevance, vocabulary, grammar, and filler words.
- 🎨 **Premium UI/UX:** Built with a stunning, modern glassmorphism design that is fully responsive on all devices (including mobile).
- ⚡ **Blazing Fast:** Powered by a React/Vite frontend and a highly concurrent FastAPI backend.

---

## 🛠️ Technology Stack

### Frontend
- **React.js (Vite)** for lightning-fast development and optimized production builds.
- **Tailwind CSS** for modern, responsive, and beautiful styling (Glassmorphism theme).
- **Axios** for seamless API communication.
- **Web Speech API** for handling microphone interactions.

### Backend
- **FastAPI** for a robust, high-performance, and asynchronous API.
- **Python 3.11** for core logic and natural language processing.
- **SQLite / SQLAlchemy** for lightweight and reliable data persistence.
- **Uvicorn** as the ASGI web server.

---

## 💻 Local Development Setup

If you want to run this project locally on your machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/Aditya234-TCET/ai-interview-coach.git
cd ai-interview-coach
```

### 2. Backend Setup
```bash
cd backend
# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
The backend will be running at `http://localhost:8000`

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend

# Install Node.js dependencies
npm install

# Create a local environment file
echo "VITE_API_URL=http://localhost:8000" > .env

# Start the Vite development server
npm run dev
```
The frontend will be running at `http://localhost:5173`

---

## ☁️ Deployment

This project is fully configured for continuous deployment on free-tier cloud services.
- **Frontend** is configured with `vercel.json` for easy deployment on [Vercel](https://vercel.com).
- **Backend** is configured with `Procfile` and `requirements.txt` for easy deployment on [Render](https://render.com). 

*(Note: The Render free tier spins down after 15 minutes of inactivity. When you visit the site after a long period, it may take ~30 seconds for the backend to wake up.)*

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Aditya234-TCET/ai-interview-coach/issues).

## 📄 License
This project is licensed under the MIT License.