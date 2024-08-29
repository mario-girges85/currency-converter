// console.log(COUNTRY_NAMES);
// variables declarition
let num = document.querySelector(".num");
let from = document.querySelector(".from");
let to = document.querySelector(".to");
let btn = document.querySelector(".btn");
let myH1 = document.querySelector("h1");
let swap = document.querySelector(".swap");
let imgFrom = document.querySelector(".fromImg");
let imgTo = document.querySelector(".toImg");
let keys = Object.keys(COUNTRY_NAMES);
let values = Object.values(COUNTRY_NAMES);
//intiallization of the select tag
keys.map((key, index) => {
  from.innerHTML += `
    <Option value ="${key}">${key} || ${values[index]} </Option>
    `;
  to.innerHTML += ` 
    <Option value = "${key}">${key} || ${values[index]} </Option>
    `;
});

//swap
swap.addEventListener("click", () => {
  let temp = from.value;
  from.value = to.value;
  to.value = temp;
  imgFrom.src = `https://flagsapi.com/${from.value.slice(0, 2)}/shiny/32.png`;
  imgTo.src = `https://flagsapi.com/${to.value.slice(0, 2)}/shiny/32.png`;
});

//validation
btn.addEventListener("click", () => {
  if (num.value == "" || isNaN(num.value)) {
    myH1.innerText = "please enter valid number";
    myH1.style.color = "red";
  } else {
    myH1.style.color = "Black";
    let fromKey = from.value;
    let toKey = to.value;
    let amount = num.value;

    fetch(
      `https://v6.exchangerate-api.com/v6/f1757c08e00894189dc0e568/latest/${fromKey}`
    )
      .then((convert) => convert.json())
      .then((data) => {
        let keysOfFactor = Object.keys(data.conversion_rates);
        let valuesOfFactor = Object.values(data.conversion_rates);
        let index = keysOfFactor.indexOf(toKey);
        let factor = valuesOfFactor[index];
        myH1.innerText = `${amount} ${fromKey} = ${factor * amount} ${toKey}`;
      });
  }
});

//change flag
from.addEventListener("change", () => {
  imgFrom.src = `https://flagsapi.com/${from.value.slice(0, 2)}/shiny/32.png`;
});
to.addEventListener("change", () => {
  imgTo.src = `https://flagsapi.com/${to.value.slice(0, 2)}/shiny/32.png`;
});
