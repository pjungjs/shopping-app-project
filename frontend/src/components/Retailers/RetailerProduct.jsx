import { Link } from "react-router-dom";

export default function RetailerProduct({ product }) {

    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium">
                {product.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {product.description}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {product.price}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {product.quantity_in_stock}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {product.card_id}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {product.card_rarity}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {product.product_upc}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <Link to={`/retailer/products/${product.id}`}>Show Product</Link>
            </td>
        </tr>
    );
}
