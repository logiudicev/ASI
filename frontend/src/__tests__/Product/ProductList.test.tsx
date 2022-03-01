import React from "react";
import {ProductList} from "../../components/ProductList/ProductList";
import {render, screen} from "@testing-library/react";
import {getProducts, updateProduct} from "../../components/apiClient/productsApiClient";
import userEvent from "@testing-library/user-event";

jest.mock("../../components/apiClient/productsApiClient");
const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;
const mockUpdateProduct = updateProduct as jest.MockedFunction<typeof updateProduct>;

const whenIIncrementTheQuantityOfTheProduct = () => {
    userEvent.click(screen.getByRole("button", {name: /Add Quantity/i}));
}

const whenIDecrementTheQuantityOfTheProduct = () => {
    userEvent.click(screen.getByRole("button", {name: /Order/i}));
}

function givenAProductWithQuantity(quantity: number) {
    mockUpdateProduct.mockResolvedValue({id: 1, name: "a product", quantity: 0})
    mockGetProducts.mockResolvedValue([]);
    mockGetProducts.mockResolvedValue([{id: 1, name: "a product", quantity: 0}]);

    const mockOnClick = jest.fn();
    const products = [{id: 1, name: "wrench", quantity: quantity}]

    render(<ProductList products={products} refreshState={mockOnClick}/>)
}

async function thenISeeProductQuantityOf(number: number) {

    expect(await screen.findByText(number)).toBeInTheDocument();
}

describe("when I update a product", () => {
    it("it should display the new quantity of product on Add Quantity", async () => {
        givenAProductWithQuantity(1);

        whenIIncrementTheQuantityOfTheProduct();

        await thenISeeProductQuantityOf(2);
    })
    it("it should subtract the new quantity of product on order", async () => {
        givenAProductWithQuantity(1);

        whenIDecrementTheQuantityOfTheProduct();

        await thenISeeProductQuantityOf(0)
    })
    it("should not allow a negative quantity of product on order", async () => {
        givenAProductWithQuantity(0);

        whenIDecrementTheQuantityOfTheProduct();

        await thenISeeProductQuantityOf(0)

        expect(screen.queryByText("-1")).not.toBeInTheDocument();
    })
})