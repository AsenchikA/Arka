$(document).ready(function () {

  //плавная прокрутка страницы

  function anchorScroll(boxAnchorLink) {

    $(boxAnchorLink + ' a').on('click', function (e) {
      e.preventDefault();
      var attr = $(this).attr('href').substring(1);
      var currentPosition = $(document).scrollTop();
      var idPosition = $('#' + attr).offset().top;
      var scrollTime = Math.abs(currentPosition - idPosition) / 3;
      $('body,html').animate({ 'scrollTop': idPosition }, scrollTime);
    });

  };


  anchorScroll('#main-nav');
  anchorScroll('.promo');

  $('#rooms-slider').owlCarousel({
    loop: true,
    nav: true,
    navClass: ['rooms-list__arrow rooms-list__arrow--prev','rooms-list__arrow rooms-list__arrow--next'],
    navText: ['',''],
    items: 1,
    mouseDrag: false
  });

  $('.room-item__gallery').owlCarousel({
    items: 4,
    loop: true,
    dots: false
  });

  $('[id ^= gallery]').click( function(event){
    event.preventDefault();
    var numberType = event.currentTarget.id.slice(8);
    $('.active #' + numberType + ' .room-item__main-photo img').attr('src', event.target.src);
  });

  $('#reviews-list').owlCarousel({
    loop: true,
    arrows: false,
    items: 1,
    dots: true,
    dotsClass: 'reviews-list__dots',
    autoplay: true
  });

  $('input[type="date"]').pickadate({
    today:'',
    clear:'',
    close:''
  });

  $('[id ^= book]').on('click', function (e) {
    var numberType = e.target.id.slice(5);
    $('.active #' + numberType + ' .room-item__info-description')[0].classList.toggle('room-item__info-description--hidden');
    $('.active #' + numberType + ' .room-item__book-form')[0].classList.toggle('room-item__book-form--hidden');
    $('.rooms-list__arrow--prev')[0].classList.toggle('rooms-list__arrow--prev-hidden');
    $('.rooms-list__arrow--next')[0].classList.toggle('rooms-list__arrow--next-hidden');
    $('.active #' + numberType + ' .book-form__close')[0].classList.toggle('book-form__close--hidden');
  });
  $('.book-form__close').on('click', function (e) {
    var numberType = e.target.id.slice(14);
    $('.active #' + numberType + ' .room-item__info-description')[0].classList.toggle('room-item__info-description--hidden');
    $('.active #' + numberType + ' .room-item__book-form')[0].classList.toggle('room-item__book-form--hidden');
    $('.rooms-list__arrow--prev')[0].classList.toggle('rooms-list__arrow--prev-hidden');
    $('.rooms-list__arrow--next')[0].classList.toggle('rooms-list__arrow--next-hidden');
    $('.active #' + numberType + ' .book-form__close')[0].classList.toggle('book-form__close--hidden');
  });
});