document.addEventListener('DOMContentLoaded', async () => {
    const listElement = document.getElementById("list");
    const { titles } = await chrome.storage.local.get(['titles']);
    
    titles.forEach(title => {
        const li = document.createElement("li");
        li.innerText = title;
        listElement.appendChild(li);
    });
})