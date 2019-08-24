$(document).ready(function() {
    /* $('.mdb-select').materialSelect();
    $('#btn-filtro').click(function() {
        $('#btn-filtro').html('Buscando...<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>').addClass('disabled');
    }); */
    $('.carousel').carousel().swipeCarousel({
        // low, medium or high
        sensitivity: 'high'
    });
    /* $('.dropdown-toggle').dropdown() */
    /* $("#ingredientes").selectpicker({
        noneSelectedText: 'Please Select'
    }); */


});
/* new WOW().init(); */

(function($) {
    'use strict';
    $(function() {
        $(".preloader").fadeOut();
    });
    // scroll
    var scrollWindow = function() {
        $(window).scroll(function() {
            var $w = $(this),
                st = $w.scrollTop(),
                navbar = $('.navbar.mrf-navbar'),
                sd = $('.js-scroll-wrap');

            if (st > 150) {
                if (!navbar.hasClass('scrolled')) {
                    navbar.addClass('scrolled');
                }
            }
            if (st < 150) {
                if (navbar.hasClass('scrolled')) {
                    navbar.removeClass('scrolled sleep');
                }
            }
            if (st > 151) {
                if (!navbar.hasClass('awake')) {
                    navbar.addClass('awake');
                }

                if (sd.length > 0) {
                    sd.addClass('sleep');
                }
            }
            if (st < 151) {
                if (navbar.hasClass('awake')) {
                    navbar.removeClass('awake');
                    navbar.addClass('sleep');
                }
                if (sd.length > 0) {
                    sd.removeClass('sleep');
                }
            }
            /* var imagen = $('.custom-logo');
            var nav = $('.navbar.fixed-top');
            if ($(document).scrollTop() <= 151 && $(window).width() >= 768) {
                imagen.css('width', '200px');
                imagen.css('height', '200px');
            } else {
                imagen.css('width', '100px');
                imagen.css('height', '100px');
            } */


            if ($(this).scrollTop() > 40) {
                $('#topBtn').fadeIn();
            } else {
                $('#topBtn').fadeOut();
            }
            /*  $(window).resize(function() {
                 var width = $(window).width();
                 if (width < 1200) {
                     alert('Your screen is too small');
                 }
             }); */
        });
    };
    scrollWindow();
    $('#topBtn').click(function() {
        $('html ,body').animate({ scrollTop: 0 }, 800);
    });
})(jQuery);