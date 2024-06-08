const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries_catalogos')
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors({
    origin: '*'
}))
app.get('/', (request, response) => {
    response.json([{
        info: 'API CHPSystem Captura PPP Móviles'},
        {tamanios:'/tamanios_pizza'},
        {version:'Version 202406072024'}
    ])
})

//Endpoints para catálogos
app.get('/tamanios_pizza', db.getTamaniosPizza);


app.listen(port, () => {
    console.log('API CHPSystem Captura PPP Móviles Nube corriendo en puerto', port);
});