

const express = require('express');
const router = express.Router();
const movieController = require('../controller/movie');

router.get('/favorites', movieController.getAll);
router.post('/favorites', movieController.create);
// router.get('/favorites/:movieId', movieController.getById);
router.delete('/favorites/:movieId', movieController.deleteById);

module.exports = router;
