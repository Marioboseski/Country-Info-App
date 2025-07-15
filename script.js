const form = document.querySelector(".country-form");
const input = document.getElementById("country-input");
const countryResult = document.querySelector(".country-result");


form.addEventListener("submit", async function (e) {
    e.preventDefault();


    const country = input.value.trim();
    if (country === "") {
        throw new Error ("Please enter country");
        return;
    }

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await response.json();
    console.log(data);

    if (!data || data.length === 0) {
      throw new Error ("City not found");
      return;
    }

    const flagUrl = `${data[0].flags.png}`;

    const currenciesObj = data[0].currencies;
    const currencyData = Object.values(currenciesObj)[0]; 

    const symbol = currencyData.symbol;
    const name = currencyData.name;

    const languagesObj = data[0].languages;
    const languagesArray = Object.values(languagesObj);

    const language = languagesArray.join(", ");

    countryResult.innerHTML = `
    <div class="results">

        <section class="name-continents-section">
            <p>${data[0].name.common},</p>
            <p>${data[0].continents}</p>
        </section>


        <img src = "${flagUrl}" width = 100 class="flag-class">

        <section class="currency-section">
            <p>Currency: ${name} (${symbol})</p>
        </section>

        <section class="border-language-section">
            <p>Borders: ${data[0].borders}</p>
            <p>Official language: ${language}</p>
        </section>

    </div>`;


  } catch (err) {
    countryResult.innerHTML = "Error fetching data";
    return;
  }

});