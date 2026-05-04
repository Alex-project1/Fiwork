

(function () {
  "use strict";

  const SELECTORS = {
    headerWrapper: ".computer-header",
    userBlockMobile: ".userBlockMobile",
    regBlockMobile: ".regBlockMobile",
    mobileRegBtn: ".mobileRegBtn",

    modalBtn: ".modal-btn",
    modal: ".modal",
    overlayGray: ".overlayGray",
    modalClose: ".modal__close",
    loginBtn: "#loginBtn",
    headerReg: ".headerReg",
    headerBox: ".computer-header",
    avatarInput: "#avatarInput",
    avatar: ".avatar",
    userRole: ".user__list-role",
    exitBtn: ".exit",

    megaWrapper: ".mega-menu__wrapper",
    navPart2: ".nav-part2",
    navItem: ".nav-menu-item",
    navItemLink: ".nav-menu-item > a",
    megaLine: ".mega-menu_line",
    megaBox: ".mega-menu__box",

    mobileBurgerBtn: ".mobile-burger-btn",
    mobileDrawer: ".mobile-drawer",
    mobileOverlay: ".mobile-drawer-overlay",
    mobileCloseBtn: ".mobile-drawer__close",
    mobileDrawerBody: ".mobile-drawer__body",

    tableRow: ".table-row",
    paginationLimit: ".pagination__limit",
    paginationRange: ".pagination__range",
    paginationPages: ".pagination__pages",
    paginationPage: ".pagination__page",
    paginationPrev: ".pagination__prev",
    paginationNext: ".pagination__next",
    searchbar: ".searchbar",
    orderFilter: ".order-filter-option",
  };

  const qs = (selector, parent = document) => {
    if (!selector || !parent) return null;
    return parent.querySelector(selector);
  };

  const qsa = (selector, parent = document) => {
    if (!selector || !parent) return [];
    return Array.from(parent.querySelectorAll(selector));
  };

  const on = (element, eventName, handler, options) => {
    if (!element || !eventName || typeof handler !== "function") return;
    element.addEventListener(eventName, handler, options);
  };

  const onAll = (elements, eventName, handler, options) => {
    if (!Array.isArray(elements) || !elements.length) return;
    elements.forEach((element) => on(element, eventName, handler, options));
  };

  const hasClass = (element, className) => {
    return Boolean(element && className && element.classList.contains(className));
  };

  const addClass = (element, className) => {
    if (!element || !className) return;
    element.classList.add(className);
  };

  const removeClass = (element, className) => {
    if (!element || !className) return;
    element.classList.remove(className);
  };

  const toggleClass = (element, className, force) => {
    if (!element || !className) return;
    element.classList.toggle(className, force);
  };

  const cleanText = (text) => {
    return String(text || "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const escapeHtml = (value) => {
    const div = document.createElement("div");
    div.textContent = String(value || "");
    return div.innerHTML;
  };

  const escapeSelector = (value) => {
    if (window.CSS && typeof window.CSS.escape === "function") {
      return window.CSS.escape(value);
    }

    return String(value).replace(/"/g, '\\"');
  };

  function initHeaderState() {
    const headerWrapper = qs(SELECTORS.headerWrapper);
    const userBlockMobile = qs(SELECTORS.userBlockMobile);
    const regBlockMobile = qs(SELECTORS.regBlockMobile);
    const mobileRegBtn = qs(SELECTORS.mobileRegBtn);

    if (!headerWrapper) return;

    if (hasClass(headerWrapper, "user")) {
      addClass(mobileRegBtn, "dn");
      addClass(userBlockMobile, "active");
    }

    if (hasClass(headerWrapper, "reg")) {
      addClass(regBlockMobile, "active");
      addClass(mobileRegBtn, "dn");
    }
  }

  /* =========================
       MODALS / USER HEADER
  ========================= */

  function initModalsAndUserHeader() {
    const btns = qsa(SELECTORS.modalBtn);
    const modals = qsa(SELECTORS.modal);
    const overlayGray = qs(SELECTORS.overlayGray);
    const modalCloseBtns = qsa(SELECTORS.modalClose);

    const loginBtn = qs(SELECTORS.loginBtn);
    const headerReg = qs(SELECTORS.headerReg);
    const headerBox = qs(SELECTORS.headerBox);

    const avatarInput = qs(SELECTORS.avatarInput);
    const avatar = qs(SELECTORS.avatar);

    const userRoles = qsa(SELECTORS.userRole);
    const exitBtns = qsa(SELECTORS.exitBtn);

    const userBlockMobile = qs(SELECTORS.userBlockMobile);
    const regBlockMobile = qs(SELECTORS.regBlockMobile);
    const mobileRegBtn = qs(SELECTORS.mobileRegBtn);

    const hasAnyRequiredElement =
      btns.length ||
      modals.length ||
      overlayGray ||
      loginBtn ||
      headerReg ||
      headerBox ||
      avatarInput ||
      avatar ||
      userRoles.length ||
      exitBtns.length;

    if (!hasAnyRequiredElement) return;

    function closeAllModals() {
      modals.forEach((modal) => removeClass(modal, "active"));
      removeClass(overlayGray, "active");
    }

    onAll(modals, "click", function (event) {
      event.stopPropagation();
    });

    onAll(btns, "click", function () {
      const modalId = this.dataset.modalname || this.dataset.modalName;
      if (!modalId) return;

      const modal = document.getElementById(modalId);
      if (!modal) return;

      closeAllModals();
      addClass(overlayGray, "active");
      addClass(modal, "active");
    });

    onAll(modalCloseBtns, "click", closeAllModals);
  let isOverlayMouseDown = false;

on(overlayGray, "mousedown", function (event) {
  isOverlayMouseDown = event.target === overlayGray;
});

on(overlayGray, "mouseup", function (event) {
  const isOverlayMouseUp = event.target === overlayGray;

  if (isOverlayMouseDown && isOverlayMouseUp) {
    closeAllModals();
  }

  isOverlayMouseDown = false;
});

on(document, "mouseup", function () {
  isOverlayMouseDown = false;
});

    on(loginBtn, "click", function () {
      closeAllModals();

      addClass(headerBox, "reg");
      addClass(regBlockMobile, "active");
      addClass(mobileRegBtn, "dn");
    });

    on(headerReg, "click", function () {
      // Логика регистрации, если понадобится.
    });

    if (avatarInput && avatar && window.FileReader) {
      on(avatarInput, "change", function () {
        const file = this.files && this.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (event) {
          avatar.innerHTML = "";

          const img = document.createElement("img");
          img.src = event.target.result;
          img.alt = "avatar";

          avatar.appendChild(img);
        };

        reader.readAsDataURL(file);
      });
    }

    onAll(userRoles, "click", function () {
      userRoles.forEach((item) => removeClass(item, "active"));
      addClass(this, "active");
    });

    onAll(exitBtns, "click", function () {
      removeClass(headerBox, "user");
      removeClass(headerBox, "reg");
      removeClass(userBlockMobile, "active");
      removeClass(regBlockMobile, "active");
      removeClass(mobileRegBtn, "dn");
    });
  }

  /* =========================
       DESKTOP MEGA MENU
  ========================= */
  function initDesktopMegaMenu() {
    const menuWrapper = qs(SELECTORS.megaWrapper);
    const navPart2 = qs(SELECTORS.navPart2);
    const navItems = qsa(SELECTORS.navItem);
    const navLinks = qsa(SELECTORS.navItemLink);
    const megaLines = qsa(SELECTORS.megaLine);
    const megaBoxes = qsa(SELECTORS.megaBox);
  
    if (!menuWrapper || !navPart2 || !navItems.length) return;
  
    const desktopQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    let closeTimer = null;
  
    // разрешаем заходить в megaWrapper только после наведения на nav
    let canEnterMegaWrapper = false;
  
    function isDesktop() {
      return desktopQuery.matches && window.innerWidth > 1024;
    }
  
    function openMenu() {
      clearTimeout(closeTimer);
      addClass(menuWrapper, "is-open");
      addClass(document.body, "mega-menu-open");
    }
  
    function closeMenuNow() {
      clearTimeout(closeTimer);
  
      canEnterMegaWrapper = false;
  
      removeClass(menuWrapper, "is-open");
      removeClass(document.body, "mega-menu-open");
  
      navItems.forEach((item) => removeClass(item, "is-active"));
      megaLines.forEach((line) => removeClass(line, "is-active"));
      megaBoxes.forEach((box) => removeClass(box, "is-active"));
    }
  
    function closeMenuWithDelay() {
      clearTimeout(closeTimer);
  
      closeTimer = setTimeout(function () {
        const isNavHovered = navPart2.matches(":hover");
        const isMegaHovered = menuWrapper.matches(":hover");
  
        // megaWrapper может удерживать меню только если мы пришли туда из nav
        if (isNavHovered || (isMegaHovered && canEnterMegaWrapper)) return;
  
        closeMenuNow();
      }, 250);
    }
  
    function setActiveMenu(menuKey, shouldOpen = true) {
      if (!menuKey) return;
  
      navItems.forEach((item) => {
        toggleClass(item, "is-active", item.dataset.menu === menuKey);
      });
  
      megaLines.forEach((line) => {
        toggleClass(line, "is-active", line.dataset.menu === menuKey);
      });
  
      megaBoxes.forEach((box) => {
        toggleClass(box, "is-active", box.dataset.menuContent === menuKey);
      });
  
      if (shouldOpen) openMenu();
    }
  
    onAll(navItems, "mouseenter", function () {
      if (!isDesktop()) return;
  
      canEnterMegaWrapper = true;
      setActiveMenu(this.dataset.menu);
    });
  
    onAll(navItems, "focusin", function () {
      if (!isDesktop()) return;
  
      canEnterMegaWrapper = true;
      setActiveMenu(this.dataset.menu);
    });
  
    onAll(megaLines, "mouseenter", function () {
      if (!isDesktop()) return;
  
      // если меню уже закрывается/закрылось, hover по старой области не должен открывать снова
      if (!hasClass(menuWrapper, "is-open") || !canEnterMegaWrapper) return;
  
      setActiveMenu(this.dataset.menu);
    });
  
    onAll(megaLines, "focusin", function () {
      if (!isDesktop()) return;
  
      if (!hasClass(menuWrapper, "is-open") || !canEnterMegaWrapper) return;
  
      setActiveMenu(this.dataset.menu);
    });
  
    on(navPart2, "mouseenter", function () {
      if (!isDesktop()) return;
  
      clearTimeout(closeTimer);
    });
  
    on(navPart2, "mouseleave", function () {
      if (!isDesktop()) return;
  
      // после выхода из nav можно перейти в megaWrapper
      canEnterMegaWrapper = hasClass(menuWrapper, "is-open");
  
      closeMenuWithDelay();
    });
  
    on(menuWrapper, "mouseenter", function () {
      if (!isDesktop()) return;
  
      // если пользователь вернулся в область megaWrapper после ухода наружу — не открываем
      if (!canEnterMegaWrapper || !hasClass(menuWrapper, "is-open")) return;
  
      clearTimeout(closeTimer);
    });
  
    on(menuWrapper, "mouseleave", function () {
      if (!isDesktop()) return;
  
      // после ухода из megaWrapper возвращение в старую область уже не должно открывать меню
      canEnterMegaWrapper = false;
  
      closeMenuWithDelay();
    });
  
    onAll(navLinks, "click", function (event) {
      if (isDesktop()) return;
  
      const item = this.closest(SELECTORS.navItem);
      if (!item) return;
  
      event.preventDefault();
  
      const menuKey = item.dataset.menu;
      if (!menuKey) return;
  
      if (hasClass(item, "is-active") && hasClass(menuWrapper, "is-open")) {
        closeMenuNow();
      } else {
        setActiveMenu(menuKey, true);
      }
    });
  
    onAll(megaLines, "click", function () {
      if (!isDesktop()) return;
  
      if (!hasClass(menuWrapper, "is-open") || !canEnterMegaWrapper) return;
  
      setActiveMenu(this.dataset.menu, true);
    });
  
    on(document, "click", function (event) {
      if (event.target.closest(SELECTORS.navPart2)) return;
      if (event.target.closest(SELECTORS.megaWrapper)) return;
  
      closeMenuNow();
    });
  
    on(document, "keyup", function (event) {
      if (event.key === "Escape") closeMenuNow();
    });
  
    on(window, "resize", function () {
      closeMenuNow();
    });
  }
  /* =========================
       MOBILE BURGER MENU
  ========================= */

  function initMobileBurgerMenu() {
    const mobileBurgerBtn = qs(SELECTORS.mobileBurgerBtn);
    const mobileDrawer = qs(SELECTORS.mobileDrawer);
    const mobileOverlay = qs(SELECTORS.mobileOverlay);
    const mobileCloseBtn = qs(SELECTORS.mobileCloseBtn);
    const drawerBody = qs(SELECTORS.mobileDrawerBody);

    if (!mobileBurgerBtn || !mobileDrawer || !mobileOverlay || !mobileCloseBtn || !drawerBody) {
      return;
    }

    const catalogScreen = qs('[data-screen="catalog"]', drawerBody);
    if (!catalogScreen) return;

    let historyStack = ["root"];

    function showScreen(name) {
      qsa(".mobile-menu-screen", drawerBody).forEach((screen) => {
        toggleClass(screen, "is-active", screen.dataset.screen === name);
      });
    }

    function openDrawer() {
      addClass(mobileDrawer, "is-open");
      addClass(mobileOverlay, "is-open");
      addClass(document.body, "mobile-menu-open");
      mobileDrawer.setAttribute("aria-hidden", "false");

      historyStack = ["root"];
      showScreen("root");
    }

    function closeDrawer() {
      removeClass(mobileDrawer, "is-open");
      removeClass(mobileOverlay, "is-open");
      removeClass(document.body, "mobile-menu-open");
      mobileDrawer.setAttribute("aria-hidden", "true");

      historyStack = ["root"];
      showScreen("root");
    }

    function navigateTo(name) {
      if (!name) return;

      const screen = qs('[data-screen="' + escapeSelector(name) + '"]', drawerBody);
      if (!screen) return;

      drawerBody.dataset.direction = "forward";
      historyStack.push(name);
      showScreen(name);
    }

    function goBack() {
      drawerBody.dataset.direction = "back";

      if (historyStack.length > 1) {
        historyStack.pop();
      }

      showScreen(historyStack[historyStack.length - 1] || "root");
    }

    function createTopBar(title) {
      const wrap = document.createElement("div");
      wrap.className = "mobile-submenu-top";

      wrap.innerHTML =
        '<button class="mobile-back-btn" type="button" aria-label="Назад">←</button>' +
        '<div class="mobile-submenu-title">' +
        escapeHtml(title) +
        "</div>";

      return wrap;
    }

    function parseDesktopMenu() {
      const categories = [];
      const categoryLines = qsa(SELECTORS.megaLine + "[data-menu]");

      categoryLines.forEach((line) => {
        const key = line.getAttribute("data-menu");
        if (!key || key === "custom-task") return;

        const title = cleanText(qs(".mega-menu__title", line)?.textContent);
        if (!title) return;

        const subtitle = cleanText(qs(".mega-menu__count", line)?.textContent);
        const icon = qs(".mega-menu__img img", line)?.getAttribute("src") || "";

        const contentBox = qs(
          '.mega-menu__box[data-menu-content="' + escapeSelector(key) + '"]',
        );

        if (!contentBox) return;

        const boxTitle =
          cleanText(qs(".mega-menu__title-line", contentBox)?.textContent) ||
          title;

        const sections = [];

        qsa(".mega-menu__wrap .mega-menu-column", contentBox).forEach((column) => {
          let currentSection = null;

          Array.from(column.children).forEach((element) => {
            const tag = element.tagName.toLowerCase();

            if (tag === "h4") {
              const sectionTitle = cleanText(element.textContent);
              if (!sectionTitle) return;

              currentSection = {
                title: sectionTitle,
                links: [],
              };

              sections.push(currentSection);
              return;
            }

            if (tag === "a" && currentSection) {
              const linkTitle = cleanText(element.textContent);
              if (!linkTitle) return;

              currentSection.links.push({
                title: linkTitle,
                href: element.getAttribute("href") || "#",
              });
            }
          });
        });

        categories.push({
          key,
          title,
          subtitle,
          icon,
          boxTitle,
          sections,
        });
      });

      return categories;
    }

    function removeGeneratedScreens() {
      qsa(".mobile-menu-screen[data-generated='true']", drawerBody).forEach((screen) => {
        screen.remove();
      });
    }

    function buildMobileMenu() {
      const categories = parseDesktopMenu();

      removeGeneratedScreens();

      catalogScreen.innerHTML = "";
      catalogScreen.appendChild(createTopBar("Каталог услуг"));

      const catalogList = document.createElement("div");
      catalogList.className = "mobile-list";

      categories.forEach((category) => {
        const categoryScreenName = "cat-" + category.key;

        const categoryBtn = document.createElement("button");
        categoryBtn.type = "button";
        categoryBtn.className = "mobile-category-card";
        categoryBtn.setAttribute("data-open-screen", categoryScreenName);

        categoryBtn.innerHTML =
          '<div class="mobile-category-card__icon">' +
          (category.icon
            ? '<img src="' +
              escapeHtml(category.icon) +
              '" alt="' +
              escapeHtml(category.title) +
              '">'
            : "") +
          "</div>" +
          '<div class="mobile-category-card__content">' +
          '<div class="mobile-category-card__title">' +
          escapeHtml(category.title) +
          "</div>" +
          '<div class="mobile-category-card__subtitle">' +
          escapeHtml(category.subtitle) +
          "</div>" +
          "</div>" +
          '<div class="mobile-category-card__arrow">›</div>';

        catalogList.appendChild(categoryBtn);

        const categoryScreen = document.createElement("div");
        categoryScreen.className = "mobile-menu-screen";
        categoryScreen.dataset.screen = categoryScreenName;
        categoryScreen.dataset.generated = "true";
        categoryScreen.appendChild(createTopBar(category.boxTitle));

        const sectionList = document.createElement("div");
        sectionList.className = "mobile-list";

        category.sections.forEach((section, sectionIndex) => {
          const sectionScreenName = categoryScreenName + "-section-" + sectionIndex;

          const sectionBtn = document.createElement("button");
          sectionBtn.type = "button";
          sectionBtn.className = "mobile-list-link";
          sectionBtn.setAttribute("data-open-screen", sectionScreenName);

          sectionBtn.innerHTML =
            "<span>" +
            escapeHtml(section.title) +
            "</span>" +
            '<span class="mobile-list-link__arrow">›</span>';

          sectionList.appendChild(sectionBtn);

          const sectionScreen = document.createElement("div");
          sectionScreen.className = "mobile-menu-screen";
          sectionScreen.dataset.screen = sectionScreenName;
          sectionScreen.dataset.generated = "true";
          sectionScreen.appendChild(createTopBar(section.title));

          const linksList = document.createElement("div");
          linksList.className = "mobile-link-list";

          section.links.forEach((link) => {
            const linkElement = document.createElement("a");
            linkElement.className = "mobile-link-item";
            linkElement.href = link.href || "#";
            linkElement.textContent = link.title;

            linksList.appendChild(linkElement);
          });

          sectionScreen.appendChild(linksList);
          drawerBody.appendChild(sectionScreen);
        });

        categoryScreen.appendChild(sectionList);
        drawerBody.appendChild(categoryScreen);
      });

      catalogScreen.appendChild(catalogList);
    }

    buildMobileMenu();

    on(mobileBurgerBtn, "click", openDrawer);
    on(mobileCloseBtn, "click", closeDrawer);
    on(mobileOverlay, "click", closeDrawer);

    on(drawerBody, "click", function (event) {
      const backBtn = event.target.closest(".mobile-back-btn");
      const openBtn = event.target.closest("[data-open-screen]");
      const targetBtn = event.target.closest("[data-target='catalog']");

      if (backBtn) {
        goBack();
        return;
      }

      if (targetBtn) {
        navigateTo("catalog");
        return;
      }

      if (openBtn) {
        navigateTo(openBtn.getAttribute("data-open-screen"));
      }
    });

    on(document, "keydown", function (event) {
      if (event.key === "Escape") closeDrawer();
    });
  }

  /* =========================
       ORDERS PAGINATION / FILTERS / SEARCH
  ========================= */

  function initOrdersPagination() {
    const rows = qsa(SELECTORS.tableRow);

    if (!rows.length) return;

    const limit = qs(SELECTORS.paginationLimit);
    const range = qs(SELECTORS.paginationRange);
    const pages = qs(SELECTORS.paginationPages);
    const pageSelect = qs(SELECTORS.paginationPage);
    const prev = qs(SELECTORS.paginationPrev);
    const next = qs(SELECTORS.paginationNext);
    const searchbar = qs(SELECTORS.searchbar);
    const filters = qsa(SELECTORS.orderFilter);

    const hasPaginationControls = limit || range || pages || pageSelect || prev || next;
    const hasFilteringControls = searchbar || filters.length;

    if (!hasPaginationControls && !hasFilteringControls) return;

    let filteredRows = [...rows];
    let rowsPerPage = Number(limit?.value) || 7;
    let currentPage = 1;

    let searchValue = "";
    let activeFilter = "all";

    function getRowStatus(row) {
      if (hasClass(row, "done")) return "done";
      if (hasClass(row, "in-process")) return "in-process";
      if (hasClass(row, "pending")) return "pending";

      return "done";
    }

    function getRowSearchText(row) {
      const orderName = qs(".order-name", row)?.textContent || "";
      const customer = qs(".customer", row)?.textContent || "";
      return (orderName + " " + customer).toLowerCase();
    }

    function updateFilteredRows() {
      filteredRows = rows.filter((row) => {
        const matchesSearch = getRowSearchText(row).includes(searchValue);
        const status = getRowStatus(row);
        const matchesFilter = activeFilter === "all" || activeFilter === status;

        return matchesSearch && matchesFilter;
      });
    }

    function getPageCount() {
      return Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
    }

    function renderPagination() {
      const totalItems = filteredRows.length;
      const pageCount = getPageCount();

      const startItem = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
      const endItem = Math.min(currentPage * rowsPerPage, totalItems);

      if (range) {
        range.textContent = startItem + " - " + endItem + " of " + totalItems + " items";
      }

      if (pages) {
        pages.textContent = "of " + pageCount + " pages";
      }

      if (pageSelect) {
        pageSelect.innerHTML = "";

        for (let i = 1; i <= pageCount; i += 1) {
          const pageLabel = String(i).padStart(2, "0");
          const option = new Option(pageLabel, String(i), i === currentPage, i === currentPage);
          pageSelect.appendChild(option);
        }
      }

      if (prev) {
        prev.disabled = currentPage === 1;
      }

      if (next) {
        next.disabled = currentPage === pageCount || totalItems === 0;
      }
    }

    function showPage(page) {
      const pageCount = getPageCount();

      currentPage = Math.min(Math.max(Number(page) || 1, 1), pageCount);

      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      rows.forEach((row) => {
        row.style.display = "none";
      });

      filteredRows.slice(start, end).forEach((row) => {
        row.style.display = "grid";
      });

      renderPagination();
    }

    function setText(selector, value) {
      const element = qs(selector);
      if (!element) return;
      element.textContent = value;
    }

    function updateOrderCounts() {
      const total = rows.length;
      const done = rows.filter((row) => hasClass(row, "done")).length;
      const inProcess = rows.filter((row) => hasClass(row, "in-process")).length;
      const pending = rows.filter((row) => hasClass(row, "pending")).length;

      setText(".all-orders .ordercount", total);
      setText(".orders-done .ordercount", done);
      setText(".order-filter-option.in-process .ordercount", inProcess);
      setText(".order-filter-option.pending .ordercount", pending);
      setText(".order-filter-option.pendind .ordercount", pending);
    }

    function setActiveFilter(filterElement) {
      if (!filterElement) return;

      filters.forEach((filter) => removeClass(filter, "selected"));
      addClass(filterElement, "selected");

      if (hasClass(filterElement, "all-orders")) {
        activeFilter = "all";
      } else if (hasClass(filterElement, "orders-done")) {
        activeFilter = "done";
      } else if (hasClass(filterElement, "in-process")) {
        activeFilter = "in-process";
      } else if (hasClass(filterElement, "pending") || hasClass(filterElement, "pendind")) {
        activeFilter = "pending";
      }

      updateFilteredRows();
      showPage(1);
    }

    on(searchbar, "input", function () {
      searchValue = String(this.value || "").toLowerCase();

      updateFilteredRows();
      showPage(1);
    });

    onAll(filters, "click", function () {
      setActiveFilter(this);
    });

    on(limit, "change", function () {
      rowsPerPage = Number(this.value) || 7;
      showPage(1);
    });

    on(pageSelect, "change", function () {
      showPage(Number(this.value) || 1);
    });

    on(prev, "click", function () {
      showPage(currentPage - 1);
    });

    on(next, "click", function () {
      showPage(currentPage + 1);
    });

    updateOrderCounts();
    updateFilteredRows();
    showPage(1);
  }
/* =========================
   ADD TASK MODAL / TASK CREATE
========================= */

function initAddTaskModal() {
  const orderTopBtns = qsa(".order__top-btn");
  const menuWrappers = qsa(".menuWrapper");
  const addOrderTask = qs("#addOrderTask");
  const overlayGray = qs(".overlayGray");
  const modals = qsa(".modal");
  const addTaskModal = qs("#addTaskModal");

  const addTaskForm = qs(".addTaskModal__form");
  const taskTextarea = qs(".addTaskModal__textarea");
  const taskCategory = qs(".addTaskModal__select");

  if (!orderTopBtns.length && !addTaskForm) return;

  onAll(orderTopBtns, "click", function () {
    orderTopBtns.forEach((b) => removeClass(b, "active"));
    addClass(this, "active");

    menuWrappers.forEach((block) => removeClass(block, "active"));

    const target = this.dataset.togle;

    if (target) {
      const activeBlock = document.getElementById(target);
      if (activeBlock) addClass(activeBlock, "active");
    }

    if (target === "task") {
      addClass(addOrderTask, "active");
    } else {
      removeClass(addOrderTask, "active");
    }
  });


  on(addOrderTask, "click", function () {
    if (!hasClass(addOrderTask, "active")) return;

    addClass(overlayGray, "active");

    modals.forEach((modal) => removeClass(modal, "active"));

    if (addTaskModal) addClass(addTaskModal, "active");
  });

  function closeModal() {
    removeClass(overlayGray, "active");
    modals.forEach((modal) => removeClass(modal, "active"));
  }

  onAll(qsa(".modal__close"), "click", closeModal);


  function getTodoColumn() {
    const columns = qsa("#task .task__column");

    return columns.find((column) => {
      const title = qs(".task__column-title", column)?.textContent.trim();
      return title && title.includes("Сделать");
    });
  }

  function getPriorityData() {
    const checkedPriority = qs('input[name="priority"]:checked');

    const priorityText = checkedPriority
      ?.closest(".addTaskModal__priorityItem")
      ?.querySelector("span")
      ?.textContent.trim();

    const map = {
      "Низкий": { className: "low", text: "Low" },
      "Средний": { className: "medium", text: "Medium" },
      "Высокий": { className: "hight", text: "Hight" },
      "Срочный": { className: "urgent", text: "Очень срочно" },
    };

    return map[priorityText] || map["Низкий"];
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function createTaskItem(category, description, priority) {
    const taskItem = document.createElement("div");
    taskItem.className = "task__item";

    taskItem.innerHTML = `
      <svg class="border-svg">
        <rect x="0" y="0" width="100%" height="100%" rx="4" ry="4"/>
      </svg>

      <div class="task__item-info">
        <div class="task__item-title">
          ${escapeHtml(category)}
        </div>

        <div class="task__item-subtitle">
          ${escapeHtml(description)}
        </div>

        <div class="task__item-quality">
          <div class="task__item-quality--level ${priority.className}">
            ${priority.text}
          </div>
          <div class="task__item-quality--users">
                            <div class="task__item-quality--user">
                              <img src="../img/user-avatars/user-avatar5.jpg" alt="user">
                            </div>
                            <div class="task__item-quality--user">
                              <img src="../img/user-avatars/user-avatar5.jpg" alt="user">
                            </div>
                            <div class="task__item-quality--user">
                              <img src="../img/user-avatars/user-avatar5.jpg" alt="user">
                            </div>
                          </div>
        </div>
      </div>

      <div class="task__item-stats">
        <div class="task__item-data">${getCurrentDate()}</div>
      </div>
    `;

    return taskItem;
  }

  // =====================
  // SUBMIT FORM
  // =====================
  on(addTaskForm, "submit", function (event) {
    event.preventDefault();

    const descriptionValue = taskTextarea?.value.trim();
    const categoryValue = taskCategory?.value.trim();

    if (!descriptionValue) {
      taskTextarea?.focus();
      return;
    }

    const todoColumn = getTodoColumn();
    if (!todoColumn) return;

    const taskItems = qs(".task__items", todoColumn);
    if (!taskItems) return;

    const priority = getPriorityData();

    const newTask = createTaskItem(
      categoryValue || "Без категории",
      descriptionValue,
      priority
    );

    taskItems.prepend(newTask);

    // подключаем drag
    if (typeof initTaskCardDrag === "function") {
      initTaskCardDrag(newTask);
    }

    if (typeof updateTaskColumnCounts === "function") {
      updateTaskColumnCounts();
    }

    this.reset();
    closeModal();
  });
}
  /* =========================
       INIT
  ========================= */
let draggedCard = null;

function updateTaskColumnCounts() {
  document.querySelectorAll(".task__column").forEach((column) => {
    const items = column.querySelectorAll(".task__item");
    const countElement = column.querySelector(
      ".task__column-title span:last-child span"
    );

    if (countElement) {
      countElement.textContent = items.length;
    }
  });
}

function getCardAfterElement(container, mouseY) {
  const draggableCards = [
    ...container.querySelectorAll(".task__item:not(.is-dragging)")
  ];

  return draggableCards.reduce(
    (closest, card) => {
      const box = card.getBoundingClientRect();
      const offset = mouseY - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return {
          offset,
          element: card,
        };
      }

      return closest;
    },
    {
      offset: Number.NEGATIVE_INFINITY,
      element: null,
    }
  ).element;
}

function initTaskCardDrag(card) {
  if (!card) return;

  // чтобы не навешивать события повторно
  if (card.dataset.dragInit === "true") return;

  card.dataset.dragInit = "true";
  card.setAttribute("draggable", "true");

  card.addEventListener("dragstart", function () {
    draggedCard = this;

    this.classList.add("is-dragging");

    requestAnimationFrame(() => {
      this.classList.add("is-hidden-during-drag");
    });
  });

  card.addEventListener("dragend", function () {
    this.classList.remove("is-dragging");
    this.classList.remove("is-hidden-during-drag");

    document.querySelectorAll(".task__items").forEach((column) => {
      column.classList.remove("is-drag-over");
    });

    draggedCard = null;
    updateTaskColumnCounts();
  });
}

function initTaskColumnDrop(column) {
  if (!column) return;

  // чтобы не навешивать события повторно
  if (column.dataset.dropInit === "true") return;

  column.dataset.dropInit = "true";

  column.addEventListener("dragover", function (event) {
    event.preventDefault();

    if (!draggedCard) return;

    this.classList.add("is-drag-over");

    const afterElement = getCardAfterElement(this, event.clientY);

    if (!afterElement) {
      this.appendChild(draggedCard);
    } else {
      this.insertBefore(draggedCard, afterElement);
    }
  });

  column.addEventListener("dragleave", function () {
    this.classList.remove("is-drag-over");
  });

  column.addEventListener("drop", function () {
    this.classList.remove("is-drag-over");
    updateTaskColumnCounts();
  });
}

function initTaskDragAndDrop() {
  const board = document.querySelector(".task__box");
  const columns = document.querySelectorAll(".task__items");
  const cards = document.querySelectorAll(".task__item");

  if (!board || !columns.length) return;

  columns.forEach(initTaskColumnDrop);
  cards.forEach(initTaskCardDrag);

  updateTaskColumnCounts();
}
  document.addEventListener("DOMContentLoaded", function () {
    initHeaderState();
    initModalsAndUserHeader();
    initDesktopMegaMenu();
    initMobileBurgerMenu();
    initOrdersPagination();
      initTaskDragAndDrop();
      initAddTaskModal()
  });
})();
