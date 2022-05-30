window.Cookies = require("js-cookie")
$(function(){
  $('.js-modal').show();
  Cookies.get('btnFlg') == 'on'?$('.js-modal').hide():$('.js-modal').show();
  setTimeout(function(){
    $('.js-modal').fadeOut();
    Cookies.set('btnFlg', 'on', { expires: 0.5,path: '/' });
  }, 800);
});
