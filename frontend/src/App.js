import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx";
import About from "./pages/About.jsx";

import Customers from "./components/Customers/Customers.jsx";
import NewCustomer from "./components/Customers/NewCustomer.jsx";
import CustomerDetails from "./components/Customers/CustomerDetails.jsx";
import EditCustomer from "./components/Customers/EditCustomer.jsx";
import CustomerCart from "./components/Customers/CustomerCart.jsx";
import CustomerHistory from "./components/Customers/CustomerHistory.jsx";

import Products from "./components/Products/Products.jsx";
import Product from "./components/Products/Product.jsx";

import RetailerProducts from "./components/Retailers/RetailerProducts.jsx";
import RetailerNewProduct from "./components/Retailers/RetailerNewProduct.jsx";
import RetailerEditProduct from "./components/Retailers/RetailerEditProduct.jsx";

function App() {
  const [loggedInAs, setLoggedInAs] = useState({first_name: "Guest"});
  const [cart, setCart] = useState({});

  return (
    <div className="App">
      <Router>
        <header>
          <NavBar loggedInAs={loggedInAs} cart={cart} />
        </header>
        <main>
          <Container className="mb-4">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/customers" element={<Customers setLoggedInAs={setLoggedInAs} />} />
              <Route path="/customers/new" element={<NewCustomer />} />
              <Route path="/customers/:id" element={<CustomerDetails />} />
              <Route path="/customers/:id/edit" element={<EditCustomer setLoggedInAs={setLoggedInAs} />} />
              <Route path="/customers/:id/cart" element={<CustomerCart loggedInAs={loggedInAs} customerCart={cart[loggedInAs.first_name]} cart={cart} setCart={setCart} />} />
              <Route path="/customers/:id/history" element={<CustomerHistory loggedInAs={loggedInAs} />} />

              <Route path="/products" element={<Products loggedInAs={loggedInAs} cart={cart} setCart={setCart} />} />
              <Route path="/products/:id" element={<Product />} />
              
              <Route path="/retailer/products" element={<RetailerProducts />} />
              <Route path="/retailer/products/new" element={<RetailerNewProduct />} />
              <Route path="/retailer/product/:id/edit" element={<RetailerEditProduct />} />
              
              <Route path="/about" element={<About />} />

              <Route path="/*" element={<Error />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
