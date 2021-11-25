async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function allTitles(currentTabId) {
    const results = await chrome.scripting.executeScript({
        target: {
            tabId: currentTabId,
        },
        func: () => {
            return Array(...document.querySelectorAll(".index .blurb .header .heading:nth-child(1) a:nth-child(1)")).map(x => x.innerText);
        }
    });
    return results;
}

async function allFandoms(currentTabId) {
    const results = await chrome.scripting.executeScript({
        target: {
            tabId: currentTabId,
        },
        func: () => {
            return Array(...document.querySelectorAll(".index .blurb .header .fandoms a")).map(x => x.innerText);
        }
    });
    return results;
}



document.addEventListener('DOMContentLoaded', () => {
    const checkPageButton = document.getElementById('scrape');
    checkPageButton.addEventListener('click', async () => {
        const currentTab = await getCurrentTab();
        const currentTabId = currentTab.id;

        titleResults = await allTitles(currentTabId);
        const titles = titleResults[0].result;
        console.log("scrape", titles);
        chrome.storage.local.set({titles});

        fandomResults = await allFandoms(currentTabId);
        const fandoms = fandomResults[0].result;
        console.log("scrape", fandoms);
        chrome.storage.local.set({fandoms});

        await chrome.tabs.create({
             url: 'main.html'
        });
    });
});