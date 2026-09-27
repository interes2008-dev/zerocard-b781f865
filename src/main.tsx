import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { preloadRoute } from "./routes";
import "./index.css";

const container = document.getElementById("root")!;
const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Prerendered pages ship with server-rendered markup -> hydrate.
// Dev / non-prerendered pages have an empty root -> client render.
if (container.hasChildNodes()) {
  preloadRoute(window.location.pathname)
    .catch(() => {})
    .then(() => hydrateRoot(container, app));
} else {
  createRoot(container).render(app);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
