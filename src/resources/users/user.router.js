const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {  
    const users = await usersService.getAll();
      // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  } catch (e) {
    res.status(500).json(e)
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params
    const user = await usersService.getById(id);
    if (!user) {
      res.status(404).json({'Bad Request': 'Id Not Found'});
    } else {
      res.json(user);
    }
    
  } catch (e) {
    res.status(500).json(e)
  }
});


router.route('/').post(async (req, res) => {
  try {
    const { name, login } = req.body
    const post = await usersService.pushDB(new User({name, login}))
    res.status(201).json(post)
  } catch (e) {
    res.status(500).json(e)
  }

});

router.route(`/:id`).put(async (req, res) => {
  try {
    const { id } = req.params
    const userById = await usersService.getById(id);
    if (!userById) {
      res.status(404).json({'Bad Request': 'Id Not Found'});
    } else {
      const { name, login } = req.body
      const user = { id, name, login }
      const updateUser = await usersService.update(user)
      res.json(updateUser)
    }
  } catch (e) {
    res.status(500).json(e)
  }
 
});

router.route(`/:id`).delete(async (req, res) => {
  try {
    
    const { id } = req.params
    const user = await usersService.getById(id);
    if (!user) {
      res.status(404).json({'Bad Request': 'Id Not Found'});
    } else {
      await usersService.del(id)
      res.status(204)
      res.end()
    }
  } catch (e) {
    res.status(500).json(e)
  }
 
});

module.exports = router;
