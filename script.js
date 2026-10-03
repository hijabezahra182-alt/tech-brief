// DATE

const today = document.getElementById("today");

const date = new Date();

today.textContent = date.toLocaleDateString("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric"
});


// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");

  menuBtn.textContent =
    mobileMenu.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});


// SEARCH

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  searchPanel.classList.toggle("open");

  if (searchPanel.classList.contains("open")) {
    setTimeout(() => {
      searchInput.focus();
    }, 200);
  }
});

closeSearch.addEventListener("click", () => {
  searchPanel.classList.remove("open");
  searchInput.value = "";
});


// SEARCH STORIES

searchInput.addEventListener("input", () => {

  const query = searchInput.value.toLowerCase().trim();

  document.querySelectorAll(".story-card").forEach(card => {

    const text = card.textContent.toLowerCase();

    if (text.includes(query)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }

  });

});


// DARK MODE

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("techbrief-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀";
}

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  themeBtn.textContent = isDark ? "☀" : "☾";

  localStorage.setItem(
    "techbrief-theme",
    isDark ? "dark" : "light"
  );

});


// CATEGORY FILTERS

const filters = document.querySelectorAll(".filter");
const stories = document.querySelectorAll(".story-card");

filters.forEach(filter => {

  filter.addEventListener("click", () => {

    filters.forEach(btn => {
      btn.classList.remove("active");
    });

    filter.classList.add("active");

    const selected = filter.dataset.filter;

    stories.forEach(story => {

      const category = story.dataset.category;

      if (selected === "all" || category === selected) {
        story.classList.remove("hidden");
      } else {
        story.classList.add("hidden");
      }

    });

  });

});


// SAVE BUTTONS

document.querySelectorAll(".save-btn").forEach(button => {

  button.addEventListener("click", () => {

    button.textContent =
      button.textContent === "♡" ? "♥" : "♡";

    showToast(
      button.textContent === "♥"
        ? "Story saved"
        : "Story removed"
    );

  });

});


// ARTICLE MODAL

const modal = document.getElementById("articleModal");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll("[data-article]").forEach(button => {

  button.addEventListener("click", () => {

    modalTitle.textContent = button.dataset.article;

    modal.classList.add("open");

    document.body.style.overflow = "hidden";

  });

});

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {

  if (event.target === modal) {
    closeModal();
  }

});

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    closeModal();
  }

});


// NEWSLETTER

const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const email = document.getElementById("emailInput");

  if (email.value.trim() !== "") {

    showToast("You're on the list ✦");

    email.value = "";

  }

});


// TOAST

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

let toastTimer;

function showToast(message) {

  toastMessage.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);

}


// NAVIGATION ACTIVE STATE

const navLinks = document.querySelectorAll(".desktop-nav a");

navLinks.forEach(link => {

  link.addEventListener("click", () => {

    navLinks.forEach(item => {
      item.style.color = "";
    });

    link.style.color = "var(--accent-dark)";

  });

});


// ESCAPE SEARCH

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    searchPanel.classList.remove("open");
  }

});
