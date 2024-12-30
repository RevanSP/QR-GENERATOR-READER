import './style.css'

document.querySelector('#app').innerHTML = `
<div class="card w-96 bg-base-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-none">
    <div class="card-body">
        <div class="flex flex-col items-center mb-3">
            <h2 class="card-title text-center uppercase">QR GENERATOR & READER</h2>
        </div>
        <div class="join mb-4">
            <input id="inputText"
                class="input w-full input-bordered input-xs join-item bg-base-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-none"
                placeholder="Text ..." />
            <select id="qrOption"
                class="select select-xs w-28 select-bordered join-item bg-base-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-none">
                <option disabled selected>OPTION</option>
                <option>GENERATE QR</option>
                <option>READ QR</option>
            </select>
            <button id="submitButton"
                class="btn join-item btn-xs bg-base-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-none"
                disabled>SUBMIT</button> 
        </div>
        <div id="qrContainer"
            class="p-4 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-none bg-base-300 hidden">
            <img id="qrImage" src="" class="border-2 border-black bg-base-100" />
        </div>
        <textarea id="outputTextarea"
            class="textarea textarea-bordered text-xs bg-base-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-none"
            rows="10" placeholder="Output ..." readonly style="display:none;"></textarea>
        <button id="downloadButton"
            class="btn btn-sm w-full bg-base-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-none hidden mt-3">
            DOWNLOAD
        </button>
        <div class="flex justify-center space-x-4 mt-6">
            <a href="https://www.instagram.com/m9nokuro"
                class="btn btn-white border-2 rounded border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-instagram" viewBox="0 0 16 16">
                    <path
                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                </svg>
            </a>
            <a href="https://github.com/RevanSP"
                class="btn btn-white border-2 rounded border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-github" viewBox="0 0 16 16">
                    <path
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
            </a>
            <a href="https://web.facebook.com/profile.php?id=100082958149027&_rdc=1&_rdr"
                class="btn btn-white border-2 rounded border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-facebook" viewBox="0 0 16 16">
                    <path
                        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>
            </a>
        </div>
        <h3 class="text-center mt-6 font-bold">
            ReiivanTheOnlyOne .
        </h3>
    </div>
</div>
`
const submitButton = document.getElementById('submitButton');
const inputText = document.getElementById('inputText');
const qrOption = document.getElementById('qrOption');
const qrImage = document.getElementById('qrImage');
const qrContainer = document.getElementById('qrContainer');
const downloadButton = document.getElementById('downloadButton');
const outputTextarea = document.getElementById('outputTextarea');

function checkSubmitButtonStatus() {
  const option = qrOption.value;
  const text = inputText.value;
  const isFileInput = inputText.type === 'file' && inputText.files.length > 0;

  if ((option && (text || isFileInput))) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

qrOption.addEventListener('change', () => {
  inputText.value = '';
  outputTextarea.style.display = 'none';
  qrContainer.classList.add('hidden');
  downloadButton.classList.add('hidden');

  inputText.classList.remove('file-input', 'input');

  if (qrOption.value === 'READ QR') {
    inputText.setAttribute('type', 'file');
    inputText.setAttribute('accept', 'image/*');
    inputText.setAttribute('placeholder', 'Upload QR Image');
    inputText.classList.add('file-input');
  } else {
    inputText.setAttribute('type', 'text');
    inputText.removeAttribute('accept');
    inputText.setAttribute('placeholder', 'Text ...');
    inputText.classList.add('input');
  }

  checkSubmitButtonStatus();
});

inputText.addEventListener('input', checkSubmitButtonStatus);

qrOption.addEventListener('change', checkSubmitButtonStatus);

submitButton.addEventListener('click', () => {
  const option = qrOption.value;

  qrContainer.classList.add('hidden');
  downloadButton.classList.add('hidden');
  outputTextarea.style.display = 'none';

  if (option === 'GENERATE QR' && inputText.value) {
    const text = inputText.value;
    const apiUrl = `${import.meta.env.VITE_QR_CREATE_API}?data=${encodeURIComponent(text)}`;
    qrImage.src = apiUrl;

    qrContainer.classList.remove('hidden');
    downloadButton.classList.remove('hidden');

    downloadButton.onclick = () => {
      const link = document.createElement('a');
      link.href = qrImage.src;
      link.download = 'qr-code.png';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  } else if (option === 'READ QR' && inputText.files.length > 0) {
    const file = inputText.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch(import.meta.env.VITE_QR_READ_API, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data && data[0] && data[0].symbol[0].data) {
          outputTextarea.value = data[0].symbol[0].data;
          outputTextarea.style.display = 'block';
        } else {
          alert('No QR code found in the image.');
        }
      })
      .catch(() => {
        alert('Error reading the QR code.');
      });
  } else {
    alert('Please enter text or upload an image.');
  }
});

checkSubmitButtonStatus();