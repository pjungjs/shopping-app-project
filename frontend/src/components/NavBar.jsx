import { Link } from "react-router-dom";

function NavBar({ loggedInAs }) {

  return (
    <nav>
      <Link to="/">
        <h1>Shopping App</h1>
      </Link>
      {
        loggedInAs && (
          <>
            <Link to={`customers/${loggedInAs.id}`}>
              <button>{loggedInAs.first_name}</button>
            </Link>
            <p>cart</p>
          </>
        )
      }
    </nav>
  )
}

export default NavBar;