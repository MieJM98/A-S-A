// ==UserScript==
// @name         1:1:2 regi_umi.iqipedia.com
// @namespace    http://tampermonkey.net/--https://umi.iqipedia.com/
// @version      2025.10.27--10:40
// @description  try to take over the world!
// @author       You
// @match        https://sproutgigs.com/jobs/submit-task.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sproutgigs.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==




(function() {
    'use strict';

    // Fonction pour récupérer plusieurs réponses aléatoires depuis une source externe
    function getRandomResponses(url, count, callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(response) {
                const responses = response.responseText.split("\n");
                const randomResponses = [];
                for (let i = 0; i < count; i++) {
                    const randomIndex = Math.floor(Math.random() * responses.length);
                    const randomResponse = responses[randomIndex].trim();
                    randomResponses.push(randomResponse);
                }
                callback(randomResponses);
            }
        });
    }

    // Fonction pour remplir le formulaire avec les réponses aléatoires
    function fillFormWithRandomResponses(responses, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = responses.join('\n');
        }
    }

    // Liste des indices à rechercher
    const searchIndices = ["2c1b6d", "64c03d", "bb.bb.b"];

    // Fonction pour rechercher un indice
    function searchForIndex(index) {
        const foundIndex = document.body.textContent.includes(index);

        if (foundIndex) {
            // Remplir les champs du formulaire avec des réponses aléatoires ici
            getRandomResponses("https://pastebin.com/raw/PF3sTHy9", 1, function(response1) {
                fillFormWithRandomResponses(response1, 'textarea#proof_1.form-control.alert-on-type-task');

                getRandomResponses("https://pastebin.com/raw/WZDb4YjN", 1, function(response2) {
                    fillFormWithRandomResponses(response2, 'textarea#proof_2.form-control.alert-on-type-task');

                    const sources = [
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/1.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/2.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/3.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/4.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/5.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/6.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/7.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/8.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/9.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/10.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/11.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/12.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/13.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/14.txt"
                    ];

                    getRandomResponses(sources[Math.floor(Math.random() * sources.length)], 2, function(response3) {
                        fillFormWithRandomResponses(response3, 'textarea#proof_3.form-control.alert-on-type-task');
                    });
                });
            });
        } else {
            console.error('Indice non trouvé.');
        }
    }

    // Rechercher chaque indice dans la liste
    for (const index of searchIndices) {
        searchForIndex(index);
    }

})();













(function() {
    'use strict';

    // Function to get random responses from a source URL
    function getRandomResponses(url, count, callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(response) {
                const responses = response.responseText.split("\n");
                const randomResponses = [];
                for (let i = 0; i < count; i++) {
                    const randomIndex = Math.floor(Math.random() * responses.length);
                    const randomResponse = responses[randomIndex].trim();
                    randomResponses.push(randomResponse);
                }
                callback(randomResponses);
            }
        });
    }

    // Load confirmation message from an external URL
    function loadConfirmationMessage(callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/umi_.iqipedia_.com/msg.txt", // Remplacer par le lien du message de confirmation
            onload: function(response) {
                const message = response.responseText.trim();
                callback(message);
            }
        });
    }

    // Load response for vproof from an external URL
    function loadVproofResponse(callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/umi_.iqipedia_.com/cod.txt", // Remplacer par le lien de la réponse pour vproof
            onload: function(response) {
                const vproofResponse = response.responseText.trim();
                callback(vproofResponse);
            }
        });
    }

    // Search for the text "   " on the page
    const foundIndex = document.body.textContent.includes("64c03d");//

    if (foundIndex) {
        // Display a confirmation popup before filling the form
        loadConfirmationMessage(function(message) {
            const shouldFillForm = confirm(message);
            if (shouldFillForm) {
                // Fill the form with random responses
                getRandomResponses("https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/umi_.iqipedia_.com/lnk.txt", 1, function(response1) {
                    fillFormWithRandomResponses(response1, 'textarea#proof_1.form-control.alert-on-type-task');
                });

                // Load response for vproof
                loadVproofResponse(function(vproofResponse) {
                    fillFormWithRandomResponses([vproofResponse], 'textarea#vproof');
                });

                // Load random responses for proof2
                const sources = [
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/1.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/2.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/3.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/4.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/5.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/6.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/7.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/8.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/9.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/10.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/11.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/12.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/13.txt",
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/14.txt"
                ];
                getRandomResponses(sources[Math.floor(Math.random() * sources.length)], 2, function(response2) {
                    fillFormWithRandomResponses(response2, 'textarea#proof_2.form-control.alert-on-type-task');
                });
            } else {
                console.log('User chose not to fill the form.');
            }
        });
    } else {
        console.error('Indice non trouvé.');
    }

    // Function to fill the form with random responses
    function fillFormWithRandomResponses(responses, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = responses.join('\n');
        }
    }

})();


