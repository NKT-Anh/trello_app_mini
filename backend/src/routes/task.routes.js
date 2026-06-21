const taskController = require('../controllers/task.controller.js');
const express = require('express');
const router = express.Router({ mergeParams: true });


router.post('/', taskController.createNewTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.taskById);
router.put('/:id', taskController.updateTaskById);
router.delete('/:id', taskController.deleteTaskById);
module.exports = router;