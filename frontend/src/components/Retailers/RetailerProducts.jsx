import axios from "axios";
import { useState, useEffect } from "react";
import RetailerProduct from "./RetailerProduct";

const API = process.env.REACT_APP_API_URL;

export default function RetailerProducts() {
    const [retailerProducts, setRetailerProducts] = useState([]);

    useEffect(() => {
        axios.get(`${API}/products`)
          .then((response) => {
            setRetailerProducts(response.data.sort((product1, product2) => {
              if (product1.id < product2.id) {
                return -1;
              } if (product1 > product2.id) {
                return 1;
              } else {
                return 0;
              }
            }))
          })
          .catch((e) => console.warn("catch", e));
      }, [])

    return (
        <div className="retailerProducts">
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Qty In Stock</th>
                        <th>Card ID</th>
                        <th>Rarity</th>
                        <th>UPC</th>
                        <th>Go To Item</th>
                    </tr>
                </thead>
                <tbody>
                    {retailerProducts.map((product) => {
                        return <RetailerProduct key={`RetailerProduct${product.id}`} product={product} />;
                    })}
                </tbody>
            </table>
        </div >
    );
}
