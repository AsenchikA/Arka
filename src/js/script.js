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
  anchorScroll('.btn-back'); 

  $('#header-toggler').on('click', function(e) {
    e.preventDefault();
    $('#page-header')[0].classList.toggle('page-header--mobile-menu');
    $('#promo')[0].classList.toggle('promo--hidden');
    this.classList.toggle('toggler--close');
  })

//карусель для преимуществ на разрешении < 1200

  $owlAdvantages = $('body').find('#advantages');

  // set the owl-carousel otions
  var carousel_advantages_Settings = {
    loop: true,
    nav: false,
    items: 1,
    dots: true,
    dotsClass: 'carousel-dots advantages__dots',
  };

  function initializeOwlAdvantages() {
    var containerWidth = document.body.clientWidth;
    if (containerWidth <= 1200) {
      // initialize owl-carousel if window screensize is less the 1200px
      $owlAdvantages.owlCarousel(carousel_advantages_Settings);
    } else {
      // destroy owl-carousel and remove all depending classes if window screensize is bigger then 767px
      $owlAdvantages.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
      $owlAdvantages.find('.owl-stage-outer').children().unwrap();
    }
  }

  // initilize after window resize
  var id;
  $(window).resize(function () {
    clearTimeout(id);
    id = setTimeout(initializeOwlAdvantages, 500);
  });

  // initilize onload
  initializeOwlAdvantages();

  // карусель для типов номеров

  $('#rooms-slider').owlCarousel({
    loop: true,
    nav: true,
    navClass: ['rooms-list__arrow rooms-list__arrow--prev', 'rooms-list__arrow rooms-list__arrow--next'],
    navText: ['', ''],
    items: 1,
    mouseDrag: false,
    touchDrag: false,
    autoHeight: true
  });

  // карусель для галереи

  $('.room-item__gallery').owlCarousel({
    loop: true,
    responsive:{
      0:{
          items:1,
          dots: true,
          dotsClass: 'carousel-dots room-item__gallery-dots',
      },
      1200:{
          items:4,
          dots: false
      }
    }
  });

  // выбранная фото из галереи -> в большое фото
  $('[id ^= gallery]').click(function (event) {
    event.preventDefault();
    var numberType = event.currentTarget.id.slice(8);
    $('.active #' + numberType + ' .room-item__main-photo img').attr('src', event.target.src);
  });

  // карусель отзывов
  $('#reviews-list').owlCarousel({
    loop: true,
    arrows: false,
    items: 1,
    dots: true,
    dotsClass: 'carousel-dots reviews-list__dots',
    autoplay: true,
    autoHeight: true
  });

  var id;
  $(window).resize(function () {
    clearTimeout(id);
    id = setTimeout(initializeOwlAdvantages, 500);
  });



  function initializeDatepicker() {
    if (document.body.clientWidth >= 1200) {
      $('input[type="date"]').pickadate({
        today: '',
        clear: '',
        close: ''
      });
    }
  }
  // initilize onload
  initializeDatepicker();

  function toggleClassesRoom(numberType) {
    $('.active #' + numberType + ' .room-item__info-description')[0].classList.toggle('room-item__info-description--hidden');
    $('.active #' + numberType + ' .room-item__book-form')[0].classList.toggle('room-item__book-form--hidden');
    $('.rooms-list__arrow--prev')[0].classList.toggle('rooms-list__arrow--prev-hidden');
    $('.rooms-list__arrow--next')[0].classList.toggle('rooms-list__arrow--next-hidden');
    $('.active #' + numberType + ' .book-form__close')[0].classList.toggle('book-form__close--hidden');
    if (document.body.clientWidth < 1200) {
      $('.active #' + numberType)[0].classList.toggle('room-item--book');
    }
  }

  // показываем/скрываем блок брони
  $('[id ^= book]').on('click', function (e) {
    var numberType = e.target.id.slice(5);
    toggleClassesRoom(numberType);
    $('body,html').animate({ 'scrollTop': $('#rooms').offset().top - 20 }, Math.abs($(document).scrollTop() - $('#rooms').offset().top) / 3);
  });
  $('.book-form__close').on('click', function (e) {
    var numberType = e.target.id.slice(14);
    toggleClassesRoom(numberType);
  });
  $('[id ^= confirm-btn]').on('click', function (e) {
    var numberType = e.target.id.slice(12);
    toggleClassesRoom(numberType);
    $('#modal')[0].classList.remove('modal--hidden');
    setTimeout(function() {
      $('#modal')[0].classList.add('modal--hidden')
    }, 3000);
  })
});