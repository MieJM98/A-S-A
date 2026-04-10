// ==UserScript==
// @name         regi combo stephanie - Buyer Highlighter Dual + Text Scan
// @namespace    http://tampermonkey.net/
// @version      2026-03-28--04:00
// @description  Highlight buyers + détection texte %
// @match        https://sproutgigs.com/jobs.php?category=20&sort=COST
// @match        https://sproutgigs.com/jobs.php?sort=NEWEST
// @match        https://sproutgigs.com/jobs.php?category=10&sort=TTR
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ======================
    // CONFIG HIGHLIGHT
    // ======================
    const HIGHLIGHT_CONFIG = {
        orange: {
            color: "linear-gradient(90deg, rgba(255,140,0,0.25), rgba(255,215,0,0.25))",
            border: "rgba(255,140,0,0.4)"
        },
        bleu: {
            color: "linear-gradient(90deg, rgba(0,100,255,0.25), rgba(100,200,255,0.25))",
            border: "rgba(0,150,255,0.4)"
        }
    };

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

    let orangeSet = new Set(BUYER_LISTS.orange);
    let blueSet = new Set(BUYER_LISTS.bleu);

    let intervalId;
    let countdownIntervalId;
    let options = ["Most Recent", "Buyers followed", "TTR", "Highest Paying"];
    let currentOptionIndex = 0;

    let countdownDisplay;
    let countdownTime;

    // ======================
    // 🔎 TEXT TARGET CONFIG
    // ======================
    const targetTexts = [];

    for (let i = 12436; i <= 12600; i++) {
        for (let p = 99; p <= 100; p++) {
            targetTexts.push(i + " / " + p + "%");
        }
    }

    for (let i = 1230; i <= 1500; i++) {
        for (let p = 99; p <= 100; p++) {
            targetTexts.push(i + " / " + p + "%");
        }
    }

    targetTexts.push("1114907 / 97%");

    // ======================
    // UI
    // ======================
    function createCountdownDisplay() {
        countdownDisplay = document.createElement('div');
        countdownDisplay.style.position = 'fixed';
        countdownDisplay.style.bottom = '10px';
        countdownDisplay.style.right = '150px';
        countdownDisplay.style.backgroundColor = 'rgba(0,0,0,0.7)';
        countdownDisplay.style.color = 'white';
        countdownDisplay.style.padding = '15px';
        countdownDisplay.style.borderRadius = '5px';
        countdownDisplay.style.zIndex = '1000';
        countdownDisplay.style.fontSize = '16px';
        document.body.appendChild(countdownDisplay);
    }

    function updateCountdownDisplay(time) {
        countdownDisplay.textContent = "Scan... " + Math.floor(time) + "s";
    }

    function getRandomInterval() {
        return Math.floor(Math.random() * (7000 - 5000 + 1)) + 5000;
    }

    // ======================
    // HIGHLIGHT
    // ======================
    function highlightBuyers() {
        const elements = document.querySelectorAll(
            'div.jobs__item-cell.jobs__item-cell--emp.small:not([data-highlighted])'
        );

        elements.forEach(element => {
            const spans = element.querySelectorAll("span[data-tippy-content]");
            if (spans.length === 0) return;

            const name = spans[spans.length - 1].textContent.trim();
            const jobRow = element.closest(".jobs__item");
            if (!jobRow) return;

            if (orangeSet.has(name)) {
                jobRow.style.background = HIGHLIGHT_CONFIG.orange.color;
                jobRow.style.border = `2px solid ${HIGHLIGHT_CONFIG.orange.border}`;
                element.dataset.highlighted = "true";
            } else if (blueSet.has(name)) {
                jobRow.style.background = HIGHLIGHT_CONFIG.bleu.color;
                jobRow.style.border = `2px solid ${HIGHLIGHT_CONFIG.bleu.border}`;
                element.dataset.highlighted = "true";
            }
        });
    }

    // ======================
    // 🔎 TEXT SCAN
    // ======================
    function findTargetTexts() {
        const elements = document.querySelectorAll('.jobs__item-cell--success');
        const counts = {};

        targetTexts.forEach(text => counts[text] = 0);

        elements.forEach(el => {
            const text = el.textContent.trim();
            if (counts.hasOwnProperty(text)) {
                counts[text]++;
            }
        });

        const foundText = Object.keys(counts).find(text => counts[text] > 0);
        return { foundText, counts };
    }

    // ======================
    // BUYER SCAN
    // ======================
    function findBuyerNames() {
        const jobCells = document.querySelectorAll('div.jobs__item-cell.jobs__item-cell--emp.small');
        const foundBuyers = [];
        const buyerCounts = {};

        const allBuyers = [...orangeSet, ...blueSet];

        jobCells.forEach(cell => {
            const spans = cell.querySelectorAll("span[data-tippy-content]");
            if (spans.length === 0) return;

            const name = spans[spans.length - 1].textContent.trim();

            if (allBuyers.includes(name)) {
                buyerCounts[name] = (buyerCounts[name] || 0) + 1;
                if (!foundBuyers.includes(name)) {
                    foundBuyers.push(name);
                }
            }
        });

        return { foundBuyers, buyerCounts };
    }

    // ======================
    // MAIN SCAN
    // ======================
    function scanForBuyers() {

        highlightBuyers();

        // 🔥 PRIORITÉ TEXTE
        const { foundText, counts } = findTargetTexts();

        if (foundText) {
            clearInterval(intervalId);
            clearInterval(countdownIntervalId);

            alert("🎯 TEXTE TROUVÉ:\n\n" + foundText + "\nCount: " + counts[foundText]);
            return;
        }

        // 👇 sinon buyers
        const { foundBuyers, buyerCounts } = findBuyerNames();

        if (foundBuyers.length > 0) {
            clearInterval(intervalId);
            clearInterval(countdownIntervalId);

            let msg = "✅ BUYERS TROUVÉS\n\n";

            foundBuyers.forEach(b => {
                msg += b + " : " + buyerCounts[b] + "\n";
            });

            alert(msg);
        } else {
            clickNextOption();

            countdownTime = getRandomInterval() / 1000;
            updateCountdownDisplay(countdownTime);

            countdownIntervalId = setInterval(() => {
                countdownTime--;
                updateCountdownDisplay(countdownTime);

                if (countdownTime <= 0) {
                    clearInterval(countdownIntervalId);
                    scanForBuyers();
                }
            }, 1000);
        }
    }

    // ======================
    // OPTIONS
    // ======================
    function clickNextOption() {
        const next = options[currentOptionIndex];
        clickOption(next);
        currentOptionIndex = (currentOptionIndex + 1) % options.length;
    }

    function clickOption(text) {
        const items = document.getElementsByClassName("dropdown-item");
        for (let item of items) {
            if (item.innerText === text) {
                item.click();
                break;
            }
        }
    }

    // ======================
    // INIT
    // ======================
    function init() {

        setInterval(highlightBuyers, 2000);
        setTimeout(highlightBuyers, 500);

        createCountdownDisplay();

        countdownTime = getRandomInterval() / 1000;
        updateCountdownDisplay(countdownTime);

        countdownIntervalId = setInterval(() => {
            countdownTime--;
            updateCountdownDisplay(countdownTime);

            if (countdownTime <= 0) {
                clearInterval(countdownIntervalId);
                scanForBuyers();
            }
        }, 1000);
    }

    init();

})();
