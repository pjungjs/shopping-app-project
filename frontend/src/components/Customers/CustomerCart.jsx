import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
const API = process.env.REACT_APP_API_URL;

export default function CustomerCart({ loggedInAs, cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      await axios
        .get(`${API}/products`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.warn("catch", error))
    };
    getProducts();
  }, [])

  async function updateEachProduct(product) {
    await axios
      .put(`${API}/products/${product.id}`, {
        ...product,
        quantity_in_stock: Number(product.quantity_in_stock - cart[loggedInAs.first_name][product.card_id])
      })
      .then(() => {
        console.log("update each product successful");
        createOrders(product);
      })
      .catch((error) => console.warn("catch", error))
  };

  async function createOrders(product) {
    const date = new Date();
    const formattedDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    
    await axios
      .post(`${API}/orders`, {
        product_id:  Number(product.id),
        customer_id: Number(loggedInAs.id),
        product_qty: Number(cart[loggedInAs.first_name][product.card_id]),
        date: formattedDate
      })
      .then(() => console.log("create order successful"))
      .catch((error) => console.warn("catch", error))
  };

  const filterProducts = () => {
    return products.filter(product => Object.keys(cart[loggedInAs.first_name]).includes(product.card_id));
  }

  const formatPrice = (price) => {
    const usDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return usDollar.format(price);
  }

  const handleCheckout = () => {
    filterProducts().forEach((product) => updateEachProduct(product));
    alert("Your Purchase was successful! Please come again!");
    navigate("/products");
  }

  return (
    <div>
      <h1>
        {loggedInAs.first_name}'s Cart
      </h1>
      {
        Object.keys(cart).length === 0
        ? (
          <>
            <p>No items in cart</p>
            <button onClick={() => navigate("/products")}>Back to Products</button>
          </>
        ) : (
          <>
            <Table striped>
              <tbody>
                {filterProducts().map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>
                        <img src={require(`../Products${(product.image_url).replace(".", "")}`)} alt={`${product.description}`} style={{ "width": "100px" }}></img>
                      </td>
                      <td>
                        {product.name}
                      </td>
                      <td>
                        Quantity Ordered: {cart[loggedInAs.first_name][product.card_id]}
                      </td>
                      <td>
                        {formatPrice(product.price)}
                      </td>
                    </tr>
                  )
                })
                }
              </tbody>
            </Table>
            <h3>Total Price: {formatPrice(totalPrice)}</h3>
            <button onClick={() => handleCheckout()}>Checkout</button>
          </>
        )
      }
    </div>
  )









  // const [filteredProducts, setFilteredProducts] = useState([]);
  // const itemIDArray = Object.keys(customerCart).map(lineItemOnOrder => Number(lineItemOnOrder.replace("product", "")));

  // useEffect(() => {
  //   axios
  //     .get(`${API}/products`)
  //     .then((response) => setFilteredProducts(response.data.filter(product => itemIDArray.includes(product.id))))
  //     .catch((error) => console.warn("catch", error));
  // }, [])

  // const listCartItems = () => {
  //   if (Object.keys(customerCart).length === 0) {
  //     return (
  //       <div>No items in cart</div>
  //     )
  //   } else {
  //     return (
  //       <table>
  //         <tbody>
  //           {filteredProducts.map((product) => {
  //             return (
  //               <tr key={product.id}>
  //                 <td>
  //                   <img src={require(`../Products${(product.image_url).replace(".", "")}`)} alt={`${product.description}`} style={{ "width": "50px" }}></img>
  //                 </td>
  //                 <td>
  //                   {product.name}
  //                 </td>
  //                 <td>
  //                   Quantity Ordered: {customerCart[`product${product.id}`]}
  //                 </td>
  //               </tr>
  //             )
  //           })
  //           }
  //         </tbody>
  //       </table>
  //     )
  //   }
  // }


  // const deepCopyObject = (objectToDuplicate) => {
  //   const returnObject = {};
  //   for (const key in objectToDuplicate) {
  //     if (typeof objectToDuplicate[key] === 'object' && objectToDuplicate[key] !== null) {
  //       returnObject[key] = deepCopyObject(objectToDuplicate[key]);
  //     } else {
  //       returnObject[key] = objectToDuplicate[key];
  //     }
  //   }
  //   return returnObject;
  // }

  // const handleCheckout = () => {
  //   filteredProducts.forEach((product) => {
  //     axios
  //       .put(`${API}/products/${product.id}`, { ...product, quantity_in_stock: Number(product.quantity_in_stock - customerCart[`product${product.id}`]) })
  //       .then(() => {
  //         console.log("Product put attempted.");
  //         var date = new Date();

  //         axios
  //           .post(`${API}/orders`, {
  //             product_id:  Number(product.id),
  //             customer_id: Number(loggedInAs.id),
  //             product_qty: Number(customerCart[`product${product.id}`]),
  //             date:
  //             date.toLocaleString("default", {year: "numeric" })
  //             +"-"
  //             +date.toLocaleString("default", {month: "2-digit"})
  //             +"-"
  //             +date.toLocaleString("default", {day: "2-digit"})
  //           })
  //           .then(() => {
  //             const tempCart = deepCopyObject(cart);
  //             delete tempCart[`customer${loggedInAs.id}`][`product${product.id}`];
  //             setCart(tempCart);

  //           },
  //             (error) => console.error(`Axios handleCheckout product ${product.id} add order`, error)
  //           )
  //           .catch((c) => console.warn(`catch handleCheckout product ${product.id} add order`, c));

  //       },
  //         (error) => console.error(`Axios handleCheckout error on ${product.id} edit product`, error)
  //       )
  //       .catch((c) => console.warn(`catch handleCheckout product ${product.id} edit product`, c));
  //   })
  // }


  // return (
  //   <div>
  //     <h1>
  //       {loggedInAs.first_name}'s Cart
  //     </h1>
  //     {listCartItems()}
  //     <button onClick={handleCheckout}>Checkout</button>
  //   </div>
  // )
}