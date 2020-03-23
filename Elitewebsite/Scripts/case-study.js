

$(document).ready(function () {
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
    //--- END SHOW/HIDE SIDE PANEL EVENTS ---//
    $(".menue_wrap").hide();
    $(".elite-hamber").click(function () {
        $('body').addClass('overflw');
        $(".menue_wrap").toggle();

    });
    $(".cross_menu").click(function () {
        $('body').removeClass('overflw');
        $(".menue_wrap").hide();

    });
    //
    // Sticky Side bar
    var $sticky = $('.sticky');
    var $stickyrStopper = $('.sticky-stopper');
    if (!!$sticky.offset()) { // make sure ".sticky" element exists

        var generalSidebarHeight = $sticky.innerHeight();
        var stickyTop = $sticky.offset().top;
        var stickOffset = 0;
        var stickyStopperPosition = $stickyrStopper.offset().top;
        var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
        var diff = stopPoint + stickOffset;

        $(window).scroll(function () { // scroll event
            var windowTop = $(window).scrollTop(); // returns number

            if (stopPoint < windowTop) {
                $sticky.css({ position: 'absolute', top: diff });
            } else if (stickyTop < windowTop + stickOffset) {
                $sticky.css({ position: 'fixed', top: stickOffset });
            } else {
                $sticky.css({ position: 'absolute', top: 'initial' });
            }
        });

    }
    ///alert

  
    $(".first-heading-wrp, .header-right, .elite-logo").hover(function (e) {
        $(".cursor").addClass("cursor_plus rubberBand animated");
    }, function () {
            $(".cursor").removeClass("cursor_plus rubberBand animated");
        });
   
 

    /////////// Cursor
    $('body').mousemove(function (t) {
            $('.cursor')
                .eq(0)
                .css({
                    left: t.pageX,
                    top: t.pageY
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
    $(window).scroll(function () {
        var doc_scroll = $(window).scrollTop();
        var bc_offset = $("#background-case-study").offset().top;
        var pro_offset = $("#problem-case-study").offset().top;
        var challange_offset = $("#challange-case-study").offset().top;
        var solutions_offset = $("#solution-case-study").offset().top;
        var result_offset = $("#result-case-study").offset().top;
        var stop_offset = $(".sticky-stopper").offset().top - generalSidebarHeight;
        $("#bacckground-s, #problem-s, #challange-s, #solution-s, #result-s").removeClass('side-active');
        if (doc_scroll <= pro_offset) {
            $("#bacckground-s").addClass('side-active');
        } else if (doc_scroll <= challange_offset) {
            $("#problem-s").addClass('side-active');
        }
        else if (doc_scroll <= solutions_offset) {
            $("#challange-s").addClass('side-active');
        }
        else if (doc_scroll <= result_offset) {
            $("#solution-s").addClass('side-active');
        }
        else if (doc_scroll >= result_offset) {
            $("#result-s").addClass('side-active');
        }
        console.log(doc_scroll);
       if (doc_scroll >= stop_offset) {
           $(".sidebar-elite").css({ "position": "absolute" });
        }
        
        
    });


});

