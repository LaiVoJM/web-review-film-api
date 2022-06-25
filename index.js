const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
//Import Routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const movieRoute = require('./routes/movie')
const reviewRoute = require('./routes/review')
const favoriteRoute = require('./routes/favorite')
const selectRoute = require('./routes/select')
dotenv.config()

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
    () => console.log('Connected to DB')
)

app.use(express.json())


//Route MiddLewares
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/movie', movieRoute)
app.use('/api/review', reviewRoute)
app.use('/api/favorite', favoriteRoute)
app.use('/api/select', selectRoute)

app.listen(8000, () => console.log('Server up and running'))