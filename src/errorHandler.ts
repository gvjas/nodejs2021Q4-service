import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import process from 'process';
import path from "path";
import fs, { createWriteStream } from "fs";

import { DEFAULT_HEADERS, HTTP_RESPOSE_MESSAGES, HTTP_STATUS_CODES } from "./resources/constants";


// setInterval(() => {console.log('Still working...'), 1000})

process.on('uncaughtException', (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`
  );
  fs.writeFileSync(
    path.resolve('./logs/error-crash.log'),
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`
  );
  process.exit(1)
});

// throw Error('Oops!')

setTimeout(() => {
  console.log('This will still run.');
}, 1500);

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    fs.writeFileSync(
      path.resolve('./logs/error-crash.log'),
      `Unhandled Rejection at: ${promise}, reason:, ${reason}`
    );
    process.exit(1)
    // Application specific logging, throwing an error, or other logic here
  });
  
Promise.reject(Error('Oops!'));

export type ResponseMessage = {[key: string]: string}

/**
 * @remarks
 * Handler for server response
 * @typeParam T - response body
 * @param res - the fastify reply object
 * @param code - numeric server response
 * @param message - object for the response code
 * @returns type void
 */
export const responseCodeMesssage = async <T>(res: FastifyReply, code: number, message: T | ResponseMessage): Promise<void> => {
  res.status(code)
      .header('Content-Type', DEFAULT_HEADERS.TYPE_JSON)
      .send(JSON.stringify(message))    
}

export const errorHandler = async (err: FastifyError, req: FastifyRequest, rep: FastifyReply): Promise<void> => {
      responseCodeMesssage(rep, err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          {error: err.message})
}
