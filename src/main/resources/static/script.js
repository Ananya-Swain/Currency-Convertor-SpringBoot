let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for(let select of dropdowns)
{
    for(let currCode in countryList)
        {
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            if(select.name=="from" && currCode=="USD")
            {
                newOption.selected="selected";
            }
            else if(select.name=="to" && currCode=="INR")
            {
                newOption.selected="selected";
            }
            select.append(newOption);
        }
        select.addEventListener("change",(evt) => {
            updateFlag(evt.target);
        })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let counCode = countryList[currCode];
    let newSrc =`https://flagsapi.com/${counCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector("form input");
    let amountValue = amount.value;
    if(amountValue=="" || amountValue < 1)
    {
        amountValue = 1;
        amount.value = 1;
    }
    let from = fromCurr.value;
    let to = toCurr.value;
    console.log("from - ", from);
    console.log("to - ", to);

    const res = await fetch(`http://localhost:8080/api/convert?from=${from}&to=${to}&amount=${amountValue}`);
    console.log("result - ", res);

    const data = await res.json();
    console.log(data);

    let finalAmount = data.convertedAmount;
    console.log(data.convertedAmount);

    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load",() => {
    updateExchangeRate();
})