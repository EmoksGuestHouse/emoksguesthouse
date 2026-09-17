document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      header.classList.toggle('nav-open');
    });
  }

  document.querySelectorAll('.main-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      header.classList.remove('nav-open');
    });
  });

  initLightbox();
});

function initLightbox() {
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Previous photo">&#8249;</button>' +
    '<img class="lightbox-img" alt="">' +
    '<button class="lightbox-next" aria-label="Next photo">&#8250;</button>';
  document.body.appendChild(overlay);

  var imgEl = overlay.querySelector('.lightbox-img');
  var prevBtn = overlay.querySelector('.lightbox-prev');
  var nextBtn = overlay.querySelector('.lightbox-next');
  var closeBtn = overlay.querySelector('.lightbox-close');

  var currentGroup = [];
  var currentIndex = 0;

  function show(index) {
    currentIndex = (index + currentGroup.length) % currentGroup.length;
    imgEl.src = currentGroup[currentIndex].src;
    imgEl.alt = currentGroup[currentIndex].alt || '';
    var multiple = currentGroup.length > 1;
    prevBtn.style.display = multiple ? 'flex' : 'none';
    nextBtn.style.display = multiple ? 'flex' : 'none';
  }

  function open(group, index) {
    currentGroup = group;
    show(index);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.room-card').forEach(function (card) {
    var imgs = Array.prototype.slice.call(card.querySelectorAll('.room-photo img, .room-gallery img'));
    var seen = {};
    var group = [];
    imgs.forEach(function (img) {
      if (!seen[img.src]) {
        seen[img.src] = true;
        group.push(img);
      }
    });
    imgs.forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        var index = group.findIndex(function (g) { return g.src === img.src; });
        open(group, index === -1 ? 0 : index);
      });
    });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  prevBtn.addEventListener('click', function () { show(currentIndex - 1); });
  nextBtn.addEventListener('click', function () { show(currentIndex + 1); });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  });
}
