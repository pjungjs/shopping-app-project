import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the Home page!</h1>

      <h3>Are you:</h3>
      <Link to="/customers">
        <button>Customer</button>
      </Link>
      <Link to="/retailer/products">
        <button>Retailer</button>
      </Link>
    </div>
  )
}

export default Home;