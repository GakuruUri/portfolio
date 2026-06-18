/* =============================================================
   enhancements.js  —  motion layer (progressive enhancement)
   Works alongside app.js. If this file fails to load, the site
   still functions; nothing here is required for navigation.
   ============================================================= */
(function () {
    "use strict";

    var reduceMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Elements that fade/slide in when their section becomes active,
    // listed in the order they should animate within each section.
    var ANIM_SELECTORS = [
        ".main-title",
        ".left-header .image",
        ".right-header .name",
        ".right-header .location-line",
        ".right-header > p",
        ".cert-badges",
        ".btn-con",
        ".left-about",
        ".about-item",
        ".progress-bar",
        ".timeline-item",
        ".port-text",
        ".portfolio-item",
        ".blogs .blog",
        ".contact-info .contact-item",
        ".contact-icons",
        ".right-contact"
    ];

    document.body.classList.add("has-reveal");

    // Tag the animatable elements once.
    document.querySelectorAll(ANIM_SELECTORS.join(",")).forEach(function (el) {
        el.setAttribute("data-anim", "");
    });

    function revealSection(section) {
        var items = section.querySelectorAll("[data-anim]");
        items.forEach(function (el, i) {
            if (reduceMotion) {
                el.classList.add("in");
                return;
            }
            // Restart the animation each time the section is shown.
            el.classList.remove("in");
            var delay = Math.min(i * 55, 420);
            el.style.transitionDelay = delay + "ms";
            // Force reflow so the transition re-triggers, then reveal.
            void el.offsetWidth;
            requestAnimationFrame(function () {
                el.classList.add("in");
            });
        });
    }

    // Reveal skill bars by scaling them in from the left. The bar's
    // real width stays defined in CSS, so it is always visible; this
    // only animates a 0 -> full sweep. Can't leave a bar stuck empty.
    function animateSkillBars(section) {
        var bars = section.querySelectorAll(".about-stats .progress span");
        bars.forEach(function (bar, i) {
            if (reduceMotion) { bar.style.transform = "scaleX(1)"; return; }
            bar.style.transition = "none";
            bar.style.transform = "scaleX(0)";
            void bar.offsetWidth;
            setTimeout(function () {
                bar.style.transition = "transform 1s cubic-bezier(0.22, 1, 0.36, 1)";
                bar.style.transform = "scaleX(1)";
            }, 250 + i * 90);
        });
    }

    // Count the About stats up from 0 when the section is shown.
    function animateCounters(section) {
        var nums = section.querySelectorAll("[data-count]");
        nums.forEach(function (el) {
            var target = parseInt(el.getAttribute("data-count"), 10) || 0;
            var suffix = el.getAttribute("data-suffix") || "";
            if (reduceMotion) { el.textContent = target + suffix; return; }
            var duration = 1400, start = null;
            function tick(now) {
                if (start === null) start = now;
                var p = Math.min((now - start) / duration, 1);
                // easeOutCubic for a natural settle
                var eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(target * eased) + suffix;
                if (p < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        });
    }

    function handleActive(section) {
        revealSection(section);
        if (section.id === "about") {
            animateSkillBars(section);
            animateCounters(section);
        }
    }

    // Watch every swappable section for the `active` class toggling on.
    var sections = document.querySelectorAll(".section");
    sections.forEach(function (section) {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (m) {
                if (m.attributeName === "class" &&
                    section.classList.contains("active")) {
                    handleActive(section);
                }
            });
        });
        observer.observe(section, { attributes: true, attributeFilter: ["class"] });
    });

    // Reveal whatever section is active on first load (the hero).
    function init() {
        var current = document.querySelector(".section.active");
        if (current) handleActive(current);
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    // Register the service worker for offline support / installability.
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker.register("/sw.js").catch(function () { /* no-op */ });
        });
    }
})();
