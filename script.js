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

let isMirrored = false; // Default to natural camera view
mirrorBtn.textContent = "🪞 Mirror off";
mirrorBtn.style.background = "var(--glass-bg)";

// Load and display live frame overlay
const savedFrameSrc = localStorage.getItem("selectedFrame");
if (savedFrameSrc && liveFrame) {
  liveFrame.src = savedFrameSrc;
  liveFrame.style.display = "block";
  liveFrame.style.objectFit = "cover"; // To ensure the frame covers exactly like the capture does
}


// Initialize camera
navigator.mediaDevices
  .getUserMedia({
    video: { width: 1280, height: 720 },
  })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch(() => {
    alert("Camera access denied. Please enable it to use the Photo Booth! 💖");
  });

// Handle Mirror Toggle
mirrorBtn.addEventListener("click", () => {
  isMirrored = !isMirrored;
  // Always keep rotation to fix upside-down camera, toggle horizontal flip on top
  video.style.transform = isMirrored ? "rotate(180deg) scaleX(-1)" : "rotate(180deg)";
  mirrorBtn.textContent = isMirrored ? "🪞 Mirror on" : "🪞 Mirror off";
  mirrorBtn.style.background = isMirrored ? "var(--primary-pink)" : "var(--glass-bg)";
});

// Update preview filter
filterSelect.addEventListener("change", () => {
  const value = filterSelect.value;
  // Special handling for custom filter presets
  if (["polaroid", "filmy90s", "xp", "softpink"].includes(value)) {
    video.style.filter = "none"; // We apply these via canvas logic later, but for preview we can approximate
    if (value === "polaroid") video.style.filter = "sepia(40%) contrast(110%) brightness(110%)";
    if (value === "filmy90s") video.style.filter = "sepia(70%) contrast(130%) brightness(95%)";
    if (value === "xp") video.style.filter = "contrast(120%) saturate(120%) brightness(105%)";
    if (value === "softpink") video.style.filter = "brightness(105%) hue-rotate(-10deg) saturate(110%)";
  } else {
    video.style.filter = value;
  }
});

// Capture Photo with Timer logic
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
  // Flash effect
  flashOverlay.classList.remove("active");
  void flashOverlay.offsetWidth; // Trigger reflow
  flashOverlay.classList.add("active");

  capturePhoto();
}

function capturePhoto() {
  if (!video.videoWidth || !video.videoHeight) return;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Output size (we want high quality)
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  // Handle mirroring for the capture
  if (isMirrored) {
    context.translate(width, 0);
    context.scale(-1, 1);
  }

  // Apply Filter
  const selectedFilter = filterSelect.value;
  applyFilter(context, width, height, selectedFilter);

  // Reset transformation for frame drawing
  if (isMirrored) {
    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  // Load and Draw Frame
  const frameSrc = localStorage.getItem("selectedFrame");
  if (frameSrc) {
    const frameImg = new Image();
    frameImg.onload = function () {
      // Calculate aspect ratio to fit frame
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
    context.filter = type;
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
  };

  actionsDiv.appendChild(viewBtn);
  actionsDiv.appendChild(saveBtn);
  photoDiv.appendChild(img);
  photoDiv.appendChild(actionsDiv);

  // Add to start of gallery
  photosContainer.insertBefore(photoDiv, photosContainer.firstChild);
}

// Global UI controls
closeViewer.onclick = () => (viewer.style.display = "none");
viewer.onclick = (e) => {
  if (e.target === viewer) viewer.style.display = "none";
};
