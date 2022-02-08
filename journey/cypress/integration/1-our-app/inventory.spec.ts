const addProduct = (product: string) => {
  cy.findByLabelText("Product to add").type(product);
  cy.findByRole("button", {name: /Submit/i}).click();
}
describe("inventory", () => {
  describe("when adding a product offering", () => {
    it("should display the new product with a default quantity of 0", () => {
      cy.visit("http://localhost:8080");
      addProduct("shiny-new-product");
      cy.findByText("shiny-new-product").should("exist");
      cy.findByText("0").should("exist");
    });


  });
  describe("when updating an existing product", () => {
    it("should display quantity of item after clicking Add Quantity", () => {
      cy.visit("http://localhost:8080");
      cy.findByRole("button", {name: /Add Quantity/i}).click();
      cy.findByText("1").should("be.visible");
    })
    it("should display quantity minimized after clicking Order", () => {
      cy.visit("http://localhost:8080");
      cy.findByRole("button", {name: /Order/i}).click();
      cy.findByText("0").should("be.visible");
    })
  })
});
