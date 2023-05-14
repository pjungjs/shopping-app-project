import { Link } from "react-router-dom";
import { gimmeSpace } from "../utilities/utilityFunctions";

function NavBar({ loggedInAs }) {

  return (
    <nav>
      <Link to="/">
        <h1>Shopping App</h1>
      </Link>
      {loggedInAs.first_name && (
        <>
          <p>Welcome
            {" "}
            <Link to={`customers/${loggedInAs.id}`}>
              {loggedInAs.first_name}
            </Link>
            !
          </p>
          <Link to={`customers/${loggedInAs.id}/cart`}>
            Cart
          </Link>
          {gimmeSpace(5)}
          <Link to={`retailer/products/new`}>
            Enter New Product
          </Link>
        </>
      )}
    </nav>
  )
}

export default NavBar;