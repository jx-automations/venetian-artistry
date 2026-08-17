/*
  calculator.js — the 4-step cost estimator on estimate.html.
  Reads pricing constants from data.js (PRICING, PROJECT_TYPES). All
  calculation happens client-side; nothing is sent anywhere. Guards
  against NaN / negative / zero at every step.
*/

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#estimator");
  if (!root) return; // not on this page

  const state = {
    step: 1,
    projectType: null,
    area: 40,
    tier: null, // 'classic' | 'premium' | 'exotic'
    propertyType: null, // 'residential' | 'commercial'
  };

  const totalSteps = 4;
  const panels = root.querySelectorAll(".estimator-panel");
  const stepDots = root.querySelectorAll(".estimator-steps li");
  const backBtn = root.querySelector("[data-action='back']");
  const nextBtn = root.querySelector("[data-action='next']");
  const resultPanel = root.querySelector("#estimator-result");
  let showingResult = false;

  renderProjectTypeOptions();
  renderTierOptions();
  bindArea();
  bindPropertyType();
  bindNav();
  updateUI();

  // ---- Step transitions: brief GSAP fade/slide between panels, degrading
  // to an instant switch if GSAP failed to load or prefers-reduced-motion
  // is set (same defensive pattern as initScrollReveal in main.js). ----
  function withTransition(applyStateChange) {
    const outgoing = root.querySelector(".estimator-panel.active");
    const gsapReady = typeof gsap !== "undefined";
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!gsapReady || prefersReduced || !outgoing) {
      applyStateChange();
      return;
    }

    gsap.to(outgoing, {
      opacity: 0,
      y: -8,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(outgoing, { clearProps: "opacity,transform" });
        applyStateChange();
        const incoming = root.querySelector(".estimator-panel.active");
        if (incoming) {
          gsap.from(incoming, { opacity: 0, y: 8, duration: 0.25, ease: "power2.out" });
        }
      },
    });
  }

  // Single-select steps (project type, tier, property type) auto-advance a
  // short beat after a selection, so the choice's highlight registers
  // before the panel transitions away — no separate "Next" click needed.
  function advanceAfterSelect() {
    window.setTimeout(() => {
      withTransition(() => {
        if (state.step < totalSteps) {
          state.step += 1;
          updateUI();
        } else {
          computeAndShowResult();
        }
      });
    }, 280);
  }

  // ---- Step 1: project type ----
  function renderProjectTypeOptions() {
    const wrap = root.querySelector("#project-type-options");
    if (!wrap) return;
    wrap.innerHTML = PROJECT_TYPES.map(
      (t) => `<button type="button" class="option-card" data-project-type="${t.value}" aria-pressed="false">
        <h4>${t.label}</h4>
      </button>`
    ).join("");
    wrap.querySelectorAll("[data-project-type]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.projectType = btn.dataset.projectType;
        wrap.querySelectorAll("[data-project-type]").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        updateUI();
        advanceAfterSelect();
      });
    });
  }

  // ---- Step 2: area ----
  function bindArea() {
    const slider = root.querySelector("#area-slider");
    const number = root.querySelector("#area-number");
    const display = root.querySelector("#area-value-display");
    if (!slider || !number) return;

    const clamp = (v) => Math.min(200, Math.max(5, Math.round(v) || 5));

    const sync = (value, source) => {
      const v = clamp(value);
      state.area = v;
      slider.value = v;
      number.value = v;
      if (display) display.textContent = `${v} m²`;
      updateUI();
    };

    slider.addEventListener("input", () => sync(slider.value));
    number.addEventListener("input", () => sync(number.value));
    number.addEventListener("blur", () => sync(number.value)); // re-clamp on blur even if mid-typing was odd

    sync(state.area);
  }

  // ---- Step 3: finish tier ----
  function renderTierOptions() {
    const wrap = root.querySelector("#tier-options");
    if (!wrap) return;
    const tiers = ["classic", "premium", "exotic"];
    wrap.innerHTML = tiers
      .map((key) => {
        const t = PRICING[key];
        return `<button type="button" class="option-card" data-tier="${key}" aria-pressed="false">
          <h4>${t.label}</h4>
          <p>${t.finishes.join(", ")}</p>
          <span class="rate">$${t.low}–$${t.high} / m²</span>
        </button>`;
      })
      .join("");
    wrap.querySelectorAll("[data-tier]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.tier = btn.dataset.tier;
        wrap.querySelectorAll("[data-tier]").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        updateUI();
        advanceAfterSelect();
      });
    });
  }

  // ---- Step 4: property type ----
  function bindPropertyType() {
    const wrap = root.querySelector("#property-type-options");
    if (!wrap) return;
    wrap.querySelectorAll("[data-property-type]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.propertyType = btn.dataset.propertyType;
        wrap.querySelectorAll("[data-property-type]").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        updateUI();
        advanceAfterSelect();
      });
    });
  }

  // ---- Navigation ----
  function bindNav() {
    // Next is only ever shown on the area/slider step (see updateUI) — the
    // other steps auto-advance on selection instead.
    nextBtn.addEventListener("click", () => {
      if (!canAdvance()) return;
      withTransition(() => {
        if (state.step < totalSteps) {
          state.step += 1;
          updateUI();
        } else {
          computeAndShowResult();
        }
      });
    });
    backBtn.addEventListener("click", () => {
      withTransition(() => {
        if (showingResult) {
          showingResult = false;
          resultPanel.classList.remove("active");
          updateUI();
          return;
        }
        if (state.step > 1) {
          state.step -= 1;
          updateUI();
        }
      });
    });
  }

  function canAdvance() {
    switch (state.step) {
      case 1:
        return !!state.projectType;
      case 2:
        return state.area >= 5 && state.area <= 200;
      case 3:
        return !!state.tier;
      case 4:
        return !!state.propertyType;
      default:
        return false;
    }
  }

  function updateUI() {
    panels.forEach((p) => p.classList.toggle("active", Number(p.dataset.step) === state.step));
    stepDots.forEach((dot, i) => dot.classList.toggle("done", i < state.step));
    backBtn.disabled = state.step === 1;
    backBtn.style.visibility = state.step === 1 ? "hidden" : "visible";
    // Every other step auto-advances on selection (see advanceAfterSelect);
    // only the area/slider step has no discrete "selection" to trigger that,
    // so it's the only one that still needs an explicit continue action.
    const showNext = state.step === 2;
    nextBtn.style.display = showNext ? "" : "none";
    nextBtn.textContent = "Continue";
    nextBtn.disabled = !canAdvance();
  }

  // ---- Result ----
  function computeAndShowResult() {
    const tier = PRICING[state.tier];
    const area = clampArea(state.area);
    const multiplier = state.propertyType === "commercial" ? PRICING.commercialMultiplier : 1;

    let low = area * tier.low * multiplier;
    let high = area * tier.high * multiplier;

    // Guard rails: never show NaN, negative, or zero.
    low = Number.isFinite(low) && low > 0 ? Math.round(low) : 0;
    high = Number.isFinite(high) && high > 0 ? Math.round(high) : 0;

    root.querySelectorAll(".estimator-panel").forEach((p) => p.classList.remove("active"));
    resultPanel.classList.add("active");
    showingResult = true;

    const rangeEl = resultPanel.querySelector("#estimate-range");
    rangeEl.textContent = `$${low.toLocaleString("en-AU")} – $${high.toLocaleString("en-AU")}`;

    const breakdown = resultPanel.querySelector("#estimate-breakdown");
    if (breakdown) {
      breakdown.innerHTML = `
        <div><span>Project type</span><span>${labelFor(PROJECT_TYPES, state.projectType)}</span></div>
        <div><span>Area</span><span>${area} m²</span></div>
        <div><span>Finish tier</span><span>${tier.label} ($${tier.low}–$${tier.high}/m²)</span></div>
        <div><span>Property type</span><span>${state.propertyType === "commercial" ? "Commercial (+10%)" : "Residential"}</span></div>
      `;
    }
  }

  function clampArea(v) {
    const n = Number(v);
    if (!Number.isFinite(n)) return 5;
    return Math.min(200, Math.max(5, n));
  }

  function labelFor(list, value) {
    const item = list.find((i) => i.value === value);
    return item ? item.label : "—";
  }
});
