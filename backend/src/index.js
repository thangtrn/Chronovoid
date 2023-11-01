const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const mainRoutes = require('./routes')

dotenv.config()

const app = express()

try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Success")
} catch (error) {
    console.log(error);
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

mainRoutes(app)

app.listen(5000, () => console.log('Server is running on port 5000.'))
