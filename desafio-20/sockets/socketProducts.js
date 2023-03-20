const ProductsDAOMongoDB = require('../daos/ProductsDAOMongoDB')

//Instancia contenedores:
const storageProducts = new ProductsDAOMongoDB()

const socketIoProducts = (io) => {
    //socket Products
    io.on('connection', socket => {
        socket.on('sendProduct', async () => {
            //const allProductsFromDB = await selectAllProducts()
            const allProductsFromDB = await storageProducts.getAll()

            //Servidor --> Cliente : Se envían todos los mensajes al usuario que se conectó.
            socket.emit('allProducts', allProductsFromDB)
        })

        socket.on('addProducts', async data => {
            const newProducto = {
                title: `${data.name}`,
                price: Number(data.price),
                thumbnail: `${data.img}`
            }

            //const product = await insertProduct(newProducto)
            const product = await storageProducts.save(newProducto)

            //Envío el producto nuevo a todos los clientes conectados
            io.sockets.emit('refreshTable', product)

        })
    })
}

module.exports = socketIoProducts