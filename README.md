# 💰 LittleInvestors — Teach Kids to Invest, Together

**Built for:** [Mind the Product — World Product Day "Everyone Ships Now" Hackathon 2026](https://mindtheproduct.devpost.com)

[![Live Demo](https://img.shields.io/badge/Live%20App-little--investors--delta.vercel.app-2AA46A?style=for-the-badge&logo=vercel)](https://little-investors-delta.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Source%20Code-1a2332?style=for-the-badge&logo=github)](https://github.com/thesumedh/Little-Investors)
[![Analytics](https://img.shields.io/badge/Novus.ai-Analytics%20Installed-6366f1?style=for-the-badge)](https://novus.pendo.io)

---

## 🎯 The Problem

Kids don't learn money from textbooks — and most financial literacy apps treat it like homework. Meanwhile, parents want to teach their kids about money but have no tools to do it *together*.

**LittleInvestors bridges that gap:** a parent-child collaborative platform where kids learn by doing — simulating real investments, taking quizzes, chatting with an AI coach — while parents stay in the loop and participate through virtual allowances.

---

## 👥 Who It's For

| User | What They Get |
|---|---|
| 👧 **Kids (8–16)** | Video lessons → quizzes → stock simulator → AI coach → achievements |
| 👨‍👩‍👧 **Parents** | Send virtual allowances, track child's progress, write personalized notes |
| 🤖 **Penny (AI Coach)** | Google Gemini-powered chatbot that answers any money question in kid-friendly language |

---

## 🌟 Features

| Feature | Description |
|---|---|
| 🏠 **Dashboard** | Animated portfolio view, real-time stock prices, buy/sell simulator with sparkline charts |
| 📚 **5 Lessons** | Video-based lessons with XP rewards: Money, Saving, Spending, Risk, Investing |
| 🏆 **Quiz System** | 3-question quizzes after each lesson with confetti on perfect scores |
| 🤖 **Penny AI Coach** | Google Gemini 2.5 Flash — kid-friendly answers, preset question chips, fallback responses |
| 👨‍👩‍👧 **Parent Mode** | Send preset ($5/$10/$20/$50) or custom allowances with personal notes; view activity feed |
| 📈 **Stock Simulator** | Buy/sell Apple, Amazon, Walmart, Tesla, Google, Microsoft with virtual coins |
| 📊 **Live Sparklines** | SVG sparkline charts rendering Yahoo Finance 5-day historical trends |
| 🎖️ **7 Achievements** | Baby Buffett, Quiz Ace, Perfect Score, Level Up, Super Saver, On Fire, First Step |
| 🔥 **Streak & XP System** | Daily streaks, XP progression, coin rewards, savings goals |
| 🔒 **Premium Stocks** | Spend 150 coins to unlock Tesla, Google, Microsoft — teaches value of saving |

---

## 📊 Analytics & Measurability (Novus.ai)

LittleInvestors is **fully instrumented with Novus.ai** — every meaningful user action is tracked, giving real visibility into how families engage with the product.

### What's Tracked

**8 Pages**
- Landing, Dashboard, Learning | Courses, Learning | Lesson, Learning | Quiz, AI Coach, Parent Mode, Profile

**14 Track Events**

| Event | What It Captures |
|---|---|
| `lesson_completed` | Kid finishes a lesson and proceeds to quiz |
| `quiz_completed` | Quiz results: score, total, XP earned |
| `quiz_answer_submitted` | Per-question answer data — reveals which topics kids struggle with |
| `stock_purchased` | Simulated buy: ticker + price |
| `stock_sold` | Simulated sell: ticker + price |
| `stock_viewed` | Stock detail expansion — intent to trade |
| `premium_stocks_unlocked` | High-engagement milestone: spent 150 coins to unlock Tesla/GOOGL/MSFT |
| `chat_message_sent` | Penny AI usage: message length |
| `allowance_sent` | Parent sends preset allowance |
| `custom_reward_sent` | Parent sends custom amount + note |
| `achievement_unlocked` | Any of 7 achievement milestones |
| `goal_set` | Kid sets a savings goal |
| `onboarding_tour_completed` | Dashboard tour finished |
| `feedback_submitted` | In-app star rating |

**9 Funnels**
- Landing Page Conversion · Landing to Course Browsing · Lesson & Quiz Completion · Stock Purchase Flow · Premium Stocks Unlock · AI Coach Interaction · Parent Quick Allowance · Parent Custom Reward · Learning Conversion Funnel (end-to-end)

**1 Active Guide**
- Welcome lightbox on Dashboard: introduces all features to new visitors, CTAs to start first lesson

**Visitor Segmentation**
- `role: 'parent'` vs `role: 'student'` — auto-detected from URL
- Unique persistent family account ID per device

> 📸 *[Novus dashboard screenshot — add before Devpost submission]*

---

## 🚀 Live Demo

**🌐 App:** https://little-investors-delta.vercel.app/

**🎥 Demo video:** [YouTube](#) *(under 3 minutes)*

**📝 Devpost:** [Submission link](#)

### Screenshots

<table>
  <tr>
    <td align="center"><b>Landing Page</b></td>
    <td align="center"><b>Dashboard</b></td>
    <td align="center"><b>Courses</b></td>
  </tr>
  <tr>
    <td><img src="demo/slide1.png" width="280"/></td>
    <td><img src="demo/slide2.png" width="280"/></td>
    <td><img src="demo/slide3.png" width="280"/></td>
  </tr>
  <tr>
    <td align="center"><b>Quiz</b></td>
    <td align="center"><b>Penny AI Coach</b></td>
    <td align="center"><b>Parent Mode</b></td>
  </tr>
  <tr>
    <td><img src="demo/slide4.png" width="280"/></td>
    <td><img src="demo/slide5.png" width="280"/></td>
    <td><img src="demo/slide5.png" width="280"/></td>
  </tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Node.js + Express |
| **Frontend** | EJS templates + Vanilla CSS + Vanilla JS |
| **AI Coach** | Google Gemini 2.5 Flash API |
| **Analytics** | [Novus.ai](https://novus.pendo.io) — 8 pages, 14 events, 9 funnels, 1 guide |
| **Stock Data** | Yahoo Finance API (via backend proxy) |
| **Deployment** | Vercel (frontend) + Railway (backend) |
| **State** | localStorage (client-side, no auth required) |

---

## 🏃 Run Locally

```bash
git clone https://github.com/thesumedh/Little-Investors.git
cd Little-Investors
npm install

# Create src/.env with:
# GEMINI_API_KEY=your_key_here   ← free at aistudio.google.com

npm start
# Open http://localhost:3000
```

### Environment Variables (`src/.env`)
```env
PORT=3000
GEMINI_API_KEY=your_key_here
```

---

## 💡 Product Thinking

**The insight that shaped everything:** Financial literacy for kids fails because it's taught *at* kids, not *with* them. The parent-child dynamic is the product's superpower — the moment learning becomes a shared family experience rather than homework, engagement transforms completely.

**Design decisions:**
- **No login required** — removes friction for a hackathon demo; any family can start in 30 seconds
- **Coins as currency** — kids earn coins through learning, then spend them to invest. This teaches the core loop: learn → earn → invest
- **Parent Mode is equal, not secondary** — parents aren't an afterthought; they're co-participants who send allowances and celebrate wins
- **Penny is opinionated** — the AI coach has a name, a personality, and always gives kid-friendly answers. Not a generic chatbot

**What the data will tell us (via Novus):**
- Are kids completing lessons before investing, or skipping straight to stocks?
- Which quiz questions have the highest wrong-answer rate? (reveals curriculum gaps)
- Do families where parents send allowances have higher lesson completion rates?
- What does Penny get asked most? (product roadmap signal)

---

## 🧗 Challenges

- **Gemini for kids**: Getting consistent age-appropriate responses required careful system prompting, temperature tuning, and a keyword-matching fallback for common questions
- **State without a database**: Designing the full game state (coins, XP, shares, achievements, streaks) in localStorage required careful architecture so nothing conflicts
- **Two users, one app**: Parent Mode and Kid Mode are completely different UX contexts sharing the same codebase — designing flows that don't confuse either required deliberate information architecture

---

## 🔮 What's Next

- User accounts + cross-device sync (Supabase)
- Real stock price WebSocket updates
- Push notifications for parent deposits
- Teacher mode for classrooms
- Expanded asset classes (ETFs, crypto, bonds)
- iMessage/WhatsApp family finance integration

---

## 📈 Judging Criteria Self-Assessment

| Criterion | How We Address It |
|---|---|
| **Product Thinking** | Clear problem, well-defined audience (families/kids 8–16), unique parent-child collaborative angle |
| **Craft & Execution** | Polished UI, end-to-end working flows, intentional copy, Penny AI persona |
| **Originality** | Stock sim + AI coach + gamification + parent loop — built solo in one hackathon sprint |
| **Shippedness** | Live URL, Novus installed & measuring (8 pages, 14 events, 9 funnels, 1 guide), any stranger can get value in 30s |

---

*Built with ❤️ for the Mind the Product World Product Day Hackathon 2026*

*"Everyone Ships Now" — and we shipped. 🚀*
