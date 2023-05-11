import { Link } from "react-router-dom";

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
        </>
      )}
    </nav>
  )
}

export default NavBar;