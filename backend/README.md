# Shopping App Project (Backend)

Pursuit 9.4 Module 4 - Single Resource Pair Project (Frontend & Backend)

[Backend deployed on render](https://shopping-app-backend-jddk.onrender.com/)

| Developer |
| :--------------: |
| [James Lee](https://github.com/aardvarkpepper) |
| [Jinseok Jung](https://github.com/pjungjs) |

---

### Technologies Used

* JavaScript
* Express JS
* NPM (CORS, nodemon, dotenv)
* Postman

---

## Backend Routes

- ### Customers:

|  #  | Action  |        URL        | HTTP Verb |    CRUD    |                  Description                   |
| :-: | :-----: | :--------------- | :-------: | :--------: | :-------------------------------------------- |
|  1  |  Index  | /customers        |    GET    |    Read    |         Get a list of all customers         |
|  2  | Create  | /customers/new    |   POST    |   Create   |            Create a new customer            |
|  3  |  Show   | /customers/:id    |    GET    |    Read    |       Get an individual customer's details       |
|  4  | Destroy | /customers/:id    |  DELETE   |   Delete   |              Delete a transaction              |
|  5  | Update  | /customers/:id/edit |    PUT    |   Update   |           Update/Edit a transaction            |
|  6  |  Show   | /customers/:id/cart |    GET    |    Read    |     Get an individual customer's shopping cart     |
|  7  |  Show   | /customers/:id/history |    GET    |    Read    |       Get an individual customer's history       |

- ### Products:

|  #  | Action  |        URL        | HTTP Verb |    CRUD    |                  Description                   |
| :-: | :-----: | :--------------- | :-------: | :--------: | :-------------------------------------------- |
|  1  |  Index  | /products        |    GET    |    Read    | Get all the products with images and "add to cart" button         |

- ### Retailer:

|  #  | Action  |        URL        | HTTP Verb |    CRUD    |                  Description                   |
| :-: | :-----: | :--------------- | :-------: | :--------: | :-------------------------------------------- |
|  1  |  Index  | /retailer/products        |    GET    |    Read    | Get the list of all the products with "show product button"         |
|  2  | Create  | /retailer/products/new    |   POST    |   Create   | Create a new product            |
|  4  | Destroy | /retailer/products/:id    |  DELETE   |   Delete   | Delete a product              |
|  3  |  Show   | /retailer/products/:id    |    GET    |    Read    | Get an individual product's details       |
|  5  | Update  | /retailer/products/:id/edit |    PUT    |   Update   | Update/Edit a product            |

---
