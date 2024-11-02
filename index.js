const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

// Configs
app.use(bodyParser.urlencoded({ extended: false })); // Para dados de formulário
app.use(bodyParser.json()); // Para JSON
app.use(cors());


// Routers
const usersRouter = require('./router/users');
const salesRouter = require('./router/sales');


app.use('/usersController', usersRouter);
app.use('/salesController', salesRouter);

app.listen("200", (err) =>{
    if(err){
        console.log("Erro ao abrir o servidor");
    }else{
        console.log("Servidor aberto com sucesso!")
    }
});