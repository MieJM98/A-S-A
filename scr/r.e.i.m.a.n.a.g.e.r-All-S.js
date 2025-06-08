// ==UserScript==
// @name         1.1.2-reimanager-All-S
// @namespace    http://tampermonkey.net/--https://mort.jakartastudio.com/
// @version      2025.05.26--12:34
// @description  try to take over the world!
// @author       You
// @match        https://sproutgigs.com/jobs/submit-task.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sproutgigs.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==





// @name         https://kicaumania.net/eng/
// @version      2025.05.26--14:30


(function() {
    'use strict';

    // Récupérer des lignes aléatoires depuis un fichier texte
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

    // Remplir un champ <textarea> avec des réponses
    function fillFormWithRandomResponses(responses, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = responses.join('\n');
        }
    }

    // Charger dynamiquement la liste des fichiers sources depuis index.txt
    function getSourcesFromIndex(url, callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(response) {
                const files = response.responseText
                    .split("\n")
                    .map(file => file.trim())
                    .filter(file => file);
                const sources = files.map(file =>
                    `https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/${file}`
                );
                callback(sources);
            }
        });
    }

    // Liste des indices à rechercher dans la page
    const searchIndices = ["MOFOGASY", "https://rebrand.ly/ad431a"];
    let hasFilled = false;

    // Rechercher un indice dans la page et remplir si trouvé
    function searchForIndex(index) {
        if (hasFilled) return;

        const foundIndex = document.body.textContent.includes(index);

        if (foundIndex) {
            hasFilled = true;
            console.log(`[TAMPER] Indice trouvé : "${index}". Remplissage du formulaire.`);

            getRandomResponses("https://raw.githubusercontent.com/MieJM98/A-S-A/refs/heads/main/REGI/kicau_mania_.net--eng/lnk.txt", 1, function(response1) {
                fillFormWithRandomResponses(response1, 'textarea#proof_1.form-control.alert-on-type-task');

                getRandomResponses("https://raw.githubusercontent.com/MieJM98/A-S-A/refs/heads/main/REGI/kicau_mania_.net--eng/stnc.txt", 1, function(response2) {
                    fillFormWithRandomResponses(response2, 'textarea#proof_2.form-control.alert-on-type-task');

                    getSourcesFromIndex("https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/index.txt", function(sources) {
                        const randomUrl = sources[Math.floor(Math.random() * sources.length)];
                        getRandomResponses(randomUrl, 2, function(response3) {
                            fillFormWithRandomResponses(response3, 'textarea#proof_3.form-control.alert-on-type-task');
                        });
                    });
                });
            });
        }
    }

    // Lancer la recherche sur chaque indice
    for (const index of searchIndices) {
        searchForIndex(index);
    }

})();
















// @name         https://salamadian.com/ecommerce/
// @version      2025.05.26--14:30


(function() {
    'use strict';

    // Récupérer des lignes aléatoires depuis un fichier texte
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

    // Remplir un champ <textarea> avec des réponses
    function fillFormWithRandomResponses(responses, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = responses.join('\n');
        }
    }

    // Charger dynamiquement la liste des fichiers sources depuis index.txt
    function getSourcesFromIndex(url, callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(response) {
                const files = response.responseText
                    .split("\n")
                    .map(file => file.trim())
                    .filter(file => file);
                const sources = files.map(file =>
                    `https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/${file}`
                );
                callback(sources);
            }
        });
    }

    // Liste des indices à rechercher dans la page
    const searchIndices = ["MOFOGASY", "https://rebrand.ly/bkpe9hm"];
    let hasFilled = false;

    // Rechercher un indice dans la page et remplir si trouvé
    function searchForIndex(index) {
        if (hasFilled) return;

        const foundIndex = document.body.textContent.includes(index);

        if (foundIndex) {
            hasFilled = true;
            console.log(`[TAMPER] Indice trouvé : "${index}". Remplissage du formulaire.`);

            getRandomResponses("https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/salam_adian_.com--ecommerce/lnk.txt", 1, function(response1) {
                fillFormWithRandomResponses(response1, 'textarea#proof_1.form-control.alert-on-type-task');

                getRandomResponses("https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/salam_adian_.com--ecommerce/stnc.txt", 1, function(response2) {
                    fillFormWithRandomResponses(response2, 'textarea#proof_2.form-control.alert-on-type-task');

                    getSourcesFromIndex("https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/index.txt", function(sources) {
                        const randomUrl = sources[Math.floor(Math.random() * sources.length)];
                        getRandomResponses(randomUrl, 2, function(response3) {
                            fillFormWithRandomResponses(response3, 'textarea#proof_3.form-control.alert-on-type-task');
                        });
                    });
                });
            });
        }
    }

    // Lancer la recherche sur chaque indice
    for (const index of searchIndices) {
        searchForIndex(index);
    }

})();












// @name        https://fuyu.putarmuter.com/
// @version      2025.05.26--14:30


