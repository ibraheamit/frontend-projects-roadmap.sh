window.addEventListener("DOMContentLoaded", function () {
  const { DateTime } = luxon;

  const picker = flatpickr("#birthdate", {
    dateFormat: "d/m/Y",
    maxDate: new Date(),
    allowInput: true,
    disableMobile: true,
    onChange: function () {
      document.getElementById("error").classList.remove("show");
    },
  });

  const form = document.getElementById("ageForm");
  const resultDiv = document.getElementById("result");
  const ageDetails = document.getElementById("ageDetails");
  const totalDaysDiv = document.getElementById("totalDays");
  const errorDiv = document.getElementById("error");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    errorDiv.classList.remove("show");
    resultDiv.classList.remove("show");

    const birthdateInput = document.getElementById("birthdate").value;

    if (!birthdateInput) {
      errorDiv.textContent = "⚠️ Please select your birthdate";
      errorDiv.classList.add("show");
      return;
    }

    let birthDate;
    try {
      birthDate = DateTime.fromFormat(birthdateInput, "d/M/yyyy");

      if (!birthDate.isValid) {
        birthDate = DateTime.fromFormat(birthdateInput, "dd/MM/yyyy");
      }

      if (!birthDate.isValid) {
        throw new Error("Invalid date");
      }
    } catch (err) {
      errorDiv.textContent =
        "⚠️ Invalid date format. Please select a valid date.";
      errorDiv.classList.add("show");
      return;
    }

    const today = DateTime.now();

    if (birthDate > today) {
      errorDiv.textContent = "⚠️ Birthdate cannot be in the future";
      errorDiv.classList.add("show");
      return;
    }

    const diff = today.diff(birthDate, ["years", "months", "days"]).toObject();
    const totalDays = Math.floor(today.diff(birthDate, "days").days);

    const years = Math.floor(diff.years);
    const months = Math.floor(diff.months);
    const days = Math.floor(diff.days);

    ageDetails.innerHTML = `
                    <div class="age-box" style="animation-delay: 0.1s">
                        <span class="age-number">${years}</span>
                        <span class="age-label">Year${
                          years !== 1 ? "s" : ""
                        }</span>
                    </div>
                    <div class="age-box" style="animation-delay: 0.2s">
                        <span class="age-number">${months}</span>
                        <span class="age-label">Month${
                          months !== 1 ? "s" : ""
                        }</span>
                    </div>
                    <div class="age-box" style="animation-delay: 0.3s">
                        <span class="age-number">${days}</span>
                        <span class="age-label">Day${
                          days !== 1 ? "s" : ""
                        }</span>
                    </div>
                `;

    totalDaysDiv.innerHTML = `
                    You've been alive for<br>
                    <strong>${totalDays.toLocaleString()} days!</strong>
                `;

    resultDiv.classList.add("show");
  });
});
