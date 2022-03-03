import React, {FormEvent, useEffect, useState} from "react";
import {createProduct, getProducts, ProductDetails} from "./components/apiClient/productsApiClient";
import {Box, Container, Grid} from "@mui/material";
import {Product} from "./product";
import {ProductCreator} from "./components/ProductCreator";
import {ProductList} from "./components/ProductList/ProductList";

const App = () => {
    const [products, setProducts] = useState<ProductDetails[]>([]);
    const [refresh, setRefresh] = useState<number>(0)

    const refreshState = () => {
        setRefresh(prevState => prevState - 1)
    }


    useEffect(() => {
        getProducts().then(setProducts);
    }, [refresh]);

    return (
        <Container sx={{mx: 4, my: 4}}>
            <h1>Parts Unlimited Inventory</h1>

            <ProductList products={products} refreshState={refreshState} />

                <ProductCreator refreshState={refreshState} />
        </Container>
    );
}

export default App;
