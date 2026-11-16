// Shared disclosure behavior for the editorial prototypes.
(() => {
  const navigation = document.querySelector("header.nav");
  const toggle = navigation?.querySelector(".menu-button, .menu-btn, .burger");
  const panel = navigation?.querySelector(".navlinks");
  if (!toggle || !panel) return;

  panel.id = "site-navigation";
  toggle.setAttribute("aria-controls", panel.id);
  const setOpen = (open, restoreFocus = false) => {
    navigation.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Explore";
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    if (restoreFocus) toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  panel.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false, true);
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    ) {
      event.preventDefault();
      setOpen(false, true);
    }
  });
  document.addEventListener("pointerdown", (event) => {
    if (!navigation.contains(event.target)) setOpen(false);
  });
  navigation.addEventListener("focusout", (event) => {
    if (!navigation.contains(event.relatedTarget)) setOpen(false);
  });
})();
