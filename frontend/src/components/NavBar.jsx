import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { gimmeSpace } from "../utilities/utilityFunctions";


function NavBar({ loggedInAs, cart }) {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      setCartQuantity(Object.keys(cart[loggedInAs.first_name]).length);
    }
  }, [cart])

  useEffect(() => {
    setCartQuantity(0);
  }, [loggedInAs])

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3 align-items-baseline">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Shopping App
          </Nav.Link>
          <Nav.Link to="/products" as={NavLink}>
            Products
          </Nav.Link>   
        </Nav>
        {
          loggedInAs.first_name === "Guest" ? (
            "Welcome Guest!"
          ) : (
            <>
              <Nav.Link to={`customers/${loggedInAs.id}`} as={NavLink}>
                {loggedInAs.first_name}'s Settings
              </Nav.Link>
              <Nav.Link to={`customers/${loggedInAs.id}/cart`} as={NavLink}>
                <Button
                  style={{ width: "3rem", height: "3rem", position: "relative" }}
                  variant="outline-primary"
                  className="rounded-circle"
                >
                  <AiOutlineShoppingCart />
                  <div
                    className="rounded-circle bg-danger d-flex justify-content-center align-item-center"
                    style={{
                      color: "white",
                      width: "1.5rem",
                      height: "1.5rem",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      transform: "translate(25%, 25%)"
                    }}
                  >
                    {cartQuantity}
                  </div>
                </Button>
              </Nav.Link>
              {gimmeSpace(5)}
              <Nav.Link to={`retailer/products/new`} as={NavLink}>
                Enter New Product
              </Nav.Link>
            </>
          )
        }
      </Container>
    </NavbarBs>
  )
}

export default NavBar;