// ==UserScript==
// @name         Image hosts downloader (multi hosts) AUTO BOTTOM
// @namespace    https://tampermonkey.net/
// @version      2.9
// @description  Bouton + aperçu + téléchargement auto + bouton ouvrir image
// @match        https://prnt.sc/*
// @match        https://ibb.co/*
// @match        https://imgur.com/*
// @match        https://www.img-sharing.com/*
// @match        https://pasteboard.co/*
// @match        https://postimg.cc/*
// @match        https://snipboard.io/*
// @grant        GM_download
// @run-at       document-end
// ==/UserScript==

(function () {

    'use strict';

    /* ================= REGEX ================= */

    const regex = {
        prnt: /^https?:\/\/(img\.lightshot\.app|image\.prntscr\.com)\/.+\.(png|jpg|jpeg|webp)$/i,
        ibb: /^https?:\/\/i\.ibb\.co\/.+\.(png|jpg|jpeg|webp)$/i,
        imgur: /^https?:\/\/i\.imgur\.com\/.+\.(png|jpg|jpeg|webp)$/i,
        imgSharing: /^https?:\/\/.*supabase\.co\/.*\/images\/uploads\/.+\.(png|jpg|jpeg|webp)$/i,
        pasteboard: /^https?:\/\/gcdnb\.pbrd\.co\/images\/.+\.(png|jpg|jpeg|webp)$/i,
        postimg: /^https?:\/\/i\.postimg\.cc\/.+\.(png|jpg|jpeg|webp)/i,
        snipboard: /^https?:\/\/(i\.)?snipboard\.io\/.+\.(png|jpg|jpeg|webp)$/i
    };

    /* ================= PANEL ================= */

    const panel = document.createElement('div');

    panel.style = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        background: rgba(0,0,0,0.85);
        padding: 10px;
        border-radius: 10px;
        width: 180px;
        text-align: center;
        font-family: Arial;
        color: white;
    `;

    const preview = document.createElement('img');

    preview.style = `
        width: 160px;
        max-height: 110px;
        object-fit: contain;
        margin-bottom: 6px;
        border-radius: 6px;
        display: none;
        background: #111;
    `;

    const btn = document.createElement('button');

    btn.textContent = '📥 Télécharger (5s)';

    btn.style = `
        width: 100%;
        padding: 6px;
        background: #4CAF50;
        border: none;
        border-radius: 6px;
        color: white;
        cursor: pointer;
        font-size: 13px;
    `;

    /* ===== NOUVEAU BOUTON ===== */

    const openBtn = document.createElement('button');

    openBtn.textContent = '🌐 Ouvrir image';

    openBtn.style = `
        width: 100%;
        padding: 6px;
        margin-top: 5px;
        background: #2196F3;
        border: none;
        border-radius: 6px;
        color: white;
        cursor: pointer;
        font-size: 13px;
    `;

    panel.append(preview, btn, openBtn);
    document.body.appendChild(panel);

    /* ================= VARIABLES ================= */

    let currentImg = null;
    let autoDownloaded = false;
    let countdown = 5;

    /* ================= FIND IMAGE ================= */

    function findImageURL() {

        const og = document.querySelector('meta[property="og:image"]');

        if (og && og.content) {

            if (regex.postimg.test(og.content)) {
                return og.content.split('?')[0] + '?dl=1';
            }

            if (regex.snipboard.test(og.content)) {
                return og.content;
            }
        }

        for (const img of document.querySelectorAll('img')) {

            const src = img.src || '';

            if (
                regex.prnt.test(src) ||
                regex.ibb.test(src) ||
                regex.imgur.test(src) ||
                regex.imgSharing.test(src) ||
                regex.pasteboard.test(src) ||
                regex.snipboard.test(src)
            ) {
                return src;
            }

            if (regex.postimg.test(src)) {
                return src.split('?')[0] + '?dl=1';
            }
        }

        return null;
    }

    /* ================= NOM FICHIER ================= */

    function getFileName(img) {

        const host = location.hostname;
        const pathParts = location.pathname.split('/').filter(Boolean);
        const ext = img.src.split('.').pop().split('?')[0];

        if (host.includes('postimg.cc')) {
            return `postimg.cc--${pathParts[0]}.${ext}`;
        }

        if (host.includes('snipboard.io')) {
            return `snipboard.io--${pathParts[0]}`;
        }

        if (host.includes('imgur.com')) {

            if (pathParts[0] === 'a' && pathParts[1]) {
                return `imgur.com--a--${pathParts[1]}.${ext}`;
            }

            return `imgur.com--${pathParts[0]}.${ext}`;
        }

        if (host.includes('prnt.sc')) {
            return `prnt.sc--${pathParts[0]}.${ext}`;
        }

        if (host.includes('ibb.co')) {
            return `ibb.co--${pathParts[0]}.${ext}`;
        }

        if (host.includes('img-sharing.com')) {

            if (pathParts[0] === 'v' && pathParts[1]) {
                return `img-sharing.com--v--${pathParts[1]}.${ext}`;
            }

            return `img-sharing.com--${pathParts[0]}.${ext}`;
        }

        if (host.includes('pasteboard.co')) {
            return `pasteboard.co--${pathParts[0]}.${ext}`;
        }

        return img.src.split('/').pop().split('?')[0];
    }

    /* ================= DOWNLOAD ================= */

    function download(img) {

        if (!img || !img.src) return;

        GM_download({
            url: img.src,
            name: getFileName(img),
            saveAs: false
        });
    }

    /* ================= SCAN ================= */

    function scan() {

        const imgURL = findImageURL();

        if (!imgURL) return;

        currentImg = { src: imgURL };

        preview.src = imgURL;
        preview.style.display = 'block';

        preview.onload = function () {

            if (preview.naturalWidth === 0) return;

            if (!autoDownloaded) {

                autoDownloaded = true;
                countdown = 5;

                btn.textContent = `📥 Télécharger (${countdown}s)`;

                const interval = setInterval(() => {

                    countdown--;
                    btn.textContent = `📥 Télécharger (${countdown}s)`;

                    if (countdown <= 0) {

                        clearInterval(interval);
                        download(currentImg);
                        btn.textContent = '📥 Télécharger';
                    }

                }, 1000);
            }
        };
    }

    /* ================= CLICK ================= */

    btn.onclick = () => {

        if (!currentImg) {
            alert('Image non détectée');
            return;
        }

        download(currentImg);
    };

    /* ===== OUVRIR IMAGE ===== */

    openBtn.onclick = () => {

        if (!currentImg || !currentImg.src) {
            alert('Image non détectée');
            return;
        }

        window.open(currentImg.src, '_blank');
    };

    /* ================= START ================= */

    window.addEventListener('load', () => {
        setTimeout(scan, 1200);
    });

    new MutationObserver(scan).observe(document.body, {
        childList: true,
        subtree: true
    });

})();
