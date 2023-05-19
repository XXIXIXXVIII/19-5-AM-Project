import express from 'express'
import bodyParser from 'body-parser'
import router from './router/index.js'

const app = express()
const port = 8080 || 8081

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})