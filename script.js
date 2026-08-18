// ===== MultiDB =====
// Charge la liste des mods/textures depuis mods.json
// Gère l'affichage (liste + page détail), la recherche, la traduction et les filtres

(function () {
  'use strict';

  // ========== SYSTÈME DE TRADUCTION ==========
  var translations = {
    fr: {
      'hero-title-start': 'Mods',
      'hero-title-gradient': '& Textures',
      'hero-subtitle': 'Parcours, découvre et télécharge des mods et packs de textures créés par la communauté.',
      'search-placeholder': 'Rechercher un mod, un auteur…',
      'filter-all': 'Tout',
      'filter-mods': 'Mods',
      'filter-textures': 'Packs de textures',
      'filter-games': 'Jeux',
      'sort-label': 'Trier :',
      'sort-downloads-desc': 'Du plus téléchargé au moins téléchargé',
      'sort-downloads-asc': 'Du moins téléchargé au plus téléchargé',
      'sort-name-asc': 'Ordre alphabétique',
      'sort-name-desc': 'Ordre alphabétique inversé',
      'loading-label': 'Chargement…',
      'loading-mods': 'Chargement des mods…',
      'error-load': 'Impossible de charger la liste des mods. Réessaie plus tard.',
      'mod-found-singular': 'mod trouvé',
      'mod-found-plural': 'mods trouvés',
      'no-results': 'Aucun élément ne correspond à ta recherche.',
      'back-button': '← Retour à la liste',
      'mod-not-found': 'Ce mod n\'existe pas ou plus.',
      'author-label': 'Par',
      'discord-button': 'Discord',
      'discord-copied': 'Nom d\'utilisateur copié !',
      'description-title': 'Description',
      'download-button': 'Télécharger',
      'downloads-label-singular': 'téléchargement',
      'downloads-label-plural': 'téléchargements',
      'footer-text': 'MultiDB — Store communautaire de mods et textures pour MultiCraft. Non affilié à MultiCraft.',
      'page-title': 'MultiDB — Mods & Textures pour MultiCraft',
      'page-description': 'MultiDB, le store communautaire de mods et textures pour MultiCraft.',
      'page-detail-title': '— MultiDB',
      'post-mod-button': 'Poster un mod',
      'post-mod-title': 'Poster un mod',
      'post-mod-text': 'Pour poster un mod, envoie un message sur Discord à <strong>.lucas76.</strong> ou un mail à <a href="mailto:deblock-studios@proton.me">deblock-studios@proton.me</a>.',
      'post-mod-close': 'Fermer',
      'tuto-button': '📖 Tutoriel',
      'survey-text': "Nous aimerions connaitre votre avis sur MultiDB. Nous avons créé un sondage : il ne dure pas plus d'une minute à remplir ! Un grand merci à ceux qui le feront, vous aidez le développement de MultiDB.",
      'survey-btn': '🤝 Donner mon avis',
      'survey-skip': 'Plus tard',
      'connect': 'Se connecter',
      'logout': 'Déconnexion',
      'reviews-title': '⭐ Avis de la communauté',
      'reviews-loading': 'Chargement des avis…',
      'reviews-empty': 'Aucun avis pour l\'instant. Soyez le premier !',
      'reviews-no-rating': 'Aucun avis',
      'reviews-sort-recent': 'Plus récents',
      'reviews-sort-desc': 'Note ↓',
      'reviews-sort-asc': 'Note ↑',
      'reviews-rating-label': 'Votre note',
      'reviews-form-as': 'Laisser un avis en tant que',
      'reviews-placeholder': 'Votre commentaire (optionnel)',
      'reviews-publish': 'Publier',
      'reviews-login-prompt': 'Connectez-vous pour laisser un avis.',
      'reviews-login-btn': 'Se connecter',
      'reviews-success': '✓ Avis publié — merci !',
      'reviews-already': 'Vous avez déjà laissé un avis pour ce mod.',
      'reviews-error': 'Erreur : ',
      'reviews-verified': 'Vérifié',
      'reviews-count-singular': 'avis',
      'reviews-count-plural': 'avis'
    },
    en: {
      'hero-title-start': 'Mods',
      'hero-title-gradient': '& Textures',
      'hero-subtitle': 'Browse, discover and download mods and texture packs created by the community.',
      'search-placeholder': 'Search for a mod, an author…',
      'filter-all': 'All',
      'filter-mods': 'Mods',
      'filter-textures': 'Texture Packs',
      'filter-games': 'Games',
      'sort-label': 'Sort:',
      'sort-downloads-desc': 'Most downloaded',
      'sort-downloads-asc': 'Least downloaded',
      'sort-name-asc': 'Alphabetical (A to Z)',
      'sort-name-desc': 'Alphabetical (Z to A)',
      'loading-label': 'Loading…',
      'loading-mods': 'Loading mods…',
      'error-load': 'Failed to load the mod list. Try again later.',
      'mod-found-singular': 'mod found',
      'mod-found-plural': 'mods found',
      'no-results': 'No items match your search.',
      'back-button': '← Back to list',
      'mod-not-found': 'This mod doesn\'t exist or has been removed.',
      'author-label': 'By',
      'discord-button': 'Discord',
      'discord-copied': 'Username copied!',
      'description-title': 'Description',
      'download-button': 'Download',
      'downloads-label-singular': 'download',
      'downloads-label-plural': 'downloads',
      'footer-text': 'MultiDB — Community store of mods and textures for MultiCraft. Not affiliated with MultiCraft.',
      'page-title': 'MultiDB — Mods & Textures for MultiCraft',
      'page-description': 'MultiDB, the community store of mods and textures for MultiCraft.',
      'page-detail-title': '— MultiDB',
      'post-mod-button': 'Post a mod',
      'post-mod-title': 'Post a mod',
      'post-mod-text': 'To post a mod, send a message on Discord to <strong>.lucas76.</strong> or an email to <a href="mailto:creatif.france@outlook.com">creatif.france@outlook.com</a>.',
      'post-mod-close': 'Close',
      'tuto-button': '📖 Tutorial',
      'survey-text': 'We would love to know your opinion on MultiDB. We created a survey: it takes no more than a minute to fill out! Many thanks to those who will do it, you help develop MultiDB.',
      'survey-btn': '🤝 Give my opinion',
      'survey-skip': 'Later',
      'connect': 'Sign in',
      'logout': 'Log out',
      'reviews-title': '⭐ Community Reviews',
      'reviews-loading': 'Loading reviews…',
      'reviews-empty': 'No reviews yet. Be the first!',
      'reviews-no-rating': 'No reviews',
      'reviews-sort-recent': 'Most recent',
      'reviews-sort-desc': 'Rating ↓',
      'reviews-sort-asc': 'Rating ↑',
      'reviews-rating-label': 'Your rating',
      'reviews-form-as': 'Leave a review as',
      'reviews-placeholder': 'Your comment (optional)',
      'reviews-publish': 'Publish',
      'reviews-login-prompt': 'Log in to leave a review.',
      'reviews-login-btn': 'Log in',
      'reviews-success': '✓ Review published — thanks!',
      'reviews-already': 'You have already left a review for this mod.',
      'reviews-error': 'Error: ',
      'reviews-verified': 'Verified',
      'reviews-count-singular': 'review',
      'reviews-count-plural': 'reviews'
    }
  };

  var currentLang = 'fr';
  var mods = [];
  var loadError = false;
  var currentFilter = 'all';
  var currentSort = 'downloads-desc';
  var downloadCounts = {};

  // ========== ÉTAT DES AVIS / COMPTE ==========
  var reviewsCache = null; // null = pas encore chargé, {} = chargé (vide ou non)

  var modsListEl = document.getElementById('mods-list');
  var modsCountEl = document.getElementById('mods-count');
  var searchInput = document.getElementById('search-input');
  var pageHome = document.getElementById('page-home');
  var pageDetail = document.getElementById('page-detail');
  var detailContent = document.getElementById('mod-detail-content');
  var backBtn = document.getElementById('back-btn');
  var langSwitchButtons = document.querySelectorAll('.lang-btn');
  var filterButtons = document.querySelectorAll('.filter-btn');

  // ========== DÉTECTION DE LA LANGUE ==========
  function detectLanguage() {
    var browserLang = (navigator.language || navigator.userLanguage).substring(0, 2).toLowerCase();
    return (browserLang === 'en' || browserLang === 'fr') ? browserLang : 'fr';
  }

  function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'fr') return;
    currentLang = lang;
    localStorage.setItem('multidb-lang', lang);
    updateUILanguage();
    updateLangButtons();
    if (mods.length > 0) {
      renderList(searchInput.value);
      var hash = window.location.hash;
      if (hash.startsWith('#/mod/')) {
        var match = hash.match(/^#\/mod\/(.+)$/);
        if (match) renderDetail(decodeURIComponent(match[1]));
      }
    }
  }

  function t(key) {
    return translations[currentLang][key] || translations.fr[key] || key;
  }

  function updateUILanguage() {
    document.documentElement.lang = currentLang;
    document.getElementById('page-title').textContent = t('page-title');
    document.getElementById('page-description').content = t('page-description');
    document.getElementById('search-input').placeholder = t('search-placeholder');
    document.getElementById('hero-title').innerHTML = t('hero-title-start') + ' <span class="gradient-text">' + t('hero-title-gradient') + '</span>';
    document.getElementById('hero-subtitle').textContent = t('hero-subtitle');
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      var category = btn.getAttribute('data-category');
      if (category === 'all') btn.textContent = t('filter-all');
      else if (category === 'mod') btn.textContent = t('filter-mods');
      else if (category === 'texture') btn.textContent = t('filter-textures');
      else if (category === 'game') btn.textContent = t('filter-games');
    });
    var sortLabelEl = document.getElementById('sort-label');
    if (sortLabelEl) sortLabelEl.textContent = t('sort-label');
    var sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.setAttribute('aria-label', t('sort-label'));
      document.querySelectorAll('#sort-select option').forEach(function (opt) {
        var sortValue = opt.getAttribute('data-value');
        if (sortValue) opt.textContent = t('sort-' + sortValue);
      });
    }
    document.getElementById('back-btn').textContent = t('back-button');
    document.getElementById('footer-text').textContent = t('footer-text');
    var connectBtn = document.getElementById('connect-btn');
    if (connectBtn) connectBtn.textContent = t('connect');
    var logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.setAttribute('aria-label', t('logout'));
    document.getElementById('post-mod-btn').textContent = t('post-mod-button');
    document.getElementById('post-mod-title').textContent = t('post-mod-title');
    document.getElementById('post-mod-text').innerHTML = t('post-mod-text');
    document.getElementById('post-mod-close').setAttribute('aria-label', t('post-mod-close'));
    var tutoBtn = document.getElementById('tuto-btn');
    if (tutoBtn) tutoBtn.textContent = t('tuto-button');
    var surveyTextEl = document.getElementById('survey-text');
    if (surveyTextEl) surveyTextEl.textContent = t('survey-text');
    var surveyLinkEl = document.getElementById('survey-link');
    if (surveyLinkEl) surveyLinkEl.textContent = t('survey-btn');
    var surveySkipEl = document.getElementById('survey-skip');
    if (surveySkipEl) surveySkipEl.textContent = t('survey-skip');
    var surveyCloseEl = document.getElementById('survey-close');
    if (surveyCloseEl) surveyCloseEl.setAttribute('aria-label', t('post-mod-close'));
  }

  function updateLangButtons() {
    langSwitchButtons.forEach(function (btn) {
      if (btn.getAttribute('data-lang') === currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // ========== UTILITAIRES ==========

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function excerpt(text, max) {
    if (!text) return '';
    var clean = text.replace(/\s+/g, ' ').trim();
    if (clean.length <= max) return clean;
    return clean.slice(0, max).trim() + '…';
  }

  function findMod(id) {
    for (var i = 0; i < mods.length; i++) {
      if (mods[i].id === id) return mods[i];
    }
    return null;
  }

  function getLocalizedText(field) {
    if (typeof field === 'object' && field !== null) {
      return field[currentLang] || field.fr || field.en || '';
    }
    return field || '';
  }

  function getDownloadCount(mod) {
    if (!mod) return 0;
    var count = downloadCounts[mod.name];
    return typeof count === 'number' ? count : 0;
  }

  function formatCount(count) {
    var locale = currentLang === 'fr' ? 'fr-FR' : 'en-US';
    return count.toLocaleString(locale);
  }

  function sortMods(arr) {
    return arr.slice().sort(function (a, b) {
      var diff;
      if (currentSort === 'downloads-asc') {
        diff = getDownloadCount(a) - getDownloadCount(b);
      } else if (currentSort === 'name-asc') {
        diff = a.name.localeCompare(b.name, currentLang);
      } else if (currentSort === 'name-desc') {
        diff = b.name.localeCompare(a.name, currentLang);
      } else {
        diff = getDownloadCount(b) - getDownloadCount(a);
      }
      if (diff !== 0) return diff;
      return a.name.localeCompare(b.name, currentLang);
    });
  }

  function downloadIcon() {
    return (
      '<svg class="dl-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>' +
      '<polyline points="7 10 12 15 17 10"/>' +
      '<line x1="12" y1="15" x2="12" y2="3"/>' +
      '</svg>'
    );
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(textarea);
      }
    });
  }

  // ========== RENDU DE LA LISTE ==========

  function renderList(query) {
    var q = (query || '').trim().toLowerCase();

    var filtered = mods.filter(function (mod) {
      var matchesQuery = !q ||
        (mod.name || '').toLowerCase().indexOf(q) !== -1 ||
        (mod.author || '').toLowerCase().indexOf(q) !== -1 ||
        getLocalizedText(mod.description).toLowerCase().indexOf(q) !== -1;

      var matchesFilter = currentFilter === 'all' || mod.category === currentFilter;

      return matchesQuery && matchesFilter;
    });

    if (mods.length === 0 && !loadError) {
      modsListEl.innerHTML =
        '<div class="loading-state"><div class="spinner"></div>' + t('loading-mods') + '</div>';
      modsCountEl.textContent = '';
      return;
    }

    if (loadError) {
      modsListEl.innerHTML =
        '<div class="error-state">' + t('error-load') + '</div>';
      modsCountEl.textContent = '';
      return;
    }

    var countText = filtered.length === 1 ? t('mod-found-singular') : t('mod-found-plural');
    modsCountEl.textContent = filtered.length + ' ' + countText;

    if (filtered.length === 0) {
      modsListEl.innerHTML =
        '<div class="empty-state">' + t('no-results') + '</div>';
      return;
    }

    var html = sortMods(filtered)
      .map(function (mod, index) {
        var desc = getLocalizedText(mod.description);
        return (
          '<button type="button" class="mod-card" data-id="' +
          escapeHtml(mod.id) +
          '" style="animation-delay:' +
          Math.min(index * 0.05, 0.4) +
          's">' +
          '<img class="mod-card-image" src="' +
          escapeHtml(mod.image) +
          '" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">' +
          '<span class="mod-card-body">' +
          '<span class="mod-card-title">' +
          escapeHtml(mod.name) +
          '</span>' +
          '<span class="mod-card-author">' + t('author-label') + ' ' +
          escapeHtml(mod.author) +
          '</span>' +
          '<span class="mod-card-excerpt">' +
          escapeHtml(excerpt(desc, 140)) +
          '</span>' +
          '<span class="mod-card-stats">' +
          '<span class="mod-card-downloads">' +
          downloadIcon() +
          '<span class="dl-count">' +
          formatCount(getDownloadCount(mod)) +
          '</span>' +
          '</span>' +
          ratingBadgeHtml(mod) +
          '</span>' +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    modsListEl.innerHTML = html;
  }

  // ========== RENDU DU DÉTAIL ==========

  function renderDetail(id) {
    var mod = findMod(id);

    if (!mod) {
      detailContent.innerHTML =
        '<div class="error-state">' + t('mod-not-found') + '</div>';
      return;
    }

    var desc = getLocalizedText(mod.description);
    var author = escapeHtml(mod.author);
    var name = escapeHtml(mod.name);
    var dlCount = getDownloadCount(mod);
    var discordHtml = '';

    if (mod.discord) {
      discordHtml =
        '<button type="button" class="btn-discord" id="discord-copy-btn" data-username="' +
        escapeHtml(mod.discord) +
        '">' +
        '<span class="discord-btn-label">' + t('discord-button') + '</span>' +
        '</button>';
    }

    detailContent.innerHTML =
      '<img class="mod-detail-banner" src="' +
      escapeHtml(mod.image) +
      '" alt="Image de présentation de ' +
      name +
      '" onerror="this.style.display=\'none\'">' +
      '<h1 class="mod-detail-title">' +
      name +
      '</h1>' +
      '<div class="mod-detail-meta">' +
      '<span class="mod-detail-author">' + t('author-label') + ' ' +
      author +
      '</span>' +
      '<span class="mod-detail-downloads">' +
      downloadIcon() +
      '<span class="dl-count">' +
      formatCount(dlCount) +
      '</span> ' +
      (dlCount === 1 ? t('downloads-label-singular') : t('downloads-label-plural')) +
      '</span>' +
      discordHtml +
      '</div>' +
      '<div class="mod-detail-description">' +
      '<h3>' + t('description-title') + '</h3>' +
      '<p>' +
      escapeHtml(desc) +
      '</p>' +
      '</div>' +
      '<div class="mod-detail-actions">' +
      '<a class="btn btn-primary download-btn" href="' +
      escapeHtml(mod.download) +
      '" data-file="' +
      escapeHtml(mod.name) +
      '">' + t('download-button') + '</a>' +
      '</div>' +
      '<div id="mod-reviews-section" class="mod-reviews-section"></div>';

    renderReviewsSection(mod);
  }

  // ========== SYSTÈME D'AVIS ==========

  function getReviews(modId) {
    if (!reviewsCache) return [];
    return reviewsCache[modId] || [];
  }

  function getAverageFromList(list) {
    if (!list || !list.length) return null;
    var sum = 0;
    list.forEach(function (r) { sum += r.rating; });
    return sum / list.length;
  }

  function getAverageRating(modId) {
    return getAverageFromList(getReviews(modId));
  }

  function ratingBadgeHtml(mod) {
    var avg = getAverageRating(mod.id);
    if (avg == null) return '';
    return (
      '<span class="mod-card-rating" title="' + t('reviews-title') + '">★ ' +
      avg.toFixed(1) +
      '</span>'
    );
  }

  function loadAllReviews() {
    if (typeof Deblock === 'undefined' || !Deblock.getSupabaseUrl) return;
    var url = Deblock.getSupabaseUrl() + '/rest/v1/mod_reviews?select=*&order=created_at.desc&limit=10000';
    fetch(url, { headers: Deblock.getApiHeaders() })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (rows) {
        var map = {};
        (rows || []).forEach(function (r) {
          if (!r || !r.mod_id) return;
          if (!map[r.mod_id]) map[r.mod_id] = [];
          map[r.mod_id].push(r);
        });
        reviewsCache = map;
        refreshCounters();
      })
      .catch(function () {
        if (reviewsCache === null) reviewsCache = {};
      });
  }

  function starsHtml(rating) {
    var html = '';
    for (var i = 1; i <= 5; i++) {
      html += '<span class="review-star' + (i <= rating ? ' filled' : '') + '">★</span>';
    }
    return html;
  }

  function formatReviewDate(dateStr) {
    try {
      var d = new Date(dateStr);
      var locale = currentLang === 'fr' ? 'fr-FR' : 'en-US';
      return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return dateStr; }
  }

  function sortReviews(list, mode) {
    var sorted = list.slice();
    if (mode === 'desc') {
      sorted.sort(function (a, b) { return b.rating - a.rating; });
    } else if (mode === 'asc') {
      sorted.sort(function (a, b) { return a.rating - b.rating; });
    } else {
      sorted.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at); });
    }
    return sorted;
  }

  function reviewsAvgHtml(reviews) {
    if (!reviews || !reviews.length) {
      return '<span class="reviews-avg reviews-avg-none">' + t('reviews-no-rating') + '</span>';
    }
    var avg = getAverageFromList(reviews);
    var count = reviews.length;
    var countLabel = count === 1 ? t('reviews-count-singular') : t('reviews-count-plural');
    return (
      '<span class="reviews-avg">★ ' + avg.toFixed(1) +
      ' <span class="reviews-count">(' + count + ' ' + countLabel + ')</span></span>'
    );
  }

  function buildReviewCard(r) {
    var verified = r.user_id ? '<span class="review-verified">✓ ' + t('reviews-verified') + '</span>' : '';
    var dateStr = r.created_at ? formatReviewDate(r.created_at) : '';
    return (
      '<div class="review-card">' +
      '<div class="review-card-head">' +
      '<span class="review-stars">' + starsHtml(r.rating) + '</span>' +
      '<span class="review-pseudo">' + escapeHtml(r.pseudo || 'Anonyme') + '</span>' +
      verified +
      '<span class="review-date">' + escapeHtml(dateStr) + '</span>' +
      '</div>' +
      (r.text ? '<p class="review-text">' + escapeHtml(r.text) + '</p>' : '') +
      '</div>'
    );
  }

  function buildReviewsListHtml(list) {
    if (!list || !list.length) {
      return '<p class="reviews-empty">' + t('reviews-empty') + '</p>';
    }
    return list.map(buildReviewCard).join('');
  }

  function buildReviewFormHtml(currentUser, alreadyReviewed) {
    if (!currentUser) {
      return (
        '<div class="review-prompt">' +
        '<span>' + t('reviews-login-prompt') + '</span>' +
        '<button type="button" class="btn btn-ghost review-login-btn">' + t('reviews-login-btn') + '</button>' +
        '</div>'
      );
    }
    if (alreadyReviewed) {
      return '<p class="review-already">' + t('reviews-already') + '</p>';
    }
    var stars = '';
    for (var i = 1; i <= 5; i++) {
      stars += '<button type="button" class="star-pick" data-val="' + i + '">★</button>';
    }
    return (
      '<div class="review-form" id="review-form">' +
      '<p class="review-form-as">' + t('reviews-form-as') +
      ' <strong>' + escapeHtml(Deblock.getDisplayName()) + '</strong></p>' +
      '<div class="review-star-picker" id="review-star-picker" data-selected="0">' +
      '<span class="review-star-label">' + t('reviews-rating-label') + '</span>' +
      stars +
      '</div>' +
      '<textarea id="review-text" class="review-textarea" maxlength="500" placeholder="' + t('reviews-placeholder') + '"></textarea>' +
      '<div class="review-form-footer">' +
      '<span class="review-char-count" id="review-char-count">0 / 500</span>' +
      '<button type="button" id="review-submit" class="btn btn-primary">' + t('reviews-publish') + '</button>' +
      '</div>' +
      '</div>'
    );
  }

  function renderReviewsSection(mod) {
    var container = document.getElementById('mod-reviews-section');
    if (!container || !mod) return;

    var reviews = getReviews(mod.id);
    var currentUser = (typeof Deblock !== 'undefined') ? Deblock.getUser() : null;
    var alreadyReviewed = currentUser && reviews.some(function (r) { return r.user_id === currentUser.id; });

    var listHtml = reviewsCache === null
      ? '<div class="loading-state"><div class="spinner"></div><span>' + t('reviews-loading') + '</span></div>'
      : buildReviewsListHtml(sortReviews(reviews, 'recent'));

    container.innerHTML =
      '<div class="reviews-head">' +
      '<h3 class="reviews-title">' + t('reviews-title') + '</h3>' +
      '<div class="reviews-head-right">' +
      reviewsAvgHtml(reviews) +
      '<select id="reviews-sort" class="reviews-sort" aria-label="' + t('reviews-sort-recent') + '">' +
      '<option value="recent">' + t('reviews-sort-recent') + '</option>' +
      '<option value="desc">' + t('reviews-sort-desc') + '</option>' +
      '<option value="asc">' + t('reviews-sort-asc') + '</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      buildReviewFormHtml(currentUser, alreadyReviewed) +
      '<div id="reviews-list" class="reviews-list">' + listHtml + '</div>';

    bindReviewsEvents(mod);
  }

  function bindStarPicker(picker) {
    if (!picker) return;
    var stars = picker.querySelectorAll('.star-pick');
    function refresh(selected, hovered) {
      stars.forEach(function (s) {
        var v = parseInt(s.getAttribute('data-val'), 10);
        s.classList.toggle('active', hovered ? v <= hovered : v <= selected);
      });
    }
    stars.forEach(function (star) {
      star.addEventListener('mouseenter', function () {
        refresh(parseInt(picker.getAttribute('data-selected') || '0', 10), parseInt(star.getAttribute('data-val'), 10));
      });
      star.addEventListener('mouseleave', function () {
        refresh(parseInt(picker.getAttribute('data-selected') || '0', 10), 0);
      });
      star.addEventListener('click', function () {
        picker.setAttribute('data-selected', star.getAttribute('data-val'));
        refresh(parseInt(star.getAttribute('data-val'), 10), 0);
      });
    });
  }

  function bindReviewsEvents(mod) {
    var sortEl = document.getElementById('reviews-sort');
    if (sortEl) {
      sortEl.addEventListener('change', function () {
        var listEl = document.getElementById('reviews-list');
        if (listEl) listEl.innerHTML = buildReviewsListHtml(sortReviews(getReviews(mod.id), sortEl.value));
      });
    }

    var loginBtn = document.querySelector('.review-login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', function () {
        if (typeof Deblock !== 'undefined' && Deblock.getLoginUrl) {
          window.location.href = Deblock.getLoginUrl();
        }
      });
    }

    var picker = document.getElementById('review-star-picker');
    if (picker) bindStarPicker(picker);

    var textarea = document.getElementById('review-text');
    var charCount = document.getElementById('review-char-count');
    if (textarea && charCount) {
      textarea.addEventListener('input', function () {
        charCount.textContent = textarea.value.length + ' / 500';
      });
    }

    var submitBtn = document.getElementById('review-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        var rating = picker ? parseInt(picker.getAttribute('data-selected') || '0', 10) : 0;
        if (!rating) {
          if (picker) {
            picker.classList.add('shake');
            setTimeout(function () { picker.classList.remove('shake'); }, 450);
          }
          return;
        }
        var text = textarea ? textarea.value.trim() : '';
        submitBtn.disabled = true;
        submitBtn.textContent = '…';
        submitReview(mod.id, rating, text)
          .then(function () { renderReviewsSection(mod); })
          .catch(function (err) {
            submitBtn.disabled = false;
            submitBtn.textContent = t('reviews-publish');
            var msg = err && err.message === 'already_reviewed' ? t('reviews-already') : t('reviews-error') + (err && err.message ? err.message : '');
            var errEl = document.createElement('p');
            errEl.className = 'review-error';
            errEl.textContent = msg;
            submitBtn.parentNode.appendChild(errEl);
          });
      });
    }
  }

  function submitReview(modId, rating, text) {
    var user = Deblock.getUser();
    if (!user) return Promise.reject(new Error('not_logged_in'));

    var payload = {
      mod_id: modId,
      user_id: user.id,
      pseudo: (Deblock.getDisplayName() || 'Anonyme').slice(0, 32) || 'Anonyme',
      rating: rating,
      text: (text || '').slice(0, 500),
    };

    var url = Deblock.getSupabaseUrl() + '/rest/v1/mod_reviews';
    return fetch(url, {
      method: 'POST',
      headers: Object.assign({}, Deblock.getApiHeaders(), { 'Prefer': 'return=representation' }),
      body: JSON.stringify(payload),
    }).then(function (res) {
      if (!res.ok) {
        return res.json().catch(function () { return {}; }).then(function (errData) {
          if (errData && errData.code === '23505') throw new Error('already_reviewed');
          throw new Error(errData && errData.message ? errData.message : 'HTTP ' + res.status);
        });
      }
      return res.json();
    }).then(function (rows) {
      if (!reviewsCache) reviewsCache = {};
      if (!reviewsCache[modId]) reviewsCache[modId] = [];
      var created = Array.isArray(rows) ? rows[0] : rows;
      if (created) reviewsCache[modId].unshift(created);
      refreshCounters();
    });
  }

  // ========== COMPTE (DEBLOCK) ==========

  function updateAuthUI() {
    var connectBtn = document.getElementById('connect-btn');
    var userInfo = document.getElementById('user-info');
    if (!connectBtn) return;

    var user = (typeof Deblock !== 'undefined') ? Deblock.getUser() : null;

    if (user) {
      connectBtn.hidden = true;
      if (userInfo) {
        userInfo.hidden = false;
        var userName = document.getElementById('user-name');
        if (userName) userName.textContent = Deblock.getDisplayName();
        var initial = (Deblock.getDisplayName() || '?').charAt(0).toUpperCase();
        var initialEl = document.getElementById('user-avatar-initial');
        if (initialEl) initialEl.textContent = initial;
        var avatarImg = document.getElementById('user-avatar-img');
        var avatarUrl = Deblock.getAvatarUrl();
        if (avatarImg && initialEl) {
          if (avatarUrl) {
            avatarImg.src = avatarUrl;
            avatarImg.style.display = '';
            initialEl.style.display = 'none';
          } else {
            avatarImg.style.display = 'none';
            initialEl.style.display = '';
          }
        }
      }
    } else {
      connectBtn.hidden = false;
      if (userInfo) userInfo.hidden = true;
    }
  }

  function initAuth() {
    if (typeof window.Deblock === 'undefined') return;

    var connectBtn = document.getElementById('connect-btn');
    var logoutBtn = document.getElementById('logout-btn');

    if (connectBtn) {
      connectBtn.addEventListener('click', function () {
        window.location.href = Deblock.getLoginUrl();
      });
    }
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        Deblock.logout().catch(function () {});
      });
    }

    Deblock.ready().then(function () {
      updateAuthUI();
      rerenderCurrentReviews();
      Deblock.onAuthStateChanged(function () {
        updateAuthUI();
        rerenderCurrentReviews();
      });
    });
  }

  function rerenderCurrentReviews() {
    var hash = window.location.hash || '';
    var match = hash.match(/^#\/mod\/(.+)$/);
    if (!match) return;
    var mod = findMod(decodeURIComponent(match[1]));
    if (mod) renderReviewsSection(mod);
  }

  // ========== ROUTAGE ==========

  function route() {
    var hash = window.location.hash || '#/';
    var match = hash.match(/^#\/mod\/(.+)$/);

    if (match) {
      var id = decodeURIComponent(match[1]);
      pageHome.classList.remove('active');
      pageDetail.classList.add('active');
      renderDetail(id);
      window.scrollTo(0, 0);
    } else {
      pageDetail.classList.remove('active');
      pageHome.classList.add('active');
      document.title = t('page-title');
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener('hashchange', route);

  // ========== ÉVÉNEMENTS ==========

  modsListEl.addEventListener('click', function (e) {
    var card = e.target.closest('.mod-card');
    if (!card) return;
    var id = card.getAttribute('data-id');
    window.location.hash = '#/mod/' + encodeURIComponent(id);
  });

  backBtn.addEventListener('click', function () {
    window.location.hash = '#/';
  });

  detailContent.addEventListener('click', function (e) {
    var btn = e.target.closest('.btn-discord');
    if (!btn) return;

    var username = btn.getAttribute('data-username');
    if (!username) return;

    copyToClipboard(username).then(function () {
      var label = btn.querySelector('.discord-btn-label');
      if (!label) return;

      clearTimeout(btn._copyTimer);
      btn.classList.add('copied');
      label.textContent = t('discord-copied');

      btn._copyTimer = setTimeout(function () {
        btn.classList.remove('copied');
        label.textContent = t('discord-button');
      }, 1800);
    });
  });

  // ========== SUIVI DES TÉLÉCHARGEMENTS AVEC GOATCOUNTER ==========
  detailContent.addEventListener('click', function (e) {
    var downloadBtn = e.target.closest('.download-btn');
    if (!downloadBtn) return;

    var fileName = downloadBtn.getAttribute('data-file');
    if (!fileName) return;

    // Envoyer un événement à GoatCounter
    if (typeof goatcounter !== 'undefined') {
      goatcounter.count({
        path: `Téléchargement: ${fileName}`,
        title: `Téléchargement - ${fileName}`,
        event: true,
      });
    }

    // Rediriger après un court délai pour laisser le temps à GoatCounter d'enregistrer l'événement
    var fileUrl = downloadBtn.getAttribute('href');
    setTimeout(function () {
      window.location.href = fileUrl;
    }, 200);
  });

  var searchTimer = null;
  searchInput.addEventListener('input', function () {
    clearTimeout(searchTimer);
    var value = searchInput.value;
    searchTimer = setTimeout(function () {
      renderList(value);
    }, 80);
  });

  langSwitchButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var category = btn.getAttribute('data-category');
      currentFilter = category;
      filterButtons.forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      renderList(searchInput.value);
    });
  });

  var sortSelectEl = document.getElementById('sort-select');
  if (sortSelectEl) {
    sortSelectEl.addEventListener('change', function () {
      currentSort = sortSelectEl.value;
      renderList(searchInput.value);
    });
  }

  // ========== MODALE "POSTER UN MOD" ==========

  var postModBtn = document.getElementById('post-mod-btn');
  var postModOverlay = document.getElementById('post-mod-overlay');
  var postModClose = document.getElementById('post-mod-close');

  function openPostModModal() {
    postModOverlay.classList.add('active');
  }

  function closePostModModal() {
    postModOverlay.classList.remove('active');
  }

  postModBtn.addEventListener('click', openPostModModal);
  postModClose.addEventListener('click', closePostModModal);
  postModOverlay.addEventListener('click', function (e) {
    if (e.target === postModOverlay) closePostModModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePostModModal();
  });

  // ========== CHARGEMENT DES DONNÉES ==========

  fetch('mods.json')
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      mods = Array.isArray(data) ? data : [];
      renderList(searchInput.value);
      route();
    })
    .catch(function () {
      loadError = true;
      renderList('');
    });

  // ========== CHARGEMENT DU COMPTEUR DE TÉLÉCHARGEMENTS ==========

  function refreshCounters() {
    if (mods.length === 0) return;
    renderList(searchInput.value);
    var hash = window.location.hash || '';
    if (hash.indexOf('#/mod/') === 0) {
      var match = hash.match(/^#\/mod\/(.+)$/);
      if (match) renderDetail(decodeURIComponent(match[1]));
    }
  }

  function loadDownloadCounts() {
    fetch('https://multidb-download-counter.creatif-france.workers.dev/stats/hits')
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (stats) {
        if (!Array.isArray(stats)) return;
        stats.forEach(function (entry) {
          if (!entry || typeof entry.name !== 'string' || typeof entry.count !== 'number') return;
          var clean = entry.name;
          if (clean.indexOf('Téléchargement: ') === 0) {
            clean = clean.slice('Téléchargement: '.length);
          }
          if (!clean) return;
          downloadCounts[clean] = entry.count;
        });
        refreshCounters();
      })
      .catch(function () {
        // En cas d'échec, chaque élément reste affiché à 0 téléchargement.
      });
  }

  loadDownloadCounts();
  loadAllReviews();
  initAuth();

  // ========== INITIALISATION ==========

  var savedLang = localStorage.getItem('multidb-lang');
  var initialLang = savedLang || detectLanguage();
  setLanguage(initialLang);
  updateUILanguage();

  renderList('');

  // ========== HALO QUI SUIT LE CURSEUR (DÉCORATIF) ==========

  var halo = document.getElementById('cursor-halo');
  if (halo && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', function (e) {
      document.body.classList.add('cursor-active');
      halo.style.transform =
        'translate(' + (e.clientX - 50) + 'px, ' + (e.clientY - 50) + 'px)';
    });
  }

  // ========== SURVEY POPUP ==========
  var surveyOverlay = document.getElementById('survey-overlay');
  var surveyCloseBtn = document.getElementById('survey-close');
  var surveySkipBtn = document.getElementById('survey-skip');
  var surveyLinkBtn = document.getElementById('survey-link');

  function showSurveyPopup() {
    if (!surveyOverlay) return;
    if (localStorage.getItem('multidb-survey-dismissed')) return;
    surveyOverlay.classList.add('active');
  }

  function closeSurvey() {
    if (surveyOverlay) surveyOverlay.classList.remove('active');
  }

  function dismissSurvey() {
    closeSurvey();
    localStorage.setItem('multidb-survey-dismissed', 'true');
  }

  if (surveyCloseBtn) surveyCloseBtn.addEventListener('click', dismissSurvey);
  if (surveySkipBtn) surveySkipBtn.addEventListener('click', dismissSurvey);
  if (surveyOverlay) surveyOverlay.addEventListener('click', function (e) {
    if (e.target === surveyOverlay) dismissSurvey();
  });
  if (surveyLinkBtn) surveyLinkBtn.addEventListener('click', dismissSurvey);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') dismissSurvey();
  });

  setTimeout(showSurveyPopup, 1500);

  // ========== OMBRE DU HEADER AU SCROLL ==========
  var siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', function () {
      siteHeader.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }
})();
