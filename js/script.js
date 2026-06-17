// ===== STATE (localStorage) =====
const LS = {
  get: (k, def) => { try { return JSON.parse(localStorage.getItem('li_' + k)) ?? def; } catch { return def; } },
  set: (k, v) => localStorage.setItem('li_' + k, JSON.stringify(v))
};

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
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

  // Animate balance counter
  const balNum = document.getElementById('balanceNum');
  if (balNum) {
    let n = 0;
    const target = coins;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      n = Math.min(n + step, target);
      balNum.textContent = n.toLocaleString();
      if (n >= target) clearInterval(timer);
    }, 30);
  }
}

// ===== DISMISS NOTIFICATION =====
function dismissNotif(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.transition = 'all .3s ease';
  el.style.opacity = '0';
  el.style.transform = 'translateX(20px)';
  el.style.maxHeight = el.offsetHeight + 'px';
  setTimeout(() => {
    el.style.maxHeight = '0';
    el.style.margin = '0';
    el.style.padding = '0';
    el.style.overflow = 'hidden';
  }, 300);
}

// ===== STOCK TOGGLE =====
function toggleStock(ticker) {
  const el = document.getElementById('detail-' + ticker);
  if (!el) return;
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.stock-detail').forEach(d => d.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
  loadShareInfo(ticker);
}

// ===== INVESTMENT SIMULATOR =====
const PRICES = { wmt: 80.94, aapl: 226.80, amzn: 186.51 };

function loadShareInfo(ticker) {
  const shares = LS.get('shares_' + ticker, 0);
  const el = document.getElementById(ticker + '-shares');
  const vel = document.getElementById(ticker + '-value');
  if (el) el.textContent = shares + ' share' + (shares !== 1 ? 's' : '');
  if (vel) vel.textContent = '$' + (shares * PRICES[ticker]).toFixed(2);
}

function buySell(ticker, price, action) {
  const coins = LS.get('coins', 800);
  const shares = LS.get('shares_' + ticker, 0);

  if (action === 'buy') {
    if (coins < price) { showToast('Not enough coins! 💸 Earn more by completing lessons.'); return; }
    LS.set('coins', Math.round((coins - price) * 100) / 100);
    LS.set('shares_' + ticker, shares + 1);
    showToast(`✅ Bought 1 share of ${ticker.toUpperCase()} for $${price}!`);
  } else {
    if (shares < 1) { showToast('You don\'t own any shares to sell! 📉'); return; }
    LS.set('coins', Math.round((coins + price) * 100) / 100);
    LS.set('shares_' + ticker, shares - 1);
    showToast(`💰 Sold 1 share of ${ticker.toUpperCase()} for $${price}!`);
  }
  loadShareInfo(ticker);
  initHeader();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  // Close stock details on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.stock') && !e.target.closest('.stock-detail') && !e.target.closest('.buy-sell-btns')) {
      document.querySelectorAll('.stock-detail').forEach(d => d.classList.remove('open'));
    }
  });
});