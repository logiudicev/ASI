import React from "react";
import {ProductList} from "../components/ProductList/ProductList";
import {render, screen} from "@testing-library/react";
import {getProducts, updateProduct} from "../components/apiClient/productsApiClient";
import userEvent from "@testing-library/user-event";

jest.mock("../components/apiClient/productsApiClient");
const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;
const mockUpdateProduct = updateProduct as jest.MockedFunction<typeof updateProduct>;

const updateProductTest = () => {
    userEvent.click(screen.getByRole("button", {name: /Add Quantity/i}));
}

describe("when I update a product", () => {
    it("it should display the new quantity of product", async () => {
        mockUpdateProduct.mockResolvedValue({id: 1, name: "a product", quantity: 1})
        mockGetProducts.mockResolvedValue([]);
        mockGetProducts.mockResolvedValue([{id: 1, name: "a product", quantity: 0}]);

        const mockOnClick = jest.fn();
        const products = [{id: 1, name: "wrench", quantity: 1}]

        render(<ProductList products={products} refreshState={mockOnClick} />)

        updateProductTest()

        expect(await screen.findByText("1")).toBeInTheDocument();


    })
})