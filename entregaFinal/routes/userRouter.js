const { Router } = require('express')
const login = require('../authentication/login')
const signup = require('../authentication/signup')
const serializeUser = require('../authentication/serializeUser')
const deserializeUser = require('../authentication/deserializeUser')
const passport = require('passport')

const {
    signupFormController,
    loginFormController,
    logoutController,
    profileController
} = require('../controller/userController')

//Multer
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/avatar')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

//Authentication
login()
signup()
serializeUser()
deserializeUser()

const loginRouter = Router()
const signupRouter = Router()
const logoutRouter = Router()
const profileRouter = Router()

//Login
loginRouter.get('/', loginFormController)
loginRouter.post('/', passport.authenticate('login', {
    successRedirect: '/bienvenida', 
    failureRedirect: '/error/Error al iniciar sesión usuario contraseña incorrecta', 
    failureFlash: true  
}))

//Signup
signupRouter.get('/', signupFormController)
signupRouter.post('/', upload.single('avatar'), passport.authenticate('signup', {
    successRedirect: '/', 
    failureRedirect: '/error/Error al crear la cuenta ingrese otro usuario',
    failureFlash: true 
}))

//Profile
profileRouter.get('/', profileController)

//Logout
logoutRouter.get('/', logoutController)

module.exports = {
    signupRouter,
    loginRouter,
    logoutRouter,
    profileRouter
}