import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <a href="#top">
        <p>Go to the top</p>
      </a>
      <Link to="/about">
        <p>About</p>
      </Link>
    </>
  )
}

export default Footer;