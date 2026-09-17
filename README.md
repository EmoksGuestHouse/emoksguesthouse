# emoksguesthouse

Static site for Emoks Guest House Moalboal. Plain HTML/CSS/JS, no build step, deployed via Cloudflare Pages.

- `index.html` — the whole site (single page)
- `css/style.css`, `js/main.js`
- `assets/rooms/` — room photos

Per-room availability calendars are embedded via Google Calendar (public, read-only) and updated manually by staff as bookings come in. See the `calendar-placeholder` divs in `index.html` for where each room's calendar iframe goes once the calendars are set up.
