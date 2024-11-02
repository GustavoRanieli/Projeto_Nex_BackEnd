const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../models/token'); // Middleware de autenticação

// Importa o controlador de vendas
const controllerSales = require('../models/sales');

// Rota para inserir dados de um arquivo XLS
router.post('/insertXls', controllerSales.inputXls);

// Rota para filtrar vendas para administradores
router.post('/filterAdmin', controllerSales.filterAdmin);

// Rota para filtrar vendas para um usuário comum, protegida com autenticação
router.post('/filterComumUser', authenticateToken, controllerSales.filterComumUser);

// Rota para consultar todas as vendas como administrador
router.get('/consultSalesAdmin', controllerSales.consultAdmin);

// Rota para consultar vendas específicas de um usuário, com autenticação
router.get('/consultSalesUser', authenticateToken, controllerSales.consultSalesUser);

module.exports = router;
