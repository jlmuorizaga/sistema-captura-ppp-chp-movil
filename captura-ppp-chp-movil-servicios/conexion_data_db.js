const DB_HOST = process.env.DB_HOST || 'database-1.cgujpjkz4fsl.us-west-1.rds.amazonaws.com';
 //const DB_HOST = process.env.DB_HOST || 'localhost';
 const DB_USER = process.env.DB_USER || 'cheesepizzauser';
 const DB_PASSWORD = process.env.DB_PASSWORD || 'cheesepizza2001';
 const DB_NAME = process.env.DB_NAME || 'chppreciosespecprodpromocdb';
 
 //AWS
 const DB_PORT = process.env.DB_PORT || 5432;

 //MacBook
 //const DB_PORT = process.env.DB_PORT || 5432;

 //Laptop Omen
//const DB_PORT = process.env.DB_PORT || 5434;

//Desktop INEGI
//const DB_PORT = process.env.DB_PORT || 5433;

 module.exports={
    DB_HOST, DB_USER,DB_PASSWORD, DB_NAME,DB_PORT
 }