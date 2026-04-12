// ==UserScript==
// @name         SproutGigs - Buyer Highlighter (LOCAL DATA)
// @namespace    http://tampermonkey.net/
// @version      2026-04-12--18:00
// @description  Surligne les jobs avec liste locale (orange + bleu)
// @match        https://sproutgigs.com/jobs.php
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ======================
    // 🔥 DONNÉES LOCALES
    // ======================
    const BUYER_LISTS = {
        orange: [
            "Johndoe1998012",
            "lukaracks",
            "Daanoquex",
            "HansTuit01",
            "montooytje",
            "yews",
            "analt2028",
            "Ckanti",
            "tentra",
            "sativa_wahyu1"
        ],
        bleu: [
            "pretomaker",
            "Shyguywhy",
            "rhehrdml10",
            "growthpartner",
            "windgrandson",
            "bradko",
            "ytmania151"
        ]
    };

    // ======================
    // CONFIG UI
    // ======================
    const ORANGE_COLOR = "linear-gradient(90deg, rgba(255,140,0,0.25), rgba(255,215,0,0.25))";
    const ORANGE_BORDER = "rgba(255,140,0,0.4)";

    const BLUE_COLOR = "linear-gradient(90deg, rgba(0,100,255,0.25), rgba(100,200,255,0.25))";
    const BLUE_BORDER = "rgba(0,150,255,0.4)";

    const SCAN_INTERVAL = 2000;

    // ======================
    // STATE
    // ======================
    let orangeSet = new Set();
    let blueSet = new Set();
    let highlightedCount = 0;
    let dashboardDiv;

    // ======================
    // INIT DATA
    // ======================
    function loadLocalData() {
        BUYER_LISTS.orange.forEach(n => orangeSet.add(n.trim()));
        BUYER_LISTS.bleu.forEach(n => blueSet.add(n.trim()));
    }

    // ======================
    // DASHBOARD
    // ======================
    function createDashboard() {
        dashboardDiv = document.createElement('div');

        Object.assign(dashboardDiv.style, {
            position: 'fixed',
            top: '150px',
            left: '10px',
            background: 'rgba(0,0,0,0.75)',
            color: '#fff',
            padding: '10px',
            borderRadius: '6px',
            fontSize: '12px',
            zIndex: '999999'
        });

        document.body.appendChild(dashboardDiv);
    }

    function updateDashboard() {
        dashboardDiv.innerHTML = `
            <b>2026-03-28</b><br>
            🧡 Orange: ${orangeSet.size}<br>
            💙 Bleu: ${blueSet.size}<br>
            ✅ Total: ${highlightedCount}
        `;
    }

    // ======================
    // HIGHLIGHT
    // ======================
    function highlightMatches() {
        const elements = document.querySelectorAll(
            'div.jobs__item-cell.jobs__item-cell--emp.small:not([data-checked])'
        );

        elements.forEach(element => {
            const spans = element.querySelectorAll("span[data-tippy-content]");
            if (!spans.length) return;

            const buyerName = spans[spans.length - 1].textContent.trim();
            if (!buyerName) return;

            const jobRow = element.closest(".jobs__item");
            if (!jobRow) return;

            if (orangeSet.has(buyerName)) {
                jobRow.style.background = ORANGE_COLOR;
                jobRow.style.border = `2px solid ${ORANGE_BORDER}`;
                element.dataset.checked = "true";
                highlightedCount++;
            }
            else if (blueSet.has(buyerName)) {
                jobRow.style.background = BLUE_COLOR;
                jobRow.style.border = `2px solid ${BLUE_BORDER}`;
                element.dataset.checked = "true";
                highlightedCount++;
            }
        });

        updateDashboard();
    }

    // ======================
    // START
    // ======================
    function init() {
        loadLocalData();
        createDashboard();
        updateDashboard();

        setInterval(highlightMatches, SCAN_INTERVAL);
        setTimeout(highlightMatches, 500);
    }

    init();

})();
