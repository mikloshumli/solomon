# Solomon – a theme for Redmine 6 and 7

Solomon is a clean, modern theme for **Redmine 6** and **Redmine 7**: a soft purple glass look, card-style issue lists,
colored status/priority pills, a restyled login page, issue details, calendar and sidebar –
and **10 color variants** you can switch from a gear icon on the right edge of every page.

Website: **https://www.redmine-solomon.onlinemegjelenes.com**

Version: **1.0.3** · License: **GPL-2.0-or-later** (see `LICENSE`)

## Features

- Glass-style header, tabs and project jump dropdown
- Issue lists as rounded rows, status and priority pills, thin progress bars, strong row selection
- Restyled issue page, calendar, sidebar, flash messages and the "no data" state
- Login page with a glass card that tilts with the mouse
- Color theme picker (10 palettes) in a slide-in aside; the choice is remembered in the browser
- English and Hungarian UI texts (follows the Redmine language)

## Which folder do I need?

The same theme ships in two builds, one per Redmine major version. They look the same;
only the parts that follow Redmine's own markup differ (top bar, account menu, main menu, issue history).

| Your Redmine | Folder |
|---|---|
| 6.x | `solomonRM6/` |
| 7.x | `solomonRM7/` |

## Install

1. Copy the folder that matches your Redmine version into the `themes/` folder of your Redmine.
   You may rename it (for example to `solomon`); the folder name is the theme name Redmine shows.
2. Precompile assets and restart the app (Redmine 6 and 7 use Propshaft):
   ```bash
   RAILS_ENV=production bundle exec rake assets:precompile
   touch tmp/restart.txt   # Passenger; restart your app server otherwise
   ```
3. In Redmine: **Administration → Settings → Display → Theme**, pick the Solomon theme.

When you upgrade Redmine from 6 to 7, replace the theme folder with the `solomonRM7` build
(keep the same folder name), then precompile and restart again.

The theme's `application.css` starts with `@import url(/application.css);`, which loads Redmine's own
stylesheet first – do not remove that line.

## Demo

The `demo/` folder contains static pages built with the real theme files (lorem ipsum data), once with
Redmine 6 markup (`demo/rm6/`) and once with Redmine 7 markup (`demo/rm7/`): login, My page, issue details.
Open `demo/index.html` in a browser, or enable GitHub Pages for this repository and open `/demo/`.

## Compatibility and known limits

- `solomonRM6` is built and used daily on **Redmine 6.0**. `solomonRM7` is built against the
  **Redmine 7.0** markup and stylesheets. Pages that the author does not use daily
  (settings, wiki, repository, ...) may show small differences – issues and pull requests are welcome.
- Status and priority pill colors are matched by name (Redmine default English names and Hungarian names).
  Custom status names get the neutral pill color; add your own names in `javascripts/theme.js`
  (`statusClass`, `priorityClass`).
- Uses modern CSS (`:has()`, `color-mix()`), so a current browser is required.

## License

GPL-2.0-or-later, the same family as Redmine. See `LICENSE`.

