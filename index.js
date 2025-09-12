// Main function
document.getElementById("mobileID-generator").addEventListener("submit", async function (e) {
  e.preventDefault();

  const surname = document.getElementById("surname").value;
  const firstName = document.getElementById("first-name").value;
  const middleName = document.getElementById("middle-name").value;
  const email = document.getElementById("email-address").value;
  const studentId = document.getElementById("student-id").value;
  const track = document.getElementById("track").value;

  // Create PDF file
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`Mobile ID for ${firstName} ${surname}`, 10, 10);
  doc.text(`Surname: ${surname}`, 10, 20);
  doc.text(`First Name: ${firstName}`, 10, 30);
  doc.text(`Middle Name: ${middleName}`, 10, 40);
  doc.text(`Email: ${email}`, 10, 50);
  doc.text(`Student ID: ${studentId}`, 10, 60);
  doc.text(`Track: ${track}`, 10, 70);
  document.getElementById("mobileID-generator").reset();

  // Add QR Code feature
  const qrDiv = document.createElement("div");
  qrDiv.style.display = "none";
  document.body.appendChild(qrDiv);
  const qrCode = new QRCode(qrDiv, {
    text: studentId,
    width: 128,
    height: 128,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));
  const qrImg = qrDiv.querySelector("img") || qrDiv.querySelector("canvas");
  let qrDataUrl;
  if (qrImg.tagName === "IMG") {
    qrDataUrl = qrImg.src;
  } else {
    qrDataUrl = qrImg.toDataURL();
  }
  qrDiv.remove();

  doc.addImage(qrDataUrl, "PNG", 10, 80, 40, 40);
  doc.save(`${surname}-${firstName}-AltSchool_MobileID.pdf`);

  // Show success message
  alert("Mobile ID generated successfully!");

});


document.getElementById("mobileID-generator").addEventListener("submit", async function (e) {
  e.preventDefault();

  const surname = document.getElementById("surname").value;
  const firstName = document.getElementById("first-name").value;
  const middleName = document.getElementById("middle-name").value;
  const email = document.getElementById("email-address").value;
  const studentId = document.getElementById("student-id").value;
  const track = document.getElementById("track").value;

  // Update main-content with the user input
  const textSpans = document.querySelectorAll('.text-content span');
  if (textSpans.length >= 6) {
    textSpans[0].textContent = surname;
    textSpans[1].textContent = `${firstName} ${middleName}`;
    textSpans[2].textContent = email;
    textSpans[3].textContent = track;
    textSpans[4].textContent = new Date().toLocaleDateString(); // Issue Date
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    textSpans[5].textContent = expiryDate.toLocaleDateString();
  }

  // Update student photo section
  const photoInput = document.getElementById("idPhoto");
  const studentImageDiv = document.querySelector(".student-image");
  studentImageDiv.innerHTML = ""; // Clear previous image
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      img.alt = "Student Photo";
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.objectFit = "cover";
      studentImageDiv.appendChild(img);
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    studentImageDiv.textContent = "No photo uploaded";
  }

  // Update QR code
  const qrSection = document.querySelector('.qrcode-section');
  qrSection.innerHTML = "";
  const qrCode = new QRCode(qrSection, {
    text: studentId,
    width: 80,
    height: 80
  });

  qrCode.makeCode(studentId);
  document.getElementById("mobileID-generator").reset();
  alert("Mobile ID preview updated!");
});

// Dark mode toggle
document.getElementById("darkModeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

