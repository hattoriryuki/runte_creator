window.addEventListener('DOMContentLoaded', function(){
  const swiper = new Swiper(".swiper", {
    loop: true,
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
