// ==UserScript==
// @name         1.1.1_Franksteinzzz_pcode_digital.birosdmpoldakalsel.id
// @namespace    http://tampermonkey.net/--https://digital.birosdmpoldakalsel.id/
// @version      2024.02.01
// @description  try to take over the world!
// @author       You
// @match        https://sproutgigs.com/jobs/submit-task.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sproutgigs.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

/*
https://digital.birosdmpoldakalsel.id/business-intelligence-management-in-the-healthcare-industry/
*/
(function () {
    'use strict';
    function fillFormWithResponse(response, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = response;
        }
    }
    const foundIndice1 = document.body.textContent.includes("https://digital.birosdmpoldakalsel.id/?job=d5e0a62068d4&worker=3897c90f");//3897c90f
    const foundIndice2 = document.body.textContent.includes("https://digital.birosdmpoldakalsel.id/?job=d5e0a62068d4&worker=909931d0");//909931d0
    const foundIndice3 = document.body.textContent.includes("https://digital.birosdmpoldakalsel.id/?job=d5e0a62068d4&worker=bd89e38e");//bd89e38e
    const foundIndice4 = document.body.textContent.includes("https://digital.birosdmpoldakalsel.id/?job=d5e0a62068d4&worker=ed8b42c5");//ed8b42c5

    if (foundIndice1) {
        const responseProof1 = "https://apelon.com/solutions/?gclid=Cj0KCQiAn-2tBhDVARIsAGmStVkLlCExyoTpapOJV8uQ4Nmnpb-mJ7fCmgfdpFatSMB2sEw3MQkNUDEaAk2xEALw_wcB";
        const responseProof2 = "https://apelon.com/contact";
        const responseProof3 = "pw-4454d54ff7bd130bebcba3ec1f92ab265a49e28259190e8ca4b80154bfaed23f";
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
        
        
    } else if (foundIndice2) {
        const responseProof1 = "https://www.nordicoutdoor.ee/?gclid=CjwKCAiAtt2tBhBDEiwALZuhAAhI8Gx3-lctlCF96fIcUTa6UAovC2Y7Y6wbpOUka6QPjl93ibRYuhoCz6oQAvD_BwE";
        const responseProof2 = "https://www.nordicoutdoor.ee/contact";
        const responseProof3 = "pw-f4cb212fc0ec4ad95de8a17305485a512600f0af340f90b9fbb867b39fde25b2";
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
        
        
    } else if (foundIndice3) {
        const responseProof1 = "https://njrecoverycoach.co/?gclid=EAIaIQobChMI86DPm_v_gwMVxkEVCB0cowRhEAEYASAAEgI9kvD_BwE";
        const responseProof2 = "https://njrecoverycoach.co/contact";
        const responseProof3 = "pw-61c9d0997a5bcf60e0792ca9a671726e9c25826dac9ee00c6144a628f72275ba";
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
        
        
    } else if (foundIndice4) {
        const responseProof1 = "http://www.aitecsa.com/en/?gclid=EAIaIQobChMIlOevlOWDhAMVLWX2CB1A6AofEAEYASAAEgJcXfD_BwE";
        const responseProof2 = "http://www.aitecsa.com/en/contact";
        const responseProof3 = "pw-31ddb0c39d79135100fec6ffc9f822ab49920e57d662b4bc270e5b66a4d09e2f";
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');
        
        
    } else {
        console.error('Indice non trouvé.');
    }

})();
