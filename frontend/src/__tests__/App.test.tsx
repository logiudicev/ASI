import React from "react";
import {render, screen} from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import {createProduct, getProducts} from "../components/apiClient/productsApiClient";

jest.mock("../productsApiClient");
const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;


describe("inventory", () => {
  describe("when I view the inventory", () => {
    it("should display the products", async () => {
      mockGetProducts.mockResolvedValue([{id: 1, name: "a product", quantity: 0}]);

      render(<App/>);

      expect(screen.getByText("Parts Unlimited Inventory")).toBeInTheDocument();
      expect(screen.getByText("Product")).toBeInTheDocument();
      expect(await screen.findByText("a product")).toBeInTheDocument();
    });

    it("should display the products' quantities", async () => {
      mockGetProducts.mockResolvedValue([{id: 1, name: "a product", quantity: 0}]);

      render(<App/>);

      expect(screen.getByText("Quantity")).toBeInTheDocument();
      expect(await screen.findByText("0")).toBeInTheDocument();
    });
  });


});
