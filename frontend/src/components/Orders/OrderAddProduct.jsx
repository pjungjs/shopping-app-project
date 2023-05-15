import { useState } from "react";

export default function OrderAddProduct({ cart, setCart, loggedInAs, productCardId, productInStock }) {
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [finalOrderQuantity, setFinalOrderQuantity] = useState(0);
  const [confirmAddToCart, setConfirmAddToCart] = useState(false);
  
  const handleNumberChange = (event) => {
    setOrderQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    if (orderQuantity <= 0) {
      setOrderQuantity(0);
      return alert("Quantity must be above 0. Please try again");
    } else if (orderQuantity <= productInStock) {
      setCart({ ...cart, [loggedInAs.first_name]: {...cart[loggedInAs.first_name], [productCardId]: orderQuantity } });
    } else {
      setCart({ ...cart, [loggedInAs.first_name]: {...cart[loggedInAs.first_name], [productCardId]: productInStock } });
      alert(`Sorry, only ${productInStock} of ${orderQuantity} item(s) in stock.  Your order has been updated to the maximum available quantity.`)
    }
    setConfirmAddToCart(true);
    setFinalOrderQuantity(orderQuantity <= productInStock ? orderQuantity : productInStock);
    setOrderQuantity(0);
  };

  return (
    <>
      {
        loggedInAs.first_name === "Guest" || loggedInAs.first_name === "Retailer" ? (
          ""
        ) : (
          <div className="New">
            <input
              id="quantity"
              type="number"
              value={orderQuantity === 0 ? "" : orderQuantity}
              placeholder="0"
              onChange={(event) => handleNumberChange(event)}
            />
            <button onClick={() => handleAddToCart()}>Add To Cart</button>
            <div>
              {confirmAddToCart ? `${finalOrderQuantity} order(s) added to the Cart!` : ""}
            </div>
          </div>
        )
      }
    </>
  );
}