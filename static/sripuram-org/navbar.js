document.addEventListener("DOMContentLoaded", function () {
  // Initialize SmartMenus on horizontal header
  if (typeof $ !== "undefined" && $.fn.smartmenus) {
    $("#main-menu").smartmenus();
  }

  // Hold dropdown open when "Sripuram" header item is clicked
  const sripuramParent = document.querySelector(".sn-mega-menu-parent");
  if (sripuramParent) {
    const sripuramLink = sripuramParent.querySelector("a");
    if (sripuramLink) {
      sripuramLink.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        sripuramParent.classList.toggle("sn-mega-menu-locked");
      });
    }
  }

  // Close dropdown if clicked elsewhere on the page
  document.addEventListener("click", function (e) {
    if (sripuramParent && !sripuramParent.contains(e.target)) {
      sripuramParent.classList.remove("sn-mega-menu-locked");
    }
  });

  // Close dropdown when scrolling the page
  window.addEventListener(
    "scroll",
    function () {
      if (
        sripuramParent &&
        sripuramParent.classList.contains("sn-mega-menu-locked")
      ) {
        sripuramParent.classList.remove("sn-mega-menu-locked");
      }
    },
    { passive: true },
  );

  const openBtn = document.getElementById("sn-open-btn");
  const closeBtn = document.getElementById("sn-close-btn");
  const drawer = document.getElementById("sn-drawer");
  const backdrop = document.getElementById("sn-backdrop");
  const accordions = document.querySelectorAll(".sn-accordion-btn");

  function openDrawer() {
    document.body.classList.add("sn-open");
    openBtn.setAttribute("aria-expanded", "true");
  }

  function closeDrawer() {
    document.body.classList.remove("sn-open");
    openBtn.setAttribute("aria-expanded", "false");
  }

  if (openBtn && closeBtn && drawer && backdrop) {
    openBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      openDrawer();
    });
    closeBtn.addEventListener("click", closeDrawer);
    backdrop.addEventListener("click", closeDrawer);

    // Close drawer if user clicks anywhere outside of the drawer and open button
    document.addEventListener("click", function (e) {
      if (document.body.classList.contains("sn-open")) {
        if (!drawer.contains(e.target) && !openBtn.contains(e.target)) {
          closeDrawer();
        }
      }
    });

    // Close drawer if user scrolls the page
    window.addEventListener(
      "scroll",
      function () {
        if (document.body.classList.contains("sn-open")) {
          closeDrawer();
        }
      },
      { passive: true },
    );
  }

  // Accordion Logic
  accordions.forEach((btn) => {
    btn.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      const subList = this.nextElementSibling;

      // Close all others first
      accordions.forEach((otherBtn) => {
        if (otherBtn !== this) {
          otherBtn.setAttribute("aria-expanded", "false");
          otherBtn.nextElementSibling.classList.remove("sn-open");
          otherBtn.nextElementSibling.setAttribute("aria-hidden", "true");
        }
      });

      // Toggle current
      this.setAttribute("aria-expanded", !isExpanded);
      if (!isExpanded) {
        subList.classList.add("sn-open");
        subList.setAttribute("aria-hidden", "false");
      } else {
        subList.classList.remove("sn-open");
        subList.setAttribute("aria-hidden", "true");
      }
    });
  });
});
