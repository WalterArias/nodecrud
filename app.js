let express = require('express');
let app =express();


app.use('/',require('./routes'));

app.listen('4000', ()=>{
    console.log('Servidor ejecutandose en http://localhost:4000')
});   







