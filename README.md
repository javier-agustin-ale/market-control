# Market Control 🛒

> A full-stack supermarket checkout system built with **Angular 20**, **Node.js**, **Express**, and **SQLite**.

Market Control is a full-stack web application that simulates the checkout process of a supermarket while providing an administration panel to manage the entire product catalogue.

The application automatically calculates the total cost of a shopping cart by applying the best available offers, while authenticated administrators can create, update and remove products, upload product images, and configure promotional pricing.

This project was originally created as a coding challenge and later evolved into a production-ready portfolio project showcasing frontend architecture, backend development, authentication, REST APIs, database persistence, deployment, and clean software design.

<p align="center">

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

</p>

---

# 🌍 Live Demo

### Frontend

https://market-control-l2ke.onrender.com/

### Backend API

https://market-control-api-tn0q.onrender.com/api

---

# 📋 Overview

The application consists of two different experiences.

## 🛒 Customer Checkout

Customers can browse the available products, add them to a shopping cart and instantly obtain the final price.

The checkout engine automatically applies promotional offers without requiring any manual calculations from the user.

For example:

| Product | Unit Price | Offer |
|---------|-----------:|------|
| Apple | $2.00 | 2 for $3.00 |

If the customer purchases **4 Apples**, the application calculates:

```
2 for $3
2 for $3

Total = $6
```

instead of

```
4 × $2 = $8
```

The algorithm always applies the combination of offers that produces the lowest possible price for the customer.

---

## 👨‍💼 Administration Panel

Administrators can log into the application and manage every product displayed in the checkout.

The management panel allows administrators to:

- Create new products
- Update existing products
- Delete products
- Upload product images
- Configure prices
- Configure promotional offers

The administration area shares the same backend API used by the checkout, making the application behave like a real production system.

---

# ✨ Features

## 🛒 Checkout

- Browse products
- Add products to cart
- Update quantities
- Remove products
- Live cart updates
- Automatic total calculation
- Smart promotional pricing
- Real-time offer calculation

---

## 📦 Product Management

- Create products
- Edit products
- Delete products
- Upload product images
- Display uploaded images
- Handle missing images gracefully

---

## 🔐 Authentication

- User registration
- Login
- Logout
- JWT authentication
- Protected backend endpoints
- Administrator access to product management

---

## 🎨 Frontend

Built with Angular 20 using a feature-based architecture.

Highlights include:

- Standalone Components
- Angular Material
- Reactive Forms
- RxJS
- TypeScript
- SCSS
- Responsive UI
- Service-based data layer

---

## ⚙ Backend

The backend exposes a REST API responsible for:

- Authentication
- Product management
- Image uploads
- Business logic
- Database persistence

---

# 🏗 Architecture

The project follows a classic three-layer architecture with a complete separation between presentation, business logic and persistence.

```
                    ┌──────────────────────┐
                    │      Angular 20      │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                          HTTP / REST
                               │
                    JSON Requests/Responses
                               │
                    ┌──────────▼───────────┐
                    │  Express REST API    │
                    │                      │
                    │ Authentication       │
                    │ Controllers          │
                    │ Business Logic       │
                    │ File Uploads         │
                    └──────────┬───────────┘
                               │
                           Sequelize
                               │
                    ┌──────────▼───────────┐
                    │      SQLite DB       │
                    │                      │
                    │ Users                │
                    │ Products             │
                    │ Offers               │
                    └──────────────────────┘
```

---

# 🧩 Frontend Architecture

The Angular application follows a feature-based structure.

```
src/
│
├── app/
│   │
│   ├── core/
│   │   ├── auth/
│   │   ├── enums/
│   │   ├── interfaces/
│   │   └── services/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── checkout/
│   │   ├── home/
│   │   └── products/
│   │
│   ├── shared/
│   │
│   └── app.config.ts
│
├── assets/
│
└── environments/
```

### Core

Contains application-wide services, interfaces and shared business logic.

### Features

Each business feature lives in its own module-like folder.

Examples:

- Authentication
- Checkout
- Products
- Home

