// ==UserScript==
// @name         Replace words ads from GitHub (proof_X) v6.0
// @namespace    http://tampermonkey.net/
// @version      6.2
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

    // Vérifie la version distante et charge le dictionnaire si nécessaire
    function checkVersionAndLoad(callback) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: VERSION_URL,
            onload: function (resp) {
                try {
                    const versionData = JSON.parse(resp.responseText);
                    const remoteVersion = versionData.version || '0.0';
                    const localVersion = GM_getValue(VERSION_KEY, null);
                    const cachedWords = GM_getValue(CACHE_KEY, null);

                    if (localVersion === remoteVersion && cachedWords) {
                        // Même version → utiliser le cache
                        replacements = cachedWords;
                        ready = true;
                        console.log(`⚡ Version ${remoteVersion} (cache) – mots chargés depuis le cache`);
                        if (callback) callback();
                        return;
                    }

                    // Version différente ou absente → télécharger le dictionnaire
                    console.log(`📦 Nouvelle version ${remoteVersion} détectée, téléchargement du dictionnaire...`);
                    loadWordsFromGitHub(remoteVersion, callback);
                } catch (e) {
                    console.error('❌ Erreur dans version_ads.json :', e);
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
            url: WORDS_URL,
            onload: function (resp) {
                try {
                    const json = JSON.parse(resp.responseText);
                    const words = json.replace || json || {};
                    replacements = words;
                    GM_setValue(CACHE_KEY, words);
                    GM_setValue(VERSION_KEY, version);
                    ready = true;
                    console.log(`✅ Dictionnaire version ${version} chargé depuis GitHub`);
                } catch (e) {
                    console.error('❌ Erreur dans words_ads.json :', e);
                    fallbackToCache(callback);
                }
                if (callback) callback();
            },
            onerror: function () {
                console.error('❌ Impossible de charger words_ads.json');
                fallbackToCache(callback);
            }
        });
    }

    function fallbackToCache(callback) {
        const cachedWords = GM_getValue(CACHE_KEY, null);
        if (cachedWords) {
            replacements = cachedWords;
            ready = true;
            console.warn('⚠️ Utilisation du cache existant (vérification version impossible)');
        } else {
            console.error('❌ Aucun cache disponible, les remplacements ne fonctionneront pas');
        }
        if (callback) callback();
    }

    // Remplacement des mots
    function cleanText(text) {
        if (!ready || Object.keys(replacements).length === 0) return text;
        const sortedKeys = Object.keys(replacements).sort((a, b) => b.length - a.length);
        let result = text;
        for (const word of sortedKeys) {
            const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escaped, 'gi');
            result = result.replace(regex, replacements[word]);
        }
        return result;
    }

    // Écouteur sur les textarea
    function attachListener(textarea) {
        if (textarea.dataset.wordlistener) return;
        textarea.dataset.wordlistener = '1';
        textarea.addEventListener('input', function () {
            if (!ready) return;
            const start = this.selectionStart;
            const end = this.selectionEnd;
            const original = this.value;
            const cleaned = cleanText(original);
            if (original !== cleaned) {
                this.value = cleaned;
                this.selectionStart = start;
                this.selectionEnd = end;
                this.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    }

    function scan() {
        const textareas = document.querySelectorAll('textarea[id^="proof_"]');
        console.log(`🔍 ${textareas.length} textarea(s) trouvé(s)`);
        textareas.forEach(attachListener);
    }

    // Démarrage
    checkVersionAndLoad(() => {
        scan();
    });

    // Surveillance des ajouts dynamiques
    const observer = new MutationObserver(() => {
        if (ready) scan();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
