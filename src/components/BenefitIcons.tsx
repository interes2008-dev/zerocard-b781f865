import { ReactNode } from "react";

/*
  Premium benefit icons for the ZeroCard homepage.
  Bespoke line-icons drawn on a 24x24 grid, stroked with a shared
  molten orange -> gold gradient, and mounted in a glass "chip" with a
  gradient ring, inner glow and a specular sheen that sweeps on hover.
*/

export type BenefitIconName =
  | "cashback"
  | "growth"
  | "tap"
  | "travel"
  | "shield"
  | "instant"
  | "free";

// Shared gradient + soft glow, rendered once near the top of the section.
export function IconDefs() {
  return (
    <svg width="0" height="0" aria-hidden focusable="false" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="zc-icon-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff8a3d" />
          <stop offset="0.5" stopColor="#ff5a2a" />
          <stop offset="1" stopColor="#ffc061" />
        </linearGradient>
        <linearGradient id="zc-icon-grad-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fb8a8a" />
          <stop offset="0.55" stopColor="#f2564f" />
          <stop offset="1" stopColor="#b0242b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const PATHS: Record<BenefitIconName, ReactNode> = {
  // Coin returning: money back / cashback
  cashback: (
    <>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 4.6V9h-4.4" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  // Upward trend with arrowhead: yield on balance
  growth: (
    <>
      <path d="M3 16.5l5-5 3.2 3.2L21 6.5" />
      <path d="M15.6 6.5H21V12" />
    </>
  ),
  // Phone + contactless waves: Apple Pay / Google Pay tap
  tap: (
    <>
      <rect x="3.5" y="3" width="8.5" height="18" rx="2.2" />
      <path d="M3.5 17.3H12" />
      <path d="M15.8 9a5.4 5.4 0 0 1 0 6" />
      <path d="M18.6 6.6a9 9 0 0 1 0 10.8" />
    </>
  ),
  // Paper plane: travel cashback on Trip.com
  travel: (
    <>
      <path d="M21.5 2.5 11 13" />
      <path d="M21.5 2.5 14.8 21.5 11 13 2.5 9.2 21.5 2.5Z" />
    </>
  ),
  // Shield + check: bank-grade protection
  shield: (
    <>
      <path d="M12 2.5 5 5.2v6.1c0 4.6 3 7.9 7 9.2 4-1.3 7-4.6 7-9.2V5.2L12 2.5Z" />
      <path d="M9 11.8l2.1 2.1 4-4.2" />
    </>
  ),
  // Lightning bolt: instant top-up
  instant: (
    <>
      <path d="M13.5 2.5 4 14h6.5l-1 7.5L20 10h-6.5l1-7.5Z" />
    </>
  ),
  // Price tag: zero fees
  free: (
    <>
      <path d="M20.6 13.4 13.4 20.6a1.9 1.9 0 0 1-2.7 0l-6.9-6.9A1.9 1.9 0 0 1 3.3 12.4V5.2a1.9 1.9 0 0 1 1.9-1.9h7.2c.5 0 1 .2 1.3.6l6.9 6.9a1.9 1.9 0 0 1 0 2.6Z" />
      <circle cx="8" cy="8" r="1.4" />
    </>
  ),
};

export function BenefitIcon({
  name,
  featured = false,
}: {
  name: BenefitIconName;
  featured?: boolean;
}) {
  return (
    <span className={`bicon${featured ? " bicon--featured" : ""}`} aria-hidden>
      <span className="bicon-sheen" />
      <svg
        viewBox="0 0 24 24"
        width={featured ? 30 : 27}
        height={featured ? 30 : 27}
        fill="none"
        stroke="url(#zc-icon-grad)"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {PATHS[name]}
      </svg>
    </span>
  );
}

/* ─────────────────────────────────────────────────────
   STEP ICONS — bespoke glyph per onboarding step, gold gradient,
   mounted in the same premium chip as the benefit icons.
   ───────────────────────────────────────────────────── */
export type StepIconName = "register" | "verify" | "apply" | "topup" | "spend";

const STEP_PATHS: Record<StepIconName, ReactNode> = {
  register: (
    <>
      <circle cx="10" cy="8" r="3.4" />
      <path d="M4 20c0-3.4 2.7-5.6 6-5.6 1.2 0 2.3.3 3.2.8" />
      <path d="M18.6 14.6v5M16.1 17.1h5" />
    </>
  ),
  verify: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="2.2" />
      <path d="M8 8h8M8 11.4h8" />
      <path d="M8 15.6l2 2 4-4.2" />
    </>
  ),
  apply: (
    <>
      <rect x="3" y="6" width="14" height="11" rx="2" />
      <path d="M3 9.6h14M6 13.5h3.6" />
      <path d="M19 5v5M16.5 7.5h5" />
    </>
  ),
  topup: (
    <>
      <rect x="3" y="8.6" width="18" height="11" rx="2.2" />
      <path d="M3 12.6h18" />
      <path d="M12 2.4v6M9.3 5.7 12 8.4l2.7-2.7" />
    </>
  ),
  spend: (
    <>
      <rect x="2.6" y="6" width="14.5" height="11" rx="2" />
      <path d="M2.6 9.6h14.5M6 13.6h3.4" />
      <path d="M20 3.8l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2L17 6.9l2.2-.9z" />
    </>
  ),
};

export function StepIcon({ name }: { name: StepIconName }) {
  return (
    <span className="bicon bicon--step" aria-hidden>
      <span className="bicon-sheen" />
      <svg
        viewBox="0 0 24 24"
        width={26}
        height={26}
        fill="none"
        stroke="url(#zc-icon-grad)"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {STEP_PATHS[name]}
      </svg>
    </span>
  );
}

/* ─────────────────────────────────────────────────────
   PAIN ICONS — inline gradient line-icons. Problems use the red
   gradient, solutions reuse the gold one (before / after contrast).
   ───────────────────────────────────────────────────── */
export type PainIconName =
  | "locked" | "drain" | "wait" | "declining" | "geoblock"     // problems
  | "instant" | "offset" | "ready" | "yield" | "global";       // solutions

const PAIN_PATHS: Record<PainIconName, ReactNode> = {
  locked: (
    <>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <path d="M12 14.2v2.6" />
    </>
  ),
  drain: (
    <>
      <circle cx="9.5" cy="9.5" r="5.5" />
      <path d="M18 13.5v5.6" />
      <path d="M15.7 16.9 18 19.2l2.3-2.3" />
    </>
  ),
  wait: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.4V12l3 2" />
    </>
  ),
  declining: (
    <>
      <path d="M3 7.5l5 5 3.2-3.2L21 17.5" />
      <path d="M15.6 17.5H21V12" />
    </>
  ),
  geoblock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.4 2.6 14.6 0 17M12 3.5c-2.6 2.4-2.6 14.6 0 17" />
      <path d="M6 6l12 12" />
    </>
  ),
  instant: (
    <>
      <path d="M13.5 2.5 4 14h6.5l-1 7.5L20 10h-6.5l1-7.5Z" />
    </>
  ),
  offset: (
    <>
      <path d="M4 8.5h13M13 4.5l4 4-4 4" />
      <path d="M20 15.5H7M11 11.5l-4 4 4 4" />
    </>
  ),
  ready: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.2 12.2l2.6 2.6 5-5.4" />
    </>
  ),
  yield: (
    <>
      <path d="M3 16.5l5-5 3.2 3.2L21 6.5" />
      <path d="M15.6 6.5H21V12" />
    </>
  ),
  global: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.4 2.6 14.6 0 17M12 3.5c-2.6 2.4-2.6 14.6 0 17" />
    </>
  ),
};

