// const fastify = require('express').Router();

const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

const boardRouter = async (fastify)=> {
  fastify.get('/boards', async (req, res) => {
    // res.send('Hello world');
    try {  
      const boards = await boardsService.getAll();
        // map board fields to exclude secret fields like "password"
      res.send(boards.map(Board.toResponse));
    } catch (e) {
      res.status(500).send(e)
    }
  });

  fastify.get('/boards/:id', async (req, res) => {
    try {
      const { id } = req.params
      const board = await boardsService.getById(id);
      if (!board) {
        res.status(404).send({'Bad Request': 'Id Not Found'});
      } else {
        res.send(board);
      }
      
    } catch (e) {
      res.status(500).send(e)
    }
  });


  fastify.post('/boards', async (req, res) => {
    try {
      const { title, columns } = req.body
      const post = await boardsService.pushDB(new Board({title, columns}))
      res.status(201).send(post)
    } catch (e) {
      res.status(500).send(e)
    }

  });

  fastify.put(`/boards/:id`, async (req, res) => {
    try {
      const { id } = req.params
      const boardById = await boardsService.getById(id);
      if (!boardById) {
        res.status(404).send({'Bad Request': 'Id Not Found'});
      } else {
        const { title, columns } = req.body
        const board = { id, title, columns }        
        const updateBoard = await boardsService.update(board)
        res.send(updateBoard)
      }
    } catch (e) {
      res.status(500).send(e)
    }
  
  });

  fastify.delete(`/boards/:id`, async (req, res) => {
    try {      
      const { id } = req.params
      const board = await boardsService.getById(id);
      if (!board) {
        res.status(404).send({'Bad Request': 'Id Not Found'});
      } else {
        await tasksService.delAll(id)
        await boardsService.del(id)
        res.status(204)
        res.send()
      }
    } catch (e) {
      res.status(500).send(e)
    }
  
  });

}


module.exports = boardRouter;
