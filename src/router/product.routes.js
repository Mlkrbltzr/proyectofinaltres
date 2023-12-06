/*import { Router } from "express"
import mongoose from "mongoose"
import ProductManager from "../DAO/manager/ProductManager.js"

const prodRouter = Router()
const product = new ProductManager()

//Actualizamos los productos http://localhost:8080/api/products/ con put mandando todos los datos menos el id
prodRouter.put("/:id", async (req,res) => {
    let id = req.params.id
    let updProd = req.body
    res.send(await product.updateProduct(id, updProd))
})
//Traemos los productos por el id http://localhost:8080/api/products/idproducto con get
prodRouter.get("/:id", async (req, res) => {
    try{
        const prodId = req.params.id;
        const productDetails = await product.getProductById(prodId);
        res.render("viewDetails", { product: productDetails });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    } 
});
//--------------------------------4 Get Opcionales-----------------------------------------------------------------------------//
//Traemos los productos con limit con http://localhost:8080/api/products/limit/numeroLimit con get
prodRouter.get("/limit/:limit", async (req, res) => { 
    let limit = parseInt(req.params.limit)
    if (isNaN(limit) || limit <= 0) {
        limit = 10; // Establece el valor predeterminado en 10 si no se proporciona un límite válido
    }    
    res.send(await product.getProductsByLimit(limit))
})
//Traemos los productos por page con http://localhost:8080/api/products/page/numeroPage con get
prodRouter.get("/page/:page", async (req, res) => { 
    let page = parseInt(req.params.page)
    if (isNaN(page) || page <= 0) {
        page = 1; // Establece el valor predeterminado en 10 si no se proporciona un límite válido
    }
    const productsPerPage = 1; // Número de productos por página    
    res.send(await product.getProductsByPage(page, productsPerPage))
})
//Traemos los productos por query con http://localhost:8080/api/products/buscar/query?q=nombreProducto con get
prodRouter.get("/buscar/query", async (req, res) => { 
    const query = req.query.q  
    res.send(await product.getProductsByQuery(query))
})
//Traemos los productos por sort con http://localhost:8080/api/products/ordenar/sort?sort=desc y
//http://localhost:8080/api/products/ordenar/sort/sort?sort=asc  con get
prodRouter.get("/ordenar/sort", async (req, res) => { 
        let sortOrder = 0;
        if (req.query.sort) {
        // Si se proporcionó, verifica el valor y configura el orden correspondiente
        if (req.query.sort === "desc") {
          sortOrder = -1; // Orden descendente
        }else if(req.query.sort === "asc"){
            sortOrder = 1; 
        }
      }
    res.send(await product.getProductsBySort(sortOrder))
})

//--------------------------------Fin 4 Get Opcionales-----------------------------------------------------------------------------//
//-------------------------------------------------Busqueda Maestra--------------------------------------------------------------//


prodRouter.get("/", async (req, res) => {
    let sortOrder = req.query.sortOrder; 
    let category = req.query.category; 
    let availability = req.query.availability; 
    if(sortOrder === undefined){
        sortOrder = "asc"
    }
    if(category === undefined){
        category = ""
    }
    if(availability === undefined){
        availability = ""
    }
    res.send(await product.getProductsMaster(null,null,category,availability, sortOrder))
})

//--------------------------------------------------------------------------------------------------------------------------//


//Traemos todos los productos http://localhost:8080/api/products/ con get
// prodRouter.get("/", async (req, res) => {
//     res.send(await product.getProducts())
// })
//Eliminamos los productos por id http://localhost:8080/api/products/idproducto con delete
prodRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.delProducts(id))
})
//Se agregan los productos entregando un json
prodRouter.post("/", async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProduct(newProduct))
})

export default prodRouter */

import { Router } from "express";
import ProductModel from "../DAO/models/products.js";


const productRouter = Router();



productRouter.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.render("products", { products }); // Pasa la lista de productos a la vista
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

productRouter.post("/", async (req, res) => {
  const { product, description, price } = req.body;
  try {
    const newProduct = new ProductModel({
      product,
      description,
      price
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al crear un nuevo producto" });
  }
});

productRouter.put("/:id", async (req, res) => {
  const { product, description, price } = req.body;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        product,
        description,
        price
      },
      { new: true }
    );

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndRemove(req.params.id);
    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

//details
productRouter.get("/details/:id", async (req, res) => {
  try {
    const products = await ProductModel.findById(req.params.id);
    if (product) {
      res.render("details", { products });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});


export default productRouter;