// ===== STATE (localStorage) =====
const LS = {
  get: (k, def) => { try { const v = localStorage.getItem('li_' + k); return v === null ? def : JSON.parse(v); } catch { return def; } },
  set: (k, v) => localStorage.setItem('li_' + k, JSON.stringify(v))
};

// ===== NOVUS.AI EVENT TRACKING =====
function track(event, props = {}) {
  try {
    if (window.pendo) window.pendo.track(event, props);
  } catch (e) {}
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ===== CONFETTI =====
function launchConfetti() {
  if (typeof confetti !== 'undefined') {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 }, colors: ['#2AA46A', '#F9A61B', '#34d399', '#fff'] });
    setTimeout(() => confetti({ particleCount: 60, spread: 120, origin: { y: 0.4 }, angle: 60 }), 400);
    setTimeout(() => confetti({ particleCount: 60, spread: 120, origin: { y: 0.4 }, angle: 120 }), 600);
  }
}

// ===== ACHIEVEMENTS =====
const ACHIEVEMENTS = {
  first_lesson: { icon: '📚', title: 'First Step!', desc: 'Completed your first lesson' },
  first_quiz: { icon: '🎯', title: 'Quiz Ace!', desc: 'Completed your first quiz' },
  first_stock: { icon: '📈', title: 'Baby Buffett!', desc: 'Bought your first stock' },
  perfect_quiz: { icon: '🏆', title: 'Perfect Score!', desc: 'Got all answers right in a quiz' },
  level_up: { icon: '⭐', title: 'Level Up!', desc: 'Reached a new level' },
  saver: { icon: '🐷', title: 'Super Saver!', desc: 'Saved 500+ coins' },
  streak_7: { icon: '🔥', title: 'On Fire!', desc: 'Maintained a 7-day streak' },
};

function unlockAchievement(id) {
  const earned = LS.get('achievements', []);
  if (earned.includes(id)) return;
  earned.push(id);
  LS.set('achievements', earned);
  const a = ACHIEVEMENTS[id];
  if (!a) return;
  showAchievementPopup(a);
  track('achievement_unlocked', { achievement: id });
}

function showAchievementPopup(a) {
  const existing = document.getElementById('achievePopup');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.id = 'achievePopup';
  el.style.cssText = `position:fixed;top:80px;left:50%;transform:translateX(-50%) translateY(-120px);background:#1a2332;color:#fff;border-radius:20px;padding:16px 24px;display:flex;align-items:center;gap:14px;z-index:9999;box-shadow:0 20px 60px rgba(0,0,0,.4);border:1px solid rgba(42,164,106,.3);transition:transform .4s cubic-bezier(.34,1.56,.64,1);min-width:280px`;
  el.innerHTML = `<div style="font-size:36px">${a.icon}</div><div><div style="font-size:11px;color:#2AA46A;font-weight:700;text-transform:uppercase;letter-spacing:.5px">Achievement Unlocked!</div><div style="font-size:15px;font-weight:700;margin-top:2px">${a.title}</div><div style="font-size:12px;color:#94a3b8;margin-top:2px">${a.desc}</div></div>`;
  document.body.appendChild(el);
  setTimeout(() => el.style.transform = 'translateX(-50%) translateY(0)', 50);
  setTimeout(() => { el.style.transform = 'translateX(-50%) translateY(-120px)'; setTimeout(() => el.remove(), 400); }, 3500);
}

// ===== INIT HEADER =====
function initHeader() {
  const coins = LS.get('coins', 800);
  const xp = LS.get('xp', 0);
  const level = Math.floor(xp / 200);
  const progressPct = (xp % 200) / 200 * 100;

  const coinEl = document.getElementById('coinAmount');
  if (coinEl) coinEl.textContent = coins;
  const levelEl = document.getElementById('levelNum');
  if (levelEl) levelEl.textContent = level;
  const progressEl = document.getElementById('progress');
  if (progressEl) progressEl.style.width = progressPct + '%';

  // Animate balance counter on home page
  const balNum = document.getElementById('balanceNum');
  if (balNum) {
    const target = coins;
    let n = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      n = Math.min(n + step, target);
      balNum.textContent = n.toLocaleString();
      if (n >= target) clearInterval(timer);
    }, 25);
  }

  // Streak
  const streakEl = document.getElementById('streakCount');
  if (streakEl) streakEl.textContent = LS.get('streak', 30);

  // Check saver achievement
  if (coins >= 500) unlockAchievement('saver');
}

