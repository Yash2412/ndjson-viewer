document.addEventListener("DOMContentLoaded", async () => {
  const result = await chrome.storage.local.get(null);
  const output = document.getElementById("output");

  for (const [url, ndjson] of Object.entries(result)) {
    try {
      const jsonArray = ndjson
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => JSON.parse(line));

      const pre = document.createElement("pre");
      pre.textContent = JSON.stringify(jsonArray, null, 2);
      output.appendChild(pre);
    } catch (error) {
      console.error("Error parsing NDJSON:", error);
    }
  }

  document.getElementById("copy").addEventListener("click", () => {
    navigator.clipboard.writeText(output.textContent);
  });
});
