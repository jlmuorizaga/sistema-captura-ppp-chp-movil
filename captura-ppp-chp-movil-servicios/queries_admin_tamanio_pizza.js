const Pool = require('pg').Pool;

//Datos de conexión a base de datos en AWS
const DB_HOST = process.env.DB_HOST || 'database-1.cgujpjkz4fsl.us-west-1.rds.amazonaws.com';
//const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'cheesepizzauser';
const DB_PASSWORD = process.env.DB_PASSWORD || 'cheesepizza2001';
const DB_NAME = process.env.DB_NAME || 'chppreciosespecprodpromocdb';
//MacBook
const DB_PORT = process.env.DB_PORT || 5432;

//Laptop Omen
//const DB_PORT = process.env.DB_PORT || 5434;

//Pool de conexiones a base de datos
const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
    /*ssl: {
        rejectUnauthorized: false,
    },*/
});


const getListaTamaniosPizza = (request, response) => {
    pool.query(
        'SELECT id, nombre FROM preesppropro.tamanio_pizza ORDER BY nombre',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}
const getTamanioPizza= (request, response) => {
    const idTamanio = request.params.idTamanio;
    pool.query(
        'SELECT id, nombre FROM preesppropro.tamanio_pizza WHERE id=$1 ORDER BY nombre',
        [idTamanio],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows[0]);
        }
    );
}
const insertaTamanioPizza = (req, res) => {
    const { idTamanio, nombreTamanioPizza } = req.body;
    pool.query(
        'INSERT INTO preesppropro.tamanio_pizza(id, nombre) ' 
        +'VALUES ($1, $2) RETURNING *',
        [idTamanio,nombreTamanioPizza],
        (error, results) => {
            if (error) {
                throw error;
            }
            textoRespuesta = '{"respuesta": "Se insertó nuevo tamaño pizza: ' + results.rows[0].id + '"}';
            res.status(201).json(JSON.parse(textoRespuesta));
        }
    );
}

const actualizaTamanioPizza = (req, res) => {
    const idTamanioPizza = req.params.idTamanioPizza;
    const { nombreTamanioPizza } = req.body;
    pool.query(
        'UPDATE preesppropro.tamanio_pizza SET nombre=$1 WHERE id=$2 RETURNING *',
        [nombreTamanioPizza, idTamanioPizza],
        (error, results) => {
            if (error) {
                throw error;
            }
            textoRespuesta = '{"respuesta": "Se actualizó tamaño_pizza: ' + results.rows[0].id + '"}';
            res.status(201).json(JSON.parse(textoRespuesta));
        }
    );
}

const eliminaTamanioPizza = (req, res) => {
    const idTamanioPizza = req.params.idTamanioPizza;
    pool.query(
        'DELETE FROM preesppropro.tamanio_pizza WHERE id=$1 ',
        [idTamanioPizza],
        (error, results) => {
            if (error) {
                throw error;
            }
            textoRespuesta = '{"respuesta": "Se eliminó ' + results.rowCount + ' tamanio_pizza: ' + idTamanioPizza + '"}';
            res.status(201).json(JSON.parse(textoRespuesta));
        }
    );
}

module.exports = {
    getListaTamaniosPizza,
    getTamanioPizza,
    insertaTamanioPizza,
    actualizaTamanioPizza,
    eliminaTamanioPizza
}