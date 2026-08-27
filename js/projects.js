/* projects.js — Project filter functionality */

(function () {
  'use strict';

  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card[data-category]');

  if (!filterBtns.length || !projectCards.length) return;

  for (var i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener('click', function () {
      var filter = this.getAttribute('data-filter');

      /* Update active button */
      for (var j = 0; j < filterBtns.length; j++) {
        filterBtns[j].classList.remove('is-active');
      }
      this.classList.add('is-active');

      /* Filter cards */
      for (var k = 0; k < projectCards.length; k++) {
        var card = projectCards[k];
        var category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          /* Trigger reflow then animate in */
          (function (c) {
            requestAnimationFrame(function () {
              c.style.transition = 'opacity 250ms ease, transform 250ms ease';
              c.style.opacity = '1';
              c.style.transform = 'translateY(0)';
            });
          })(card);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          (function (c) {
            setTimeout(function () {
              c.style.display = 'none';
            }, 250);
          })(card);
        }
      }
    });
  }
})();
