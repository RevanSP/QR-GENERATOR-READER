const QR_CREATE_API = "https://api.qrserver.com/v1/create-qr-code/";
const QR_READ_API = "https://api.qrserver.com/v1/read-qr-code/";

function switchTab(mode) {
  const generateSection = document.getElementById("generateSection");
  const readSection = document.getElementById("readSection");
  const developerSection = document.getElementById("developerSection");
  const tabGenerate = document.getElementById("tabGenerate");
  const tabRead = document.getElementById("tabRead");
  const tabDeveloper = document.getElementById("tabDeveloper");

  generateSection.style.display = "none";
  readSection.style.display = "none";
  developerSection.style.display = "none";

  tabGenerate.classList.remove("tab-active");
  tabRead.classList.remove("tab-active");
  tabDeveloper.classList.remove("tab-active");

  if (mode === "generate") {
    generateSection.style.display = "block";
    tabGenerate.classList.add("tab-active");
  } else if (mode === "read") {
    readSection.style.display = "block";
    tabRead.classList.add("tab-active");
  } else if (mode === "developer") {
    developerSection.style.display = "block";
    tabDeveloper.classList.add("tab-active");
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      lucide.createIcons();
    });
  });
}

async function generateQR() {
  const text = document.getElementById("inputText").value.trim();
  if (!text) {
    alert("Please enter text or URL!");
    return;
  }

  const size = document.getElementById("qrSize").value;
  const format = document.getElementById("qrFormat").value;
  const ecc = document.getElementById("qrEcc").value;
  const margin = document.getElementById("qrMargin").value;
  const color = document.getElementById("qrColor").value.replace("#", "");
  const bgcolor = document.getElementById("qrBgColor").value.replace("#", "");

  const apiUrl = `${QR_CREATE_API}?data=${encodeURIComponent(
    text
  )}&size=${size}x${size}&format=${format}&ecc=${ecc}&margin=${margin}&color=${color}&bgcolor=${bgcolor}`;

  try {
    const response = await fetch(apiUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `qr-code.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error generating QR:", error);
    alert("Failed to generate or download QR code. Please try again.");
  }
}

function readQR() {
  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length === 0) {
    alert("Please upload an image!");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  fetch(QR_READ_API, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data && data[0] && data[0].symbol[0].data) {
        const result = data[0].symbol[0].data;
        const textarea = document.getElementById("outputTextarea");
        textarea.value = result;
        
        const readResult = document.getElementById("readResult");
        readResult.classList.remove("hidden");
        
        toggleCopyButton();
        lucide.createIcons();
      } else {
        alert("No QR code found in the image or unable to read it.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error reading the QR code. Please try again.");
    });
}

function copyResult() {
  const textarea = document.getElementById("outputTextarea");
  textarea.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
}

const fileInput = document.getElementById("fileInput");
const readButton = document.getElementById("readButton");
const outputTextarea = document.getElementById("outputTextarea");

function toggleReadButton() {
  if (fileInput && fileInput.files.length > 0) {
    readButton.disabled = false;
    readButton.classList.remove(
      "bg-green-300",
      "opacity-70",
      "cursor-not-allowed"
    );
    readButton.classList.add("bg-green-500");
  } else if (readButton) {
    readButton.disabled = true;
    readButton.classList.remove("bg-green-500");
    readButton.classList.add(
      "bg-green-300",
      "opacity-70",
      "cursor-not-allowed"
    );
  }
}

function toggleCopyButton() {
  const copyButton = document.querySelector("#readResult button");
  if (copyButton && outputTextarea && outputTextarea.value.trim() !== "") {
    copyButton.disabled = false;
    copyButton.classList.remove(
      "bg-green-300",
      "opacity-70",
      "cursor-not-allowed"
    );
    copyButton.classList.add("bg-green-500");
  } else if (copyButton) {
    copyButton.disabled = true;
    copyButton.classList.remove("bg-green-500");
    copyButton.classList.add(
      "bg-green-300",
      "opacity-70",
      "cursor-not-allowed"
    );
  }
}

if (fileInput) {
  fileInput.addEventListener("change", toggleReadButton);
}

if (outputTextarea) {
  outputTextarea.addEventListener("input", toggleCopyButton);
}

toggleReadButton();
toggleCopyButton();

lucide.createIcons();