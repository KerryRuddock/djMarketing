
// When DOM is fully loaded, all images, links, and scripts and sub-frames have finished loading.
//window.onload = function() {
$(function djMain() {

  // switches -- could be a html data-option in future
  var isAdaptiveImageOn = true; // turn on as background-size: contain
  var isAnimationOn = true;     // turn on promo, hue-rotation
  var isDebug = false;          // turn on for diagnositics

  console.log("dom loaded");

  $("#cover").hide(); // hide content loading page once everything is loaded

  var bgImg1 = $(".bg-img.bg-img1"); // Landing Page background image class may be animated
  var $bgImg = $(".bg-img");
  var $info = $("#nav-info");

  $(window).on("scroll", function() {
    // Mobile Chrome Android and Apple IOS do not support background-attachment: fixed
    // Developed a Technique to Alternate Fixed Background Images with scrolling content (Bg Pages are odd#s).

    var winh = window.innerHeight;
    var scrollPos = 0;
    var page = 1;
    var page1Bottom = winh;
    var page3Top = winh;
    var page3Bottom = winh * 3;
    var page5Top = winh * 3;
    var page5Bottom = winh * 5;
    var page7Top = winh * 5;
    var page7Bottom = winh * 7;

    scrollPos = Number($(window).scrollTop().toFixed(2));
    page = Math.floor(Number(scrollPos / winh) + 1);
    if (scrollPos >= 0 && scrollPos < page1Bottom) {
      if (!$bgImg.hasClass("bg-img1")) {

        removeBg($bgImg, 1, 4, 1); // element, low, high, current
        $bgImg.addClass("bg-img1");
      }
      if (isAnimationOn && ! bgImg1.hasClass("animTurntableLights")) {
        bgImg1.addClass("animTurntableLights");
      }

    } else if (scrollPos >= page3Top && scrollPos <= page3Bottom) {
      if (!$bgImg.hasClass("bg-img2")) {

        removeBg($bgImg, 1, 4, 2); // element, low, high, current
        $bgImg.addClass("bg-img2");
      }
      if (isAnimationOn && bgImg1.hasClass("animTurntableLights")) {
        bgImg1.removeClass("animTurntableLights");
      }
    } else if (scrollPos >= page5Top && scrollPos <= page5Bottom) {
      if (!$bgImg.hasClass("bg-img3")) {

        removeBg($bgImg, 1, 4, 3); // element, low, high, current
        $bgImg.addClass("bg-img3");
      }
      if (isAnimationOn && bgImg1.hasClass("animTurntableLights")) {
        bgImg1.removeClass("animTurntableLights");
      }
    } else if (scrollPos >= page7Top && scrollPos <= page7Bottom) {
      if (!$bgImg.hasClass("bg-img4")) {

        removeBg($bgImg, 1, 4, 4); // element, low, high, current
        $bgImg.addClass("bg-img4");
      }
      if (isAnimationOn && bgImg1.hasClass("animTurntableLights")) {
        bgImg1.removeClass("animTurntableLights");
      }
    }
    if (isDebug) {
      $info.html("Page# " + page + " Pos: " + scrollPos);
    }
  }); // window scroll

  // Start Promo Animation

  if (isAnimationOn) {
    var pro1 = $("#pro1");

    pro1.toggleClass("animEvent1");
    $("#pro2").toggleClass("animEvent2");
    $("#pro3").toggleClass("animEvent3");
    $("#pro4").toggleClass("animEvent4");
    pro1.on("animationend webkitAnimationEnd", function(e) {
      if (e.originalEvent.animationName === "fadeOutUp") {
        console.log("promo animation ended");
        pro1.off("animationend webkitAnimationEnd");
        bgImg1.toggleClass("animTurntableLights");
      }
    });
  } // isAnimationOn

  // Collapsable menu -- ADD FULL BACKGROUND COVER
  var navFixedTop = $(".navbar-fixed-top");
  var collapse = $(".collapse");
  collapse.on("show.bs.collapse", function() {
    if (!navFixedTop.hasClass("navbar-bg-long")) {
      navFixedTop.addClass("navbar-bg-long");
    }
  });
  // Collapsable menu -- REMOVE FULL BACKGROUND COVER
  collapse.on("hide.bs.collapse", function() {
    if (navFixedTop.hasClass("navbar-bg-long")) {
      navFixedTop.removeClass("navbar-bg-long");
    }
  });
  // Collapsable menu -- REMOVE FULL BACKGROUND COVER on window resize.
  $(window).on("resize", function() {
    if ($(window).width() > 767 && navFixedTop.hasClass("navbar-bg-long")) {
      navFixedTop.removeClass("navbar-bg-long");
      collapse.collapse("hide");
    }
  });

  // Hover over dropdown menu will open menu too
  /*
    $(".dropdown")
      .not (".open")

      .hover(function () {
        $(this)
          .find(".dropdown-menu")
          .first()
          .stop(true, true)
          .slideDown("fast");
    }, function () {
        $(this)
          .not (".open")
          .find(".dropdown-menu")
          .first()
          .stop(true, true)
          .slideUp("fast");
    });
*/

  // waypoint used to fade things into view when scrolled to
  $(".animation-off").waypoint(function() {
    var self = this.element;
    $(self).addClass("animatedFadeInUp");
  }, {
    offset: "90%"
  });

  // Check if entering/exiting full screen mode with keydown event
  $("body").keydown(function(e) {
    //catch F11 (fullscreen) key code and prevent default action
    var keyCode = e.keyCode || e.which;
    if (keyCode == 122) {
      e.preventDefault();
    }
  });
  // Adaptive Image Processing -- Set true if using background-size:contain
  if (isAdaptiveImageOn) {
    var intro = document.getElementById("intro");
    var introFiller = document.getElementById("bg-img1-filler");
    // var imagePosY = parseInt($(".bg-img").css("backgroundPositionY"), 10);
    var imagePosY = parseInt(window.getComputedStyle(intro, "::before").getPropertyValue("background-position-y"), 10);
    var img = new Image();
    // img.src = window.getComputedStyle(intro).getPropertyValue("background-image").replace(/url\(|\)$/ig, "");
    img.src = "https://res.cloudinary.com/djhkdplck/image/upload/v1488045779/turntables1-bw2-test.png";
    var introHeight = window.innerHeight - imagePosY;
    var bgImgHeight = window.innerWidth * img.height / img.width;
    var bgGap = introHeight - bgImgHeight;
    bgGap = (bgGap < 0) ? 0 : bgGap;
    var bgGap1024 = bgGap;
    // resize function is an event handler. Must pass in imagePosY as a parameter
    // to handler due to imagePosY losing scope (don't ask me why it is losing scope)
    window.addEventListener("resize", function() {
      resize(imagePosY)
    }, false);
    window.addEventListener("scroll", function() {
      resize(imagePosY)
    }, false);

    resize(imagePosY);
  }

  function resize(imagePosY) {
    // If intro is anywhere in view resize the intro background image
    if (isScrolledIntoView(intro)) {
      // Image Resized and rounded to Integer
      introHeight = window.innerHeight - imagePosY;
      bgImgHeight = window.innerWidth * img.height / img.width;
      bgGap = introHeight - bgImgHeight;
      bgGap = (bgGap < 0) ? 0 : bgGap;
      // $(window).width() does not accurately match media-queries use this function to get width
      var v = viewport();
      if (v.width > 1024) {
        /* Fill Gap is same size of image offset (ie. navbar) on desktop views */
        intro.style.height = bgImgHeight + bgGap1024 + "px";
        introFiller.style.height = (bgGap1024 + 1) + "px";
        introFiller.style.bottom = Math.round(introHeight - (bgImgHeight + bgGap1024)) + "px";
      } else {
        intro.style.height = introHeight + "px";
        introFiller.style.height = (bgGap + 1) + "px";
        introFiller.style.bottom = Math.round(introHeight - (bgImgHeight + bgGap)) + "px";
      }

      if (isDebug) {
        var h = window.getComputedStyle(intro).getPropertyValue("height");
        var w = window.getComputedStyle(intro).getPropertyValue("width");
        document.getElementById("bg-img1-filler").innerHTML = "Height: " + h + " Width: " + w;
      }
    } // isScrolledIntoView
  } // resize

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom >= docViewTop) || (elemTop >= docViewBottom));
  }

  function viewport() {
    var e = window;
    var a = "inner";
    if (!("innerWidth" in window)) {
      a = "client";
      e = document.documentElement || document.body;
    }
    return {
      width: e[a + "Width"],
      height: e[a + "Height"]
    };
  }

  // This function was created to fix a problem where the mouse moves off the
  // screen, this results in improper removal of background image class. Fix
  // by removing any background class not applicable to current page.
  function removeBg(el, low, high, current) {
    if (low > high || low <= 0 || high <= 0) {
      console.log("bad low/high parameters in removeBg");
    }
    for (var i = low; i <= high; i++) {
      if (i != current) { // avoid removing class we are trying to add
        if (el.hasClass("bg-img" + i)) {
          el.removeClass("bg-img" + i);
        }
      }
    }
  } // removeBg()

});
