const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db_tp = require('./queries_admin_tamanio_pizza')
const db_s=require('./queries_admin_salsa')
const port = process.env.PORT || 3005

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
        {dameListaTamaniosPizza:'/tamanios-pizza'},
        {version:'Version 202406072024'}
    ])
})

//Endpoints para tamanio_pizza
app.get('/tamanios-pizza', db_tp.getListaTamaniosPizza);
app.get('/tamanios-pizza/:idTamanio', db_tp.getTamanioPizza);
app.post('/tamanios-pizza', db_tp.insertaTamanioPizza);
app.put('/tamanios-pizza/:idTamanioPizza', db_tp.actualizaTamanioPizza);
app.delete('/tamanios-pizza/:idTamanioPizza', db_tp.eliminaTamanioPizza);

//Endpoints para salsa
app.get('/salsas', db_s.getListaSalsas);
app.get('/salsas/:idSalsa', db_s.getSalsa);
app.post('/salsas', db_s.insertaSalsa);
app.put('/salsas/:idSalsa', db_s.actualizaSalsa);
app.delete('/salsas/:idSalsa', db_s.eliminaSalsa);


app.listen(port, () => {
    console.log('API CHPSystem Captura PPP Móviles Nube corriendo en puerto', port);
});