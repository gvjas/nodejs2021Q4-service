import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import process from 'process';
import path from "path";
import fs from "fs";

import { DEFAULT_HEADERS, HTTP_STATUS_CODES } from "./resources/constants";

/**
 * create logs directory
 * @param path - logs directory
 * @param options - options
 * @param callback - for the error
 */
fs.mkdir(path.resolve('./logs'), { recursive: true }, (err): void => {
  if (err) throw err;
});

/**
 * @remarks
 * The correct use of 'uncaughtException' is to perform synchronous cleanup 
 * of allocated resources (e.g. file descriptors, handles, etc) before shutting down the process. 
 * Logging to the process.stderr and file
 * @param err -  <Error> The uncaught exception
 * @param origin - Indicates if the exception originates from an unhandled rejection or from an synchronous error. 
 */
process.on('uncaughtException', (err: Error, origin: string): void => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`
  );
  fs.writeFileSync(
    path.resolve('./logs/uncaughtException.crash.log'),
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`
  );
  process.exit(1)
});

/**
 * @remarks
 * not commenting for the check 'uncaughtException'
 */
// throw Error('Oops!')

setTimeout(() => {
  console.log('This will still run.');
}, 1500);

/**
 * @remarks
 * event is useful for detecting and 
 * keeping track of promises that were rejected whose rejections have not yet been handled
 * Logging to the process.stderr and file
 * @param reason - <Error> The object with which the promise was rejected (typically an Error object).
 * @param promise - <Promise> The rejected promise
 */
process.on('unhandledRejection', <T>(reason: Error, promise: Promise<T>): void => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    fs.writeFileSync(
      path.resolve('./logs/unhandledRejection.crash.log'),
      `Unhandled Rejection at: ${promise}, reason:, ${reason}`
    );
    process.exit(1)
  });
 
/**
 * @remarks
 * not commenting for the check 'unhandledRejection'
 */
// Promise.reject(Error('Oops!'));

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

/**
 * @remarks
 * Handler for error's server response
 * @param err - the fastify error object
 * @param req - the fastify request object
 * @param rep - the fastify reply object
 * @returns type promise void
 */

export const errorHandler = async (err: FastifyError, req: FastifyRequest, rep: FastifyReply): Promise<void> => {
  responseCodeMesssage(rep, err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      {error: err.message})
}
