//handlebars (template engine) is a npm library helps us make our webpages dynamic
//it also helps us in makeing are web pages cohesive
const hbs=require('hbs')
const path=require('path')
const express=require('express')
// express library provide just a single function
// which is called to create a new express application

// console.log(__dirname)   //provide path to directly we are cuurently working in
// console.log(__filename)  // provide complete path to the fil currently we are working on
//path.join(__dirname,'../public')  => joim the aruements to form path

const app = express()


// SECTION 1:
//Define path to Express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewPath=path.join(__dirname,"../templates/views")
const partialPath=path.join(__dirname,'../templates/partials')
// partialPath is a path to partials foler
// partials make our header of web page unform when we switch
// from one page to another in our website
// these are also 'hbs' files

// SECTION 2: 
//SETUP handlebars engine and views location

//   setting handler....hbs....
app.set('view engine','hbs')// set up handlebars(for this we dont need to import hbs)
//set(): allow us to set a value for a given express setting
// that is setting template engine in express
//two parameters:
//   1: key
//   2: value


//NOTE:  .......
// express expect all of our views (handlebars) in a specific folder called 'views' 
// in root folder
// we can change or customise this as we can change the 
// name from 'views' to  'templates' as below
app.set('views', viewPath)
hbs.registerPartials(partialPath)//give partials location to hbs




//SECTION 3:
// SETUP static directory to serve
app.use(express.static(publicDirectoryPath))// use() function is a way to customise our server
// static() takes the path to the folder that we want to serve


// using handler files
//render() below allows us to render one of our views
//   aruement 1: name of the view to render
//   argument 2: object that contains all the values that view can access
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


//Note: as we are using files from public directory as handlers
//so the old handlers we created using 'app.get()', below will never work




//Note: Index.html has a special meaning when related to web servers
// so no need to mention'/index.html' in web browser


// app.com
//app.com/help
//app.com/about

// 'app.get()' is the function which tells the server
// what to do when an user try to access a url or path
//like above 3 examples

// 'get()' method takes two arguements
//    1. route
//    2. function to define what to do when the route is accesed
//            It has two parameters
//               a) object containing info about incoming request
//               b) response contains what we will send back to requester

// app.get('',(req, res)=>{
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//     // send() when detect a js object will automatically converts
//     //it into json by calling stringify
//     res.send([
//         {
//             name:'navneet',
//             age:22
//         },
//         {
//             name: 'Pratiksha',
//             age:20}
//     ])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About page.</h1>')
// })

app.get('/weather',(req,res)=>{
    res.send({
        forecast:'Its 11 dgrees outside',
        location:'Solan'
    })
})

app.get('/products',(req,res)=>{
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


app.listen(3000, ()=>{
    console.log('server started at port 3000')
})

//app.listen() function has one compulsary arguement  
// port number and an optional argeument a cllback function which runs when
// server is started