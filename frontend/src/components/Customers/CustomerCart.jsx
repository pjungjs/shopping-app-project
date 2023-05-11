import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function CustomerCart({ loggedInAs, cart, setCart }) {
  const [customerOrder, setCustomerOrder] = useState({});
  const navigate = useNavigate();

  async function updateCustomerOrder() {
    await axios
      .put(`${API}/customers/${id}`, editCustomer)
      .then((response) => {
        setEditCustomer(response.data);
        navigate(`/customers`);
      })
      .catch((error) => console.warn("Error: PUT", error))
  }

console.log(customerOrder)

  return (
    <>
      <h1>{loggedInAs.first_name}'s Cart</h1>

    </>
  )
}

export default CustomerCart;