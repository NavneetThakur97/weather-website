const hbs=require('hbs')
const path=require('path')
const express=require('express')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')



const app = express()
const port= process.env.PORT || 3000// heroku will generate port with this 

// SECTION 1:
//Define path to Express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewPath=path.join(__dirname,"../templates/views")
const partialPath=path.join(__dirname,'../templates/partials')

// SECTION 2: 
//SETUP handlebars engine and views location

//   setting handler....hbs....
app.set('view engine','hbs')// set up handlebars(for this we dont need to import hbs)

app.set('views', viewPath)
hbs.registerPartials(partialPath)//give partials location to hbs


//SECTION 3:
// SETUP static directory to serve
app.use(express.static(publicDirectoryPath))// use() function is a way to customise our server

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Naneet and My pichkuuu'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name:'Navneet'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'Help is here',
        title:'help',
        name:'Navneet'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address must be provided'
        })
    }

    geocode(req.query.address,(error,{Latitude,Longitude,location}={})=>{
     
        if(error){
          return res.send({error: error})
        }
        //console.log('data: ',data)
        forecast(Latitude, Longitude, (error, forecastdata) => {
          if(error){
                return res.send({error: error})
            }
          
          res.send({
            location,
            forecastdata
          })
        //   res.send({
        //       temprture: 'its 11 degree outsise',
        //       location:'mandi'
        //   })
        })
      
      })

    })

app.get('/products',(req,res)=>{
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    //NOTE: we can send only one response to a request
    // sending multiple response will give us error like: 'Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client'
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Navneet',
        errorMessage: 'Help article not found'        
    })
})

//for unexpected input
app.get("*",(req,res)=>{
    res.render('404' ,{
        title:'404',
        name:'Navneet',
        errorMessage: 'Page not found'
    })
})

// we need to change the port i.e 3000, in order to work with 
/// heroku as herku will give the port number
app.listen(port, ()=>{
    console.log('server started at port '+port)
})
