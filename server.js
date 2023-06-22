const express = require('express')
const app = express()

require('dotenv').config()
app.use(express.json())

const port = process.env.PORT || 8081
const cors = require('cors')
app.use(cors('http://localhost:3002'))

// connect database
const connectDB = require('./config/connectDB')
connectDB()

// routes
app.use('/api/user', require('./routes/personRoutes'))
app.use('/api/post', require('./routes/postRoutes'))



// create server
app.listen(port, (err) => err ? console.log(err): console.log('server running on port :', port))