document.addEventListener('DOMContentLoaded', async () => {
    const titleListElement = document.getElementById("title-list");
    const { titles } = await chrome.storage.local.get(['titles']);
    
    titles.forEach(title => {
        const li = document.createElement("li");
        li.innerText = title;
        titleListElement.appendChild(li);
    });

    const fandomListElement = document.getElementById("fandom-list");
    const { fandoms } = await chrome.storage.local.get(['fandoms']);
    
    fandoms.forEach(fandom => {
        const li = document.createElement("li");
        li.innerText = fandom;
        fandomListElement.appendChild(li);
    });
})