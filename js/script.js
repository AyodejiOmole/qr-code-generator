const form = document.getElementById("url-form");
const url = document.getElementById("inputtedUrl");
const size = document.getElementById("QRSize");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // clearDetails();

    if(url.value === "") {
        toggleError();
        setTimeout(() => {
            toggleError();
        }, 3000);
    } else {
        toggleSpinner();

        setTimeout(() => {
            toggleSpinner();
            generateQRCode(url.value, size.value);
            togglePopup();
        }, 1000);
    }
});

const generateQRCode = (url, size) => {
    var qr = new QRious({
        element: document.getElementById('qr'),
        value: url,
        background: 'white', // background color
        foreground: 'black', // foreground color
        backgroundAlpha: 1,
        foregroundAlpha: 1,
        level: 'L', // Error correction level of the QR code (L, M, Q, H)
        mime: 'image/png', // MIME type used to render the image for the QR code
        size: size, // Size of the QR code in pixels.
        padding: null // padding in pixels
    })

    qr.toDataURL('image/png');
};

document.getElementById("close").addEventListener("click", () => {
    togglePopup();
})

document.getElementById("download").addEventListener("click", () => {
    const screenshotTarget = document.getElementById("qr");

    html2canvas(screenshotTarget).then((canvas) => {
        const base64image = canvas.toDataURL("image/png");
        var anchor = document.createElement("a");
        anchor.setAttribute("href", base64image);
        anchor.setAttribute("download", "QRCode.png");
        anchor.click();
        anchor.remove();
    });
});

const togglePopup = () => {
    document.getElementById("popup").classList.toggle("hidden");
}

function toggleSpinner() {
    document.getElementById("generated").classList.toggle("hidden");
}

function clearDetails() {
    url.value = "";
    size.value = "";
}

const toggleError = () => {
    document.getElementById("errorText").classList.toggle("hidden");
}