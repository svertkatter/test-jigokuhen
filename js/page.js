// スムーススクロール
const paginations = document.querySelectorAll(".pagination a");
paginations.forEach(pagination => {
    pagination.addEventListener("click", e => {
        e.preventDefault();
        const targetId = e.target.hash;
        const target = document.querySelector(targetId);
        target.scrollIntoView({ behavior: "smooth" });
    });
});

// Intersection Observer
const sections = document.querySelectorAll(".section");
const observerRoot = document.querySelector(".fullPageScroll");
const options = {
    root: observerRoot,
    rootMargin: "-50% 0px",
    threshold: 0
};
const observer = new IntersectionObserver(doWhenIntersect, options);
sections.forEach(section => {
    observer.observe(section);
});

/**
 * 交差したときに呼び出す関数
 * @param entries - IntersectionObserverEntry IntersectionObserverが交差したときに渡されるオブジェクトです。
 */
function doWhenIntersect(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            activatePagination(entry.target);
        }
    });
}