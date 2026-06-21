const express = require('express');
const router = express.Router();

const boardController = require('../controllers/board.controller');
router.post('/', boardController.createNewBoard);
router.get('/', boardController.getAllBoards);
router.get('/:id', boardController.getBoardById);
router.put('/:id', boardController.updateBoardById);
router.delete('/:id', boardController.deleteBoardById);

router.post('/:id/invite', boardController.createInvite);
module.exports = router;