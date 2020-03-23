$(document).ready(function () {
    //
    var win_w = $(window).width();
      var f_itm = $(".f_itm").width();
       var win_f_1 = win_w - f_itm;
    var win_f_spc1 = win_f_1 / 2;
   var win_h = $(window).height() - $(".case_study_slider").height();
    var win_h1 = win_h / 3;
    $(".case_study_slider").css({ 'margin-top': win_h1 });
  //  $(".slide_m_l1").css({ 'margin-left': win_f_spc1 });
    
   // var f_itm = $(".f_itm").width();
   // var win_f_1 = win_w - f_itm;
   // var win_f_spc1 = win_f_1 / 2;
  
   // $(".f_itm").css({ 'margin-left': win_f_spc1 });
  //  var scroll_plus = -910;
    //$(window).scroll(function () {
    
    ////var lastScrollTop = $(this).scrollTop();
    ////    var cas_1 = $("#case_study_wrp_1").offset().top;
    ////    var cas_2 = $("#clients_wrp").offset().top;
    ////    console.log("cas_1 " + cas_1 + " cas_2 " + cas_2 + " lastScrollTop " + lastScrollTop);
    ////    $(".slider_project_100").mousewheel(function (e, delta) {
    ////        $('body').addClass('overflw');
    ////        console.log("TTT" + delta);
        
    ////        $(".case_study_slider").css({ 'margin-top': win_h1 });
    ////        $("#case_study_wrp_1").addClass('csc_fixed');
    ////        //$(".case_study_slider").css({ 'margin-top': win_h1 });
    ////        //$("#case_study_wrp_1").addClass('csc_fixed');
    ////       // var t = scroll_plus + 'px';
    ////        //   alert(t);   transform: rotate(-90deg) translateY(-910px);
    ////        //  alert(delta);
    ////        var ft = $(".f_itm").offset().left;
    ////        var frt = $(".last_ind").offset().left;
    ////        console.log("lt" + ft + " win_f_spc1 " + win_f_spc1);
    ////        this.scrollLeft -= (delta * '10px');
    ////        //   e.preventDefault();
    ////        // $(".item").addClass('shake animated');
    ////        //  scroll_plus++;
    ////        console.log('top' + cas_1);
    ////        if (ft === win_f_spc1) {
    ////            $('body').removeClass('overflw');

    ////            $(".case_study_slider").css({ 'margin-top': 'unset' });
    ////            $("#case_study_wrp_1").removeClass('csc_fixed');

    ////        }

    ////    });
    //    //if (lastScrollTop >= cas_2) {
    //    //    console.log('Enter if');
    //    //    $('#case_study_wrp_1').removeClass('csc_fixed');
    //    //    $('body').removeClass('overflw');
    //    //    var case_study_wrp_1 = document.getElementById("case_study_wrp_1");
    //    //    console.log(case_study_wrp_1);
    //    //}
    //    //else if (lastScrollTop >= cas_1) {
    //    //    console.log("cas_1 enter Else");
           
    //    //    $(".slider_project_100").mousewheel(function (e, delta) {
    //    //        $('body').addClass('overflw');

    //    //        $(".case_study_slider").css({ 'margin-top': win_h1 });
    //    //        $("#case_study_wrp_1").addClass('csc_fixed');
    //    //        //$(".case_study_slider").css({ 'margin-top': win_h1 });
    //    //        //$("#case_study_wrp_1").addClass('csc_fixed');
    //    //        var t = scroll_plus + 'px';
    //    //        //   alert(t);   transform: rotate(-90deg) translateY(-910px);
    //    //        //  alert(delta);
    //    //        var ft = $(".f_itm").offset().left;
    //    //        var frt = $(".last_ind").offset().left;
    //    //        console.log(frt);
    //    //        this.scrollLeft -= (delta * 3);
    //    //     //   e.preventDefault();
    //    //        // $(".item").addClass('shake animated');
    //    //        //  scroll_plus++;
    //    //        console.log('top 390');
    //    //        if (frt < 390) {
    //    //            console.log('less Than 390');
    //    //          //  $('#case_study_wrp_1').removeClass('csc_fixed');

    //    //            var case_study_wrp_1 = document.getElementById("case_study_wrp_1");
    //    //            case_study_wrp_1.className = case_study_wrp_1.className.replace('csc_fixed', "");
    //    //           // case_study_wrp_1.classList.remove("csc_fixed");
    //    //            console.log(case_study_wrp_1);
    //    //            //var case_study_wrp_1 = document.getElementById("body");
    //    //            //case_study_wrp_1.classList.remove("csc_fixed");
    //    //            $('body').removeClass('overflw');
    //    //            //$('html,body').animate({
    //    //            //    scrollTop: $(".clients_feedbacks_bc").offset().top
    //    //            //},
    //    //            //    'slow');

    //    //        }

    //    //    });
    //    //    //$('body').removeClass('overflw'); $("#case_study_wrp_1").removeClass('csc_fixed');
    //    //}
       
    //    //else {
    //    //    console.log('Enter Else ');
    //    //  /*  $('body').removeClass('overflw'); $("#case_study_wrp_1").removeClass('csc_fixed');*/// $(".item").removeClass('shake animated');
    //    //}
       
    //});
    //$(window).on('mousewheel', function (e) {
    //    var p1 = $("#panel1").offset().top;
    //    var p2 = $("#panel2").offset().top;
    //    var p3 = $("#panel3").offset().top;
    //    var p4 = $("#panel4").offset().top;
    //    var p5 = $("#panel5").offset().top;
    //    var p6 = $("#panel6").offset().top;
    //    lastScrollTop = $(this).scrollTop();
    //    if (lastScrollTop === p1) {
    //        $('html,body').animate({
    //            scrollTop: $("#panel2").offset().top
    //        },
    //            'slow');
    //    }
    //    else if (lastScrollTop === p2) {
    //        $('html,body').animate({
    //            scrollTop: $("#panel3").offset().top
    //        },
    //            'slow');
    //    }
    //    else if (lastScrollTop === p3) {
    //        $('html,body').animate({
    //        //    scrollTop: $("#panel4").offset().top
    //        },
    //            'slow');
    //    }
    //    else if (lastScrollTop === p4) {
    //        $('html,body').animate({
    //        //    scrollTop: $("#panel5").offset().top
    //        },
    //            'slow');
    //    }
  
       
    //});

    var mkt_1 = $(".markit_place_inner_section").height();


    $(".markit_place_section").css({ 'height': mkt_1 });
    //
    var m_h = $(".menu-middle").height();
    var m_r = $(".work_about_txt").height();
    var mr_spc_t = m_r - 60;
    $(".social-md").css({ "margin-top": mr_spc_t });
    var win_ht = $(window).height();
    var m_result = win_ht - m_h;
    var m_css = m_result / 2;
    $(".menu-middle").css({ "margin-top": m_css });
   // $(".elite_screen").addClass("bounceOut");
   // $("#clients_feedback, #brilliant-ideas, #elite_web_slide").addClass("opt-sec");
    $('#elite_web_slide').addClass('fadeInUp animated_1');
    //
    // slider middle
   var win_h =  $(window).height();
    var case_s_h = $("#case_s_height").innerHeight();
    var slide_m = win_h - case_s_h;
    var slide_d = slide_m / 2;
    $("#case_s_height").css({ 'margin-top': slide_d });
    //
    var first_heading_wrp = $(".first-heading-wrp").offset().top;
    $(".first-heading-wrp").mousemove(function (e) {
        var creator_X = 0;
        var creator_Y = 0;
        var creator_X = e.clientX;
        //alert(first_heading_wrp);
        var creator_Y = e.clientY;
      //  alert(creator_Y);
        $(".first-heading-img-wrp").css({ 'left': creator_X - 600, 'top': creator_Y - 300 });
       
    });
    $(".first-heading-wrp, .lets-talk, .elite-logo").hover(function (e) {
        $(".cursor").addClass("cursor_plus rubberBand animated");
    }, function () {
            $(".cursor").removeClass("cursor_plus rubberBand animated");
        });

    $(".menue_wrap").hide();
    $(".elite-hamber").click(function () {
        $('body').addClass('overflw');
        $(".menue_wrap").toggle();
      
    });
    $(".cross_menu").click(function () {
        $('body').removeClass('overflw');
        $(".menue_wrap").hide();
      
    });
    
    //var position1 = $("span.container1").width();
    //var position = $("span.container1").offset().left;
    //alert(position);
    //$('span.container1').mousemove(function (e) {
    //    var x = 0;
    //    var x = e.clientX - position;
    // //   alert(x);
    //    //   alert(x);
    //    if (x <= position1) {
    //        $('span.box').css({ 'left': x });
    //    }
    //});


    ///
    //// Scroll =======================
    $(window).scroll(function () {
      

      // Common Variable
        var doc_scroll = $(window).scrollTop() + $(window).height();

        // Elements Variable
        var clients_feedback = $("#clients_feedback").offset().top;
        var brilliant_ideas = $("#brilliant-ideas").offset().top;
        var case_study = $("#case_study").offset().top;
        

       //// Brilliant ideas
       // if (doc_scroll >= brilliant_ideas) {
       //     $('#brilliant-ideas').addClass('flipInX animated');

       // } else {
       //     $('#brilliant-ideas').removeClass('flipInX animated');
       // }

       // // Products
       // if (doc_scroll >= brilliant_ideas) {
       //     $('#case_study').addClass('flipInX animated');

       // } else {
       //     $('#case_study').removeClass('flipInX animated');
       // }

        // Clients Feedback
        if (doc_scroll >= clients_feedback) {
           // $('#clients_feedback').addClass('flipInX animated');
            $('.clients_commas_left_img, .client_commas_right_img').addClass('swing animated');

        } else {
          //  $('#clients_feedback').removeClass('flipInX animated');
            $('.clients_commas_left_img, .client_commas_right_img').removeClass('swing animated opt-sec');
        }
        ///
    });

    /////////// Cursor
    $('body').mousemove(function (t) {
           $('.cursor')
               .eq(0)
               .css({
                  left: t.pageX - 2,
                  top: t.pageY - 12
              });
          setTimeout(function () {
              $('.cursor')
                   .eq(1)
                   .css({
                      left: t.pageX,
                       top: t.pageY
                  });
           });
    });

    ///
    //$(document).ready(function () {

    //    setTimeout(function () {
    //        $('body').prepend("<div class='cursor'></div>");
    //        $('body').mousemove(function (e) {
    //            //debugger;
    //            var x = e.screenX;
    //            var y = e.screenY;
    //            $('.cursor').eq(0).css({
    //                left: e.screenX,
    //                top: e.screenY - 60
    //            });
    //        });
    //    }, 1000);
    //});

    //--- END SHOW/HIDE SIDE PANEL EVENTS ---//

   
});

