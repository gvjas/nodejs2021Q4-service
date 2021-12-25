import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";

// function errorHandler() {
//     var env = process.env.NODE_ENV || 'development';
    // В программном обеспечении промежуточного уровня 
    // для обработки ошибок определено четыре аргумента
    // return function(err: string, req: string, res: string, next: string) {
  
    //    res.statusCode = 500;
    //    switch (env) {
    //       // Компонент errorHandler ведет себя по-разному
    //       // в зависимости от значения переменной NODE_ENV
    //       case 'development':
    //          res.setHeader('Content-Type', 'application/json');
    //          res.end(JSON.stringify(err));
    //          break;
    //       default:
    //          res.end('Server error');
    //    }
    // }
//  }
// export type CustomError = FastifyError<{
//     status: number
//   }> 

import process from 'process';
import fs, { createWriteStream } from "fs";
import { HTTP_RESPOSE_MESSAGES, HTTP_STATUS_CODES } from "./resources/constants";

process.on('uncaughtException', (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`
  );
  process.exit(1)
});

// throw Error('Oops!')

setTimeout(() => {
  console.log('This will still run.');
}, 500);

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1)
    // Application specific logging, throwing an error, or other logic here
  });
  
Promise.reject(Error('Oops!'));
//   somePromise.then((res) => {
//     return reportToUser(JSON.pasre(res)); // Note the typo (`pasre`)
//   }); // No `.catch()` or `.then()`


export const errorHandler = async (err: FastifyError, req: FastifyRequest, rep: FastifyReply): Promise<void> => {
    // if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND')
    console.log(111111111111111111111111111111111, err)
    // fs.writeFileSync('error.log', err.message)
    // await process.stdout.pipe(fs.writeSync(
    //     null,
    //     `Caught exception: ${err}\n` +
    //     `Exception origin: ${origin}`
    //   );)
    // await createWriteStream('error.)
    rep.status(err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({ err: HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR })
}

// fastify.setErrorHandler((err, req, rep) => {
//     console.log(err)
//     rep.status(err.status || 500).send(err)
// })