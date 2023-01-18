const getDataHome = (req, res) => {
    const data = {
        title: "Desafio Número 12 - Login por formulario",
        content: "Login mediante formulario, MongoAtlas"
    }
    return res.render('index', data)
}

module.exports = {
    getDataHome,
}