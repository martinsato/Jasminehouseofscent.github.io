/* ==========================================================
   Jasmine Scents and Blooms – site script
   You normally do NOT need to edit this file.
   Content comes from data/site.json and data/products.json.
   ========================================================== */

const NAV = [
  { href: "index.html", label: "Home" },
  { href: "shop.html", label: "Shop" },
  { href: "events.html", label: "Weddings & Events" },
  { href: "about.html", label: "About" },
  { href: "contact.html", label: "Contact" }
];

const CATEGORY_LABELS = { flowers: "Flowers", perfumes: "Perfumes", gifts: "Gifts & Extras" };

const ICONS = {
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.5c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-3.6.9 1-3.5-.2-.4C3.1 15.5 2.6 13.8 2.6 12 2.6 6.8 6.8 2.6 12 2.6S21.4 6.8 21.4 12 17.2 21.5 12 21.5zM12 .8C5.8.8.8 5.8.8 12c0 2 .5 3.9 1.5 5.6L.7 23.3l5.8-1.5c1.6.9 3.5 1.4 5.4 1.4 6.2 0 11.2-5 11.2-11.2C23.2 5.8 18.2.8 12 .8z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
  flower: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="10" r="2.2"/><path d="M12 7.8C10 3 7 5 9.9 9.3M14.1 9.3C17 5 14 3 12 7.8M14 11.5c4.5 1.5 4.5-2.5 0-1.8M10 11.5c-4.5 1.5-4.5-2.5 0-1.8M12 12.2V21M12 17c2-2 4-2 5-1.5"/></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 11h16v10H4zM3 7h18v4H3zM12 7v14M12 7S10 3 8 4s0 3 4 3zM12 7s2-4 4-3 0 3-4 3z"/></svg>',
  mpesa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 18.5h4M9 8h6M9 11h6"/></svg>'
};

/* ---------- helpers ---------- */
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const money = n => "KES " + Number(n).toLocaleString("en-KE");
const $ = sel => document.querySelector(sel);