This organization keeps responsibilities isolated and makes the application easier to maintain as it grows.

### Shared

Reusable UI components, utilities and common functionality used across multiple features.

---

# 🛠 Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| **Angular 20** | Single Page Application framework |
| **TypeScript** | Strong typing and maintainability |
| **Angular Material** | UI components |
| **RxJS** | Reactive programming and asynchronous data handling |
| **Reactive Forms** | Form validation and user input |
| **SCSS** | Component styling |

### Frontend Highlights

- Feature-based architecture
- Standalone components
- Dependency Injection
- Reactive Forms
- Angular Material
- RxJS Observables
- HTTP Client
- Reusable components
- Responsive design

---

## Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express** | REST API framework |
| **Sequelize** | ORM |
| **SQLite** | Database |
| **JWT** | Authentication |
| **bcrypt** | Password hashing |
| **Multer** | Image uploads |
| **dotenv** | Environment configuration |

### Backend Highlights

- RESTful API
- JWT Authentication
- File uploads
- Role-based authorization
- Middleware
- Database persistence
- Error handling
- Sequelize ORM

---

# 🚀 Getting Started

## Prerequisites

Before running the project make sure you have installed:

- Node.js 18+
- npm
- Git
- Angular CLI

```bash
npm install -g @angular/cli
```

---

# 📥 Clone Repository

```bash
git clone https://github.com/javier-agustin-ale/market-control.git

cd market-control
```

---

# 🎨 Frontend Setup

Navigate to the Angular project.

```bash
cd frontend/market-control
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm start
```

or

```bash
ng serve
```

Open:

```
http://localhost:4200
```

---

## Production Build

```bash
npm run build
```

Angular generates the optimized production build inside:

```
dist/market-control
```

---

# ⚙ Backend Setup

Navigate to the backend.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

Example:

```env
PORT=3000

JWT_SECRET=your-secret

DB_DIALECT=sqlite

DB_STORAGE=./database.sqlite

NODE_ENV=development
```

Run the backend.

Development

```bash
npm run dev
```

Production

```bash
npm start
```

The API will be available at

```
http://localhost:3000
```

---

# 🌍 Environment Configuration

The project uses different environment configurations for development and production.

Frontend:

```ts
export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000/api'
};
```

Production:

```ts
export const environment = {
    production: true,
    apiUrl: 'https://market-control-api-tn0q.onrender.com/api'
};
```

Using Angular environments allows the same application to work locally and in production without modifying the source code.

---

# ☁ Deployment

The application is fully deployed using **Render**.

## Frontend

Angular production build

↓

Static hosting

↓

REST API communication

↓

Backend

---

## Backend

Express server

↓

SQLite database

↓

Uploaded product images

↓

REST API

---

Deployment improvements include:

- Production Angular build
- Environment-based API URLs
- Static asset optimization
- REST API deployment
- Image upload support
- Production-ready configuration

---

# 📡 REST API

## Base URL

Development

```
http://localhost:3000/api
```

Production

```
https://market-control-api-tn0q.onrender.com/api
```

---

# Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Authenticate user |
| POST | `/auth/logout` | Logout |
| GET | `/auth/me` | Current authenticated user |

---

# Products

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/allProducts` | Retrieve all products |
| POST | `/` | Create product |
| PUT | `/:id` | Update product |
| DELETE | `/:id` | Delete product |

---

## Example Product

```json
{
    "name": "Apple",
    "unitPrice": 2,
    "specialOffer": {
        "quantity": 2,
        "price": 3
    }
}
```

---

# 📸 Image Uploads

Administrators can upload an image while creating or editing a product.

Images are stored by the backend and served through the REST API, allowing the frontend to display them dynamically.

If a product does not contain an image, the interface gracefully falls back to a placeholder while still allowing administrators to edit or delete the product.

---

# 🔒 Authentication Flow

```
User Login

        │

        ▼

Backend validates credentials

        │

        ▼

JWT generated

        │

        ▼

Frontend stores authentication

        │

        ▼

