import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderAddProduct from "../Orders/OrderAddProduct.jsx";
const API = process.env.REACT_APP_API_URL;

export default function Product({ cart, setCart, loggedInAs }) {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${API}/products/${id}`)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
            }).catch((e) => {
                console.warn("catch", e);
            })
            //Note:  "API" used as dependency in class.  Removing per Lint error.
    }, [id]);

    return (
        <div className="Product">
            <h4>{product.name}</h4>
            <h5>{product.description}</h5>
            <img src={product.image_url} alt={`${product.description}`}></img>
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