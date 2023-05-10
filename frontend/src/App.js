import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx";

import Customers from "./components/Customers/Customers.jsx";
import NewCustomer from "./components/Customers/NewCustomer.jsx";
import CustomerDetails from "./components/Customers/CustomerDetails.jsx";
import EditCustomer from "./components/Customers/EditCustomer.jsx";

import Products from "./components/Products/Products.jsx";


function App() {
  const [loggedInAs, setLoggedInAs] = useState("");

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
            <Route path="/customers/:id/edit" element={<EditCustomer />} />
                        
            <Route path="/products" element={<Products />} />

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
