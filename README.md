# Kousik Gunasekaran: portfolio

A static site with no build step. Each page is its own HTML file, and all of them share `styles.css` and `script.js`.

| Page | File |
| --- | --- |
| Home | `index.html` |
| Experience | `experience.html` |
| Projects | `projects.html` |
| Labs | `labs.html` |
| Skills | `skills.html` |
| Education and certifications | `education.html` |
| Contact | `contact.html` |

## Run locally

```bash
python -m http.server 4174
```

Then open http://localhost:4174.

## Deploy

Upload this folder as is to GitHub Pages, Netlify, Vercel or Cloudflare Pages. There is no build command.

## Edit

- A job: copy an `<article class="job">` block in `experience.html`.
- A project: copy an `<article class="card" data-cat="...">` block in `projects.html`. Categories are `detection`, `cloud`, `ai`, `offense`, `architecture` and `apps`. Update the "Showing 17 projects" text and the Projects stat on Home if the count changes.
- A nav link: the menu is repeated in every page, in both the wide and mobile versions.
- The rotating "currently" phrases: the `data-phrases` attribute in `index.html`.
- Colors: the variables at the top of `styles.css`.

The contact form sends messages to your inbox through Web3Forms. To connect it, get a free access key at https://web3forms.com and replace `YOUR_WEB3FORMS_ACCESS_KEY` in `contact.html`. The key is designed to be public, so it is safe in the page source.
