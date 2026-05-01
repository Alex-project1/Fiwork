/* =========================================================
   FIWORK MAIN JS
   Один общий файл для всех страниц.
   Если элемента на странице нет — код его пропускает.
========================================================= */

(function () {
  "use strict";
  const headerWrapper = document.querySelector(".computer-header");
  const userBlockMobile = document.querySelector(".userBlockMobile");
  const regBlockMobile = document.querySelector(".regBlockMobile");
  const mobileRegBtn = document.querySelector(".mobileRegBtn");
  if (headerWrapper.classList.contains("user")) {
    mobileRegBtn.classList.add('dn')
    userBlockMobile.classList.add("active");
  }
  if (headerWrapper.classList.contains("reg")) {
    regBlockMobile.classList.add("active");
    mobileRegBtn.classList.add('dn')
  }
 
  const SELECTORS = {
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

  const qs = (selector, parent = document) => parent.querySelector(selector);
  const qsa = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  function on(element, eventName, handler, options) {
    if (!element) return;
    element.addEventListener(eventName, handler, options);
  }

  function onAll(elements, eventName, handler, options) {
    if (!elements || !elements.length) return;
    elements.forEach((element) => on(element, eventName, handler, options));
  }

  function cleanText(text) {
    return String(text || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = String(value || "");
    return div.innerHTML;
  }

  function escapeSelector(value) {
    if (window.CSS && typeof window.CSS.escape === "function") {
      return window.CSS.escape(value);
    }

    return String(value).replace(/"/g, '\\"');
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

    if (
      !btns.length &&
      !modals.length &&
      !overlayGray &&
      !loginBtn &&
      !headerReg &&
      !avatarInput &&
      !userRoles.length &&
      !exitBtns.length
    ) {
      return;
    }

    function closeAllModals() {
      modals.forEach((modal) => {
        modal.classList.remove("active");
      });

      if (overlayGray) {
        overlayGray.classList.remove("active");
      }
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

      if (overlayGray) {
        overlayGray.classList.add("active");
      }

      modal.classList.add("active");
    });

    onAll(modalCloseBtns, "click", closeAllModals);

    on(overlayGray, "click", closeAllModals);

    on(loginBtn, "click", function () {
      closeAllModals();

      if (headerBox) {
        headerBox.classList.add("reg");
      }
    regBlockMobile.classList.add("active");
    mobileRegBtn.classList.add('dn')
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
      userRoles.forEach((item) => {
        item.classList.remove("active");
      });

      this.classList.add("active");
    });

    onAll(exitBtns, "click", function () {
      if (!headerBox) return;

      headerBox.classList.remove("user");
      headerBox.classList.remove("reg");
       userBlockMobile.classList.remove("active");
    regBlockMobile.classList.remove("active");
    mobileRegBtn.classList.remove('dn')
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

    const desktopQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    let closeTimer = null;

    function isDesktop() {
      return desktopQuery.matches && window.innerWidth > 1024;
    }

    function openMenu() {
      clearTimeout(closeTimer);
      menuWrapper.classList.add("is-open");
      document.body.classList.add("mega-menu-open");
    }

    function closeMenuNow() {
      clearTimeout(closeTimer);
      menuWrapper.classList.remove("is-open");
      document.body.classList.remove("mega-menu-open");

      navItems.forEach((item) => {
        item.classList.remove("is-active");
      });
    }

    function closeMenuWithDelay() {
      clearTimeout(closeTimer);

      closeTimer = setTimeout(function () {
        if (navPart2.matches(":hover") || menuWrapper.matches(":hover")) return;
        closeMenuNow();
      }, 250);
    }

    function setActiveMenu(menuKey, shouldOpen = true) {
      if (!menuKey) return;

      navItems.forEach((item) => {
        item.classList.toggle("is-active", item.dataset.menu === menuKey);
      });

      megaLines.forEach((line) => {
        line.classList.toggle("is-active", line.dataset.menu === menuKey);
      });

      megaBoxes.forEach((box) => {
        box.classList.toggle("is-active", box.dataset.menuContent === menuKey);
      });

      if (shouldOpen) {
        openMenu();
      }
    }

    if (navItems.some((item) => item.dataset.menu === "design")) {
      setActiveMenu("design", false);
    }

    onAll(navItems, "mouseenter", function () {
      if (!isDesktop()) return;
      setActiveMenu(this.dataset.menu);
    });

    onAll(navItems, "focusin", function () {
      if (!isDesktop()) return;
      setActiveMenu(this.dataset.menu);
    });

    onAll(megaLines, "mouseenter", function () {
      if (!isDesktop()) return;
      setActiveMenu(this.dataset.menu);
    });

    onAll(megaLines, "focusin", function () {
      if (!isDesktop()) return;
      setActiveMenu(this.dataset.menu);
    });

    [navPart2, menuWrapper].forEach((element) => {
      on(element, "mouseenter", function () {
        if (!isDesktop()) return;
        clearTimeout(closeTimer);
        openMenu();
      });

      on(element, "mouseleave", function () {
        if (!isDesktop()) return;
        closeMenuWithDelay();
      });
    });

    onAll(navLinks, "click", function (event) {
      if (isDesktop()) return;

      const item = this.closest(SELECTORS.navItem);
      if (!item) return;

      event.preventDefault();

      const menuKey = item.dataset.menu;
      if (!menuKey) return;

      if (
        item.classList.contains("is-active") &&
        menuWrapper.classList.contains("is-open")
      ) {
        closeMenuNow();
      } else {
        setActiveMenu(menuKey, true);
      }
    });

    onAll(megaLines, "click", function () {
      if (isDesktop()) return;
      setActiveMenu(this.dataset.menu, true);
    });

    on(document, "click", function (event) {
      if (event.target.closest(SELECTORS.navPart2)) return;
      closeMenuNow();
    });

    on(document, "keyup", function (event) {
      if (event.key === "Escape") {
        closeMenuNow();
      }
    });

    on(window, "resize", function () {
      closeMenuNow();

      if (navItems.some((item) => item.dataset.menu === "design")) {
        setActiveMenu("design", false);
      }
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

    if (
      !mobileBurgerBtn ||
      !mobileDrawer ||
      !mobileOverlay ||
      !mobileCloseBtn ||
      !drawerBody
    ) {
      return;
    }

    const catalogScreen = qs('[data-screen="catalog"]', drawerBody);
    if (!catalogScreen) return;

    let historyStack = ["root"];

    function openDrawer() {
      mobileDrawer.classList.add("is-open");
      mobileOverlay.classList.add("is-open");
      document.body.classList.add("mobile-menu-open");
      mobileDrawer.setAttribute("aria-hidden", "false");

      historyStack = ["root"];
      showScreen("root");
    }

    function closeDrawer() {
      mobileDrawer.classList.remove("is-open");
      mobileOverlay.classList.remove("is-open");
      document.body.classList.remove("mobile-menu-open");
      mobileDrawer.setAttribute("aria-hidden", "true");

      historyStack = ["root"];
      showScreen("root");
    }

    function showScreen(name) {
      qsa(".mobile-menu-screen", drawerBody).forEach((screen) => {
        screen.classList.toggle("is-active", screen.dataset.screen === name);
      });
    }

    function navigateTo(name) {
      if (!name) return;

      const screen = drawerBody.querySelector('[data-screen="' + name + '"]');
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

        qsa(".mega-menu__wrap .mega-menu-column", contentBox).forEach(
          (column) => {
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
          },
        );

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
      qsa(".mobile-menu-screen[data-generated='true']", drawerBody).forEach(
        (screen) => {
          screen.remove();
        },
      );
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
          const sectionScreenName =
            categoryScreenName + "-section-" + sectionIndex;

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
      if (event.key === "Escape") {
        closeDrawer();
      }
    });
  }

  /* =========================
       ORDERS PAGINATION
    ========================= */

  function initOrdersPagination() {
    if (typeof window.jQuery === "undefined") return;

    const $ = window.jQuery;
    const $rows = $(SELECTORS.tableRow);

    if (!$rows.length) return;

    const $limit = $(SELECTORS.paginationLimit);
    const $range = $(SELECTORS.paginationRange);
    const $pages = $(SELECTORS.paginationPages);
    const $pageSelect = $(SELECTORS.paginationPage);
    const $prev = $(SELECTORS.paginationPrev);
    const $next = $(SELECTORS.paginationNext);
    const $searchbar = $(SELECTORS.searchbar);
    const $filters = $(SELECTORS.orderFilter);

    if (
      !$limit.length &&
      !$range.length &&
      !$pages.length &&
      !$pageSelect.length
    ) {
      return;
    }

    let filteredRows = $rows.toArray();
    let rowsPerPage = Number($limit.val()) || 7;
    let currentPage = 1;

    let searchValue = "";
    let activeFilter = "all";

    function getRowStatus($row) {
      if ($row.hasClass("done")) return "done";
      if ($row.hasClass("in-process")) return "in-process";
      if ($row.hasClass("pending")) return "pending";

      return "done";
    }

    function updateFilteredRows() {
      filteredRows = $rows
        .filter(function () {
          const $row = $(this);

          const orderName = $row.find(".order-name").text().toLowerCase();
          const customer = $row.find(".customer").text().toLowerCase();

          const matchesSearch =
            orderName.includes(searchValue) || customer.includes(searchValue);

          const status = getRowStatus($row);
          const matchesFilter =
            activeFilter === "all" || activeFilter === status;

          return matchesSearch && matchesFilter;
        })
        .toArray();
    }

    function getPageCount() {
      return Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
    }

    function renderPagination() {
      const totalItems = filteredRows.length;
      const pageCount = getPageCount();

      const startItem =
        totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

      const endItem = Math.min(currentPage * rowsPerPage, totalItems);

      if ($range.length) {
        $range.text(
          startItem + " - " + endItem + " of " + totalItems + " items",
        );
      }

      if ($pages.length) {
        $pages.text("of " + pageCount + " pages");
      }

      if ($pageSelect.length) {
        $pageSelect.empty();

        for (let i = 1; i <= pageCount; i += 1) {
          const pageLabel = String(i).padStart(2, "0");
          const option = new Option(
            pageLabel,
            String(i),
            i === currentPage,
            i === currentPage,
          );

          $pageSelect.append(option);
        }
      }

      if ($prev.length) {
        $prev.prop("disabled", currentPage === 1);
      }

      if ($next.length) {
        $next.prop("disabled", currentPage === pageCount || totalItems === 0);
      }
    }

    function showPage(page) {
      const pageCount = getPageCount();

      currentPage = Math.min(Math.max(page, 1), pageCount);

      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      $rows.hide();

      $(filteredRows)
        .slice(start, end)
        .each(function () {
          $(this).css("display", "grid");
        });

      renderPagination();
    }

    function updateOrderCounts() {
      const total = $rows.length;

      const done = $rows.filter(function () {
        return $(this).hasClass("done");
      }).length;

      const inProcess = $rows.filter(function () {
        return $(this).hasClass("in-process");
      }).length;

      const pending = $rows.filter(function () {
        return $(this).hasClass("pending");
      }).length;

      $(".all-orders .ordercount").text(total);
      $(".orders-done .ordercount").text(done);
      $(".order-filter-option.in-process .ordercount").text(inProcess);

      $(
        ".order-filter-option.pending .ordercount, .order-filter-option.pendind .ordercount",
      ).text(pending);
    }

    $searchbar.on("input", function () {
      searchValue = String($(this).val() || "").toLowerCase();

      updateFilteredRows();
      showPage(1);
    });

    $filters.on("click", function () {
      const $filter = $(this);

      $filters.removeClass("selected");
      $filter.addClass("selected");

      if ($filter.hasClass("all-orders")) {
        activeFilter = "all";
      } else if ($filter.hasClass("orders-done")) {
        activeFilter = "done";
      } else if ($filter.hasClass("in-process")) {
        activeFilter = "in-process";
      } else if ($filter.hasClass("pending") || $filter.hasClass("pendind")) {
        activeFilter = "pending";
      }

      updateFilteredRows();
      showPage(1);
    });

    $limit.on("change", function () {
      rowsPerPage = Number($(this).val()) || 7;
      showPage(1);
    });

    $pageSelect.on("change", function () {
      showPage(Number($(this).val()) || 1);
    });

    $prev.on("click", function () {
      showPage(currentPage - 1);
    });

    $next.on("click", function () {
      showPage(currentPage + 1);
    });

    updateOrderCounts();
    updateFilteredRows();
    showPage(1);
  }

  /* =========================
       INIT
    ========================= */

  document.addEventListener("DOMContentLoaded", function () {
    initModalsAndUserHeader();
    initDesktopMegaMenu();
    initMobileBurgerMenu();
    initOrdersPagination();
  });
})();
