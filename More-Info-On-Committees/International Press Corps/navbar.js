$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        console.log(scroll);
        if (scroll > 50) {
            $(".navbar").css("background", "white");
            $(".nav-a").css("color", "black");
        }

        else {
            $(".navbar").css("background", "none");
            $(".nav-a").css("color", "#B7A3E6");

        }
    })
})