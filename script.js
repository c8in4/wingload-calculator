function calculateWingload(exitWeight, canopySize, isLbs) {
  const weight = isLbs ? exitWeight : convertWeightUnit(exitWeight);
  const canopy = canopySize;
  const wingload = calculateWingloadWithLbs(weight, canopy);

  return wingload;

  function calculateWingloadWithLbs(weightInLbs, canopyInSqft) {
    return (weightInLbs / canopyInSqft).toFixed(2);
  }

  function convertWeightUnit(weightInKg) {
    const LBS_KG_CONVERSION = 2.204623;
    return weightInKg * LBS_KG_CONVERSION;
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", handleButtonclick);

function handleButtonclick(e) {
  e.preventDefault();
  const weightInput = document.querySelector("#exitWeight");
  const canopyInput = document.querySelector("#canopySize");
  const isLbsInput = document.querySelector("#isLbs");
  const wingloadOutput = document.querySelector("#wingload");

  weightInput.setCustomValidity("");
  if (!weightInput.checkValidity()) {
    if (weightInput.validity.valueMissing) {
      weightInput.setCustomValidity("Please your exit weight.");
    }
    if (weightInput.validity.rangeUnderflow) {
      weightInput.setCustomValidity("Use a number greater than 0.");
    }
    console.log(weightInput.validationMessage);

    weightInput.reportValidity();
    return;
  }

  canopyInput.setCustomValidity("");
  if (!canopyInput.checkValidity()) {
    if (canopyInput.validity.valueMissing) {
      canopyInput.setCustomValidity("Please your canopy size.");
    }
    if (canopyInput.validity.rangeUnderflow) {
      canopyInput.setCustomValidity("Use a number greater than 0.");
    }
    canopyInput.reportValidity();
    return;
  }
  wingloadOutput.textContent = "";

  const weight = weightInput.value;
  const canopy = canopyInput.value;
  const isLbs = isLbsInput.checked;

  const wingload = calculateWingload(weight, canopy, isLbs);
  wingloadOutput.textContent = `${wingload} lbs/sqft`;
}
