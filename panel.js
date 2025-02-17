let requests = [];

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

        // Store the request data
        requests.push({
          url: request.request.url,
          data: jsonData,
          timestamp: new Date(),
        });

        // Update UI
        updateRequestList();
        updateJsonViewer(jsonData);
      }
    }
  });
});

function updateRequestList() {
  const list = document.getElementById("requestList");
  list.innerHTML = requests
    .map(
      (req, i) => `
    <li class="request-item" onclick="showRequestData(${i})">
      ${new Date(req.timestamp).toLocaleTimeString()} - ${req.url}
    </li>
  `
    )
    .join("");
}

function updateJsonViewer(data) {
  const viewer = document.getElementById("jsonViewer");
  viewer.innerHTML = "";
  viewer.appendChild(createDomForJson(data));
}

function createDomForJson(data, path = "", isRoot = false) {
  const container = document.createElement("div");
  container.className =
    "json-container" + (isRoot ? " root" : "") + " collapsed";

  if (typeof data === "object" && data !== null) {
    const isArray = Array.isArray(data);

    // Create expander
    const expander = document.createElement("span");
    expander.className = "json-expander";
    expander.innerHTML = `
      <svg viewBox="0 0 24 24" width="12" height="12">
        <path d="M10 6L16 12L10 18" stroke="currentColor" fill="none"/>
      </svg>
    `;
    expander.onclick = toggleCollapse;

    // Create brackets/braces
    const opener = document.createElement("span");
    opener.className = "json-bracket";
    opener.textContent = isArray ? "[" : "{";

    const closer = document.createElement("span");
    closer.className = "json-bracket";
    closer.textContent = isArray ? "]" : "}";

    // Create content container
    const content = document.createElement("div");
    content.className = "json-content";
    content.style.display = "none";

    // Create children with commas
    if (isArray) {
      data.forEach((item, index) => {
        const element = document.createElement("div");
        element.className = "json-entry";
        element.appendChild(createDomForJson(item, `${path}[${index}]`));

        // Add comma after all but last element
        if (index < data.length - 1) {
          const comma = document.createElement("span");
          comma.className = "json-comma";
          comma.textContent = ",";
          element.appendChild(comma);
        }

        content.appendChild(element);
      });
    } else {
      const entries = Object.entries(data);
      entries.forEach(([key, value], index) => {
        const element = document.createElement("div");
        element.className = "json-entry";

        const keySpan = document.createElement("span");
        keySpan.className = "json-key";
        keySpan.textContent = `${key}: `;

        element.appendChild(keySpan);
        element.appendChild(createDomForJson(value, `${path}.${key}`));

        // Add comma after all but last element
        if (index < entries.length - 1) {
          const comma = document.createElement("span");
          comma.className = "json-comma";
          comma.textContent = ",";
          element.appendChild(comma);
        }

        content.appendChild(element);
      });
    }

    // Create ellipsis
    const ellipsis = document.createElement("span");
    ellipsis.className = "json-ellipsis";
    ellipsis.textContent = "...";
    ellipsis.style.display = "inline";

    // Assemble elements
    container.appendChild(expander);
    container.appendChild(opener);
    container.appendChild(content);
    container.appendChild(ellipsis);
    container.appendChild(closer);

    // Set initial expander rotation
    const svg = expander.querySelector("svg");
    svg.style.transform = "rotate(-90deg)";
  } else {
    // Primitive values
    const valueSpan = document.createElement("span");
    valueSpan.className =
      typeof data === "string"
        ? "json-string"
        : typeof data === "number"
        ? "json-number"
        : typeof data === "boolean"
        ? "json-boolean"
        : "json-null";
    valueSpan.textContent = typeof data === "string" ? `"${data}"` : data;
    container.appendChild(valueSpan);
  }

  return container;
}

function toggleCollapse(e) {
  const container = e.target.closest(".json-container");
  const content = container.querySelector(".json-content");
  const ellipsis = container.querySelector(".json-ellipsis");
  const expander = container.querySelector(".json-expander svg");

  container.classList.toggle("collapsed");
  content.style.display = container.classList.contains("collapsed")
    ? "none"
    : "block";
  ellipsis.style.display = container.classList.contains("collapsed")
    ? "inline"
    : "none";
  expander.style.transform = container.classList.contains("collapsed")
    ? "rotate(-90deg)"
    : "rotate(0deg)";
}

function showRequestData(index) {
  updateJsonViewer(requests[index].data);
}

function clearRequests() {
  requests = [];
  document.getElementById("requestList").innerHTML = "";
  document.getElementById("jsonViewer").innerHTML = "";
}

function createRequestItem(request) {
  const li = document.createElement("li");
  li.className = "request-item";
  li.textContent = `${request.method} ${request.url}`;

  li.addEventListener("click", () => {
    // Remove selection from all items
    document.querySelectorAll(".request-item").forEach((item) => {
      item.classList.remove("selected");
    });
    // Add selection to clicked item
    li.classList.add("selected");
    // Update JSON viewer
    updateJsonViewer(request);
  });

  return li;
}
