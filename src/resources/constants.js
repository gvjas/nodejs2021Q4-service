const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    DELETED: 204,
    NOT_VALID: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

const HTTP_RESPOSE_MESSAGES = {
    INTERNAL_SERVER_ERROR: {'Error': 'Internal Server Error'},
    NOT_FOUND: { 'Bad Request': 'Id Not Found' },
    NOT_FOUND_BOARD: { 'Bad Request': 'Board Id Not Found' },
    NOT_VALID: { 'Bad Request': 'Id Not Is Uuid'},
    NOT_VALID_BOARD_ID: { 'Bad Request': 'Board Id Not Is Uuid'},
    NOT_JSON: { 'Bad Request': 'Data Not Is JSON'}
}

const DEFAULT_HEADERS = {
    TYPE_JSON: 'application/json; charset=utf-8'
}

module.exports = {HTTP_STATUS_CODES, HTTP_RESPOSE_MESSAGES, DEFAULT_HEADERS}

