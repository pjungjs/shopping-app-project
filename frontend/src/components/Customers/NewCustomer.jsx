import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function NewCustomer() {
  const [newCustomer, setNewCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_street: "",
    address_street2: "",
    address_city: "",
    address_state: "",
    address_postal_code: "",
    payment_info: ""
  });
  const navigate = useNavigate();

  async function createCustomer() {
    await axios
      .post(`${API}/customers`, newCustomer)
      .then(() => navigate("/customers"))
      .catch((error) => console.warn("Error: POST", error))
  }

  function handleTextChange(event) {
    setNewCustomer({ ...newCustomer, [event.target.id]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    createCustomer();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Name *</h4>
          <input
            id="first_name"
            type="text"
            placeholder="First"
            value={newCustomer.first_name}
            onChange={handleTextChange}
            required
          />
          <input
            id="last_name"
            type="text"
            placeholder="Last"
            value={newCustomer.last_name}
            onChange={handleTextChange}
            required
          />
        </div>
        <div>
          <h4>Email</h4>
          <input
            id="email"
            type="text"
            placeholder="email@example.com"
            value={newCustomer.email}
            onChange={handleTextChange}
            required
          />
          <h4>Phone</h4>
          <input
            id="phone"
            type="text"
            placeholder="(123) 456-789"
            value={newCustomer.phone}
            onChange={handleTextChange}
            required
          />
        </div>
        <div>
          <h4>Address</h4>
          <input
            id="address_street"
            type="text"
            placeholder="Address Line 1"
            value={newCustomer.address_street}
            onChange={handleTextChange}
            required
          />
          <input
            id="address_street2"
            type="text"
            placeholder="Address Line 2"
            value={newCustomer.address_street2}
            onChange={handleTextChange}
          />
          <input
            id="address_city"
            type="text"
            placeholder="City"
            value={newCustomer.address_city}
            onChange={handleTextChange}
            required
          />
          <input
            id="address_state"
            type="text"
            placeholder="State"
            value={newCustomer.address_state}
            onChange={handleTextChange}
            required
          />
          <input
            id="address_postal_code"
            type="text"
            placeholder="Postal Code"
            value={newCustomer.address_postal_code}
            onChange={handleTextChange}
            required
          />
        </div>
        <div>
          <label htmlFor="payment_info">Payment Information: </label>
          <input
            id="payment_info"
            type="text"
            placeholder="Visa ending in 0000"
            value={newCustomer.payment_info}
            onChange={handleTextChange}
            required
          />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default NewCustomer;