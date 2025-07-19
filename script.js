const currencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDisplay = document.getElementById("result");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");

// Currency and country code list
const countryCurrency = {
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  NGN: "ng",
  JPY: "jp",
  CAD: "ca",
  AUD: "au",
  INR: "in",
  CNY: "cn",
  BRL: "br",
  ZAR: "za",
  RUB: "ru",
  SAR: "sa"
};

// Populate currency dropdowns
Object.keys(countryCurrency).forEach((code) => {
  const option1 = new Option(code, code);
  const option2 = new Option(code, code);
  currencySelect.add(option1);
  toCurrencySelect.add(option2);
});

// Default selected
currencySelect.value = "USD";
toCurrencySelect.value = "NGN";

// Update flag
function updateFlag(selectElement, imgElement) {
  const code = selectElement.value;
  imgElement.src = `https://flagcdn.com/48x36/${countryCurrency[code]}.png`;
}

// Convert currency
async function convertCurrency() {
  const from = currencySelect.value;
  const to = toCurrencySelect.value;
  const amount = document.getElementById("amount").value;

  if (!amount || isNaN(amount)) {
    resultDisplay.textContent = "Please enter a valid amount";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    resultDisplay.innerHTML = `
      <p>${amount} ${from} = <strong>${converted} ${to}</strong></p>
      <p>💱 1 ${from} = ${rate} ${to}</p>
    `;
  } catch (error) {
    resultDisplay.textContent = "Failed to fetch exchange rate.";
    console.error(error);
  }
}

// Event listeners
amountInput.addEventListener("input", convertCurrency);
currencySelect.addEventListener("change", () => {
  updateFlag(currencySelect, fromFlag);
  convertCurrency();
});
toCurrencySelect.addEventListener("change", () => {
  updateFlag(toCurrencySelect, toFlag);
  convertCurrency();
});

// Initialize flags
updateFlag(currencySelect, fromFlag);
updateFlag(toCurrencySelect, toFlag);

function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Optional: Close the menu when clicking outside
window.addEventListener("click", function(e) {
  const menu = document.getElementById("dropdownMenu");
  const icon = document.querySelector(".menu-icon");
  if (!menu.contains(e.target) && !icon.contains(e.target)) {
    menu.style.display = "none";
  }
});

