import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Customer from "./Customer.jsx";
const API = process.env.REACT_APP_API_URL;

function Customers({ setLogInCustomer }) {
  const [allCustomers, setAllCustomers] = useState([]);

  useEffect(() => {
    async function getAllCustomers() {
      await axios
        .get(`${API}/customers`)
        .then((response) => setAllCustomers(response.data))
        .catch((error) => console.error("Error: GET all", error))
    }
    getAllCustomers();
  }, [])

  return (
    <div>
      <h1>Welcome to the Customers page!</h1>

      <ul>Login As:
        {
          allCustomers.map((customer) => {
            return <Customer key={customer.id} customer={customer} setLogInCustomer={setLogInCustomer} />
          })
        }
        <li>
          <Link to="/customers/new">New Customer</Link>
        </li>
        <li>Guest</li>
      </ul>
    </div>
  )
}

export default Customers;