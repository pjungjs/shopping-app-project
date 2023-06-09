import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import RetailerProduct from "./RetailerProduct.jsx"

const API = process.env.REACT_APP_API_URL;

export default function RetailerProducts({ setLoggedInAs }) {
  const [retailerProducts, setRetailerProducts] = useState([]);

  useEffect(() => {
    setLoggedInAs({first_name: "Retailer"});
  }, [])

  //sort function satisfies "front end calculation . . . displayed to user".
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
  //"min-w-full text-left text-sm font-light 
  return (
    <div>
      <Table striped>
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr className="bg-orange-700">
            <th scope="col" className="px-6 py-4">Product</th>
            <th scope="col" className="px-6 py-4">Description</th>
            <th scope="col" className="px-6 py-4">Price</th>
            <th scope="col" className="px-6 py-4">Qty In Stock</th>
            <th scope="col" className="px-6 py-4">Card ID</th>
            <th scope="col" className="px-6 py-4">Rarity</th>
            <th scope="col" className="px-6 py-4">UPC</th>
            <th scope="col" className="px-6 py-4">Go To Item</th>
          </tr>
        </thead>
        <tbody className="list-disc [&>*:nth-child(even)]:text-amber-800 [&>*:nth-child(even)]:bg-orange-600">
          {retailerProducts.map((product) => {
            return <RetailerProduct key={`RetailerProduct${product.id}`} product={product} />;
          })}
        </tbody>
      </Table>
    </div>
  );
}
