export function ScrollTopBtn(btn) {
    const btnClass = document.querySelector(btn);

    window.addEventListener("scroll", e => {
        if (window.pageYOffset > 3000 || document.documentElement.scrollTop > 3000) {
            btnClass.classList.remove('hidden');
        } else {
            btnClass.classList.add('hidden');
        }
    });

    btnClass.addEventListener("click", e => {
        if (e.target.matches(btn)) {
            window.scrollTo({
                behavior: "smooth",
                top: 0
            })
        }
    });
}