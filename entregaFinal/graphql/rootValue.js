const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
} = require('../resolvers/productosResolver')

const rootValueFn = () => {
    return {
        getAllProducts, 
        getProductById, 
        addProduct, 
        updateProductById, 
        deleteProductById 
    }

}

module.exports = rootValueFn