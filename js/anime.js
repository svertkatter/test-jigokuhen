// anime.js
function animateBackground() {
    // 背景用のdiv要素を作成
    const bgDiv = document.createElement('div');
    bgDiv.style.position = 'fixed';
    bgDiv.style.top = '0';
    bgDiv.style.left = '0';
    bgDiv.style.width = '100%';
    bgDiv.style.height = '100dvh';
    bgDiv.style.backgroundColor = 'white';
    bgDiv.style.opacity = '0';
    bgDiv.style.zIndex = '9999';
    document.body.appendChild(bgDiv);

    // GSAPを使用して背景の透明度をアニメーション
    gsap.to(bgDiv, {
        duration: 1, opacity: 1, onComplete: () => {
            // アニメーション完了後、背景を非表示に
            gsap.to(bgDiv, {
                duration: 1, opacity: 0, delay: 1, onComplete: () => {
                    bgDiv.parentNode.removeChild(bgDiv);
                }
            });
        }
    });
}

// この関数を外部から呼び出せるようにエクスポート
export { animateBackground };
