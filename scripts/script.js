let inputTemp;
let selectFUnit;
let selectTUnit;
let convertButton;

let result;
let fTempText;
let fUnitText;
let tTempText;
let tUnitText;

const units = { fahrenheit: 0, celsius: 32, kelvin: 273.15 };

let fTemp = null;
let fUnit = null;
let tUnit = null;

document.addEventListener("DOMContentLoaded", () => {
  inputTemp = document.getElementById("inputTemp");
  selectFUnit = document.getElementById("selectFUnit");
  selectTUnit = document.getElementById("selectTUnit");
  convertButton = document.getElementById("convert");

  result = document.getElementById("result");
  fTempText = document.getElementById("fTemp");
  fUnitText = document.getElementById("fUnit");
  tTempText = document.getElementById("tTemp");
  tUnitText = document.getElementById("tUnit");

  loadSelects([selectFUnit, selectTUnit]);

  inputTemp.addEventListener("input", () => updateValue("ft", inputTemp.value));
  selectFUnit.addEventListener("change", () =>
    updateValue("fu", selectFUnit.value)
  );
  selectTUnit.addEventListener("change", () =>
    updateValue("tu", selectTUnit.value)
  );
  convertButton.addEventListener("click", () => convert());
});

function loadSelects(selects) {
  selects.forEach((select) => {
    Object.keys(units).forEach((unit) => {
      const option = document.createElement("option");
      option.value = unit;
      option.textContent =
        String(unit).charAt(0).toUpperCase() + String(unit).slice(1);
      select.appendChild(option);
    });
  });
}

function updateValue(type, value) {
  switch (type) {
    case "ft":
      fTemp = parseFloat(value);
      break;
    case "fu":
      fUnit = value;
      break;
    case "tu":
      tUnit = value;
      break;
  }
  checkValues();
}

function checkValues() {
  const valid =
    isFinite(fTemp) &&
    fTemp !== null &&
    fTemp !== undefined &&
    Object.keys(units).includes(fUnit) &&
    Object.keys(units).includes(tUnit);

  convertButton.disabled = !valid;
  convertButton.style.cursor = valid ? "pointer" : "default";

  if (!valid) {
    result.style.display = "none";
  }

  return valid;
}

function convert() {
  if (checkValues()) {
    fTempText.textContent = fTemp;
    fUnitText.textContent = fUnit;
    tUnitText.textContent = tUnit;

    tTempText.textContent = convertResult();

    result.style.display = "block";
  } else {
    result.style.display = "none";
  }
}

function convertResult() {
  let temp = fTemp;

  if (fUnit !== tUnit) {
    switch (fUnit) {
      case "fahrenheit":
        if (tUnit === "celsius") {
          temp = fahrenheitToCelsius(temp);
        } else if (tUnit === "kelvin") {
          temp = fahrenheitToCelsius(temp) + units.kelvin;
        }
        break;

      case "celsius":
        if (tUnit === "fahrenheit") {
          temp = (temp * 9) / 5 + units.celsius;
        } else if (tUnit === "kelvin") {
          temp = temp + units.kelvin;
        }
        break;

      case "kelvin":
        if (tUnit === "fahrenheit") {
          temp = (kelvinToCelsius(temp) * 9) / 5 + units.celsius;
        } else if (tUnit === "celsius") {
          temp = kelvinToCelsius(temp);
        }
        break;
    }
  }

  return temp.toFixed(3);
}

function fahrenheitToCelsius(temp) {
  return ((temp - units.celsius) * 5) / 9;
}

function kelvinToCelsius(temp) {
  return temp - units.kelvin;
}
