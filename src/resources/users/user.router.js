
const { HTTP_STATUS_CODES, HTTP_RESPOSE_MESSAGES } = require('../constants');
const { responseCodeMesssage, isUuid } = require('../utils')
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

const getItems = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            name: {type: 'string'},
            login: {type: 'string'},
          }
        }
      }

    }
  }
}

const userRouter = async (fastify) => {

  fastify.addContentTypeParser('application/json', async (request, payload, done) => {
    
    let res = '';
    try {
      const buffers = []; 
      /* eslint-disable-next-line */   
      for await (const chunk of payload) {
        buffers.push(chunk);
      }
      res = JSON.parse(Buffer.concat(buffers).toString())
    } catch (err) {
      err.statusCode = HTTP_STATUS_CODES.NOT_VALID
      done(HTTP_RESPOSE_MESSAGES.NOT_JSON, undefined)
    }
    return res
  })
  // fastify.route({
  //   // method: 'POST',
  //   url: '/users'
  //   // handler: (req, res) => {
  //   //   req.body.on('data', d => console.log(11111111111, d)) // log every incoming object
  //   // }
  // })

  fastify.get('/users', getItems, async (req, res) => {
    try {  
      const users = await usersService.getAll();
        // map user fields to exclude secret fields like "password"
      res.send(users)
      // responseCodeMesssage(res, HTTP_STATUS_CODES.OK, users.map(User.toResponse))
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  });

  fastify.get('/users/:id', async (req, res) => {
    try {
      const { id } = req.params
      if (!isUuid(id)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      }
      const user = await usersService.getById(id);
      if (!user) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND)
      } else {
        responseCodeMesssage(res, HTTP_STATUS_CODES.OK, User.toResponse(user));
      }      
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  });


  fastify.post('/users', async (req, res) => {
    try {
      const { name, login, password } = req.body
      const post = await usersService.pushDB(new User({ name, login, password }))
      responseCodeMesssage(res, HTTP_STATUS_CODES.CREATED, User.toResponse(post));
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  });

  fastify.put(`/users/:id`, async (req, res) => {
    try {
      const { id } = req.params
      if (!isUuid(id)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      } 
      const userById = await usersService.getById(id);
      if (!userById) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND);
      } else {
        const { name, login, password } = req.body
        const user = { id, name, login, password }
        const updateUser = await usersService.update(user)
        responseCodeMesssage(res, HTTP_STATUS_CODES.OK, User.toResponse(updateUser));
      }
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  
  });

  fastify.delete(`/users/:id`, async (req, res) => {
    try {
      const { id } = req.params
      if (!isUuid(id)) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_VALID,
          HTTP_RESPOSE_MESSAGES.NOT_VALID)
      } 
      const user = await usersService.getById(id);
      if (!user) {
        responseCodeMesssage(res, HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_RESPOSE_MESSAGES.NOT_FOUND);
      } else {
        await usersService.del(id)
        await tasksService.setUserNull(id)
        res.status(HTTP_STATUS_CODES.DELETED)
        res.send()
      }
    } catch (e) {
      responseCodeMesssage(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_RESPOSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
  
  });

}


module.exports = userRouter;
