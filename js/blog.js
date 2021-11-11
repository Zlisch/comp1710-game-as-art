var previewPost = document.querySelectorAll(".post-preview"),
    hrPost      = document.querySelectorAll("hr");

window.onload = () => {
    for (let i = 0; i < previewPost.length; i++) {
        hrPost[i].style.transition = "all .8s ease";
        previewPost[i].addEventListener('mouseenter', () => {
            if (i == 0) {
                hrPost[i].style.opacity = "0";
            } else {
                hrPost[i-1].style.opacity = "0";
                hrPost[i].style.opacity = "0";
            }
        });
        previewPost[i].addEventListener('mouseleave', () => {
            for (let i = 0; i < previewPost.length; i++) {
                hrPost[i].style.opacity = "1";
            }
        });
    }
}