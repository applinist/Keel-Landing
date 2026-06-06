/* ============================================================================
   KEEL — Landing page behavior.
   Motion is concentrated on the hero tease loop and the Proof sandbox run.
   Every animated moment has a reduced-motion equivalent (static, instant).
   ========================================================================= */
(function () {
  "use strict";

  var reduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- icons ---- */
  if (window.lucide) lucide.createIcons({ attrs: { "stroke-width": 1.5 } });

  /* ---- trigger the one-time composed hero entrance (additive; the hero is
     fully visible without it) ---- */
  if (!reduced) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { document.body.classList.add("is-loaded"); });
    });
  }

  /* ===================================================================
     HERO TEASE — a quiet looping glimpse of agent activity.
     Reduced motion: show the full list, statically, no cycling.
     =================================================================== */
  (function teaseLoop() {
    var feed = document.getElementById("teaseFeed");
    if (!feed) return;
    var items = Array.prototype.slice.call(feed.children);
    if (reduced) {
      items.forEach(function (li) { li.classList.remove("is-dim"); });
      return;
    }
    var i = 0;
    function tick() {
      items.forEach(function (li, idx) {
        li.classList.toggle("is-active", idx === i);
        li.classList.toggle("is-dim", idx > i);
      });
      i = (i + 1) % (items.length + 1); // pause a beat after the last
    }
    tick();
    setInterval(tick, 1600);
  })();

  /* ===================================================================
     SANDBOX RUN — the reasoning trace, revealed step by step.
     Latency rendered as transparency (a thinking spinner per step),
     ending on the escalation/handoff state as a first-class moment.
     Reduced motion: every step shown done, instantly.
     =================================================================== */
  (function sandbox() {
    var root = document.getElementById("sandbox");
    var runBtn = document.getElementById("sbRun");
    var status = document.getElementById("sbStatus");
    var hint = document.getElementById("sbHint");
    if (!root || !runBtn) return;

    var steps = Array.prototype.slice.call(root.querySelectorAll(".sb-step"));
    var runLabel = runBtn.querySelector(".sb-run__label");
    var timers = [];
    var running = false;

    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    function showAllStatic() {
      // reduced-motion / fallback: the whole trace, resolved.
      steps.forEach(function (s) {
        s.classList.remove("is-active");
        s.classList.add("is-revealed", "is-done");
      });
      status.textContent = "handed to owner";
      status.className = "sb-trace__status is-done mono";
    }

    function reset() {
      clearTimers();
      steps.forEach(function (s) { s.classList.remove("is-revealed", "is-active", "is-done"); });
      status.textContent = "idle";
      status.className = "sb-trace__status mono";
    }

    function run() {
      if (running) return;
      running = true;
      reset();
      runBtn.setAttribute("aria-disabled", "true");
      runLabel.textContent = "Running…";
      status.textContent = "running";
      status.className = "sb-trace__status is-running mono";

      var perStep = 1050; // dwell per step
      steps.forEach(function (step, idx) {
        var isEsc = step.classList.contains("sb-step--esc");
        // reveal + mark active (thinking)
        timers.push(setTimeout(function () {
          step.classList.add("is-revealed", "is-active");
          var key = step.querySelector(".sb-step__key");
          if (key && status) status.textContent = "step " + (idx + 1) + " / 5";
        }, idx * perStep));
        // resolve (done) before the next reveals
        timers.push(setTimeout(function () {
          step.classList.remove("is-active");
          step.classList.add("is-done");
        }, idx * perStep + perStep - 220));
      });

      // finish on the handoff
      timers.push(setTimeout(function () {
        running = false;
        runBtn.removeAttribute("aria-disabled");
        runLabel.textContent = "Run it again";
        status.textContent = "handed to owner — nothing sent";
        status.className = "sb-trace__status is-done mono";
        if (hint) hint.textContent = "it knew its limit, and stopped at it";
      }, steps.length * perStep + 120));
    }

    if (reduced) {
      // No step animation: present the resolved trace immediately.
      root.removeAttribute("data-mode-anim");
      showAllStatic();
      runLabel.textContent = "Replay the run";
      if (hint) hint.textContent = "static view · reduced motion";
      runBtn.addEventListener("click", function () {
        // brief acknowledgement without motion
        status.textContent = "replayed — handed to owner";
      });
    } else {
      root.setAttribute("data-mode-anim", "step");
      runBtn.addEventListener("click", run);
    }
  })();

  /* ===================================================================
     ANATOMY — parked headline picker (the decision, on the canvas)
     =================================================================== */
  (function headlinePick() {
    var opts = document.querySelectorAll(".hpick__opt");
    var target = document.getElementById("anatomyHeadline");
    if (!opts.length || !target) return;
    opts.forEach(function (btn) {
      btn.addEventListener("click", function () {
        opts.forEach(function (b) { b.classList.remove("is-active"); b.setAttribute("aria-pressed", "false"); });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
        target.textContent = btn.getAttribute("data-h");
      });
    });
  })();

  /* ===================================================================
     OBJECTIONS — FAQ accordion
     =================================================================== */
  (function faq() {
    var root = document.getElementById("faq");
    if (!root) return;
    root.addEventListener("click", function (e) {
      var head = e.target.closest(".accordion__head");
      if (!head) return;
      var item = head.parentElement;
      item.dataset.open = item.dataset.open === "true" ? "false" : "true";
    });
  })();

  /* ===================================================================
     HOW IT WORKS — distance contrast.
     Base state is the full static side-by-side (reduced-motion fallback).
     With motion allowed, a gentle one-time build runs when scrolled into
     view (not scroll-jacked) — distance, not speed. Replay re-runs it.
     =================================================================== */
  (function distance() {
    var dist = document.getElementById("dist");
    var replay = document.getElementById("distReplay");
    if (!dist) return;

    if (reduced) {
      dist.setAttribute("data-static", "true");
      return; // full side-by-side already visible
    }

    function play() {
      dist.classList.remove("is-playing");
      // force reflow so the animation restarts cleanly
      void dist.offsetWidth;
      dist.classList.add("is-playing");
      if (replay) replay.hidden = false;
    }

    var played = false;
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !played) { played = true; play(); io.disconnect(); }
        });
      }, { threshold: 0.35 });
      io.observe(dist);
    }
    if (replay) replay.addEventListener("click", play);
  })();
})();
