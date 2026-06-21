const express = require('express');
const router = express.Router();

const boardRoutes = require('./board.routes.js');
const authRoutes = require('./auth.routes.js');
const CardRoutes = require('./card.routes.js');
const taskRoutes = require('./task.routes.js');
const middlewares = require('../middlewares/index.middlewares.js');
const route = (app) => {
    
    
    app.use('/api/auth', authRoutes);
    app.use(middlewares.decodeToken);
    app.use('/api/boards', boardRoutes);
    app.use('/api/boards/:boardId/cards', CardRoutes);
    app.use('/api/boards/:boardId/cards/:cardId/tasks', taskRoutes);
}
module.exports = route;