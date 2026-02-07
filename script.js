// ====== ELEMENTS ======
const video = document.getElementById("video");
const captureBtn = document.getElementById("capture-btn");
const timerInput = document.getElementById("timer");
const photosContainer = document.getElementById("photos");
const filterSelect = document.getElementById("filter");

// ====== CAMERA ACCESS ======
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error("Camera access denied:", err);
  });

// ====== FILTER LIVE PREVIEW ======
let currentFilter = "none";

if (filterSelect) {
  filterSelect.addEventListener("change", () => {
    currentFilter = filterSelect.value;
    video.style.filter = currentFilter;
  });
}

// ====== CAPTURE BUTTON ======
captureBtn.addEventListener("click", () => {
  let timer = Number(timerInput.value);

  if (timer > 0) {
    captureBtn.disabled = true;
    captureBtn.textContent = `Capture (${timer})`;

    const countdown = setInterval(() => {
      timer--;
      captureBtn.textContent = `Capture (${timer})`;

      if (timer <= 0) {
        clearInterval(countdown);
        captureBtn.textContent = "Click";
        captureBtn.disabled = false;
        capturePhoto();
      }
    }, 1000);
  } else {
    capturePhoto();
  }
});

// ====== CAPTURE PHOTO ======
function capturePhoto() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.filter = currentFilter;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataURL = canvas.toDataURL("image/png");

  const photoDiv = document.createElement("div");
  photoDiv.classList.add("photo");

  const img = document.createElement("img");
  img.src = dataURL;

  // ====== DOWNLOAD BUTTON ======
  const downloadBtn = document.createElement("button");
  downloadBtn.textContent = "Save";
  downloadBtn.addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "photo.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  photoDiv.appendChild(img);
  photoDiv.appendChild(downloadBtn);
  photosContainer.appendChild(photoDiv);
}
