import { useState } from "react";
import { Link } from "react-router-dom";

export default function OrderAddProduct({productInStock, cart, setCart, loggedInAs, productID=0}) {

  const cartString=`cart${productID}`;

  const [order, setOrder] = useState({
    cartString: "",
    productQty: "",
  });

  const addLineItemToCart = (event) => {
    if (event.target.quantity > productInStock) {
      setCart([...cart, {cartString: event.target.quantity}]);
    } else {
      event.target.quantity = productInStock;
      alert (`Sorry, only ${productInStock} of ${event.target.quantity} were in stock.  Your order has been updated to the maximum available quantity.`)
    }
  };

  const handleTextChange = (event) => {
    const tempCartString = `cart${event.target.id}`
    setOrder({ ...order, tempCartString: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addLineItemToCart(event);
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
