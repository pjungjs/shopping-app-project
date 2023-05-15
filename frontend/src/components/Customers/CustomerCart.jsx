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
      .then(() => {
        console.log("create order successful")
      })
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

  const handleRemove = (card_id) => {
    const removeProduct = card_id;
    const { [removeProduct]: removedProduct, ...remainingProduct } = cart[loggedInAs.first_name];
    setCart({ ...cart, [loggedInAs.first_name]: remainingProduct})

    if (!Object.keys(cart[loggedInAs.first_name]).length) {
      setCart({ ...cart, [loggedInAs.first_name]: {}});
    }
  }

  const handleCheckout = () => {
    filterProducts().forEach((product) => updateEachProduct(product));
    setCart({ ...cart, [loggedInAs.first_name]: {}})
    alert("Your Purchase was successful! Please come again!");
    navigate("/products");
  }

  return (
    <div>
      <h1>
        {loggedInAs.first_name}'s Cart
      </h1>
      {
        !Object.keys(cart).length || !Object.keys(cart[loggedInAs.first_name]).length
        ? (
          <>
            <p>No items in cart</p>
            <button onClick={() => navigate("/products")}>Back to Products</button>
          </>
        ) : (
          <>
            <Table striped>
              <tbody>
                {
                  filterProducts().map((product) => {
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
                        <td>
                          <button onClick={() => handleRemove(product.card_id)}>Remove</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            {/* <h3>Total Price: {totalPrice}</h3> */}
            <button onClick={() => handleCheckout()}>Checkout</button>
          </>
        )
      }
    </div>
  )
}