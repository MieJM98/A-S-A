// ==UserScript==
// @name         Replace words ads from GitHub (proof_X) v6.3
// @namespace    http://tampermonkey.net/
// @version      6.3
// @description  Remplace dynamiquement les mots via words_ads.json (GitHub) avec cache local
// @match        https://sproutgigs.com/jobs/submit-task.php*
// @run-at       document-end
// @connect      raw.githubusercontent.com
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    'use strict';

    const VERSION_URL = 'https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/version_ads.json';
    const WORDS_URL = 'https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/words_ads.json';

    const CACHE_KEY = 'ads_words_cache';
    const VERSION_KEY = 'ads_words_version';

    let replacements = {};
    let ready = false;

    function checkVersionAndLoad(callback) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: VERSION_URL + '?t=' + Date.now(),
            onload: function (resp) {
                try {
                    const versionData = JSON.parse(resp.responseText);
                    const remoteVersion = versionData.version || '0.0';

                    const localVersion = GM_getValue(VERSION_KEY, null);
                    const cachedWords = GM_getValue(CACHE_KEY, null);

                    if (localVersion === remoteVersion && cachedWords) {
                        replacements = cachedWords;
                        ready = true;
                        console.log('⚡ Cache utilisé - version', remoteVersion);

                        if (callback) callback();
                        return;
                    }

                    console.log('📦 Nouvelle version détectée :', remoteVersion);
                    loadWordsFromGitHub(remoteVersion, callback);

                } catch (e) {
                    console.error('❌ Erreur version_ads.json', e);
                    fallbackToCache(callback);
                }
            },
            onerror: function () {
                console.error('❌ Impossible de charger version_ads.json');
                fallbackToCache(callback);
            }
        });
    }

    function loadWordsFromGitHub(version, callback) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: WORDS_URL + '?t=' + Date.now(),
            onload: function (resp) {
                try {
                    const json = JSON.parse(resp.responseText);

                    replacements = json.replace || json || {};

                    GM_setValue(CACHE_KEY, replacements);
                    GM_setValue(VERSION_KEY, version);

                    ready = true;

                    console.log('✅ Dictionnaire chargé depuis GitHub');

                } catch (e) {
                    console.error('❌ Erreur words_ads.json', e);
                    fallbackToCache(callback);
                }

                if (callback) callback();
            },
            onerror: function () {
                console.error('❌ Impossible de charger words_ads.json');
                fallbackToCache(callback);

                if (callback) callback();
            }
        });
    }

    function fallbackToCache(callback) {
        const cachedWords = GM_getValue(CACHE_KEY, null);

        if (cachedWords) {
            replacements = cachedWords;
            ready = true;
            console.warn('⚠️ Utilisation du cache local');
        } else {
            console.error('❌ Aucun dictionnaire disponible');
        }

        if (callback) callback();
    }

    function cleanText(text) {
        if (!ready || !Object.keys(replacements).length) {
            return text;
        }

        const sortedKeys = Object.keys(replacements)
            .sort((a, b) => b.length - a.length);

        let result = text;

        for (const word of sortedKeys) {

            const replacement = replacements[word];

            const escaped = word.replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&'
            );

            let regex;

            // Mot simple
            if (/^[a-zA-Z0-9_]+$/.test(word)) {
                regex = new RegExp(`\\b${escaped}\\b`, 'gi');
            }
            // Expression spéciale
            else {
                regex = new RegExp(escaped, 'gi');
            }

            result = result.replace(regex, replacement);
        }

        return result;
    }

    function processTextarea(textarea) {
        const original = textarea.value;
        const cleaned = cleanText(original);

        if (original !== cleaned) {
            const pos = textarea.selectionStart;

            textarea.value = cleaned;

            try {
                textarea.selectionStart = pos;
                textarea.selectionEnd = pos;
            } catch {}

            textarea.dispatchEvent(
                new Event('change', { bubbles: true })
            );
        }
    }

    function attachListener(textarea) {

        if (textarea.dataset.adsWordListener) {
            return;
        }

        textarea.dataset.adsWordListener = '1';

        textarea.addEventListener('input', function (e) {

            if (!ready) return;

            const char = e.data || '';

            const endOfWord =
                char === ' ' ||
                char === '\n' ||
                char === '\t' ||
                /[.,!?;:()[\]{}]/.test(char);

            if (!endOfWord) {
                return;
            }

            processTextarea(this);
        });

        textarea.addEventListener('paste', function () {
            setTimeout(() => {
                processTextarea(this);
            }, 50);
        });

        textarea.addEventListener('blur', function () {
            processTextarea(this);
        });
    }

    function scan() {
        document
            .querySelectorAll('textarea[id^="proof_"]')
            .forEach(attachListener);
    }

    checkVersionAndLoad(() => {
        scan();
    });

    const observer = new MutationObserver(() => {
        if (ready) {
            scan();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
