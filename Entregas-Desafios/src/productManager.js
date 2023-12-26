import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  static id = 0;

  addProduct = async (
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    available,
    category
  ) => {
    try {
      ProductManager.id++;
      const existingProducts = await this.getProducts();
      let newProduct = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        available: available,
        category: category,
        id: ProductManager.id,
      };
      existingProducts.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      throw error;
    }
  };

  getProducts = async () => {
    try {
      let productosLeidos = await fs.promises.readFile(this.path, "utf-8");
      if (!productosLeidos.trim()) {
        return [];
      }
      return JSON.parse(productosLeidos);
    } catch (error) {
      console.error('Error al leer el archivo JSON:', error);
      throw error;
    }
    
  };

  getProductsById = async (id) => {
    let productos = await this.getProducts();
    let productoId = productos.find((producto) => producto.id == +id);

    if (!productoId) {
      return null;
    }

    return productoId;
  };

  updateProduct = async (id, update) => {
    let productos = await this.getProducts();
    let index = productos.findIndex((producto) => producto.id == +id);

    productos[index] = {
      ...productos[index],
      ...update,
      id: id,
    };

    await fs.promises.writeFile(this.path, JSON.stringify(productos));
  };

  deleteProduct = async (id) => {
    try {
      let productos = await this.getProducts();
      let productosBorrados = productos.filter((producto) => producto.id != +id);
      await fs.promises.writeFile(this.path, JSON.stringify(productosBorrados));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw error;
    }
   
  };
}

const products = new ProductManager();

export default ProductManager;
