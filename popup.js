async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

document.addEventListener('DOMContentLoaded', () => {
    const checkPageButton = document.getElementById('scrape');
    checkPageButton.addEventListener('click', async () => {
        const currentTab = await getCurrentTab();
        const currentTabId = currentTab.id;

        const results = await chrome.scripting.executeScript({
            target: {
                tabId: currentTabId,
            },
            func: () => {
                return Array(...document.querySelectorAll("h3 a")).map(x => x.innerText);
            }
        });

        const titles = results[0].result;
        console.log("scrape", titles);
        chrome.storage.local.set({titles});

        await chrome.tabs.create({
             url: 'main.html'
        });
    });
});