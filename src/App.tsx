import { useState, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useLocation } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import { AppRoutes } from "./routes";

const queryClient = new QueryClient();

// Toast portals render into #root, so keep them off the server render and the
// first client render to avoid a hydration mismatch; they mount right after.
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children}</> : null;
}

// Yandex.Metrika counter id (script lives in index.html).
const YM_ID = 110833760;

// Blog navigation happens client side, so those views never reach Metrika
// on their own. Send an explicit hit whenever the route changes. The very
// first view is already counted by the counter init, so it is skipped here.
function MetrikaTracker() {
  const location = useLocation();
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const ym = (window as unknown as { ym?: (...args: unknown[]) => void }).ym;
    if (typeof ym === "function") {
      ym(YM_ID, "hit", window.location.href, { referer: document.referrer });
    }
  }, [location.pathname, location.search]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <ClientOnly>
          <Toaster />
          <Sonner />
        </ClientOnly>
        <BrowserRouter>
          <MetrikaTracker />
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
