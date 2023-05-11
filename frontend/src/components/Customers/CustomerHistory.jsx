import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function CustomerHistory({ loggedInAs }) {
  const [customerHistory, setCustomerHistory] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getById() {
      await axios
        .get(`${API}/orders/${loggedInAs.id}`)
        .then((response) => setCustomerHistory(response.data))
        .catch((error) => console.error("Error: GET", error));
    };
    getById();
  }, [loggedInAs]);

  useEffect(() => {
    async function getProducts() {
      await axios
        .get(`${API}/products`)
        .then((response) => setAllProducts(response.data))
        .catch((error) => console.error("Error: GET", error));
    };
    getProducts();
  }, [customerHistory]);

  function showHistory(history, boughtProduct) {
    const { product_id, product_qty, date } = history;
    // let { name, image_url, price, card_id, quantity_in_stock } = boughtProduct;
    const imagePath = boughtProduct.image_url.slice(2);

    return (
      <>
        <img src={require(`../Products/${imagePath}`)} alt="card image" style={{"width": "100px"}}/>
        <p>{date}</p>
        <p>{boughtProduct.name}</p>
        <p>{product_qty} * ${boughtProduct.price} = ${(product_qty*boughtProduct.price).toFixed(2)}</p>
      </>
    )
  }

  return (
    <>
      {loggedInAs.first_name &&
        <h1>{loggedInAs.first_name}'s Purchase History</h1>
      }
      {
        customerHistory.length === 0
        ? "No Record Found."
        : (
          <ol>
            {customerHistory.map((history) => {
              const boughtProduct = allProducts.find((product) => product.id === history.product_id)
              if (boughtProduct) {
                return (
                  <li key={history.id}>
                    {showHistory(history, boughtProduct)}
                  </li>
                )
              }
            })}
          </ol>
        )
      }
    </>
  )
}

export default CustomerHistory;