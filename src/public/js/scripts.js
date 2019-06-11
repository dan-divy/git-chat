// CUSTOM KEYSOFT SCRIPTS

    // CHECK IF ELEMENT IS IN VIEW

    (function($) {
      $.belowthefold = function(element, settings) {
        var fold = $(window).height() + $(window).scrollTop();
        return fold <= $(element).offset().top - settings.threshold;
      };
      $.abovethetop = function(element, settings) {
        var top = $(window).scrollTop();
        return top >= $(element).offset().top + $(element).height() - settings.threshold;
      };
      $.rightofscreen = function(element, settings) {
        var fold = $(window).width() + $(window).scrollLeft();
        return fold <= $(element).offset().left - settings.threshold;
      };
      $.leftofscreen = function(element, settings) {
        var left = $(window).scrollLeft();
        return left >= $(element).offset().left + $(element).width() - settings.threshold;
      };
      $.inviewport = function(element, settings) {
        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
      };
      $.extend($.expr[':'], {
        "below-the-fold": function(a, i, m) {
          return $.belowthefold(a, {
            threshold: 0
          });
        },
        "above-the-top": function(a, i, m) {
          return $.abovethetop(a, {
            threshold: 0
          });
        },
        "left-of-screen": function(a, i, m) {
          return $.leftofscreen(a, {
            threshold: 0
          });
        },
        "right-of-screen": function(a, i, m) {
          return $.rightofscreen(a, {
            threshold: 0
          });
        },
        "in-viewport": function(a, i, m) {
          return $.inviewport(a, {
            threshold: 0
          });
        }
      });
    })(jQuery);


    $(document).ready(function() {

      // LIVE PREVIEW CUSTOMIZER

      $("#customizer .options").click(function() {
        $("#customizer").toggleClass('active');
      });

      $("#customizer #colors a").click(function() {
        var colorClass = $(this).attr('id');
        if (colorClass == 'blue') {
          $('.css-color').attr('href', '#');
        }
        $('.css-color').attr('href', 'css/colors/' + colorClass + '.css');

      });

      // HEADER PARTICLES EFFECT

      if ($(window).width() > 960) {
        var density = {
          "enable": true,
          "value_area": 2000
        }
      } else {
        var density = {
          "enable": true,
          "value_area": 500
        }
      }

        particlesJS("particles-js", {
          "particles": {
            "number": {
              "value": 120,
              "density": density
            },
            "color": {
              "value": "#ffffff"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 3
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.2,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 20,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 250,
              "color": "#ffffff",
              "opacity": 0.2,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 1,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "window",
            "events": {
              "onhover": {
                "enable": false,
                "mode": "grab"
              },
              "onclick": {
                "enable": false,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 180,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        });

      

      // PRELOADER      

      $(window).load(function() {
        $('#preloader').fadeOut('slow', function() {
          $(this).remove();
        });
      });

      // FEATURES SECTION TABS

      $('#features-tabs').easytabs({
        animationSpeed: 'normal',
        updateHash: false
      });

      // PIE CHARTS

      $(window).bind("scroll", function(event) {
        if($('.chart:in-viewport').easyPieChart) {
          $('.chart:in-viewport').easyPieChart({
          animate: 2000,
          barColor: '#1080f2',
          lineWidth: 3,
          easing: 'easeOutBounce',
          lineCap: 'square',
          size: 230,
          trackColor: false,
          scaleColor: false,
          animate: {
            duration: 1500,
            enabled: true
          }
        });
      }
      });

      //AUTO PLAY YOUTUBE VIDEO

      function autoPlayYouTubeModal() {
        var trigger = $("body").find('[data-toggle="modal"]');
        trigger.click(function() {
          var theModal = $(this).data("target"),
            videoSRC = $('#video-modal iframe').attr('src'),
            videoSRCauto = videoSRC + "?autoplay=1";
          $(theModal + ' iframe').attr('src', videoSRCauto);
          $(theModal + ' button.close').click(function() {
            $(theModal + ' iframe').attr('src', videoSRC);
          });
          $('.modal').click(function() {
            $(theModal + ' iframe').attr('src', videoSRC);
          });
        });
      }
      autoPlayYouTubeModal();

      // TESTIMONIALS SLIDER

      $("#testimonials .slider").owlCarousel({
        navigation: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
      });

      // CLIENTS SLIDER

      $("#clients .slider").owlCarousel({
        navigation: true,
        pagination: false,
        autoPlay: 5000, //Set AutoPlay to 3 seconds 
        items: 5,
      });

      // MAIN MENU TOGGLE AND SMOOTH SCROLL


      $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
      });

      $(function() {
        $('a.page-scroll').bind('click', function(event) {
          var $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 64
          }, 1500, 'easeInOutExpo');
          event.preventDefault();
        });
      });

      $('body').scrollspy({
        offset: 64,
        target: '.navbar-fixed-top'
      })

    });

    // CLASSIE SCRIPT

    (function(window) {

      'use strict';

      function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
      }


      var hasClass, addClass, removeClass;

      if (document.documentElement && document.documentElement.classList) {
        hasClass = function(elem, c) {
          if(!elem) return;
          return elem.classList.contains(c);
        };
        addClass = function(elem, c) {
          if(!elem) return;
          elem.classList.add(c);
        };
        removeClass = function(elem, c) {
          if(!elem) return;
          elem.classList.remove(c);
        };
      } else {
        hasClass = function(elem, c) {
          return classReg(c).test(elem.className);
        };
        addClass = function(elem, c) {
          if (!hasClass(elem, c)) {
            elem.className = elem.className + ' ' + c;
          }
        };
        removeClass = function(elem, c) {
          elem.className = elem.className.replace(classReg(c), ' ');
        };
      }

      function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
      }

      var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
      };

      // transport
      if (typeof define === 'function' && define.amd) {
        // AMD
        define(classie);
      } else {
        // browser global
        window.classie = classie;
      }

    })(window);


    // ANIMATED MENU

    var cbpAnimatedHeader = (function() {

      var docElem = document.documentElement,
        header = document.querySelector('.navbar-default'),
        didScroll = false,
        changeHeaderOn = 50;

      function init() {
        window.addEventListener('scroll', function(event) {
          if (!didScroll) {
            didScroll = true;
            setTimeout(scrollPage, 100);
          }
        }, false);
        window.addEventListener('load', function(event) {
          if (!didScroll) {
            didScroll = true;
            setTimeout(scrollPage, 100);
          }
        }, false);
      }

      function scrollPage() {
        if(!classie) return;
        var sy = scrollY();
        if (sy >= changeHeaderOn) {
          classie.add(header, 'navbar-shrink');
        } else {
          classie.remove(header, 'navbar-shrink');
        }
        didScroll = false;
      }

      function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
      }

      init();

    })();
