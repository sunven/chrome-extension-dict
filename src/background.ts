// import DOMPurify from 'dompurify'
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == 'fetchUrl') {
    fetch(request.url)
      .then(response => response.text())
      .then(sendResponse)
    return true // Will respond asynchronously.
  }
})
