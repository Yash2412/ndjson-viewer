chrome.devtools.panels.create(
  "NDJSON Viewer",
  null, // optional icon
  "panel.html"
);

// Create a connection to the background service worker
const backgroundConnection = chrome.runtime.connect({
  name: "devtools-page",
});
