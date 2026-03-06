let select = document.querySelectorAll('.currency')
let btn = document.getElementById('btn')
let from = document.getElementById('from')
// let to = document.getElementById('to')


fetch('https://api.frankfurter.dev/v1/currencies')
.then(res =>res.json())
.then(res =>displayDropdown(res))

function displayDropdown(res){
   let curr = Object.entries(res) 

   for(let i=0; i<curr.length; i++){
    let opt = `<option value="${curr[i][0]}">${curr[i][0]}</option>`

   select[0].innerHTML += opt
   select[1].innerHTML += opt

   }
}

btn.addEventListener('click',() => {

    let curr1 =  select[0].value
    let curr2 = select[1].value
    let fromVal= from.value

    if(fromVal==="")
        alert("Enter Amount...!")

    if(curr1===curr2){
        alert("Choose Different Currencies")
    }
    else
        convert(curr1,curr2,fromVal)

})

function convert(curr1, curr2, fromVal) {
  fetch(`https://api.frankfurter.dev/v1/latest?base=${curr1}&symbols=${curr2}`)
    .then((resp) => resp.json())
    .then((data) => {
      const convertedAmount = (fromVal * data.rates[curr2]).toFixed(2);
      console.log(`${fromVal} ${curr1} = ${convertedAmount} ${curr2}`)
      document.getElementById("to").value = convertedAmount
        

    });
  }




