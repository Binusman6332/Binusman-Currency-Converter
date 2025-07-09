
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultText = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

convertBtn.addEventListener("click", convertCurrency);

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

    resultText.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    resultText.textContent = "Conversion failed.";
    console.error(error);
  }
}
