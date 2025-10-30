(() => {
  const STORAGE_KEY = "cart:items";

  const state = {
    items: [],
  };

  const selectors = {
    addToCart: "[data-add-to-cart]",
    productRoot: "[data-product-id]",
    cartCount: "[data-cart-count]",
    cartPanel: "[data-cart-panel]",
    cartBody: "[data-cart-body]",
    cartTotal: "[data-cart-total]",
    cartEmpty: "[data-cart-empty]",
    overlay: "[data-cart-overlay]",
    toggleButtons: "[data-cart-toggle]",
    removeButton: "[data-remove-item]",
  };

  const formatters = {
    currency(value) {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
      }).format(value);
    },
  };

  const readStorage = () => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed
        .map((item) => ({
          id: String(item.id),
          name: String(item.name),
          price: Number(item.price),
          formattedPrice: String(item.formattedPrice),
          quantity: Number(item.quantity) || 1,
        }))
        .filter((item) => !Number.isNaN(item.price) && item.id && item.name);
    } catch (error) {
      return [];
    }
  };

  const writeStorage = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      // Ignore write errors (quota, private mode, etc.)
    }
  };

  const parsePrice = (rawPrice = "") => {
    const normalised = rawPrice.replace(/\s/g, "").replace(",", ".");
    const match = normalised.match(/-?\d+(\.\d+)?/);
    if (!match) {
      return 0;
    }
    return Number.parseFloat(match[0]);
  };

  const getProductFromElement = (element) => {
    const productRoot = element.closest(selectors.productRoot);
    if (!productRoot) {
      return null;
    }

    const id = productRoot.dataset.productId;
    const name = productRoot.dataset.productName;
    let formattedPrice =
      productRoot.dataset.productPriceLabel ||
      productRoot.dataset.productPrice ||
      "";

    if (!formattedPrice) {
      const fallbackNode =
        productRoot.querySelector("[data-product-price-display]") ||
        productRoot.querySelector(".price-value") ||
        productRoot.querySelector(".price");
      if (fallbackNode) {
        formattedPrice = fallbackNode.textContent.trim();
      }
    }

    const unitPriceSource =
      productRoot.dataset.productPrice || formattedPrice || "";
    const price = parsePrice(unitPriceSource);

    if (!id || !name) {
      return null;
    }

    return {
      id,
      name,
      price,
      formattedPrice,
    };
  };

  const findItemIndex = (id) => state.items.findIndex((item) => item.id === id);

  const getItemCount = () =>
    state.items.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  const setToggleState = (isOpen) => {
    const triggers = document.querySelectorAll(selectors.toggleButtons);
    triggers.forEach((trigger) => {
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  };

  const createCartMarkup = () => {
    if (document.querySelector(selectors.cartPanel)) {
      return;
    }

    const overlay = document.createElement("div");
    overlay.className = "cart-overlay";
    overlay.setAttribute("data-cart-overlay", "");

    const panel = document.createElement("aside");
    panel.className = "cart-panel";
    panel.setAttribute("data-cart-panel", "");
    panel.setAttribute("aria-hidden", "true");
    panel.setAttribute("aria-labelledby", "cart-panel-title");

    panel.innerHTML = `
      <div class="cart-panel__header">
        <h2 id="cart-panel-title">Mon panier</h2>
        <button type="button" class="cart-panel__close" data-cart-close aria-label="Fermer le panier">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="cart-panel__body" data-cart-body>
        <p class="cart-panel__empty" data-cart-empty>Votre panier est vide.</p>
        <ul class="cart-items" data-cart-items></ul>
      </div>
      <div class="cart-panel__footer">
        <div class="cart-total">
          <span>Total</span>
          <strong data-cart-total>${formatters.currency(0)}</strong>
        </div>
        <a href="/html/contact.html" class="btn btn-primary cart-panel__cta" data-cart-cta>
          Finaliser la commande
        </a>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(panel);
  };

  const renderItems = () => {
    const cartBody = document.querySelector("[data-cart-items]");
    const emptyMessage = document.querySelector(selectors.cartEmpty);

    if (!cartBody) {
      return;
    }

    cartBody.innerHTML = state.items
      .map(
        (item) => `
        <li class="cart-item" data-id="${item.id}">
          <div class="cart-item__info">
            <h3>${item.name}</h3>
            <p>
              <span>${item.formattedPrice}</span>
              <span class="cart-item__quantity">× ${item.quantity}</span>
            </p>
          </div>
          <button
            type="button"
            class="cart-item__remove"
            data-remove-item="${item.id}"
            aria-label="Retirer ${item.name} du panier"
          >
            Retirer
          </button>
        </li>
      `
      )
      .join("");

    const totalTarget = document.querySelector(selectors.cartTotal);
    if (totalTarget) {
      totalTarget.textContent = formatters.currency(getTotalPrice());
    }

    const cta = document.querySelector("[data-cart-cta]");
    const hasItems = state.items.length > 0;
    if (cta) {
      cta.classList.toggle("is-disabled", !hasItems);
      cta.setAttribute("aria-disabled", String(!hasItems));
      cta.tabIndex = hasItems ? 0 : -1;
    }

    if (emptyMessage) {
      emptyMessage.hidden = hasItems;
    }
  };

  const updateCountBadge = () => {
    const countTargets = document.querySelectorAll(selectors.cartCount);
    const total = getItemCount();

    countTargets.forEach((target) => {
      target.textContent = String(total);
      target.classList.toggle("is-visible", total > 0);
    });
  };

  const persistAndRender = () => {
    writeStorage();
    updateCountBadge();
    renderItems();
  };

  const addToCart = (product) => {
    const existingIndex = findItemIndex(product.id);

    if (existingIndex > -1) {
      state.items[existingIndex].quantity += 1;
    } else {
      state.items.push({
        ...product,
        quantity: 1,
      });
    }

    persistAndRender();
    openCart();
  };

  const removeFromCart = (id) => {
    const index = findItemIndex(id);
    if (index === -1) {
      return;
    }

    state.items.splice(index, 1);
    persistAndRender();
  };

  const clearCart = () => {
    state.items = [];
    persistAndRender();
  };

  const openCart = () => {
    const panel = document.querySelector(selectors.cartPanel);
    const overlay = document.querySelector(selectors.overlay);

    if (!panel || !overlay) {
      return;
    }

    panel.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
    setToggleState(true);

    requestAnimationFrame(() => {
      panel.classList.add("is-visible");
      overlay.classList.add("is-visible");
    });
  };

  const closeCart = () => {
    const panel = document.querySelector(selectors.cartPanel);
    const overlay = document.querySelector(selectors.overlay);

    if (!panel || !overlay) {
      return;
    }

    panel.setAttribute("aria-hidden", "true");
    panel.classList.remove("is-visible");
    overlay.classList.remove("is-visible");
    setToggleState(false);

    const handleTransitionEnd = () => {
      document.body.classList.remove("cart-open");
      panel.removeEventListener("transitionend", handleTransitionEnd);
    };

    panel.addEventListener("transitionend", handleTransitionEnd, {
      once: true,
    });
  };

  const handleToggleClick = (event) => {
    event.preventDefault();
    const panel = document.querySelector(selectors.cartPanel);
    if (panel && panel.classList.contains("is-visible")) {
      closeCart();
    } else {
      openCart();
    }
  };

  const handleDocumentClick = (event) => {
    const addTrigger = event.target.closest(selectors.addToCart);
    if (addTrigger) {
      event.preventDefault();
      const product = getProductFromElement(addTrigger);
      if (product) {
        addToCart(product);
      }
      return;
    }

    const removeTrigger = event.target.closest(selectors.removeButton);
    if (removeTrigger) {
      event.preventDefault();
      const { removeItem } = removeTrigger.dataset;
      if (removeItem) {
        removeFromCart(removeItem);
      }
    }
  };

  const bindOverlayEvents = () => {
    const overlay = document.querySelector(selectors.overlay);
    const panel = document.querySelector(selectors.cartPanel);
    if (!overlay || !panel) {
      return;
    }

    overlay.addEventListener("click", closeCart);

    panel.addEventListener("click", (event) => {
      if (event.target.closest("[data-cart-close]")) {
        event.preventDefault();
        closeCart();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && panel.classList.contains("is-visible")) {
        closeCart();
      }
    });
  };

  const bindToggleButtons = (root = document) => {
    const triggers = root.querySelectorAll(selectors.toggleButtons);
    triggers.forEach((trigger) => {
      if (!trigger.hasAttribute("aria-expanded")) {
        trigger.setAttribute("aria-expanded", "false");
      }
      trigger.addEventListener("click", handleToggleClick);
    });
  };

  const hydrate = () => {
    state.items = readStorage();
    persistAndRender();
  };

  document.addEventListener("header:loaded", (event) => {
    const headerRoot =
      event.detail instanceof HTMLElement ? event.detail : document;
    bindToggleButtons(headerRoot);
    updateCountBadge();
  });

  document.addEventListener("DOMContentLoaded", () => {
    createCartMarkup();
    hydrate();
    bindOverlayEvents();
    bindToggleButtons();
    setToggleState(false);
    document.addEventListener("click", handleDocumentClick);
  });

  window.addEventListener("cart:updated", () => {
    state.items = readStorage();
    updateCountBadge();
    renderItems();
  });

  // Expose helpers for debugging when needed.
  window.__cart = {
    clear: clearCart,
    state,
  };
})();
