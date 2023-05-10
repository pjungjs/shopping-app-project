import axios from "axios";
import { useState, useEffect } from "react";
import Product from "./Product.jsx";

const API = process.env.REACT_APP_API_URL;

function Products({ cart, setCart, loggedInAs}) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products`)
    .then((response) => setProducts(response.data))
    .catch((e) => console.warn("catch", e));
  })

  return (
    <div>
      <h1>Welcome to the Products page!</h1>
      {products.map((product) => {
        return (
          <Product 
          cart={cart}
          setCart={setCart}
          loggedInAs={loggedInAs}
          />
        )
      })}
    </div>
  )
}
export default Products;