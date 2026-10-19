// Galerie produit : flèches, miniatures, suivi de l'image visible.
document.querySelectorAll('[data-gallery]').forEach(function (gallery) {
  var track = gallery.querySelector('[data-track]');
  if (!track) return;
  var thumbs = gallery.querySelectorAll('.gallery__thumb');

  function goTo(index) {
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  }
  function current() {
    return Math.round(track.scrollLeft / track.clientWidth);
  }

  var prev = gallery.querySelector('[data-prev]');
  var next = gallery.querySelector('[data-next]');
  if (prev) prev.addEventListener('click', function () { goTo(Math.max(0, current() - 1)); });
  if (next) next.addEventListener('click', function () { goTo(Math.min(track.children.length - 1, current() + 1)); });
  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () { goTo(Number(thumb.dataset.index)); });
  });
  track.addEventListener('scroll', function () {
    var i = current();
    thumbs.forEach(function (t, n) { t.classList.toggle('is-active', n === i); });
  }, { passive: true });
});

// Fiche produit : choix des options -> variante, prix et quantité.
document.querySelectorAll('[data-product-form]').forEach(function (form) {
  var dataEl = form.querySelector('[data-variants]');
  if (!dataEl) return;
  var variants = JSON.parse(dataEl.textContent);
  var idInput = form.querySelector('[data-variant-id]');
  var addBtn = form.querySelector('[data-add]');
  var addLabel = form.querySelector('[data-add-label]');
  var section = form.closest('[data-product]');
  var priceEl = section && section.querySelector('[data-price]');

  form.addEventListener('change', function (e) {
    var fieldset = e.target.closest('.option');
    if (!fieldset) return;
    var label = fieldset.querySelector('[data-option-label]');
    if (label) label.textContent = e.target.value;

    var selected = Array.prototype.map.call(form.querySelectorAll('.option'), function (fs) {
      var checked = fs.querySelector('input:checked');
      return checked ? checked.value : null;
    });
    var variant = variants.find(function (v) {
      return v.options.every(function (opt, i) { return opt === selected[i]; });
    });

    if (!variant) {
      addBtn.disabled = true;
      addLabel.textContent = 'Indisponible';
      return;
    }
    idInput.value = variant.id;
    addBtn.disabled = !variant.available;
    addLabel.textContent = variant.available ? 'Ajouter au panier' : 'Épuisé';
    if (priceEl) {
      priceEl.textContent = variant.price;
      if (variant.compare) {
        var s = document.createElement('s');
        s.textContent = variant.compare;
        priceEl.append(' ', s);
      }
    }
    var url = new URL(window.location.href);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', url);
  });

  form.querySelectorAll('[data-qty]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = form.querySelector('input[name="quantity"]');
      input.value = Math.max(1, (parseInt(input.value, 10) || 1) + Number(btn.dataset.qty));
    });
  });
});
