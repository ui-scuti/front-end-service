module.exports = errorHandler;
const { log } = require('../log');
function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        log.info(`Invalid Token: ${JSON.stringify(err)}`)
        return res.status(401).json({ message: `Invalid Token: ${JSON.stringify(err)}` });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}