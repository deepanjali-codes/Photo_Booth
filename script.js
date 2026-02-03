const video = document.getElementById("video");
const captureBtn = document.getElementById("capture-btn");
const timerInput = document.getElementById("timer");
const photosContainer = document.getElementById("photos");

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
});

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

function capturePhoto() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataURL = canvas.toDataURL("image/png");

  const photoDiv = document.createElement("div");
  photoDiv.classList.add("photo");

  const img = document.createElement("img");
  img.src = dataURL;
  photoDiv.appendChild(img);

  const downloadBtn = document.createElement("button");
  downloadBtn.textContent = "Save";
  downloadBtn.onclick = () => {
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "photo.png";
    a.click();
  };

  photoDiv.appendChild(downloadBtn);
  photosContainer.appendChild(photoDiv);
}
