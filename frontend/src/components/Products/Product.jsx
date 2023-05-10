import { useParams } from "react-router-dom";
import OrderAddProduct from "../Orders/OrderAddProduct.jsx";

export default function Product({ product, cart, setCart, loggedInAs }) {
    const { id } = useParams();

    return (
        <div className="Product">
            <h4>{product.name}</h4>
            <h5>{product.description}</h5>
            <img src={require(`${product.image_url}`)} alt={`${product.description}`}></img>
            <p>${product.price} per</p>
            <p>Quantity in stock:  {product.quantity_in_stock}</p>
            <p>Rarity: {product.card_rarity}</p>
            <p>Card ID:  {product.card_id}</p>
            <p>UPC:  {product.product_upc}</p>
            <OrderAddProduct
                productID={id}
                productInStock={product.quantity_in_stock}
                cart={cart}
                setCart={setCart}
                loggedInAs={loggedInAs} 
                />
        </div>
    )
}