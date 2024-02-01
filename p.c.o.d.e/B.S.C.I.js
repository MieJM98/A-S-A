// ==UserScript==
// @name         1:1:1 Angga700_pcode_bigdata.saniter.co.id
// @namespace    http://tampermonkey.net/--https://bigdata.saniter.co.id/
// @version      2024.02.01
// @description  try to take over the world!
// @author       You
// @match        https://sproutgigs.com/jobs/submit-task.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sproutgigs.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==
/*

https://bigdata.saniter.co.id/accounting-software-for-small-business/

*/
(function () {
    'use strict';
    function fillFormWithResponse(response, textareaId) {
        const textarea = document.querySelector(textareaId);
        if (textarea) {
            textarea.value = response;
        }
    }
    const foundIndice1 = document.body.textContent.includes("https://bigdata.saniter.co.id/?job=067a1d8b37fd&worker=3897c90f");//3897c90f
    const foundIndice2 = document.body.textContent.includes("https://bigdata.saniter.co.id/?job=067a1d8b37fd&worker=909931d0");//909931d0
    const foundIndice3 = document.body.textContent.includes("https://bigdata.saniter.co.id/?job=067a1d8b37fd&worker=bd89e38e");//bd89e38e
    const foundIndice4 = document.body.textContent.includes("https://bigdata.saniter.co.id/?job=067a1d8b37fd&worker=ed8b42c5");//ed8b42c5

    if (foundIndice1) {
        const responseProof1 = "https://www.missorisuites.com//?gclid=Cj0KCQiAn-2tBhDVARIsAGmStVlabt_bRoqmLIOgyMOawWk6mZBModKTcChMzuTJRioNZn1LXhmMT10aAvfEEALw_wcB";
        const responseProof2 = "https://www.missorisuites.com/contact";
        const responseProof3 = "pw-37123fd0c4af08e68d7457fdf3af304bddbe623dde5ca5622d38ac91b309a1d2";
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');

    } else if (foundIndice2) {
        const responseProof1 = "https://www.missorisuites.com//?gclid=Cj0KCQiAn-2tBhDVARIsAGmStVk5zIkLMb5fmxSO3-WlEUASSp54UJfxo0SEC7R6P1q36TeW6KTaf0MaAoOiEALw_wcB";
        const responseProof2 = "https://www.missorisuites.com/contact";
        const responseProof3 = "pw-7e277c2558d606ce6ea036fa8d1bc2e25d31c8ed5f2669106457b7a36eb59d36";
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');

    } else if (foundIndice3) {
        const responseProof1 = "https://math.he.net?gclid=Cj0KCQiAn-2tBhDVARIsAGmStVnw6I2iv4_mVTkjLSArgxcKuduhK4moyUkSd-yaqcd0A6Q9WSbhXC0aAo3-EALw_wcB";
        const responseProof2 = "https://math.he.ne/contact";
        const responseProof3 = "pw-b0700b9d2508ec6c32669d83de2df62f6e18fc5f0148a6e4a05d2f6d0f7b5fb0";
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');

    } else if (foundIndice4) {
        const responseProof1 = "https://canadianfuturestrader.ca/trader-evaluations/?gclid=Cj0KCQiAn-2tBhDVARIsAGmStVkMoL9zXs8H65kxkeQ5UAmMr2QXaBJgzY9_OMADLzz-absvMC7tQ3gaAnutEALw_wcB";
        const responseProof2 = "https://canadianfuturestrader.ca/contact";
        const responseProof3 = "pw-0ea47a28ad812a69bf24dcf386d98c1d564940e8681ae995336baab8dead90a3";
        fillFormWithResponse(responseProof1, 'textarea#proof_1.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof2, 'textarea#proof_2.form-control.alert-on-type-task');
        fillFormWithResponse(responseProof3, 'textarea#proof_3.form-control.alert-on-type-task');

    } else {
        console.error('Indice non trouvé.');
    }

})()
