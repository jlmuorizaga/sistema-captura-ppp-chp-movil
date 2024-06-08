const Pool = require('pg').Pool;

//Datos de conexión a base de datos en AWS
//const DB_HOST = process.env.DB_HOST || 'database-1.cgujpjkz4fsl.us-west-1.rds.amazonaws.com';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'cheesepizzauser';
const DB_PASSWORD = process.env.DB_PASSWORD || 'cheesepizza2001';
const DB_NAME = process.env.DB_NAME || 'chppreciosespecprodpromocdb';
//const DB_PORT = process.env.DB_PORT || 5432;
const DB_PORT = process.env.DB_PORT || 5434;

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


const getTamaniosPizza = (request, response) => {
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

module.exports = {
    getTamaniosPizza
}