// ===== DYNAMIC NOTIFICATIONS =====
function loadNotifications() {
  const wrap = document.getElementById('notifWrap');
  if (!wrap) return;
  
  let notifs = LS.get('notifications', []);
  
  // Default welcome notification if empty
  if (notifs.length === 0) {
    notifs = [
      {
        id: 'notif_welcome',
        icon: '👋',
        title: 'Welcome to LittleInvestors!',
        sub: 'Start learning to earn your first coins.',
        time: 'Just now'
      }
    ];
    LS.set('notifications', notifs);
  }
  
  wrap.innerHTML = '';
  notifs.forEach(n => {
    const el = document.createElement('div');
    el.className = 'notification';
    el.id = n.id;
    el.innerHTML = `
      <div class="notif-icon">${n.icon}</div>
      <div class="notif-body">
        <div class="notif-title">${n.title}</div>
        <div class="notif-sub">${n.sub}</div>
      </div>
      <span class="notif-close" onclick="dismissNotification('${n.id}')">×</span>
    `;
    wrap.appendChild(el);
  });
}

function dismissNotification(id) {
  const el = document.getElementById(id);
  if (!el) return;
  
  el.style.transition = 'all .3s ease';
  el.style.opacity = '0';
  el.style.transform = 'translateX(20px)';
  el.style.maxHeight = el.offsetHeight + 'px';
  
  setTimeout(() => {
    el.remove();
    // Remove from localStorage
    const notifs = LS.get('notifications', []).filter(n => n.id !== id);
    LS.set('notifications', notifs);
  }, 300);
  
  track('notification_dismissed', { id });
}

// ===== STOCK TOGGLE =====
function toggleStock(ticker) {
  const el = document.getElementById('detail-' + ticker);
  if (!el) return;
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.stock-detail').forEach(d => d.classList.remove('open'));
  if (!isOpen) { el.classList.add('open'); loadShareInfo(ticker); }
  track('stock_viewed', { ticker });
}

// ===== DYNAMIC LIVE STOCKS =====
let PRICES = { wmt: 80.94, aapl: 226.80, amzn: 186.51, googl: 175.40, tsla: 180.20, msft: 420.10 };

async function loadLiveStocks() {
  try {
    const res = await fetch('/api/stocks');
    const data = await res.json();
    if (data.success && data.stocks) {
      Object.keys(data.stocks).forEach(ticker => {
        const stock = data.stocks[ticker];
        PRICES[ticker] = stock.price;
        
        // Update home UI
        const priceEl = document.getElementById(`${ticker}-display-price`);
        const changeEl = document.getElementById(`${ticker}-display-change`);
        const detailPriceEl = document.getElementById(`${ticker}-detail-price`);
        
        if (priceEl) priceEl.textContent = `$${stock.price.toFixed(2)}`;
        if (detailPriceEl) detailPriceEl.textContent = `$${stock.price.toFixed(2)}`;
        if (changeEl) {
          const sign = stock.change >= 0 ? '+' : '';
          changeEl.textContent = `${sign}$${stock.change.toFixed(2)} (${sign}${stock.changePercent.toFixed(2)}%)`;
          changeEl.className = `stock-change ${stock.direction === 'up' ? 'green' : 'red'}`;
        }
      });
      calculatePortfolioValue();
    }
  } catch (e) {
    console.error('Failed to load live stocks:', e);
  }
}

function calculatePortfolioValue() {
  let totalValue = 0;
  Object.keys(PRICES).forEach(ticker => {
    const shares = LS.get('shares_' + ticker, 0);
    totalValue += shares * PRICES[ticker];
  });
  const gainEl = document.getElementById('portfolioGain');
  if (gainEl) {
    gainEl.textContent = `📈 Total Portfolio: $${totalValue.toFixed(2)}`;
  }
}

function loadShareInfo(ticker) {
  const shares = LS.get('shares_' + ticker, 0);
  const el = document.getElementById(ticker + '-shares');
  const vel = document.getElementById(ticker + '-value');
  if (el) el.textContent = shares + ' share' + (shares !== 1 ? 's' : '');
  if (vel) vel.textContent = '$' + (shares * PRICES[ticker]).toFixed(2);
}

