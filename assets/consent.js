/* Rodal Anti-Slip Solutions cookie consent -> Google Analytics.

   Analytics cookies may only be set with permission, so nothing Google-related
   loads until the visitor clicks Accept. The choice is remembered in
   localStorage (storing the choice itself is strictly necessary, so it needs no
   consent) and can be changed later via the "Cookie settings" link this script
   adds to the footer.

   Rejecting is exactly as easy as accepting, and both buttons look the same.
   Closing the page without choosing counts as no consent: nothing is loaded.

   NOTE: when a privacy policy page exists, add a link to it in the banner text
   below (see POLICY_LINK). */
(function () {
  // Google Analytics property for www.rodal.co.uk.
  var MEASUREMENT_ID = "G-7B5XFCHS1D";

  // Set this to "privacy-policy.html" once that page exists.
  var POLICY_LINK = "";

  var KEY = "rodal-analytics-consent";

  function choice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function remember(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* private browsing */ }
  }

  function loadAnalytics() {
    if (!MEASUREMENT_ID || MEASUREMENT_ID.indexOf("__") === 0) return;
    if (window.__analyticsLoaded) return;
    window.__analyticsLoaded = true;

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID);
  }

  function styles() {
    if (document.getElementById("consent-styles")) return;
    var css = document.createElement("style");
    css.id = "consent-styles";
    css.textContent =
      ".consent-bar{position:fixed;left:0;right:0;bottom:0;z-index:200;" +
        "background:#101820;color:#e6e9ec;padding:16px 24px;" +
        "border-top:2px solid #d81f26;box-shadow:0 -4px 18px rgba(0,0,0,.3);" +
        "font-size:14.5px;line-height:1.55;}" +
      ".consent-bar .inner{max-width:1180px;margin:0 auto;display:flex;gap:20px;" +
        "align-items:center;justify-content:space-between;flex-wrap:wrap;}" +
      ".consent-bar p{margin:0;max-width:70ch;color:#e6e9ec;}" +
      ".consent-bar a{color:#ff6b70;}" +
      ".consent-bar .buttons{display:flex;gap:10px;flex-shrink:0;}" +
      ".consent-bar button{font:inherit;font-weight:700;padding:11px 24px;" +
        "border-radius:999px;border:2px solid #d81f26;background:transparent;" +
        "color:#fff;cursor:pointer;}" +
      ".consent-bar button:hover{background:rgba(216,31,38,.22);}" +
      ".consent-link{background:none;border:0;color:inherit;font:inherit;" +
        "text-decoration:underline;cursor:pointer;padding:0;}" +
      "@media (max-width:900px){.consent-bar{padding:14px 18px;}" +
        ".consent-bar .buttons{width:100%;}.consent-bar button{flex:1;}}";
    document.head.appendChild(css);
  }

  function hide() {
    var bar = document.getElementById("consent-bar");
    if (bar) bar.parentNode.removeChild(bar);
  }

  function show() {
    if (document.getElementById("consent-bar")) return;
    styles();
    var link = POLICY_LINK
      ? ' <a href="' + POLICY_LINK + '">Read our privacy policy</a>.'
      : "";
    var bar = document.createElement("div");
    bar.className = "consent-bar";
    bar.id = "consent-bar";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Cookies");
    bar.innerHTML =
      '<div class="inner">' +
        "<p>We would like to count visits to this site using Google Analytics, " +
        "which sets cookies. It tells us how many people visit and which pages " +
        "are read — it does not identify you, and we do not use it for " +
        "advertising. It is entirely your choice and the site works the same " +
        "either way." + link + "</p>" +
        '<div class="buttons">' +
          '<button type="button" id="consent-no">No thanks</button>' +
          '<button type="button" id="consent-yes">Accept</button>' +
        "</div>" +
      "</div>";
    document.body.appendChild(bar);

    document.getElementById("consent-yes").addEventListener("click", function () {
      remember("yes"); hide(); loadAnalytics();
    });
    document.getElementById("consent-no").addEventListener("click", function () {
      remember("no"); hide();
    });
  }

  // "Cookie settings" in the footer, so the choice can always be changed.
  function footerLink() {
    var row = document.querySelector("footer .foot-bottom");
    if (!row) return;
    var span = document.createElement("span");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "consent-link";
    btn.textContent = "Cookie settings";
    btn.addEventListener("click", function () { styles(); show(); });
    span.appendChild(btn);
    row.appendChild(span);
  }

  function start() {
    footerLink();
    var made = choice();
    if (made === "yes") loadAnalytics();
    else if (made !== "no") { styles(); show(); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
