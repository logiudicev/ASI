import {ProductDetails, updateProduct} from "../apiClient/productsApiClient";

import React, {useState, useRef} from "react";

import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Box, Grid, TextField} from "@mui/material";
import {isElementOfType} from "react-dom/test-utils";


interface ProductListProps {
    products: ProductDetails[];
    refreshState: () => void;
}

export const ProductList = (props: ProductListProps) => {

    const [orderStatus, setOrderStatus] = useState<string>("")
    const [quantityInput, setQuantityInput] = useState<string>("")

    const addQuantity = (product: ProductDetails, quantityInput: string) => {

        const productId = product.id;
        const quantity = parseInt(quantityInput);


        updateProduct(productId, product, quantity).then(() => {
            props.refreshState();
            setQuantityInput("");
        })

        setOrderStatus("");

    }

    const fulfillOrder = (product: ProductDetails) => {
        const productId = product.id;
        const quantity = product.quantity - 1;

        updateProduct(productId, product, quantity).then(() => {
            props.refreshState();
        })

        if (product.quantity <= 0) {
            setOrderStatus("You will receive " + (product.quantity = 0) + " " + product.name + ". Note that your order was NOT completely fulfilled. Your delivery will be short " + product.quantity + " items.");
        } else {
            setOrderStatus("You will receive " + (product.quantity = product.quantity - 1) + " " + product.name);
        }
    }

    return (
        <>

            <Grid container>
                <Grid item xs={3}>
                    <h2>Product</h2>
                    {props.products.map((product, index) => (
                        <Grid key={index} item sx={{height: '50px'}}>
                            {product.name}
                        </Grid>
                    ))}
                </Grid>

                <Grid item xs={3}>
                    <h2>Quantity</h2>
                    {props.products.map((product, index) => (
                        <Grid key={index} item sx={{height: '50px'}}>
                            {product.quantity}
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={3}>
                    <h2>Actions</h2>
                    {props.products.map((product, index) => (
                        <Grid key={index} item sx={{height: '50px'}}>
                            <TextField value={quantityInput} placeholder={product.quantity.toString()} size="small"
                                       label="Quantity"
                                       onChange={(event) => setQuantityInput(event.target.value)}> </TextField>
                            <Button
                                onClick={() => addQuantity(product, quantityInput)}
                            >Quantity</Button>
                        </Grid>
                    ))}
                </Grid>

                <Grid item xs={3}>
                    <h2>Order Fulfil</h2>
                    {props.products.map((product, index) => (
                        <Grid key={index} item sx={{height: '50px'}}>
                            <Button
                                onClick={() => fulfillOrder(product)}>
                                Order
                            </Button>

                        </Grid>
                    ))}

                </Grid>
            </Grid>
            <div>

                {orderStatus}

            </div>
        </>
    )
}