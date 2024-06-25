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


const getListaLugares = (request, response) => {
    pool.query(
        'SELECT id, nombre FROM preesppropro.lugar ORDER BY nombre',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}
const getLugar= (request, response) => {
    const idLugar = request.params.idLugar;
    pool.query(
        'SELECT id, nombre FROM preesppropro.lugar WHERE id=$1 ORDER BY nombre',
        [idLugar],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows[0]);
        }
    );
}
const insertaLugar = (req, res) => {
    const { idLugar, nombreLugar } = req.body;
    pool.query(
        'INSERT INTO preesppropro.lugar (id, nombre) VALUES ($1, $2) RETURNING *',        
        [idLugar,nombreLugar],
        (error, results) => {
            if (error) {
                throw error;
            }
            textoRespuesta = '{"respuesta": "Se insertó nuevo lugar: ' + results.rows[0].id + '"}';
            res.status(201).json(JSON.parse(textoRespuesta));
        }
    );
}

const actualizaLugar= (req, res) => {
    const idLugar = req.params.idLugar;
    const { nombreLugar } = req.body;
    pool.query(
        'UPDATE preesppropro.lugar SET nombre=$1 WHERE id=$2 RETURNING *',
        [nombreLugar,idLugar],
        (error, results) => {
            if (error) {
                throw error;
            }
            textoRespuesta = '{"respuesta": "Se actualizó lugar: ' + results.rows[0].id + '"}';
            res.status(201).json(JSON.parse(textoRespuesta));
        }
    );
}

const eliminaLugar = (req, res) => {
    const idLugar = req.params.idLugar;
    pool.query(
        'DELETE FROM preesppropro.lugar WHERE id=$1 ',
        [idLugar],
        (error, results) => {
            if (error) {
                throw error;
            }
            textoRespuesta = '{"respuesta": "Se eliminó ' + results.rowCount + ' lugar: ' + idLugar + '"}';
            res.status(201).json(JSON.parse(textoRespuesta));
        }
    );
}

module.exports = {
    getListaLugares,
    getLugar,
    insertaLugar,
    actualizaLugar,
    eliminaLugar
}