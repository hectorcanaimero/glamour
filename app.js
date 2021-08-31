require('dotenv').config()
const cors = require('cors')
const epxress = require('express')
const { dbConnect } = require('./config/mongo')

const app = epxress()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(epxress.json())
app.use('/api/v1', require('./app/routes'))

dbConnect()

app.listen(PORT, () => console.log('API lista por el puerto ', PORT))