const getDataHome = (req, res) => {
    const data = {
        title: "Desafio Número 11 - Mocks y Normalización",
        content: "En la web se podrán ingresar productos y chatear en tiempo real"
    }
    return res.render('index', data)
}

module.exports = {
    getDataHome,
}