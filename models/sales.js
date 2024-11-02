const knex = require('knex');
const logger = require('../configs/winston');

// Configuração do banco de dados
const config = require('../configs/knex');
const db = knex(config);

// Converte a data para o formato YYYY-MM-DD
const convertDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
};

class salesController {

    // Insere dados de vendas no banco a partir de um JSON recebido
    async inputXls(req, res) {
        const jsonbody = req.body;
        try {
            for (let row of jsonbody) {
                // Insere cada linha de dados no banco de dados 'vendas_nex'
                await db('vendas_nex').insert({
                    fk_user_cpf: row['CPF'],
                    product_name: row['Descrição da transação'],
                    date: convertDate(row['Data da transação']),
                    points: row['Valor em pontos'],
                    product_value: row['Valor'],
                    status: row['Status'],
                });
            }
            res.status(200).json({ message: 'Dados inseridos com sucesso' });
        } catch (error) {
            logger.error('Erro ao inserir xls no banco de dados!')
            console.log({ file: 'sales.js', line: '19', error })
            res.status(500).json({ error: 'Erro ao inserir dados' });
        }
    }

    // Consulta todas as vendas para administração
    async consultAdmin(req, res) {
        try {
            const salesAdmin = await db('vendas_nex').select('*');
            res.status(200).json({ message: 'Dados consultados com sucesso', salesAdmin });
        } catch (error) {
            logger.error('Erro ao consultar banco ADMIN')
            console.log({ file: 'sales.js', line: '41', error })
        }
    }

    // Consulta as vendas de um usuário específico e calcula pontos e valor total
    async consultSalesUser(req, res) {
        try {
            const user = await db('usuarios_nex').where('_id', req.user.id).first();
            const salesUser = await db('vendas_nex').where('fk_user_cpf', user.cpf);
            // Calcula total de pontos e valor dos produtos
            const points = salesUser.reduce((total, item) => total + (item.points || 0), 0);
            const salesValor = salesUser.reduce((total, item) => total + (item.product_value || 0), 0);
            res.status(200).json({ message: 'Dados consultados com sucesso', salesUser, infoUser: { points, salesValor } });
        } catch (error) {
            logger.error('Erro ao consultar e validar informações do usuário comum')
            console.log({ file: 'sales.js', line: '52', error })
        }
    }

    // Filtra vendas administradas com base em um critério de busca e valor
    async filterAdmin(req, res) {
        try {
            const { filter, value } = req.body;
            if (value === '') {
                const salesAdmin = await db('vendas_nex').select('*');
                res.status(200).json({ message: 'Dados consultados com sucesso', salesAdmin });
            }
            // Aplica filtro no banco de dados usando 'like' para pesquisa parcial
            const salesAdmin = await db('vendas_nex').where(filter, 'like', `%${value}%`);
            res.status(200).json({ message: 'Dados consultados com sucesso', salesAdmin });
        } catch (error) {
            logger.error('Erro ao validar informações de filtro ADMIN')
            console.log({ file: 'sales.js', line: '67', error })
        }
    }

    // Filtra vendas para um usuário específico com base em critério e valor de busca
    async filterComumUser(req, res) {
        try {
            const { filter, value } = req.body;
            const user = await db('usuarios_nex').where('_id', req.user.id).first();

            if (value === '') { // Se estiver vazio retorna todos os dados do usuário
                const salesUser = await db('vendas_nex').where('fk_user_cpf', user.cpf);
                res.status(200).json({ message: 'Dados consultados com sucesso', salesUser });
            }

            // Aplica filtro no banco e faz pesquisa parcial
            const salesUser = await db('vendas_nex').where('fk_user_cpf', user.cpf).andWhere(filter, 'like', `%${value}%`);
            res.status(200).json({ message: 'Dados consultados com sucesso', salesUser });
        } catch (error) {
            logger.error('Erro ao filtrar informações do usuário comum')
            console.log({ file: 'sales.js', line: '84', error })
        }
    }
};

module.exports = new salesController;
