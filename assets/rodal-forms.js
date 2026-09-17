/* Rodal Anti-Slip Solutions enquiry form -> contact-form API
   (API Gateway + Lambda + SES, defined in the Tofu-iac repo).

   Derives each field's key from its <label>, so the email arrives with the same
   wording the visitor saw on the page. On success the form is hidden and the
   confirmation block (okId) is shown. */
(function () {
  // Set by the infrastructure — see `tofu output contact_form_endpoint` in
  // Tofu-iac/infra/environments/rodal-prod.
  var ENDPOINT = "__CONTACT_API_ENDPOINT__";

  function text(el) {
    return (el.textContent || "").replace(/\s+/g, " ").trim();
  }

  // Best-effort label for a control given the markup patterns on this site.
  function labelFor(ctrl) {
    // Checkboxes/radios are wrapped by their label.
    var wrap = ctrl.closest("label");
    if (wrap) return text(wrap);
    // Typical case: label is a sibling inside the same wrapper div.
    var container = ctrl.closest(".field") || ctrl.parentElement;
    if (container) {
      var lab = container.querySelector("label");
      if (lab) return text(lab);
    }
    // Fallbacks.
    var prev = ctrl.previousElementSibling;
    while (prev) {
      if (prev.tagName === "LABEL") return text(prev);
      prev = prev.previousElementSibling;
    }
    return ctrl.getAttribute("placeholder") || ctrl.name || "";
  }

  function collect(form) {
    var fields = {};
    form.querySelectorAll("input, textarea, select").forEach(function (ctrl) {
      var type = (ctrl.type || "").toLowerCase();
      if (ctrl.name === "_gotcha") return;
      if (type === "submit" || type === "button" || type === "hidden") return;

      var key = labelFor(ctrl);
      if (!key) return;

      if (type === "checkbox") {
        fields[key] = ctrl.checked ? "Yes" : "No";
      } else if (type === "radio") {
        if (ctrl.checked) fields[key] = ctrl.value;
      } else {
        var v = (ctrl.value || "").trim();
        if (v) fields[key] = v;
      }
    });
    return fields;
  }

  window.rodalSubmit = function (ev, okId, formName) {
    ev.preventDefault();
    var form = ev.target;
    var btn = form.querySelector('button[type="submit"]');
    var hp = form.querySelector('input[name="_gotcha"]');
    if (btn) btn.disabled = true;

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        form: formName || "Website enquiry",
        fields: collect(form),
        _gotcha: hp ? hp.value : "",
      }),
    })
      .then(function (r) {
        return r.json().catch(function () {
          return { ok: r.ok };
        });
      })
      .then(function (res) {
        if (!res || !res.ok) throw new Error((res && res.error) || "Failed");
        form.style.display = "none";
        var ok = document.getElementById(okId);
        if (ok) ok.style.display = "block";
      })
      .catch(function () {
        if (btn) btn.disabled = false;
        alert(
          "Sorry — your message couldn't be sent just now. Please call us free on 0800 002 9078 or try again shortly."
        );
      });

    return false;
  };
})();
