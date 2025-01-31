const submitButton = document.getElementById('submitButton');
const inputText = document.getElementById('inputText');
const qrOption = document.getElementById('qrOption');
const qrImage = document.getElementById('qrImage');
const qrContainer = document.getElementById('qrContainer');
const downloadButton = document.getElementById('downloadButton');
const outputTextarea = document.getElementById('outputTextarea');

const QR_CREATE_API = 'https://api.qrserver.com/v1/create-qr-code/';
const QR_READ_API = 'https://api.qrserver.com/v1/read-qr-code/';

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
        const apiUrl = `${QR_CREATE_API}?data=${encodeURIComponent(text)}`;
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

        fetch(QR_READ_API, {
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