
import { Card } from  "react-bootstrap";
import OrderAddProduct from "../Orders/OrderAddProduct.jsx";


export default function Product({ cart, setCart, product, loggedInAs }) {

  return (

    <div>
      <Card className="d-flex align-items-center h-100">
        <Card.Img
          alt={product.description}
          src={require(`${product.image_url}`)}
          variant="top"
          style={{ objectFit: "cover", width: "200px" }}
          className="mt-3"
        />
        <Card.Body>
          <Card.Title className="text-center">
            <h4>{product.name}</h4>
            <h5>{product.description}</h5>
            <p>${product.price} per</p>
            <p>Quantity in stock:  {product.quantity_in_stock}</p>
            <p>Rarity: {product.card_rarity}</p>
            <p>Card ID:  {product.card_id}</p>
            {/* <p>UPC:  {product.product_upc}</p> */}
            <OrderAddProduct
              key={product.id}
              cart={cart}
              setCart={setCart}
              loggedInAs={loggedInAs}
              productCardId={product.card_id}
              productInStock={product.quantity_in_stock}
            />
          </Card.Title>
        </Card.Body>
      </Card>

    </div>
  )
}