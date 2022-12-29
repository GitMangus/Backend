const express = require("express")
const { getProducts, addProduct, updateProduct, deleteProduct } = require("../controllers/controllerProducts.js")
const routerProducts = express.Router()

//Obtener productos o producto seleccionado
routerProducts.get('/:id?', getProducts)

//Agregar producto
routerProducts.post('/', addProduct)

//Actualizar producto
routerProducts.put('/:id', updateProduct)

//Eliminar producto
routerProducts.delete('/:id', deleteProduct)

module.exports = routerProducts