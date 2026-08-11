// ==UserScript==
// @name         TheRARBG Modern Results Theme
// @namespace    local.therarbg.theme
// @version      0.1.4
// @description  A cleaner, page-aware dark theme for TheRARBG.
// @author       Citizen
// @match        https://therarbg.com/*
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==

(function () {
  'use strict';

  const ROOT_CLASS = 'tm-rarbg-theme';
  const SHOW_EXTRAS_CLASS = 'tm-rarbg-show-extras';
  const CATEGORY_PAGE_CLASS = 'tm-rarbg-category-page';
  const EXTRAS_STORAGE_KEY = 'tmRarbgShowExtras';
  const PALETTE_STORAGE_KEY = 'tmRarbgPalette';
  const DEFAULT_PALETTE = 'midnight';
  const PALETTE_OPTIONS = [
    ['midnight', 'Midnight'],
    ['black', 'Black'],
    ['slate', 'Slate'],
    ['blue', 'Blue'],
    ['teal', 'Teal'],
    ['emerald', 'Emerald'],
    ['olive', 'Olive'],
    ['amber', 'Amber'],
    ['crimson', 'Crimson'],
    ['magenta', 'Magenta'],
    ['purple', 'Purple'],
    ['espresso', 'Espresso'],
  ];
  const PALETTES = new Set(PALETTE_OPTIONS.map(([value]) => value));

  const root = document.documentElement;
  const normalisedPath = location.pathname.replace(/\/+$/, '') || '/';
  const isHomePage = normalisedPath === '/';
  const isResultsPage =
    normalisedPath === '/get-posts' || normalisedPath.startsWith('/get-posts/');
  const isCatalogPage = normalisedPath === '/catalog';
  const isToolbarPage = isHomePage || isResultsPage;

  root.classList.add(ROOT_CLASS);

  function normalisePalette(value) {
    return PALETTES.has(value) ? value : DEFAULT_PALETTE;
  }

  function readPalette() {
    try {
      return normalisePalette(localStorage.getItem(PALETTE_STORAGE_KEY));
    } catch {
      return DEFAULT_PALETTE;
    }
  }

  function applyPalette(value, persist = false) {
    const palette = normalisePalette(value);
    root.dataset.tmRarbgPalette = palette;

    if (persist) {
      try {
        localStorage.setItem(PALETTE_STORAGE_KEY, palette);
      } catch {
        // The selected palette still applies for this page when storage is unavailable.
      }
    }

    return palette;
  }

  const initialPalette = applyPalette(readPalette());

  try {
    root.classList.toggle(
      SHOW_EXTRAS_CLASS,
      localStorage.getItem(EXTRAS_STORAGE_KEY) === 'true',
    );
  } catch {
    // Storage can be unavailable in restrictive browsing modes. The theme
    // still works; the extras preference simply will not persist.
  }

  const styles = `
    :root {
      color-scheme: dark;
      --tm-bg: #070b14;
      --tm-panel: #101827;
      --tm-panel-raised: #151f32;
      --tm-panel-soft: #19253a;
      --tm-panel-glass: rgba(16, 24, 39, 0.9);
      --tm-panel-glass-strong: rgba(16, 24, 39, 0.94);
      --tm-input: #0b1220;
      --tm-control: #1c2a43;
      --tm-control-hover: #1b2941;
      --tm-filter: #111b2c;
      --tm-filter-hover: #18253a;
      --tm-table: #0c1422;
      --tm-table-head: #1b2b48;
      --tm-row: #0e1726;
      --tm-row-alt: #111c2d;
      --tm-row-hover: #182742;
      --tm-border: #293852;
      --tm-border-strong: #3b4e70;
      --tm-cell-border: rgba(41, 56, 82, 0.48);
      --tm-cell-border-strong: rgba(41, 56, 82, 0.62);
      --tm-text: #e8eef8;
      --tm-text-soft: #c4cee0;
      --tm-text-subtle: #cbd5e7;
      --tm-text-link: #b8ccff;
      --tm-text-link-hover: #e0e8ff;
      --tm-text-on-accent: #fff;
      --tm-muted: #95a4ba;
      --tm-placeholder: #7888a1;
      --tm-accent: #648dff;
      --tm-accent-strong: #3f6fe8;
      --tm-accent-soft: rgba(100, 141, 255, 0.14);
      --tm-accent-border: rgba(100, 141, 255, 0.7);
      --tm-accent-border-soft: rgba(100, 141, 255, 0.32);
      --tm-focus: #9bb6ff;
      --tm-scrollbar: #405274;
      --tm-selection: rgba(100, 141, 255, 0.55);
      --tm-overlay: rgba(9, 15, 27, 0.55);
      --tm-page-background:
        radial-gradient(circle at 18% 0%, rgba(69, 103, 181, 0.24), transparent 36%),
        radial-gradient(circle at 88% 12%, rgba(89, 63, 155, 0.16), transparent 32%),
        linear-gradient(180deg, #0b1120 0%, var(--tm-bg) 48%, #05080e 100%);
      --tm-toolbar-background:
        linear-gradient(110deg, rgba(55, 89, 170, 0.26), var(--tm-panel-glass-strong) 54%),
        var(--tm-panel-raised);
      --tm-primary-background: linear-gradient(135deg, #315fc9, var(--tm-accent-strong));
      --tm-primary-background-hover: linear-gradient(135deg, #3d6bd5, #456bc6);
      --tm-logo-shadow: drop-shadow(0 5px 14px rgba(74, 112, 214, 0.35));
      --tm-success: #69d39b;
      --tm-warning: #f3c969;
      --tm-danger: #ff7c8b;
      --tm-shadow: 0 18px 55px rgba(0, 0, 0, 0.38);
    }

    html.${ROOT_CLASS}[data-tm-rarbg-palette="black"] {
      --tm-bg: #000204;
      --tm-panel: #0a0d12;
      --tm-panel-raised: #11161d;
      --tm-panel-soft: #181f28;
      --tm-panel-glass: rgba(10, 13, 18, 0.9);
      --tm-panel-glass-strong: rgba(10, 13, 18, 0.95);
      --tm-input: #06090d;
      --tm-control: #1a212b;
      --tm-control-hover: #242e3b;
      --tm-filter: #11171f;
      --tm-filter-hover: #1d2733;
      --tm-table: #080c11;
      --tm-table-head: #1a222d;
      --tm-row: #0b1016;
      --tm-row-alt: #10161e;
      --tm-row-hover: #1b2632;
      --tm-border: #29323e;
      --tm-border-strong: #465364;
      --tm-cell-border: rgba(52, 64, 78, 0.48);
      --tm-cell-border-strong: rgba(52, 64, 78, 0.62);
      --tm-text: #eef2f7;
      --tm-text-soft: #cbd3de;
      --tm-text-subtle: #d4dae3;
      --tm-text-link: #bfd0ff;
      --tm-text-link-hover: #e2e9ff;
      --tm-muted: #9ba7b6;
      --tm-placeholder: #758191;
      --tm-accent: #88a8ff;
      --tm-accent-strong: #4264ad;
      --tm-accent-soft: rgba(136, 168, 255, 0.14);
      --tm-accent-border: rgba(136, 168, 255, 0.72);
      --tm-accent-border-soft: rgba(136, 168, 255, 0.3);
      --tm-focus: #aac0ff;
      --tm-scrollbar: #465364;
      --tm-selection: rgba(136, 168, 255, 0.5);
      --tm-overlay: rgba(3, 5, 8, 0.72);
      --tm-page-background:
        radial-gradient(circle at 18% 0%, rgba(72, 86, 108, 0.2), transparent 36%),
        radial-gradient(circle at 88% 12%, rgba(52, 60, 75, 0.15), transparent 32%),
        linear-gradient(180deg, #090c11 0%, var(--tm-bg) 52%, #000 100%);
      --tm-toolbar-background:
        linear-gradient(110deg, rgba(65, 78, 99, 0.28), var(--tm-panel-glass-strong) 58%),
        var(--tm-panel-raised);
      --tm-primary-background: linear-gradient(135deg, #4a68ba, var(--tm-accent-strong));
      --tm-primary-background-hover: linear-gradient(135deg, #4e68b5, #5673c0);
      --tm-logo-shadow: drop-shadow(0 5px 14px rgba(102, 126, 190, 0.3));
    }

    html.${ROOT_CLASS}[data-tm-rarbg-palette="blue"] {
      --tm-bg: #04101e;
      --tm-panel: #0a1a2d;
      --tm-panel-raised: #102640;
      --tm-panel-soft: #183352;
      --tm-panel-glass: rgba(10, 26, 45, 0.9);
      --tm-panel-glass-strong: rgba(10, 26, 45, 0.95);
      --tm-input: #061425;
      --tm-control: #18385d;
      --tm-control-hover: #214a75;
      --tm-filter: #102944;
      --tm-filter-hover: #1a3b60;
      --tm-table: #07182a;
      --tm-table-head: #173b62;
      --tm-row: #0a1b2f;
      --tm-row-alt: #0e233b;
      --tm-row-hover: #173b61;
      --tm-border: #294a6d;
      --tm-border-strong: #3e6d99;
      --tm-cell-border: rgba(41, 74, 109, 0.48);
      --tm-cell-border-strong: rgba(41, 74, 109, 0.62);
      --tm-text: #eaf4ff;
      --tm-text-soft: #c5d8eb;
      --tm-text-subtle: #cfdfef;
      --tm-text-link: #acd2ff;
      --tm-text-link-hover: #e0efff;
      --tm-muted: #9bb0c7;
      --tm-placeholder: #7890aa;
      --tm-accent: #58a6ff;
      --tm-accent-strong: #245f99;
      --tm-accent-soft: rgba(88, 166, 255, 0.14);
      --tm-accent-border: rgba(88, 166, 255, 0.72);
      --tm-accent-border-soft: rgba(88, 166, 255, 0.3);
      --tm-focus: #9dcbff;
      --tm-scrollbar: #3e6d99;
      --tm-selection: rgba(88, 166, 255, 0.5);
      --tm-overlay: rgba(3, 13, 25, 0.68);
      --tm-page-background:
        radial-gradient(circle at 18% 0%, rgba(41, 111, 186, 0.28), transparent 36%),
        radial-gradient(circle at 88% 12%, rgba(32, 83, 142, 0.2), transparent 32%),
        linear-gradient(180deg, #071a2d 0%, var(--tm-bg) 50%, #020a13 100%);
      --tm-toolbar-background:
        linear-gradient(110deg, rgba(38, 99, 164, 0.3), var(--tm-panel-glass-strong) 58%),
        var(--tm-panel-raised);
      --tm-primary-background: linear-gradient(135deg, #2469b8, var(--tm-accent-strong));
      --tm-primary-background-hover: linear-gradient(135deg, #2869a8, #2f73b5);
      --tm-logo-shadow: drop-shadow(0 5px 14px rgba(46, 124, 207, 0.35));
    }

    html.${ROOT_CLASS}[data-tm-rarbg-palette="purple"] {
      --tm-bg: #0b0612;
      --tm-panel: #180f23;
      --tm-panel-raised: #241633;
      --tm-panel-soft: #302040;
      --tm-panel-glass: rgba(24, 15, 35, 0.9);
      --tm-panel-glass-strong: rgba(24, 15, 35, 0.95);
      --tm-input: #10091a;
      --tm-control: #35204b;
      --tm-control-hover: #462961;
      --tm-filter: #251732;
      --tm-filter-hover: #382249;
      --tm-table: #120b1b;
      --tm-table-head: #3a2351;
      --tm-row: #160d20;
      --tm-row-alt: #1d1229;
      --tm-row-hover: #332044;
      --tm-border: #49335d;
      --tm-border-strong: #6c4d84;
      --tm-cell-border: rgba(73, 51, 93, 0.48);
      --tm-cell-border-strong: rgba(73, 51, 93, 0.62);
      --tm-text: #f3ecfa;
      --tm-text-soft: #dacde4;
      --tm-text-subtle: #e0d5e8;
      --tm-text-link: #d8bdff;
      --tm-text-link-hover: #f1e5ff;
      --tm-muted: #b2a0bf;
      --tm-placeholder: #8e789e;
      --tm-accent: #b184ff;
      --tm-accent-strong: #8a59dc;
      --tm-accent-soft: rgba(177, 132, 255, 0.14);
      --tm-accent-border: rgba(177, 132, 255, 0.72);
      --tm-accent-border-soft: rgba(177, 132, 255, 0.3);
      --tm-focus: #d0b1ff;
      --tm-scrollbar: #6c4d84;
      --tm-selection: rgba(177, 132, 255, 0.5);
      --tm-overlay: rgba(12, 5, 19, 0.7);
      --tm-page-background:
        radial-gradient(circle at 18% 0%, rgba(124, 73, 170, 0.28), transparent 36%),
        radial-gradient(circle at 88% 12%, rgba(78, 44, 112, 0.22), transparent 32%),
        linear-gradient(180deg, #180c24 0%, var(--tm-bg) 50%, #050208 100%);
      --tm-toolbar-background:
        linear-gradient(110deg, rgba(112, 66, 151, 0.32), var(--tm-panel-glass-strong) 58%),
        var(--tm-panel-raised);
      --tm-primary-background: linear-gradient(135deg, #7140b3, var(--tm-accent-strong));
      --tm-primary-background-hover: linear-gradient(135deg, #8650c7, #7e4cc0);
      --tm-logo-shadow: drop-shadow(0 5px 14px rgba(139, 87, 191, 0.35));
    }

    html.${ROOT_CLASS}[data-tm-rarbg-palette="slate"] {
      --tm-bg: #0b0f14;
      --tm-panel: #141a21;
      --tm-panel-raised: #1b232c;
      --tm-panel-soft: #242e39;
      --tm-panel-glass: rgba(20, 26, 33, 0.9);
      --tm-panel-glass-strong: rgba(20, 26, 33, 0.95);
      --tm-input: #0d1218;
      --tm-control: #26313d;
      --tm-control-hover: #303e4c;
      --tm-filter: #1a222b;
      --tm-filter-hover: #25313d;
      --tm-table: #10161c;
      --tm-table-head: #2a3744;
      --tm-row: #131a21;
      --tm-row-alt: #182129;
      --tm-row-hover: #263441;
      --tm-border: #354454;
      --tm-border-strong: #526579;
      --tm-cell-border: rgba(53, 68, 84, 0.48);
      --tm-cell-border-strong: rgba(53, 68, 84, 0.62);
      --tm-text: #edf1f5;
      --tm-text-soft: #cbd4dd;
      --tm-text-subtle: #d5dde5;
      --tm-text-link: #b8d3ee;
      --tm-text-link-hover: #e5f2ff;
      --tm-muted: #9facb9;
      --tm-placeholder: #7c8a98;
      --tm-accent: #7da8d1;
      --tm-accent-strong: #3d6388;
      --tm-accent-soft: rgba(125, 168, 209, 0.14);
      --tm-accent-border: rgba(125, 168, 209, 0.72);
      --tm-accent-border-soft: rgba(125, 168, 209, 0.3);
      --tm-focus: #aacbed;
      --tm-scrollbar: #526579;
      --tm-selection: rgba(125, 168, 209, 0.5);
      --tm-overlay: rgba(8, 12, 16, 0.68);
      --tm-page-background:
        radial-gradient(circle at 18% 0%, rgba(89, 112, 136, 0.24), transparent 36%),
        radial-gradient(circle at 88% 12%, rgba(60, 76, 93, 0.18), transparent 32%),
        linear-gradient(180deg, #111820 0%, var(--tm-bg) 52%, #06090c 100%);
      --tm-toolbar-background:
        linear-gradient(110deg, rgba(73, 95, 118, 0.28), var(--tm-panel-glass-strong) 58%),
        var(--tm-panel-raised);
      --tm-primary-background: linear-gradient(135deg, #345a7e, var(--tm-accent-strong));
      --tm-primary-background-hover: linear-gradient(135deg, #3a6084, #456b90);
      --tm-logo-shadow: drop-shadow(0 5px 14px rgba(94, 126, 156, 0.32));
    }

    html.${ROOT_CLASS}[data-tm-rarbg-palette="emerald"] {
      --tm-bg: #04110d;
      --tm-panel: #0b1d16;
      --tm-panel-raised: #10291f;
      --tm-panel-soft: #183629;
      --tm-panel-glass: rgba(11, 29, 22, 0.9);
      --tm-panel-glass-strong: rgba(11, 29, 22, 0.95);
      --tm-input: #061711;
      --tm-control: #183e2e;
      --tm-control-hover: #21523d;
      --tm-filter: #102d22;
      --tm-filter-hover: #1b4433;
      --tm-table: #071a13;
      --tm-table-head: #174b36;
      --tm-row: #0a1d16;
      --tm-row-alt: #0e271d;
      --tm-row-hover: #174531;
      --tm-border: #285944;
      --tm-border-strong: #3d7a5e;
      --tm-cell-border: rgba(40, 89, 68, 0.48);
      --tm-cell-border-strong: rgba(40, 89, 68, 0.62);
      --tm-text: #e9f7ef;
      --tm-text-soft: #c3ddcf;
      --tm-text-subtle: #cee7d8;
      --tm-text-link: #a9e7bd;
      --tm-text-link-hover: #ddf9e9;
      --tm-muted: #96b8a5;
      --tm-placeholder: #739680;
      --tm-accent: #49c979;
      --tm-accent-strong: #237044;
      --tm-accent-soft: rgba(73, 201, 121, 0.14);
      --tm-accent-border: rgba(73, 201, 121, 0.72);
      --tm-accent-border-soft: rgba(73, 201, 121, 0.3);
      --tm-focus: #9be2b5;
      --tm-scrollbar: #3d7a5e;
      --tm-selection: rgba(73, 201, 121, 0.5);
      --tm-overlay: rgba(2, 14, 10, 0.7);
      --tm-page-background:
        radial-gradient(circle at 18% 0%, rgba(38, 125, 79, 0.28), transparent 36%),
        radial-gradient(circle at 88% 12%, rgba(24, 88, 58, 0.2), transparent 32%),
        linear-gradient(180deg, #071c14 0%, var(--tm-bg) 52%, #010906 100%);
      --tm-toolbar-background:
        linear-gradient(110deg, rgba(35, 109, 72, 0.3), var(--tm-panel-glass-strong) 58%),
        var(--tm-panel-raised);
      --tm-primary-background: linear-gradient(135deg, #246b49, var(--tm-accent-strong));
      --tm-primary-background-hover: linear-gradient(135deg, #2c754f, #347e58);
      --tm-logo-shadow: drop-shadow(0 5px 14px rgba(54, 151, 93, 0.34));
    }

    html.${ROOT_CLASS}[data-tm-rarbg-palette="teal"] {
      --tm-bg: #031216;
      --tm-panel: #081f25;
      --tm-panel-raised: #0d2b33;
      --tm-panel-soft: #143943;
      --tm-panel-glass: rgba(8, 31, 37, 0.9);
      --tm-panel-glass-strong: rgba(8, 31, 37, 0.95);
      --tm-input: #05181d;
      --tm-control: #16414b;
      --tm-control-hover: #1c5562;
      --tm-filter: #0c3037;
      --tm-filter-hover: #164852;
      --tm-table: #061b20;
      --tm-table-head: #124d58;
      --tm-row: #082028;
      --tm-row-alt: #0c2931;
      --tm-row-hover: #134851;
      --tm-border: #235a65;
      --tm-border-strong: #397c89;
      --tm-cell-border: rgba(35, 90, 101, 0.48);
      --tm-cell-border-strong: rgba(35, 90, 101, 0.62);
      --tm-text: #e8f7f8;
      --tm-text-soft: #c0dadd;
      --tm-text-subtle: #cae4e6;
      --tm-text-link: #9de5eb;
      --tm-text-link-hover: #daf9fb;
      --tm-muted: #94b7ba;
      --tm-placeholder: #72969a;
      --tm-accent: #42cbd6;
      --tm-accent-strong: #166d78;
      --tm-accent-soft: rgba(66, 203, 214, 0.14);
      --tm-accent-border: rgba(66, 203, 214, 0.72);
      --tm-accent-border-soft: rgba(66, 203, 214, 0.3);
      --tm-focus: #91e7ed;
      --tm-scrollbar: #397c89;
      --tm-selection: rgba(66, 203, 214, 0.5);
      --tm-overlay: rgba(2, 14, 18, 0.7);
      --tm-page-background:
        radial-gradient(circle at 18% 0%, rgba(30, 126, 139, 0.3), transparent 36%),
        radial-gradient(circle at 88% 12%, rgba(18, 84, 96, 0.22), transparent 32%),
        linear-gradient(180deg, #061e24 0%, var(--tm-bg) 52%, #01090b 100%);
      --tm-toolbar-background:
        linear-gradient(110deg, rgba(27, 112, 124, 0.3), var(--tm-panel-glass-strong) 58%),
        var(--tm-panel-raised);
      --tm-primary-background: linear-gradient(135deg, #17646f, var(--tm-accent-strong));
      --tm-primary-background-hover: linear-gradient(135deg, #1b6d78, #227783);
      --tm-logo-shadow: drop-shadow(0 5px 14px rgba(42, 151, 164, 0.34));
    }

    html.${ROOT_CLASS}[data-tm-rarbg-palette="crimson"] {
      --tm-bg: #14070a;
      --tm-panel: #251014;
      --tm-panel-raised: #32171d;
      --tm-panel-soft: #422129;
      --tm-panel-glass: rgba(37, 16, 20, 0.9);
      --tm-panel-glass-strong: rgba(37, 16, 20, 0.95);
      --tm-input: #1a090d;
      --tm-control: #4b2029;
      --tm-control-hover: #612a36;
      --tm-filter: #35171e;
      --tm-filter-hover: #4c2029;
      --tm-table: #1d0b0f;
      --tm-table-head: #5b2430;
      --tm-row: #210d12;
      --tm-row-alt: #2a1117;
      --tm-row-hover: #4c1d27;
      --tm-border: #65313c;
      --tm-border-strong: #8a4958;
      --tm-cell-border: rgba(101, 49, 60, 0.48);
      --tm-cell-border-strong: rgba(101, 49, 60, 0.62);
      --tm-text: #fbecef;
      --tm-text-soft: #e5cbd1;
      --tm-text-subtle: #edd5da;
      --tm-text-link: #ffb7c5;
      --tm-text-link-hover: #ffe4e9;
      --tm-muted: #bca0a7;
      --tm-placeholder: #95747d;
      --tm-accent: #ff617b;
      --tm-accent-strong: #9c3047;
      --tm-accent-soft: rgba(255, 97, 123, 0.14);
      --tm-accent-border: rgba(255, 97, 123, 0.72);
      --tm-accent-border-soft: rgba(255, 97, 123, 0.3);
      --tm-focus: #ffadbc;
      --tm-scrollbar: #8a4958;
      --tm-selection: rgba(255, 97, 123, 0.5);
      --tm-overlay: rgba(18, 4, 7, 0.72);
      --tm-page-background:
        radial-gradient(circle at 18% 0%, rgba(150, 39, 63, 0.3), transparent 36%),
        radial-gradient(circle at 88% 12%, rgba(100, 28, 44, 0.22), transparent 32%),
        linear-gradient(180deg, #250b12 0%, var(--tm-bg) 52%, #0a0204 100%);
      --tm-toolbar-background:
        linear-gradient(110deg, rgba(133, 37, 57, 0.32), var(--tm-panel-glass-strong) 58%),
        var(--tm-panel-raised);
      --tm-primary-background: linear-gradient(135deg, #8a283d, var(--tm-accent-strong));
      --tm-primary-background-hover: linear-gradient(135deg, #983046, #a63850);
      --tm-logo-shadow: drop-shadow(0 5px 14px rgba(179, 53, 79, 0.34));
    }

    html.${ROOT_CLASS}[data-tm-rarbg-palette="amber"] {
      --tm-bg: #100d07;
      --tm-panel: #1e1a12;
      --tm-panel-raised: #292319;
      --tm-panel-soft: #352d21;
      --tm-panel-glass: rgba(30, 26, 18, 0.9);
      --tm-panel-glass-strong: rgba(30, 26, 18, 0.95);
      --tm-input: #151109;
      --tm-control: #413721;
      --tm-control-hover: #54462a;
      --tm-filter: #2d2618;
      --tm-filter-hover: #45391f;
      --tm-table: #18140c;
      --tm-table-head: #554522;
      --tm-row: #1b170e;
      --tm-row-alt: #231d12;
      --tm-row-hover: #46391f;
      --tm-border: #5e4d2d;
      --tm-border-strong: #80683b;
      --tm-cell-border: rgba(94, 77, 45, 0.48);
      --tm-cell-border-strong: rgba(94, 77, 45, 0.62);
      --tm-text: #f7f1e3;
      --tm-text-soft: #ddd2bc;
      --tm-text-subtle: #e7dcc6;
      --tm-text-link: #f0d49b;
      --tm-text-link-hover: #fff0ce;
      --tm-muted: #b9aa8d;
      --tm-placeholder: #8d7d61;
      --tm-accent: #e8ad3e;
      --tm-accent-strong: #805613;
      --tm-accent-soft: rgba(232, 173, 62, 0.14);
      --tm-accent-border: rgba(232, 173, 62, 0.72);
      --tm-accent-border-soft: rgba(232, 173, 62, 0.3);
      --tm-focus: #f5d182;
      --tm-scrollbar: #80683b;
      --tm-selection: rgba(232, 173, 62, 0.5);
      --tm-overlay: rgba(15, 11, 4, 0.72);
      --tm-page-background:
        radial-gradient(circle at 18% 0%, rgba(145, 99, 28, 0.28), transparent 36%),
        radial-gradient(circle at 88% 12%, rgba(94, 69, 25, 0.2), transparent 32%),
        linear-gradient(180deg, #201907 0%, var(--tm-bg) 52%, #070502 100%);
      --tm-toolbar-background:
        linear-gradient(110deg, rgba(124, 88, 28, 0.3), var(--tm-panel-glass-strong) 58%),
        var(--tm-panel-raised);
      --tm-primary-background: linear-gradient(135deg, #745014, var(--tm-accent-strong));
      --tm-primary-background-hover: linear-gradient(135deg, #805817, #8c621b);
      --tm-logo-shadow: drop-shadow(0 5px 14px rgba(172, 120, 34, 0.34));
    }

    html.${ROOT_CLASS}[data-tm-rarbg-palette="magenta"] {
      --tm-bg: #130714;
      --tm-panel: #251025;
      --tm-panel-raised: #331735;
      --tm-panel-soft: #432147;
      --tm-panel-glass: rgba(37, 16, 37, 0.9);
      --tm-panel-glass-strong: rgba(37, 16, 37, 0.95);
      --tm-input: #19091b;
      --tm-control: #4a204f;
      --tm-control-hover: #602965;
      --tm-filter: #351738;
      --tm-filter-hover: #4c2050;
      --tm-table: #1c0b1e;
      --tm-table-head: #5a2860;
      --tm-row: #200d22;
      --tm-row-alt: #29112c;
      --tm-row-hover: #4b2050;
      --tm-border: #613467;
      --tm-border-strong: #854b8c;
      --tm-cell-border: rgba(97, 52, 103, 0.48);
      --tm-cell-border-strong: rgba(97, 52, 103, 0.62);
      --tm-text: #faedf9;
      --tm-text-soft: #e2cde1;
      --tm-text-subtle: #ecd7ea;
      --tm-text-link: #f4b9f0;
      --tm-text-link-hover: #ffe5fc;
      --tm-muted: #bba1ba;
      --tm-placeholder: #917492;
      --tm-accent: #ec73e2;
      --tm-accent-strong: #8a3e87;
      --tm-accent-soft: rgba(236, 115, 226, 0.14);
      --tm-accent-border: rgba(236, 115, 226, 0.72);
      --tm-accent-border-soft: rgba(236, 115, 226, 0.3);
      --tm-focus: #f3aff0;
      --tm-scrollbar: #854b8c;
      --tm-selection: rgba(236, 115, 226, 0.5);
      --tm-overlay: rgba(17, 4, 18, 0.72);
      --tm-page-background:
        radial-gradient(circle at 18% 0%, rgba(139, 50, 137, 0.3), transparent 36%),
        radial-gradient(circle at 88% 12%, rgba(93, 32, 98, 0.22), transparent 32%),
        linear-gradient(180deg, #230b25 0%, var(--tm-bg) 52%, #09020a 100%);
      --tm-toolbar-background:
        linear-gradient(110deg, rgba(126, 45, 128, 0.32), var(--tm-panel-glass-strong) 58%),
        var(--tm-panel-raised);
      --tm-primary-background: linear-gradient(135deg, #7c3578, var(--tm-accent-strong));
      --tm-primary-background-hover: linear-gradient(135deg, #8a3d86, #954693);
      --tm-logo-shadow: drop-shadow(0 5px 14px rgba(166, 65, 162, 0.34));
    }

    html.${ROOT_CLASS}[data-tm-rarbg-palette="olive"] {
      --tm-bg: #0d1006;
      --tm-panel: #191d0f;
      --tm-panel-raised: #242a15;
      --tm-panel-soft: #30371d;
      --tm-panel-glass: rgba(25, 29, 15, 0.9);
      --tm-panel-glass-strong: rgba(25, 29, 15, 0.95);
      --tm-input: #121508;
      --tm-control: #384123;
      --tm-control-hover: #49542c;
      --tm-filter: #282f17;
      --tm-filter-hover: #3c4622;
      --tm-table: #14180b;
      --tm-table-head: #485424;
      --tm-row: #171b0d;
      --tm-row-alt: #1e2411;
      --tm-row-hover: #3b461f;
      --tm-border: #505d2e;
      --tm-border-strong: #718046;
      --tm-cell-border: rgba(80, 93, 46, 0.48);
      --tm-cell-border-strong: rgba(80, 93, 46, 0.62);
      --tm-text: #f3f5e8;
      --tm-text-soft: #d5dbc2;
      --tm-text-subtle: #dfe5cd;
      --tm-text-link: #d5e69c;
      --tm-text-link-hover: #f0f8cf;
      --tm-muted: #adb68e;
      --tm-placeholder: #828b68;
      --tm-accent: #b5cc55;
      --tm-accent-strong: #637326;
      --tm-accent-soft: rgba(181, 204, 85, 0.14);
      --tm-accent-border: rgba(181, 204, 85, 0.72);
      --tm-accent-border-soft: rgba(181, 204, 85, 0.3);
      --tm-focus: #d5e888;
      --tm-scrollbar: #718046;
      --tm-selection: rgba(181, 204, 85, 0.5);
      --tm-overlay: rgba(11, 14, 3, 0.72);
      --tm-page-background:
        radial-gradient(circle at 18% 0%, rgba(101, 119, 38, 0.28), transparent 36%),
        radial-gradient(circle at 88% 12%, rgba(72, 85, 29, 0.2), transparent 32%),
        linear-gradient(180deg, #1b2108 0%, var(--tm-bg) 52%, #060802 100%);
      --tm-toolbar-background:
        linear-gradient(110deg, rgba(91, 108, 34, 0.3), var(--tm-panel-glass-strong) 58%),
        var(--tm-panel-raised);
      --tm-primary-background: linear-gradient(135deg, #596a22, var(--tm-accent-strong));
      --tm-primary-background-hover: linear-gradient(135deg, #647326, #6c7929);
      --tm-logo-shadow: drop-shadow(0 5px 14px rgba(128, 147, 52, 0.34));
    }

    html.${ROOT_CLASS}[data-tm-rarbg-palette="espresso"] {
      --tm-bg: #100a07;
      --tm-panel: #1f1510;
      --tm-panel-raised: #2a1d16;
      --tm-panel-soft: #38271e;
      --tm-panel-glass: rgba(31, 21, 16, 0.9);
      --tm-panel-glass-strong: rgba(31, 21, 16, 0.95);
      --tm-input: #150d09;
      --tm-control: #422c21;
      --tm-control-hover: #573a2b;
      --tm-filter: #2f2017;
      --tm-filter-hover: #473024;
      --tm-table: #180f0b;
      --tm-table-head: #543728;
      --tm-row: #1b120d;
      --tm-row-alt: #241811;
      --tm-row-hover: #483025;
      --tm-border: #5d4032;
      --tm-border-strong: #7f5a48;
      --tm-cell-border: rgba(93, 64, 50, 0.48);
      --tm-cell-border-strong: rgba(93, 64, 50, 0.62);
      --tm-text: #f6eee9;
      --tm-text-soft: #ddcec4;
      --tm-text-subtle: #e7d8cf;
      --tm-text-link: #e8c2a8;
      --tm-text-link-hover: #fce5d6;
      --tm-muted: #b8a294;
      --tm-placeholder: #91796c;
      --tm-accent: #d59a72;
      --tm-accent-strong: #7a4b30;
      --tm-accent-soft: rgba(213, 154, 114, 0.14);
      --tm-accent-border: rgba(213, 154, 114, 0.72);
      --tm-accent-border-soft: rgba(213, 154, 114, 0.3);
      --tm-focus: #efc3a5;
      --tm-scrollbar: #7f5a48;
      --tm-selection: rgba(213, 154, 114, 0.5);
      --tm-overlay: rgba(14, 7, 4, 0.72);
      --tm-page-background:
        radial-gradient(circle at 18% 0%, rgba(117, 72, 46, 0.28), transparent 36%),
        radial-gradient(circle at 88% 12%, rgba(82, 51, 35, 0.22), transparent 32%),
        linear-gradient(180deg, #21130c 0%, var(--tm-bg) 52%, #070301 100%);
      --tm-toolbar-background:
        linear-gradient(110deg, rgba(105, 66, 43, 0.3), var(--tm-panel-glass-strong) 58%),
        var(--tm-panel-raised);
      --tm-primary-background: linear-gradient(135deg, #6d432c, var(--tm-accent-strong));
      --tm-primary-background-hover: linear-gradient(135deg, #784a30, #835238);
      --tm-logo-shadow: drop-shadow(0 5px 14px rgba(140, 87, 57, 0.34));
    }

    html.${ROOT_CLASS} {
      min-height: 100%;
      background: var(--tm-bg) !important;
      scrollbar-color: var(--tm-scrollbar) var(--tm-bg);
      scrollbar-width: thin;
    }

    html.${ROOT_CLASS},
    html.${ROOT_CLASS} body,
    html.${ROOT_CLASS} body * {
      box-sizing: border-box;
    }

    html.${ROOT_CLASS} body.postBody.container {
      width: calc(100% - 32px) !important;
      max-width: 1540px !important;
      min-height: 100vh;
      margin: 16px auto !important;
      padding: 0 !important;
      color: var(--tm-text) !important;
      background: transparent !important;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
        "Segoe UI", sans-serif !important;
      font-size: 14px;
      line-height: 1.45;
    }

    html.${ROOT_CLASS} body.postBody.container > div[style*="bknd_body.jpg"] {
      background: var(--tm-page-background) !important;
    }

    html.${ROOT_CLASS} ::selection {
      color: var(--tm-text-on-accent);
      background: var(--tm-selection);
    }

    html.${ROOT_CLASS} :focus-visible {
      outline: 2px solid var(--tm-focus) !important;
      outline-offset: 2px !important;
    }

    /* Applied only after the bounded JavaScript check validates a known host. */
    html.${ROOT_CLASS} .tm-rarbg-known-click-catcher {
      display: none !important;
      pointer-events: none !important;
    }

    html.${ROOT_CLASS} a {
      color: var(--tm-accent);
      text-decoration: none;
      transition: color 140ms ease, background-color 140ms ease, border-color 140ms ease;
    }

    html.${ROOT_CLASS} a:hover {
      color: var(--tm-focus);
      text-decoration: none;
    }

    /* Overall shell and header */
    html.${ROOT_CLASS} .topnav {
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      background: transparent !important;
    }

    html.${ROOT_CLASS} .topnav > div:first-child {
      position: relative;
      display: flex;
      min-height: 74px;
      align-items: center;
      gap: 16px;
      margin-bottom: 14px;
      padding: 10px 14px;
      overflow: visible;
      border: 1px solid var(--tm-border);
      border-radius: 15px;
      background: var(--tm-panel-glass) !important;
      box-shadow: var(--tm-shadow);
      backdrop-filter: blur(14px);
    }

    html.${ROOT_CLASS} .logo {
      display: block;
      width: 146px !important;
      max-width: 32vw;
      height: auto !important;
      margin: 0 !important;
      filter: var(--tm-logo-shadow);
    }

    html.${ROOT_CLASS} .postContUp {
      display: flex !important;
      width: auto !important;
      margin: 0 0 0 auto !important;
      padding: 0 !important;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 7px;
      background: transparent !important;
    }

    html.${ROOT_CLASS} .tm-rarbg-palette-control {
      display: inline-flex;
      min-height: 38px;
      padding-left: 10px;
      align-items: center;
      gap: 8px;
      flex: 0 0 auto;
      border: 1px solid var(--tm-border);
      border-radius: 9px;
      color: var(--tm-muted);
      background: var(--tm-panel-raised);
      font-size: 11px;
      font-weight: 750;
      line-height: 1;
      white-space: nowrap;
    }

    html.${ROOT_CLASS} .tm-rarbg-palette-select {
      width: auto;
      min-width: 92px;
      height: 36px;
      margin: 0;
      padding: 0 28px 0 10px;
      border: 0;
      border-left: 1px solid var(--tm-border);
      border-radius: 0 8px 8px 0;
      color: var(--tm-text);
      background-color: var(--tm-input);
      font: inherit;
      font-size: 12px;
      cursor: pointer;
      color-scheme: dark;
    }

    html.${ROOT_CLASS} .tm-rarbg-palette-select:hover {
      background-color: var(--tm-control-hover);
    }

    html.${ROOT_CLASS} .postContUp button,
    html.${ROOT_CLASS} .leftNav button,
    html.${ROOT_CLASS} #myLinks button {
      min-height: 38px;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden;
      border: 1px solid var(--tm-border) !important;
      border-radius: 9px !important;
      background: var(--tm-panel-raised) !important;
      box-shadow: none !important;
      transition: transform 140ms ease, border-color 140ms ease, background-color 140ms ease;
    }

    html.${ROOT_CLASS} .postContUp button:hover,
    html.${ROOT_CLASS} .leftNav button:hover,
    html.${ROOT_CLASS} #myLinks button:hover {
      transform: translateY(-1px);
      border-color: var(--tm-border-strong) !important;
      background: var(--tm-control-hover) !important;
    }

    html.${ROOT_CLASS} .postContUp button.btn-secondary,
    html.${ROOT_CLASS} .leftNav button.btn-secondary,
    html.${ROOT_CLASS} #myLinks button.btn-secondary {
      border-color: var(--tm-accent-border) !important;
      background: var(--tm-primary-background) !important;
    }

    html.${ROOT_CLASS} .postContUp button a,
    html.${ROOT_CLASS} .leftNav button a,
    html.${ROOT_CLASS} #myLinks button a {
      display: flex;
      width: 100%;
      min-height: 36px;
      padding: 8px 11px;
      align-items: center;
      justify-content: center;
      gap: 7px;
      color: var(--tm-text) !important;
      font-size: 13px;
      font-weight: 650;
      line-height: 1;
      white-space: nowrap;
    }

    html.${ROOT_CLASS} .postContUp button.logout-btn {
      padding: 8px 11px !important;
      color: var(--tm-text) !important;
      font-size: 13px;
      font-weight: 650;
      white-space: nowrap;
    }

    html.${ROOT_CLASS} .topnav > .row {
      display: grid !important;
      grid-template-columns: 126px minmax(0, 1fr);
      margin: 0 !important;
      align-items: flex-start;
      gap: 14px;
    }

    html.${ROOT_CLASS} .leftNav {
      position: sticky;
      top: 12px;
      z-index: 30;
      display: flex !important;
      width: 126px !important;
      max-width: 126px !important;
      padding: 10px !important;
      flex: 0 0 126px !important;
      flex-direction: column;
      gap: 7px;
      grid-column: 1;
      grid-row: 1;
      border: 1px solid var(--tm-border);
      border-radius: 14px;
      background: var(--tm-panel-glass-strong) !important;
      box-shadow: var(--tm-shadow);
      backdrop-filter: blur(14px);
    }

    html.${ROOT_CLASS} .leftNav button {
      width: 100% !important;
    }

    html.${ROOT_CLASS} .leftNav button a {
      justify-content: flex-start;
    }

    html.${ROOT_CLASS} .postCont,
    html.${ROOT_CLASS} .postContL {
      width: auto !important;
      max-width: none !important;
      min-width: 0;
      margin: 0 !important;
      padding: 16px !important;
      flex: 1 1 auto !important;
      grid-column: 2;
      grid-row: 1;
      border: 1px solid var(--tm-border);
      border-radius: 15px;
      background: var(--tm-panel-glass-strong) !important;
      box-shadow: var(--tm-shadow);
    }

    html.${ROOT_CLASS} .topnav > .adCont {
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
      grid-column: 1 / -1;
      grid-row: 2;
    }

    html.${ROOT_CLASS} .postCont > br,
    html.${ROOT_CLASS} .postContL > br {
      display: none !important;
    }

    /* Theme toolbar */
    html.${ROOT_CLASS} .tm-rarbg-toolbar {
      display: flex;
      min-height: 70px;
      margin: 0 0 14px;
      padding: 14px 16px;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      border: 1px solid var(--tm-accent-border-soft);
      border-radius: 13px;
      background: var(--tm-toolbar-background);
    }

    html.${ROOT_CLASS} .tm-rarbg-heading {
      min-width: 0;
    }

    html.${ROOT_CLASS} .tm-rarbg-kicker {
      display: block;
      margin-bottom: 2px;
      color: var(--tm-accent);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    html.${ROOT_CLASS} .tm-rarbg-title {
      margin: 0;
      color: var(--tm-text);
      font-size: clamp(18px, 2vw, 24px);
      font-weight: 760;
      line-height: 1.15;
    }

    html.${ROOT_CLASS} .tm-rarbg-context {
      display: block;
      margin-top: 4px;
      color: var(--tm-muted);
      font-size: 12px;
    }

    html.${ROOT_CLASS} .tm-rarbg-extras-toggle {
      display: inline-flex;
      min-height: 38px;
      padding: 8px 13px;
      align-items: center;
      justify-content: center;
      gap: 7px;
      flex: 0 0 auto;
      border: 1px solid var(--tm-border-strong);
      border-radius: 9px;
      color: var(--tm-text);
      background: var(--tm-overlay);
      font: inherit;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }

    html.${ROOT_CLASS} .tm-rarbg-extras-toggle:hover {
      border-color: var(--tm-accent);
      background: var(--tm-accent-soft);
    }

    html.${ROOT_CLASS}:not(.${SHOW_EXTRAS_CLASS}) .tm-rarbg-extra-section {
      display: none !important;
    }

    /* Main search */
    html.${ROOT_CLASS} .tm-rarbg-search-section {
      margin: 0 0 14px !important;
      padding: 14px !important;
      border: 1px solid var(--tm-border);
      border-radius: 12px;
      background: var(--tm-panel-raised);
    }

    html.${ROOT_CLASS} .tm-rarbg-search-section > .row {
      width: 100% !important;
      margin: 0 0 8px !important;
      color: var(--tm-muted);
    }

    html.${ROOT_CLASS} .searchSec {
      width: min(760px, 100%) !important;
      max-width: 760px !important;
      height: auto !important;
      margin: 0 auto !important;
      padding: 0 !important;
      background: transparent !important;
    }

    html.${ROOT_CLASS} #form_search {
      width: 100% !important;
      height: auto !important;
      margin: 0 !important;
    }

    html.${ROOT_CLASS} #form_search .search {
      display: flex !important;
      width: 100% !important;
      height: auto !important;
      margin: 0 0 9px !important;
      align-items: stretch;
      gap: 7px;
    }

    html.${ROOT_CLASS} #keywords,
    html.${ROOT_CLASS} #flist,
    html.${ROOT_CLASS} #form_search input[type="number"],
    html.${ROOT_CLASS} #form_search input[type="text"] {
      min-width: 0;
      height: 42px !important;
      padding: 9px 12px !important;
      border: 1px solid var(--tm-border-strong) !important;
      border-radius: 9px !important;
      color: var(--tm-text) !important;
      background: var(--tm-input) !important;
      box-shadow: none !important;
      font: inherit !important;
      font-size: 13px !important;
    }

    html.${ROOT_CLASS} #keywords {
      width: auto !important;
      flex: 1 1 auto;
    }

    html.${ROOT_CLASS} #keywords:focus,
    html.${ROOT_CLASS} #flist:focus,
    html.${ROOT_CLASS} #form_search input:focus {
      border-color: var(--tm-accent) !important;
      box-shadow: 0 0 0 3px var(--tm-accent-soft) !important;
    }

    html.${ROOT_CLASS} #keywords::placeholder,
    html.${ROOT_CLASS} #flist::placeholder {
      color: var(--tm-placeholder) !important;
      opacity: 1;
    }

    html.${ROOT_CLASS} .searchButton,
    html.${ROOT_CLASS} #filterBtn,
    html.${ROOT_CLASS} #form_search button[type="reset"] {
      display: inline-flex !important;
      width: 42px !important;
      min-width: 42px;
      height: 42px !important;
      padding: 0 !important;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--tm-border-strong) !important;
      border-radius: 9px !important;
      color: var(--tm-text) !important;
      background: var(--tm-control) !important;
      box-shadow: none !important;
      cursor: pointer;
    }

    html.${ROOT_CLASS} .searchButton:hover,
    html.${ROOT_CLASS} #filterBtn:hover,
    html.${ROOT_CLASS} #form_search button[type="reset"]:hover {
      border-color: var(--tm-accent) !important;
      background: var(--tm-accent-strong) !important;
    }

    html.${ROOT_CLASS} #form_search > div:last-of-type {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    html.${ROOT_CLASS} #form_search button[type="reset"] {
      width: auto !important;
      padding: 0 13px !important;
    }

    html.${ROOT_CLASS} #filterOption {
      margin-top: 10px !important;
      padding: 12px !important;
      gap: 10px !important;
      border: 1px solid var(--tm-border);
      border-radius: 10px;
      background: var(--tm-input) !important;
    }

    html.${ROOT_CLASS} #filterOption label[for="sizeMin"],
    html.${ROOT_CLASS} #filterOption label[for="sizeMax"] {
      display: block !important;
      width: 100%;
    }

    html.${ROOT_CLASS} #sizeMin,
    html.${ROOT_CLASS} #sizeMax {
      width: 100% !important;
      padding: 9px 38px !important;
      -moz-appearance: textfield;
      appearance: textfield;
    }

    html.${ROOT_CLASS} #sizeMin::placeholder,
    html.${ROOT_CLASS} #sizeMax::placeholder {
      color: transparent !important;
      opacity: 0;
    }

    html.${ROOT_CLASS} #sizeMin::-webkit-inner-spin-button,
    html.${ROOT_CLASS} #sizeMin::-webkit-outer-spin-button,
    html.${ROOT_CLASS} #sizeMax::-webkit-inner-spin-button,
    html.${ROOT_CLASS} #sizeMax::-webkit-outer-spin-button {
      margin: 0;
      -webkit-appearance: none;
      appearance: none;
    }

    html.${ROOT_CLASS} #filterOption label[for="sizeMin"] > span,
    html.${ROOT_CLASS} #filterOption label[for="sizeMax"] > span {
      top: 50% !important;
      z-index: 1;
      transform: translateY(-50%);
      color: var(--tm-focus) !important;
      pointer-events: none;
    }

    html.${ROOT_CLASS} #filterOption label[for="sizeMin"] > span:first-child,
    html.${ROOT_CLASS} #filterOption label[for="sizeMax"] > span:first-child {
      left: 10px !important;
    }

    html.${ROOT_CLASS} #filterOption label[for="sizeMin"] > span:last-child,
    html.${ROOT_CLASS} #filterOption label[for="sizeMax"] > span:last-child {
      right: 10px !important;
    }

    html.${ROOT_CLASS} .form-check-input,
    html.${ROOT_CLASS} input[type="checkbox"] {
      accent-color: var(--tm-accent-strong);
    }

    html.${ROOT_CLASS} #searchList {
      overflow: hidden;
      border: 1px solid var(--tm-border) !important;
      border-radius: 10px !important;
      color: var(--tm-text) !important;
      background: var(--tm-panel) !important;
      box-shadow: var(--tm-shadow) !important;
    }

    html.${ROOT_CLASS} #searchList .nav-item {
      border-color: var(--tm-border) !important;
      color: var(--tm-text) !important;
      background: transparent !important;
    }

    html.${ROOT_CLASS} #searchList .nav-item:hover {
      background: var(--tm-accent-soft) !important;
    }

    /* Optional recommendation and tag sections */
    html.${ROOT_CLASS} .banner-box.movie,
    html.${ROOT_CLASS} .tm-rarbg-extra-section {
      margin: 0 0 14px !important;
      padding: 12px !important;
      border: 1px solid var(--tm-border);
      border-radius: 12px;
      background: var(--tm-panel-raised) !important;
    }

    html.${ROOT_CLASS} .banner-box.movie {
      width: 100% !important;
      height: auto !important;
      overflow: hidden;
    }

    html.${ROOT_CLASS} .banner-box.movie img {
      border-radius: 8px;
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.38);
    }

    html.${ROOT_CLASS} #searchTags {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 7px;
    }

    html.${ROOT_CLASS} #searchTags .badge {
      margin: 0 !important;
      padding: 7px 10px !important;
      border: 1px solid var(--tm-border) !important;
      color: var(--tm-text-subtle) !important;
      background: var(--tm-panel-soft) !important;
      font-size: 11px;
      font-weight: 650;
    }

    html.${ROOT_CLASS} #searchTags a:hover .badge {
      border-color: var(--tm-accent) !important;
      color: var(--tm-text-on-accent) !important;
      background: var(--tm-accent-soft) !important;
    }

    html.${ROOT_CLASS} .recent-search-wrapper,
    html.${ROOT_CLASS} .recent-search-container {
      width: 100% !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      color: var(--tm-muted) !important;
      background: transparent !important;
    }

    /* Results controls */
    html.${ROOT_CLASS} .tm-rarbg-results-row {
      display: block !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    html.${ROOT_CLASS} .tm-rarbg-filter-bar {
      display: flex !important;
      width: 100%;
      min-height: 58px;
      margin: 0 0 11px !important;
      padding: 10px 12px !important;
      align-items: center;
      justify-content: space-between !important;
      flex-wrap: wrap;
      gap: 10px 14px;
      border: 1px solid var(--tm-border);
      border-radius: 11px;
      color: var(--tm-muted);
      background: var(--tm-panel-raised);
    }

    html.${ROOT_CLASS} #flist {
      width: min(320px, 100%) !important;
      flex: 1 1 220px;
    }

    html.${ROOT_CLASS} .tm-rarbg-filter-bar > div {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      margin: 0 !important;
    }

    html.${ROOT_CLASS} .tm-rarbg-filter-bar label {
      display: inline-flex;
      min-height: 30px;
      margin: 0 !important;
      padding: 5px 8px;
      align-items: center;
      gap: 5px;
      border: 1px solid var(--tm-border);
      border-radius: 8px;
      color: var(--tm-text-soft);
      background: var(--tm-filter);
      cursor: pointer;
    }

    html.${ROOT_CLASS} .tm-rarbg-filter-bar label:hover {
      border-color: var(--tm-border-strong);
      background: var(--tm-filter-hover);
    }

    html.${ROOT_CLASS} .tm-rarbg-filter-bar label:has(input:checked) {
      border-color: var(--tm-accent);
      color: var(--tm-text-on-accent);
      background: var(--tm-accent-soft);
    }

    /* Results table */
    html.${ROOT_CLASS} .dataTables_wrapper {
      width: 100% !important;
      overflow: visible !important;
      border: 1px solid var(--tm-border);
      border-radius: 12px;
      background: var(--tm-table);
      scrollbar-color: var(--tm-scrollbar) var(--tm-input);
      scrollbar-width: thin;
    }

    html.${ROOT_CLASS} .dataTables_filter {
      display: flex;
      float: none !important;
      padding: 10px;
      justify-content: flex-start;
    }

    html.${ROOT_CLASS} .dataTables_filter label {
      width: min(300px, 100%);
      margin: 0;
    }

    html.${ROOT_CLASS} .dataTables_filter input[type="search"] {
      width: 100% !important;
      height: 38px !important;
      margin: 0 !important;
      padding: 8px 10px !important;
      border: 1px solid var(--tm-border-strong) !important;
      border-radius: 8px !important;
      color: var(--tm-text) !important;
      background: var(--tm-input) !important;
      box-shadow: none !important;
      font: inherit !important;
    }

    html.${ROOT_CLASS} .dataTables_filter input[type="search"]:focus {
      border-color: var(--tm-accent) !important;
      box-shadow: 0 0 0 3px var(--tm-accent-soft) !important;
    }

    html.${ROOT_CLASS} table.sortableTable2,
    html.${ROOT_CLASS} table.dataTable {
      width: 100% !important;
      min-width: 900px;
      margin: 0 !important;
      border: 0 !important;
      border-collapse: separate !important;
      border-spacing: 0 !important;
      color: var(--tm-text) !important;
      background: transparent !important;
    }

    html.${ROOT_CLASS} table.sortableTable2 thead th,
    html.${ROOT_CLASS} table.dataTable thead th {
      position: sticky;
      top: 0;
      z-index: 20;
      padding: 11px 10px !important;
      border-top: 0 !important;
      border-right: 1px solid var(--tm-border) !important;
      border-bottom: 1px solid var(--tm-border-strong) !important;
      color: var(--tm-text) !important;
      background-color: var(--tm-table-head) !important;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.045em;
      line-height: 1.2;
      text-transform: uppercase;
      white-space: nowrap;
    }

    html.${ROOT_CLASS} table.sortableTable2 thead th:last-child,
    html.${ROOT_CLASS} table.dataTable thead th:last-child {
      border-right: 0 !important;
    }

    html.${ROOT_CLASS} table.sortableTable2 tbody tr,
    html.${ROOT_CLASS} table.dataTable tbody tr {
      color: var(--tm-text) !important;
      background: var(--tm-row) !important;
      transition: background-color 120ms ease, box-shadow 120ms ease;
    }

    html.${ROOT_CLASS} table.sortableTable2 tbody tr:nth-child(even),
    html.${ROOT_CLASS} table.dataTable tbody tr:nth-child(even) {
      background: var(--tm-row-alt) !important;
    }

    html.${ROOT_CLASS} table.sortableTable2 tbody tr:hover,
    html.${ROOT_CLASS} table.dataTable tbody tr:hover {
      background: var(--tm-row-hover) !important;
      box-shadow: inset 3px 0 0 var(--tm-accent);
    }

    html.${ROOT_CLASS} table.sortableTable2 tbody td,
    html.${ROOT_CLASS} table.dataTable tbody td {
      padding: 10px !important;
      border-top: 0 !important;
      border-right: 1px solid var(--tm-cell-border) !important;
      border-bottom: 1px solid var(--tm-cell-border-strong) !important;
      color: var(--tm-text-soft) !important;
      background: transparent !important;
      box-shadow: none !important;
      font-size: 13px;
      line-height: 1.4;
      vertical-align: middle;
    }

    html.${ROOT_CLASS} table.sortableTable2 tbody td:last-child,
    html.${ROOT_CLASS} table.dataTable tbody td:last-child {
      border-right: 0 !important;
    }

    html.${ROOT_CLASS} table.sortableTable2 th:nth-child(2),
    html.${ROOT_CLASS} table.sortableTable2 td:nth-child(2) {
      width: 52%;
    }

    html.${ROOT_CLASS} table.sortableTable2 td.cellName a,
    html.${ROOT_CLASS} table.sortableTable td.cellName a {
      display: inline;
      color: var(--tm-text-link) !important;
      font-size: 14px;
      font-weight: 690 !important;
      line-height: 1.38;
      overflow-wrap: anywhere;
    }

    html.${ROOT_CLASS} table.sortableTable2 td.cellName a:hover,
    html.${ROOT_CLASS} table.sortableTable td.cellName a:hover {
      color: var(--tm-text-link-hover) !important;
    }

    html.${ROOT_CLASS} table.sortableTable2 td:not(.cellName),
    html.${ROOT_CLASS} table.sortableTable2 th:not(:nth-child(2)) {
      white-space: nowrap;
    }

    html.${ROOT_CLASS} table.sortableTable2 td.sizeCell {
      color: var(--tm-text-subtle) !important;
      font-variant-numeric: tabular-nums;
    }

    html.${ROOT_CLASS} table.sortableTable2 td:nth-child(7) {
      color: var(--tm-success) !important;
      font-weight: 800;
      font-variant-numeric: tabular-nums;
    }

    html.${ROOT_CLASS} table.sortableTable2 td:nth-child(8) {
      color: var(--tm-danger) !important;
      font-weight: 750;
      font-variant-numeric: tabular-nums;
    }

    html.${ROOT_CLASS} table.sortableTable td:nth-child(7) {
      color: var(--tm-success) !important;
      font-weight: 800;
      font-variant-numeric: tabular-nums;
    }

    html.${ROOT_CLASS} table.sortableTable td:nth-child(8) {
      color: var(--tm-danger) !important;
      font-weight: 750;
      font-variant-numeric: tabular-nums;
    }

    html.${ROOT_CLASS} table.sortableTable2 .tooltip img {
      overflow: hidden;
      border: 1px solid var(--tm-border-strong);
      border-radius: 8px;
      background: var(--tm-panel);
      box-shadow: var(--tm-shadow);
    }

    html.${ROOT_CLASS}.${CATEGORY_PAGE_CLASS} table.sortableTable2 th:nth-child(1),
    html.${ROOT_CLASS}.${CATEGORY_PAGE_CLASS} table.sortableTable2 td:nth-child(1),
    html.${ROOT_CLASS}.${CATEGORY_PAGE_CLASS} table.sortableTable2 th:nth-child(3),
    html.${ROOT_CLASS}.${CATEGORY_PAGE_CLASS} table.sortableTable2 td:nth-child(3) {
      display: none !important;
    }

    html.${ROOT_CLASS} .dataTables_info,
    html.${ROOT_CLASS} .dataTables_empty {
      padding: 12px !important;
      color: var(--tm-muted) !important;
      font-size: 13px;
    }

    /* Pagination */
    html.${ROOT_CLASS} .tm-rarbg-pagination-row {
      margin: 12px 0 !important;
    }

    html.${ROOT_CLASS} .pagination {
      margin: 0 !important;
      padding: 0 !important;
      align-items: center;
      gap: 6px;
    }

    html.${ROOT_CLASS} .tm-rarbg-pagination-row .page-item > .page-link,
    html.${ROOT_CLASS} .tm-rarbg-pagination-row .pagination > .page-link {
      min-width: 36px;
      min-height: 38px;
      padding: 7px 10px !important;
      border: 1px solid var(--tm-border) !important;
      border-radius: 8px !important;
      color: var(--tm-text-subtle) !important;
      background: var(--tm-panel-raised) !important;
      box-shadow: none !important;
      text-align: center;
    }

    html.${ROOT_CLASS} .tm-rarbg-pagination-row .page-item > .page-link:hover,
    html.${ROOT_CLASS} .tm-rarbg-pagination-row .pagination > .page-link:hover {
      border-color: var(--tm-accent) !important;
      color: var(--tm-text-on-accent) !important;
      background: var(--tm-accent-soft) !important;
    }

    html.${ROOT_CLASS} .tm-rarbg-pagination-row .page-item.active > .page-link,
    html.${ROOT_CLASS} .tm-rarbg-pagination-row .pagination > .page-link.active,
    html.${ROOT_CLASS} .tm-rarbg-pagination-row .pagination > .page-link[aria-current="page"] {
      border-color: var(--tm-accent) !important;
      color: var(--tm-text-on-accent) !important;
      background: var(--tm-accent-strong) !important;
    }

    html.${ROOT_CLASS} .tm-rarbg-pagination-row .page-item.disabled > .page-link,
    html.${ROOT_CLASS} .tm-rarbg-pagination-row .pagination > .page-link.disabled {
      color: var(--tm-muted) !important;
      background: var(--tm-panel) !important;
      opacity: 0.55;
      pointer-events: none;
    }

    html.${ROOT_CLASS} .tm-rarbg-pagination-row .pagination > span:not(.page-link) {
      align-self: center;
      padding: 0 2px;
      color: var(--tm-muted);
    }

    html.${ROOT_CLASS} .tm-rarbg-pagination-row .pagination > .page-item:empty {
      display: none;
    }

    /* Root catalogue */
    html.${ROOT_CLASS} .tm-rarbg-catalog-title {
      display: flex !important;
      width: 100%;
      min-height: 58px;
      margin: 0 0 14px !important;
      padding: 14px 16px !important;
      align-items: center;
      border: 1px solid var(--tm-accent-border-soft);
      border-radius: 12px;
      background: var(--tm-toolbar-background);
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-title > b {
      margin: 0 !important;
      color: var(--tm-text) !important;
      font-size: 20px !important;
      font-weight: 760;
      line-height: 1.2;
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-picker,
    html.${ROOT_CLASS} .tm-rarbg-catalog-links {
      width: 100%;
      margin: 0 0 14px !important;
      padding: 18px !important;
      border: 1px solid var(--tm-border);
      border-radius: 12px;
      background: var(--tm-panel-raised);
      text-align: center;
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-picker {
      display: block !important;
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-picker h2,
    html.${ROOT_CLASS} .tm-rarbg-catalog-links h2 {
      margin: 0 0 14px !important;
      color: var(--tm-text) !important;
      font-size: 18px !important;
      font-weight: 750 !important;
      line-height: 1.25;
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-picker table {
      margin: 0 auto;
      border-collapse: separate;
      border-spacing: 8px 0;
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-picker td {
      padding: 0;
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-picker br {
      display: none;
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-picker .buttonalink {
      display: inline-flex !important;
      min-width: 104px;
      min-height: 42px;
      padding: 9px 16px !important;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--tm-accent-border) !important;
      border-radius: 9px !important;
      color: var(--tm-text-on-accent) !important;
      background: var(--tm-primary-background) !important;
      box-shadow: none !important;
      font-size: 13px;
      font-weight: 720;
      transition: transform 140ms ease, border-color 140ms ease, background-color 140ms ease;
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-picker .buttonalink:hover {
      transform: translateY(-1px);
      border-color: var(--tm-focus) !important;
      background: var(--tm-primary-background-hover) !important;
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-links {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-links > div:first-child {
      flex: 0 0 100%;
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-links > a {
      display: inline-flex;
      max-width: 100%;
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-links .badge {
      display: inline-flex;
      min-height: 32px;
      margin: 0 !important;
      padding: 7px 11px !important;
      align-items: center;
      border: 1px solid var(--tm-border-strong) !important;
      border-radius: 999px !important;
      color: var(--tm-text-subtle) !important;
      background: var(--tm-panel-soft) !important;
      font-size: 12px !important;
      font-weight: 700;
      line-height: 1.2;
      overflow-wrap: anywhere;
      text-align: left;
    }

    html.${ROOT_CLASS} .tm-rarbg-catalog-links a:hover .badge {
      border-color: var(--tm-accent) !important;
      color: var(--tm-text-on-accent) !important;
      background: var(--tm-accent-soft) !important;
    }

    html.${ROOT_CLASS} .tm-rarbg-empty-catalog-row {
      display: none !important;
    }

    /* Footer */
    html.${ROOT_CLASS} .adCont,
    html.${ROOT_CLASS} footer {
      color: var(--tm-muted) !important;
      background: transparent !important;
    }

    html.${ROOT_CLASS} footer {
      margin-top: 18px !important;
      padding: 18px 12px !important;
      border-top: 1px solid var(--tm-border);
    }

    html.${ROOT_CLASS} footer a {
      color: var(--tm-text-subtle) !important;
    }

    @media (max-width: 1100px) {
      html.${ROOT_CLASS} table.sortableTable2 th:nth-child(4),
      html.${ROOT_CLASS} table.sortableTable2 td:nth-child(4) {
        display: none !important;
      }

      html.${ROOT_CLASS} table.sortableTable2,
      html.${ROOT_CLASS} table.dataTable {
        min-width: 760px;
      }
    }

    @media (max-width: 991.98px) {
      html.${ROOT_CLASS} table.sortableTable2 .hideCell,
      html.${ROOT_CLASS} table.sortableTable .hideCell {
        display: none !important;
      }

      html.${ROOT_CLASS} table.sortableTable2,
      html.${ROOT_CLASS} table.dataTable {
        min-width: 0;
      }

      html.${ROOT_CLASS} table.sortableTable2 tbody td,
      html.${ROOT_CLASS} table.dataTable tbody td {
        padding: 10px 8px !important;
      }
    }

    @media (max-width: 767.98px) {
      html.${ROOT_CLASS} body.postBody.container {
        width: calc(100% - 14px) !important;
        margin: 7px auto !important;
      }

      html.${ROOT_CLASS} .topnav > div:first-child {
        min-height: 62px;
        margin-bottom: 8px;
        padding: 9px 11px;
        flex-wrap: wrap;
      }

      html.${ROOT_CLASS} .logo {
        width: 122px !important;
      }

      html.${ROOT_CLASS} .postContUp {
        display: flex !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 2px 0 4px !important;
        order: 3;
        flex: 1 0 100%;
        flex-wrap: nowrap;
        justify-content: flex-start;
        overflow-x: auto;
        scrollbar-color: var(--tm-scrollbar) transparent;
        scrollbar-width: thin;
      }

      html.${ROOT_CLASS} .icon.showMob {
        margin-left: auto;
      }

      html.${ROOT_CLASS} #myLinks {
        width: 100%;
        order: 4;
        flex: 1 0 100%;
      }

      html.${ROOT_CLASS} #myLinks button {
        width: 100% !important;
        margin-top: 6px !important;
      }

      html.${ROOT_CLASS} .topnav > .row {
        display: block;
      }

      html.${ROOT_CLASS} .leftNav {
        display: none !important;
      }

      html.${ROOT_CLASS} .postCont,
      html.${ROOT_CLASS} .postContL {
        width: 100% !important;
        padding: 9px !important;
        border-radius: 12px;
      }

      html.${ROOT_CLASS} .tm-rarbg-toolbar {
        min-height: 0;
        padding: 12px;
        align-items: flex-start;
      }

      html.${ROOT_CLASS} .tm-rarbg-context {
        display: none;
      }

      html.${ROOT_CLASS} .tm-rarbg-extras-toggle {
        min-height: 34px;
        padding: 7px 10px;
      }

      html.${ROOT_CLASS} .tm-rarbg-search-section {
        padding: 10px !important;
      }

      html.${ROOT_CLASS} #form_search .search {
        gap: 5px;
      }

      html.${ROOT_CLASS} .tm-rarbg-filter-bar {
        padding: 9px !important;
      }

      html.${ROOT_CLASS} #flist {
        width: 100% !important;
        flex-basis: 100%;
      }

      html.${ROOT_CLASS} .tm-rarbg-filter-bar > div {
        width: 100%;
      }

      html.${ROOT_CLASS} .tm-rarbg-catalog-title,
      html.${ROOT_CLASS} .tm-rarbg-catalog-picker,
      html.${ROOT_CLASS} .tm-rarbg-catalog-links {
        margin-bottom: 9px !important;
        padding: 12px !important;
      }

      html.${ROOT_CLASS} .tm-rarbg-catalog-picker table {
        width: 100%;
      }

      html.${ROOT_CLASS} .tm-rarbg-catalog-picker td {
        width: 50%;
      }

      html.${ROOT_CLASS} .tm-rarbg-catalog-picker .buttonalink {
        width: 100%;
        min-width: 0;
      }

      html.${ROOT_CLASS} .tm-rarbg-catalog-links {
        gap: 6px;
      }

      html.${ROOT_CLASS} table.sortableTable2,
      html.${ROOT_CLASS} table.dataTable {
        min-width: 0;
      }

      html.${ROOT_CLASS} .page-item .page-link,
      html.${ROOT_CLASS} .tm-rarbg-pagination-row .pagination > .page-link {
        min-width: 32px;
        min-height: 32px;
        padding: 6px 8px !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      html.${ROOT_CLASS} *,
      html.${ROOT_CLASS} *::before,
      html.${ROOT_CLASS} *::after {
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
      }
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.id = 'tm-rarbg-modern-theme-styles';
  styleElement.textContent = styles;
  (document.head || document.documentElement).append(styleElement);

  function decodePathValue(value) {
    try {
      return decodeURIComponent(value).replace(/\+/g, ' ');
    } catch {
      return value.replace(/\+/g, ' ');
    }
  }

  function describeTimeWindow(rawValue) {
    const match = /^(\d+)([HDWMY])$/i.exec(rawValue || '');
    if (!match) return '';

    const amount = Number(match[1]);
    const unitNames = {
      H: ['hour', 'hours'],
      D: ['day', 'days'],
      W: ['week', 'weeks'],
      M: ['month', 'months'],
      Y: ['year', 'years'],
    };
    const names = unitNames[match[2].toUpperCase()];
    if (!names) return '';

    return `Last ${amount} ${amount === 1 ? names[0] : names[1]}`;
  }

  function readPageContext() {
    if (isHomePage) {
      root.classList.remove(CATEGORY_PAGE_CLASS);
      return {
        title: 'Latest torrents',
        context: 'Top 10 by category',
      };
    }

    const categoryMatch = /(?:^|[/:])category:([^/:]+)/i.exec(location.pathname);
    const timeMatch = /(?:^|:)time:([^/:]+)/i.exec(location.pathname);
    const keywordMatch = /(?:^|\/)keywords:([^/:]+)/i.exec(location.pathname);

    const category = categoryMatch ? decodePathValue(categoryMatch[1]) : '';
    const timeWindow = timeMatch ? describeTimeWindow(decodePathValue(timeMatch[1])) : '';
    const keyword = keywordMatch ? decodePathValue(keywordMatch[1]) : '';

    root.classList.toggle(CATEGORY_PAGE_CLASS, Boolean(category));

    const title =
      category && keyword
        ? `${category} torrents matching “${keyword}”`
        : category
          ? `${category} torrents`
          : keyword
            ? `Results for “${keyword}”`
            : 'Torrent results';

    return {
      title,
      context: timeWindow || 'TheRARBG listing',
    };
  }

  function makeElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function addPaletteControl() {
    const headerNavigation = document.querySelector('.postContUp');
    if (!headerNavigation || document.getElementById('tm-rarbg-palette-select')) return;

    const control = makeElement('label', 'tm-rarbg-palette-control');
    const caption = makeElement('span', 'tm-rarbg-palette-label', 'Colour');
    const select = makeElement('select', 'tm-rarbg-palette-select');
    select.id = 'tm-rarbg-palette-select';
    select.setAttribute('aria-label', 'Dark colour palette');

    for (const [value, label] of PALETTE_OPTIONS) {
      const option = makeElement('option', '', label);
      option.value = value;
      select.append(option);
    }

    select.value = initialPalette;
    select.addEventListener('change', () => {
      select.value = applyPalette(select.value, true);
    });

    control.append(caption, select);
    headerNavigation.append(control);
  }

  function markSections(postContainer) {
    postContainer.querySelector('.banner-box.movie')?.classList.add('tm-rarbg-extra-section');
    postContainer.querySelector('#searchTags')?.closest('.row')?.classList.add('tm-rarbg-extra-section');
    postContainer
      .querySelector('.recent-search-wrapper')
      ?.closest('.row')
      ?.classList.add('tm-rarbg-extra-section');

    postContainer.querySelector('#form_search')?.closest('.row')?.classList.add('tm-rarbg-search-section');

    const table = postContainer.querySelector('table.sortableTable2');
    const resultsRow = table?.closest('.row.p-1');
    resultsRow?.classList.add('tm-rarbg-results-row');

    if (resultsRow) {
      const filterBar = [...resultsRow.children].find((child) => child.querySelector?.('#flist'));
      filterBar?.classList.add('tm-rarbg-filter-bar');
    }

    postContainer.querySelectorAll('.pagination').forEach((pagination) => {
      pagination.closest('.row')?.classList.add('tm-rarbg-pagination-row');
    });

    const extraSections = [...postContainer.querySelectorAll('.tm-rarbg-extra-section')];
    extraSections.forEach((section, index) => {
      if (!section.id) section.id = `tm-rarbg-extra-section-${index + 1}`;
    });

    return extraSections;
  }

  function markCatalogPage(postContainer) {
    const catalogTitle = postContainer.querySelector(':scope > .row > b');
    catalogTitle?.parentElement?.classList.add('tm-rarbg-catalog-title');

    const [pickerHeading, listsHeading] = postContainer.querySelectorAll('h2');
    pickerHeading?.closest('.row')?.classList.add('tm-rarbg-catalog-picker');
    listsHeading?.parentElement?.parentElement?.classList.add('tm-rarbg-catalog-links');

    const genre = postContainer.querySelector('.catalog-genre');
    if (genre && !genre.textContent.trim() && genre.children.length === 0) {
      genre.closest('.row')?.classList.add('tm-rarbg-empty-catalog-row');
    }
  }

  function labelSearchControls(container) {
    const searchButton = container.querySelector('#form_search .searchButton');
    if (searchButton && !searchButton.hasAttribute('aria-label')) {
      searchButton.setAttribute('aria-label', 'Search');
    }

    const filterButton = container.querySelector('#filterBtn');
    if (!filterButton) return;

    filterButton.setAttribute('aria-label', 'Toggle search filters');
    filterButton.setAttribute('aria-controls', 'filterOption');

    const updateExpandedState = () => {
      filterButton.setAttribute('aria-expanded', String(filterButton.classList.contains('open')));
    };

    updateExpandedState();
    window.setTimeout(updateExpandedState, 0);
    filterButton.addEventListener('click', () => {
      window.requestAnimationFrame(updateExpandedState);
    });
  }

  function addToolbar(postContainer, extraSections) {
    if (!isToolbarPage || document.getElementById('tm-rarbg-theme-toolbar')) return;

    const pageContext = readPageContext();
    const toolbar = makeElement('section', 'tm-rarbg-toolbar');
    toolbar.id = 'tm-rarbg-theme-toolbar';
    toolbar.setAttribute('aria-label', 'TheRARBG theme controls');

    const heading = makeElement('div', 'tm-rarbg-heading');
    const titleTag = postContainer.querySelector('h1') ? 'h2' : 'h1';
    heading.append(
      makeElement('span', 'tm-rarbg-kicker', 'TheRARBG'),
      makeElement(titleTag, 'tm-rarbg-title', pageContext.title),
      makeElement('span', 'tm-rarbg-context', pageContext.context),
    );

    const extrasButton = makeElement('button', 'tm-rarbg-extras-toggle');
    extrasButton.type = 'button';
    extrasButton.setAttribute('aria-controls', extraSections.map((section) => section.id).join(' '));

    const updateExtrasButton = () => {
      const isOpen = root.classList.contains(SHOW_EXTRAS_CLASS);
      extrasButton.textContent = isOpen ? 'Hide extras' : 'Show extras';
      extrasButton.setAttribute('aria-expanded', String(isOpen));
    };

    extrasButton.addEventListener('click', () => {
      const isOpen = root.classList.toggle(SHOW_EXTRAS_CLASS);
      try {
        localStorage.setItem(EXTRAS_STORAGE_KEY, String(isOpen));
      } catch {
        // See the storage note near initialisation.
      }
      updateExtrasButton();
    });

    updateExtrasButton();
    toolbar.append(heading);
    if (extraSections.length > 0) toolbar.append(extrasButton);
    postContainer.prepend(toolbar);
  }

  const knownAdHosts = [
    'discussioncomperesteel.com',
    'portalfluently.com',
    'grop.net',
  ];

  function isKnownAdHost(hostname) {
    const normalisedHost = hostname.toLowerCase();
    return knownAdHosts.some(
      (knownHost) => normalisedHost === knownHost || normalisedHost.endsWith(`.${knownHost}`),
    );
  }

  function hideKnownClickCatchers() {
    if (!document.body) return;

    for (const element of [...document.body.children]) {
      if (element.classList.contains('topnav')) continue;

      const computedStyle = getComputedStyle(element);
      const zIndex = Number.parseInt(computedStyle.zIndex, 10);
      const bounds = element.getBoundingClientRect();
      const coversViewport =
        bounds.width >= window.innerWidth * 0.8 && bounds.height >= window.innerHeight * 0.8;

      if (computedStyle.position !== 'fixed' || zIndex < 1000000 || !coversViewport) continue;

      const hasKnownAdLink = [...element.querySelectorAll('a[href]')].some((link) => {
        try {
          return isKnownAdHost(new URL(link.href, location.href).hostname);
        } catch {
          return false;
        }
      });

      if (hasKnownAdLink) element.classList.add('tm-rarbg-known-click-catcher');
    }
  }

  function initialiseTheme() {
    const postContainer = document.querySelector('.postCont');

    addPaletteControl();
    labelSearchControls(document);

    if (postContainer && isCatalogPage) markCatalogPage(postContainer);

    if (postContainer && isToolbarPage) {
      const extraSections = markSections(postContainer);
      addToolbar(postContainer, extraSections);
    }

    hideKnownClickCatchers();

    // Advertising click-catchers can be injected shortly after page load.
    // Check for a bounded ten-second window instead of keeping a permanent
    // MutationObserver or timer alive for the entire session.
    let checksRemaining = 20;
    const overlayTimer = window.setInterval(() => {
      hideKnownClickCatchers();
      checksRemaining -= 1;
      if (checksRemaining <= 0) window.clearInterval(overlayTimer);
    }, 500);

    window.addEventListener('pagehide', () => window.clearInterval(overlayTimer), { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseTheme, { once: true });
  } else {
    initialiseTheme();
  }
})();
