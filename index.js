const inputText = document.querySelector("input");
const selectCountryBox = document.querySelectorAll("select");
const button = document.querySelector("button");
const introText = document.querySelector(".intro-text");
const finalResult = document.querySelector(".final-result");
// fetch and put allin select box.
let countryCode1, countryCode2;
// assign data to select option .
const fetchData = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,currencies,flag"
    );
    const data = await response.json();

    data.forEach((country) => {
      const option = document.createElement("option");
      const firstCurrencyKey = Object.keys(country.currencies)[0];
      option.value = firstCurrencyKey;
      option.text = `${country.flag} ${firstCurrencyKey}- ${country.currencies[firstCurrencyKey].name}`;
      selectCountryBox[0].appendChild(option);
      const option1 = document.createElement("option");
      const firstCurrencyKey1 = Object.keys(country.currencies)[0];
      option1.value = firstCurrencyKey1;
      option1.text = `${country.flag} ${firstCurrencyKey1}- ${country.currencies[firstCurrencyKey1].name}`;
      selectCountryBox[1].appendChild(option1);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
fetchData();

button.addEventListener("click", () => {
  let textValue = inputText.value;
  console.log(textValue);
  if (textValue) {
    introText.textContent = "Loading....";
    countryCode1 = selectCountryBox[0].value;
    countryCode2 = selectCountryBox[1].value;
    console.log(countryCode1, countryCode2);
    exchangedata(textValue, countryCode1, countryCode2);
    setTimeout(resetByDefault,5000);
  }
});
// currency convertor
const exchangedata = async (number, countryCode1, countryCode2) => {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/1958893d57ceebde3204545e/pair/${countryCode1}/${countryCode2}`
    );
    const data = await response.json();
    // console.log(data);
    let result = number * data.conversion_rate;
    introText.textContent = "";
    finalResult.textContent = `${number} ${countryCode1} = ${result} ${countryCode2}`;
  } catch (error) {
    console.log(error);
  }
};

// resetFunction
const resetByDefault = () => {
  finalResult.textContent ="";
}
