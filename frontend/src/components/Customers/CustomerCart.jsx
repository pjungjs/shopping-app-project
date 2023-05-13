/*
"FIX" - search term for flagged code
*/

import axios from "axios";
import { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL;
const {
  deepCopyObject
} = require("../../utilities/utilityFunctions.js");

export default function CustomerCart({ loggedInAs, cart, setCart, customerCart = {} }) {

  /*
  cart sample: {customer1: {product1: 14, product2: 5}, customer2: {product40, 15}}
  customerCart sample: {product1: 5, product2: 12}
  itemIDArray sample: [1, 2]
  customerCart[`product${X}`] returns quantity ordered of product X.
  */

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemIDArray, setItemIDArray] = useState([]);

  useEffect(() => {
    setItemIDArray(Object.keys(customerCart).map(lineItemOnOrder => Number(lineItemOnOrder.replace("product", ""))))
  }, [customerCart])

  useEffect(() => {
    axios.get(`${API}/products`)
      .then((response) => {
        console.log("Looping");
        const filteredList = response.data.filter(product => itemIDArray.includes(product.id))
        setFilteredProducts(filteredList);
      })
      .catch((e) => console.warn("catch", e));
  }, [itemIDArray]);

  // useEffect bug track
  useEffect(() => {
    console.log("CCUEBug cart", cart)
  }, [cart])

  // Calling function allows control statements.  Only ternary expressions may be called from normal component return.
  // Prevents hanging "null" references.
  /*
  Will deep copy objects inside objects, as in cart state.
  If there are arrays inside objects, this will make funny results, so don't do it.
  */

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
              console.log("listCartItems filteredProducts");
              return (
                <tr key={`listCartItems${product.id}`}>
                  <td>
                    <img src={require(`../Products${(product.image_url).replace(".", "")}`)} alt={`${product.description}`} style={{ "width": "50px" }}></img>
                  </td>
                  <td>
                    {product.name}
                  </td>
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
  //listCartItems
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

    FIX:  What happens, exactly, when customer1:{}? 
    FIX:  handleCheckout only operates one item at a time.  Possibly re-render.
  */

  const handleCheckout = async () => {
    try {
      // promises is array of async
      const promises = filteredProducts.map(async (product) => {
        console.log(`handleCheckout put, item ${product.id}`);
        await axios.put(`${API}/products/${product.id}`,
          {
            ...product,
            quantity_in_stock: Number(product.quantity_in_stock - customerCart[`product${product.id}`]),
          })
        // put

        const date = new Date();

        await axios.post(`${API}/orders`,
          {
            product_id: Number(product.id),
            customer_id: Number(loggedInAs.id),
            product_qty: Number(customerCart[`product${product.id}`]),
            date:
            date.toLocaleString("default", { year: "numeric" })
            + "-"
            + date.toLocaleString("default", { month: "2-digit" })
            + "-"
            + date.toLocaleString("default", { day: "2-digit" }),
          });
        // axios post

        const tempCart = deepCopyObject(cart);
        delete tempCart[`customer${loggedInAs.id}`][`product${product.id}`];
        setCart(tempCart);
      });
      // promises

      // wait until all promises performed with Promise.all
      await Promise.all(promises);
      console.log("All items processed OK.")
    } catch (error) {
      console.error("handleCheckout error", error)
    }
  };
  // handleCheckout

  /*
  FIX: Do we want to edit cart?  delete cart?  delete entire cart?  Confirm quantities a second time?
  //Regardless, first functionality is checkout, and state-based changes *should* not trigger infinite re-render
  */
  return (
    <div>
      <h1>
        {loggedInAs.first_name}'s Cart
      </h1>
      {listCartItems()}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

/*

legacy handleCheckout (pre Promise all)
const handleCheckout = async () => {
    filteredProducts.forEach((product) => {
      console.log("handleCheckout filteredProducts");
      axios
        .put(`${API}/products/${product.id}`, { ...product, quantity_in_stock: Number(product.quantity_in_stock - customerCart[`product${product.id}`]) })
        // end put
        .then(() => {
          console.log("Product put attempted.");
          var date = new Date();
          //inner axios start
          axios
            .post(`${API}/orders`, {
              product_id: Number(product.id),
              customer_id: Number(loggedInAs.id),
              product_qty: Number(customerCart[`product${product.id}`]),
              date:
                date.toLocaleString("default", { year: "numeric" })
                + "-"
                + date.toLocaleString("default", { month: "2-digit" })
                + "-"
                + date.toLocaleString("default", { day: "2-digit" })
            })
            .then(() => {
              // edit state start
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
    // forEach
  }
*/

/*
  start original itemIDArray implementation

  useEffect(() => {
    axios.get(`${API}/products`)
      .then((response) => {
        // FIX:  Infinite render loop.  Removing itemIDArray from dependency seems to stop loop, but
        // then lint error triggers.  Probably just need to look to see how itemIDArray is modified within
        // the useEffect.
        console.log("Looping");
        // Setting data equal to const fail resolve trigger.
        const filteredList = response.data.filter(product => itemIDArray.includes(product.id))
        setFilteredProducts(filteredList);
        //setHamster(filteredList);
        //console.log("filtered", response.data.filter(product => itemIDArray.includes(product.id)))
      })
      .catch((e) => console.warn("catch", e));
    //setHamster successfully avoids infinite re-render.
    // console.log(hamster);
  }, [])

  const itemIDArray = Object.keys(customerCart).map(lineItemOnOrder => Number(lineItemOnOrder.replace("product", "")));


  // End original itemIDArray implementation
*/

/*
Legacy Jinseok code
*/

  //const navigate = useNavigate();
  // const [editProduct, setEditProduct] = useState([]);
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