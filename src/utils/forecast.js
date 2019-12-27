const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/91f3bf875973ab407bba593c3b2576dc/'+latitude+','+longitude+'?units=si'
    request({url, json:true},(error,{body}) =>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }
        else if(body.error){
            callback("Unable to find location.",undefined)
        }
        else{
            callback(undefined,{
                summary: body.currently.summary,
                temperature:body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
        
    })
}
module.exports=forecast