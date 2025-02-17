# NDJSON Viewer Chrome Extension

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-%234285F4?logo=google-chrome)
![License](https://img.shields.io/badge/License-MIT-green)

Inspect NDJSON (Newline Delimited JSON) responses directly in Chrome Developer Tools. Designed for debugging streaming APIs and JSONL formats.

## Features ✨

- **Automatic NDJSON Detection** - Identifies `application/x-ndjson` responses in Network panel
- **Real-time Stream Monitoring** - Captures and displays NDJSON responses as they arrive
- **Syntax Highlighted Preview** - Pretty-printed JSON with collapsible tree view
- **DevTools Integration** - Dedicated panel in Chrome Developer Tools
- **Clipboard Support** - Copy formatted JSON objects to clipboard

## Installation 🛠️

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (top-right toggle)
4. Click "Load unpacked" and select the extension directory

## Usage 🚀

### Using DevTools Panel

1. Open Chrome DevTools (`Ctrl+Shift+I`/`Cmd+Option+I`)
2. Navigate to the "NDJSON Viewer" panel
3. All NDJSON network responses will automatically appear here

### Extension Popup

1. Click the extension icon in Chrome's toolbar
2. View historical NDJSON responses
3. Click "Copy JSON" to copy formatted data
