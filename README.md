# Market Control 🛒

> A full-stack supermarket checkout system demonstrating end-to-end development skills

A comprehensive point-of-sale (POS) application that manages product pricing, special offers, and shopping cart calculations. This project showcases modern full-stack development practices with a type-safe frontend and a robust RESTful API backend.

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=flat&logo=angular&logoColor=white)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

---

## 📋 Overview

Market Control is a full-stack checkout system that calculates the total price of products while automatically applying special offers and discounts. The system features a clean separation between frontend and backend, demonstrating proper API design, state management, and database operations.

### Business Logic Example

**Product Pricing with Special Offers:**
- Apple unit price: $2
- Special Offer: 2 for $3
- Cart with 4 apples → 2 offers applied → Total: $6

The system intelligently calculates the optimal combination of special offers to minimize customer cost.

---

## ✨ Key Features

### Customer-Facing Features
- **🛍️ Shopping Cart**: Add, remove, and update product quantities in real-time
- **💰 Smart Pricing**: Automatic calculation of best prices with special offers
- **📊 Live Total**: Dynamic price updates as items are added/removed
- **🎯 Offer Visualization**: Clear display of active discounts and savings

### Management Features
- **📦 Product Management**: Full CRUD operations for product catalog
- **🏷️ Special Offers**: Create and manage promotional pricing rules
- **💵 Price Updates**: Real-time price modifications without system restart
- **📈 Offer Stacking**: Support for multiple offers on the same product

---

## 🏗️ Full-Stack Architecture

This project demonstrates a complete separation of concerns with independent frontend and backend systems communicating via RESTful API.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Angular 20)                    │
│  ┌────────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │   Components   │  │   Services   │  │  State (RxJS)   │ │
│  │  - Cart View   │  │  - Product   │  │  - Observable   │ │
│  │  - Products    │  │  - HTTP      │  │  - BehaviorSub  │ │
│  │  - Management  │  │  - Cart      │  │  - Async Pipe   │ │
│  └────────────────┘  └──────────────┘  └─────────────────┘ │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP/REST
                            │ (JSON)
┌───────────────────────────▼─────────────────────────────────┐
│                    BACKEND (Node.js/Express)                 │
│  ┌────────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │   REST API     │  │  Business    │  │   Data Layer    │ │
│  │  - Routes      │  │  - Pricing   │  │  - Sequelize    │ │
│  │  - Middleware  │  │  - Offers    │  │  - Models       │ │
│  │  - Validation  │  │  - Cart      │  │  - Migrations   │ │
│  └────────────────┘  └──────────────┘  └─────────────────┘ │
└───────────────────────────┬─────────────────────────────────┘
                            │ ORM
                            │
                    ┌───────▼────────┐
                    │ SQLite Database│
                    │  - Products    │
                    │  - Offers      │
                    │  - Prices      │
                    └────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend (Client-Side)
| Technology | Purpose | Key Features Used |
|------------|---------|-------------------|
| **Angular 20** | SPA Framework | Components, Services, Routing, Forms |
| **TypeScript** | Type Safety | Interfaces, Types, Generics |
| **Angular Material** | UI Components | Tables, Forms, Buttons, Dialogs |
| **RxJS** | Reactive Programming | Observables, Operators, Subjects |
| **SCSS** | Styling | Nested rules, Variables, Mixins |

### Backend (Server-Side)
| Technology | Purpose | Key Features Used |
|------------|---------|-------------------|
| **Node.js** | Runtime Environment | Event Loop, Async I/O |
| **Express** | Web Framework | Routing, Middleware, Error Handling |
| **Sequelize ORM** | Database Layer | Models, Migrations, Queries |
| **SQLite** | Database | Embedded DB, ACID compliance |
| **JavaScript (ES6+)** | Server Logic | Async/Await, Modules, Arrow Functions |

