/* Mobile: first menu open after each page load shows all categories. */
(function () {
  var MQ = '(max-width: 76.234375em)';
  var INTRO_CLASS = 'nabu-nav-root-intro';
  var PICK_CLASS = 'nabu-nav-picking';
  var PICK_TARGET_CLASS = 'nabu-nav-pick';
  var firstMenuOpen = true;

  function isMobile() {
    return window.matchMedia(MQ).matches;
  }

  function getPrimaryNav() {
    return document.querySelector('.md-nav--primary');
  }

  function resetNavTransforms() {
    var primary = getPrimaryNav();
    if (!primary) return;

    primary.querySelectorAll('.md-nav__list').forEach(function (list) {
      list.style.setProperty('transform', 'none', 'important');
    });
  }

  function saveToggleState() {
    var primary = getPrimaryNav();
    if (!primary) return;

    primary.querySelectorAll('.md-nav__item--section > .md-nav__toggle').forEach(function (toggle) {
      toggle.dataset.nabuWasChecked = toggle.checked ? '1' : '0';
      toggle.checked = false;
    });
  }

  function restoreToggleState() {
    var primary = getPrimaryNav();
    if (!primary) return;

    primary.querySelectorAll('.md-nav__item--section > .md-nav__toggle').forEach(function (toggle) {
      if (toggle.dataset.nabuWasChecked !== undefined) {
        toggle.checked = toggle.dataset.nabuWasChecked === '1';
        delete toggle.dataset.nabuWasChecked;
      }
    });
  }

  function clearPickState() {
    document.documentElement.classList.remove(PICK_CLASS);
    var primary = getPrimaryNav();
    if (!primary) return;
    primary.querySelectorAll('.' + PICK_TARGET_CLASS).forEach(function (el) {
      el.classList.remove(PICK_TARGET_CLASS);
    });
  }

  function enableIntroView() {
    document.documentElement.classList.add(INTRO_CLASS);
    saveToggleState();
    resetNavTransforms();
  }

  function disableIntroView(restoreToggles) {
    document.documentElement.classList.remove(INTRO_CLASS);
    if (restoreToggles) {
      restoreToggleState();
    }
    resetNavTransforms();
  }

  function goToRootMenu() {
    if (!isMobile()) return;

    var primary = getPrimaryNav();
    if (!primary) return;

    clearPickState();

    primary.querySelectorAll('.md-nav__item--section > .md-nav__toggle').forEach(function (t) {
      t.checked = false;
      delete t.dataset.nabuWasChecked;
    });

    document.documentElement.classList.add(INTRO_CLASS);
    resetNavTransforms();
  }

  function scheduleIntroReset() {
    [0, 50, 150, 300].forEach(function (delay) {
      setTimeout(resetNavTransforms, delay);
    });
  }

  function prepareSectionOpen(label) {
    var primary = getPrimaryNav();
    var toggle = label && document.getElementById(label.htmlFor);
    var section = toggle && toggle.closest('.md-nav__item--section');
    if (!primary || !toggle || !section) return;

    clearPickState();
    section.classList.add(PICK_TARGET_CLASS);

    primary.querySelectorAll('.md-nav__item--section > .md-nav__toggle').forEach(function (t) {
      t.checked = false;
      delete t.dataset.nabuWasChecked;
    });

    document.documentElement.classList.remove(INTRO_CLASS);
    document.documentElement.classList.add(PICK_CLASS);
    resetNavTransforms();

    setTimeout(function () {
      clearPickState();
      resetNavTransforms();
    }, 320);
  }

  var drawer = document.getElementById('__drawer');
  if (drawer) {
    drawer.addEventListener('change', function (e) {
      if (e.target.checked) {
        if (firstMenuOpen && isMobile()) {
          firstMenuOpen = false;
          enableIntroView();
          scheduleIntroReset();
        }
      } else {
        clearPickState();
        disableIntroView(true);
      }
    });
  }

  var primary = getPrimaryNav();
  if (primary) {
    primary.addEventListener(
      'click',
      function (e) {
        if (!isMobile()) return;

        var back = e.target.closest('.md-nav--primary .md-nav .md-nav__title');
        if (back) {
          if (document.documentElement.classList.contains(INTRO_CLASS)) return;

          e.preventDefault();
          e.stopImmediatePropagation();
          goToRootMenu();
          return;
        }

        if (!document.documentElement.classList.contains(INTRO_CLASS)) return;

        var label = e.target.closest(
          '.md-nav__item--section > label.md-nav__link[for^="__nav"]'
        );
        if (!label) return;

        prepareSectionOpen(label);
      },
      true
    );
  }
})();
