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

async function allFreeform(currentTabId) {
    const results = await chrome.scripting.executeScript({
        target: {
            tabId: currentTabId,
        },
        func: () => {
            return Array(...document.querySelectorAll(".index .blurb ul .freeforms")).map(x => x.innerText);
        }
    });
    return results;
}

function topFromList(dataList) {

    var obj = {};
    for (var i = 0; i < dataList.length; i++) {
        obj[dataList[i]] = (obj[dataList[i]] || 0) + 1;
    }
    // Create items array
    var items = Object.keys(obj).map(function(key) {
        return [key, obj[key]];
    });
    
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    return items;
}



document.addEventListener('DOMContentLoaded', () => {
    const checkPageButton = document.getElementById('scrape');
    checkPageButton.addEventListener('click', async () => {
        const currentTab = await getCurrentTab();
        const currentTabId = currentTab.id;

        titleResults = await allTitles(currentTabId);
        const titles = titleResults[0].result;
        console.log("scrape", titles);
        chrome.storage.local.set({ titles });

        fandomResults = await allFandoms(currentTabId);
        const fandoms = fandomResults[0].result;
        const topfan = topFromList(fandoms);
        console.log("topfan", topfan);
        chrome.storage.local.set({ topfan });

        freeformResults = await allFreeform(currentTabId);
        const freeform = freeformResults[0].result;
        const topfreeform = topFromList(freeform);
        console.log("top freeform", topfreeform);
        chrome.storage.local.set({ topfreeform });

        await chrome.tabs.create({
            url: 'main.html'
        });
    });
});