### Development Tools
- **npm** - Package management
- **Nodemon** - Auto-restart during development
- **Angular CLI** - Project scaffolding and build tools
- **Git** - Version control

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** v18 or higher
- **npm** v9 or higher
- **Git**
- **Angular CLI** v20 (install globally: `npm install -g @angular/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/javier-agustin-ale/market-control.git
   cd market-control
   ```

---

## 🎨 FRONTEND Setup

The frontend is an Angular 20 single-page application with Material Design components.

1. **Navigate to frontend folder**
   ```bash
   cd frontend/market-control
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:4200`

4. **Run tests**
   ```bash
   npm test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```
   Production files will be in `dist/market-control`

### Frontend Architecture Details

- **Components**: Modular, reusable UI components following Angular best practices
- **Services**: Business logic and HTTP communication abstracted from components
- **Reactive Forms**: Type-safe form handling with validation
- **RxJS**: Asynchronous data streams for real-time updates
- **Routing**: Lazy-loaded modules for optimal performance

---

## ⚙️ BACKEND Setup

The backend is a RESTful API built with Express, providing data persistence and business logic.

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the backend folder**
   ```env
   PORT=3000
   DB_DIALECT=sqlite
   DB_STORAGE=./data/market.sqlite
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   API will be available at `http://localhost:3000`

5. **Run the production server**
   ```bash
   npm start
   ```

### Backend Architecture Details

- **Express Router**: Organized route handlers for clean API structure
- **Sequelize ORM**: Type-safe database queries with model validation
- **Middleware**: CORS, body parsing, error handling, request logging
- **Database**: SQLite for lightweight, file-based persistence
- **RESTful Design**: Standard HTTP methods and status codes

---

## 🚀 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Products

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/allProducts` | Get all products | - | `200 OK` Array of products |
| `POST` | `/` | Create a new product | Product object | `201 Created` Product created |
| `PUT` | `/:id` | Update a product | Updated product | `200 OK` Updated product |
| `DELETE` | `/:id` | Delete a product | - | `204 No Content` |

#### Example Request

**Create Product:**
```bash
POST http://localhost:3000/api/
Content-Type: application/json

{
  "name": "Apple",
  "unitPrice": 2.00,
  "specialOffer": {
    "quantity": 2,
    "price": 3.00
  }
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Apple",
  "unitPrice": 2.00,
  "specialOffer": {
    "quantity": 2,
    "price": 3.00
  },
  "createdAt": "2024-02-02T10:30:00.000Z",
  "updatedAt": "2024-02-02T10:30:00.000Z"
}
```

---

## 📁 Project Structure

```
market-control/
│
├── frontend/market-control/        # Angular Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/         # Reusable UI components
│   │   │   ├── services/           # Business logic & API calls
│   │   │   ├── models/             # TypeScript interfaces/types
│   │   │   ├── pages/              # Route components
│   │   │   └── shared/             # Shared utilities
│   │   ├── assets/                 # Static files
│   │   └── environments/           # Environment configs
│   ├── angular.json                # Angular CLI configuration
│   ├── package.json                # Frontend dependencies
│   └── tsconfig.json               # TypeScript configuration
│
├── backend/                        # Node.js/Express Backend
│   ├── src/
│   │   ├── routes/                 # API route definitions
│   │   ├── models/                 # Sequelize database models
│   │   ├── controllers/            # Request handlers
│   │   ├── middleware/             # Custom middleware
│   │   └── config/                 # Database & app config
│   ├── data/                       # SQLite database file
│   ├── .env                        # Environment variables
│   ├── package.json                # Backend dependencies
│   └── server.js                   # Application entry point
│
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

---

## 💡 Full-Stack Development Highlights

This project demonstrates proficiency in:

### Frontend Development
- **Component Architecture**: Modular, maintainable code structure
- **State Management**: RxJS observables for reactive data flow
- **Type Safety**: Strong typing with TypeScript interfaces and models
- **Responsive Design**: Mobile-first approach with Angular Material
- **Form Handling**: Template-driven and reactive forms with validation
- **HTTP Communication**: Service layer for API integration
- **Testing**: Unit tests with Jasmine and Karma

### Backend Development
- **RESTful API Design**: Standard HTTP methods and resource-based routing
- **Database Design**: Normalized schema with proper relationships
- **ORM Usage**: Sequelize for database abstraction and migrations
- **Middleware Pattern**: Custom middleware for cross-cutting concerns
- **Error Handling**: Centralized error handling with appropriate status codes
- **Environment Configuration**: Secure configuration management
- **Async Programming**: Promises and async/await patterns

### Full-Stack Integration
- **API Communication**: JSON-based data exchange
- **CORS Configuration**: Secure cross-origin resource sharing
- **Request/Response Cycle**: Complete understanding of HTTP protocol
- **Data Validation**: Both client-side and server-side validation
- **State Synchronization**: Real-time updates between frontend and backend
- **Separation of Concerns**: Clean architecture with clear boundaries

---

## 🧪 Testing

### Frontend Tests
```bash
cd frontend/market-control
npm test                 # Run unit tests
npm run test:coverage    # Generate coverage report
```

### Backend Tests
```bash
cd backend
npm test                 # Run API tests
```

---

## 🎓 What I Learned

This project enhanced my understanding of:

- **Full-Stack Architecture**: Designing and implementing complete end-to-end solutions
- **API Design**: Creating RESTful services with proper HTTP semantics
- **Database Modeling**: Structuring data for optimal query performance
- **Type Safety**: Leveraging TypeScript across the entire stack
- **Reactive Programming**: Managing asynchronous data flows with RxJS
- **Modern Frameworks**: Deep dive into Angular 20 and Express ecosystems
- **Testing Practices**: Writing unit tests for frontend components and API endpoints
- **Development Workflow**: Using modern tools for efficient development
- **Code Organization**: Structuring projects for maintainability and scalability
- **Problem Solving**: Implementing complex business logic (offer calculations)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Javier Agustin Ale**

- GitHub: [@javier-agustin-ale](https://github.com/javier-agustin-ale)
- Project Link: [market-control](https://github.com/javier-agustin-ale/market-control)

---

## 🙏 Acknowledgments

- **Angular Team** - For the powerful framework
- **Express Community** - For the minimalist web framework
- **Sequelize** - For the robust ORM
- **Material Design** - For the beautiful UI components

---

⭐ If you found this project useful or interesting, please consider giving it a star!
