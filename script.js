const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const panel = document.querySelector("#action-panel");
const panelClose = document.querySelector(".panel-close");
const panelViews = document.querySelectorAll("[data-panel-view]");
const openPanelButtons = document.querySelectorAll("[data-open-panel]");
const filterButtons = document.querySelectorAll(".filter-button");
const eventCards = document.querySelectorAll(".event-card");
const eventSearch = document.querySelector("#event-search");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

function openPanel(viewName) {
  panelViews.forEach((view) => {
    view.hidden = view.dataset.panelView !== viewName;
  });
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
}

function closePanel() {
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
}

openPanelButtons.forEach((button) => {
  button.addEventListener("click", () => openPanel(button.dataset.openPanel));
});

panelClose.addEventListener("click", closePanel);

panel.addEventListener("click", (event) => {
  if (event.target === panel) {
    closePanel();
  }
});

function applyEventFilters() {
  const activeFilter = document.querySelector(".filter-button.active").dataset.filter;
  const searchTerm = eventSearch.value.trim().toLowerCase();

  eventCards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.type === activeFilter;
    const text = `${card.textContent} ${card.dataset.keywords}`.toLowerCase();
    const matchesSearch = !searchTerm || text.includes(searchTerm);
    card.hidden = !(matchesFilter && matchesSearch);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    applyEventFilters();
  });
});

eventSearch.addEventListener("input", applyEventFilters);
