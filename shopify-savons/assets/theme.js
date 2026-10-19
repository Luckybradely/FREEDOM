// Galerie produit : miniatures et flèches.
document.querySelectorAll('[data-gallery]').forEach(function (gallery) {
  var main = gallery.querySelector('[data-gallery-main]');
  var thumbs = Array.prototype.slice.call(gallery.querySelectorAll('.product__thumb'));
  if (!main || thumbs.length === 0) return;

  function show(index) {
    var thumb = thumbs[(index + thumbs.length) % thumbs.length];
    main.removeAttribute('srcset');
    main.src = thumb.dataset.src;
    thumbs.forEach(function (t) { t.classList.toggle('is-active', t === thumb); });
  }
  function active() {
    return thumbs.findIndex(function (t) { return t.classList.contains('is-active'); });
  }

  thumbs.forEach(function (thumb, i) { thumb.addEventListener('click', function () { show(i); }); });
  gallery.querySelectorAll('[data-step]').forEach(function (btn) {
    btn.addEventListener('click', function () { show(active() + Number(btn.dataset.step)); });
  });
});

// Carrousel d'avis : flèches.
document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
  var track = carousel.querySelector('[data-carousel-track]');
  carousel.querySelectorAll('[data-carousel-step]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = track.firstElementChild;
      var step = card ? card.getBoundingClientRect().width + 16 : track.clientWidth;
      track.scrollBy({ left: step * Number(btn.dataset.carouselStep), behavior: 'smooth' });
    });
  });
});
