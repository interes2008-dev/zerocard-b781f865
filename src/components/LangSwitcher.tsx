import { useState, useEffect, useRef } from "react";
import { useI18n, LANGS, langHref, pathWithoutLang, type Lang } from "@/lib/i18n";

/* Shared language switcher: globe + language code button with a rich dropdown.
   Used by the homepage navbar and the blog header so both behave identically. */
export function LangSwitcher({ compact }: { compact?: boolean }) {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const current = LANGS.find(l => l.id === lang) ?? LANGS[0];

  const switchTo = (id: Lang) => {
    if (typeof window !== "undefined") {
      // Remember the choice for a year so language auto-select never overrides it.
      document.cookie = `zc_lang=${id}; path=/; max-age=31536000; SameSite=Lax`;
      window.location.href = langHref(id, pathWithoutLang(window.location.pathname));
    }
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  // Move focus into the menu so arrow keys work right after opening.
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLButtonElement>(".lang-item.active, .lang-item")?.focus();
  }, [open]);

  const onMenuKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>(".lang-item") ?? []);
    if (!items.length) return;
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    let next = i;
    if (e.key === "ArrowDown") next = (i + 1) % items.length;
    else if (e.key === "ArrowUp") next = (i - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    items[next]?.focus();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`lang-btn ${compact ? "lang-btn--compact" : ""} ${open ? "is-open" : ""}`}
        aria-label="Choose language" aria-haspopup="listbox" aria-expanded={open}
      >
        <svg className="lang-globe" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3.5 9h17M3.5 15h17" />
          <path d="M12 3c2.4 2.6 2.4 15.4 0 18M12 3c-2.4 2.6-2.4 15.4 0 18" />
        </svg>
        <span className="lang-code">{current.id.toUpperCase()}</span>
        <svg className="lang-caret" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="lang-menu" role="listbox" ref={menuRef} onKeyDown={onMenuKey}>
          <div className="lang-menu__head">{current.id === "ru" ? "Язык сайта" : "Language"}</div>
          {LANGS.map(l => (
            <button key={l.id} role="option" aria-selected={l.id === lang}
              onClick={() => { switchTo(l.id); setOpen(false); }}
              className={`lang-item ${l.id === lang ? "active" : ""}`}>
              <span className="lang-item__flag">{l.flag}</span>
              <span className="lang-item__label">{l.label}</span>
              <span className="lang-item__code">{l.id.toUpperCase()}</span>
              {l.id === lang && (
                <svg className="lang-item__check" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m5 12.5 4.5 4.5L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
