import fastify from "fastify";

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



// fastify.setErrorHandler((err, req, rep) => {
//     console.log(err)
//     rep.status(err.status || 500).send(err)
// })