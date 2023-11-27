/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
// import DOMPurify from 'dompurify'
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == 'fetchUrl') {
    fetch(request.url).then(response => response.text()).then(sendResponse);
    return true; // Will respond asynchronously.
  }
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0FBLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDQyxTQUFTLENBQUNDLFdBQVcsQ0FBQyxVQUFVQyxPQUFPLEVBQUVDLE1BQU0sRUFBRUMsWUFBWSxFQUFFO0VBQzVFLElBQUlGLE9BQU8sQ0FBQ0csSUFBSSxJQUFJLFVBQVUsRUFBRTtJQUM5QkMsS0FBSyxDQUFDSixPQUFPLENBQUNLLEdBQUcsQ0FBQyxDQUNmQyxJQUFJLENBQUNDLFFBQVEsSUFBSUEsUUFBUSxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ2pDRixJQUFJLENBQUNKLFlBQVksQ0FBQztJQUNyQixPQUFPLElBQUksRUFBQztFQUNkO0FBQ0YsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLWRpY3QvLi9zcmMvYmFja2dyb3VuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgRE9NUHVyaWZ5IGZyb20gJ2RvbXB1cmlmeSdcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgaWYgKHJlcXVlc3QudHlwZSA9PSAnZmV0Y2hVcmwnKSB7XG4gICAgZmV0Y2gocmVxdWVzdC51cmwpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAudGhlbihzZW5kUmVzcG9uc2UpXG4gICAgcmV0dXJuIHRydWUgLy8gV2lsbCByZXNwb25kIGFzeW5jaHJvbm91c2x5LlxuICB9XG59KVxuIl0sIm5hbWVzIjpbImNocm9tZSIsInJ1bnRpbWUiLCJvbk1lc3NhZ2UiLCJhZGRMaXN0ZW5lciIsInJlcXVlc3QiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJ0eXBlIiwiZmV0Y2giLCJ1cmwiLCJ0aGVuIiwicmVzcG9uc2UiLCJ0ZXh0Il0sInNvdXJjZVJvb3QiOiIifQ==