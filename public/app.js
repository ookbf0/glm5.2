  function init(){
    initModels();
    setupResizeObserver();
    setupViewportListener();
    updateSpacer();
    restoreSessionIfEnabled();
    scrollToBottom();
  }

  init();

  // ===== 回到底部按钮（浮在右下角） =====
  (function initScrollButton() {
    const btn = document.createElement('button');
    btn.id = 'scrollBottomBtn';
    btn.innerHTML = '↓';
    btn.setAttribute('aria-label', '滚动到底部');
    document.body.appendChild(btn);

    const historyEl = document.getElementById('history');
    if (!historyEl) return;

    historyEl.addEventListener('scroll', () => {
      const scrollTop = historyEl.scrollTop;
      const clientHeight = historyEl.clientHeight;
      const scrollHeight = historyEl.scrollHeight;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 20;
      if (isAtBottom) {
        btn.classList.remove('visible');
      } else {
        btn.classList.add('visible');
      }
    });

    btn.addEventListener('click', () => {
      historyEl.scrollTo({ top: historyEl.scrollHeight, behavior: 'smooth' });
    });

    setTimeout(() => {
      historyEl.dispatchEvent(new Event('scroll'));
    }, 300);
  })();
