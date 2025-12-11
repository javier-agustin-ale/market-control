## Market Control

This project code is for a supermarket checkout that calculates the total price of several products. 

Each product has it owns price, which can be changed from the “Products Management” tab. In this section we can also add/edit the “Special Offers”, this means that when the user selects the required amount of the same product, a new price will be charge instead of the unit price. 

For Example, Apple unit price is $2; “Special Offer” is 2 for $3. So, when the user adds 2 apples to the shopping cart, the price to pay will be $3. 

Of course, it's possible to get more than one offer for the same product, so if the user adds 4 apples to the cart, he will get 2 offers, meaning that the total price to pay will be $6 (“Special Offer” x 2). 

Project Structure: 

We have two folders (backend and frontend/haiilomarkt-fe). 

* Frontend/market-control contains a project built with **Angular 20** , **Angular Material** & **RxJS**

* Backend contains a RESTful API built with **Node.js**, **Express**, and **Sequelize ORM**, using **SQLite** as the database.


## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/javier-agustin-ale/haiilomarkt.git

## FRONTEND 
1. **Navigate to  folder
  ```bash
   cd frontend/haiilomarkt-fe
```
2. **Install dependencies**
   ```bash
   npm install
    # or
    yarn install
3. **Run the project**
     ```bash
     npm start
4. **Ran Test**
   ```bash
   npm test


## API 
1. **Navigate to backend folder**
  ```bash
   cd backend
```
2. **Install dependencies**
    ```bash
   npm install
    ```
3.  **Create a .env file**
     ```bash
      PORT=3000
      DB_DIALECT=sqlite
      DB_STORAGE=./data/haiilomarkt.sqlite 

4. **Run the project**
     ```bash
     npm run dev


## 🚀 API Endpoints

All product routes are prefixed with `/api/`.

| Method | Endpoint              | Description          | 
|--------|-----------------------|----------------------|
| GET    | `/allProducts`        | Get all products     |
| POST   | `/`                   | Create a new product |
| PUT    | `/:id`                | Update a product     |
| DELETE | `/:id`                | Delete a product     |


---
