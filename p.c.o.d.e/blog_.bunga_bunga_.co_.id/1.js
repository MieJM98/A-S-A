// ==UserScript==
// @name         1:1:1 Humaira19_pcode_blog.bungabunga.co.id
// @namespace    http://tampermonkey.net/--https://blog.bungabunga.co.id/
// @version      2024.01.23--18:54
// @description  try to take over the world!
// @author       You
// @match        https://sproutgigs.com/jobs/submit-task.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sproutgigs.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==


/*

Go to: https://blog.bungabunga.co.id/?job=**************&worker=********
Visit the internal link to get to my website "READ MORE" (my website : blog.bun**bunga.co.id)
Visit the 1st to 17th articles slowly and you will find next post below
17th articles :  https://blog.bungabunga.co.id/how-business-intelligence-works-and-its-benefits/

10th articles :  https://blog.bungabunga.co.id/business-intelligence-for-healthcare/

*/


(function () {
    'use strict';

    // Fonction pour remplir le formulaire avec une réponse
    function fillFormWithResponse(response, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = response;
        }
    }

    // Rechercher le mot "indice" dans la page
    const foundIndice1 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=0863d3b6a910&worker=3897c90f");//3897c90f
    const foundIndice2 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=0863d3b6a910&worker=909931d0");//909931d0
    const foundIndice3 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=0863d3b6a910&worker=bd89e38e");//bd89e38e
    const foundIndice4 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=0863d3b6a910&worker=ed8b42c5");//ed8b42c5

    if (foundIndice1) {
        // Définir les réponses pour indice1 "3897c90f"  katty22
        const responseProof1 = "https://www.youtube.com/@jonathannormolle?sub_confirmation=1&gclid=CjwKCAiA5L2tBhBTEiwAdSxJX0epqUS98z6VM0RU5XPXkI7RMJsaieak7Pp9lyw9ug-ggR9N-uMR-BoCVKcQAvD_BwE";
        const responseProof2 = "https://www.youtube.com/contact";
        const responseProof3 = "pw-daa3f869e3d56a74e5bc0deb384e326cb0ded2c0a3e68e14fa7944d3f2f9384c";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else if (foundIndice2) {
        // Définir les réponses pour indice2 "909931d0" Mikajm98
        const responseProof1 = "https://cef-france.com/?gclid=CjwKCAiA5L2tBhBTEiwAdSxJX_PjR3KY-9L4qd6CD7c42HDfdfQbA4_W7smEGOFgKIOMO6iQWoYjvRoCjFsQAvD_BwE";
        const responseProof2 = "https://cef-france.com/contact";
        const responseProof3 = "pw-9c7f0b4cd9f86c0b6f3f1b9c7a50d759f3e25d9dbc2f2ecf8a31c511f5466606";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else if (foundIndice3) {
        // Définir les réponses pour indice3 "bd89e38e" Nirina11
        const responseProof1 = "https://www.youtube.com/@ericrosenfeldsmusicvideos614?sub_confirmation=1&gclid=CjwKCAiA5L2tBhBTEiwAdSxJX3Ql-c9WBg--z2Dv6k7eKLri5IEvgrOexCV9MRqwcFFRxS-DdXzMyxoCoXoQAvD_BwE";
        const responseProof2 = "https://www.youtube.com/contact";
        const responseProof3 = "pw-pw-18f68b3dd7a8ceed6aeae9aaf5c043e9574889b610704bd50dec340e5db33185";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else if (foundIndice4) {
        // Définir les réponses pour indice4 "ed8b42c5" Aingarakoto
        const responseProof1 = "https://www.youtube.com/@ericrosenfeldsmusicvideos614?sub_confirmation=1&gclid=CjwKCAiA5L2tBhBTEiwAdSxJXxGmjMRB-l5ZJTfY4MUiFzYqgi2MoCbSWLUOLnNN6dbGA9ExaAWNLxoC348QAvD_BwE";
        const responseProof2 = "https://www.youtube.com/contact";
        const responseProof3 = "pw-7823b9ebd4bff0dd563a7d367e6f62f3c27206614ce6590a999d22e09a90d83d";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else {
        console.error('Indice non trouvé.');
    }

})();




//////////////////////////////////////////////////////21 JANVIER 2024///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(function () {
    'use strict';

    // Fonction pour remplir le formulaire avec une réponse
    function fillFormWithResponse(response, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = response;
        }
    }

    // Rechercher le mot "indice" dans la page
    const foundIndice1 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=5355ca098856&worker=3897c90f");//3897c90f
    const foundIndice2 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=5355ca098856&worker=909931d0");//909931d0
    const foundIndice3 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=5355ca098856&worker=bd89e38e");//bd89e38e
    const foundIndice4 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=5355ca098856&worker=ed8b42c5");//ed8b42c5

    if (foundIndice1) {
        // Définir les réponses pour indice1 "3897c90f"  katty22
        const responseProof1 = "https://gsglitzygalleria.com/?gclid=Cj0KCQiAnrOtBhDIARIsAFsSe52LdfZLMcEI_CQFNXlRi2piyzB3z67G964Z8X_xg7Uc2gel4p_LNPAaAi8QEALw_BwE";
        const responseProof2 = "https://gsglitzygalleria.com/pages/contact";
        const responseProof3 = "pw-b2e96231137d39bdfafec135047163a460385a6a21d510c071216df867ebb68c";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else if (foundIndice2) {
        // Définir les réponses pour indice2 "909931d0" Mikajm98
        const responseProof1 = "ads";
        const responseProof2 = "contacy";
        const responseProof3 = "";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else if (foundIndice3) {
        // Définir les réponses pour indice3 "bd89e38e" Nirina11
        const responseProof1 = "ads";
        const responseProof2 = "contacy";
        const responseProof3 = "";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else if (foundIndice4) {
        // Définir les réponses pour indice4 "ed8b42c5" Aingarakoto
        const responseProof1 = "ads";
        const responseProof2 = "contacy";
        const responseProof3 = "";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else {
        console.error('Indice non trouvé.');
    }

})();


//////////////////////////////////////////////////////20 JANVIER 2024///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(function () {
    'use strict';

    // Fonction pour remplir le formulaire avec une réponse
    function fillFormWithResponse(response, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = response;
        }
    }

    // Rechercher le mot "indice" dans la page
    const foundIndice1 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=fd405e7d45d5&worker=3897c90f");//3897c90f
    const foundIndice2 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=fd405e7d45d5&worker=909931d0");//909931d0
    const foundIndice3 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=fd405e7d45d5&worker=bd89e38e");//bd89e38e
    const foundIndice4 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=fd405e7d45d5&worker=ed8b42c5");//ed8b42c5

    if (foundIndice1) {
        // Définir les réponses pour indice1 "3897c90f"  katty22
        const responseProof1 = "https://www.ginverter.com?gclid=EAIaIQobChMIh_7BqOvrgwMVj0oVCB1WBA8YEAEYASAAEgL1RfD_BwE";
        const responseProof2 = "https://www.ginverter.com/about/contact-us";
        const responseProof3 = "pw-72e727069b2f0be8e677bb4825079b553dc5e01b19d67e49e21a5c7442eaa05c";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else if (foundIndice2) {
        // Définir les réponses pour indice2 "909931d0" Mikajm98
        const responseProof1 = "https://www.youtube.com/@kenardrecord7318?sub_confirmation=1&gclid=EAIaIQobChMIgeLCt-7rgwMVE2AVCB0KlwqQEAEYASAAEgIAPvD_BwE";
        const responseProof2 = "https://www.youtube.com/t/contact_us/";
        const responseProof3 = "pw-c887083bdfd9ed5000eca23d27deac6ff6a4f48b1c8fa25106c0f5210837f52a";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else if (foundIndice3) {
        // Définir les réponses pour indice3 "bd89e38e" Nirina11
        const responseProof1 = "https://denisonconsulting.com/?gclid=EAIaIQobChMIufvqw-_rgwMVbkEVCB1A2AhlEAEYASAAEgKuffD_BwE";
        const responseProof2 = "https://denisonconsulting.com/contact";
        const responseProof3 = "pw-d621c17fc17830a175d5621fd14eb448579db0f9e51b24f848f073ce359084ae";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else if (foundIndice4) {
        // Définir les réponses pour indice4 "ed8b42c5" Aingarakoto
        const responseProof1 = "https://gsglitzygalleria.com/?gclid=Cj0KCQiA-62tBhDSARIsAO7twbYkFx6--arU-rs_M0-WXapR4rPeKC65Yvpk3grY3IhAU9FrPK6epEAaApolEALw_BwE";
        const responseProof2 = "https://gsglitzygalleria.com/pages/contact";
        const responseProof3 = "pw-52ed19f262359f04dd0f7296121a8ad0866cb575d1267ee711d1267b157d8756";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else {
        console.error('Indice non trouvé.');
    }

})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


(function () {
    'use strict';

    // Fonction pour remplir le formulaire avec une réponse
    function fillFormWithResponse(response, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = response;
        }
    }

    // Rechercher le mot "indice" dans la page
    const foundIndice1 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=92acec23ebf4&worker=3897c90f");//3897c90f
    const foundIndice2 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=92acec23ebf4&worker=909931d0");//909931d0
    const foundIndice3 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=92acec23ebf4&worker=bd89e38e");//bd89e38e
    const foundIndice4 = document.body.textContent.includes("https://blog.bungabunga.co.id/?job=92acec23ebf4&worker=ed8b42c5");//ed8b42c5

    if (foundIndice1) {
        // Définir les réponses pour indice1 "3897c90f"  katty22
        const responseProof1 = "ads";
        const responseProof2 = "contacy";
        const responseProof3 = "";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else if (foundIndice2) {
        // Définir les réponses pour indice2 "909931d0" Mikajm98
        const responseProof1 = "ads";
        const responseProof2 = "contacy";
        const responseProof3 = "";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else if (foundIndice3) {
        // Définir les réponses pour indice3 "bd89e38e" Nirina11
        const responseProof1 = "ads";
        const responseProof2 = "contacy";
        const responseProof3 = "";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else if (foundIndice4) {
        // Définir les réponses pour indice4 "ed8b42c5" Aingarakoto
        const responseProof1 = "ads";
        const responseProof2 = "contacy";
        const responseProof3 = "";

        // Remplir le formulaire avec les réponses
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
    } else {
        console.error('Indice non trouvé.');
    }

})();



