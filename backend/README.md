# Green City Backend

This is the backend service for the Green City project, built with FastAPI and MySQL.

## Setup

1. Create a `.env` file in the root directory with the following content:
```
DATABASE_URL=mysql+pymysql://root:root@db:3306/greencity
SECRET_KEY=your-super-secret-key-here
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
uvicorn app.main:app --reload
```

## API Endpoints

- POST `/token` - Login and get access token
- POST `/users/` - Create a new user
- POST `/ideas/` - Create a new idea (requires authentication)
- GET `/ideas/` - Get all ideas (requires authentication)
- DELETE `/ideas/{idea_id}` - Delete an idea (requires authentication)

## Authentication

The API uses JWT tokens for authentication. To access protected endpoints:

1. Get a token by calling the `/token` endpoint with your credentials
2. Include the token in the Authorization header: `Bearer <your_token>` 