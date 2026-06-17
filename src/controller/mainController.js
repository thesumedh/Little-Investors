const axios = require('axios');

const FALLBACK_STOCKS = {
    aapl: { price: 226.80, change: 1.13, changePercent: 0.50, direction: "up" },
    amzn: { price: 186.51, change: 4.55, changePercent: 2.50, direction: "up" },
    wmt: { price: 80.94, change: 0.51, changePercent: 0.60, direction: "up" },
    tsla: { price: 180.20, change: -1.45, changePercent: -0.80, direction: "down" },
    googl: { price: 175.40, change: 2.10, changePercent: 1.21, direction: "up" },
    msft: { price: 420.10, change: 3.50, changePercent: 0.84, direction: "up" }
};

const fetchYahooStock = async (symbol) => {
    try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 6000
        });
        const meta = response.data?.chart?.result?.[0]?.meta;
        if (!meta) return null;
        
        const price = meta.regularMarketPrice;
        const prevClose = meta.chartPreviousClose || price;
        const change = price - prevClose;
        const changePercent = (change / prevClose) * 100;
        
        return {
            price: Math.round(price * 100) / 100,
            change: Math.round(change * 100) / 100,
            changePercent: Math.round(changePercent * 100) / 100,
            direction: change >= 0 ? 'up' : 'down'
        };
    } catch (e) {
        console.error(`Error fetching ${symbol} from Yahoo Finance:`, e.message);
        return null;
    }
};

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

const profile = async (req, res) => {
    res.render('profile');
};

const getLiveStocks = async (req, res) => {
    const symbols = { aapl: 'AAPL', amzn: 'AMZN', wmt: 'WMT', tsla: 'TSLA', googl: 'GOOGL', msft: 'MSFT' };
    const result = {};

    for (const [key, sym] of Object.entries(symbols)) {
        const data = await fetchYahooStock(sym);
        if (data) {
            result[key] = data;
        } else {
            result[key] = FALLBACK_STOCKS[key];
        }
    }

    res.json({ success: true, stocks: result });
};

module.exports = { home, landing, courses, chatbot, course, parent, profile, getLiveStocks };