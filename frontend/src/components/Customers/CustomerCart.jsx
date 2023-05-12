import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCustomerCart from "../Products/ProductCustomerCart.jsx";

const API = process.env.REACT_APP_API_URL;

export default function CustomerCart({ loggedInAs, setCart, customerCart = {} }) {

  const [editProduct, setEditProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const itemIDArray = Object.keys(customerCart).map(lineItemOnOrder => Number(lineItemOnOrder.replace("product", "")));

  /*
  return products
  */
  useEffect(() => {
    axios.get(`${API}/products`)
      .then((response) => {
        setFilteredProducts(response.data.filter(product => itemIDArray.includes(product.id)))
        console.log("filtered", response.data.filter(product => itemIDArray.includes(product.id)))
      })
      .catch((e) => console.warn("catch", e));
  }, [])

  const navigate = useNavigate();

  const gimmeSpace = (spaces) => {
    return "\u00A0".repeat(spaces)
  }

  const delayedOutput = async (productID) => {
    return filteredProducts.find(product => product.id === productID).description;
  }

  const listCartItems = () => {
    if (Object.keys(customerCart).length === 0) {
      return (
        <div>No items in cart</div>
      )
    } else {
      return (
        <div>
          {itemIDArray.map((productID) => {
            return (
              <div key={productID}>{`${JSON.stringify(filteredProducts)}`}</div>
              // <ProductCustomerCart
              //   key={productID}
              //   productID={productID}
              //   filteredProducts={filteredProducts}
              //   customerCart={customerCart}

              // />
            )
            // return (
            //   <div key={productID}>
            //     <span> Item ID: {productID}</span>
            //     {gimmeSpace(5)}
            //     <span>Product Description: {`ham, ${delayedOutput(productID)}`}</span>
            //     {gimmeSpace(5)}
            //     <span>Qty Ordered: {customerCart[`product${productID}`]}</span>
            //     {gimmeSpace(5)}
            //   </div>
            // )
          })
          }
        </div>
      )
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