import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

export default function OrderAddProduct({ productInStock, cart, setCart, loggedInAs, productID }) {

  /*
  {customer1: {product1: 14, product2: 5}, customer2: {product40, 15}}
  */

  /*
  In previous implementation, the form modified cart state specific to customer and product.
  If customer and product does not exist in state, must create.
  Otherwise, initial undefined value causes error.
  However, creating customer-product specific references requires each customer to have
  a line item for every product in database.  3 customers * 50 items = 150.
  State "formQty" is used instead to track value.
  */
  const [formQty, setFormQty] = useState(0);
  const [confirmAddToCart, setConfirmAddToCart] = useState(false);

  //useEffect code for testing.  Do not remove.
  useEffect(() => {
    //console.log("formQty", formQty);
  }, [formQty])

  //useEffect code for testing.  Do not remove.
  // useEffect(() => {
  //   console.log("OAPcart", cart);
  // }, [cart])

  const handleTextChange = (event) => {
    const htcValue = event.target.value;
    setFormQty((htcValue !== "") ? Number(htcValue) : 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("OAP handleSubmit triggered");
    if (formQty <= productInStock) {
      setCart({ ...cart, [`customer${loggedInAs.id}`]: { ...cart[`customer${loggedInAs.id}`], [`product${productID}`]: Number(formQty) } });
      setConfirmAddToCart(true);
      // console.log("OAPCart orderqty <= instock", cart)
    } else {
      setCart({ ...cart, [`customer${loggedInAs.id}`]: { ...cart[`customer${loggedInAs.id}`], [`product${productID}`]: Number(productInStock) } });
      setConfirmAddToCart(true);
      alert(`Sorry, only ${productInStock} of ${event.target.quantity} item(s) in stock.  Your order has been updated to the maximum available quantity.`)
      // console.log("OAPCart orderqty > instock", cart)
    }
    setFormQty(0);
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          value={formQty === 0 ? "" : formQty}
          type="number"
          onChange={handleTextChange}
          placeholder="0"
        />
        <br />
        <input type="submit" value="Add To Cart"/>
      </form>
      <div>
        {confirmAddToCart ? "Order added to cart" : ""}
      </div>
      {/* <div>
        <Link to={`/products`}>
          <button>Return to Products</button>
        </Link>
      </div> */}
    </div>
  );
}
