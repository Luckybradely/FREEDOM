document.addEventListener('click', function (e) {
  var thumb = e.target.closest('.product__thumb');
  if (!thumb) return;
  var gallery = thumb.closest('[data-gallery]');
  var main = gallery && gallery.querySelector('[data-gallery-main]');
  if (!main) return;
  main.removeAttribute('srcset');
  main.src = thumb.dataset.src;
  gallery.querySelectorAll('.product__thumb').forEach(function (t) { t.classList.remove('is-active'); });
  thumb.classList.add('is-active');
});
