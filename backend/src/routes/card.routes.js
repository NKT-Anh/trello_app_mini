const cardController = require('../controllers/card.controller');
const express = require('express');
const router = express.Router({ mergeParams: true });

router.post('/', cardController.createNewCard);
router.get('/', cardController.getAllCards);
router.get('/:id', cardController.getCardById);
router.put('/:id', cardController.updateCardById);
router.delete('/:id', cardController.deleteCardById);

router.get('/user/:id', cardController.getCardsByUserId);
router.post('/:id/invite/accept', cardController.acceptOrRejectInvite);

module.exports = router;