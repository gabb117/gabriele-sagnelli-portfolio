
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins = ["*"], allow_credentials = True, allow_methods = ["*"], allow_headers = ["*"] )

@app.get("/api/about")
def get_about():
    return {
        "nome": "Gabriele Sagnelli",
        "ruolo": "Python Developer",
        "bio": ".",
        "location": "Italia",
        "esperienza": "Sviluppo di applicazioni web, integrazione API e gestione database."
    }

@app.get("/api/skills")
def get_skills():
    return [
        {"categoria": "Linguaggi di Programmazione", "lista": ["Python", "C/C++", "Java", "HTML/CSS/JS"]},
        {"categoria": "Database", "lista": ["MySQL", "SQLite", "PostgresSQL"]},
        {"categoria": "Strumenti, Librerie e Framework", "lista": ["Git & GitHub", "VS Code", "Pandas", "Numpy", "Plotly", "Streamlit"]}
    ]


@app.get("/api/projects")
def get_project():
    projects = [{
        "id" : "A1",
        "title" : "My Portfolio",
        "descr" : "My Portfolio: Python & SQL",
        "link" : "http://github.com"
    }] 
     
    return projects