function waLink(site, message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
function telLink(num) { return "tel:" + num.replace(/[^\d+]/g, ""); }
function mapEmbed(query) { return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`; }
function mapLink(query) { return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`; }

async function loadJSON(path) {
  const res = await fetch(path, { cache: "no-cache" });
  if (!res.ok) throw new Error("Could not load " + path);
  return res.json();
}

/* ---------- shared header & footer ---------- */
function renderHeader(site) {
  const current = location.pathname.split("/").pop() || "index.html";
  const links = NAV.map(n => `<a href="${n.href}" class="${n.href === current ? "active" : ""}">${n.label}</a>`).join("");
  $("#site-header").innerHTML = `
    <header class="site-header">
      <div class="container">
        <a class="brand" href="index.html" aria-label="${esc(site.businessName)} home">
          <img src="images/logo-mark.svg" alt="">
          <span class="brand-text"><span class="brand-name">Jasmine</span><span class="brand-sub">Scents &amp; Blooms</span></span>
        </a>
        <button class="nav-toggle" aria-label="Open menu" aria-expanded="false">${ICONS.menu}</button>
        <nav class="nav">
          ${links}
          <a class="btn btn--small" href="${waLink(site, "Hello Jasmine Scents and Blooms! I'd like to place an order.")}" target="_blank" rel="noopener">${ICONS.whatsapp} Order</a>
        </nav>
      </div>
    </header>`;
  const toggle = $(".nav-toggle"), nav = $(".nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

function renderFooter(site) {
  const socials = Object.entries(site.socials || {}).filter(([, url]) => url)
    .map(([name, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener">${name[0].toUpperCase() + name.slice(1)}</a></li>`).join("");
  $("#site-footer").innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h4>${esc(site.businessName)}</h4>
            <p>${esc(site.tagline)}. Fresh flowers, fine fragrances and curated gifts in Kisii.</p>
            <p class="swahiliText">Tunaleta furaha kwa kila tukio.</p>
          </div>
          <div>
            <h4>Visit us</h4>
            <ul>${site.shops.map(s => `<li><a href="${mapLink(s.mapQuery)}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              ${site.phones.map(p => `<li><a href="${telLink(p)}">${esc(p)}</a></li>`).join("")}
              <li><a href="${waLink(site, "Hello!")}" target="_blank" rel="noopener">WhatsApp us</a></li>
              ${site.email ? `<li><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>` : ""}
            </ul>
          </div>
          <div>
            <h4>Opening hours</h4>
            <ul>${site.openingHours.map(h => `<li>${esc(h.days)}<br>${esc(h.hours)}</li>`).join("")}</ul>
            ${socials ? `<h4 style="margin-top:18px">Follow us</h4><ul>${socials}</ul>` : ""}
          </div>
        </div>
        <div class="footer-bottom">© ${new Date().getFullYear()} ${esc(site.businessName)} · Kisii, Kenya</div>
      </div>
    </footer>
    <a class="wa-float" href="${waLink(site, "Hello Jasmine Scents and Blooms!")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ICONS.whatsapp}</a>`;
}

/* ---------- product card ---------- */
function productCard(site, p) {
  const priceText = (p.priceFrom ? "<small>from</small>" : "") + money(p.price);
  const msg = `Hello! I'd like to order: ${p.name} (${p.priceFrom ? "from " : ""}${money(p.price)}). Is it available?`;
  const button = p.available === false
    ? `<span class="btn btn--outline btn--small" aria-disabled="true">Currently unavailable</span>`
    : `<a class="btn btn--dark" href="${waLink(site, msg)}" target="_blank" rel="noopener">${ICONS.whatsapp} Order on WhatsApp</a>`;
  return `
    <article class="card ${p.available === false ? "sold-out" : ""}">
      <div class="card-img">
        <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">
        <span class="card-tag">${CATEGORY_LABELS[p.category] || esc(p.category)}</span>
      </div>
      <div class="card-body">
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.description)}</p>
        <div class="price">${priceText}</div>
        ${button}
      </div>
    </article>`;
}

/* ---------- pages ---------- */
const pages = {

  home(site, products) {
    $("#hero-greeting").textContent = site.swahiliGreeting;
    $("#hero-title").textContent = site.heroTitle;
    $("#hero-text").textContent = site.heroText;
    $("#hero-img").src = site.heroImage;
    $("#hero-order").href = waLink(site, "Hello! I'd like to place an order.");
    $("#hero-cutoff").textContent = `Order before ${site.sameDayCutoff}`;

    $("#strip").innerHTML = [
      `Same-day delivery for orders before ${site.sameDayCutoff}`,
      `Delivering to ${site.deliveryAreas.join(", ")}`,
      "Pay easily with M-Pesa"
    ].map(t => `<span>${esc(t)}</span>`).join("");

    $("#tiles").innerHTML = Object.entries(CATEGORY_LABELS).map(([key, label]) => {
      const first = products.find(p => p.category === key);
      const count = products.filter(p => p.category === key).length;
      return `<a class="tile" href="shop.html?category=${key}">
        <img src="${esc(first ? first.image : site.heroImage)}" alt="">
        <div class="tile-label"><h3>${label}</h3><span>${count} item${count === 1 ? "" : "s"} · Shop now →</span></div>
      </a>`;
    }).join("");

    const featured = products.filter(p => p.featured && p.available !== false).slice(0, 4);
    $("#featured").innerHTML = featured.map(p => productCard(site, p)).join("");

    $("#occasions").innerHTML = site.occasions
      .map(o => `<a class="occasion" href="shop.html?occasion=${encodeURIComponent(o)}">${esc(o)}</a>`).join("");

    $("#cta-order").href = waLink(site, "Hello! I'd like help choosing a gift.");
  },

  shop(site, products) {
    const params = new URLSearchParams(location.search);
    const state = {
      category: params.get("category") || "all",
      occasion: params.get("occasion") || "",
      search: ""
    };
    const chips = $("#chips"), grid = $("#products"), occ = $("#occasion"), search = $("#search");

    chips.innerHTML = [["all", "All"], ...Object.entries(CATEGORY_LABELS)]
      .map(([k, l]) => `<button class="chip" data-cat="${k}">${l}</button>`).join("");
    occ.innerHTML = `<option value="">All occasions</option>` +
      site.occasions.map(o => `<option>${esc(o)}</option>`).join("");
    occ.value = state.occasion;

    function draw() {
      chips.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.cat === state.category));
      const q = state.search.toLowerCase();
      const list = products.filter(p =>
        (state.category === "all" || p.category === state.category) &&
        (!state.occasion || (p.occasions || []).includes(state.occasion)) &&
        (!q || (p.name + " " + p.description).toLowerCase().includes(q)));
      grid.innerHTML = list.length
        ? list.map(p => productCard(site, p)).join("")
        : `<p class="empty">Nothing here yet. <a href="${waLink(site, "Hello! I'm looking for something special.")}" target="_blank" rel="noopener">Ask us on WhatsApp</a>. We can make it for you.</p>`;
    }
    chips.addEventListener("click", e => { if (e.target.dataset.cat) { state.category = e.target.dataset.cat; draw(); } });
    occ.addEventListener("change", () => { state.occasion = occ.value; draw(); });
    search.addEventListener("input", () => { state.search = search.value; draw(); });
    $("#extras").textContent = site.extras.join(" · ");
    draw();
  },

  events(site) {
    $("#event-list").innerHTML = site.events
      .map(e => `<div class="panel"><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></div>`).join("");
    const form = $("#event-form");
    form.addEventListener("submit", e => {
      e.preventDefault();
      const d = new FormData(form);
      const msg = [
        "Hello! I'd like to enquire about flowers for an event.",
        `Event: ${d.get("type")}`,
        `Date: ${d.get("date") || "not decided"}`,
        `Location: ${d.get("location") || "-"}`,
        `Budget: ${d.get("budget") || "-"}`,
        `Details: ${d.get("details") || "-"}`,
        `My name: ${d.get("name")}`
      ].join("\n");
      window.open(waLink(site, msg), "_blank", "noopener");
    });
  },

  about(site) {
    $("#story").innerHTML = site.story.map(p => `<p>${esc(p)}</p>`).join("");
    const reviewsSection = $("#reviews-section");
    if (site.reviews && site.reviews.length) {
      $("#reviews").innerHTML = site.reviews
        .map(r => `<blockquote class="panel review">“${esc(r.text)}”<cite>— ${esc(r.name)}</cite></blockquote>`).join("");
    } else {
      reviewsSection.remove();
    }
  },

  contact(site) {
    $("#shops").innerHTML = site.shops.map(s => `
      <div class="panel shop-card">
        <iframe src="${mapEmbed(s.mapQuery)}" loading="lazy" title="Map: ${esc(s.name)}" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div class="shop-info">
          <h3>${esc(s.name)}</h3>
          <span class="label">Address</span>
          <p>${esc(s.address)}</p>
          <span class="label">How to find us</span>
          <p>${esc(s.directions)}</p>
          <a class="btn btn--outline btn--small" href="${mapLink(s.mapQuery)}" target="_blank" rel="noopener">Open in Google Maps</a>
        </div>
      </div>`).join("");

    $("#contact-list").innerHTML =
      site.phones.map(p => `<li>Call:&nbsp;<a href="${telLink(p)}">${esc(p)}</a></li>`).join("") +
      `<li>WhatsApp: <a href="${waLink(site, "Hello!")}" target="_blank" rel="noopener">+${esc(site.whatsapp)}</a></li>` +
      (site.email ? `<li>Email: <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>` : "") +
      (site.mpesa ? `<li>M-Pesa: ${esc(site.mpesa)}</li>` : "");
    $("#hours").innerHTML = site.openingHours.map(h => `<li><span>${esc(h.days)}</span><span>${esc(h.hours)}</span></li>`).join("");
    $("#delivery").innerHTML = `<p>${esc(site.deliveryNote)}</p><p><strong>Areas:</strong> ${esc(site.deliveryAreas.join(", "))}</p><p><strong>Same-day delivery:</strong> order before ${esc(site.sameDayCutoff)}.</p><p>${esc(site.returnsPolicy)}</p>`;
    $("#faq").innerHTML = site.faq.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");
  }
};

/* ---------- start ---------- */
(async function init() {
  try {
    const [site, products] = await Promise.all([loadJSON("data/site.json"), loadJSON("data/products.json")]);
    renderHeader(site);
    renderFooter(site);
    const page = document.body.dataset.page;
    if (pages[page]) pages[page](site, products);
  } catch (err) {
    console.error(err);
    document.body.insertAdjacentHTML("afterbegin",
      `<p style="background:#C9A24A;padding:12px;text-align:center;margin:0">The site content could not load. If you opened the file directly, run a local server (see README).</p>`);
  }
})();
