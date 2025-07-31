document.getElementById('mobileID-generator').addEventListener('submit', function(event) {
    event.preventDefault();

    const surname = document.getElementById('surname-name').value;
    const firstName = document.getElementById('first-name').value;
    const middleName = document.getElementById('middle-name').value;
    const email = document.getElementById('email-address').value;
    const studentId = document.getElementById('student-id').value;
    const track = document.getElementById('track').value;

    const mobileID = generateMobileID(surname, firstName, middleName, email, studentId, track);
    displayResult(mobileID);
});

function generateMobileID(surname, firstName, middleName, email, studentId, track) {
    return `${surname.charAt(0)}${firstName.charAt(0)}${middleName.charAt(0)}-${studentId}-${track}`;
}

function displayResult(mobileID) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>Your Mobile ID:</h2><p>${mobileID}</p>`;
}