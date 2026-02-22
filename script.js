const video = document.getElementById("video");
const captureBtn = document.getElementById("capture-btn");
const timerInput = document.getElementById("timer");
const photosContainer = document.getElementById("photos");
const filterSelect = document.getElementById("filter");
const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewerImage");
const closeViewer = document.getElementById("closeViewer");

navigator.mediaDevices
  .getUserMedia({
    video: { width: 1280, height: 720 },
  })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch(() => {
    alert("Camera access denied");
  });

filterSelect.addEventListener("change", () => {
  const value = filterSelect.value;

  if (
    value === "polaroid" ||
    value === "filmy90s" ||
    value === "xp" ||
    value === "softpink"
  ) {
    video.style.filter = "none";
  } else {
    video.style.filter = value;
  }
});

captureBtn.addEventListener("click", () => {
  let timer = parseInt(timerInput.value) || 0;

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
  if (!video.videoWidth || !video.videoHeight) return;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  const selectedFilter = filterSelect.value;

  applyFilter(context, width, height, selectedFilter);

  const frameSrc = localStorage.getItem("selectedFrame");

  if (frameSrc) {
    const frameImg = new Image();

    frameImg.onload = function () {
      const frameRatio = frameImg.width / frameImg.height;
      const canvasRatio = width / height;

      let drawWidth, drawHeight;

      if (canvasRatio > frameRatio) {
        drawWidth = width;
        drawHeight = width / frameRatio;
      } else {
        drawHeight = height;
        drawWidth = height * frameRatio;
      }

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      context.drawImage(frameImg, x, y, drawWidth, drawHeight);
      showPhoto(canvas);
    };

    frameImg.onerror = function () {
      showPhoto(canvas);
    };

    frameImg.src = frameSrc;
  } else {
    showPhoto(canvas);
  }
}

function applyFilter(context, width, height, type) {
  if (type === "polaroid") {
    context.filter = "sepia(40%) contrast(110%) brightness(110%)";
    context.drawImage(video, 0, 0, width, height);
    context.fillStyle = "rgba(255, 248, 220, 0.15)";
    context.fillRect(0, 0, width, height);
  } else if (type === "filmy90s") {
    context.filter = "sepia(70%) contrast(130%) brightness(95%)";
    context.drawImage(video, 0, 0, width, height);
    context.fillStyle = "rgba(255, 200, 150, 0.2)";
    context.fillRect(0, 0, width, height);
  } else if (type === "xp") {
    context.filter = "contrast(120%) saturate(120%) brightness(105%)";
    context.drawImage(video, 0, 0, width, height);
  } else if (type === "softpink") {
    context.filter = "brightness(105%)";
    context.drawImage(video, 0, 0, width, height);
    context.fillStyle = "rgba(255, 182, 193, 0.25)";
    context.fillRect(0, 0, width, height);
  } else {
    context.filter = type;
    context.drawImage(video, 0, 0, width, height);
  }

  context.filter = "none";
}

function showPhoto(canvas) {
  const dataURL = canvas.toDataURL("image/png");

  const photoDiv = document.createElement("div");
  photoDiv.className = "photo";

  const img = document.createElement("img");
  img.src = dataURL;

  const viewBtn = document.createElement("button");
  viewBtn.textContent = "View 👁";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save 💾";

  viewBtn.onclick = () => {
    viewerImage.src = dataURL;
    viewer.style.display = "flex";
  };

  saveBtn.onclick = () => {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "photo.png";
    link.click();
  };

  photoDiv.appendChild(img);
  photoDiv.appendChild(viewBtn);
  photoDiv.appendChild(saveBtn);
  photosContainer.appendChild(photoDiv);
}

closeViewer.onclick = () => {
  viewer.style.display = "none";
};

viewer.onclick = (e) => {
  if (e.target === viewer) {
    viewer.style.display = "none";
  }
};
