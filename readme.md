# NDJSON Converter Chrome Extension

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-%234285F4?logo=google-chrome)
![License](https://img.shields.io/badge/License-MIT-green)

Convert and inspect NDJSON (Newline Delimited JSON) responses directly in your browser's DevTools. Perfect for working with streaming APIs and JSONL formats.

## Features ✨

- **NDJSON Detection** - Automatically detects `application/x-ndjson` responses
- **Real-time Monitoring** - Captures network requests while DevTools is open
- **Pretty-printed JSON** - Formats JSON with syntax highlighting
- **One-Click Copy** - Copy converted JSON to clipboard from popup
- **DevTools Integration** - Dedicated panel in Chrome Developer Tools

## Installation 🛠️

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (top-right toggle)
4. Click "Load unpacked" and select the extension directory

## Usage 🚀

### Using DevTools Panel

1. Open Chrome DevTools (`Ctrl+Shift+I`/`Cmd+Option+I`)
2. Navigate to the "NDJSON Viewer" panel
3. Browse pages - NDJSON responses will automatically appear

### Using Popup

1. Click extension icon in toolbar
2. View all captured NDJSON responses
3. Click "Copy JSON" to copy formatted data
