const quizData = {
    1: {
        title: "What is Money?",
        questions: [
            {
                q: "What is money primarily used for?",
                options: ["To play games 🎮", "To trade for things we need and want 💰", "To decorate our rooms 🎨", "To build houses 🏠"],
                correct: 1,
                explanation: "Money is a tool we use to trade for goods and services we need and want! 💰"
            },
            {
                q: "Which of these is the BEST thing to do when you get $10?",
                options: ["Spend it all on candy immediately 🍬", "Burn it 🔥", "Save some and spend some wisely 💡", "Give it all away 🎁"],
                correct: 2,
                explanation: "Smart! Saving some and spending wisely is how you build good money habits! 💡"
            },
            {
                q: "A piggy bank helps you...",
                options: ["Make friends with pigs 🐷", "Cook food 🍳", "Save money safely 🏦", "Play music 🎵"],
                correct: 2,
                explanation: "A piggy bank is a classic savings tool — every coin adds up! 🐷💰"
            }
        ]
    },
    2: {
        title: "Saving",
        questions: [
            {
                q: "You have $20. You want a $15 toy. What should you do?",
                options: ["Buy the toy and 2 candies 🍬", "Save $10 and buy candies with $10 🍬", "Save $18 and spend $2 wisely 💰", "Spend all $20 on games 🎮"],
                correct: 2,
                explanation: "Saving most of your money and spending a little wisely is the smart move! 💰"
            },
            {
                q: "What does 'saving' mean?",
                options: ["Saving a video game 🎮", "Setting money aside for later 🏦", "Spending money fast 💸", "Giving money away 🎁"],
                correct: 1,
                explanation: "Saving means putting money away now so you can use it for something important later! 🏦"
            },
            {
                q: "Why is saving money important?",
                options: ["It isn't important 🤷", "For emergencies and big goals 🎯", "To show off to friends 😎", "Because banks are fun 🏦"],
                correct: 1,
                explanation: "Saving helps you handle emergencies and reach big goals like buying something special! 🎯"
            }
        ]
    }
};

exports.getQuiz = (req, res) => {
    const lessonId = parseInt(req.query.lesson) || 1;
    const quiz = quizData[lessonId] || quizData[1];
    res.render('quiz', { quiz, lessonId });
};

exports.getQuizData = (req, res) => {
    const lessonId = parseInt(req.params.id) || 1;
    const quiz = quizData[lessonId] || quizData[1];
    res.json({ success: true, quiz });
};
