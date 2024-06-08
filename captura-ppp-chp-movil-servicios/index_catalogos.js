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
        {dameListaTamaniosPizza:'/dameListaTamaniosPizza'},
        {version:'Version 202406072024'}
    ])
})

//Endpoints para tamanio_pizza
app.get('/dameListaTamaniosPizza', db.getListaTamaniosPizza);
app.post('/insertaTamanioPizza/:idTamanio/:nuevoTamanio', db.insertaTamanioPizza);
app.put('/actualizaTamanioPizza/:idTamanioPizza/:nombreTamanioPizza', db.actualizaTamanioPizza);
app.delete('/eliminaTamanioPizza/:idTamanioPizza', db.eliminaTamanioPizza);


app.listen(port, () => {
    console.log('API CHPSystem Captura PPP Móviles Nube corriendo en puerto', port);
});