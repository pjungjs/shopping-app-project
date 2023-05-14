import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL

export default function RetailerEditProduct() {
    const { id } = useParams();
    let navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        image_url: "",
        price: 0,
        quantity_in_stock: 0,
        card_id: "",
        card_rarity: "",
        product_upc: ""
    });

    useEffect(() => {
        axios.get(`${API}/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            }).catch((e) => {
                console.warn("catch", e);
            })
    }, [id]);

    const updateProduct = (updatedProduct) => {
        axios
            .put(`${API}/products/${id}`, updatedProduct)
            .then(
                () => {
                    navigate(`/retailer/products/${id}`);
                },
                (error) => console.error(error)
            )
            .catch((c) => console.warn("catch", c));
    }

    //delete
    const deleteProduct = () => {
        axios.delete(`${API}/products/${id}`)
            .then(() => {
                navigate(`/retailer/products`);
            },
                //adds a callback function in case doesn't work.  So the .then works like an if/else
                // the "error" below catches a front end error.
                (error) => console.error(error)
            )
            // the .catch c below catches a back end error.
            .catch((c) => console.warn("catch", c))
    }

    const handleDelete = () => {
        const response = window.confirm("Really delete this product?")
        if (response) {
            alert("OK, deleting product.")
            deleteProduct();
        } else {
            alert("Deletion cancelled.")
        }
    }

    const handleTextChange = (event) => {
        setProduct({ ...product, [event.target.id]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateProduct(product, id);
    };
    /*
      id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(120) NOT NULL,
  image_url VARCHAR(120),
  price DECIMAL(10,2) NOT NULL CHECK (price >=0),
  quantity_in_stock INT NOT NULL CHECK (price >=0),
  card_id VARCHAR(12),
  card_rarity VARCHAR(18),
  product_upc CHAR(12)
    */

    return (
        <div className="Edit_Delete">

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
                <br />
                <label htmlFor="description">Description:</label>
                <input
                    id="description"
                    value={product.description}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Product Description"
                    required
                />
                <br />
                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    value={product.price}
                    type="number"
                    onChange={handleTextChange}
                    placeholder="Product Price"
                    required
                />
                <br />
                <label htmlFor="quantity_in_stock">Quantity In Stock:</label>
                <input
                    id="quantity_in_stock"
                    value={product.quantity_in_stock}
                    type="number"
                    onChange={handleTextChange}
                    placeholder="Quantity In Stock"
                    required
                />
                <br />
                <label htmlFor="card_id">Card ID:</label>
                <input
                    id="card_id"
                    value={product.card_id}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Card ID"
                    required
                />
                <br />
                <label htmlFor="card_rarity">Card Rarity:</label>
                <input
                    id="card_rarity"
                    value={product.card_rarity}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Card Rarity"
                    required
                />
                <br />
                <label htmlFor="product_upc">Product UPC:</label>
                <input
                    id="product_upc"
                    value={product.product_upc}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Product UPC"
                    required
                />
                <br />

                <input type="submit" />
            </form>
            <div>
                <Link to={`/retailer/products/${id}/:edit`} >
                    <button>Cancel</button>
                </Link>
            </div>
            <div>
                <button onClick={handleDelete}>Delete Product Record</button>
            </div>
        </div>
    )
}