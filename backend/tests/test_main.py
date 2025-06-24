import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import get_db, Base
from app.models import User
from app.security import get_password_hash

# Base de données de test
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture
def client():
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def admin_user():
    return {
        "email": "loise.fenoll@ynov.com",
        "password": "PvdrTAzTeR247sDnAZBr"
    }

@pytest.fixture
def test_user():
    return {
        "email": "test@example.com",
        "password": "testpassword123"
    }

class TestUserRegistration:
    def test_register_user_success(self, client, test_user):
        response = client.post("/users/", json=test_user)
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == test_user["email"]
        assert "id" in data

    def test_register_user_duplicate_email(self, client, test_user):
        # Premier enregistrement
        client.post("/users/", json=test_user)
        # Deuxième enregistrement avec le même email
        response = client.post("/users/", json=test_user)
        assert response.status_code == 400

    def test_register_user_invalid_email(self, client):
        response = client.post("/users/", json={
            "email": "invalid-email",
            "password": "testpassword123"
        })
        assert response.status_code == 422

    def test_register_user_short_password(self, client):
        response = client.post("/users/", json={
            "email": "test@example.com",
            "password": "123"
        })
        assert response.status_code == 422

class TestUserAuthentication:
    def test_login_success(self, client, admin_user):
        response = client.post("/token", data={
            "username": admin_user["email"],
            "password": admin_user["password"]
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"

    def test_login_invalid_credentials(self, client):
        response = client.post("/token", data={
            "username": "wrong@email.com",
            "password": "wrongpassword"
        })
        assert response.status_code == 401

class TestUserManagement:
    def test_get_users_as_admin(self, client, admin_user):
        # Se connecter en tant qu'admin
        login_response = client.post("/token", data={
            "username": admin_user["email"],
            "password": admin_user["password"]
        })
        token = login_response.json()["access_token"]
        
        # Récupérer la liste des utilisateurs
        response = client.get("/users/", headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        users = response.json()
        assert isinstance(users, list)

    def test_get_users_unauthorized(self, client):
        response = client.get("/users/")
        assert response.status_code == 401

class TestIdeaManagement:
    def test_create_idea(self, client, admin_user):
        # Se connecter
        login_response = client.post("/token", data={
            "username": admin_user["email"],
            "password": admin_user["password"]
        })
        token = login_response.json()["access_token"]
        
        # Créer une idée
        idea_data = {"idea": "Test idea content"}
        response = client.post("/ideas/", json=idea_data, headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        data = response.json()
        assert data["idea"] == idea_data["idea"]

    def test_get_ideas(self, client, admin_user):
        # Se connecter
        login_response = client.post("/token", data={
            "username": admin_user["email"],
            "password": admin_user["password"]
        })
        token = login_response.json()["access_token"]
        
        # Récupérer les idées
        response = client.get("/ideas/", headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        ideas = response.json()
        assert isinstance(ideas, list)

if __name__ == "__main__":
    pytest.main([__file__]) 