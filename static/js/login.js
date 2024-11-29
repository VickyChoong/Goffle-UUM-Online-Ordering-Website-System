function aos_init() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}

window.addEventListener('load', () => {
    aos_init();
});

$(document).ready(function () {
    window.setTimeout(function () {
        $(".alert-auto-close").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 2000)
});
