$(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 60) {
      $(".offerHeader").addClass("scrolled");
    } else {
      $(".offerHeader").removeClass("scrolled");
    }
  });
});
