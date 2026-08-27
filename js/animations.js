/* animations.js — Scroll reveal animations */

(function () {
  'use strict';

  var revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  /* Respect reduced motion */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (var i = 0; i < revealElements.length; i++) {
      revealElements[i].classList.add('is-visible');
    }
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('is-visible');
          observer.unobserve(entries[i].target);
        }
      }
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  for (var j = 0; j < revealElements.length; j++) {
    observer.observe(revealElements[j]);
  }
})();
