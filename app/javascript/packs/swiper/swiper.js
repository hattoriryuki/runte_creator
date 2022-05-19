window.addEventListener('DOMContentLoaded', function(){
  const swiper = new Swiper(".swiper", {
    spaceBetween: 50,
    pagination: {
      el: ".swiper-pagination"
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
});
