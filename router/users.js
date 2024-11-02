const express = require('express');
const router = express.Router();
const { logout, authenticateToken } = require('../models/token'); // Importa middleware de autenticação e função de logout
const controllerUser = require('../models/users'); // Importa o controlador de usuário

// Rota para login de usuário
router.post('/loginUser', controllerUser.login);

// Rota para criar um novo usuário
router.post('/createUser', controllerUser.addUser);

// Rota para consultar informações do usuário logado
router.get('/consultUser', authenticateToken, controllerUser.consultUser);

// Rota para logout do usuário
router.get('/logoutUser', logout);

module.exports = router; // Exporta o router com as rotas definidas
