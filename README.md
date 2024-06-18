# Books API

Books API is a RESTful API for managing a collection of books and users with features including user registration, authentication, email verification, and role-based access control.

## Features

- User Registration and Authentication: Register new users, log in, and manage user roles.
- Email Verification: Send verification emails to users upon registration.
- Book Management: Add, update, view, and delete books.
  Role-Based Access Control: Restrict certain actions to users with specific roles (e.g., admin).

## Technologies

- Node.js: Backend runtime environment
- Express: Web framework for Node.js
- Prisma: ORM for database management
- PostgreSQL: Relational database
- JWT: JSON Web Tokens for authentication
- SendGrid: Email service for sending verification emails
- Docker: Containerization for easy deployment

## Installation

- Clone the repository:

```
git clone https://github.com/NazarbayND/books-api.git
cd books-api
```

- Set up environment variables: Create a .env file in the root directory and add the following:

```
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
PORT=5000
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=your_email@example.com
FRONTEND_URL=http://localhost:3000
POSTGRES_USER=admin
POSTGRES_PASSWORD=pass
POSTGRES_DB=books
```

- Build and run the Docker containers:

```
docker-compose up --build
```
