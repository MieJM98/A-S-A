// ==UserScript==
// @name         Recherche 4
// @namespace    http://tampermonkey.net/
// @version      25490 / 99%
// @description  Recherche et surlignage en bleu du texte "120 / 94%" sur une page.
// @author       Votre nom
// @match        https://sproutgigs.com/jobs.php?category=10&sort=TTR
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const targetText = "2549 / 99%"; // Texte à rechercher et surligner

    // Attente de 30 secondes avant de commencer la recherche
    setTimeout(function() {
        const elements = document.querySelectorAll(":not(script):not(style):not(iframe):not(canvas):not(footer):not(nav):not(noscript):not(object):not(svg):not(video):not(header):not(meta):not(head):not(link):not(a):not([tabindex]):not([contenteditable])");
        elements.forEach(element => {
            if (element.textContent.includes(targetText)) {
                const newHTML = element.innerHTML.replace(new RegExp(targetText, 'g'), '<span style="background-color: blue; color: white;">$&</span>');
                element.innerHTML = newHTML;
            }
        });
    }, 30000); // 30 secondes en millisecondes
})();