function buySell(ticker, action) {
  const coins = LS.get('coins', 800);
  const price = PRICES[ticker];
  const shares = LS.get('shares_' + ticker, 0);
  const prevShares = LS.get('total_shares', 0);

  if (action === 'buy') {
    if (coins < price) { showToast('Not enough coins! 💸 Complete lessons to earn more.'); return; }
    LS.set('coins', Math.round((coins - price) * 100) / 100);
    LS.set('shares_' + ticker, shares + 1);
    LS.set('total_shares', prevShares + 1);
    showToast(`✅ Bought 1 ${ticker.toUpperCase()} share for $${price.toFixed(2)}!`);
    track('stock_purchased', { ticker, price, action: 'buy' });
    if (prevShares === 0) {
      unlockAchievement('first_stock');
      launchConfetti();
    }
  } else {
    if (shares < 1) { showToast("You don't own any shares to sell! 📉"); return; }
    LS.set('coins', Math.round((coins + price) * 100) / 100);
    LS.set('shares_' + ticker, shares - 1);
    showToast(`💰 Sold 1 ${ticker.toUpperCase()} share for $${price.toFixed(2)}!`);
    track('stock_sold', { ticker, price, action: 'sell' });
  }
  loadShareInfo(ticker);
  calculatePortfolioValue();
  initHeader();
}

// ===== LESSON COMPLETE =====
function completeLesson(xp) {
  const prevXP = LS.get('xp', 0);
  const prevLevel = Math.floor(prevXP / 200);
  const newXP = prevXP + xp;
  const newLevel = Math.floor(newXP / 200);
  const coins = LS.get('coins', 800);

  LS.set('xp', newXP);
  LS.set('level', newLevel);
  LS.set('coins', coins + Math.floor(xp / 10));

  if (newLevel > prevLevel) {
    unlockAchievement('level_up');
    launchConfetti();
  }

  const lessonsCompleted = LS.get('lessons_completed', 0) + 1;
  LS.set('lessons_completed', lessonsCompleted);
  if (lessonsCompleted === 1) unlockAchievement('first_lesson');
  track('lesson_completed', { xp, total_lessons: lessonsCompleted });
}

// ===== PREMIUM STOCKS LOCK =====
function checkPremiumStocksLock() {
  const isUnlocked = LS.get('stocks_unlocked', false);
  const premiumWrap = document.getElementById('premiumStocks');
  const lockCard = document.getElementById('lockCard');
  if (isUnlocked) {
    if (premiumWrap) premiumWrap.style.display = 'block';
    if (lockCard) lockCard.style.display = 'none';
  } else {
    if (premiumWrap) premiumWrap.style.display = 'none';
    if (lockCard) lockCard.style.display = 'flex';
  }
}

function unlockPremiumStocks() {
  const coins = LS.get('coins', 800);
  if (coins < 150) {
    showToast("Not enough coins! 🪙 Earn 150 coins by finishing lessons and quizzes.");
    return;
  }
  
  LS.set('coins', Math.round((coins - 150) * 100) / 100);
  LS.set('stocks_unlocked', true);
  
  const card = document.getElementById('lockCard');
  if (card) {
    card.style.transform = 'scale(0.9) rotate(-3deg)';
    card.style.opacity = '0';
    setTimeout(() => card.remove(), 400);
  }
  
  const premium = document.getElementById('premiumStocks');
  if (premium) {
    premium.style.display = 'block';
    premium.style.opacity = '0';
    premium.style.transform = 'translateY(15px)';
    premium.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    setTimeout(() => {
      premium.style.opacity = '1';
      premium.style.transform = 'translateY(0)';
    }, 50);
  }
  
  launchConfetti();
  showToast("🎉 Premium Stocks Unlocked: Tesla, Google, & Microsoft!");
  initHeader();
  track('premium_stocks_unlocked', { cost: 150 });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  loadNotifications();
  loadLiveStocks();
  checkPremiumStocksLock();
  track('page_view', { page: window.location.pathname });

  // Close stock details on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.stock') && !e.target.closest('.stock-detail') && !e.target.closest('.buy-sell-btns')) {
      document.querySelectorAll('.stock-detail').forEach(d => d.classList.remove('open'));
    }
  });
});

// Bind to window for global access
window.dismissNotification = dismissNotification;
window.toggleStock = toggleStock;
window.buySell = buySell;
window.completeLesson = completeLesson;
window.showToast = showToast;
window.unlockAchievement = unlockAchievement;
window.launchConfetti = launchConfetti;
window.unlockPremiumStocks = unlockPremiumStocks;