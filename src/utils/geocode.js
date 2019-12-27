// encodeURIComponents: function convert the address to string
     // usefull in case of address containing special characters
     //like '?' because if we use normal address in this case
     // then program will crash

const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFqcHV0MTIzIiwiYSI6ImNrNGNxZXdkZzBtNTAzbXBib2I2bWk1NjYifQ.hhnYaS3eCF1HUEX213wZSA&limit=1'
    
    request({url:url, json:true},(error,{body})=>{
           
           if(error){
             callback('Unable to connect to location service',undefined)
           }

           else if(body.features.length===0)
           {
             callback('Unable to find location. Try another search',undefined)
           }

           else
           {
             callback(undefined,{
               Latitude: body.features[0].center[1],
               Longitude:body.features[0].center[0],
               location: body.features[0].place_name
              })
           }
    })
}

module.exports = geocode