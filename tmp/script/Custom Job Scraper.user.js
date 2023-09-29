// ==UserScript==
// @name         Custom Job Scraper
// @namespace    http://tampermonkey.net/
// @version      30000
// @description  Extract job information and create a downloadable HTML file with clickable links
// @author       Your Name
// @match        https://sproutgigs.com/jobs.php?category=10&sub_category=
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function downloadData(filename, data) {
        const element = document.createElement('a');
        const fileContent = `<html><body><pre>${data}</pre></body></html>`;
        element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(fileContent));
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

    const scrollInterval = setInterval(() => {
        scrollToBottom();
    }, 1000);

    setTimeout(function() {
        clearInterval(scrollInterval);
        const jobItemsDivs = document.querySelectorAll('div.jobs__items');
        let jobInfo = '';

        const successMap = new Map(); // Pour stocker les succès et leurs détails

        jobItemsDivs.forEach(itemsDiv => {
            const links = itemsDiv.querySelectorAll('a');
            const doneCells = itemsDiv.querySelectorAll('.jobs__item-cell--done.d-none.d-md-block.small');
            const successCells = itemsDiv.querySelectorAll('.jobs__item-cell--success.text-center.p-0');
            const levelCells = itemsDiv.querySelectorAll('.jobs__item-cell--level.small');
            const paymentCells = itemsDiv.querySelectorAll('.jobs__item-cell--payment');
            const ttrCells = itemsDiv.querySelectorAll('.jobs__item-cell--ttr.d-none.d-md-block.text-center');

            links.forEach((link, index) => {
                const linkUrl = link.href;
                const doneText = doneCells[index] ? doneCells[index].textContent.trim() : 'N/A';
                const successText = successCells[index] ? successCells[index].textContent.trim() : 'N/A';
                const levelText = levelCells[index] ? levelCells[index].textContent.trim() : 'N/A';
                const paymentText = paymentCells[index] ? paymentCells[index].textContent.trim() : 'N/A';
                const ttrText = ttrCells[index] ? ttrCells[index].textContent.trim() : 'N/A';

                // Construction de l'information de travail
                const jobDetails = `Lien : <a href="${linkUrl}" target="_blank">${linkUrl}</a>\nTerminé : ${doneText}\nSuccès : ${successText}\nNiveau : ${levelText}\nPaiement : ${paymentText}\nTTR : ${ttrText}`;

                // Stockage des détails en fonction du succès
                if (successMap.has(successText)) {
                    successMap.get(successText).push(jobDetails);
                } else {
                    successMap.set(successText, [jobDetails]);
                }
            });
        });

        // Parcourir les succès et générer le texte final
        successMap.forEach((jobs, success) => {
            jobInfo += `------------------------------------------------------------------------------\n                              Succès : ${success}\n------------------------------------------------------------------------------\n\n`;
            jobs.forEach(job => {
                jobInfo += `${job}\n\n`;
            });
        });

        const filename = `donnees-${getCurrentDateTime()}.html`;
        downloadData(filename, jobInfo);
    }, 20000);

})();