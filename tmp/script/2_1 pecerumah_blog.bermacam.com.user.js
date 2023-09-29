// ==UserScript==
// @name         1:2:1 pecerumah_blog.bermacam.com
// @namespace    http://tampermonkey.net/
// @version      2023.09.28--17:58
// @description  try to take over the world!
// @author       You
// @match        https://sproutgigs.com/jobs/submit-task.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sproutgigs.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Function to display a confirmation popup
    function showConfirmationPopup(callback) {
        const shouldFillForm = confirm('Tandremo, valina asa tam 28 Septembre ito, zaano tsara sode niova ny code, 657 of 920');
        callback(shouldFillForm);
    }

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

    // Function to fill the form with random responses
    function fillFormWithRandomResponses(responses, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = responses.join('\n');
        }
    }

    // Search for the text "3E7I7ZE" on the page
    const foundIndex = document.body.textContent.includes("3CVmvip");

    if (foundIndex) {
        // Display a confirmation popup before filling the form
        showConfirmationPopup(function(shouldFillForm) {
            if (shouldFillForm) {
                // Fill the form with random responses
                getRandomResponses("https://raw.githubusercontent.com/MieJM98/A-S-A/main/p.e.c.e.r.u.m.a.h_1.2.1/blog._berma_cam._com.txt", 1, function(response1) {
                    fillFormWithRandomResponses(response1, 'textarea#proof_1.form-control.alert-on-type-task');
                });

                // Set the second field to a fixed response
                fillFormWithRandomResponses(["CODE22572BB"], 'textarea#vproof');  // Change to "vitat"

                const sources = [
                    "https://pastebin.com/raw/1UBfN03Z",
                    "https://pastebin.com/raw/9SbdJnYs",
                    "https://pastebin.com/raw/tG5Uq3HV",
                    "https://pastebin.com/raw/sCcL4fmc",
                    "https://pastebin.com/raw/khC5ubQ3",
                    "https://pastebin.com/raw/HSSGN2bp",
                    "https://pastebin.com/raw/cvT4CAh9",
                    "https://pastebin.com/raw/bMpidwrb",
                    "https://pastebin.com/raw/0YsMUrcJ",
                    "https://pastebin.com/raw/PJqLfHAH",
                    "https://pastebin.com/raw/XRHhMWXa",
                    "https://pastebin.com/raw/QsLRXt4f",
                    "https://pastebin.com/raw/XpBTujRa",
                    "https://pastebin.com/raw/VdR1JZaL"
                    // Add more sources as needed
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

})();
