import { Link } from "react-router-dom";

function NavBar({ logInCustomer }) {
  
  return (
    <nav>
      <Link to="/">
        <h1>Shopping App</h1>
      </Link>

      {
        logInCustomer && (
          <>
            {logInCustomer}
            <p>cart</p>
          </>
        )
      }
    </nav>
  )
}

export default NavBar;