/*

"FIX" - search term for flagged code

FIX - CustomerHistory redundant alt attribute.

Import cart into customerCart.

schema.sql
price DECIMAL(10,2) NOT NULL,
quantity_in_stock INT NOT NULL,

to

price DECIMAL(10,2) NOT NULL CHECK (price >=0),
quantity_in_stock INT NOT NULL CHECK (quantity >=0),

Delete dummy data "cart"

*/

import axios from "axios";
import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function CustomerCart({ loggedInAs, cart = {}, setCart, customerCart = {} }) {

  // const [editProduct, setEditProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // FIX dummy data
  // {customer1: {product1: 14, product2: 5}, customer2: {product40, 15}}
  cart = { [`customer${loggedInAs.id}`]: customerCart };

  /*
  customerCart sample: {product1: 5, product2: 12}
  itemIDArray sample: [1, 2]
  customerCart[`product${X}`] returns quantity ordered of product X.
  */

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
  }, [itemIDArray])

  //const navigate = useNavigate();

  const spaces = 5;

  const gimmeSpace = (spaces) => {
    return "\u00A0".repeat(spaces)
  }

  // const delayedOutput = async (productID) => {
  //   return filteredProducts.find(product => product.id === productID).description;
  // }

  // Calling function allows control statements.  Only ternary expressions may be called from normal component return.
  // Prevents hanging "null" references.
  const listCartItems = () => {
    // within map, ${JSON.stringify(filteredProducts)} ok
    if (Object.keys(customerCart).length === 0) {
      return (
        <div>No items in cart</div>
      )
    } else {
      return (
        <table>
          <tbody>
            {filteredProducts.map((product) => {
              return (
                <tr key={product.id}>
                  <td>
                    <img src={require(`../Products${(product.image_url).replace(".", "")}`)} alt={`${product.description}`} style={{ "width": "50px" }}></img>
                  </td>
                  <td>
                    {product.name}
                  </td>
                  {gimmeSpace(spaces)}
                  <td>
                    Quantity Ordered: {customerCart[`product${product.id}`]}
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      )
    }
  }

  /*
  Will deep copy objects inside objects, as in cart state.
  If there are arrays inside objects, this will make funny results, so don't do it.
  */
  const deepCopyObject = (objectToDuplicate) => {
    const returnObject = {};
    for (const key in objectToDuplicate) {
      // null is object type in Javascript.
      if (typeof objectToDuplicate[key] === 'object' && objectToDuplicate[key] !== null) {
        returnObject[key] = deepCopyObject(objectToDuplicate[key]);
      } else {
        returnObject[key] = objectToDuplicate[key];
      }
    }
    return returnObject;
  }
  /*
  
  CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(120) NOT NULL,
    image_url VARCHAR(120),
    price DECIMAL(10,2) NOT NULL,
    quantity_in_stock INT NOT NULL,
    card_id VARCHAR(12),
    card_rarity VARCHAR(18),
    product_upc CHAR(12)
  );
  ('Roronoa Zoro', 'Supernovas/Straw Hat Crew', './images/OP01-001.jpg', 7.95, 60, 'OP01-001', 'Leader', 'none'),
  
  
  CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products (id) ON DELETE CASCADE,
    customer_id INT REFERENCES customers (id) ON DELETE CASCADE,
    product_qty INT NOT NULL,
    date DATE NOT NULL
  );
  (1, 1, 5, '2023-05-08'),
  
    Line by line, attempts to modify SQL products.  If successful, add order to SQL and edit state.
    If not successful, returns error.

  Sample cart data
    {customer1: {product1: 14, product2: 5}, customer2: {product40, 15}}

    FIX: Note to self:  Number on operation, perhaps.  Subtraction without setting independent variables to number.  Should force conversion?
    FIX:  No render dependent directly on "cart" state.  Removing item from "cart" state should not trigger re-render
    unless dependent variable?
    FIX:  When checkout complete, render "checkout complete".
    FIX:  Asynchronous removal of multiple product from cart MAY not trigger issue.  .then makes sequential?
    FIX:  What happens, exactly, when customer1:{}? 
  */

  const handleCheckout = async () => {
    filteredProducts.forEach((product) => {
      axios
        .put(`${API}/products/${product.id}`, { ...product, quantity_in_stock: Number(product.quantity_in_stock - customerCart[`product${product.id}`]) })
        .then(() => {
          //inner axios start
          axios
            .put(`${API}/products/${product.id}`, { ...product, quantity_in_stock: Number(product.quantity_in_stock - customerCart[`product${product.id}`]) })
            .then(() => {
              // edit state start
              //temporary variable as removeFromObject.  Spread operator does NOT work correctly
              const tempCart = deepCopyObject(cart);
              delete tempCart[`customer${loggedInAs.id}`][`product${product.id}`];
              setCart(tempCart);
              // edit state end
            },
              (error) => console.error(`Axios handleCheckout product ${product.id} add order`, error)
            )
            .catch((c) => console.warn(`catch handleCheckout product ${product.id} add order`, c));
          // inner axios end
        },
          (error) => console.error(`Axios handleCheckout error on ${product.id} edit product`, error)
        )
        .catch((c) => console.warn(`catch handleCheckout product ${product.id} edit product`, c));


    })
  }

  // Do we want to edit cart?  delete cart?  delete entire cart?  Confirm quantities a second time?
  //Regardless, the first functionality is checkout.
  return (
    <div>
      <h1>
        {loggedInAs.first_name}'s Cart
      </h1>
      {listCartItems()}
      <button onClick={() => handleCheckout}>Checkout</button>
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