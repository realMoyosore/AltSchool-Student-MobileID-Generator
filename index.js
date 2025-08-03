// import { jsPDF } from "jspdf";

document.getElementById("mobileID-generator").addEventListener("submit", async function (e) {
  e.preventDefault();

  const surname = document.getElementById("surname-name").value;
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
  doc.save(`${surname}-${firstName}-MobileID.pdf`);
  alert("Mobile ID generated and saved as PDF!");
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
  doc.save("AltSchool_MobileID.pdf");

  // Card background
  doc.setFillColor(255, 192, 5);
  doc.rect(0, 0, 85.6, 54, 'F');

  // Header
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('AltSchool Student MobileID', 43, 10, { align: 'center' });

});
