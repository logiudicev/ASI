package mil.army.futures.asitemplate.services

import mil.army.futures.asitemplate.Product
import mil.army.futures.asitemplate.repositories.ProductRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class ProductService(private val productRepository: ProductRepository) {
    fun addProduct(product: String): Product {
        return productRepository.save(Product(name = product, quantity = 0))
    }

    fun getProducts(): List<Product> {
        return productRepository.findAll()
    }

    fun updateProduct(productId: Long, product: Product) {
        val existingProduct = productRepository.findByIdOrNull(productId) ?: return
        val updatedProduct = existingProduct.copy(
            name = product.name,
            quantity = product.quantity,
        )
        productRepository.save(updatedProduct)
    }
}