const express = require("express")
const { addCart, deleteCart, getProducts, addProduct, deleteProduct } = require("../controllers/controllerCarts.js")
const routerCarts = express.Router()

//Agregar al carrito
routerCarts.post('/', addCart)

//Eliminar carrito
routerCarts.delete('/:id', deleteCart)

//Obtener productos del carrito
routerCarts.get('/:id/products', getProducts)

//Agregar productos al carrito
routerCarts.post('/:id/products', addProduct)

//Eliminar productos del carrito
routerCarts.delete('/:id/products/:id_prod', deleteProduct)

module.exports = routerCarts