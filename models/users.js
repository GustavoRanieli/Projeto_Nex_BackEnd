const jwt = require('jsonwebtoken');
const knex = require('knex');
const bcrypt = require('bcrypt');
const logger = require('../configs/winston');

// Configuração do banco de dados
const config = require('../configs/knex');
const db = knex(config);

// Função para verificar se o usuário já está cadastrado pelo CPF
async function verifyUser(cpf) {
    try {
        const result = await db('usuarios_nex').where('cpf', cpf).first();
        return !!result; // Retorna true se o usuário existir, caso contrário false
    } catch (error) {
        logger.error('Erro ao verificar se o usuário já esta cadastrado');
        console.log({ file: 'user.js', line: '11', error})
        return false;
    }
}

class usersController {

    // Função para cadastrar um novo usuário
    async addUser(req, res) {
        const newUser = {
            name: req.body.name,
            cpf: req.body.cpf,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8), // Criptografa a senha
            function: req.body.user_type,
        };

        // Verifica se o usuário já está cadastrado pelo CPF
        const userExists = await verifyUser(newUser.cpf);
        if (!userExists) {
            try {
                await db('usuarios_nex').insert(newUser);
                logger.info("Usuário cadastrado com sucesso!");
                res.json({ success: true, message: "Usuário cadastrado com sucesso!" });
            } catch (error) {
                logger.error("Erro ao cadastrar usuário!");
                console.log({ file: 'user.js', line: '36', error })
                res.json({ success: false, message: "Erro ao cadastrar usuário!" });
            }
        } else {
            res.json({ success: false, message: "Usuário já cadastrado!" });
        }
    }

    // Função para realizar login de um usuário
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const result = await db('usuarios_nex').where({ email }).first(); 

            if (!result) {
                return res.status(404).json({ success: false, message: "Usuário não encontrado" });
            }

            // Valida a senha informada
            const passwordIsValid = bcrypt.compareSync(password, result.password);
            if (passwordIsValid) {
                const token = jwt.sign({ id: result._id }, 'password_nex', { expiresIn: '1h' });
                return res.json({ success: true, message: "Tudo certo!", user: token });
            } else {
                return res.json({ success: false, message: "Credenciais incorretas" });
            }
        } catch (error) {
            logger.error('Erro ao validar login do usuário'); // Log do erro
            console.log({ file: 'user.js', line: '54', error })
            return res.status(500).json({ success: false, message: "Erro interno do servidor", err });
        }
    }

    // Função para consultar as informações de um usuário logado
    async consultUser(req, res) {
        try {
            const tokenId = req.user.id;
            const userInfo = await db('usuarios_nex').where('_id', tokenId);
            if (!userInfo) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json(userInfo);
        } catch (error) {
            logger.error('Erro ao consultar usuário');
            console.log({ file: 'user.js', line: '78', error })
            res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
        }
    }
}

module.exports = new usersController; // Exporta o controlador de usuários
