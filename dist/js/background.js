chrome.runtime.onMessage.addListener((function(e,t,n){if("fetchUrl"==e.type)return fetch(e.url).then((e=>e.text())).then(n),!0}));