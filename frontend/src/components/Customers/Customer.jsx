import { useNavigate } from "react-router-dom";

function Customer({ customer, setLogInCustomer }) {
  const navigate = useNavigate();

  function handleOnClick() {
    setLogInCustomer(customer.firstname);
    navigate("/products");
  }

  return (
    <>
      <li>
        <button onClick={() => handleOnClick()}>{customer.firstname}</button>
      </li>
    </>
  )
}

export default Customer;