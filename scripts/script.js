let inputTemp;
let selectFUnit;
let selectTUnit;
let convertButton;

const units = ["Fahrenheit", "Celsius", "Kelvin"];

let fTemp = null;
let fUnit = null;
let tTemp = null;
let tUnit = null;

document.addEventListener("DOMContentLoaded", () => {
  inputTemp = document.getElementById("inputTemp");
  selectFUnit = document.getElementById("selectFUnit");
  selectTUnit = document.getElementById("selectTUnit");
  convertButton = document.getElementById("convert");

  loadSelects(units, [selectFUnit, selectTUnit]);

  inputTemp.addEventListener("input", updateValue("ft", inputTemp.value));
  selectFUnit.addEventListener("change", updateValue("fu", selectFUnit.value));
  selectTUnit.addEventListener("change", updateValue("tu", selectTUnit.value));
  convertButton.addEventListener("click", convert());

  checkValues();
});

function loadSelects(units, selects) {
  selects.forEach((select) => {
    units.forEach((unit) => {
      const option = document.createElement("option");
      option.value = unit;
      option.textContent = unit;
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
  const valid = !isNaN(fTemp) && units.includes(fUnit) && units.includes(tUnit);
  convertButton.disabled = !valid;
}

function convert() {}
