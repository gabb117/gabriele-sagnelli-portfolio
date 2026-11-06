
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
        {"categoria": "Backend", "lista": ["Python", "FastAPI", "REST API", "SQLAlchemy"]},
        {"categoria": "Frontend", "lista": ["React", "Vite", "JavaScript (ES6+)", "HTML5 & CSS3"]},
        {"categoria": "Strumenti & DevOps", "lista": ["Git & GitHub", "VS Code", "Uvicorn", "npm"]}
    ]


@app.get("/api/projects")
def get_project():
    projects = [{
        "id" : "A1",
        "title" : "My new project",
        "descr" : "My Portfolio, frontend: React and backend: FastAPI",
        "link" : "http://github.com"
    }] 
     
    return projects
