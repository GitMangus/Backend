const storage = require('../daos/index')

const ordenesStorage = storage().ordenes

const sendEmail = require('../utils/nodemailerGmail')
const sendSMS = require('../utils/twilioSMS')
const sendWhatsApp = require('../utils/twilioWhatsApp')

const createOrdenController = async ctx => {
    try {
        const userLog = ctx.user
        const userID = ctx.body.idUser
        const orden = await ordenesStorage.createOrden(userID)

        auxEmail(userLog, orden)
        
        ctx.body = {
            status: 'success',
            message: 'Compra finalizada',
        }

    } catch (err) {

        ctx.body = {
            status: 'error',
            message: `Error al crear la orden ${err}`,
        }
    }
}

const viewOrdenesController = (req, res) => {
    return res.send('Estoy en viewOrdenes')
}

const auxEmail = async (userLog, orden) => {
    let detallePedido = ''

    orden.products.forEach(element => {
        detallePedido += `
        <li>UNIDADES: ${element.cantidad}. PRODUCTO: ${element.nombre}. CODIGO: ${element.codigo} </li>
    `
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: `florencia.weingartner@gmail.com`,
        subject: `Nuevo pedido de: ${userLog.username}`,
        html: `
            <h3>Nuevo pedido!</h3>
            <p> Datos del cliente:</p>
            <ul>
            <li> Nombre: ${userLog.username}</li>
            <li> Email: ${userLog.email}</li>
            <li> Teléfono: ${userLog.telefono}</li>
            <li> Dirección: ${userLog.direccion}</li>
            </ul>
            <p> Pedido:</p>
            <ul>
            ${detallePedido}
            </ul>
        `
    }
    const email = await sendEmail(mailOptions)
    console.log(email)
}

const auxWhatsApp = async (userLog, orden) => {
    let detallePedido = ''

    orden.products.forEach(element => {
        detallePedido +=
            `
            - UNIDADES: ${element.cantidad}. PRODUCTO: ${element.nombre}. CODIGO: ${element.codigo}
            `
    })

    const body =
        `Nuevo pedido!
        Datos del cliente:
        Nombre: ${userLog.username}
        ${userLog.email}
        Teléfono: ${userLog.telefono}
        Dirección: ${userLog.direccion}
        Pedido:
        ${detallePedido}
        `
    await sendWhatsApp(body, 'whatsapp:+14155238886', 'whatsapp:+5493484351605')
}

module.exports = {
    viewOrdenesController,
    createOrdenController
}