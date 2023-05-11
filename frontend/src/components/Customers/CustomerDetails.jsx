import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function CustomerDetails() {
  const [theCustomer, setTheCustomer] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    first_name,
    last_name,
    email,
    phone,
    address_street,
    address_street2,
    address_city,
    address_state,
    address_postal_code,
    payment_info
  } = theCustomer;
  const fullAddress = `${address_street}${address_street2 ? " " + address_street2 : ""}, ${address_city}, ${address_state} ${address_postal_code}`;

  useEffect(() => {
    async function getCustomersById() {
      await axios
        .get(`${API}/customers/${id}`)
        .then(response => setTheCustomer(response.data))
        .catch(error => console.error("Error: GET", error))
    };

    getCustomersById();
  }, [id]);

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this Account?")) {
      await axios
        .delete(`${API}/customers/${id}`)
        .then(() => navigate('/customers'))
        .catch(error => console.error("Error: DELETE", error));
    }
  };

  return (
    <div className="Customer-Details">
      <div>
        <h2>{first_name} {last_name}</h2>
        <p>{phone}</p>
        <p>{email}</p>
        <p>{fullAddress}</p>
        <p>{payment_info}</p>
      </div>
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <Link to={`/customers/${id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => handleDelete()} style={{"color": "red"}}>Delete</button>
        <Link to={`/customers/${id}/history`}>
          <button>Purchase History</button>
        </Link>
      </div>
    </div>
  );
}

export default CustomerDetails;