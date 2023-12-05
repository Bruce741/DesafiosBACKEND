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
    limitedProducts.push(products[i])
  }
});

// Obtener Productos por el ID

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  let products = await productManager.getProductsById(id);
});

app.listen(PORT, () => {
  console.log("Servido funcionando en puerto " + PORT);
});
