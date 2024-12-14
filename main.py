from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from authx import AuthX, AuthXConfig
from pydantic import BaseModel, Field

app = FastAPI()

# Укажите разрешенные источники без подстановочных знаков
origins = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:5500",
    "http://127.0.0.1:5500"
]

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Используем список origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

config = AuthXConfig()
config.JWT_SECRET_KEY = 'secret_key'
config.JWT_ACCESS_COOKIE_NAME = 'my_access_token'

security = AuthX(config=config)

class UserLoginSchema(BaseModel):
    username: str
    password: str

@app.post('/login')
def login(creds: UserLoginSchema):
    if creds.username == "test" and creds.password == "test":
        token = security.create_access_token(uid="12345")
        return {"access_token": token}
    raise HTTPException(status_code=401, detail="Incorrect username or password")