const uuidValidate = require('uuid').validate

const { DEFAULT_HEADERS } = require('./constants');

const isUuid = (id) => uuidValidate(id);


const responseCodeMesssage = (res, code, message) => {
    res.status(code)
        .header('Content-Type', DEFAULT_HEADERS.TYPE_JSON)
        .send(JSON.stringify(message))    
}

module.exports = { isUuid, responseCodeMesssage }