Authenticated requests include token

        │

        ▼

Protected backend endpoints
```

The administration panel is available only to authenticated administrators, while the checkout remains publicly accessible.

---

# 📁 Project Structure

The repository is organized as a monorepo containing both the Angular frontend and the Express backend.

```text
market-control
│
├── frontend/
│   └── market-control/
│       ├── src/
│       │   ├── app/
│       │   │
│       │   ├── core/
│       │   │   ├── auth/
│       │   │   ├── enums/
│       │   │   ├── interfaces/
│       │   │   └── services/
│       │   │
│       │   ├── features/
│       │   │   ├── auth/
│       │   │   ├── checkout/
│       │   │   ├── home/
│       │   │   └── products/
│       │   │
│       │   ├── shared/
│       │   │
│       │   ├── assets/
│       │   └── environments/
│       │
│       ├── angular.json
│       ├── package.json
│       └── tsconfig.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── seeders/
│   ├── package.json
│   └── index.js
│
└── README.md
```

---

# 🧪 Testing

## Frontend

Run Angular unit tests.

```bash
cd frontend/market-control

npm test
```

Generate a coverage report.

```bash
npm run test:coverage
```

---

## Backend

Run the backend test suite.

```bash
cd backend

npm test
```

---

# 💡 Development Highlights

This project demonstrates knowledge of modern full-stack development practices.

## Angular

- Angular 20
- Standalone Components
- Feature-based architecture
- Dependency Injection
- Reactive Forms
- Angular Material
- RxJS
- Component communication
- HTTP Client
- Responsive UI
- Environment configuration

---

## Backend

- Express REST APIs
- Sequelize ORM
- SQLite
- Authentication
- JWT
- Password hashing
- Middleware
- File uploads
- Error handling
- Environment variables

---

## Full-Stack

- RESTful communication
- Authentication flow
- CRUD operations
- Image upload pipeline
- API integration
- Production deployment
- Clean architecture
- Separation of concerns

---

# 📚 What I Learned

This project was originally developed to solve a supermarket checkout challenge, but it gradually evolved into a much more complete full-stack application.

Working on this project helped me deepen my understanding of:

- Designing scalable Angular applications
- Structuring projects using a feature-based architecture
- Building REST APIs with Express
- Authentication using JWT
- Password hashing with bcrypt
- Database modeling with Sequelize
- File uploads using Multer
- Environment configuration for multiple deployments
- Frontend and backend integration
- Deployment to Render
- Building production-ready applications

More importantly, it reinforced the importance of writing maintainable, reusable code and keeping a clear separation between presentation, business logic and persistence layers.

---

# 🚀 Future Improvements

Some ideas for future iterations of the project include:

- Category management
- Pagination
- Shopping history

---

# 🤝 Contributing

Contributions, suggestions and feature requests are always welcome.

If you'd like to contribute:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/my-feature
```

3. Commit your changes

```bash
git commit -m "Add awesome feature"
```

4. Push your branch

```bash
git push origin feature/my-feature
```

5. Open a Pull Request

---

# 📝 License

This project is licensed under the MIT License.

---

# 👨‍💻 About Me

Hi! I'm **Javier Agustín Ale**, a Frontend Software Developer currently based in Germany with over five years of experience building modern web applications.

Although my professional background is primarily focused on Frontend and TypeScript, I enjoy building complete full-stack applications to better understand every layer of the software development process.

This project represents exactly that: taking an initial coding challenge and evolving it into a production-ready application with authentication, administration features, image uploads, deployment, and a clean architecture.

### Connect with me

- GitHub: https://github.com/javier-agustin-ale
- LinkedIn: https://www.linkedin.com/in/javier-agustin-ale/

If you have any feedback, questions, or opportunities, feel free to reach out.

---

# ⭐ Support

If you found this project interesting or useful:

- ⭐ Star the repository
- 🍴 Fork it
- 🐞 Report issues
- 💡 Suggest improvements

Every contribution and piece of feedback is appreciated.

---

Thank you for taking the time to check out this project!
