// import { useState } from "react";

export default function Product({ product, cart, setCart, loggedInAs }) {
  //  const [orderQuantity, setOrderQuantity] = useState("");

  // function handleNumberChange(event) {
  //   setOrderQuantity(event.target.value);
  // }

  // function handleBuyButton() {
  //   const orderNum = Number(orderQuantity);
  //   const inStock = product.quantity_in_stock;

  //   if (orderNum === 0) {
  //     alert("If you wish to buy, the quantity must be above 0.");
  //   } else if (orderNum < inStock) {
  //     setCart([...cart, [orderNum, product]]);
  //   } else if (orderNum > inStock) {
  //     alert(`Sorry, only ${inStock} of ${orderNum} item(s) in stock. Your order has been updated to the maximum available quantity.`);
  //     setOrderQuantity(inStock);
  //     setCart([...cart, [inStock, product]]);
  //   } else {
  //     alert("Something went wrong! Try again later.");
  //   }
  // }

  return (
    <div className="Product">
      <h4>{product.name}</h4>
      <h5>{product.description}</h5>
      <img src={require(`${product.image_url}`)} alt={`${product.description}`} style={{"width": "200px"}}></img>
      <p>${product.price} per</p>
      <p>Quantity in stock:  {product.quantity_in_stock}</p>
      <p>Rarity: {product.card_rarity}</p>
      <p>Card ID:  {product.card_id}</p>
      <p>UPC:  {product.product_upc}</p>
      {/*       
      <input
        id="quantity"
        type="number"
        value={orderQuantity}
        onChange={(event) => handleNumberChange(event)}
      />
      <button onClick={() => handleBuyButton()}>Buy</button> */}
    </div>
  )
}