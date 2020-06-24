document.querySelector('#go-to-options').addEventListener('click', function() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('../options/options.html'));
    }
});


document.querySelector('#showData').onclick = () => {
    chrome.storage.sync.get(
        function(items){
            console.log(items);
        }
    )
}