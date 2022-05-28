$(function(){
  $('.js-modal-open').on('click',function(){
      $('.js-modal').fadeIn();
      $(".swiper").addClass("hidden");
      return false;
  });
  $('.js-modal-close').on('click',function(){
      $('.js-modal').fadeOut();
      $('.swiper').delay(250).queue(function() {
        $(this).removeClass('hidden').dequeue();
      });
      return false;
  });
});
console.log;