export function PainIcon({
  name,
  variant,
}: {
  name: PainIconName;
  variant: "bad" | "good";
}) {
  return (
    <span className={`painicon painicon--${variant}`} aria-hidden>
      <svg
        viewBox="0 0 24 24"
        width={22}
        height={22}
        fill="none"
        stroke={variant === "bad" ? "url(#zc-icon-grad-red)" : "url(#zc-icon-grad)"}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {PAIN_PATHS[name]}
      </svg>
    </span>
  );
}

/* ─────────────────────────────────────────────────────
   WALLET ICONS — generic payment glyphs for the wallet cards
   (no brand logos). Mounted in a compact premium chip.
   ───────────────────────────────────────────────────── */
export type WalletIconName =
  | "phoneTap" | "cardAdd" | "devices" | "nfcCard"
  | "checklist" | "tapHand" | "online" | "shopping" | "wallets";

const WALLET_PATHS: Record<WalletIconName, ReactNode> = {
  // phone with contactless waves — tap to pay
  phoneTap: (
    <>
      <rect x="4" y="3" width="8.5" height="18" rx="2.2" />
      <path d="M4 17.3h8.5" />
      <path d="M16 9a5.4 5.4 0 0 1 0 6" />
      <path d="M18.7 6.6a9 9 0 0 1 0 10.8" />
    </>
  ),
  // card + plus — add a card manually
  cardAdd: (
    <>
      <rect x="2.5" y="6" width="15" height="11" rx="2" />
      <path d="M2.5 9.6h15M6 13.6h3.6" />
      <path d="M19.5 5.5v5M17 8h5" />
    </>
  ),
  // phone + watch — compatible devices
  devices: (
    <>
      <rect x="3" y="4" width="9" height="16" rx="2" />
      <path d="M3 16.5h9" />
      <rect x="15" y="8.5" width="6.5" height="7" rx="1.6" />
      <path d="M16.9 8.5l.3-2h2.6l.3 2M16.9 15.5l.3 2h2.6l.3-2" />
    </>
  ),
  // card + contactless waves — tap-to-pay card
  nfcCard: (
    <>
      <rect x="2.5" y="6.5" width="13" height="11" rx="2" />
      <path d="M2.5 10h13" />
      <path d="M18 9a5 5 0 0 1 0 6" />
      <path d="M20.5 6.8a8.4 8.4 0 0 1 0 10.4" />
    </>
  ),
  // clipboard + check — requirements
  checklist: (
    <>
      <rect x="4.5" y="4" width="15" height="17" rx="2.2" />
      <path d="M9 4V3.2A1.2 1.2 0 0 1 10.2 2h3.6A1.2 1.2 0 0 1 15 3.2V4" />
      <path d="M8 11l2 2 4-4" />
      <path d="M8 16.5h8" />
    </>
  ),
  // pointing hand — how to pay (tap)
  tapHand: (
    <>
      <path d="M8 11.5V6a1.7 1.7 0 0 1 3.4 0v5" />
      <path d="M11.4 9.5a1.6 1.6 0 0 1 3.2 0v1.5" />
      <path d="M14.6 10a1.6 1.6 0 0 1 3.2 0v4.2a5.5 5.5 0 0 1-5.5 5.5c-1.7 0-2.8-.5-3.9-1.6l-3.6-3.7a1.7 1.7 0 0 1 2.4-2.4L8 15.2" />
    </>
  ),
  // browser window + card — online payment
  online: (
    <>
      <rect x="2.5" y="4" width="19" height="15" rx="2.2" />
      <path d="M2.5 8h19" />
      <path d="M5.4 6h0M7.6 6h0" />
      <rect x="7" y="11" width="10" height="5" rx="1" />
    </>
  ),
  // shopping bag — where to use
  shopping: (
    <>
      <path d="M5.5 8h13l-1 12.4a1.5 1.5 0 0 1-1.5 1.4H8a1.5 1.5 0 0 1-1.5-1.4L5.5 8z" />
      <path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" />
    </>
  ),
  // stacked cards — other wallets
  wallets: (
    <>
      <rect x="3" y="7.5" width="14" height="10" rx="2" />
      <path d="M3 11h14" />
      <path d="M7 4.5h11.5A1.5 1.5 0 0 1 20 6v9" />
    </>
  ),
};

