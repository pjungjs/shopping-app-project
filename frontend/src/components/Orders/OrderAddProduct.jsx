import { Link } from "react-router-dom";

export default function OrderAddProduct({productInStock, cart, setCart, loggedInAs, productID=0}) {

  const [order, setOrder] = useState({
    productId: "",
    customerId: "",
    productQty: "",
    date: ""
  });

  const addLineItemToCart = (qty) => {
    if (qty > productInStock) {
      setCart([...cart, {[`cart${id}`]: qty}]);
    } else {

    }
  };

  const handleTextChange = (event) => {
    setOrder({ ...order, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addLineItemToCart(event.target.quantity);
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
          placeholder={productID}
        />
        <br />
        <input type="submit" />
      </form>
      <div>
        <Link to={`/products`}>
          <button>Return to Products</button>
        </Link>
      </div>
    </div>
  );
}
