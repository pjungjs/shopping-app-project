import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

export default function CustomerCart({ loggedInAs, setCart, customerCart = {} }) {
  console.log("CCartKeys", Object.keys(customerCart))
  console.log("CCart", customerCart); 
  console.log("truthy?", !!(Object.keys(customerCart) === 0))

  const [editProduct, setEditProduct] = useState([]);
  // const [editOrder, setEditOrder] = useState([]);
  const navigate = useNavigate();

  const listCartItems = () => {
    if ((Object.keys(customerCart) === 0)) {
      return `No items in cart`
    } else {
      return ("it's a secret")
    }
  }
  return (
    <div>
      <h1>
      {loggedInAs.first_name}'s cart
      </h1>
      {listCartItems()}
    </div>
  )

  // async function updateProduct() {
  //   await axios
  //     .put(`${API}/products/${id}`, editProduct)
  //     .then((response) => setEditProduct(response.data))
  //     .catch((error) => console.warn("Error: PUT", error))
  // }

  // async function updateOrder() {
  //   await axios
  //     .put(`${API}/customers/${id}`, editOrder)
  //     .then((response) => setEditOrder(response.data))
  //     .catch((error) => console.warn("Error: PUT", error))
  // }

  // function handleCheckoutButton() {

  //   let totalAmount = 0;
  //   cart.forEach((order) => {
  //     //order[0] is the quantity
  //     //order[1] is the product object

  //     //to calculate quantity * product price
  //     totalAmount += Number(order[0]) * Number(order[1].price);

  //     //since it could be multiple item on the cart,
  //     //must update all of them on the database row.
  //     setEditProduct([...editProduct,
  //       {
  //         name: order[1].name,
  //         description: order[1].description,
  //         image_url: order[1].image_url,
  //         price: order[1].price,
  //         quantity_in_stock: order[1].quantity_in_stock - order[0],
  //         card_id: order[1].card_id,
  //         card_rarity: order[1].card_rarity,
  //         product_upc: order[1].product_upc
  //       }
  //     ])
  //     setEditOrder([...editOrder,
  //       {
  //         product_id: order[1].id,
  //         customer_id: loggedInAs.id,
  //         product_qty: order[0].product_qty,
  //         date: new Date()
  //       }
  //     ])
  //   })

  //   if (window.confirm(`Purchase total amount of $${totalAmount.toFixed(2)}?`)) {
  //     //after user confirming the purchase
  //     //it will loop through all the items updated from the cart and update it to the database
  //     //since the amount of edited products = orders, I set up only one loop.
  //     editProduct.forEach((product) => {
  //       updateProduct();
  //       updateOrder();
  //     })
  //     navigate(`/products`);
  //   }
  // }

  // return (
  //   <>
  //     {loggedInAs.first_name &&
  //       <h1>{loggedInAs.first_name}'s Cart</h1>
  //     }
  //     {
  //       cart.lengh === 0
  //       ? ""
  //       : (
  //         <>
  //         {/* need to fix this */}
  //           {cart.map((item) => <li key={item.id}>{item.name} - ${item.price}</li>)}
  //         </>
  //       )
  //     }

  //     <button onClick={() => {
  //       // setCart({});
  //       navigate(`/products`);
  //     }}>
  //       Empty my Cart
  //     </button>
  //     <button onClick={() => handleCheckoutButton()}>Checkout</button>
  //   </>
  // )
}