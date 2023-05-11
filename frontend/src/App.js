import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

import { useEffect } from 'react';

function App() {
  const [loggedInAs, setLoggedInAs] = useState({id: "Guest"});
  const [cart, setCart] = useState({});

  useEffect(() => {
    console.log("AppCart", cart);
    console.log("AppCarRef", cart[`customer${loggedInAs.id}`])
  },[loggedInAs.id, cart])

  return (
    <div className="App">
      <Router>
        <header>
          <NavBar loggedInAs={loggedInAs} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/customers" element={<Customers setLoggedInAs={setLoggedInAs} />} />
            <Route path="/customers/new" element={<NewCustomer />} />
            <Route path="/customers/:id" element={<CustomerDetails />} />
            <Route path="/customers/:id/edit" element={<EditCustomer setLoggedInAs={setLoggedInAs} />} />
            <Route path="/customers/:id/cart" element={<CustomerCart loggedInAs={loggedInAs} customerCart={cart[`customer${loggedInAs.id}`]} setCart={setCart} />} />
            <Route path="/customers/:id/history" element={<CustomerHistory loggedInAs={loggedInAs} />} />

            <Route path="/products" element={<Products cart={cart} setCart={setCart} loggedInAs={loggedInAs}/>} />
            <Route path="/products/:id" element={<Product />} />
            
            <Route path="/retailer/products" element={<RetailerProducts />} />
            <Route path="/retailer/products/new" element={<RetailerNewProduct />} />
            <Route path="/retailer/product/:id/edit" element={<RetailerEditProduct />} />
            
            <Route path="/about" element={<About />} />

            <Route path="/*" element={<Error />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
