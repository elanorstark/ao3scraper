document.addEventListener('DOMContentLoaded', async () => {
    const titleListElement = document.getElementById("title-list");
    const { titles } = await chrome.storage.local.get(['titles']);
    
    titles.forEach(title => {
        const li = document.createElement("li");
        li.innerText = title;
        titleListElement.appendChild(li);
    });

    const fandomListElement = document.getElementById("fandom-list");
    const { topfan } = await chrome.storage.local.get(['topfan']);
    
    topfan.forEach(fandom => {
        const li = document.createElement("li");
        li.innerText = fandom;
        fandomListElement.appendChild(li);
    });

    const freeformListElement = document.getElementById("freeform-list");
    const { topfreeform } = await chrome.storage.local.get(['topfreeform']);
    
    topfreeform.forEach(freeform => {
        const li = document.createElement("li");
        li.innerText = freeform;
        freeformListElement.appendChild(li);
    });
})