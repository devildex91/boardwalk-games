// animations.js

document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".animate");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach(el => observer.observe(el));
});