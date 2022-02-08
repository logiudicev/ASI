import {ProductDetails, updateProduct} from "../apiClient/productsApiClient";

import React from "react";

import {Button, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Box} from "@mui/material";


interface ProductListProps {
    products: ProductDetails[];
    refreshState: () => void;
}




export const ProductList = (props: ProductListProps) => {

    const addQuantity = (product: ProductDetails) => {
        const productId = product.id;
        const quantity = product.quantity + 1;
        updateProduct(productId, product, quantity).then(() => {
            props.refreshState();
        })

    }



    return (
        <>
            <Box display='flex' flexDirection='row'>
                <Box>
                    <h2>Product</h2>
                    {props.products.map((product, index) => (
                        <div key={index}>{product.name}</div>
                    ))}

                </Box>

                <Box>
                    <h2>Quantity</h2>
                    {props.products.map((product, index) => (
                        <div key={index}>{product.quantity}

                            <Button
                                onClick={()=> addQuantity(product)}
                            >Add Quantity</Button>

                            </div>
                    ))}
                </Box>
            </Box>
        </>
    )
}