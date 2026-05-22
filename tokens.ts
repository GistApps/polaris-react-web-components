/**
 * tokens.ts
 *
 * Translates Polaris React numeric space/color tokens into Shopify App Home
 * spacing keyword tokens consumed by s-stack, s-box, s-grid, etc.
 *
 * Polaris React space scale (px):
 *   025=1  050=2  100=4  150=6  200=8  300=12  400=16
 *   500=20  600=24  800=32  1000=40  1200=48
 *
 * App Home spacing keyword scale (approximate px):
 *   none(0)  small-500(2)  small-400(4)  small-300(6)  small-200(8)
 *   small-100(10)  small(12)  base(16)  large(20)  large-100(24)
 *   large-200(28)  large-300(32)  large-400(40)  large-500(48)
 */

const SPACE_MAP: Record<string, string> = {
  "0":    "none",
  "none": "none",
  "025":  "small-500",
  "050":  "small-400",
  "100":  "small-300",
  "150":  "small-200",
  "200":  "small-100",
  "300":  "small",
  "400":  "base",
  "500":  "large",
  "600":  "large-100",
  "800":  "large-300",
  "1000": "large-400",
  "1200": "large-500",
};

/**
 * Map a Polaris React space token (e.g. "400") to an App Home keyword ("base").
 * If the value is already a keyword (e.g. "base", "large-100") it passes through.
 */
export function sp(token?: string): string | undefined {
  if (!token) return undefined;
  return SPACE_MAP[token] ?? token;
}

/**
 * Polaris React background token → App Home background keyword.
 */
const BG_MAP: Record<string, string> = {
  "bg-surface":           "",          // default (transparent)
  "bg-surface-secondary": "subdued",
  "bg-fill-secondary":    "subdued",
  "bg-surface-active":    "selected",
  "bg-fill-selected":     "selected",
};

export function bg(token?: string): string | undefined {
  if (!token) return undefined;
  return BG_MAP[token] ?? token;
}

/**
 * Polaris React border-radius token → App Home border-radius keyword.
 */
const RADIUS_MAP: Record<string, string> = {
  "0":   "none",
  "050": "small-100",
  "100": "small",
  "200": "base",
  "300": "large-100",
  "400": "large-200",
  "500": "large-300",
  "full": "full",
};

export function radius(token?: string): string | undefined {
  if (!token) return undefined;
  return RADIUS_MAP[token] ?? token;
}

/**
 * Polaris React border-color token → App Home color keyword.
 */
const BORDER_COLOR_MAP: Record<string, string> = {
  "border":          "base",
  "border-subdued":  "subdued",
  "border-critical": "critical",
  "border-caution":  "caution",
  "border-success":  "success",
  "border-info":     "info",
};

export function borderColor(token?: string): string | undefined {
  if (!token) return undefined;
  return BORDER_COLOR_MAP[token] ?? token;
}

/**
 * Polaris React Badge tone → App Home Badge tone.
 * The web component uses "caution" where React used "attention"/"warning".
 */
const BADGE_TONE_MAP: Record<string, string> = {
  attention: "caution",
  warning:   "caution",
  new:       "info",
  neutral:   "auto",
};

export function badgeTone(tone?: string): string | undefined {
  if (!tone) return undefined;
  return BADGE_TONE_MAP[tone] ?? tone;
}
