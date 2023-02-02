const getDataHome = (req, res) => {
    const data = {
        title: "Desafio Número 15",
        content: "En la web se podrán ingresar productos, chatear en tiempo real"
    }
    return res.render('index', data)
}

module.exports = {
    getDataHome,
}