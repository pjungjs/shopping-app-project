import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Product({cart, setCart, logInCustomer}) {
    const {product, setProduct} = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${API}/products/${id}`)
          .then((response) => {
            console.log(response.data);
            setProduct(response.data);
          }).catch((e) => {
            console.warn("catch", e);
          })
    
      }, [id, API]);

    return (
        <div className="Product">
            <h4>{product.name}</h4>
            <h5>{product.description}</h5>
            <img src={product.imageURL}></img>
            <p>${product.price} per</p>
            <p>Quantity in stock:  {product.quantityInStock}</p>
            <p>Rarity: {product.cardRarity}</p>
            <p>Card ID:  {product.cardID}</p>
            <p>UPC:  {product.productUPC}</p>
            <OrderAddProduct 
            productInStock={product.quantityInStock} 
            cart={cart} 
            setCart={setCart} 
            logInCustomer={logInCustomer}/>
        </div>
    )
}