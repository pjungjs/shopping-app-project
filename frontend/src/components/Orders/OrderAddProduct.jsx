/*
Check dependencies.
*/

/*orders 
  id SERIAL PRIMARY KEY,
  productId INTEGER REFERENCES products (id) ON DELETE CASCADE
  customerId INTEGER REFERENCES customers (id) ON DELETE CASCADE
  productQty INT NOT NULL,
  date DATE NOT NULL
*/

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

export default function OrderAddProduct({customerId ="", cartContents=[]}) {
  let navigate = useNavigate();
  //Accesses from /products/:id
  const { id } = useParams();

  const [order, setOrder] = useState({
    productId: "",
    customerId: "",
    productQty: "",
    date: ""
  });

  const addOrder = (qty) => {
    axios.get(`${API}/products/${id}`)
    .then((response) => {
      console.log(response.data.quantityinstock)
      if (response.data.quantityinstock);
    })
    // //setOrder order.productId, order.customerId, order.date
    // //axios attempt to subtract amount from products quantity

    // axios

    //   .post(`${API}/orders`, newOrder)
    //   .then(
    //     () => {
    //       navigate(`/orders`);
    //     },
    //     (error) => console.error(error)
    //   )
    //   .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (event) => {
    setOrder({ ...order, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addOrder(order);
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          value={order.productQty}
          type="number"
          onChange={handleTextChange}
          placeholder="0"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
