// Initialize Fabric Canvas
const canvas = new fabric.Canvas('editorCanvas', {
  backgroundColor: '#ffffff',
  preserveObjectStacking: true
});

// DOM Elements
const imageUpload = document.getElementById('imageUpload');
const addTextBtn = document.getElementById('addTextBtn');
const ocrBtn = document.getElementById('ocrBtn');
const downloadBtn = document.getElementById('downloadBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const textResult = document.getElementById('textResult');
const extractedText = document.getElementById('extractedText');

// 1. Image Upload Handler
imageUpload.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    fabric.Image.fromURL(event.target.result, function(img) {
      // Scale image to fit canvas
      img.scaleToWidth(canvas.getWidth() * 0.9);
      img.scaleToHeight(canvas.getHeight() * 0.9);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        originX: 'center',
        originY: 'center',
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2
      });
    });
  };
  reader.readAsDataURL(file);
});

// 2. Add Text Handler
addTextBtn.addEventListener('click', function() {
  const text = new fabric.Textbox('Double click to edit', {
    left: 100,
    top: 100,
    fontFamily: 'Inter',
    fontSize: 24,
    fill: '#000000',
    padding: 10,
    borderColor: '#4361ee',
    cornerColor: '#4361ee',
    cornerSize: 10,
    transparentCorners: false
  });

  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.requestRenderAll();
});

// 3. OCR Handler
ocrBtn.addEventListener('click', async function() {
  if (!canvas.backgroundImage) {
    alert('Please upload an image first');
    return;
  }

  try {
    loadingSpinner.classList.remove('hidden');
    textResult.classList.add('hidden');

    // Get image data
    const imageData = canvas.toDataURL('image/png');

    // Run OCR
    const { data: { text } } = await Tesseract.recognize(
      imageData,
      'eng',
      { logger: m => console.log(m) }
    );

    // Show results
    extractedText.textContent = text;
    textResult.classList.remove('hidden');
  } catch (error) {
    alert('OCR failed. Please try a clearer image.');
    console.error(error);
  } finally {
    loadingSpinner.classList.add('hidden');
  }
});

// 4. Export Handler
downloadBtn.addEventListener('click', function() {
  if (!canvas.backgroundImage) {
    alert('Please upload an image first');
    return;
  }

  const link = document.createElement('a');
  link.download = 'image-with-text.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

// Make file input trigger when clicking upload button
document.querySelector('.toolbar').addEventListener('click', (e) => {
  if (e.target.classList.contains('tool-btn') {
    document.getElementById('imageUpload').click();
  }
});
