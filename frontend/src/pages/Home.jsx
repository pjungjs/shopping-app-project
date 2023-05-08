import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the Home page!</h1>
      <Link to="/products">
        <button>View all the Products!</button>
      </Link>
      <Link to="/customers">
        <button>View all the Customers!</button>
      </Link>
    </div>
  )
}

export default Home;