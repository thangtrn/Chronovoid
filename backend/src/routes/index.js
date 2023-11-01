const authRoute = require('./authRoute')
const productRoute = require('./productRoute')
const categoryRoute = require('./categoryRoute')
const orderRoute = require('./orderRoute')

const mainRoutes = (app) => {
    app.use('/api/auth', authRoute)
    app.use('/api/products', productRoute)
    app.use('/api/categories', categoryRoute)
    app.use('/api/order', orderRoute)
}

module.exports = mainRoutes;