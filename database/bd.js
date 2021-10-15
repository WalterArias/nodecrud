const mysql = require('mysql');
//parametros de conexion con la BD
 const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ejemploapi'
}); 
/* const conexion = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bfab45c40de209',
    password: 'b4d0e035',
    database: 'heroku_8132a5337e24aa6'
}); */

//mysql://bfab45c40de209:b4d0e035@us-cdbr-east-04.cleardb.com/heroku_8132a5337e24aa6?reconnect=true
//cleardb-triangular-48691

// Test de la conexion
conexion.connect((error) => {
    if (error) {
        throw error;
    } else {
        console.log('conexion a la BD exitosa');
    }
});

module.exports = conexion;