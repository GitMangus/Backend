const Carts = require('./containerCarts.js')

const carts = new Carts()
let admin

//Agregar un carrito
const addCart = async (req, res) => {
	await carts.save(req.body)
	res.json({ message: 'Carrito agregado' })
}

//Eliminar carrito
const deleteCart = async (req, res) => {
	await carts.deleteById(req.params.id)
	res.json({ message: 'Carrito eliminado' })
}

//Obtener productos del carrito
const getProducts = async (req, res) => {
	const cartSelected = await carts.getProducts(req.params.id)
	res.send(cartSelected)
}

//Agregar producto al carrito
const addProduct = (req, res) => {
	carts.saveProduct(req.body.idCart, req.params.id)
	res.json({ message: 'Producto agregado' })
}

//Eliminar producto del carrito
const deleteProduct = (req, res) => {
	carts.deleteProduct(req.params.id, req.params.id_prod)
	res.json({ message: 'Producto eliminado' })
}

module.exports = { addCart, deleteCart, getProducts, addProduct, deleteProduct }