(function() {
    'use strict';

    // Récupérer des lignes aléatoires depuis un fichier texte
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

    // Remplir un champ <textarea> avec des réponses
    function fillFormWithRandomResponses(responses, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = responses.join('\n');
        }
    }

    // Charger dynamiquement la liste des fichiers sources depuis index.txt
    function getSourcesFromIndex(url, callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(response) {
                const files = response.responseText
                    .split("\n")
                    .map(file => file.trim())
                    .filter(file => file);
                const sources = files.map(file =>
                    `https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/${file}`
                );
                callback(sources);
            }
        });
    }

    // Liste des indices à rechercher dans la page
    const searchIndices = ["https://rebrand.ly/3kep05b", "https://rebrand.ly/kix26et"];
    let hasFilled = false;

    // Rechercher un indice dans la page et remplir si trouvé
    function searchForIndex(index) {
        if (hasFilled) return;

        const foundIndex = document.body.textContent.includes(index);

        if (foundIndex) {
            hasFilled = true;
            console.log(`[TAMPER] Indice trouvé : "${index}". Remplissage du formulaire.`);

            getRandomResponses("https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/fuyu_.putar_muter.com/lnk.txt", 1, function(response1) {
                fillFormWithRandomResponses(response1, 'textarea#proof_1.form-control.alert-on-type-task');

                getRandomResponses("https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/fuyu_.putar_muter.com/stnc.txt", 1, function(response2) {
                    fillFormWithRandomResponses(response2, 'textarea#proof_2.form-control.alert-on-type-task');

                    getSourcesFromIndex("https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/index.txt", function(sources) {
                        const randomUrl = sources[Math.floor(Math.random() * sources.length)];
                        getRandomResponses(randomUrl, 2, function(response3) {
                            fillFormWithRandomResponses(response3, 'textarea#proof_3.form-control.alert-on-type-task');
                        });
                    });
                });
            });
        }
    }

    // Lancer la recherche sur chaque indice
    for (const index of searchIndices) {
        searchForIndex(index);
    }

})();














// @name        https://kyo.iqipedia.com/
// @version      2025.05.23--18:30


(function() {
    'use strict';

    // Récupérer des lignes aléatoires depuis un fichier texte
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

    // Remplir un champ <textarea> avec des réponses
    function fillFormWithRandomResponses(responses, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = responses.join('\n');
        }
    }

    // Charger dynamiquement la liste des fichiers sources depuis index.txt
    function getSourcesFromIndex(url, callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(response) {
                const files = response.responseText
                    .split("\n")
                    .map(file => file.trim())
                    .filter(file => file);
                const sources = files.map(file =>
                    `https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/${file}`
                );
                callback(sources);
            }
        });
    }

    // Liste des indices à rechercher dans la page
    const searchIndices = ["mofo_gasy", "https://rebrand.ly/a12469"];
    let hasFilled = false;

    // Rechercher un indice dans la page et remplir si trouvé
    function searchForIndex(index) {
        if (hasFilled) return;

        const foundIndex = document.body.textContent.includes(index);

        if (foundIndex) {
            hasFilled = true;
            console.log(`[TAMPER] Indice trouvé : "${index}". Remplissage du formulaire.`);

            getRandomResponses("https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/kyo_.iqipedia_.com/lnk.txt", 1, function(response1) {
                fillFormWithRandomResponses(response1, 'textarea#proof_1.form-control.alert-on-type-task');

                getRandomResponses("https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/kyo_.iqipedia_.com/stnc.txt", 1, function(response2) {
                    fillFormWithRandomResponses(response2, 'textarea#proof_2.form-control.alert-on-type-task');

                    getSourcesFromIndex("https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/index.txt", function(sources) {
                        const randomUrl = sources[Math.floor(Math.random() * sources.length)];
                        getRandomResponses(randomUrl, 2, function(response3) {
                            fillFormWithRandomResponses(response3, 'textarea#proof_3.form-control.alert-on-type-task');
                        });
                    });
                });
            });
        }
    }

    // Lancer la recherche sur chaque indice
    for (const index of searchIndices) {
        searchForIndex(index);
    }

})();




















// @name        https://mort.jakartastudio.com/
// @version      2025.05.26--14:30


(function() {
    'use strict';

    // Récupérer des lignes aléatoires depuis un fichier texte
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

    // Remplir un champ <textarea> avec des réponses
    function fillFormWithRandomResponses(responses, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = responses.join('\n');
        }
    }

    // Charger dynamiquement la liste des fichiers sources depuis index.txt
    function getSourcesFromIndex(url, callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(response) {
                const files = response.responseText
                    .split("\n")
                    .map(file => file.trim())
                    .filter(file => file);
                const sources = files.map(file =>
                    `https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/${file}`
                );
                callback(sources);
            }
        });
    }

    // Liste des indices à rechercher dans la page
    const searchIndices = ["MOFOGASY", "https://rebrand.ly/e85b05]";
    let hasFilled = false;

    // Rechercher un indice dans la page et remplir si trouvé
    function searchForIndex(index) {
        if (hasFilled) return;

        const foundIndex = document.body.textContent.includes(index);

        if (foundIndex) {
            hasFilled = true;
            console.log(`[TAMPER] Indice trouvé : "${index}". Remplissage du formulaire.`);

            getRandomResponses("https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/mort._jaka_rta_studio_.com/lnk.txt", 1, function(response1) {
                fillFormWithRandomResponses(response1, 'textarea#proof_1.form-control.alert-on-type-task');

                getRandomResponses("https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/mort._jaka_rta_studio_.com/stnc.txt", 1, function(response2) {
                    fillFormWithRandomResponses(response2, 'textarea#proof_2.form-control.alert-on-type-task');

                    getSourcesFromIndex("https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/index.txt", function(sources) {
                        const randomUrl = sources[Math.floor(Math.random() * sources.length)];
                        getRandomResponses(randomUrl, 2, function(response3) {
                            fillFormWithRandomResponses(response3, 'textarea#proof_3.form-control.alert-on-type-task');
                        });
                    });
                });
            });
        }
    }

    // Lancer la recherche sur chaque indice
    for (const index of searchIndices) {
        searchForIndex(index);
    }

})();





