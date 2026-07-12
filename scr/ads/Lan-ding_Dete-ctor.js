// ==UserScript==
// @name         Landing Detector PRO FAST FIXxx
// @namespace    landing-fast
// @version      9.2
// @match        *://*/*_BwE
// @match        *://*/*BwE
// @grant        none
// @run-at       document-end
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    // ================= ÉTAT =================
    const results = new Map();
    let panelVisible = true;
    let panel, toggleBtn;
    let isScanning = false;

    // ================= CLASSIFICATION (sans blog) =================
    function classify(url, text = '') {
        const u = url.toLowerCase();
        const t = text.toLowerCase();

        // Ignorer les blogs
        if (/\/(blog|news|articles|post|category|tag)\//i.test(u)) {
            return null;
        }

        let path = u.split('?')[0].split('#')[0];
        if (path.endsWith('/')) path = path.slice(0, -1);
        const segments = path.split('/').filter(s => s.length > 0);

        const contactKeywords = ['contact', 'contact-us', 'support', 'help', 'assistance', 'faq', 'nous-contacter', 'contactez-nous'];
        const aboutKeywords = ['about', 'about-us', 'a-propos', 'qui-sommes-nous', 'team', 'equipe', 'history', 'story', 'company'];

        for (const seg of segments) {
            if (contactKeywords.includes(seg)) return "Contact Page";
            if (aboutKeywords.includes(seg)) return "About Page";
        }

        const lastSegment = segments[segments.length - 1] || '';
        if (contactKeywords.includes(lastSegment)) return "Contact Page";
        if (aboutKeywords.includes(lastSegment)) return "About Page";

        if (t.length < 20) {
            if (/^(contact|support|help|about|team|story|company)$/i.test(t)) {
                return t.toLowerCase() === 'contact' ? "Contact Page" : "About Page";
            }
        }

        return null;
    }

    // ================= SCAN DU DOM (avec Landing forcé) =================
    function scanDOM() {
        const origin = location.origin;
        const currentUrl = location.href.split('#')[0];

        // 🔥 FORCER la page courante en "Landing Page"
        const currentKey = new URL(currentUrl).pathname;
        results.delete(currentKey);
        results.set(currentKey, { url: currentUrl, type: "Landing Page" });

        document.querySelectorAll('a[href]').forEach(a => {
            const rawHref = a.getAttribute('href');
            const text = a.innerText || '';
            if (!rawHref) return;

            let fullUrl;
            try {
                fullUrl = new URL(rawHref, origin).toString();
            } catch {
                return;
            }

            try {
                const u = new URL(fullUrl);
                if (u.origin !== origin) return;
            } catch {
                return;
            }

            const cleanUrl = fullUrl.split('#')[0];
            const type = classify(cleanUrl, text);
            if (!type) return;

            const key = new URL(cleanUrl).pathname;
            if (!results.has(key)) {
                results.set(key, { url: cleanUrl, type });
            }
        });
    }

    // ================= REQUÊTES HTTP (dictionnaire) =================
    function detectByHttpRequests() {
        return new Promise((resolve) => {
            const origin = location.origin;
            const commonPaths = [
                '/contact', '/contact-us', '/contactez-nous', '/nous-contacter',
                '/about', '/about-us', '/a-propos', '/qui-sommes-nous',
                '/support', '/help', '/assistance', '/faq',
                '/team', '/notre-equipe', '/histoire', '/history',
                '/company', '/our-story'
            ];

            let active = 0;
            const maxConcurrent = 3;
            const queue = [...commonPaths];

            function processQueue() {
                if (queue.length === 0 || active >= maxConcurrent) {
                    if (queue.length === 0 && active === 0) resolve();
                    return;
                }

                const path = queue.shift();
                const fullUrl = origin + path;
                active++;

                fetch(fullUrl, { method: 'HEAD', mode: 'same-origin' })
                    .then(response => {
                        if (response.ok) {
                            const key = new URL(fullUrl).pathname;
                            if (!results.has(key)) {
                                const type = classify(fullUrl, '');
                                if (type) {
                                    results.set(key, { url: fullUrl, type });
                                    console.log(`✅ HTTP detect: ${fullUrl} (${type})`);
                                }
                            }
                        }
                    })
                    .catch(() => {})
                    .finally(() => {
                        active--;
                        processQueue();
                    });
            }

            for (let i = 0; i < maxConcurrent; i++) {
                processQueue();
            }
        });
    }

    // ================= SITEMAP.XML =================
    function detectFromSitemap() {
        return new Promise((resolve) => {
            const origin = location.origin;
            const sitemapUrls = ['/sitemap.xml', '/sitemap_index.xml', '/sitemap/sitemap.xml'];
            let found = false;

            function tryNextSitemap(index) {
                if (index >= sitemapUrls.length || found) {
                    resolve();
                    return;
                }

                const url = origin + sitemapUrls[index];
                fetch(url, { mode: 'same-origin' })
                    .then(res => {
                        if (!res.ok) throw new Error('Not found');
                        return res.text();
                    })
                    .then(xml => {
                        found = true;
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(xml, 'text/xml');
                        const locs = doc.querySelectorAll('url > loc, sitemap > loc');
                        locs.forEach(el => {
                            const urlText = el.textContent.trim();
                            if (urlText) {
                                const type = classify(urlText, '');
                                if (type) {
                                    const key = new URL(urlText).pathname;
                                    if (!results.has(key)) {
                                        results.set(key, { url: urlText, type });
                                        console.log(`✅ Sitemap detect: ${urlText} (${type})`);
                                    }
                                }
                            }
                        });
                        resolve();
                    })
                    .catch(() => tryNextSitemap(index + 1));
            }

            tryNextSitemap(0);
        });
    }

    // ================= SCAN GLOBAL =================
    async function fullScan() {
        if (isScanning) return;
        isScanning = true;
        scanDOM();
        await detectByHttpRequests();
        await detectFromSitemap();
        render();
        isScanning = false;
    }

    // ================= INTERFACE UTILISATEUR =================
    function createUI() {
        panel = document.createElement('div');
        panel.style = `
            position:fixed; top:70px; right:20px;
            width:370px; max-height:500px;
            overflow:auto; background:#1e1e1e; color:#eee;
            padding:12px; font-size:12px; z-index:999999;
            border-radius:12px; font-family: 'Segoe UI', Arial, sans-serif;
            box-shadow: 0 8px 24px rgba(0,0,0,0.7);
            cursor: move;
            border: 1px solid #444;
            transition: all 0.2s;
        `;
        panel.setAttribute('draggable', 'true');
        document.body.appendChild(panel);

        toggleBtn = document.createElement('button');
        toggleBtn.textContent = '−';
        toggleBtn.style = `
            position:fixed; top:45px; right:20px;
            background:#333; color:#fff; border:1px solid #555;
            border-radius:50%; width:32px; height:32px;
            font-size:20px; cursor:pointer; z-index:999999;
            line-height:1;
        `;
        toggleBtn.onclick = togglePanel;
        document.body.appendChild(toggleBtn);

        let isDragging = false, offsetX, offsetY;
        panel.addEventListener('dragstart', (e) => {
            isDragging = true;
            const rect = panel.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
        });
        document.addEventListener('drag', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;
            panel.style.left = x + 'px';
            panel.style.top = y + 'px';
            panel.style.right = 'auto';
        });
        document.addEventListener('dragend', () => { isDragging = false; });

        const btnContainer = document.createElement('div');
        btnContainer.style = 'display:flex; gap:5px; margin-bottom:10px;';
        const rescanBtn = document.createElement('button');
        rescanBtn.textContent = '↻ Rescan';
        rescanBtn.style = 'flex:1; padding:5px; background:#444; color:#fff; border:1px solid #666; border-radius:5px; cursor:pointer;';
        rescanBtn.onclick = () => fullScan();

        const clearBtn = document.createElement('button');
        clearBtn.textContent = '✕ Clear';
        clearBtn.style = 'flex:1; padding:5px; background:#444; color:#fff; border:1px solid #666; border-radius:5px; cursor:pointer;';
        clearBtn.onclick = () => {
            results.clear();
            render();
        };

        btnContainer.appendChild(rescanBtn);
        btnContainer.appendChild(clearBtn);
        panel.appendChild(btnContainer);

        const content = document.createElement('div');
        content.id = 'landing-content';
        panel.appendChild(content);
    }

    function togglePanel() {
        panelVisible = !panelVisible;
        panel.style.display = panelVisible ? 'block' : 'none';
        toggleBtn.textContent = panelVisible ? '−' : '+';
    }

    function render() {
        const content = document.getElementById('landing-content');
        if (!content) return;

        let landingCount = 0, aboutCount = 0, contactCount = 0;
        results.forEach(v => {
            if (v.type === 'Landing Page') landingCount++;
            else if (v.type === 'About Page') aboutCount++;
            else if (v.type === 'Contact Page') contactCount++;
        });
        const total = results.size;

        content.innerHTML = `
            <div style="margin-bottom:8px; border-bottom:1px solid #444; padding-bottom:6px;">
                <span style="font-weight:bold; font-size:14px;">🏷️ Landing PRO</span>
                <span style="color:#888; font-size:11px; margin-left:8px;">${total} pages</span>
                <span style="display:block; font-size:10px; color:#aaa; margin-top:3px;">
                    🟢 ${landingCount} · 🔵 ${contactCount} · 🟠 ${aboutCount}
                </span>
            </div>
        `;

        if (total === 0) {
            content.innerHTML += `<div style="color:#888; text-align:center; padding:10px;">Aucune page détectée</div>`;
            return;
        }

        // ✅ BUG CORRIGÉ : utilisation de l'opérateur ?? (Nullish Coalescing)
        const sorted = Array.from(results.values()).sort((a, b) => {
            const order = { 'Landing Page': 0, 'Contact Page': 1, 'About Page': 2 };
            // Maintenant, 0 n'est pas remplacé par 99 grâce à ??
            return (order[a.type] ?? 99) - (order[b.type] ?? 99);
        });

        sorted.forEach(v => {
            const div = document.createElement('div');
            div.style = 'margin-bottom:6px; padding:6px 8px; border:1px solid #333; border-radius:6px; background:#2a2a2a;';

            const color = v.type === 'Contact Page' ? '#4a9eff' :
                          v.type === 'About Page' ? '#ffa726' : '#66bb6a';

            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="color:${color}; font-weight:bold; font-size:12px;">${v.type}</span>
                    <span style="color:#888; font-size:10px; cursor:pointer; text-decoration:underline;" onclick="window.open('${v.url}','_blank')">🔗</span>
                </div>
                <div style="word-break:break-all; color:#bbb; font-size:11px; margin:4px 0;">${v.url}</div>
                <button style="width:100%; padding:3px; background:#444; color:#fff; border:1px solid #666; border-radius:4px; cursor:pointer; font-size:11px;">Copier</button>
            `;

            const btn = div.querySelector('button');
            btn.onclick = () => {
                navigator.clipboard.writeText(v.url).then(() => {
                    btn.textContent = 'Copié ✓';
                    setTimeout(() => btn.textContent = 'Copier', 1500);
                }).catch(() => {
                    const textarea = document.createElement('textarea');
                    textarea.value = v.url;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    btn.textContent = 'Copié ✓';
                    setTimeout(() => btn.textContent = 'Copier', 1500);
                });
            };

            content.appendChild(div);
        });
    }

    // ================= OBSERVATEUR =================
    function observeNewLinks() {
        let timeout = null;
        const observer = new MutationObserver(() => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const oldSize = results.size;
                scanDOM();
                if (results.size !== oldSize) render();
            }, 500);
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // ================= INIT =================
    async function init() {
        createUI();
        await fullScan();
        observeNewLinks();
        setTimeout(() => fullScan(), 3000);
        console.log('✅ Landing Detector PRO (v3.4 - Bug du 0 corrigé avec ??) actif');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
