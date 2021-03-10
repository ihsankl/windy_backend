import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import formidable from 'express-formidable'

import user from './src/routes/user.js'
// import hotel from './src/routes/hotel.js'
// import plane from './src/routes/plane.js'
// import rooms from './src/routes/rooms.js'
const app = express()
dotenv.config()

app.use(bodyParser.urlencoded({ extended: false }))
// app.use('/src/images',express.static('src/images/item'))
// app.use('/src/images',express.static('src/images/restaurant'))
// app.use('/src/images',express.static('src/images/categories'))

app.use(bodyParser.json())
app.use(cors())
// app.use(formidable({
//     uploadDir:'./src/images/',
//     multiples:false,
//     keepExtensions:true,
    
// }))
app.use('/user', user)
// app.use('/hotel', hotel)
// app.use('/plane', plane)
// app.use('/rooms', rooms)



const { APP_PORT } = process.env

app.listen(APP_PORT, () => {
    console.log('App listen on Port ' + APP_PORT)
})