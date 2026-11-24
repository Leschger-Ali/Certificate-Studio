/* Student Name */

const studentNameInput = document.getElementById("studentName");
const studentNamePreview = document.getElementById("student");

function updateStudentNamePreview() {
  studentNamePreview.textContent = studentNameInput.value;
  updateFieldError(studentNameInput, isStudentNameValid());
  updatePrintButton();

}

studentNameInput.addEventListener("input", updateStudentNamePreview);

/* Course Name */

const courseNameInput = document.getElementById("courseName");
const courseNamePreview = document.getElementById("course");

function updateCourseNamePreview() {
  courseNamePreview.textContent = courseNameInput.value;
  updateFieldError(courseNameInput, isCourseNameValid());
  updatePrintButton();

}

courseNameInput.addEventListener("input", updateCourseNamePreview);

/* Instructor  Name */

const instructorNameInput = document.getElementById("instructorName");
const instructorNamePreview = document.getElementById("teacherName");

function updateInstructorNamePreview() {
  instructorNamePreview.textContent = instructorNameInput.value;
  updateFieldError(instructorNameInput, isInstructorNameValid());
  updatePrintButton();

}

instructorNameInput.addEventListener("input", updateInstructorNamePreview);

/* Issued Date  */

const issuedDatePreview = document.getElementById("issuedDate");
const issuedDateInput = document.getElementById("issuedDateInput");

function getTodayIsoValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const todayValue = getTodayIsoValue();
issuedDateInput.value = todayValue;
issuedDatePreview.textContent = new Date().toLocaleDateString("de-DE");

function formatDate(date) {
  today = new Date().toLocaleDateString("de-DE");
  if (!date) return today;
  const [y, m, d] = date.split("-");
  if (!y || !m || !d) return today;
  return `${d}.${m}.${y}`;
}

function updateIssuedDatePreview() {
  issuedDatePreview.textContent = formatDate(issuedDateInput.value);
}

issuedDateInput.addEventListener("input", updateIssuedDatePreview);

/* Certificate Serial-Nr  */

function generateSerialNumber() {
  const number = Math.floor(Math.random() * 1_000_000);
  const digits = String(number).padStart(6, "0");

  return `MA-${digits}`;
}

const serialInput = document.getElementById("certificateSerial");
const serialPreview = document.getElementById("serial-nr");

serialInput.value = generateSerialNumber();
serialPreview.textContent = serialInput.value;

function updateSerialInputPreview() {
  serialPreview.textContent = serialInput.value;
}

serialInput.addEventListener("input", updateSerialInputPreview);

/* Signature Image   */

const signatureImage = document.getElementById("morgenStrenImg");
const signatureInput = document.getElementById("signatureImage");

const defaultSignatureSrc = signatureImage.src;
let signatureUrl = null;

function updateSignaturePreview() {
  const file = signatureInput.files[0];

  if (signatureUrl) {
    URL.revokeObjectURL(signatureUrl);
    signatureUrl = null;
  }

  if (!file || !file.type.startsWith("image/")) {
    signatureImage.src = defaultSignatureSrc;
    return;
  }

  signatureUrl = URL.createObjectURL(file);
  signatureImage.src = signatureUrl;
}
signatureInput.addEventListener("change", updateSignaturePreview);

/*  Fill Button   */

function fillDemo() {
  studentNameInput.value = "Clara Bennett";
  studentNamePreview.textContent = studentNameInput.value;

  courseNameInput.value = "Applied Web Development with JavaScript";
  courseNamePreview.textContent = courseNameInput.value;

  instructorNameInput.value = "Dr. Eleanor Hayes";
  instructorNamePreview.textContent = instructorNameInput.value;

  if (!serialInput.value.trim()) {
    serialInput.value = generateSerialNumber();
  }
  serialPreview.textContent = serialInput.value;

  issuedDateInput.value = todayValue;
  updateIssuedDatePreview();

  signatureInput.value = "";
  updateSignaturePreview();

  validateTextFields();
  updatePrintButton();
}

const fillDemoButton = document.getElementById("btnFillDemo");
fillDemoButton.addEventListener("click", fillDemo);

/*  Reset Button   */

function reset() {
  studentNameInput.value = "";
  studentNamePreview.textContent = "Student Name";

  courseNameInput.value = "";
  courseNamePreview.textContent = "Course Name";

  instructorNameInput.value = "";
  instructorNamePreview.textContent = "Teacher Name";

  serialInput.value = generateSerialNumber();
  serialPreview.textContent = serialInput.value;

  issuedDateInput.value = todayValue;
  updateIssuedDatePreview();

  if (signatureUrl) {
    URL.revokeObjectURL(signatureUrl);
    signatureUrl = null;
  }

  signatureInput.value = "";
  signatureImage.src = defaultSignatureSrc;
  validateTextFields();
  updatePrintButton();

}

const resetButton = document.getElementById("btnReset");
resetButton.addEventListener("click", reset);

/*  Print Button   */

const printButton = document.getElementById("btnPrint");

function isStudentNameValid() {
  return studentNameInput.value.trim().length >= 3;
}

function isCourseNameValid() {
  return courseNameInput.value.trim().length >= 6;
}

function isInstructorNameValid() {
  return instructorNameInput.value.trim().length >= 3;
}

function updateFieldError(input, isValid) {
  const row = input.closest(".row");

  row.classList.toggle("has-error", !isValid);
  input.setAttribute("aria-invalid", String(!isValid));
}

function validateTextFields() {
  updateFieldError(studentNameInput, isStudentNameValid());
  updateFieldError(courseNameInput, isCourseNameValid());
  updateFieldError(instructorNameInput, isInstructorNameValid());
}

function updatePrintButton() {
  const allValid =
    isStudentNameValid() && isCourseNameValid() && isInstructorNameValid();

  printButton.disabled = !allValid;
}

printButton.addEventListener("click", () => {
  window.print();
});
