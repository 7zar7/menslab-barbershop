/**
 * Central site configuration.
 *
 * ─────────────────────────────────────────────────────────────
 * TODO(client): replace every value tagged PLACEHOLDER before launch.
 * Booking, footer links, and OG/meta tags all read from this file —
 * change it here once and it propagates everywhere.
 * ─────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  /** Agency name — placeholder codename. Rename in this one place. */
  name: "Isomorph",

  /** PLACEHOLDER — production domain (no protocol), used for canonical/OG. */
  domain: "isomorph.studio",

  tagline: "Strategy-first web studio for tech founders.",
  description:
    "We combine M&A-level strategic thinking with 2–5 day execution. For founders who can't afford to look like they're still figuring it out.",

  /**
   * PLACEHOLDER — Calendly scheduling URL.
   * Until set to a real https://calendly.com/... URL, the booking
   * component renders a styled fallback instead of the embed.
   */
  calendlyUrl: "",

  /** PLACEHOLDER — public contact email. */
  email: "hello@isomorph.studio",

  /** PLACEHOLDER — agency LinkedIn URL. */
  linkedinUrl: "",

  /** PLACEHOLDER — GA4 Measurement ID (e.g. G-XXXXXXXXXX). Empty disables GA. */
  ga4Id: "",

  established: "2024",
} as const;

/** True when a real Calendly URL has been provided. */
export const hasCalendly = (): boolean =>
  /^https:\/\/calendly\.com\//.test(siteConfig.calendlyUrl);

export type SiteConfig = typeof siteConfig;
