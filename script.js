const video = document.getElementById("video");
const captureBtn = document.getElementById("capture-btn");
const timerInput = document.getElementById("timer");
const photosContainer = document.getElementById("photos");
const filterSelect = document.getElementById("filter");
const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewerImage");
const closeViewer = document.getElementById("closeViewer");
const flashOverlay = document.getElementById("flash-overlay");
const mirrorBtn = document.getElementById("mirror-btn");
const liveFrame = document.getElementById("live-frame");
const statusChip = document.getElementById("status-chip");

let isMirrored = false;
let stream = null;

function setStatus(message) {
  if (statusChip) {
    statusChip.textContent = message;
  }
}

function setVideoTransform() {
  if (!video) return;
  video.style.transform = isMirrored ? "rotate(180deg) scaleX(-1)" : "rotate(180deg)";
  video.style.transformOrigin = "center center";

  if (mirrorBtn) {
    mirrorBtn.classList.toggle("active", isMirrored);
    mirrorBtn.textContent = isMirrored ? "🪞 Mirror on" : "🪞 Mirror off";
    mirrorBtn.style.background = isMirrored ? "var(--primary-pink)" : "var(--glass-bg)";
    mirrorBtn.style.color = isMirrored ? "#fff" : "var(--xp-text)";
  }
}

function syncLiveFrame() {
  const savedFrameSrc = localStorage.getItem("selectedFrame");
  if (savedFrameSrc && liveFrame) {
    liveFrame.src = savedFrameSrc;
    liveFrame.style.display = "block";
    liveFrame.style.objectFit = "cover";
    liveFrame.style.opacity = "0.98";
  } else if (liveFrame) {
    liveFrame.style.display = "none";
  }
}

function updatePreviewFilter() {
  const value = filterSelect.value;
  if (["polaroid", "filmy90s", "xp", "softpink"].includes(value)) {
    video.style.filter = "none";
    if (value === "polaroid") video.style.filter = "sepia(40%) contrast(110%) brightness(110%)";
    if (value === "filmy90s") video.style.filter = "sepia(70%) contrast(130%) brightness(95%)";
    if (value === "xp") video.style.filter = "contrast(120%) saturate(120%) brightness(105%)";
    if (value === "softpink") video.style.filter = "brightness(105%) hue-rotate(-10deg) saturate(110%)";
  } else {
    video.style.filter = value;
  }
}

syncLiveFrame();
setVideoTransform();
setStatus("Camera is warming up…");

navigator.mediaDevices
  .getUserMedia({
    video: {
      facingMode: "user",
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
    audio: false,
  })
  .then((mediaStream) => {
    stream = mediaStream;
    video.srcObject = mediaStream;
    video.play();
    setStatus("Camera ready — pick a filter and strike a pose.");
  })
  .catch(() => {
    setStatus("Camera access was blocked. Please allow it to continue.");
    alert("Camera access denied. Please enable it to use the Photo Booth! 💖");
  });

mirrorBtn.addEventListener("click", () => {
  isMirrored = !isMirrored;
  setVideoTransform();
  setStatus(isMirrored ? "Mirror on — your preview flips naturally." : "Mirror off — the preview is back to normal.");
});

filterSelect.addEventListener("change", () => {
  updatePreviewFilter();
  const label = filterSelect.options[filterSelect.selectedIndex].text;
  setStatus(`Filter set to ${label}`);
});

captureBtn.addEventListener("click", () => {
  let countdown = parseInt(timerInput.value) || 0;

  if (countdown > 0) {
    captureBtn.disabled = true;
    const initialText = captureBtn.innerHTML;

    const interval = setInterval(() => {
      captureBtn.innerHTML = `<b>Capturing in ${countdown}... 📸</b>`;
      countdown--;

      if (countdown < 0) {
        clearInterval(interval);
        captureBtn.innerHTML = initialText;
        captureBtn.disabled = false;
        triggerCapture();
      }
    }, 1000);
  } else {
    triggerCapture();
  }
});

function triggerCapture() {
  flashOverlay.classList.remove("active");
  void flashOverlay.offsetWidth;
  flashOverlay.classList.add("active");
  setStatus("Snapping your moment…");
  capturePhoto();
}

function capturePhoto() {
  if (!video.videoWidth || !video.videoHeight) return;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  context.save();
  context.translate(width / 2, height / 2);
  context.rotate(Math.PI);
  if (isMirrored) {
    context.scale(-1, 1);
  }
  context.translate(-width / 2, -height / 2);

  const selectedFilter = filterSelect.value;
  applyFilter(context, width, height, selectedFilter);
  context.restore();

  const frameSrc = localStorage.getItem("selectedFrame");
  if (frameSrc) {
    const frameImg = new Image();
    frameImg.onload = function () {
      const frameRatio = frameImg.width / frameImg.height;
      const canvasRatio = width / height;
      let drawWidth;
      let drawHeight;

      const maxWidth = width * 0.9;
      const maxHeight = height * 0.9;

      if (canvasRatio > frameRatio) {
        drawHeight = maxHeight;
        drawWidth = maxHeight * frameRatio;
      } else {
        drawWidth = maxWidth;
        drawHeight = maxWidth / frameRatio;
      }

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      context.drawImage(frameImg, x, y, drawWidth, drawHeight);
      saveToGallery(canvas);
    };
    frameImg.onerror = () => saveToGallery(canvas);
    frameImg.src = frameSrc;
  } else {
    saveToGallery(canvas);
  }
}

function applyFilter(context, width, height, type) {
  context.save();

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
    context.filter = "brightness(105%) hue-rotate(-10deg) saturate(110%)";
    context.drawImage(video, 0, 0, width, height);
    context.fillStyle = "rgba(255, 182, 193, 0.25)";
    context.fillRect(0, 0, width, height);
  } else {
    context.filter = type === "none" ? "none" : type;
    context.drawImage(video, 0, 0, width, height);
  }

  context.restore();
}

function saveToGallery(canvas) {
  const dataURL = canvas.toDataURL("image/png");

  const photoDiv = document.createElement("div");
  photoDiv.className = "photo";

  const img = document.createElement("img");
  img.src = dataURL;

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "actions";

  const viewBtn = document.createElement("button");
  viewBtn.innerHTML = "👁️ View";
  viewBtn.onclick = () => {
    viewerImage.src = dataURL;
    viewer.style.display = "flex";
  };

  const saveBtn = document.createElement("button");
  saveBtn.innerHTML = "💾 Save";
  saveBtn.onclick = () => {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `slay_${Date.now()}.png`;
    link.click();
    setStatus("Photo saved — your gallery just got a glow-up.");
  };

  actionsDiv.appendChild(viewBtn);
  actionsDiv.appendChild(saveBtn);
  photoDiv.appendChild(img);
  photoDiv.appendChild(actionsDiv);
  photosContainer.insertBefore(photoDiv, photosContainer.firstChild);
  setStatus("Photo added to your gallery — beautiful work.");
}

closeViewer.onclick = () => (viewer.style.display = "none");
viewer.onclick = (e) => {
  if (e.target === viewer) viewer.style.display = "none";
};

document.addEventListener("pointermove", (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty("--mouse-x", `${x}%`);
  document.documentElement.style.setProperty("--mouse-y", `${y}%`);
});
