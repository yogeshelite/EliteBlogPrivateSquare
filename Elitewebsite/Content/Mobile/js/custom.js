$(document).ready(function () {
  

    $(".menue_wrap_mobile").hide();
    $(".menu_hamber").click(function () {
        $('body').addClass('overflw');
        $(".menue_wrap_mobile").toggle();
      
    });
    $(".cross__menue").click(function () {
        $('body').removeClass('overflw');
        $(".menue_wrap_mobile").hide();
      
    });
 });

