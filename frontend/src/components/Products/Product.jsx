import { useState } from "react";

export default function Product({ product }) {

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
        </div>
    )
}