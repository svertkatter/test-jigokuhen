const isOpen = document.querySelector('.open');

const tl = gsap.timeline({ paused: true });

tl.fromTo(
    //メニューを上から下へ表示
    ".back",
    {
        autoAlpha: 0,
    },
    {
        autoAlpha: 1,
        top: 0,
        duration: 1,
        ease: Power2.easeInOut,
    }
);

isOpen.addEventListener("click", () => {
    tl.play()
});