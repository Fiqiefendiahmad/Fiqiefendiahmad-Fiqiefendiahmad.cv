/* nav.js — Sticky nav scroll effect + mobile menu */

(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  var mobile = document.querySelector('.nav__mobile');

  if (!nav) return;

  /* Scroll effect */
  var scrollThreshold = 10;

  function onScroll() {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile toggle */
  if (!toggle || !mobile) return;

  toggle.addEventListener('click', function () {
    var isOpen = toggle.classList.toggle('is-open');
    mobile.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close on link click */
  var mobileLinks = mobile.querySelectorAll('a');
  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener('click', function () {
      toggle.classList.remove('is-open');
      mobile.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }
})();
