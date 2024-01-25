// ==UserScript==
// @name         all recherche
// @namespace    http://tampermonkey.net/
// @version      2024.01.25--05:20
// @description  Essayer de conquérir le monde !
// @author       Vous
// @match        https://sproutgigs.com/jobs.php?category=10&sub_category=
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stackoverflow.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Fonction pour surligner les mots et afficher une fenêtre flottante
    function highlightTextAndShowPopup() {
        var targetSelector = "div.jobs__item-cell.jobs__item-cell--success.text-center.p-0"; // Sélecteur de la balise
        var wordsToSearch = ['90', '213', '4', '20', '2839']; // Mots à rechercher
        var style = "background-color: blue;"; // Style de surlignage
        var results = {}; // Stocker les mots trouvés et leur occurrence

        // Sélectionner tous les éléments correspondant au sélecteur
        var elements = document.querySelectorAll(targetSelector);

        for (var i = 0; i < elements.length; i++) {
            var text = elements[i].textContent.trim();
            for (var j = 0; j < wordsToSearch.length; j++) {
                var word = wordsToSearch[j] + " /"; // Chercher le mot suivi de " /"
                var regex = new RegExp("\\b" + word + "\\s*\\d+%", "g"); // Utiliser une expression régulière
                if (regex.test(text)) {
                    elements[i].innerHTML = text.replace(regex, function(matched) {
                        if (!results[matched]) {
                            results[matched] = 1;
                        } else {
                            results[matched]++;
                        }
                        return "<span style='" + style + "'>" + matched + " (" + results[matched] + ")" + "</span>";
                    });
                }
            }
        }

        // Créer une fenêtre flottante pour afficher les mots trouvés et leur occurrence
        var popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '10px';
        popup.style.transform = 'translateY(-50%)'; // Centré verticalement
        popup.style.padding = '10px';
        popup.style.background = 'black';
        popup.style.color = 'white';
        popup.style.border = '1px solid #ccc';
        popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        popup.innerHTML = '<h3>Mots trouvés :</h3><ul>' + Object.keys(results).map(function(result) {
            return '<li>' + result + ' (' + results[result] + ')</li>';
        }).join('') + '</ul>';
        document.body.appendChild(popup);
    }

    // Attendre 20 secondes avant d'appeler la fonction pour surligner les mots et afficher la fenêtre flottante
    setTimeout(function() {
        highlightTextAndShowPopup();
    }, 10000);
})();

//Noms de couleurs prédéfinis :
//yellow (jaune)
//red (rouge)
//blue (bleu)
//green (vert)
//orange (orange)

//Codes hexadécimaux :
//Jaune : #FFFF00
//Rouge : #FF0000
//Bleu : #0000FF
//Vert : #00FF00
//Orange : #FFA500