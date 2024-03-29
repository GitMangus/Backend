const express = require('express')
const app = express()

const Koa= require('koa')
const appKoa = new Koa()
const koaBody = require('koa-body')

const passport = require('passport')
const log4js = require('./utils/logs')
const MongoStore = require('connect-mongo')
const dotenv = require('dotenv')
const parseArgs = require('minimist')
const { graphqlHTTP } = require('express-graphql')
const graphQLSchema = require('./graphql/schema')
const graphQLRootValue = require('./graphql/rootValue')

dotenv.config()

app.use('/avatar', express.static('./public/avatar'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/graphql', graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLRootValue(),
    graphiql: true
}))

const session = require('express-session')

//Middleware: session
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URL_MONGO,
        ttl: 10,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}))
app.use(passport.initialize())
app.use(passport.session())

const args = parseArgs(process.argv.slice(2))

//Views
app.set('views', './views')
app.set('view engine', 'ejs')

//Middlewares
const loggerConsole = log4js.getLogger('default')
const loggerArchiveWarn = log4js.getLogger('warnArchive')
const loggerArchiveError = log4js.getLogger('errorArchive')

app.use((req, res, next) => {
    loggerConsole.info(`
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`)
    next()
})

//My middleware
const isLogged = ((req, res, next) => {
    let msgError = 'Para acceder a esta URL debe iniciar sesión'
    if (req.user) {
        next()
    } else {
        return res.render('viewError', { msgError })
    }
})

//Routers import 
const productosRouter = require('./routes/productosRouter')
const carritoRouter = require('./routes/carritoRouter')
const { loginRouter } = require('./routes/userRouter')
const { signupRouter } = require('./routes/userRouter')
const { logoutRouter } = require('./routes/userRouter')
const { profileRouter } = require('./routes/userRouter')
const generalViewsRouter = require('./routes/generalViewsRouter')
const ordenesRouter = require('./routes/ordenesRouter')

//Routers 
app.use('/', generalViewsRouter)
app.use('/api/productos', isLogged, productosRouter)
app.use('/api/carrito', isLogged, carritoRouter)
app.use('/api/ordenes', isLogged, ordenesRouter)
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/logout', isLogged, logoutRouter)
app.use('/profile', isLogged, profileRouter)

app.use((req, res) => {
    loggerConsole.warn(`
    Estado: 404
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`)

    loggerArchiveWarn.warn(`Estado: 404, Ruta consultada: ${req.originalUrl}, Metodo ${req.method}`)
    const msgError = `Estado: 404, Ruta consultada: ${req.originalUrl}, Metodo ${req.method}`

    res.render('viewError', {msgError})

    //res.status(404).json({ error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada` })
})


const CLUSTER = args.CLUSTER

const PORT = process.env.PORT || 8080
const runServer = (PORT) => {
    app.listen(PORT, () => loggerConsole.debug(`Servidor escuchando en el puerto ${PORT}`))
}

if (CLUSTER) {
    if (cluster.isMaster) {

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker, code, signal) => {
            cluster.fork()
        })

    } else {
        runServer(PORT)
    }

} else {
    runServer(PORT)
}