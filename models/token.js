const jwt = require('jsonwebtoken');

// Blacklist do Tokens
const blacklist = new Set();

// Middleware para verificar o token JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401);

    // Verifica se o token está na blacklist
    if (blacklist.has(token)) {
        return res.status(403).json({ message: 'Token inválido' });
    };

    jwt.verify(token, 'password_nex', (err, user) => {
        if (err) return res.status(403);
        req.user = user; // Armazenando as informações do usuário no request
        next();
    })
}

function logout( req, res ){
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
        blacklist.add(token) // Adiciona o token à blacklist
        return res.status(200).json({ message: 'Logout realizado com sucesso' });
    }
    res.status(400); // Requisição inválida
}

module.exports = { logout, authenticateToken }