// const fastify = require('express').Router();

const Task = require('./task.model');
const tasksService = require('./task.service');
const boardsService = require('../boards/board.service.js')

const taskRouter = async (fastify)=> {
  fastify.get('/boards/:boardId/tasks', async (req, res) => {
      
    try {  
      const { boardId } = req.params
      const tasks = await tasksService.getAll(boardId);
      if (tasks.length === 0) {
        res.status(404).send({'Bad Request': 'Board Id Not Found'});
      } else {
        res.send(tasks.map(Task.toResponse));
      }
      
    } catch (e) {
      res.status(500).send(e)
    }
  });

  fastify.get('/boards/:boardId/tasks/:id', async (req, res) => {
    try {
      const { id, boardId } = req.params
      const tasks = await tasksService.getAll(boardId);
      const task = await tasksService.getById(id);
      if (tasks.length === 0) {
        res.status(404).send({'Bad Request': 'Board Id Not Found'});
      } else if (!task) {
        res.status(404).send({'Bad Request': 'Id Not Found'});
      } else {
        res.send(task);
      }
      
    } catch (e) {
      res.status(500).send(e)
    }
  });


  fastify.post('/boards/:boardId/tasks', async (req, res) => {
    try {
      const { boardId } = req.params
      const tasks = await boardsService.getAll(boardId);
      if (tasks.length === 0) {
        res.status(404).send({'Bad Request': 'Board Id Not Found'});
      } else {
        const { 
          title, 
          order, 
          description, 
          userId,
          columnId 
        } = req.body
        const post = await tasksService.pushDB(new Task({ 
                                                              title, 
                                                              order, 
                                                              description, 
                                                              userId,
                                                              boardId, 
                                                              columnId 
                                                            }))
        res.status(201).send(post)
      }

    } catch (e) {
      res.status(500).send(e)
    }

  });

  fastify.put(`/boards/:boardId/tasks/:id`, async (req, res) => {
    try {
      const { id, boardId } = req.params
      const tasks = await tasksService.getAll(boardId);
      const task = await tasksService.getById(id);
      if (tasks.length === 0) {
        res.status(404).send({'Bad Request': 'Board Id Not Found'});
      } else if (!task) {
        res.status(404).send({'Bad Request': 'Id Not Found'});
      } else {
        const { 
          title, 
          order, 
          description, 
          userId,
          columnId 
        } = req.body
        const taskBody = { id, 
                                                    title, 
                                                    order, 
                                                    description, 
                                                    userId,
                                                    boardId, 
                                                    columnId }        
        const updateTask = await tasksService.update(taskBody)
        res.send(updateTask)
      }
    } catch (e) {
      res.status(500).send(e)
    }
  
  });

  fastify.delete(`/boards/:boardId/tasks/:id`, async (req, res) => {
    try {
      const { id, boardId } = req.params
      const tasks = await tasksService.getAll(boardId);
      const task = await tasksService.getById(id);
      if (tasks.length === 0) {
        res.status(404).send({'Bad Request': 'Board Id Not Found'});
      } else if (!task) {
        res.status(404).send({'Bad Request': 'Id Not Found'});
      } else {
        await tasksService.del(id)
        res.status(204)
        res.send()
      }
    } catch (e) {
      res.status(500).send(e)
    }
  
  });

}


module.exports = taskRouter;