export function WalletIcon({ name }: { name: WalletIconName }) {
  return (
    <span className="bicon bicon--wallet" aria-hidden>
      <span className="bicon-sheen" />
      <svg
        viewBox="0 0 24 24"
        width={24}
        height={24}
        fill="none"
        stroke="url(#zc-icon-grad)"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {WALLET_PATHS[name]}
      </svg>
    </span>
  );
}

/* ─────────────────────────────────────────────────────
   REFERRAL ICONS — use currentColor so they can sit on the
   accent band (rendered white inside translucent chips).
   ───────────────────────────────────────────────────── */
export type ReferralIconName = "link" | "friends" | "percent";

const REFERRAL_PATHS: Record<ReferralIconName, ReactNode> = {
  link: (
    <>
      <path d="M9.6 14.4l4.8-4.8" />
      <path d="M8.2 11.2 6 13.4a3.5 3.5 0 0 0 5 5l2.2-2.2" />
      <path d="M15.8 12.8 18 10.6a3.5 3.5 0 0 0-5-5l-2.2 2.2" />
    </>
  ),
  friends: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c0-3.2 2.5-5.3 5.5-5.3s5.5 2.1 5.5 5.3" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6" />
      <path d="M17.6 14c2.2.5 3.7 2.4 3.7 5" />
    </>
  ),
  percent: (
    <>
      <circle cx="7.6" cy="7.6" r="2.6" />
      <circle cx="16.4" cy="16.4" r="2.6" />
      <path d="M18.5 5.5 5.5 18.5" />
    </>
  ),
};

export function ReferralIcon({ name }: { name: ReferralIconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {REFERRAL_PATHS[name]}
    </svg>
  );
}
