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

import { useNavigate } from "react-router-dom";

export default function OrderAddProduct({productInStock, cart, setCart, logInCustomer}) {
  let navigate = useNavigate();

  const [order, setOrder] = useState({
    productId: "",
    customerId: "",
    productQty: "",
    date: ""
  });

  const addOrder = (qty) => {
    if (qty > productInStock) {

    }
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
    addOrder(event.target.quantity);
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
