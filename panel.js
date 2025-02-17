let requests = [];

// initialize

chrome.devtools.network.onRequestFinished.addListener((request) => {
  request.getContent((body) => {
    if (request.request?.url && request.response?.headers) {
      if (
        request.response.headers.some(
          (header) =>
            header.name.toLowerCase() === "content-type" &&
            header.value.includes("application/x-ndjson")
        )
      ) {
        // Decode base64 and parse NDJSON
        const decoded = atob(body);
        const jsonData = decoded
          .split("\n") // Split into individual JSON lines
          .filter((line) => line.trim()) // Remove empty lines
          .map((line) => JSON.parse(line)); // Parse each line as JSON

        var editor = new JsonEditor("#json-display");
        editor.load(jsonData);
      }
    }
  });
});
