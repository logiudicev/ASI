import {ProductDetails, updateProduct} from "../apiClient/productsApiClient";

import React, {useState} from "react";

import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Box} from "@mui/material";


interface ProductListProps {
    products: ProductDetails[];
    refreshState: () => void;
}

export const ProductList = (props: ProductListProps) => {

    const [orderStatus, setOrderStatus] = useState<string>("")

    const addQuantity = (product: ProductDetails) => {

        const productId = product.id;
        const quantity = product.quantity + 1;
        updateProduct(productId, product, quantity).then(() => {
            props.refreshState();
        })

        setOrderStatus("You will receive " + (product.quantity = product.quantity + 1) + " " + product.name);

    }

    const removeQuantity = (product: ProductDetails) => {
        const productId = product.id;
        const quantity = product.quantity - 1;
        updateProduct(productId, product, quantity).then(() => {
            props.refreshState();
        })

        if(product.quantity <= 0){
            setOrderStatus("You will receive " + (product.quantity = product.quantity - 1) + " " + product.name + ". Note that your order was NOT completely fulfilled. Your delivery will be short " + product.quantity + " items.");
        } else {
        setOrderStatus("You will receive " + (product.quantity = product.quantity - 1) + " " + product.name);
        }
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

                            <Button
                                onClick={()=> removeQuantity(product)}>
                                Order
                            </Button>

                            </div>
                    ))}
                </Box>
            </Box>

        <div>

            {orderStatus}

        </div>
        </>
    )
}