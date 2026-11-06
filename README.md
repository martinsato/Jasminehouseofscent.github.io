# Jasmine Scents and Blooms – website

A simple, fast website for a flower and perfume shop in Kisii. Customers order on WhatsApp and pay by M-Pesa. It needs no database and can be hosted for free on Netlify or GitHub Pages.

## How it is organised

The **design** (HTML, CSS, JavaScript) is separate from the **content** (two data files). For everyday updates you only touch the data files and the images folder.

```
jasmine-website/
├── data/
│   ├── products.json   ← all products and prices (edit this most often)
│   └── site.json       ← phone numbers, shops, hours, FAQ, story, reviews
├── images/
│   └── products/       ← product photos
├── index.html          ← Home
├── shop.html           ← Shop
├── events.html         ← Weddings & Events
├── about.html          ← About
├── contact.html        ← Contact, maps, FAQ
├── css/style.css       ← colours and design (change once, applies everywhere)
└── js/main.js          ← builds the pages from the data (no need to edit)
```

The header, menu and footer are written once in `js/main.js` and appear on every page automatically.

## Add a new product

1. Put the photo in `images/products/`, for example `white-lilies.jpg`. Square photos look best (around 1000 × 1000 px).
2. Open `data/products.json` and copy an existing product block, from `{` to `}`.
3. Paste it at the end of the list, before the final `]`, and add a comma after the previous block.
4. Change the details:

```json
{
  "name": "White Lily Bouquet",
  "category": "flowers",
  "price": 2800,
  "priceFrom": false,
  "description": "Elegant white lilies wrapped in cream paper.",
  "image": "images/products/white-lilies.jpg",
  "occasions": ["Sympathy", "Mother's Day"],
  "featured": false,
  "available": true
}
```

| Field | What it means |
|---|---|
| `category` | `flowers`, `perfumes` or `gifts` |
| `price` | Number only, no "KES" and no commas |
| `priceFrom` | `true` shows "from KES 2,800" |
| `occasions` | Must match the occasion names in `site.json` |
| `featured` | `true` shows it on the home page (the first 4 are shown) |
| `available` | `false` greys it out with "Currently unavailable" |

5. Save, then upload (push) to GitHub. Netlify updates the live site in about a minute.

**Change a price:** edit the `price` number. **Remove a product:** delete its block and the comma before it.

> Tip: if the site stops loading after an edit, a comma or quote is probably missing. Paste the file into https://jsonlint.com to find the error.

## Update shop details

Open `data/site.json` to change phone numbers, the WhatsApp number (digits only, starting with 254), opening hours, delivery areas, FAQ, the story and reviews.

To add customer reviews (only real ones, with the customer's permission):

```json
"reviews": [
  { "text": "The roses were stunning and arrived on time!", "name": "Mary, Kisii" }
]
```

The reviews section on the About page appears automatically once there is at least one review.

## Preview on your computer

Opening `index.html` by double-clicking will **not** load the products, because browsers block data files opened that way. Use a small local server instead:

```bash
cd jasmine-website
python -m http.server 8000
```

Then open http://localhost:8000. In VS Code, the "Live Server" extension does the same.

## Publish on Netlify (recommended)

1. Create a GitHub repository and upload this folder's contents.
2. In Netlify: **Add new site → Import an existing project → GitHub** and pick the repository.
3. Leave the build settings empty (publish directory: `/`). Click **Deploy**.
4. The site goes live at `something.netlify.app`. Rename it under **Site settings → Change site name**.
5. Every time you push a change to GitHub, Netlify republishes automatically.

**GitHub Pages instead:** in the repository go to **Settings → Pages → Deploy from a branch → main / root**.

**Own domain later:** buy, for example, `jasminescentsandblooms.co.ke` and connect it under Netlify's **Domain management**.

## Before going live – checklist

- [ ] Confirm phone and WhatsApp numbers in `site.json` (marked CONFIRM)
- [ ] Confirm Shop B location (Hema Shopping Centre or Hema hospital?)
- [ ] Replace sample products with real products, prices and photos
- [ ] Add social media links and M-Pesa till/paybill number (optional)
- [ ] Check both map pins point to the right place
- [ ] Add a real logo when ready (`images/logo-mark.svg`)
