//--- DEFINE a reusable animation function: ---//
function scrollThere(targetElement, speed) {
  // initiate an animation to a certain page element:
  $('html, body').stop().animate(
    { scrollTop: targetElement.offset().top }, // move window so target element is at top of window
    speed, // speed in milliseconds
    'swing' // easing
  ); // end animate
} // end scrollThere function definition


//--- START NAV-ITEM CLICK EVENTS ---//
// when the user clicks a nav item:
$("#leftSidebar ul li a").click(function (e) {

  e.preventDefault(); // don't jump like a typical html anchor

  // find the index of the "#" character in the href string...
  var startOfName = $(this).attr('href').indexOf("#"),
      // ...then use it as the argument in the slice() method (add 1 so you don't include the # character).
      clickRef = $(this).attr('href').slice(startOfName + 1),
      targetEl = $('a[name=' + clickRef + ']'); // select the element this link is pointing to

  // scroll there smoothly:
  scrollThere(targetEl, 400);

}); // end click
//--- END NAV-ITEM CLICK EVENTS ---//


//--- START SCROLL EVENTS ---//
// detect a mousewheel event (note: relies on jquery mousewheel plugin):
var page_slide = $('.home_wrp');

$(window).on('mousewheel', function (e) {

  // get Y-axis value of each div:
  var div1y = $('#panel1').offset().top,
      div2y = $('#panel2').offset().top,
      div3y = $('#panel3').offset().top,
      div4y = $('#panel4').offset().top,
      div5y = $('#panel5').offset().top,
     // div6y = $('#panel6').offset().top,
      //div7y = $('#panel7').offset().top,
      // get window's current scroll position:
      lastScrollTop = $(this).scrollTop(),
      // for getting user's scroll direction:
      scrollDirection,
      // for determining the previous and next divs to scroll to, based on lastScrollTop:
      targetUp,
      targetDown,
      // for determining which of targetUp or targetDown to scroll to, based on scrollDirection:
      targetElement;

  // get scroll direction:
  if ( e.deltaY > 0 ) {
    scrollDirection = 'up';
  } else if ( e.deltaY <= 0 ) {
    scrollDirection = 'down';
  } // end if

  // prevent default behavior (page scroll):
  e.preventDefault();
   
  // condition: determine the previous and next divs to scroll to, based on lastScrollTop:
    if (lastScrollTop === div1y) {

    targetUp = $('#panel1');
        targetDown = $('#panel2');
        $('#elite_web_slide').removeClass('fadeInUp animated_1');
        $('#brilliant-ideas').addClass('fadeInUp animated_1');
  } else if (lastScrollTop === div2y) {
    targetUp = $('#panel1');
        targetDown = $('#panel3');
        $('#brilliant-ideas').removeClass('fadeInUp animated_1');
        $('#case_study').addClass('fadeInUp animated_1');
  } else if (lastScrollTop === div3y) {
    targetUp = $('#panel2');
        targetDown = $('#panel4');
        $('#case_study').removeClass('fadeInUp animated_1');
        $('#clients_feedback').addClass('fadeInUp animated_1');
  } else if (lastScrollTop === div4y) {
    targetUp = $('#panel3');
        targetDown = $('#panel5');
        $('#clients_feedback').removeClass('fadeInUp animated_1');
        $('#market_place').addClass('fadeInUp animated_1');
  } else if (lastScrollTop === div5y) {
   targetUp = $('#panel4');
       targetDown = $('#panel6');
       $('#market_place').removeClass('fadeInUp animated_1');
      $('#blogs-wrp').addClass('fadeInUp animated_1');
  }// else if (lastScrollTop === div6y) {
  //  targetUp = $('#panel5');
  //      targetDown = $('#panel6');
  //      $('#blogs-wrp').removeClass('fadeInUp animated_1');
  //      $('#elite_footer').addClass('fadeInUp animated_1');
  //} else if (lastScrollTop === div7y) {
  //    targetUp = $('#panel6');
  //      targetDown = $('#panel7');
  //      $('#elite_footer').addClass('fadeInUp animated_1');
  //}
  else if (lastScrollTop < div2y) {
    targetUp = $('#panel1');
    targetDown = $('#panel2');
  } else if (lastScrollTop < div3y) {
    targetUp = $('#panel2');
    targetDown = $('#panel3');
  } else if (lastScrollTop < div4y) {
    targetUp = $('#panel3');
    targetDown = $('#panel4');
  } else if (lastScrollTop < div5y) {
    targetUp = $('#panel4');
    targetDown = $('#panel5');
  } //else if (lastScrollTop < div6y) {
  //  targetUp = $('#panel5');
  //  targetDown = $('#panel6');
  //} else if (lastScrollTop < div7y) {
  //  targetUp = $('#panel6');
  //  targetDown = $('#panel7');
  //}// else if (lastScrollTop < div7y) {
  //    targetUp = $('#panel7');
  //    targetDown = $('#panel7');
  //}

    // end else if

  // condition: determine which of targetUp or targetDown to scroll to, based on scrollDirection:
  if (scrollDirection === 'down') {
    targetElement = targetDown;
  } else if (scrollDirection === 'up') {
    targetElement = targetUp;
  } // end else if

  // scroll smoothly to the target element:
  scrollThere(targetElement, 400);

}); // end on mousewheel event
//--- END SCROLL EVENTS ---//
$('#case_study_wrp_1').on('mousewheel', function (e) {

    $(document).bind('mousewheel');
});

//--- START SHOW/HIDE SIDE PANEL EVENTS ---//
// open the sidePanel when the button is clicked/tapped:
$("#sidePanelButton").click(function (e) {
  e.preventDefault();
  $("#sidePanel").addClass("open");
  $("#mainStack").addClass("shift");
}); // end click

// close the sidePanel when the X is clicked/tapped:
$("#sidePanelClose").click(function (e) {
  e.preventDefault();
  $("#sidePanel").removeClass("open");
  $("#mainStack").removeClass("shift");
}); // end click
//--- END SHOW/HIDE SIDE PANEL EVENTS ---//