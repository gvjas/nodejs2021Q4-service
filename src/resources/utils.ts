// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'uuid... Remove this comment to see the full error message
import { validate as uuidValidate } from 'uuid';
import { DEFAULT_HEADERS } from './constants.js';

const isUuid = (id: any) => uuidValidate(id);


const responseCodeMesssage = (res: any, code: any, message: any) => {
    res.status(code)
        .header('Content-Type', DEFAULT_HEADERS.TYPE_JSON)
        .send(JSON.stringify(message))    
}

export { isUuid, responseCodeMesssage };