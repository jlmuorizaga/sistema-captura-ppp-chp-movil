const Pool = require('pg').Pool;

//Datos de conexión a base de datos en AWS
//const DB_HOST = process.env.DB_HOST || 'database-1.cgujpjkz4fsl.us-west-1.rds.amazonaws.com';
const DB_HOST = process.env.DB_HOST || 'localhost';
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


const getListaSalsas = (request, response) => {
    pool.query(
        'SELECT id, descripcion FROM preesppropro.salsa ORDER BY descripcion',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}
const getSalsa= (request, response) => {
    const idTamanio = request.params.idTamanio;
    pool.query(
        'SELECT id, descripcion FROM preesppropro.salsa WHERE id=$1 ORDER BY descripcion',
        [idTamanio],
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
            textoRespuesta = '{"respuesta": "Se insertó nuevo tamaño pizza: ' + results.rows[0].id + '"}';
            res.status(201).json(JSON.parse(textoRespuesta));
        }
    );
}

const actualizaSalsa= (req, res) => {
    const idSalsa = req.params.idSalsa;
    const { nombreSalsa } = req.body;
    pool.query(
        'UPDATE preesppropro.salsa SET descripcion=$1 WHERE id=$2 RETURNING *',
        [idSalsa, nombreSalsa],
        (error, results) => {
            if (error) {
                throw error;
            }
            textoRespuesta = '{"respuesta": "Se actualizó tamaño_pizza: ' + results.rows[0].id + '"}';
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
            textoRespuesta = '{"respuesta": "Se eliminó ' + results.rowCount + ' tamanio_pizza: ' + idSalsa + '"}';
            res.status(201).json(JSON.parse(textoRespuesta));
        }
    );
}

module.exports = {
    getListaSalsas,
    getSalsa,
    insertaSalsa,
    actualizaSalsa,
    eliminaSalsa
}