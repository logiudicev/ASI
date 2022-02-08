import {render, screen} from "@testing-library/react";
import App from "../../App";
import React from "react";
import {createProduct, getProducts} from "../../components/apiClient/productsApiClient";
import userEvent from "@testing-library/user-event";

jest.mock("../../components/apiClient/productsApiClient");
const mockCreateProduct = createProduct as jest.MockedFunction<typeof createProduct>;
const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;

const addProduct = (product: string) => {
    userEvent.type(screen.getByLabelText("Product to add"), product);
    userEvent.click(screen.getByRole("button", {name: /submit/i}));
}

describe("when I add a new product", () => {
    it("should display the new product", async () => {
        mockCreateProduct.mockResolvedValueOnce({name: "shiny new product", quantity: 0});
        mockGetProducts.mockResolvedValueOnce([]);
        mockGetProducts.mockResolvedValueOnce([{id: 1, name: "shiny new product", quantity: 0}]);

        render(<App/>);
        addProduct("shiny new product");

        expect(mockCreateProduct).toHaveBeenCalledWith("shiny new product");
        expect(await screen.findByText("shiny new product")).toBeInTheDocument();
    });
});