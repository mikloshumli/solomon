# Solomon – a Redmine 6 theme

Solomon is a clean, modern theme for **Redmine 6**: a soft purple glass look, card-style issue lists,
colored status/priority pills, a restyled login page, issue details, calendar and sidebar –
and **10 color variants** you can switch from a gear icon on the right edge of every page.

Version: **1.0.0** · License: **GPL-2.0-or-later** (see `LICENSE`)

## Features

- Glass-style header, tabs and project jump dropdown
- Issue lists as rounded rows, status and priority pills, thin progress bars, strong row selection
- Restyled issue page, calendar, sidebar, flash messages and the "no data" state
- Login page with a glass card that tilts with the mouse
- Color theme picker (10 palettes) in a slide-in aside; the choice is remembered in the browser
- English and Hungarian UI texts (follows the Redmine language)

## Install

1. Copy `themes/solomon` into the `themes/` folder of your Redmine.
2. Precompile assets and restart the app (Redmine 6 uses Propshaft):
   ```bash
   RAILS_ENV=production bundle exec rake assets:precompile
   touch tmp/restart.txt   # Passenger; restart your app server otherwise
   ```
3. In Redmine: **Administration → Settings → Display → Theme → Solomon**.

The theme's `application.css` starts with `@import url(/application.css);`, which loads Redmine's own
stylesheet first – do not remove that line.

## Demo

The `demo/` folder contains static pages built with the real theme files (lorem ipsum data):
`demo/login.html`, `demo/dashboard.html`, `demo/issue.html`. Open them in a browser, or enable
GitHub Pages for this repository and open `/demo/`.

## Compatibility and known limits

- Built and used on **Redmine 6.0**. Other pages that the author did not use daily
  (settings, wiki, repository, ...) may show small differences – issues and pull requests are welcome.
- Status and priority pill colors are matched by name (Redmine default English names and Hungarian names).
  Custom status names get the neutral pill color; add your own names in `themes/solomon/javascripts/theme.js`
  (`statusClass`, `priorityClass`).
- Uses modern CSS (`:has()`, `color-mix()`), so a current browser is required.

## License

GPL-2.0-or-later, the same family as Redmine. See `LICENSE`.

