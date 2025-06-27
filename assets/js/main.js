function copyCodeToClipboard(code, buttonElement) {
    const isChinesePage = document.documentElement.lang === 'zh-Hant';

    if (!navigator.clipboard || window.location.protocol === 'file:') {
        const alertMessage = isChinesePage 
            ? "複製功能在伺服器環境下運作最佳。請手動複製: " + code
            : "Copy feature works best on a live server. Please copy manually: " + code;
        alert(alertMessage);
        return;
    }

    navigator.clipboard.writeText(code).then(() => {
        const originalText = buttonElement.textContent;
        const copiedText = isChinesePage ? '已複製!' : 'Copied!';
        
        buttonElement.textContent = copiedText;
        buttonElement.classList.remove('bg-fuchsia-600');
        buttonElement.classList.add('bg-green-500');
        buttonElement.disabled = true;

        setTimeout(() => {
            buttonElement.textContent = originalText;
            buttonElement.classList.remove('bg-green-500');
            buttonElement.classList.add('bg-fuchsia-600');
            buttonElement.disabled = false;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
        const errorMessage = isChinesePage ? "複製失敗，請手動複製。" : "Failed to copy code. Please copy manually.";
        alert(errorMessage);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // --- Data Setup ---
    const isChinesePage = document.documentElement.lang === 'zh-Hant';
    const giftCodes = isChinesePage ? [
        { code: 'wd888', reward: '100 寶石, 1萬 金幣' },
        { code: 'topwd666', reward: '1張 英雄召喚券, 100 寶石' },
        { code: 'ob888', reward: '60寶石, 600金幣, 30晉升石等' },
        { code: 'top2025', reward: '1個 隨機傳奇英雄包, 1萬 金幣' },
        { code: 'wd666', reward: '100 寶石, 2瓶 女神之水' }
    ] : [
        { code: 'wd888', reward: '100 Gems, 10k Gold' },
        { code: 'topwd666', reward: '1 Hero Summon Ticket, 100 Gems' },
        { code: 'ob888', reward: '60 Gems, 600 Gold, 30 Promotion Stones, etc.' },
        { code: 'top2025', reward: '1 Random Legendary Hero Pack, 10k Gold' },
        { code: 'wd666', reward: '100 Gems, 2 Goddess Water' }
    ];
    const copyButtonText = isChinesePage ? '複製' : 'Copy';

    // --- Populate Codes Table ---
    const tableBody = document.querySelector('#codes tbody');
    if (tableBody) {
        giftCodes.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-4 font-mono text-lg text-fuchsia-400 align-middle">${item.code}</td>
                <td class="p-4 text-slate-300 align-middle">${item.reward}</td>
                <td class="p-4 align-middle">
                    <button class="bg-fuchsia-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-fuchsia-500 active:bg-fuchsia-700 transition-colors w-20 text-center">${copyButtonText}</button>
                </td>
            `;
            const button = row.querySelector('button');
            button.addEventListener('click', () => copyCodeToClipboard(item.code, button));
            tableBody.appendChild(row);
        });
    }

    // --- Language Switcher Logic ---
    const langSwitcher = document.getElementById('language-switcher');
    if (langSwitcher) {
        const langButton = langSwitcher.querySelector('button');
        const langMenu = langSwitcher.querySelector('div');
        
        langButton.addEventListener('click', function(e) {
            e.stopPropagation();
            langMenu.classList.toggle('hidden');
        });
        
        document.addEventListener('click', function(e) {
            if (!langButton.contains(e.target)) {
                langMenu.classList.add('hidden');
            }
        });
    }
});
