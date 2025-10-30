(() => {
  const STORAGE_KEY = "cart:items";

  const selectors = {
    root: "[data-cart-page]",
    empty: "[data-cart-page-empty]",
    items: "[data-cart-page-items]",
    total: "[data-cart-page-total]",
    checkout: "[data-cart-page-checkout]",
    clear: "[data-cart-page-clear]",
  };

  const readCartItems = () => {
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
          formattedPrice: String(item.formattedPrice || ""),
          quantity: Number(item.quantity) || 1,
        }))
        .filter((item) => item.id && item.name && !Number.isNaN(item.price));
    } catch (error) {
      return [];
    }
  };

  const formatPrice = (value) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(value);

  const calculateTotal = (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const persistItems = (items) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      if (window.__cart) {
        window.__cart.state.items = items;
        window.dispatchEvent(new CustomEvent("cart:updated"));
      }
    } catch (error) {
      // Ignore quota errors.
    }
  };

  const render = () => {
    const root = document.querySelector(selectors.root);
    if (!root) {
      return;
    }

    const empty = root.querySelector(selectors.empty);
    const list = root.querySelector(selectors.items);
    const totalTarget = root.querySelector(selectors.total);

    const items = readCartItems();
    const hasItems = items.length > 0;

    if (empty) {
      empty.hidden = hasItems;
    }

    if (list) {
      list.innerHTML = items
        .map(
          (item) => `
          <li class="cart-summary__item" data-id="${item.id}">
            <div class="cart-summary__info">
              <h3>${item.name}</h3>
              <p>
                <span>${item.formattedPrice || formatPrice(item.price)}</span>
                <span class="cart-summary__quantity">× ${item.quantity}</span>
              </p>
            </div>
            <div class="cart-summary__controls">
              <button type="button" class="cart-summary__btn" data-action="decrease" data-id="${item.id}" aria-label="Retirer une unité de ${item.name}">-</button>
              <button type="button" class="cart-summary__btn" data-action="increase" data-id="${item.id}" aria-label="Ajouter une unité de ${item.name}">+</button>
              <button type="button" class="cart-summary__remove" data-action="remove" data-id="${item.id}" aria-label="Supprimer ${item.name} du panier">Retirer</button>
            </div>
          </li>
        `
        )
        .join("");
    }

    if (totalTarget) {
      totalTarget.textContent = formatPrice(calculateTotal(items));
    }

    const checkout = root.querySelector(selectors.checkout);
    if (checkout) {
      checkout.classList.toggle("is-disabled", !hasItems);
      checkout.setAttribute("aria-disabled", String(!hasItems));
      checkout.tabIndex = hasItems ? 0 : -1;
    }

    const clear = root.querySelector(selectors.clear);
    if (clear) {
      clear.disabled = !hasItems;
    }
  };

  const updateItem = (id, delta) => {
    const items = readCartItems();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }
    const nextQuantity = items[index].quantity + delta;
    if (nextQuantity <= 0) {
      items.splice(index, 1);
    } else {
      items[index].quantity = nextQuantity;
    }
    persistItems(items);
    render();
  };

  const removeItem = (id) => {
    const items = readCartItems().filter((item) => item.id !== id);
    persistItems(items);
    render();
  };

  const clearCart = () => {
    persistItems([]);
    render();
  };

  const handleClick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const actionTrigger = target.closest("[data-action]");
    if (actionTrigger) {
      const { action, id } = actionTrigger.dataset;
      if (!id) {
        return;
      }
      if (action === "increase") {
        updateItem(id, 1);
      } else if (action === "decrease") {
        updateItem(id, -1);
      } else if (action === "remove") {
        removeItem(id);
      }
    }

    if (target.matches(selectors.clear)) {
      event.preventDefault();
      clearCart();
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    render();

    const root = document.querySelector(selectors.root);
    if (!root) {
      return;
    }

    root.addEventListener("click", handleClick);
    window.addEventListener("cart:updated", render);
  });
})();
