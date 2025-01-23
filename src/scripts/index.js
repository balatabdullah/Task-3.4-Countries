const input = document.querySelector("#inputText");
const searchBtn = document.querySelector("#searchBtn");
const locationBtn = document.querySelector("#locBtn");
const content = document.querySelector("#content");
const flag = document.querySelector("#flag");
const description = document.querySelector("#desc");

searchBtn.addEventListener("click", () => {
  getCountry(input.value.toLowerCase());
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, (err) => {
      console.log(err);
    });
  }
});

async function onSuccess(position) {
  try {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    const apiKey = "8a124db700d94a1fb8d709ea1af93ed1";
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();

    let country = data.results[0].components.country;
    getCountry(country);
  } catch (err) {
    console.log(err);
  }
}

async function getCountry(input) {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/name/" + input
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();

    content.classList.replace("hidden", "flex");
    flag.children[0].src = data[0].flags.svg;
    flag.children[1].textContent = data[0].flags.alt;

    description.children[0].children[0].children[1].textContent =
      data[0].altSpellings[1];
    description.children[0].children[1].children[1].textContent =
      data[0].capital[0];
    description.children[0].children[2].children[1].textContent =
      data[0].population;
    description.children[0].children[3].children[1].textContent = Object.values(
      data[0].languages
    )[0];
    description.children[0].children[4].children[1].textContent = Object.values(
      Object.values(data[0].currencies)[0]
    )[0];
  } catch (error) {
    console.log(error);
  }
}
