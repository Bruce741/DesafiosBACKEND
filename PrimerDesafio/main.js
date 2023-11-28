class ProductManager {
    constructor() {
        this.products = [];
    }

    static id = 0;

    addProduct(title, description, price, thumbnail, code, stock){
        ProductManager.id++;
        this.products.push({title, description, price, thumbnail, code, stock, id:ProductManager.id})
    }

    getProducts(){
        return this.products 
    }

    getProductById(id){
        if(!this.products.find((producto) => producto.id === id))
        {
            console.log("Not found")
        } 
    }

}

// TESTING
const productoNuevo = new ProductManager;

console.log(productoNuevo.getProducts());

productoNuevo.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)

console.log(productoNuevo.getProducts());

productoNuevo.getProductById(0)

