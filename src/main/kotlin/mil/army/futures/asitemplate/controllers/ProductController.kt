package mil.army.futures.asitemplate.controllers

import mil.army.futures.asitemplate.Product
import mil.army.futures.asitemplate.services.ProductService
import org.springframework.web.bind.annotation.*

@RestController
class ProductController(private val productService: ProductService) {

    @GetMapping("/products")
    fun getProducts(): List<Product> {
        return productService.getProducts()
    }

    @PostMapping("/products")
    fun addProduct(@RequestBody product: String) {
        productService.addProduct(product)
    }

    @GetMapping("/hi")
    fun sayHi(): String {
        return "hi"
    }

    @PostMapping("/products/{productId}")
    fun updateProduct(@PathVariable productId: Long, @RequestBody product: Product){
        productService.updateProduct(productId, product)
    }

}

