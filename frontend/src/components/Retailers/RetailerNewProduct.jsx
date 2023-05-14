import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function RetailerNewProduct() {
    let navigate = useNavigate();

    const addProduct = (newProduct) => {
        axios
            .post(`${API}/products`, newProduct)
            .then(
                () => {
                    navigate(`/retailer/products`);
                },
                (error) => console.error(error)
            )
            .catch((c) => console.warn("catch", c));
    };

    const [product, setProduct] = useState({
        name: "",
        description: "",
        image_url: './images/OPplaceholder.jpg',
        price: 0,
        quantity_in_stock: 0,
        card_id: "",
        card_rarity: "",
        product_upc: ""
    });

    const handleTextChange = (event) => {
        setProduct({ ...product, [event.target.id]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addProduct(product);
    };

    return (
        <div className="New">
            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    value={product.name}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Product Name"
                    required
                />
                <label htmlFor="description">Description:</label>
                <input
                    id="description"
                    value={product.description}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Product Description"
                    required
                />
                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    value={product.price}
                    type="number"
                    onChange={handleTextChange}
                    placeholder="Product Price"
                    required
                />
                <label htmlFor="quantity_in_stock">Quantity In Stock:</label>
                <input
                    id="quantity_in_stock"
                    value={product.quantity_in_stock}
                    type="number"
                    onChange={handleTextChange}
                    placeholder="Quantity In Stock"
                    required
                />
                <label htmlFor="card_id">Card ID:</label>
                <input
                    id="card_id"
                    value={product.card_id}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Card ID"
                    required
                />
                <label htmlFor="card_rarity">Card Rarity:</label>
                <input
                    id="card_rarity"
                    value={product.card_rarity}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Card Rarity"
                    required
                />
                <label htmlFor="product_UPC">Product UPC:</label>
                <input
                    id="product_UPC"
                    value={product.product_UPC}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Product UPC"
                    required
                />
                <br />

                <input type="submit" />
            </form>
        </div>
    );
}