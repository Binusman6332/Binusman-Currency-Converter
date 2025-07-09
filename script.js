// Mapping currency codes to country codes
const currencyToCountry = {
  USD: "US",
  NGN: "NG",
  EUR: "EU",
  GBP: "GB",
  JPY: "JP",
  CAD: "CA",
  AUD: "AU",
  CNY: "CN",
  INR: "IN",
  BRL: "BR",
  ZAR: "ZA",
  RUB: "RU",
  TRY: "TR",
  KRW: "KR",
  AED: "AE",
};

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultText = document.getElementById("result");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");

let currencyRates = {};

// Populate currency dropdowns
async function populateCurrencies() {
  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();
    currencyRates = data.rates;

    const currencyCodes = Object.keys(currencyToCountry);

    currencyCodes.forEach(code => {
      const option1 = document.createElement("option");
      option1.value = code;
      option1.textContent = code;
      fromCurrency.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = code;
      option2.textContent = code;
      toCurrency.appendChild(option2);
    });

    // Set default selected values
    fromCurrency.value = "USD";
    toCurrency.value = "NGN";

    updateFlags();
    convertCurrency();
  } catch (error) {
    console.error("Failed to load currencies:", error);
    resultText.textContent = "Failed to load currency data.";
  }
}

// Update flag images
function updateFlags() {
  const fromCode = fromCurrency.value;
  const toCode = toCurrency.value;

  const fromCountry = currencyToCountry[fromCode];
  const toCountry = currencyToCountry[toCode];

  if (fromCountry) {
    fromFlag.src = `https://flagcdn.com/24x18/${fromCountry.toLowerCase()}.png`;
  } else {
    fromFlag.src = "";
  }

  if (toCountry) {
    toFlag.src = `https://flagcdn.com/24x18/${toCountry.toLowerCase()}.png`;
  } else {
    toFlag.src = "";
  }
}


// Perform currency conversion
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultText.textContent = "Please enter a valid amount.";
    return;
  }

  resultText.textContent = "Converting...";

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    resultText.innerHTML = `
      ${amount} ${from} = <strong>${Number(converted).toLocaleString()}</strong> ${to}<br>
      <small>Exchange rate: 1 ${from} = ${rate.toFixed(2)} ${to}</small>
    `;
  } catch (error) {
    console.error("Conversion failed:", error);
    resultText.textContent = "Conversion failed. Please check your internet.";
  }
}

// Event listeners
fromCurrency.addEventListener("change", () => {
  updateFlags();
  convertCurrency();
});

toCurrency.addEventListener("change", () => {
  updateFlags();
  convertCurrency();
});

amountInput.addEventListener("input", convertCurrency);

// Initialize on page load
populateCurrencies();
