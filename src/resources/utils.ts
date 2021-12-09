import { validate as uuidValidate } from 'uuid';
import { DEFAULT_HEADERS } from './constants.js';

const isUuid = (id) => uuidValidate(id);


const responseCodeMesssage = (res, code, message) => {
    res.status(code)
        .header('Content-Type', DEFAULT_HEADERS.TYPE_JSON)
        .send(JSON.stringify(message))    
}

export { isUuid, responseCodeMesssage };