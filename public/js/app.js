//console.log('client side java script file is loaded')

const weatherform=document.querySelector('form')
const search= document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherform.addEventListener('submit', (event)=>{
    
    event.preventDefault()
    
    const location =search.value
    
    const url='/weather?address='+location

    messageOne.textContent='loading...'
    messageTwo.textContent=''
    fetch(url).then((response)=>{
                response.json().then( (data) => {
                    if(data.error){
                        messageOne.textContent=data.error
                    }
                else{
                    messageOne.textContent=data.location
                    messageTwo.textContent='summary: '+data.forecastdata.summary+', temperature: '+data.forecastdata.temperature+', precipProbability: '+data.forecastdata.precipProbability+', tempHigh: '+data.forecastdata.tempHigh+', tempLow: '+data.forecastdata.tempLow
                    
                }
        })
    })
    
})