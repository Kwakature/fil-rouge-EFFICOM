const normalizePath = (path) => {
  if (!path || path === "/") {
    return "/index.html";
  }
  return path.endsWith("/") ? `${path}index.html` : path;
};

const loadHead = () => {
  if (document.head.dataset.headPartialLoaded === "true") {
    return;
  }

  fetch("/html/head.html")
    .then((response) => response.text())
    .then((data) => {
      const template = document.createElement("template");
      template.innerHTML = data.trim();

      template.content.querySelectorAll("meta, link").forEach((node) => {
        if (node.tagName === "META") {
          const nameAttr = node.getAttribute("name");
          if (
            nameAttr &&
            document.head.querySelector(`meta[name="${nameAttr}"]`)
          ) {
            node.remove();
          }
        } else if (node.tagName === "LINK") {
          const relAttr = node.getAttribute("rel");
          const hrefAttr = node.getAttribute("href");
          if (
            relAttr &&
            hrefAttr &&
            document.head.querySelector(
              `link[rel="${relAttr}"][href="${hrefAttr}"]`
            )
          ) {
            node.remove();
          }
        }
      });

      document.head.appendChild(template.content);
      document.head.dataset.headPartialLoaded = "true";
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du head :", error)
    );
};

const highlightActiveLink = () => {
  const nav = document.querySelector("#nav");
  if (!nav) {
    return;
  }

  const currentPath = normalizePath(window.location.pathname);
  const navLinks = Array.from(nav.querySelectorAll("a"));
  const linkByPath = new Map(
    navLinks.map((link) => [normalizePath(link.getAttribute("href")), link])
  );

  let targetPath = currentPath;

  if (!linkByPath.has(targetPath)) {
    const productSection = "/html/produits.html";
    const nonProductPages = new Set([
      productSection,
      "/html/savoir-faire.html",
      "/html/contact.html",
    ]);

    if (targetPath.startsWith("/html/") && !nonProductPages.has(targetPath)) {
      targetPath = productSection;
    }
  }

  navLinks.forEach((link) => {
    const linkPath = normalizePath(link.getAttribute("href"));
    if (linkPath === targetPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

const initializeNavigation = () => {
  const burger = document.querySelector("#burger");
  const nav = document.querySelector("#nav");
  if (!burger || !nav) {
    return;
  }

  burger.addEventListener("click", () => {
    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    });
  });
};

const loadHeader = () => {
  const headerContainer = document.querySelector("#header");
  if (!headerContainer) {
    return;
  }

  fetch("/html/header.html")
    .then((response) => response.text())
    .then((data) => {
      headerContainer.innerHTML = data;
      initializeNavigation();
      highlightActiveLink();
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du header :", error)
    );
};

const loadFooter = () => {
  const footerContainer = document.querySelector("#footer");
  if (!footerContainer) {
    return;
  }

  fetch("/html/footer.html")
    .then((response) => response.text())
    .then((data) => {
      footerContainer.innerHTML = data;
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du footer :", error)
    );
};

loadHead();

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
});
