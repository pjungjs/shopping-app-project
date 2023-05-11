import { Link } from "react-router-dom";

export default function OrderAddProduct({ productInStock, cart, setCart, loggedInAs, productID }) {

  /*
  Changed App.js to specify default loggedInAs.id="Guest".  Below error handling no longer needed.
  {customerGuest: {product0: n}}
  */
  // if (!loggedInAs.id) {
  //   const loggedInAs = { id: "Guest" };
  // }
  // if (!productID) {
  //   const productID = "0";
  // }
  //console.log("OAP", loggedInAs.id);

  /*
  {customer1: {product1: 14, product2: 5}, customer2: {product40, 15}}
  */

  const handleTextChange = (event) => {  
    setCart({ ...cart, [`customer${loggedInAs.id}`]: {...cart[`customer${loggedInAs.id}`], [`product${productID}`]: Number(event.target.value)} });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.quantity <= productInStock) {
      // Does nothing, as setCart already in handleTextChange.  By the time submitted, already done.
      console.log("OAPCart orderqty <= instock", cart)
    } else {
      setCart({ ...cart, [`customer${loggedInAs.id}`]: {...cart[`customer${loggedInAs.id}`], [`product${productID}`]: Number(productInStock)} });
      event.target.quantity = productInStock;
      alert(`Sorry, only ${productInStock} of ${event.target.quantity} item(s) in stock.  Your order has been updated to the maximum available quantity.`)
      console.log("OAPCart orderqty > instock", cart)
    }
  };

  return (
    <div className="New">
      <form onSubmit={() => handleSubmit}>
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          value={cart[`customer${loggedInAs.id}`][`product${productID}`]}
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
