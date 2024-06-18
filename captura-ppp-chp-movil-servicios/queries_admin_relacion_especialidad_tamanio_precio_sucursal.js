
const Pool = require('pg').Pool;

const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,DB_PORT} = require('./conexion_data_db.js')


//Pool de conexiones a base de datos
const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
 /*   ssl: {
        rejectUnauthorized: false,
    },
*/
});


const getListaRelacionEspecialidadTamanioPrecioSucursal = (request, response) => {
    const idSucursal = request.params.idSucursal;
    console.log('idSucursal='+idSucursal);
    pool.query(
        'SELECT id_especialidad_pizza as idEspecialidad, ep.nombre as pizzaNombre,'
                + 'id_tamanio_pizza as idTamanioPizza, tp.nombre as pizzaTamanio,id_sucursal as idSucursal, precio,precio_p1 as precioP1,'
                + 'r.aplica_2x1 as aplica2x1, r.aplica_p1 as aplicaP1,r.aplica_bebida_chica_gratis as aplicaBebidaChicaGratis '
                + 'FROM preesppropro.relacion_especialidad_tamanio_precio_sucursal r,preesppropro.especialidad_pizza ep,preesppropro.tamanio_pizza tp '
                + 'WHERE id_sucursal=$1 '
                + 'AND id_especialidad_pizza=ep.id AND id_tamanio_pizza=tp.id '
                + 'ORDER BY pizzaNombre, pizzaTamanio',
                [idSucursal],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}
const getSalsa= (request, response) => {
    const idSalsa = request.params.idSalsa;
    pool.query(
        'SELECT id, descripcion FROM preesppropro.salsa WHERE id=$1 ORDER BY descripcion',
        [idSalsa],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows[0]);
        }
    );
}
const insertaSalsa = (req, res) => {
    const { idSalsa, nombreSalsa } = req.body;
    pool.query(
        'INSERT INTO preesppropro.salsa(id, descripcion) ' 
        +'VALUES ($1, $2) RETURNING *',
        [idSalsa,nombreSalsa],
        (error, results) => {
            if (error) {
                throw error;
            }
            textoRespuesta = '{"respuesta": "Se insertó nueva salsa: ' + results.rows[0].id + '"}';
            res.status(201).json(JSON.parse(textoRespuesta));
        }
    );
}

const actualizaSalsa= (req, res) => {
    const idSalsa = req.params.idSalsa;
    const { nombreSalsa } = req.body;
    pool.query(
        'UPDATE preesppropro.salsa SET descripcion=$1 WHERE id=$2 RETURNING *',
        [nombreSalsa,idSalsa],
        (error, results) => {
            if (error) {
                throw error;
            }
            textoRespuesta = '{"respuesta": "Se actualizó salsa: ' + results.rows[0].id + '"}';
            res.status(201).json(JSON.parse(textoRespuesta));
        }
    );
}

const eliminaSalsa = (req, res) => {
    const idSalsa = req.params.idSalsa;
    pool.query(
        'DELETE FROM preesppropro.salsa WHERE id=$1 ',
        [idSalsa],
        (error, results) => {
            if (error) {
                throw error;
            }
            textoRespuesta = '{"respuesta": "Se eliminó ' + results.rowCount + ' salsa: ' + idSalsa + '"}';
            res.status(201).json(JSON.parse(textoRespuesta));
        }
    );
}

module.exports = {
    getListaRelacionEspecialidadTamanioPrecioSucursal,
    getSalsa,
    insertaSalsa,
    actualizaSalsa,
    eliminaSalsa
}