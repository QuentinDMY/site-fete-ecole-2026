// Initialize Vercel Analytics event queue before the main script loads.
// Events tracked before the script is ready are buffered and flushed automatically.
(function () {
  if (window.va) return;
  window.va = function () {
    (window.vaq = window.vaq || []).push(arguments);
  };
})();

function trackEvent(name, props) {
  window.va('event', Object.assign({ name: name }, props || {}));
}
