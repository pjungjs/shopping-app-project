import axios from "axios";
import { useState, useEffect } from "react";
import Product from "./Product.jsx";
import OrderAddProduct from "../Orders/OrderAddProduct.jsx";
const API = process.env.REACT_APP_API_URL;

export default function Products({ cart, setCart, loggedInAs }) {
  const [products, setProducts] = useState([]);
  // console.log("Products", products.sort((product1, product2) => {
  //   if (product1.id < product2.id) {
  //     return -1;
  //   } if (product1 > product2.id) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // })
  // // sort
  // );
  // //console.log

  useEffect(() => {
    axios.get(`${API}/products`)
      .then((response) => {
        setProducts(response.data.sort((product1, product2) => {
          if (product1.id < product2.id) {
            return -1;
          } if (product1 > product2.id) {
            return 1;
          } else {
            return 0;
          }
        }))
      })
      .catch((e) => console.warn("catch", e));
  }, [])

  return (
    <div>
      <h1>Welcome to the Products page!</h1>
      {products.map((product) => {
        return (
          <div>
            <Product
              key={product.id}
              product={product}
              cart={cart}
              setCart={setCart}
              loggedInAs={loggedInAs}

            />
            <OrderAddProduct
              key={product.id}
              productID={product.id}
              productInStock={product.quantity_in_stock}
              cart={cart}
              setCart={setCart}
              loggedInAs={loggedInAs}
            />
          </div>
        )
      })}
    </div>
  )
}