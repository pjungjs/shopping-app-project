import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const API = process.env.REACT_APP_API_URL

export default function RetailerShowProduct() {
    const [product, setProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${API}/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            }).catch((e) => {
                console.warn("catch", e);
            })
    }, [id]);

    return (
        <div>
            <h4>{product.name}</h4>
            <h5>{product.description}</h5>
            <img src={require(`${product.image_url}`)} alt={`${product.description}`} style={{ "width": "1200px" }}></img>
            <p>${product.price} per</p>
            <p>Quantity in stock:  {product.quantity_in_stock}</p>
            <p>Card ID:  {product.card_id}</p>
            <p>Rarity: {product.card_rarity}</p>
            <p>UPC:  {product.product_upc}</p>
            <Link to={`/retailer/products/${product.id}/edit`}>
                <button>Edit</button>
            </Link>
        </div >
    )
}