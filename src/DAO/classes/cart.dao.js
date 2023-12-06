/*
import {promises as fs} from 'fs'
import {nanoid} from "nanoid"
import { cartsModel } from '../models/carts.model.js'
import ProductManager from './ProductManager.js'

//Se accede a funciones de ProductManager definiendo prodAll
const prodAll = new ProductManager()

class CartManager extends cartsModel
{
    constructor() {
        super();
    }
    async getCarts() 
    {
        try 
        {
          const carts = await CartManager.find({})
          .populate({
            path: "products.productId", // Rellenar la referencia "productId" en "products"
            model: "products", // Nombre del modelo al que hacer referencia
            select: "image description price stock", // Seleccionar los campos que deseas mostrar
          });
          return carts;
        } 
        catch (error) 
        {
          console.error('Error al obtener los carritos:', error);
          return [];
        }
      }
    async addCart(cartData) 
    {
        try 
        {
          await cartsModel.create(cartData);
          return 'Carrito agregado';
        } catch (error) {
          console.error('Error al agregar el carrito:', error);
          return 'Error al agregar el carrito';
        }
      }
    
      // Obtiene un carrito por ID
      async getCartById(id) 
      {
        try 
        {
          const cart = await cartsModel.findById(id)   
          if (!cart) {
            return 'Carrito no encontrado';
          } 
          return cart;
        } 
        catch (error) 
        {
          console.error('Error al obtener el carrito:', error);
          return 'Error al obtener el carrito';
        }
      }
    
      // Agrega un producto al carrito
      async addProductInCart(cartId, prodId) 
      {
        try 
        {
          const cart = await cartsModel.findById(cartId);
    
          if (!cart) 
          {
            return 'Carrito no encontrado';
          }
    
          // Verifica si el producto ya está en el carrito
          const existingProduct = cart.products.find((product) => product.productId === prodId);
    
          if (existingProduct) 
          {
            // Si el producto ya está en el carrito, aumenta la cantidad
            existingProduct.quantity += 1;
          } 
          else 
          {
            // Si el producto no está en el carrito, agrégalo
            cart.products.push({
              productId: prodId,
              quantity: 1,
            });
          } 
          await cart.save();
          return 'Producto agregado al carrito';
        } catch (error) {
          console.error('Error al agregar el producto al carrito:', error);
          return 'Error al agregar el producto al carrito';
        }
      }
      async removeProductFromCart(cartId, prodId) 
      {
        try 
        {
          const cart = await cartsModel.findById(cartId);
          if (!cart) 
          {
            return 'Carrito no encontrado';
          }
      
          // Busca el índice del producto en el carrito
          const productIndex = cart.products.findIndex((product) => product.productId === prodId);
      
          if (productIndex !== -1) 
          {
            // Si el producto se encuentra en el carrito, elimínalo
            cart.products.splice(productIndex, 1);
            await cart.save();
            return 'Producto eliminado del carrito';
          } 
          else 
          {
            // Si el producto no se encuentra en el carrito, devuelve un mensaje
            return 'Producto no encontrado en el carrito';
          }
        } catch (error) {
          console.error('Error al eliminar el producto del carrito:', error);
          return 'Error al eliminar el producto del carrito';
        }
      }
      async updateProductsInCart(cartId, newProducts) 
      {
        try 
        {
          const cart = await cartsModel.findById(cartId);
      
          if (!cart) 
          {
            return 'Carrito no encontrado';
          }
      
          // Actualiza los productos del carrito con el nuevo arreglo
          cart.products = newProducts;
      
          await cart.save();
          return 'Carrito actualizado con nuevos productos';
        } catch (error) {
          console.error('Error al actualizar el carrito con nuevos productos:', error);
          return 'Error al actualizar el carrito con nuevos productos';
        }
      }
      async updateProductInCart(cartId, prodId, updatedProduct) 
      {
        try 
        {
          const cart = await cartsModel.findById(cartId);
          if (!cart) 
          {
            return 'Carrito no encontrado';
          }     
          // Busca el producto en el carrito por su ID
          const productToUpdate = cart.products.find((product) => product.productId === prodId);
      
          if (!productToUpdate) 
          {
            return 'Producto no encontrado en el carrito';
          }
      
          // Actualiza el producto con la información proporcionada
          Object.assign(productToUpdate, updatedProduct);
      
          await cart.save();
          return 'Producto actualizado en el carrito';
        } catch (error) {
          console.error('Error al actualizar el producto en el carrito:', error);
          return 'Error al actualizar el producto en el carrito';
        }
      }
      async removeAllProductsFromCart(cartId) 
      {
        try {
          const cart = await cartsModel.findById(cartId);    
          if (!cart) 
          {
            return 'Carrito no encontrado';
          }
      
          // Elimina todos los productos del carrito
          cart.products = [];
          await cart.save();
          
          return 'Todos los productos han sido eliminados del carrito';
        } catch (error) {
          console.error('Error al eliminar los productos del carrito:', error);
          return 'Error al eliminar los productos del carrito';
        }
      }
      async getCartWithProducts(cartId) 
      {
        try
        {
          const cart = await cartsModel.findById(cartId).populate('products.productId').lean();
      
          if (!cart) {
            return 'Carrito no encontrado';
          }
      
          return cart;
        } catch (error) {
          console.error('Error al obtener el carrito con productos:', error);
          return 'Error al obtener el carrito con productos';
        }
      }     
}
export default CartManager*/
import cartModel from "../../DAO/models/cart.js"
import ProductsDao from "./products.dao.js";


    class CartDao{ 
    constructor() {
        this.productsDao = new ProductsDao(); 
    }

    async readCarts() { 
        return await cartModel.find(); 
    }

    async exist(cartId) { 
        return await cartModel.findById(cartId); 
    } 


    async addCarts() { /*addCarts es un método que se utiliza para crear un nuevo carrito en la base de datos.*/
        const newCart = await cartModel.create({ products: [] }); 
        return "Carrito Agregado";
    }

    /*Este método se utiliza para obtener un carrito específico de la base de datos según un ID dado, toma de argumento el id que debería ser único del carrito que quiero
    recuperar, llama al método exist(id)para verificar si existe un carrito con ese id en la base de datos, si no se encuentra carrito con ese id devuelve mensaje: "carrito no existe" */
    async getCartsById(cartId) {
        const cart = await this.cartModel.exist(cartId);
        if (!cart) return "Carrito no existe";
        return cart;
    }


    /*Este método se utiliza para obtener detalles de productos a partir de una lista de IDs de productos.Recibe como argumento productIds, en plural, esto es
    porque busca devolver la lista de todos los carritos */
    async getProductsForCart(productIds) {
        //const products = await this.cartModel.getProductById(productIds); 
        const products = await this.productsDao.getProductById(productIds);


        return products; 
    }

    /*addProductInCart Tiene como propósito agregar un producto a un carrito específico */
    async addProductInCart(cartId, productId) { 
        const cart = await this.cartModel.exist(cartId);
       
        if (!cart) {
            console.log("Carrito no existe");
            return "Carrito no existe";
        }
        // BUSCA EL PRODUCTO en la base de datos con el ID especificado (productId).
        const product = await this.cartModel.exist(productId);
        // Verifica si el producto no existe en la base de datos.
        if (!product) {
            console.log("No se encuentra el producto");
            return "No se encuentra el producto"; //retorna respuesta 
        }

        // COMPRUEBA si el producto ya está presente en el carrito.
        if (cart.products.some((prod) => prod.id.equals(product._id))) { 
            const existingProduct = cart.products.find((prod) => prod.id.equals(productId));
            existingProduct.quantity++;
            await cart.save(); 
            console.log("Producto sumado en el carrito");
            cart.products.push({ id: productId, quantity: 1 }); 
            await cart.save(); 
            console.log("Producto en el carrito :)");
        }
        return "Producto agregado al carrito";
    }



}


export default  CartDao