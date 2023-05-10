import { useNavigate } from "react-router-dom";

function Customer({ customer, setLoggedInAs }) {
  const navigate = useNavigate();

  function handleOnClick() {
    setLoggedInAs(customer);
    navigate("/products");
  }

  return (
    <>
      <li>
        <button onClick={() => handleOnClick()}>{customer.first_name}</button>
      </li>
    </>
  )
}

export default Customer;