import { validate as uuidValidate } from 'uuid';
import { DEFAULT_HEADERS } from './constants';

const isUuid = (id: any) => uuidValidate(id);

const responseCodeMesssage = (res: any, code: any, message: any) => {
    res.status(code)
        .header('Content-Type', DEFAULT_HEADERS.TYPE_JSON)
        .send(JSON.stringify(message))    
}

export { isUuid, responseCodeMesssage };