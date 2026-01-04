// CTA button scroll position
document.addEventListener('DOMContentLoaded', function() {
  const ctaPC = document.querySelector('.hero__cta-pc');
  const ctaSP = document.querySelector('.hero__cta');
  const footerCta = document.querySelector('.footer__cta');

  // PC版: スクロール時に位置調整
  if (ctaPC) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        ctaPC.classList.add('is-scrolled');
      } else {
        ctaPC.classList.remove('is-scrolled');
      }
    });
  }

  // SP版: スクロールで固定表示、Footer付近で非表示
  if (ctaSP && footerCta) {
    // CTAの元の位置を記録
    const ctaOriginalTop = ctaSP.offsetTop + ctaSP.offsetHeight;

    const checkScrollPosition = function() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const footerRect = footerCta.getBoundingClientRect();

      // CTAが画面外にスクロールされたら固定表示
      if (scrollY > ctaOriginalTop - windowHeight + 100) {
        ctaSP.classList.add('is-fixed');
      } else {
        ctaSP.classList.remove('is-fixed');
      }

      // Footer CTAが画面内に入ったら非表示
      if (footerRect.top < windowHeight) {
        ctaSP.classList.add('is-hidden');
      } else {
        ctaSP.classList.remove('is-hidden');
      }
    };

    window.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);
    checkScrollPosition(); // 初期チェック
  }
});
