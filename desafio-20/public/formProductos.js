const socket = io()

const tbodyProducts = document.getElementById('tbodyProducts')

const nameForm = document.getElementById('nameForm')
const priceForm = document.getElementById('priceForm')
const imgForm = document.getElementById('imgForm')
const addProduct = document.getElementById('sendMessage')

//Pedido de productos desde el cliente
socket.emit('sendProduct')

//Cliente --> Servidor: envía nuevo producto
addProduct.addEventListener('click', () => {
    const product = {
        name: nameForm.value,
        price: priceForm.value,
        img: imgForm.value
    }

    nameForm.value = ""
    priceForm.value = ""
    imgForm.value = ""

    socket.emit('addProducts', product)
})


//Servidor --> Cliente: Envío los datos para agregar a la tabla.
socket.on('refreshTable', data => {
    product = `
        <tr>
            <td>
                ${data[0].title}
            </td>
            <td>
                ${data[0].price} 
            </td>
            <td>
                <img src="${data[0].thumbnail}" width="60" height="60">
            </td>
        </tr>
    `
    tbodyProducts.innerHTML += product
})

//Servidor --> Cliente: envía todos los productos
socket.on('allProducts', data => {

    data.forEach(product => {
        product = `
            <tr>
                <td>
                    ${product.title}
                </td>
                <td>
                    ${product.price} 
                </td>
                <td>
                    <img src="${product.thumbnail}" width="60" height="60">
                </td>
            </tr>
        `
        tbodyProducts.innerHTML += product
    })
})