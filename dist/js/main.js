(function ($){
"use strict";
let vw = document.documentElement.clientWidth,
    wh = $(window).innerHeight(),
    HeaderHeight = $("header").innerHeight();

//2- Header
//2.1- sticky navbar 
$(window).scroll(function () {
   let sw = $(this).scrollTop();
   if (sw > 300){
      $("header").addClass(["sticky", "sticky-top"]);
   } else {
      if (!$(".mobile-menu i").hasClass("fa-close")) {
         $("header").removeClass(["sticky", "sticky-top"]);
      }
   }
});

//2.2- mobile-menu
$(".mobile-menu i").on("click", function() {
   $(this).toggleClass("fa-navicon fa-close");
   $(".navbar").slideToggle("fast");
   if ($(this).hasClass("fa-close")) {
      $("header").addClass("sticky");
   }else {
      setTimeout(function() {
         if(!$("header").hasClass("sticky-top")) {
            $("header").removeClass("sticky");
         }
      }, 200);
   }
});

//2.3- navbar links effict
if (vw < 992) {
   $(".navbar li a").addClass("mobile").removeClass("laptop");
}else {
   $(".navbar li a").addClass("laptop").removeClass("mobile");
}

//2.4- on click on navbar links
$(".navbar li a").on("click", function(e) {
   e.preventDefault();
   let target = $(this).attr("href");
   if (vw < 992) {
      $(".mobile-menu i").click();
   }
   $(this).addClass("active").parent().siblings().find("a").removeClass("active");
   $("body,html").animate({
      scrollTop : $(target).offset().top - HeaderHeight
   }, 500);
});

//2.5- Add Class active on link when window scrolling
$(window).scroll(function() {
   $("section, #home").each(function() {
      if ($(window).scrollTop() >= $(this).offset().top-$("header").innerHeight()) {
         let sectionId = $(this).attr("id");
         $(".navbar li a[data-scroll ='" + sectionId + "']").addClass("active").parent().siblings().find("a").removeClass("active");
      }
   });
});


//3. Silder`
//3.1 - Slider content animation
$(window).on("DOMContentLoaded", function () {
   $(".slider-text , .slider-btn, .slider-img").css({
      transform : "translate(0)",
      opacity : "1"
   });
});

//3.2- on click on read more button
$(".slider-btn").on("click", function() {
   $("body,html").animate({
      scrollTop : $("#about").offset().top
   },200);
});

//4. About 
//4.1- change header place
if (vw < 768) {
   $("#about").find(".head").remove();
   $("#about").prepend(`
      <div class="head-center">
         <h1 class="head-title">About <span>Me</span></h1>
         <span class="head-line"></span>
      </div>
   `);
   $("#skills .skills-content:first-child, .tools-content:first-child").removeClass("head").addClass("head-center");
}

//4.2- on click on contact me button
$(".about-btn").on("click", function(e) {
   e.preventDefault();
   $("body,html").animate({
      scrollTop : $("#contact").offset().top - HeaderHeight
   },1000);
});

//5. Services Section
//5.1 - services item effect 
$(window).scroll(function () {
   let ws = $(this).scrollTop();
   if (ws > $(".service-item.one").offset().top - wh-20) {
      $(".service-item.one").css({
         opacity : "1",
         transform : "translate(0)"
      });
   }
   if (ws > $(".service-item.two").offset().top - wh-20) {
      $(".service-item.two").css({
         opacity : "1",
         transform : "translate(0)"
      });
   }
   if (vw > 576){
      if (ws > $(".service-item.three").offset().top - wh - 20 - $(".service-item.three").innerHeight()) {
         $(".service-item.three").css({
            opacity : "1",
            transform : "translate(0)"
         });
      }
   } else {
      if (ws > $(".service-item.three").offset().top - wh - 20) {
         $(".service-item.three").css({
            opacity : "1",
            transform : "translate(0)"
         });
      }
   }
});

//6. Skills section
//6.1 - animate ptogress-rate 
$(window).scroll(function () {
   let skillsSection = $(".skills-content").offset().top - wh + 200;
   if ($(this).scrollTop() > skillsSection) {
      $(".progress-rate").each(function(e) {
         let width = $(this).data("width");
         $(this).animate({
            width: width
         },1500,function(){
            $(this).text(width);
            $(this).css("padding-right", "5px");
         });
      });
   }
});

//7. Works Section
//7.1- add active class when click on works-list-item 
$(".works-list .works-list-item").on("click", function() {
   let type = $(this).data("type");
   let image = $(".work-content .work-img");
   $(this).addClass("active").siblings().removeClass("active");
   if (type === "all") {
      if (vw < 576) {
         image.removeClass("popOut");
         setTimeout(function() {image.show()}, 400)
      }else {
         image.removeClass("hide");
      }
   }else {
      if (vw < 576) {
         image.addClass("popOut");
         setTimeout(function() {image.hide()}, 400);
         $(`.work-content .${type}`).removeClass("popOut");
         setTimeout(function() {$(`.work-content .${type}`).show()}, 400)
      }else {
         image.addClass("hide");
         $(`.work-content .${type}`).removeClass("hide");
      }
   }
});

//8. testimonial carousel
$('.testimonial-content.owl-carousel').owlCarousel({
   loop:true,
   margin:10,
   autoplay:true,
   responsive:{
       0:{items:1},
       700:{items:2},
       992:{items:3},
   }
});

//9. contact Section
//9.1- on click on contact me button
$(".contact-link").on("click", function(e) {
   e.preventDefault();
   $("body,html").animate({
      scrollTop : $("#contact").offset().top - HeaderHeight
   },200);
});

})(jQuery);