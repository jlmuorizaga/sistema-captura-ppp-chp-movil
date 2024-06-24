const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db_tp = require('./queries_admin_tamanio_pizza')
const db_s=require('./queries_admin_salsa')
const db_e=require('./queries_admin_especialidad_pizza')
const db_tipos_producto=require('./queries_admin_tipos_producto')
const db_producto=require('./queries_admin_producto')
const db_retps=require('./queries_admin_relacion_especialidad_tamanio_precio_sucursal')
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
app.get('/tamanios-pizza/:idTamanioPizza', db_tp.getTamanioPizza);
app.post('/tamanios-pizza', db_tp.insertaTamanioPizza);
app.put('/tamanios-pizza/:idTamanioPizza', db_tp.actualizaTamanioPizza);
app.delete('/tamanios-pizza/:idTamanioPizza', db_tp.eliminaTamanioPizza);

//Endpoints para salsa
app.get('/salsas', db_s.getListaSalsas);
app.get('/salsas/:idSalsa', db_s.getSalsa);
app.post('/salsas', db_s.insertaSalsa);
app.put('/salsas/:idSalsa', db_s.actualizaSalsa);
app.delete('/salsas/:idSalsa', db_s.eliminaSalsa);

//Endpoints para especialidades
app.get('/especialidades', db_e.getListaEspecialidades);
app.get('/especialidades/:idEspecialidad', db_e.getEspecialidad);
app.post('/especialidades', db_e.insertaEspecialidad);
app.put('/especialidades/:idEspecialidad', db_e.actualizaEspecialidad);
app.delete('/especialidades/:idEspecialidad', db_e.eliminaEspecialidad);

//Endpoints para tipos_producto
app.get('/tipos-producto', db_tipos_producto.getListaTiposProducto);
app.get('/tipos-producto/:idTipoProducto', db_tipos_producto.getTipoProducto);
app.post('/tipos-producto', db_tipos_producto.insertaTipoProducto);
app.put('/tipos-producto/:idTipoProducto', db_tipos_producto.actualizaTipoProducto);
app.delete('/tipos-producto/:idTipoProducto', db_tipos_producto.eliminaTipoProducto);

//Endpoints para productos
app.get('/productos', db_producto.getListaProducto);
app.get('/productos/:idProducto', db_producto.getProducto);
app.post('/productos', db_producto.insertaProducto);
app.put('/productos/:idProducto', db_producto.actualizaProducto);
app.delete('/productos/:idProducto', db_producto.eliminaProducto);

//Endpoints para relacion_especialidad_tamanio_precio_sucursal
app.get('/relacion_especialidad_tamanio_precio_sucursal/:idSucursal', db_retps.getListaRelacionEspecialidadTamanioPrecioSucursal);
app.get('/relacion_especialidad_tamanio_precio_sucursal/:idEspecialidad/:idTamanio/:idSucursal', db_retps.getRelacionEspecialidadTamanioPrecioSucursal);
app.post('/relacion_especialidad_tamanio_precio_sucursal', db_retps.insertaRelacionEspecialidadTamanioPrecioSucursal);
app.put('/relacion_especialidad_tamanio_precio_sucursal/:idEspecialidad/:idTamanio/:idSucursal', db_retps.actualizaRelacionEspecialidadTamanioPrecioSucursal);
app.delete('/relacion_especialidad_tamanio_precio_sucursal/:idEspecialidad/:idTamanio/:idSucursal', db_retps.eliminaRelacionEspecialidadTamanioPrecioSucursal);

app.listen(port, () => {
    console.log('API CHPSystem Captura PPP Móviles Nube corriendo en puerto', port);
});