// ==UserScript==
// @name         regi combo
// @namespace    http://tampermonkey.net/
// @version      2025-05-30
// @description  try to take over the world!
// @author       You
// @match        https://sproutgigs.com/jobs.php?sort=NEWEST
// @match        https://sproutgigs.com/jobs.php?category=10
// @match        https://sproutgigs.com/jobs.php?category=10&sort=TTR
// @match        https://sproutgigs.com/jobs.php?category=10&level=starter&sort=
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sproutgigs.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    var intervalId;
    var countdownIntervalId;
    var options = ["Most Recent", "Buyers followed"];
    var currentOptionIndex = 0;

    var targetTexts = [];



    // Génère "600 / 100%" à "900 / 100%"
    for (let i = 11026; i <= 12000; i++) {
	    for (let p = 99; p <= 100; p++) {
	        targetTexts.push(i + " / " + p + "%");
	    }
	}


    // Génère "600 / 100%" à "799 / 100%"
    for (let i = 677; i <= 900; i++) {
	    for (let p = 99; p <= 100; p++) {
	        targetTexts.push(i + " / " + p + "%");
	    }
	}

//////
    // Ajoute "22231 / 100%"
    targetTexts.push("3965 / 100%");

    var countdownDisplay;
    var countdownTime;

    function createCountdownDisplay() {
        countdownDisplay = document.createElement('div');
        countdownDisplay.style.position = 'fixed';
        countdownDisplay.style.bottom = '10px';
        countdownDisplay.style.right = '150px';
        countdownDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        countdownDisplay.style.color = 'white';
        countdownDisplay.style.padding = '15px';
        countdownDisplay.style.borderRadius = '5px';
        countdownDisplay.style.zIndex = '1000';
        countdownDisplay.style.fontSize = '16px';
        document.body.appendChild(countdownDisplay);
    }

    function updateCountdownDisplay(time) {
        countdownDisplay.textContent = "07.11.24   :              " + Math.floor(time) + "s";
    }

    function getRandomInterval() {
        return Math.floor(Math.random() * (8000 - 7000 + 1)) + 7000;
    }

    function clickNextOption() {
        var nextOption = options[currentOptionIndex];
        clickOption(nextOption);
        currentOptionIndex = (currentOptionIndex + 1) % options.length;
    }

    function clickOption(optionText) {
        var dropdownItems = document.getElementsByClassName("dropdown-item");
        for (var i = 0; i < dropdownItems.length; i++) {
            var item = dropdownItems[i];
            if (item.innerText === optionText) {
                item.click();
                break;
            }
        }
    }

    function listTexts() {
        var elements = document.getElementsByClassName('jobs__item-cell--success');
        var counts = {};

        targetTexts.forEach(text => {
            counts[text] = 0;
        });

        for (var i = 0; i < elements.length; i++) {
            var text = elements[i].textContent.trim();
            if (counts.hasOwnProperty(text)) {
                counts[text]++;
            }
        }

        var foundText = Object.keys(counts).find(text => counts[text] > 0);
        if (foundText) {
            clearInterval(intervalId);
            clearInterval(countdownIntervalId);
            alert("Texte trouvé : " + foundText + " (x" + counts[foundText] + ")");
        } else {
            clickNextOption();
            countdownTime = getRandomInterval() / 1000;
            updateCountdownDisplay(countdownTime);

            countdownIntervalId = setInterval(() => {
                countdownTime--;
                updateCountdownDisplay(countdownTime);
                if (countdownTime <= 0) {
                    clearInterval(countdownIntervalId);
                    listTexts();
                }
            }, 1000);
        }
    }

    // Initialize countdown display
    createCountdownDisplay();

    // Start the initial countdown
    countdownTime = getRandomInterval() / 1000;
    updateCountdownDisplay(countdownTime);
    countdownIntervalId = setInterval(() => {
        countdownTime--;
        updateCountdownDisplay(countdownTime);
        if (countdownTime <= 0) {
            clearInterval(countdownIntervalId);
            listTexts();
        }
    }, 1000);
})();

(function() {
    'use strict';

    function downloadData(filename, data) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    function getCurrentDateTime() {
        const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleString('default', { month: 'short' });
        const year = now.getFullYear();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return `${day}.${month}.${year}-${hours}.${minutes}`;
    }

    function scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    function extractJobInfo() {
        // Défilement automatique de la page
        const scrollInterval = setInterval(() => {
            scrollToBottom();
        }, 1000); // Défilement chaque seconde

        setTimeout(function() {
            clearInterval(scrollInterval); // Arrêter le défilement automatique

            // Sélectionner tous les éléments <a> avec les classes "jobs__item--client-starter" et "jobs__item--client-starter.is-premium"
            const jobItems = document.querySelectorAll('a.jobs__item.jobs__item--client-starter, a.jobs__item.jobs__item--client-starter.is-premium');

            let jobInfo = ''; // Chaîne pour stocker les informations extraites

            jobItems.forEach(item => {
                // Extraire les différentes informations de chaque job
                const linkUrl = item.href;
                const doneText = item.querySelector('.jobs__item-cell.jobs__item-cell--done.d-none.d-md-block.small') ? item.querySelector('.jobs__item-cell.jobs__item-cell--done.d-none.d-md-block.small').textContent.trim() : 'N/A';

                // Corriger la sélection de toutes les cellules "success"
                const successCells = item.querySelectorAll('.jobs__item-cell.jobs__item-cell--success');
                let successText = 'N/A';

                if (successCells.length > 0) {
                    // Si plusieurs cellules "success" existent, nous allons essayer d'extraire le contenu pertinent
                    successCells.forEach(cell => {
                        const cellText = cell.textContent.trim();

                        // Si la cellule contient un pourcentage ou des tâches réussies, on prend ce texte
                        if (cellText.includes('%') || cellText.includes('FIRST JOB') || cellText.includes('Locked')) {
                            successText = cellText;
                        }
                    });
                }

                const levelText = item.querySelector('.jobs__item-cell--level.small') ? item.querySelector('.jobs__item-cell--level.small').textContent.trim() : 'N/A';
                const paymentText = item.querySelector('.jobs__item-cell--payment') ? item.querySelector('.jobs__item-cell--payment').textContent.trim() : 'N/A';
                const ttrText = item.querySelector('.jobs__item-cell--ttr.d-none.d-md-block.text-center') ? item.querySelector('.jobs__item-cell--ttr.d-none.d-md-block.text-center').textContent.trim() : 'N/A';

                // Construire la chaîne d'information pour chaque job
                jobInfo += `Lien : ${linkUrl}\nTerminé : ${doneText}\nSuccès : ${successText}\nNiveau : ${levelText}\nPaiement : ${paymentText}\nTTR : ${ttrText}\n\n`;
            });

            // Nom du fichier basé sur la date et l'heure actuelles
            const filename = `Beloa-${getCurrentDateTime()}.txt`;

            // Télécharger les informations extraites sous forme de fichier texte
            downloadData(filename, jobInfo);
        }, 10000); // Attendre 20 secondes pour laisser le temps au défilement de la page
    }

    // Créer un bouton flottant pour lancer l'extraction des données
    const button = document.createElement('button');
    button.innerText = 'Télécharger Tout';
    button.style.position = 'fixed';
    button.style.bottom = '10px';
    button.style.right = '10px';
    button.style.zIndex = 1000;
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#007bff';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    // Ajouter un événement de clic au bouton
    button.addEventListener('click', extractJobInfo);

    // Ajouter le bouton au corps du document
    document.body.appendChild(button);
})();
