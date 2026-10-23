/**
 * Catálogo Perfumería Árabe · Guatemala
 * Búsqueda inteligente (insensible a tildes/mayúsculas), filtro Día/Noche y ordenamiento.
 */
(() => {
  'use strict';

  const normalize = (str = '') =>
    str
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  const grid = document.getElementById('grid');
  const searchInput = document.getElementById('search');
  const clearSearchBtn = document.getElementById('clear-search');
  const sortSelect = document.getElementById('sort-select');
  const filterBtns = [...document.querySelectorAll('.filter-btn')];
  const emptyBox = document.getElementById('empty');
  const resetFiltersBtn = document.getElementById('reset-filters');
  const countEl = document.getElementById('results-count');
  const cards = [...document.querySelectorAll('.card')];

  let activeOccasion = 'todos';

  // Pre-index card metadata for instant filtering
  const cardData = cards.map((card, index) => {
    const name = card.dataset.name || '';
    const title = card.querySelector('h3')?.textContent || '';
    const notesText = card.querySelector('.notes')?.textContent || '';
    const occasion = card.dataset.occasion || 'todos';
    const price = parseInt(card.dataset.price || '0', 10);

    return {
      card,
      originalIndex: index,
      occasion,
      price,
      title: normalize(title),
      searchable: normalize(`${name} ${title} ${notesText} ${occasion}`)
    };
  });

  function applyFiltersAndSort() {
    const query = normalize(searchInput ? searchInput.value : '');
    const sortBy = sortSelect ? sortSelect.value : 'default';

    if (clearSearchBtn) {
      clearSearchBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    // 1. Sort cardData copy
    const sorted = [...cardData];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price || a.originalIndex - b.originalIndex);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price || a.originalIndex - b.originalIndex);
    } else if (sortBy === 'name-asc') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sorted.sort((a, b) => a.originalIndex - b.originalIndex);
    }

    // 2. Filter and reorder DOM nodes
    let visibleCount = 0;
    const terms = query.split(/\s+/).filter(Boolean);

    sorted.forEach((item) => {
      const matchesOccasion =
        activeOccasion === 'todos' || item.occasion === activeOccasion;
      const matchesSearch =
        terms.length === 0 || terms.every((t) => item.searchable.includes(t));

      const isVisible = matchesOccasion && matchesSearch;
      item.card.style.display = isVisible ? '' : 'none';

      if (isVisible) {
        visibleCount++;
      }
      grid.appendChild(item.card);
    });

    if (countEl) {
      countEl.textContent = visibleCount;
    }

    if (emptyBox) {
      emptyBox.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Event listeners
  if (searchInput) {
    searchInput.addEventListener('input', applyFiltersAndSort);
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      applyFiltersAndSort();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', applyFiltersAndSort);
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeOccasion = btn.dataset.filter || 'todos';
      applyFiltersAndSort();
    });
  });

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'default';
      activeOccasion = 'todos';
      filterBtns.forEach((b) => {
        b.classList.toggle('active', b.dataset.filter === 'todos');
      });
      applyFiltersAndSort();
    });
  }

  // Initial run
  applyFiltersAndSort();

  // Remove any third-party hosting badge ("Powered by Netlify") that overlaps the floating WhatsApp button
  const cleanInjectedBadges = () => {
    document.querySelectorAll('body > *:not(header):not(section):not(main):not(footer):not(a.whatsapp):not(script)').forEach((el) => {
      const txt = (el.textContent || '').toLowerCase();
      const html = (el.innerHTML || '').toLowerCase();
      if (txt.includes('netlify') || html.includes('netlify') || el.tagName === 'IFRAME' || el.shadowRoot) {
        el.remove();
      }
    });
    document.querySelectorAll('a[href*="netlify"]').forEach((el) => {
      const container = el.closest('div') || el;
      if (!container.closest('main') && !container.closest('header')) {
        container.remove();
      }
    });
  };

  cleanInjectedBadges();
  const observer = new MutationObserver(cleanInjectedBadges);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
