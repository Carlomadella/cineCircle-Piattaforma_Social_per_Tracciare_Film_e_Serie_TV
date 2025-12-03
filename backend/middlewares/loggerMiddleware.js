// middlewares/loggerMiddleware.js

const logger = function(req, res, next) {
    const data = new Date().toISOString();
    const metodo = req.method; // GET, POST, ecc.
    const url = req.originalUrl; // /api/contents

    console.log(`[${data}] ${metodo} ${url}`);

    // Fondamentale: passa al prossimo middleware o controller
    next(); 
};

module.exports = logger;