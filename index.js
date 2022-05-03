$(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 60) {
      $(".offerHeader").addClass("scrolled");
    } else {
      $(".offerHeader").removeClass("scrolled");
    }
  });

  if (location.hash) {
    $(location.hash + ".collapse").collapse("show");
  }

  $("[data-target]").on("click", function () {
    location.href = $(this).data("target");
  });
});
