import axios from "axios";
import {Product} from "../../product";

export async function createProduct(product: string): Promise<Product> {
  return (await axios.post<Product>("/products", product, {headers: {'Content-Type': 'text/plain'}})).data
}

export async function getProducts(): Promise<ProductDetails[]> {
  return (await axios.get<ProductDetails[]>("/products")).data
}

export async function updateProduct(productId: number, product: ProductDetails, quantity: number): Promise<ProductDetails> {
  const data = {
    id: product.id,
    name: product.name,
    quantity: quantity
  }

  return (await axios.post<ProductDetails>(`/products/${productId}`, data, {headers: {'Content-Type': 'application/json'}})).data
}

export interface ProductDetails {
  id: number,
  name: string,
  quantity: number,
}