import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="mb-3 bg-white text-center align-items-center">
      <div>
        <a href="#top" className="m-2">
          <p>Go to the top</p>
        </a>
        <Link to="/about">
          <p>About</p>
        </Link>
      </div>
      <div className="text-muted">
        <p>&copy; Copyright by Pursuit. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer;