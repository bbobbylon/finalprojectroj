
//require(name_of_module) function includes a module to be implemented in this file
const express = require('express') //import express itself as a module in our main app file
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune') 
//the . in the above statement means NOde will not look for the module in the node_modules directory. 
const app = express()
app.use(express.static(__dirname + '/public')) //we are making the 'public' directory static
const port = process.env.PORT ||5678
//confgure HandleBars view engine
app.get('/', (req, res) => res.render('home'))
//app.get('/about', (req, res) => res.render('about'))
app.engine('handlebars', expressHandlebars(
    {
        defaultLayout: 'main',

}))
app.set('view engine', 'handlebars')


//we can remove this array or leave it, since it is already defined in
// /lib/fortune.js, and it cannot conflict with the array in /lib/fortune.js
const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
  ]


//adding routes , make sure 404 and 500 errors are routed last

app.get('/', (req, res) =>{
    res.type('text/plain')
    res.send('Meadowlark Travel');
})

app.get('/about' , (req, res) =>
{
    //const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', { fortune: fortune.getFortune })
})
//custom 404 page

app.use((req, res) =>
{
    
    res.status(404)
    res.render('404')
})

//custom 500 page

app.use((err, req, res, next)=>
{
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.render('500')
})


//listening for responses from the client
app.listen(port, () =>console.log(
    'Express started on http://localhost:${port}; ' + 'press CTRL-C to terminate.'
))