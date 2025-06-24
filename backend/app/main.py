from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session, joinedload
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import List
import os
from dotenv import load_dotenv

from . import models, schemas, database
from .database import engine, get_db
from .security import verify_password, create_access_token, get_password_hash, SECRET_KEY, ALGORITHM

load_dotenv()

# Déplacer la création des tables ici, avant que l'app ne soit créée
models.Base.metadata.create_all(bind=engine)

def create_admin_if_not_exists():
    db = database.SessionLocal()
    admin_email = os.getenv("ADMIN_EMAIL")
    admin_password = os.getenv("ADMIN_PASSWORD")
    if not admin_email or not admin_password:
        return
    admin = db.query(models.User).filter(models.User.email == admin_email).first()
    if not admin:
        hashed_password = get_password_hash(admin_password)
        db_admin = models.User(
            email=admin_email,
            name="Admin",
            hashed_password=hashed_password,
            is_admin=True
        )
        db.add(db_admin)
        db.commit()
    db.close()

# Appeler la fonction d'initialisation
create_admin_if_not_exists()

app = FastAPI()

# Configuration CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        name=user.name if user.name else user.email.split('@')[0],
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=List[schemas.User])
def read_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_by_admin(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operation not permitted"
        )
    
    user_to_delete = db.query(models.User).filter(models.User.id == user_id).first()
    if not user_to_delete:
        raise HTTPException(status_code=404, detail="User not found")

    if user_to_delete.is_admin:
        raise HTTPException(status_code=403, detail="Admins cannot be deleted")

    db.delete(user_to_delete)
    db.commit()
    return

@app.post("/ideas/", response_model=schemas.Idea)
def create_idea(
    idea: schemas.IdeaCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_idea = models.Idea(
        idea=idea.idea,
        user_id=current_user.id,
        created_at=datetime.utcnow().isoformat()
    )
    db.add(db_idea)
    db.commit()
    db.refresh(db_idea)
    return db_idea

@app.get("/ideas/", response_model=List[schemas.Idea])
def read_ideas(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    ideas = db.query(models.Idea).options(joinedload(models.Idea.user)).order_by(models.Idea.id.desc()).offset(skip).limit(limit).all()
    return ideas

@app.delete("/ideas/{idea_id}")
def delete_idea(
    idea_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    idea = db.query(models.Idea).filter(models.Idea.id == idea_id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    if not current_user.is_admin and idea.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this idea")
    db.delete(idea)
    db.commit()
    return {"message": "Idea deleted successfully"} 