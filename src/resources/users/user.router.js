// const fastify = require('express').Router();

const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

const userRouter = async (fastify)=> {
  fastify.get('/users', async (req, res) => {
    // res.send('Hello world');
    try {  
      const users = await usersService.getAll();
        // map user fields to exclude secret fields like "password"
      res.send(users.map(User.toResponse));
    } catch (e) {
      res.status(500, {'Content-Type':'application/json'}).send(e)
    }
  });

  fastify.get('/users/:id', async (req, res) => {
    try {
      const { id } = req.params
      const user = await usersService.getById(id);
      if (!user) {
        res.status(404).send({'Bad Request': 'Id Not Found'});
      } else {
        res.send(User.toResponse(user));
      }
      
    } catch (e) {
      res.status(500).send(e)
    }
  });


  fastify.post('/users', async (req, res) => {
    try {
      const { name, login, password } = req.body
      const post = await usersService.pushDB(new User({ name, login, password }))
      res.status(201).send(User.toResponse(post));
    } catch (e) {
      res.status(500).send(e)
    }

  });

  fastify.put(`/users/:id`, async (req, res) => {
    try {
      const { id } = req.params
      const userById = await usersService.getById(id);
      if (!userById) {
        res.status(404).send({'Bad Request': 'Id Not Found'});
      } else {
        const { name, login, password } = req.body
        const user = { id, name, login, password }
        const updateUser = await usersService.update(user)
        res.send(User.toResponse(updateUser));
      }
    } catch (e) {
      res.status(500).send(e)
    }
  
  });

  fastify.delete(`/users/:id`, async (req, res) => {
    try {
      
      const { id } = req.params
      const user = await usersService.getById(id);
      if (!user) {
        res.status(404).send({'Bad Request': 'Id Not Found'});
      } else {
        await usersService.del(id)
        await tasksService.setUserNull(id)
        res.status(204)
        res.send()
      }
    } catch (e) {
      res.status(500).send(e)
    }
  
  });

}


module.exports = userRouter;
