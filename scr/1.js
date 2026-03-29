// ==UserScript==
// @name         reimanager (Delay + Full Load)
// @namespace    http://tampermonkey.net/
// @version      5.1
// @description  Autofill avec attente chargement + délais humains
// @match        https://sproutgigs.com/jobs/submit-task.php*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    let hasFilled = false;

    // ===== UTIL =====

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function randomDelay(min = 5000, max = 10000) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ===== FONCTIONS =====

    function getRandomResponses(url) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function(response) {
                    const responses = response.responseText
                        .split("\n")
                        .map(r => r.trim())
                        .filter(r => r);
                    resolve(responses);
                }
            });
        });
    }

    function pickRandom(arr, count) {
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(arr[Math.floor(Math.random() * arr.length)]);
        }
        return result;
    }

    function fillForm(responses, selector) {
        const textarea = document.querySelector(selector);
        if (textarea) textarea.value = responses.join('\n');
    }

    function getSourcesFromIndex(url) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function(response) {
                    const files = response.responseText
                        .split("\n")
                        .map(f => f.trim())
                        .filter(f => f);

                    const sources = files.map(f =>
                        `https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/${f}`
                    );
                    resolve(sources);
                }
            });
        });
    }

    // ===== CONFIGURATIONS TRIÉES PAR SITE =====

    const configs = [
        // ==================== ahlineisa.com ====================
        {
            // https://ahlinesia.com/ny/
            indices: ["https://rebrand.ly/5a41df", "https://rebrand.ly/c.t8.r.f.5i"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/ahli_nesia_.com--ny/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/stnc.txt"
        },
        {
            // https://aki.ahlinesia.com/
            indices: ["https://rebrand.ly/gnjl7t7", "https://rebrand.ly/0c0afc"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.ahli_nesia_.com/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.ahli_nesia_.com/stnc.txt"
        },

        // ==================== apola.co ====================
        {
            // https://apola.co/eco/
            indices: ["https://rebrand.ly/diq7vkx", "https://rebrand.ly/c.t8.r.f.5i"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/apola_.co--eco/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/stnc.txt"
        },
        {
            // https://fuyu.apola.co/
            indices: ["https://rebrand.ly/1dai0k4", "mofogasy"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/fuyu_.apola_.co/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/fuyu_.apola_.co/stnc.txt"
        },

        // ==================== caramantap.com ====================
        {
            // https://aki.caramantap.com/
            indices: ["msh5yrd", "xxxxxxxxx", "sssssssss"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki._caram_antap_.com.txt",
            stnc: "https://pastebin.com/raw/WZDb4YjN"
        },

        // ==================== combinesia.web.id ====================
        {
            // https://combinesia.web.id/eng/
            indices: ["148993", "0000dc00000", "0000000fd0", "000bhg000000"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/combinesia_.web_.id+eng/link.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/combinesia_.web_.id+eng/phrase.txt"
        },
        {
            // https://combinesia.web.id/ny/
            indices: ["https://rebrand.ly/a47a55", "https://rebrand.ly/c.t8.r.f.5i"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/combinesia_.web_.id--ny/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/stnc.txt"
        },

        // ==================== dinas.id ====================
        {
            // https://dinas.id/eng/
            indices: ["https://rebrand.ly/wj5ath6", "mofo_gasy"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/dinas_.id--eng/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/allstnc6.txt"
        },
        {
            // https://uk.dinas.id/
            indices: ["https://rebrand.ly/735aaa"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/uk_.dinas_.id/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/uk_.dinas_.id/stnc.txt"
        },

        // ==================== duniakicau.net ====================
        {
            // https://duniakicau.net/studyus/
            indices: ["https://rebrand.ly/6ec886", "https://rebrand.ly/c.t8.r.f.5i"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/dunia_kicau_.net--studyus/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/stnc.txt"
        },

        // ==================== fataya.co.id ====================
        {
            // https://fataya.co.id/eco/
            indices: ["https://rebrand.ly/cs0i6vf", "https://rebrand.ly/cs0i6vfdggsgs"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/refs/heads/main/REGI/fataya_.co_.id--eco/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/refs/heads/main/REGI/fataya_.co_.id--eco/stnc.txt"
        },

        // ==================== hadapin.com ====================
        {
            // https://www.hadapin.com/eco/
            indices: ["https://rebrand.ly/b91cb6", "https://rebrand.ly/c.t8.r.f.5i"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/www_.hada_pin_.com--eco/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/stnc.txt"
        },

        // ==================== ikatandinas.com ====================
        {
            // https://eco.ikatandinas.com/
            indices: ["https://rebrand.ly/eel4y9n", "https://rebrand.ly/eel4____y9n"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/eco_.ikata_ndinas_.com/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/eco_.ikata_ndinas_.com/stnc.txt"
        },

        // ==================== jakartastudio.com ====================
        {
            // https://a.jakartastudio.com/
            indices: ["lsa9gu1"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/a._jaka_rta_studio_.com/lnk.txt",
            stnc: "https://pastebin.com/raw/WZDb4YjN"
        },
        {
            // https://b.jakartastudio.com/
            indices: ["mofo---gasy", "https://rebrand.ly/793d28"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/b._jaka_rta_studio_.com/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/allstnc.txt"
        },
        {
            // https://mort.jakartastudio.com/
            indices: ["https://rebrand.ly/e85b05", "MOFOGASY"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/mort._jaka_rta_studio_.com/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/mort._jaka_rta_studio_.com/stnc.txt"
        },

        // ==================== jampena.com ====================
        {
            // https://jampena.com/eco/
            indices: ["mofo_gasy", "https://rebrand.ly/906fop1"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/jam_pena_.com--eco/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/jam_pena_.com--eco/stnc.txt"
        },
        {
            // https://jampena.com/eng/
            indices: ["https://rebrand.ly/c28eb3", "https://rebrand.ly/c.t8.r.f.5i"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/jam_pena_.com--eng/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/stnc.txt"
        },

        // ==================== jasapenulisartikel.my.id ====================
        {
            // https://jasapenulisartikel.my.id/studyus/
            indices: ["https://rebrand.ly/3a76ba", "https://rebrand.ly/c.t8.r.f.5i"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/jasape_nulisa_rtikel_.my_.id--studyus/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/stnc.txt"
        },

        // ==================== jcinema2018.id ====================
        {
            // https://jcinema2018.id/eng/
            indices: ["https://rebrand.ly/nh5m7hj", "**r**********rr**********"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/jcine_ma2018_.id--eng/lnk.txt",
            stnc: "https://pastebin.com/raw/WZDb4YjN"
        },

        // ==================== karirpt.net ====================
        {
            // https://karirpt.net/infoloker/eco/
            indices: ["https://rebrand.ly/8d4d30", "https://rebrand.ly/gqzexvr"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/kari_rpt_.net--infoloker--eco/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/allstnc2.txt"
        },

        // ==================== kelasip.com ====================
        {
            // https://kelasip.com/eng/
            indices: ["https://rebrand.ly/979768", "***_****_***"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/kela_sip_.com--eng/lnk.txt",
            stnc: "https://pastebin.com/raw/WZDb4YjN"
        },

        // ==================== kicaumania.net ====================
        {
            // https://kicaumania.net/eng/
            indices: ["https://rebrand.ly/ad431a", "25071998"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/refs/heads/main/REGI/kicau_mania_.net--eng/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/refs/heads/main/REGI/kicau_mania_.net--eng/stnc.txt"
        },

        // ==================== kyo.iqipedia.com ====================
        {
            // https://kyo.iqipedia.com/
            indices: ["mofo_gasy", "https://rebrand.ly/a12469"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/kyo_.iqipedia_.com/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/kyo_.iqipedia_.com/stnc.txt"
        },

        // ==================== lia.flashtik.com ====================
        {
            // https://lia.flashtik.com/eco/
            indices: ["https://rebrand.ly/c8bf32", "https://rebrand.ly/c.t8.r.f.5i"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/lia_.flash_tik_.com--eco/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/stnc.txt"
        },

        // ==================== lokercepat.id ====================
        {
            // https://lokercepat.id/international/
            indices: ["https://rebrand.ly/j0hlb61", "https://rebrand.ly/801db9"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/loker_cepat_.id--international/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/loker_cepat_.id--international/stnc.txt"
        },

        // ==================== luvizhea.com ====================
        {
            // https://aki.luvizhea.com/
            indices: ["https://rebrand.ly/e9fz56w", "https://rebrand.ly/ct8rf5i"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/stnc.txt"
        },
        {
            // https://luvizhea.com/eco/
            indices: ["https://rebrand.ly/4d3990", "https://rebrand.ly/c.t8.r.f.5i"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/luvi_zhea_.com--eco/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/luvi_zhea_.com--eco/stnc.txt"
        },
        {
            // https://luvizhea.com/real/
            indices: ["https://rebrand.ly/qpmiqt6", "https://rebrand.ly/c.t8.r.f.5i"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/luvi_zhea_.com--real/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/stnc.txt"
        },

        // ==================== maklumatkerja.com ====================
        {
            // https://maklumatkerja.com/eng/
            indices: ["https://rebrand.ly/6y846o1", "xxxxx_xxxx", "sssss_ssss"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/makl_umat_kerja.com+eng/link.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/makl_umat_kerja.com+eng/phrs.txt"
        },

        // ==================== mamwips.com ====================
        {
            // https://mamwips.com/chi/
            indices: ["https://rebrand.ly/pe6zvxf", "https://rebrand.ly/c.t8.r.f.5i"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/mam_wips_.com--chi/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/stnc.txt"
        },

        // ==================== mayuf.id ====================
        {
            // https://www.mayuf.id/studyus/
            indices: ["https://rebrand.ly/cd6baa", "https://rebrand.ly/c.t8.r.f.5i"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/www_.mayuf_.id--studyus/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/stnc.txt"
        },

        // ==================== putarmuter.com ====================
        {
            // https://fuyu.putarmuter.com/
            indices: ["https://rebrand.ly/3kep05b", "https://rebrand.ly/kix26et"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/fuyu_.putar_muter.com/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/fuyu_.putar_muter.com/stnc.txt"
        },

        // ==================== ryu.iqipedia.com ====================
        {
            // https://ryu.iqipedia.com/
            indices: ["https://rebrand.ly/ef6cbd", "https://rebrand.ly/7h32eaa"],
            lnk: "https://pastebin.com/raw/WMx6esnu",
            stnc: "https://pastebin.com/raw/WZDb4YjN"
        },

        // ==================== salamadian.com ====================
        {
            // https://haru.salamadian.com/
            indices: ["https://rebrand.ly/7a0b17", "mofogasy"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/haru_.salam_adian_.com/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/haru_.salam_adian_.com/stnc.txt"
        },
        {
            // https://salamadian.com/ecommerce/
            indices: ["MOFOGASY", "https://rebrand.ly/bkpe9hm"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/salam_adian_.com--ecommerce/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/salam_adian_.com--ecommerce/stnc.txt"
        },

        // ==================== studyau.waktubaca.com ====================
        {
            // https://studyau.waktubaca.com/
            indices: ["https://rebrand.ly/ug0ydtl", "mofogasy"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/study_au._wakt_ubaca_.com/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/study_au._wakt_ubaca_.com/stnc.txt"
        },

        // ==================== tokohwanita.com ====================
        {
            // https://tokohwanita.com/los/
            indices: ["https://rebrand.ly/595b61", "https://rebrand.ly/a1302e"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/tokoh_wanita_.com--los/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/aki_.luviz_hea_.com/stnc.txt"
        },

        // ==================== vivoglobal.id ====================
        {
            // https://vivoglobal.id/eco/
            indices: ["mofo_gasy", "https://rebrand.ly/zwylm85"],
            lnk: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/vivo_global_.id--eco/lnk.txt",
            stnc: "https://raw.githubusercontent.com/MieJM98/A-S-A/main/REGI/vivo_global_.id--eco/stnc.txt"
        }
    ];

    // ===== ATTENDRE PAGE COMPLETE =====

    function waitForFullLoad() {
        return new Promise(resolve => {
            const check = setInterval(() => {
                if (document.readyState === "complete" && document.body.innerText.length > 500) {
                    clearInterval(check);
                    resolve();
                }
            }, 500);
        });
    }

    // ===== LOGIQUE PRINCIPALE =====

    async function runAutoFill() {
        for (const config of configs) {
            const foundIndex = config.indices.find(index =>
                document.body.textContent.includes(index)
            );

            if (foundIndex && !hasFilled) {
                hasFilled = true;
                console.log("[AUTO FILL] Indice trouvé :", foundIndex);

                // ===== PROOF 1 =====
                await sleep(randomDelay());
                console.log("Remplissage proof 1...");
                const r1 = await getRandomResponses(config.lnk);
                fillForm(pickRandom(r1, 1), 'textarea#proof_1');

                // ===== PROOF 2 =====
                await sleep(randomDelay());
                console.log("Remplissage proof 2...");
                const r2 = await getRandomResponses(config.stnc);
                fillForm(pickRandom(r2, 1), 'textarea#proof_2');

                // ===== PROOF 3 =====
                await sleep(randomDelay());
                console.log("Remplissage proof 3...");
                const sources = await getSourcesFromIndex(
                    "https://raw.githubusercontent.com/MieJM98/A-S-A/main/AD/index.txt"
                );
                const randomUrl = sources[Math.floor(Math.random() * sources.length)];
                const r3 = await getRandomResponses(randomUrl);
                fillForm(pickRandom(r3, 2), 'textarea#proof_3');

                return;
            }
        }
        console.log("Aucun indice trouvé.");
    }

    // ===== EXECUTION =====

    (async () => {
        console.log("⏳ Attente chargement complet...");
        await waitForFullLoad();
        console.log("✅ Page chargée, lancement script...");
        await runAutoFill();
    })();

})();
