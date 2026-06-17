const axios = require('axios');

const home = async (req, res) => {
    res.render('home');
};

const landing = async (req, res) => {
    res.render('landing');
};

const courses = async (req, res) => {
    res.render('courses');
};

const chatbot = async (req, res) => {
    res.render('chatbot');
};

const course = async (req, res) => {
    const lessonId = parseInt(req.query.lesson) || 1;
    const lessons = {
        1: {
            id: 1,
            title: "What is Money?",
            description: "When you get some money, you don't have to spend it all right away! You can put some of it in a special place, like a piggy bank or a savings jar. This way, you have money for later when you want something big, like a new toy.",
            videoId: "0iRbD5rM5qc",
            xp: 100,
            upNext: "Saving — How to Stack Your Coins"
        },
        2: {
            id: 2,
            title: "Saving — How to Stack Your Coins",
            description: "Saving is one of the most powerful money habits you can build! When you save a little bit every time you get money, it adds up fast. Think of it like leveling up in a video game — every coin matters!",
            videoId: "PnFbr_3LNZk",
            xp: 120,
            upNext: "Spending Wisely"
        }
    };
    const lesson = lessons[lessonId] || lessons[1];
    res.render('course', { lesson });
};

const parent = async (req, res) => {
    res.render('parent');
};

module.exports = { home, landing, courses, chatbot, course, parent };