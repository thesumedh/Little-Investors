const express = require('express');
const route = express.Router();
const mainController = require('../controller/mainController');
const chatController = require('../controller/chatController');
const quizController = require('../controller/quizController');

// API routes
route.post('/api/chat', chatController.handleChat);
route.get('/api/quiz/:id', quizController.getQuizData);
route.get('/api/stocks', mainController.getLiveStocks);

// Page routes
route.get('/', mainController.landing);
route.get('/home', mainController.home);
route.get('/courses', mainController.courses);
route.get('/chatbot', mainController.chatbot);
route.get('/course', mainController.course);
route.get('/quiz', quizController.getQuiz);
route.get('/parent', mainController.parent);
route.get('/profile', mainController.profile);


// Catch-all
route.all('/*', (req, res) => {
    res.status(404).redirect('/');
});

module.exports = route;
