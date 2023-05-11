import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function EditCustomer({ setLoggedInAs }) {
  const [editCustomer, setEditCustomer] = useState({
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
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getById() {
      await axios
        .get(`${API}/customers/${id}`)
        .then((response) => setEditCustomer(response.data))
        .catch((error) => console.error("Error: GET", error));
    };
    getById();
  }, [id]);

  async function updateCustomer() {
    await axios
      .put(`${API}/customers/${id}`, editCustomer)
      .then((response) => {
        setEditCustomer(response.data);
        navigate(`/customers`);
      })
      .catch((error) => console.warn("Error: PUT", error))
  }

  function handleTextChange(event) {
    setEditCustomer({ ...editCustomer, [event.target.id]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    updateCustomer();
    setLoggedInAs(editCustomer);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Name *</h4>
          <input
            id="first_name"
            type="text"
            value={editCustomer.first_name}
            onChange={handleTextChange}
            required
          />
          <input
            id="last_name"
            type="text"
            value={editCustomer.last_name}
            onChange={handleTextChange}
            required
          />
        </div>
        <div>
          <h4>Email</h4>
          <input
            id="email"
            type="text"
            value={editCustomer.email}
            onChange={handleTextChange}
            required
          />
          <h4>Phone</h4>
          <input
            id="phone"
            type="text"
            value={editCustomer.phone}
            onChange={handleTextChange}
            required
          />
        </div>
        <div>
          <h4>Address</h4>
          <input
            id="address_street"
            type="text"
            value={editCustomer.address_street}
            onChange={handleTextChange}
            required
          />
          <input
            id="address_street2"
            type="text"
            value={
              editCustomer.address_street2 === null
              ? ""
              : editCustomer.address_street2
            }
            onChange={handleTextChange}
          />
          <input
            id="address_city"
            type="text"
            value={editCustomer.address_city}
            onChange={handleTextChange}
            required
          />
          <input
            id="address_state"
            type="text"
            value={editCustomer.address_state}
            onChange={handleTextChange}
            required
          />
          <input
            id="address_postal_code"
            type="text"
            value={editCustomer.address_postal_code}
            onChange={handleTextChange}
            required
          />
        </div>
        <div>
          <label htmlFor="payment_info">Payment Information: </label>
          <input
            id="payment_info"
            type="text"
            value={editCustomer.payment_info}
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

export default EditCustomer;