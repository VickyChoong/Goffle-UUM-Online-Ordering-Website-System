document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    /**
     * Animation on scroll function and init
     */
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

    $('#password, #confirm_password').on('keyup', function () {
        if ($('#password').val() == $('#confirm_password').val()) {
            $('#message').html('Matching').css('color', 'green');
        } else
            $('#message').html('Not Matching').css('color', 'red');
    });

    $(document).on('submit', '#register', function (event) {
        var phoneNoList = document.getElementById('phoneNoList').getAttribute('value');
        var usernamesList = document.getElementById('usernamesList').getAttribute('value');
        var pList = eval(phoneNoList)
        var uList = eval(usernamesList)
        var form = document.getElementById('register');
        var username = form.elements.username.value;
        var phone = form.elements.phone.value;
        var password = form.elements.password.value;
        var confirm_password = form.elements.confirm_password.value;
        if (password !== confirm_password) {
            alert('The "Retype Password" is not matching!');
            event.preventDefault();
        } else if (pList.includes(phone)) {
            alert("Existing account with this phone number!");
            event.preventDefault();
        } else if (uList.includes(username)) {
            alert("Existing account with this username!");
            event.preventDefault();
        }
    });
});