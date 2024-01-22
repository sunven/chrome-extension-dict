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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0FBLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDQyxTQUFTLENBQUNDLFdBQVcsQ0FBQyxVQUFVQyxPQUFPLEVBQUVDLE1BQU0sRUFBRUMsWUFBWSxFQUFFO0VBQzVFLElBQUlGLE9BQU8sQ0FBQ0csSUFBSSxJQUFJLFVBQVUsRUFBRTtJQUM5QkMsS0FBSyxDQUFDSixPQUFPLENBQUNLLEdBQUcsQ0FBQyxDQUNmQyxJQUFJLENBQUNDLFFBQVEsSUFBSUEsUUFBUSxDQUFDQyxJQUFJLEVBQUUsQ0FBQyxDQUNqQ0YsSUFBSSxDQUFDSixZQUFZLENBQUM7SUFDckIsT0FBTyxJQUFJLEVBQUM7RUFDZDtBQUNGLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi1kaWN0Ly4vc3JjL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IERPTVB1cmlmeSBmcm9tICdkb21wdXJpZnknXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gIGlmIChyZXF1ZXN0LnR5cGUgPT0gJ2ZldGNoVXJsJykge1xuICAgIGZldGNoKHJlcXVlc3QudXJsKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgICAgLnRoZW4oc2VuZFJlc3BvbnNlKVxuICAgIHJldHVybiB0cnVlIC8vIFdpbGwgcmVzcG9uZCBhc3luY2hyb25vdXNseS5cbiAgfVxufSlcbiJdLCJuYW1lcyI6WyJjaHJvbWUiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJyZXF1ZXN0Iiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwidHlwZSIsImZldGNoIiwidXJsIiwidGhlbiIsInJlc3BvbnNlIiwidGV4dCJdLCJzb3VyY2VSb290IjoiIn0=