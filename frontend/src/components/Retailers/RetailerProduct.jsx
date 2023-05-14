import { Link } from "react-router-dom";

export default function RetailerProduct({ product }) {

    return (
        <tr>
            <td>
                {product.name}
            </td>
            <td>
                {product.description}
            </td>
            <td>
                {product.price}
            </td>
            <td>
                {product.quantity_in_stock}
            </td>
            <td>
                {product.card_id}
            </td>
            <td>
                {product.card_rarity}
            </td>
            <td>
                {product.product_upc}
            </td>
            <td>
                <Link to={`/retailer/products/${product.id}`}>Show Product</Link>
            </td>
        </tr>
    );
}
