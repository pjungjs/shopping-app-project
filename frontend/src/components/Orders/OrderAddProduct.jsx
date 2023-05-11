import { Link } from "react-router-dom";

export default function OrderAddProduct({productInStock, cart, setCart, loggedInAs, productID=0}) {

  const handleTextChange = (event) => {
    updateCart({ ...cart, [`cart${event.target.id}`]: event.target.value });
    setCart({ ...cart, [`cart${event.target.id}`]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.quantity > productInStock) {
      updateCart({...cart, [`cart${productID}`]: event.target.quantity});
      setCart({...cart, [`cart${productID}`]: event.target.quantity});
    } else {
      event.target.quantity = productInStock;
      alert (`Sorry, only ${productInStock} of ${event.target.quantity} item(s) in stock.  Your order has been updated to the maximum available quantity.`)
    }
  };

  return (
    <div className="New">
      <form onSubmit={() => handleSubmit}>
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          value=""
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
