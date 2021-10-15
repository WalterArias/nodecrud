const express = require('express');
const cors = require('cors');
const route = express.Router(); //instanciamos el constructor de express
const conexion = require('./database/bd');
route.use(express.json());  //activamos uso de json
route.use(cors());


route.get('/',(req,res)=>{
    res.send('bienvenido a mi APP');
})
route.get('/api/articulos', (req, res) => {   
    conexion.query('SELECT * FROM articulo', (error,datos) => {
        if (error) {
            throw error;
        } else {
            res.send(datos);
        }
    }); 
});


//consultar un articulo
route.get('/api/articulos/:id', (req, res) => {
    conexion.query('SELECT * FROM articulo where id = ?',[req.params.id] ,(error, dato)=> {
        if (error) {
            throw error;
        } else {
            // res.send(dato);
            res.send(dato[0].detalle);
        }
    });
});
 
 //Insertar articulo

 route.post('/api/articulos/',(req,res)=>{
    let data = {detalle:req.body.detalle, precio:req.body.precio,stock:req.body.stock};
    let sql = "INSERT INTO articulo SET  ?"
    conexion.query(sql,data,(error, resultado)=>{
        if (error) {
            throw error;
        } else {           
            res.send(resultado);
        }

    })
 });

 //editar articulo

 route.put('/api/articulos/:id', (req, res)=>{
     let id =req.params.id;
     let detalle = req.body.detalle;
     let precio = req.body.precio;
     let stock = req.body.stock;
     let sql = "UPDATE articulo SET  detalle = ?, precio = ?, stock = ? WHERE id = ?";
     conexion.query(sql, [detalle, precio, stock,id], (error,resultado)=>{
        if (error) {
            throw error;
        } else {           
            res.send(resultado);
        }
     });
 });


 //borrar articulo
 route.delete('/api/articulos/:id', (req, res)=>{
     let sql = "DELETE FROM articulo where id = ?";
     conexion.query(sql, [req.params.id],(error,resultado)=>{
        if (error) {
            throw error;
        } else {           
            res.send(resultado);
        }
     })
 });


 module.exports = route;