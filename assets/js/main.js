// CTA button scroll position
document.addEventListener('DOMContentLoaded', function() {
  const ctaPC = document.querySelector('.hero__cta-pc');
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

  // SP版: footer__cta を Intersection Observer で監視
  // 初期表示は画面下部に固定、DOM位置に到達したら通常フローに戻す
  const footerCtaAnchor = document.querySelector('.footer__cta-anchor');

  if (footerCta && footerCtaAnchor) {
    // SP版かどうかを判定（768px未満）
    const isSP = () => window.innerWidth < 768;

    // Intersection Observer でアンカー位置を監視
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isSP()) return; // PC版では何もしない

          if (entry.isIntersecting) {
            // アンカー位置がビューポートに入った → 通常フローに戻す
            footerCta.classList.add('is-static');
          } else {
            // アンカー位置がビューポート外 → 画面下部に固定
            footerCta.classList.remove('is-static');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }
    );

    observer.observe(footerCtaAnchor);

    // リサイズ時にPC/SP切り替え対応
    window.addEventListener('resize', () => {
      if (!isSP()) {
        footerCta.classList.remove('is-static');
      }
    });
  }
});
