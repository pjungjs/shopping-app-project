import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "./Product.jsx";
import OrderAddProduct from "../Orders/OrderAddProduct.jsx";
const API = process.env.REACT_APP_API_URL;

export default function Products({ cart, setCart, loggedInAs }) {
  const [products, setProducts] = useState([]);

  //sort function satisfies "front end calculation . . . displayed to user".
  useEffect(() => {
    async function getProducts() {
      await axios
        .get(`${API}/products`)
        .then((response) => {
          setProducts(response.data.sort((product1, product2) => product1.id < product2.id ? -1 : product1 > product2.id ? 1 : 0))
        })
        .catch((error) => console.warn("catch", error));
    }
    getProducts();
  }, [])

  return (
    <div>
      <h1>Welcome to the Products page!</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((product) => {
          return (
            <Col key={product.id}>
              <Product
                cart={cart}
                setCart={setCart}
                product={product}
                loggedInAs={loggedInAs}
              />
            </Col>
          )
        })}
      </Row>

    </div>
  )
}