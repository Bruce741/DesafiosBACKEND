import express from "express";
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager("../productos.json");

const PORT = 8080;
const app = express();

// Obtener todos los productos y el limite
app.get("/products", async (req, res) => {
  const { limit } = req.query;
  let products = await productManager.getProducts();

  if (!limit) {
    return res.send(products);
  }

  let limitedProducts = [];
  for (let i = 0; i < limit; i++) {
    if (products[i]) {
      limitedProducts.push(products[i]);
    }
    return res.send(limitedProducts);
  }
});

// Obtener Productos por el ID

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  let product = await productManager.getProductsById(id);

  if (!product) {
    return res.send("Producto no encontrado");
  }

  return res.send(product);
});

app.listen(PORT, () => {
  console.log("Servido funcionando en puerto " + PORT);
});
