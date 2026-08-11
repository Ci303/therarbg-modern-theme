# TheRARBG Modern Results Theme

A local Tampermonkey userscript that gives TheRARBG a cleaner, responsive dark interface without changing the site's search, sorting, pagination or download behaviour.

## Features

- Restyles the home, results and catalogue pages.
- Includes 12 persistent dark palettes: Midnight, Black, Slate, Blue, Teal, Emerald, Olive, Amber, Crimson, Magenta, Purple and Espresso.
- Improves torrent-list text size, spacing, contrast and responsive behaviour.
- Restyles navigation, search controls, filters, catalogue tags and pagination.
- Corrects the appearance of malformed server-rendered pagination links.
- Adds a **Show extras** control for secondary carousel, tag and recent-search sections.
- Uses no external dependencies or privileged userscript APIs.

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser.
2. Open [therarbg-modern-theme.user.js](https://raw.githubusercontent.com/Ci303/therarbg-modern-theme/main/therarbg-modern-theme.user.js).
3. Confirm the installation in Tampermonkey.

The script runs only on `https://therarbg.com/*`.

## Palette selection

Use the **Colour** selector in the site's top navigation. Your selection is stored locally in the browser and restored on later visits.

## Scope and safety

This is a presentation-only userscript. It does not send credentials, call site APIs or add network requests. It cosmetically hides validated full-page click-catchers from known advertising hosts, but it does not stop their scripts or network activity; use a reputable content blocker for that.

This project is not affiliated with TheRARBG or Tampermonkey.
