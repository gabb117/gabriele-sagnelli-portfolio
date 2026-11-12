from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)

@app.get("/api/about")
def get_about():
    return {
        "nome": "Gabriele Sagnelli",
        "ruolo": "Python Developer & Data Engineering Enthusiast",
        "bio": "Laureato in Scienze e Tecnologie Informatiche, con una forte passione per lo sviluppo software, il machine learning e l'ingegneria dei dati.",
        "location": "Italia",
        "esperienza": "Sviluppo di applicazioni web, integrazione API e gestione database."
    }

@app.get("/api/skills")
def get_skills():
    return [
        {
            "categoria": "Linguaggi di Programmazione", 
            "lista": ["Python", "C/C++", "Java", "HTML/CSS/JS"]
        },
        {
            "categoria": "Database", 
            "lista": ["MySQL", "SQLite", "PostgreSQL"]
        },
        {
            "categoria": "Strumenti, Librerie e Framework", 
            "lista": ["Git & GitHub", "VS Code", "Pandas", "NumPy", "Plotly", "Streamlit"]
        }
    ]

@app.get("/api/projects")
def get_projects():
    projects = [{
        "id": "A1",
        "titolo": "My Portfolio",
        "descrizione": "Portfolio personale sviluppato con React e FastAPI, incentrato su Python e gestione dati.",
        "link": "https://github.com/gabrielesagnelli"
    }] 
     
    return projects