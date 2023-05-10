import Product from "./Product.jsx";

function Products({ cart, setCart, loggedInAs}) {
  return (
    <div>
      <h1>Welcome to the Products page!</h1>
      <Product cart={cart} setCart={setCart} loggedInAs={loggedInAs}/>
    </div>
  )
}

export default Products;