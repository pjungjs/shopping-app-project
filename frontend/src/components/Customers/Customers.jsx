import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Customer from "./Customer.jsx";
const API = process.env.REACT_APP_API_URL;

function Customers({ setLoggedInAs }) {
  const [allCustomers, setAllCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllCustomers() {
      await axios
        .get(`${API}/customers`)
        .then((response) => setAllCustomers(response.data))
        .catch((error) => console.error("Error: GET all", error));
    };
    getAllCustomers();
  }, []);

  function handleOnClick() {
    setLoggedInAs({first_name: "Guest"});
    navigate("/products");
  }

  return (
    <div>
      <h1>Welcome to the Customers page!</h1>

      <ul>Login As:
        {
          allCustomers.map((customer) => {
            return <Customer key={customer.id} customer={customer} setLoggedInAs={setLoggedInAs} />
          })
        }
        <li>
          <Link to="/customers/new">
            <button>New Customer</button>
          </Link>
        </li>
        <li><button onClick={() => handleOnClick()}>Guest</button></li>
      </ul>
    </div>
  )
}

export default Customers;