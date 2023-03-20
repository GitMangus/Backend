const { fork } = require('child_process')

const postObjectRandom = (req, res) => {
    const { cantBucle } = req.body
    process.env.CANT_BUCLE = cantBucle

    const objectRandom = fork('../desafio-17/controller/getObjectRandom')
    //const objectRandom = fork('../controller/getObjectRandom')
    objectRandom.on('message', dataRandom => {
        return res.send(dataRandom)
    })
}

module.exports = {
    postObjectRandom,
}